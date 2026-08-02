import { Link } from 'react-router-dom'
import { InstallButton } from '../components/InstallButton'
import { LangToggle } from '../components/LangToggle'
import { useI18n } from '../i18n/I18nProvider'
import { loadStore } from '../lib/store'

export function LandingPage() {
  const { t } = useI18n()
  const hasRoutines = loadStore().routines.length > 0
  const onboarded = loadStore().profile.onboardingDone

  return (
    <div className="page-wide flex min-h-dvh flex-col">
      <header className="flex items-center justify-between gap-3">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-ink/40">
          {t('brandTag')}
        </span>
        <div className="flex items-center gap-3">
          <LangToggle />
          <Link to="/auth" className="text-sm text-ink-soft hover:text-ink">
            {t('signIn')}
          </Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col justify-center py-12">
        <p className="display text-7xl leading-none tracking-tight text-ink sm:text-8xl">
          21D
        </p>
        <h1 className="mt-6 max-w-[18ch] text-2xl font-medium leading-snug text-ink-soft sm:text-3xl">
          {t('landingHeadline')}
        </h1>
        <p className="mt-4 max-w-[30ch] text-base leading-relaxed text-ink/55">
          {t('landingSub')}
        </p>

        <div className="mt-10 flex flex-col gap-3">
          <InstallButton />
          <Link
            to={hasRoutines ? '/today' : onboarded ? '/onboarding' : '/auth'}
            className="btn-secondary w-full text-center"
          >
            {hasRoutines ? t('openApp') : t('getStarted')}
          </Link>
        </div>
      </main>

      <footer className="pb-8 text-center text-xs text-ink/35">
        {t('footer')}
      </footer>
    </div>
  )
}
