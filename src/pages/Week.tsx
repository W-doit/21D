import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AstroNudge } from '../components/AstroNudge'
import { useI18n } from '../i18n/I18nProvider'
import { dayIndexSince, loadStore } from '../lib/store'
import type { TransitPrompt } from '../types'

export function WeekPage() {
  const { t } = useI18n()
  const store = useMemo(() => loadStore(), [])
  const active = store.routines.filter((r) => r.status === 'active')
  const [selected, setSelected] = useState(0)

  const weekly: TransitPrompt = {
    id: 'weekly',
    date: new Date().toISOString().slice(0, 10),
    scope: 'weekly',
    title: t('weeklyTransitTitle'),
    body: t('weeklyTransitBody'),
  }

  const upcoming: TransitPrompt = {
    id: 'upcoming',
    date: new Date().toISOString().slice(0, 10),
    scope: 'upcoming',
    title: t('upcomingTransitTitle'),
    body: t('upcomingTransitBody'),
  }

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - d.getDay() + i)
    return d
  })

  return (
    <div className="page">
      <h1 className="display text-4xl text-ink">{t('thisWeek')}</h1>
      <p className="mt-2 text-sm text-ink-soft">{t('weekSub')}</p>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
        {days.map((d, i) => {
          const isToday = d.toDateString() === new Date().toDateString()
          return (
            <button
              key={d.toISOString()}
              type="button"
              onClick={() => setSelected(i)}
              className={`flex min-w-[3rem] flex-col items-center rounded-2xl px-3 py-2.5 text-xs transition ${
                selected === i
                  ? 'bg-ink text-mist'
                  : isToday
                    ? 'bg-leaf/50 text-ink'
                    : 'bg-white/60 text-ink-soft ring-1 ring-ink/8'
              }`}
            >
              <span className="uppercase opacity-70">
                {d.toLocaleDateString(undefined, { weekday: 'narrow' })}
              </span>
              <span className="mt-1 text-base font-medium">{d.getDate()}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-6 space-y-3">
        <AstroNudge prompt={weekly} />
        <AstroNudge prompt={upcoming} />
      </div>

      <section className="mt-8">
        <h2 className="text-sm font-medium text-ink-soft">{t('activePlans')}</h2>
        <div className="mt-3 space-y-2">
          {active.length === 0 && (
            <p className="text-sm text-ink/45">{t('noActive')}</p>
          )}
          {active.map((r) => {
            const day = Math.min(dayIndexSince(r.startDate) + 1, r.targetDays)
            return (
              <Link
                key={r.id}
                to={`/routine/${r.id}`}
                className="surface flex items-center justify-between !py-4"
              >
                <div>
                  <p className="font-medium text-ink">{r.title}</p>
                  <p className="text-xs text-ink/45">
                    {t('dayOf', { day, total: r.targetDays })} · {r.schedule.time}
                  </p>
                </div>
                <span className="text-ink/30">→</span>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
