import type { RemedySuggestion } from '../../types'
import type { Locale } from '../../i18n/translations'
import { supabase } from '../supabase'
import { mockSuggestRoutines } from './mock'

export type SuggestFailReason =
  | 'rate_limit'
  | 'invalid_key'
  | 'missing_key'
  | 'unavailable'
  | null

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

function reasonFromPayload(payload: unknown): SuggestFailReason {
  if (!payload || typeof payload !== 'object') return 'unavailable'
  const o = payload as { code?: string; error?: string; status?: number }
  if (o.code === 'rate_limit' || o.status === 429) return 'rate_limit'
  if (o.code === 'invalid_key') return 'invalid_key'
  if (o.error?.includes('GEMINI_API_KEY')) return 'missing_key'
  return 'unavailable'
}

async function parseInvokeError(error: unknown, data: unknown): Promise<SuggestFailReason> {
  if (data) return reasonFromPayload(data)

  const ctx = (error as { context?: Response })?.context
  if (ctx && typeof ctx.json === 'function') {
    try {
      const body = await ctx.json()
      return reasonFromPayload(body)
    } catch {
      /* ignore */
    }
  }

  const message = String((error as { message?: string })?.message ?? '')
  if (message.includes('429')) return 'rate_limit'
  return 'unavailable'
}

async function invokeOnce(
  goal: string,
  locale: Locale,
): Promise<{ suggestions: RemedySuggestion[] | null; reason: SuggestFailReason }> {
  if (!supabase) return { suggestions: null, reason: 'unavailable' }

  const { data, error } = await supabase.functions.invoke('suggest-routines', {
    body: { goal, locale },
  })

  if (error) {
    console.warn('suggest-routines failed', error.message, data)
    return { suggestions: null, reason: await parseInvokeError(error, data) }
  }

  if (data && typeof data === 'object' && 'error' in data && !(data as { suggestions?: unknown }).suggestions) {
    return { suggestions: null, reason: reasonFromPayload(data) }
  }

  const list = (data as { suggestions?: unknown })?.suggestions
  if (!Array.isArray(list)) return { suggestions: null, reason: 'unavailable' }

  const suggestions = list
    .map((item, i) => normalizeSuggestion(item, i))
    .filter((s): s is RemedySuggestion => s !== null)

  return {
    suggestions: suggestions.length ? suggestions : null,
    reason: suggestions.length ? null : 'unavailable',
  }
}

export type SuggestResult = {
  suggestions: RemedySuggestion[]
  source: 'gemini' | 'mock'
  reason: SuggestFailReason
}

/** Prefer Gemini via Supabase Edge Function; fall back to local catalog. */
export async function suggestRoutines(
  goal: string,
  locale: Locale = 'es',
): Promise<SuggestResult> {
  try {
    let result = await invokeOnce(goal, locale)

    // One retry when Gemini rate-limits (quota bursts)
    if (!result.suggestions && result.reason === 'rate_limit') {
      await new Promise((r) => setTimeout(r, 2500))
      result = await invokeOnce(goal, locale)
    }

    if (result.suggestions?.length) {
      return { suggestions: result.suggestions, source: 'gemini', reason: null }
    }

    return {
      suggestions: await mockSuggestRoutines(goal, locale),
      source: 'mock',
      reason: result.reason ?? 'unavailable',
    }
  } catch (err) {
    console.warn('Gemini suggest error', err)
    return {
      suggestions: await mockSuggestRoutines(goal, locale),
      source: 'mock',
      reason: 'unavailable',
    }
  }
}
