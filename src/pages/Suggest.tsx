import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SuggestionDetail } from '../components/SuggestionDetail'
import { suggestRoutines } from '../lib/ai/suggest'
import { useI18n } from '../i18n/I18nProvider'
import { loadStore, uid, upsertRoutine } from '../lib/store'
import type { RemedySuggestion, UserRoutine } from '../types'

export function SuggestPage() {
  const { t, locale } = useI18n()
  const navigate = useNavigate()
  const location = useLocation()
  const goal =
    (location.state as { goal?: string } | null)?.goal ||
    loadStore().profile.goal ||
    ''

  const [items, setItems] = useState<RemedySuggestion[]>([])
  const [source, setSource] = useState<'gemini' | 'mock' | null>(null)
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState<Set<string>>(new Set())
  const [selected, setSelected] = useState<RemedySuggestion | null>(null)

  useEffect(() => {
    let alive = true
    setLoading(true)
    setSource(null)
    suggestRoutines(goal || 'bienestar general', locale).then((result) => {
      if (!alive) return
      setItems(result.suggestions)
      setSource(result.source)
      setLoading(false)
    })
    return () => {
      alive = false
    }
  }, [goal, locale])

  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  const addItem = (item: RemedySuggestion) => {
    const routine: UserRoutine = {
      id: uid('routine'),
      remedyId: item.id,
      title: item.title,
      description: item.description,
      category: item.category,
      expectedDaysToResult: item.expectedDaysToResult,
      mediaPlatform: item.mediaPlatform,
      mediaUrl: item.mediaUrl,
      steps: item.steps,
      schedule: {
        time: '21:00',
        days: [0, 1, 2, 3, 4, 5, 6],
        notify: true,
      },
      startDate: new Date().toISOString().slice(0, 10),
      targetDays: 21,
      status: 'active',
      createdAt: new Date().toISOString(),
    }
    upsertRoutine(routine)
    setAdded((prev) => new Set(prev).add(item.id))
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
          {t('usingFallback')}
        </p>
      )}

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
                  disabled={isAdded}
                  className={`mt-4 w-full ${isAdded ? 'btn-secondary' : 'btn-primary'}`}
                  onClick={() => addItem(item)}
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
          onAdd={() => {
            addItem(selected)
          }}
        />
      )}
    </div>
  )
}
