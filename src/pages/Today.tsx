import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AstroNudge } from '../components/AstroNudge'
import { RoutineCard } from '../components/RoutineCard'
import { useI18n } from '../i18n/I18nProvider'
import {
  addCheckin,
  dayIndexSince,
  loadStore,
  removeCheckin,
  uid,
} from '../lib/store'

export function TodayPage() {
  const { t } = useI18n()
  const [version, setVersion] = useState(0)
  const refresh = () => setVersion((n) => n + 1)

  const store = useMemo(() => loadStore(), [version])
  const active = store.routines.filter((r) => r.status === 'active')
  const name = store.profile.displayName || t('there')

  const isDone = (routineId: string, dayIndex: number) =>
    store.checkins.some(
      (c) => c.routineId === routineId && c.dayIndex === dayIndex,
    )

  const toggle = (routineId: string) => {
    const routine = store.routines.find((r) => r.id === routineId)
    if (!routine) return
    const day = dayIndexSince(routine.startDate)
    if (isDone(routineId, day)) removeCheckin(routineId, day)
    else
      addCheckin({
        id: uid('checkin'),
        routineId,
        dayIndex: day,
        doneAt: new Date().toISOString(),
      })
    refresh()
  }

  return (
    <div className="page">
      <header>
        <p className="text-sm text-ink-soft">{t('hello', { name })}</p>
        <h1 className="display mt-1 text-4xl text-ink">{t('today')}</h1>
      </header>

      <div className="mt-6">
        <AstroNudge />
      </div>

      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium text-ink-soft">{t('yourRoutines')}</h2>
          <Link to="/onboarding" className="text-sm text-sage-deep">
            {t('add')}
          </Link>
        </div>

        {active.length === 0 ? (
          <div className="surface text-center">
            <p className="text-ink">{t('noRoutines')}</p>
            <p className="mt-1 text-sm text-ink-soft">{t('noRoutinesHint')}</p>
            <Link to="/onboarding" className="btn-primary mt-5 inline-flex">
              {t('start21')}
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {active.map((routine) => {
              const day = dayIndexSince(routine.startDate)
              return (
                <RoutineCard
                  key={routine.id}
                  routine={routine}
                  doneToday={isDone(routine.id, day)}
                  onToggle={() => toggle(routine.id)}
                />
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
