import { NavLink } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'

export function BottomNav() {
  const { t } = useI18n()
  const items = [
    { to: '/today', label: t('navToday'), icon: TodayIcon },
    { to: '/week', label: t('navWeek'), icon: WeekIcon },
    { to: '/onboarding', label: t('navAdd'), icon: AddIcon },
    { to: '/profile', label: t('navYou'), icon: YouIcon },
  ]

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/8 bg-mist/90 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-md items-stretch justify-around px-2 pt-2 pb-2">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex min-w-[4.5rem] flex-col items-center gap-0.5 rounded-2xl px-3 py-2 text-[11px] font-medium transition ${
                isActive ? 'text-ink bg-leaf/40' : 'text-ink/45 hover:text-ink-soft'
              }`
            }
          >
            <Icon />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

function TodayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 8v4l2.5 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function WeekIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 9h16M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function AddIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function YouIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="9" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M6 19c1.5-3 4-4.5 6-4.5S16.5 16 18 19"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}
