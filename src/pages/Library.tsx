import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SuggestionDetail } from '../components/SuggestionDetail'
import {
  ACUPRESSURE_CURATED,
  curatedToSuggestion,
} from '../data/curatedAcupressure'
import { useI18n } from '../i18n/I18nProvider'
import {
  requestNotificationPermission,
  sendDemoNotification,
} from '../lib/notifications'
import { createRoutineForUser } from '../lib/routinesApi'
import type { RemedySuggestion, RoutineSchedule } from '../types'

export function LibraryPage() {
  const { t, locale } = useI18n()
  const items = useMemo(
    () =>
      ACUPRESSURE_CURATED.map((c) =>
        curatedToSuggestion(c, locale === 'en' ? 'en' : 'es'),
      ),
    [locale],
  )
  const [selected, setSelected] = useState<RemedySuggestion | null>(null)
  const [added, setAdded] = useState<Set<string>>(new Set())
  const [saving, setSaving] = useState(false)

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

  return (
    <div className="page">
      <Link to="/profile" className="text-sm text-ink-soft">
        ← {t('you')}
      </Link>

      <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-ink/40">
        {t('curatedLibrary')}
      </p>
      <h1 className="mt-2 text-3xl font-medium text-ink">
        {t('acupressureCollection')}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        {t('acupressureCollectionHint')}
      </p>

      <div className="mt-6 space-y-3">
        {items.map((item) => {
          const isAdded = added.has(item.id)
          const press =
            ACUPRESSURE_CURATED.find((c) => c.slug === item.id)?.pressMinutes ??
            ''
          return (
            <article key={item.id} className="surface !p-0 overflow-hidden">
              <button
                type="button"
                className="w-full text-left"
                onClick={() => setSelected(item)}
              >
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt=""
                    className="h-36 w-full object-cover object-center bg-mist-deep"
                  />
                )}
                <div className="p-4">
                  <p className="text-[11px] uppercase tracking-wider text-ink/40">
                    {item.category}
                    {press ? ` · ${press} min` : ''}
                  </p>
                  <h2 className="mt-1 text-lg font-medium text-ink">
                    {item.title.replace(/^[^—–-]+[—–-]\s*/, '')}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                    {item.description}
                  </p>
                  <p className="mt-3 text-sm font-medium text-sage-deep">
                    {t('viewDetails')} →
                  </p>
                </div>
              </button>
              <div className="border-t border-ink/8 px-4 py-3">
                <button
                  type="button"
                  disabled={isAdded || saving}
                  className={`w-full ${isAdded ? 'btn-secondary' : 'btn-primary'}`}
                  onClick={() =>
                    addItem(item, {
                      time: '22:00',
                      days: [0, 1, 2, 3, 4, 5, 6],
                      notify: true,
                    })
                  }
                >
                  {isAdded ? t('addedToPlan') : t('addToPlan')}
                </button>
              </div>
            </article>
          )
        })}
      </div>

      {selected && (
        <SuggestionDetail
          item={selected}
          isAdded={added.has(selected.id)}
          defaultTime="22:00"
          onClose={() => setSelected(null)}
          onAdd={async (schedule) => {
            await addItem(selected, schedule)
          }}
        />
      )}
    </div>
  )
}
