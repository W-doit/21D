import { Link } from 'react-router-dom'
import type { UserRoutine } from '../types'
import { dayIndexSince } from '../lib/store'
import { useI18n } from '../i18n/I18nProvider'

export function RoutineCard({
  routine,
  doneToday,
  onToggle,
}: {
  routine: UserRoutine
  doneToday: boolean
  onToggle: () => void
}) {
  const { t } = useI18n()
  const day = Math.min(dayIndexSince(routine.startDate) + 1, routine.targetDays)

  return (
    <div className="surface flex gap-4 !p-4">
      <button
        type="button"
        aria-label={doneToday ? t('markIncomplete') : t('markDone')}
        onClick={onToggle}
        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ring-2 transition ${
          doneToday
            ? 'bg-sage text-white ring-sage'
            : 'bg-transparent ring-ink/20 text-transparent'
        }`}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12l5 5L20 7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Link to={`/routine/${routine.id}`} className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-medium leading-snug text-ink">
            {routine.title}
          </h3>
          <span className="shrink-0 text-xs text-ink/40">
            {day}/{routine.targetDays}
          </span>
        </div>
        <p className="mt-1 text-sm text-ink-soft line-clamp-2">
          {routine.schedule.time} · {routine.category}
        </p>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-mist-deep">
          <div
            className="h-full rounded-full bg-sage transition-all"
            style={{ width: `${(day / routine.targetDays) * 100}%` }}
          />
        </div>
      </Link>
    </div>
  )
}
