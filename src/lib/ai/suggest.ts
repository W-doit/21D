import type { RemedySuggestion } from '../../types'
import type { Locale } from '../../i18n/translations'
import { supabase } from '../supabase'
import { mockSuggestRoutines } from './mock'

function normalizeSuggestion(raw: unknown, index: number): RemedySuggestion | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  const title = String(o.title ?? '').trim()
  if (!title) return null

  const platforms = new Set(['youtube', 'tiktok', 'instagram', 'none'])
  const platform = String(o.mediaPlatform ?? 'none')
  let mediaPlatform = platforms.has(platform)
    ? (platform as RemedySuggestion['mediaPlatform'])
    : 'none'

  const steps = Array.isArray(o.steps)
    ? o.steps.map((s) => String(s).trim()).filter(Boolean).slice(0, 6)
    : []
  const days = Number(o.expectedDaysToResult)
  let mediaUrl =
    mediaPlatform === 'none' ? '' : String(o.mediaUrl ?? '').trim()

  // Gemini often invents watch?v= IDs that 404 in embeds — use search links instead.
  if (mediaPlatform === 'youtube') {
    const isSearch =
      mediaUrl.includes('/results') || mediaUrl.includes('search_query=')
    if (!isSearch) {
      mediaUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(title)}`
    }
  }

  if (mediaPlatform !== 'none' && !mediaUrl) {
    mediaPlatform = 'none'
  }

  return {
    id:
      String(o.id ?? `suggestion-${index + 1}`)
        .toLowerCase()
        .replace(/[^a-z0-9-]+/g, '-')
        .replace(/^-|-$/g, '') || `suggestion-${index + 1}`,
    title,
    description: String(o.description ?? '').trim(),
    category: String(o.category ?? 'Habit').trim() || 'Habit',
    expectedDaysToResult:
      Number.isFinite(days) && days >= 7 && days <= 60 ? Math.round(days) : 21,
    mediaPlatform,
    mediaUrl,
    steps: steps.length ? steps : ['Repeat daily for 21 days'],
  }
}

async function suggestViaGemini(
  goal: string,
  locale: Locale,
): Promise<RemedySuggestion[] | null> {
  if (!supabase) return null

  const { data, error } = await supabase.functions.invoke('suggest-routines', {
    body: { goal, locale },
  })

  if (error) {
    console.warn('suggest-routines failed', error.message)
    return null
  }

  const list = (data as { suggestions?: unknown })?.suggestions
  if (!Array.isArray(list)) return null

  const suggestions = list
    .map((item, i) => normalizeSuggestion(item, i))
    .filter((s): s is RemedySuggestion => s !== null)

  return suggestions.length ? suggestions : null
}

export type SuggestResult = {
  suggestions: RemedySuggestion[]
  source: 'gemini' | 'mock'
}

/** Prefer Gemini via Supabase Edge Function; fall back to local catalog. */
export async function suggestRoutines(
  goal: string,
  locale: Locale = 'es',
): Promise<SuggestResult> {
  try {
    const fromGemini = await suggestViaGemini(goal, locale)
    if (fromGemini?.length) {
      return { suggestions: fromGemini, source: 'gemini' }
    }
  } catch (err) {
    console.warn('Gemini suggest error', err)
  }

  return {
    suggestions: await mockSuggestRoutines(goal, locale),
    source: 'mock',
  }
}
