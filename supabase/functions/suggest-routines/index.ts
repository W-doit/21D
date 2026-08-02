import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

type Locale = "es" | "en";

interface Suggestion {
  id: string;
  title: string;
  description: string;
  category: string;
  expectedDaysToResult: number;
  mediaPlatform: "youtube" | "tiktok" | "instagram" | "none";
  mediaUrl: string;
  steps: string[];
}

function buildPrompt(goal: string, locale: Locale): string {
  const language =
    locale === "es"
      ? "Spanish (Spain/LatAm neutral, clear and warm)"
      : "English";

  return `You are the suggestion engine for 21D, a free habit app based on the idea that routines take about 21 days to form.

USER GOAL:
"""
${goal}
"""

Return 5 practical suggestions the user can add as daily/weekly routines.

HARD RULES:
1. ONLY natural home remedies, lifestyle habits, nutrition habits, sleep hygiene, gentle movement, mindfulness, or skincare/haircare with kitchen/pantry ingredients.
2. NEVER suggest prescription drugs, medical diagnoses, surgeries, or anything requiring a clinician.
3. Prefer things doable at home in under 20 minutes.
4. expectedDaysToResult must be an integer between 14 and 30 (use 21 when unsure).
5. steps: 3 to 5 short actionable steps.
6. If the suggestion benefits from a visual demo (exercise series, stretch flow, yoga, technique, hair/skin application), set mediaPlatform to "youtube" and mediaUrl to a YouTube SEARCH URL only, like:
   https://www.youtube.com/results?search_query=ginger+scalp+massage+tutorial
   NEVER invent watch?v= video IDs or claim a specific video exists. Models invent fake IDs and embeds fail.
   For non-visual habits (hydration, sleep wind-down without movement), use mediaPlatform "none" and mediaUrl "".
7. Do NOT invent pharmaceutical products. Do NOT claim guaranteed medical cures.
8. Categories examples: Hair, Skin, Sleep, Energy, Mind, Body, Digestion, Focus (translate category names to ${language}).
9. All title, description, category, and steps MUST be written in ${language}.
10. id must be a short kebab-case slug in ASCII.

Respond with ONLY valid JSON (no markdown) matching:
{
  "suggestions": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "category": "string",
      "expectedDaysToResult": 21,
      "mediaPlatform": "youtube" | "tiktok" | "instagram" | "none",
      "mediaUrl": "string",
      "steps": ["string"]
    }
  ]
}`;
}

function normalize(raw: unknown): Suggestion[] {
  if (!raw || typeof raw !== "object") return [];
  const list = (raw as { suggestions?: unknown }).suggestions;
  if (!Array.isArray(list)) return [];

  const platforms = new Set(["youtube", "tiktok", "instagram", "none"]);

  return list
    .map((item, index): Suggestion | null => {
      if (!item || typeof item !== "object") return null;
      const o = item as Record<string, unknown>;
      const title = String(o.title ?? "").trim();
      if (!title) return null;
      const platform = String(o.mediaPlatform ?? "none");
      const mediaPlatform = platforms.has(platform)
        ? (platform as Suggestion["mediaPlatform"])
        : "none";
      const steps = Array.isArray(o.steps)
        ? o.steps.map((s) => String(s).trim()).filter(Boolean).slice(0, 6)
        : [];
      const days = Number(o.expectedDaysToResult);
      return {
        id: String(o.id ?? `suggestion-${index + 1}`)
          .toLowerCase()
          .replace(/[^a-z0-9-]+/g, "-")
          .replace(/^-|-$/g, "") || `suggestion-${index + 1}`,
        title,
        description: String(o.description ?? "").trim(),
        category: String(o.category ?? "Habit").trim() || "Habit",
        expectedDaysToResult:
          Number.isFinite(days) && days >= 7 && days <= 60
            ? Math.round(days)
            : 21,
        mediaPlatform,
        mediaUrl:
          mediaPlatform === "none" ? "" : String(o.mediaUrl ?? "").trim(),
        steps: steps.length ? steps : ["Do this once today", "Repeat daily"],
      };
    })
    .filter((s): s is Suggestion => s !== null)
    .slice(0, 6);
}

function extractJson(text: string): unknown {
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start >= 0 && end > start) {
      return JSON.parse(trimmed.slice(start, end + 1));
    }
    throw new Error("Model did not return JSON");
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "GEMINI_API_KEY is not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const body = await req.json().catch(() => ({}));
    const goal = String((body as { goal?: string }).goal ?? "").trim();
    const locale =
      (body as { locale?: string }).locale === "en" ? "en" : ("es" as Locale);

    if (!goal) {
      return new Response(JSON.stringify({ error: "goal is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const geminiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent";

    const geminiRes = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: buildPrompt(goal, locale) }] }],
        generationConfig: {
          temperature: 0.7,
          responseMimeType: "application/json",
        },
      }),
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error("Gemini error", geminiRes.status, errText);
      return new Response(
        JSON.stringify({
          error: "Gemini request failed",
          status: geminiRes.status,
        }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const geminiJson = await geminiRes.json();
    const text =
      geminiJson?.candidates?.[0]?.content?.parts
        ?.map((p: { text?: string }) => p.text ?? "")
        .join("") ?? "";

    const suggestions = normalize(extractJson(text));
    if (!suggestions.length) {
      return new Response(
        JSON.stringify({ error: "No suggestions parsed", raw: text }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    return new Response(JSON.stringify({ suggestions }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
