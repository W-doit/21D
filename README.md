# 21D

Mobile-first PWA for building **21-day** daily and weekly routines — with mock AI suggestions, progress photos, ratings, astrology nudge placeholders, and Supabase-ready auth/schema.

## Quick start

```bash
npm install
cp .env.example .env
# Add VITE_SUPABASE_ANON_KEY from your Supabase project (optional for local demo)
npm run dev
```

Open the printed local URL on your phone (same Wi‑Fi), or use Chrome DevTools device mode.

**Guest / demo mode:** If the anon key is empty, the app runs fully on `localStorage` — auth is optional via “Continue as guest”.

## Supabase setup

Project: `https://zozjvsirafcdpzdffibk.supabase.co`

1. Copy the **anon public** key into `.env` as `VITE_SUPABASE_ANON_KEY`.
2. In the Supabase SQL editor, run [`supabase/migrations/001_init.sql`](supabase/migrations/001_init.sql).
3. Enable Email auth in Authentication → Providers.
4. Confirm the `progress-photos` storage bucket exists (created by the migration when permitted).

## Phone install (PWA)

- **Android Chrome:** Open the site → tap **Download app** (or the browser install banner).
- **iOS Safari:** Share → **Add to Home Screen**.

## App map

| Route | Role |
|-------|------|
| `/` | Landing + install CTA |
| `/auth` | Sign in / up / guest |
| `/onboarding` | Goal + optional birth data |
| `/suggest` | Mock AI remedy list |
| `/today` | Check-ins + daily transit card |
| `/week` | Week strip + weekly/upcoming nudges |
| `/routine/:id` | Steps, video, alarm, photos, rating |
| `/profile` | Natal stub, install, notifications |

## Gemini suggestions

Suggestions call the Supabase Edge Function `suggest-routines`, which uses **Gemini Flash**.

1. Open [Supabase Dashboard → Edge Functions → Secrets](https://supabase.com/dashboard/project/zozjvsirafcdpzdffibk/settings/functions)
2. Add secret: `GEMINI_API_KEY` = your Google AI Studio key
3. Do **not** put the Gemini key in `VITE_*` env vars (that would expose it in the browser)

If the function is unavailable, the app falls back to a local remedy catalog.


## Notes

- AI suggestions are **mocked** in `src/lib/ai/suggest.ts` — swap for a Supabase Edge Function later.
- Notifications request browser permission and send a demo notification; scheduled Web Push needs VAPID + a push server.
- Astrology transits are static placeholders until a natal/ephemeris provider is wired.
- Remedy ratings are social signals, not medical claims.
