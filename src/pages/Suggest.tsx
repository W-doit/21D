import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CustomRemedyForm } from '../components/CustomRemedyForm'
import { SuggestionDetail } from '../components/SuggestionDetail'
import { suggestRoutines } from '../lib/ai/suggest'
import { useI18n } from '../i18n/I18nProvider'
import {
  requestNotificationPermission,
  sendDemoNotification,
} from '../lib/notifications'
import { createRoutineForUser } from '../lib/routinesApi'
import type { RemedySuggestion, RoutineSchedule } from '../types'

export function SuggestPage() {
  const { t, locale } = useI18n()
  const navigate = useNavigate()
  const location = useLocation()
  const goal =
    (location.state as { goal?: string } | null)?.goal ||
    ''

  const [items, setItems] = useState<RemedySuggestion[]>([])
  const [source, setSource] = useState<'gemini' | 'mock' | null>(null)
  const [failReason, setFailReason] = useState<
    'rate_limit' | 'invalid_key' | 'missing_key' | 'unavailable' | null
  >(null)
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState<Set<string>>(new Set())
  const [selected, setSelected] = useState<RemedySuggestion | null>(null)
  const [showCustom, setShowCustom] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let alive = true
    setLoading(true)
    setSource(null)
    setFailReason(null)
    const storedGoal =
      (location.state as { goal?: string } | null)?.goal ||
      JSON.parse(localStorage.getItem('21d-store-v1') || '{}')?.profile?.goal ||
      ''
    suggestRoutines(goal || storedGoal || 'bienestar general', locale).then(
      (result) => {
        if (!alive) return
        setItems(result.suggestions)
        setSource(result.source)
        setFailReason(result.reason)
        setLoading(false)
      },
    )
    return () => {
      alive = false
    }
  }, [goal, locale, location.state])

  useEffect(() => {
    if (!selected && !showCustom) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelected(null)
        setShowCustom(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected, showCustom])

  const addItem = async (item: RemedySuggestion, schedule: RoutineSchedule) => {
    setSaving(true)
    try {
      if (schedule.notify) {
        const perm = await requestNotificationPermission()
        if (perm === 'granted') {
          sendDemoNotification(
            item.title,
            t('alarmSetFor', { time: schedule.time }),
          )
        }
      }
      await createRoutineForUser(item, schedule)
      setAdded((prev) => new Set(prev).add(item.id))
    } finally {
      setSaving(false)
    }
  }

  const saveCustom = async (
    item: RemedySuggestion,
    schedule: RoutineSchedule,
  ) => {
    await addItem(item, schedule)
    setItems((prev) => [item, ...prev])
    setShowCustom(false)
  }

  return (
    <div className="page">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink/40">
            {t('suggestions')}
          </p>
          <h1 className="mt-2 text-2xl font-medium text-ink">{t('forYourGoal')}</h1>
        </div>
        <Link to="/today" className="text-sm text-sage-deep">
          {t('skip')}
        </Link>
      </div>

      {goal && (
        <p className="mt-3 rounded-2xl bg-leaf/30 px-4 py-3 text-sm text-ink-soft">
          “{goal}”
        </p>
      )}

      {!loading && source === 'gemini' && (
        <p className="mt-3 text-xs text-sage-deep">{t('usingAi')}</p>
      )}
      {!loading && source === 'mock' && (
        <p className="mt-3 rounded-2xl bg-sand/40 px-4 py-3 text-xs leading-relaxed text-ink-soft">
          {failReason === 'rate_limit'
            ? t('usingFallbackRateLimit')
            : failReason === 'missing_key'
              ? t('usingFallbackMissingKey')
              : failReason === 'invalid_key'
                ? t('usingFallbackInvalidKey')
                : t('usingFallback')}
        </p>
      )}

      <button
        type="button"
        className="btn-secondary mt-5 w-full"
        onClick={() => setShowCustom(true)}
      >
        + {t('addCustomRemedy')}
      </button>

      <div className="mt-6 space-y-3">
        {loading && (
          <div className="surface animate-pulse text-sm text-ink/40">
            {t('gathering')}
          </div>
        )}
        {!loading &&
          items.map((item) => {
            const isAdded = added.has(item.id)
            return (
              <article key={item.id} className="surface">
                <button
                  type="button"
                  className="w-full text-left"
                  onClick={() => setSelected(item)}
                >
                  <p className="text-[11px] uppercase tracking-wider text-ink/40">
                    {item.category} ·{' '}
                    {t('daysApprox', { n: item.expectedDaysToResult })}
                  </p>
                  <h2 className="mt-1 text-lg font-medium text-ink">
                    {item.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                    {item.description}
                  </p>
                  <p className="mt-3 text-sm font-medium text-sage-deep">
                    {t('viewDetails')} →
                  </p>
                </button>
                <button
                  type="button"
                  disabled={isAdded || saving}
                  className={`mt-4 w-full ${isAdded ? 'btn-secondary' : 'btn-primary'}`}
                  onClick={() =>
                    addItem(item, {
                      time: '09:00',
                      days: [0, 1, 2, 3, 4, 5, 6],
                      notify: true,
                    })
                  }
                >
                  {isAdded ? t('addedToPlan') : t('addToPlan')}
                </button>
              </article>
            )
          })}
      </div>

      {added.size > 0 && (
        <button
          type="button"
          className="btn-primary mt-6 w-full"
          onClick={() => navigate('/today')}
        >
          {t('goToToday')}
        </button>
      )}

      {selected && (
        <SuggestionDetail
          item={selected}
          isAdded={added.has(selected.id)}
          onClose={() => setSelected(null)}
          onAdd={async (schedule) => {
            await addItem(selected, schedule)
          }}
        />
      )}

      {showCustom && (
        <CustomRemedyForm
          onClose={() => setShowCustom(false)}
          onSave={saveCustom}
        />
      )}
    </div>
  )
}
