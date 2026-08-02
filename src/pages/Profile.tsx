import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../app/auth-context'
import { InstallButton } from '../components/InstallButton'
import { LangToggle } from '../components/LangToggle'
import { useActiveRoutines } from '../hooks/useRoutines'
import { useI18n } from '../i18n/I18nProvider'
import {
  getNotificationPermission,
  requestNotificationPermission,
} from '../lib/notifications'
import { isStandalone } from '../lib/pwa/install'
import { updateProfile } from '../lib/store'

export function ProfilePage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const { user, configured, signOut } = useAuth()
  const { store } = useActiveRoutines()
  const [name, setName] = useState(store.profile.displayName)
  const [birthDate, setBirthDate] = useState(store.profile.birthDate ?? '')
  const [birthTime, setBirthTime] = useState(store.profile.birthTime ?? '')
  const [birthPlace, setBirthPlace] = useState(store.profile.birthPlace ?? '')
  const [perm, setPerm] = useState(getNotificationPermission())
  const [saved, setSaved] = useState(false)
  const [signingOut, setSigningOut] = useState(false)

  const routines = useMemo(
    () =>
      store.routines
        .filter((r) => r.status === 'active')
        .slice()
        .sort((a, b) => a.schedule.time.localeCompare(b.schedule.time)),
    [store],
  )

  useEffect(() => {
    setPerm(getNotificationPermission())
  }, [])

  useEffect(() => {
    setName(store.profile.displayName)
    setBirthDate(store.profile.birthDate ?? '')
    setBirthTime(store.profile.birthTime ?? '')
    setBirthPlace(store.profile.birthPlace ?? '')
  }, [store.profile])

  const save = () => {
    updateProfile({
      displayName: name,
      birthDate: birthDate || undefined,
      birthTime: birthTime || undefined,
      birthPlace: birthPlace || undefined,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  const enableNotifs = async () => {
    const next = await requestNotificationPermission()
    setPerm(next)
  }

  const onSignOut = async () => {
    if (signingOut) return
    setSigningOut(true)
    try {
      await signOut()
      navigate('/auth', { replace: true })
    } finally {
      setSigningOut(false)
    }
  }

  return (
    <div className="page">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="display text-4xl text-ink">{t('you')}</h1>
          <p className="mt-2 text-sm text-ink-soft">
            {user?.email
              ? user.email
              : configured
                ? t('guestDevice')
                : t('localDemo')}
          </p>
        </div>
        <LangToggle />
      </div>

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-sm font-medium text-ink-soft">{t('yourRoutines')}</h2>
          <Link to="/onboarding" className="text-sm text-sage-deep">
            {t('add')}
          </Link>
        </div>
        <Link
          to="/library"
          className="surface mb-3 flex items-center justify-between gap-3 !py-4"
        >
          <div>
            <p className="font-medium text-ink">{t('acupressureCollection')}</p>
            <p className="mt-0.5 text-xs text-ink/45">{t('browseCurated')}</p>
          </div>
          <span className="text-sage-deep">→</span>
        </Link>
        {routines.length === 0 ? (
          <div className="surface text-sm text-ink-soft">{t('noRoutines')}</div>
        ) : (
          <div className="space-y-2">
            {routines.map((r) => {
              const hasVideo =
                r.mediaPlatform !== 'none' && Boolean(r.mediaUrl?.trim())
              return (
                <Link
                  key={r.id}
                  to={`/routine/${r.id}`}
                  className="surface flex items-center justify-between gap-3 !py-4"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-ink">{r.title}</p>
                    <p className="mt-0.5 text-xs text-ink/45">
                      {r.schedule.time} · {r.category}
                      {hasVideo ? '' : ` · ${t('noVideoYet')}`}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-medium text-sage-deep">
                    {t('editRoutine')} →
                  </span>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      <section className="surface mt-6 space-y-3">
        <label className="label" htmlFor="displayName">
          {t('displayName')}
        </label>
        <input
          id="displayName"
          className="field"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="button" className="btn-primary w-full" onClick={save}>
          {saved ? t('saved') : t('saveProfile')}
        </button>
      </section>

      <section className="surface mt-4">
        <h2 className="font-medium text-ink">{t('natalStub')}</h2>
        <p className="mt-1 text-xs text-ink/45">{t('natalStubHint')}</p>
        <div className="mt-4 space-y-3">
          <label className="label" htmlFor="birthDate">
            {t('birthDate')}
          </label>
          <input
            id="birthDate"
            type="date"
            className="field"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <label className="label" htmlFor="birthTime">
            {t('birthTime')}
          </label>
          <input
            id="birthTime"
            type="time"
            className="field"
            value={birthTime}
            onChange={(e) => setBirthTime(e.target.value)}
          />
          <label className="label" htmlFor="birthPlace">
            {t('birthPlace')}
          </label>
          <input
            id="birthPlace"
            className="field"
            value={birthPlace}
            onChange={(e) => setBirthPlace(e.target.value)}
            placeholder={t('birthPlace')}
          />
        </div>
      </section>

      <section className="surface mt-4">
        <h2 className="font-medium text-ink">{t('install')}</h2>
        <p className="mt-1 text-xs text-ink/45">
          {isStandalone() ? t('runningInstalled') : t('addHomescreen')}
        </p>
        <div className="mt-4">
          <InstallButton variant="secondary" />
        </div>
      </section>

      <section className="surface mt-4">
        <h2 className="font-medium text-ink">{t('notifications')}</h2>
        <p className="mt-1 text-xs text-ink/45">{t('status', { perm })}</p>
        <button
          type="button"
          className="btn-secondary mt-4 w-full"
          onClick={enableNotifs}
        >
          {t('enableNotifs')}
        </button>
      </section>

      <div className="mt-6 flex flex-col gap-2">
        <Link to="/onboarding" className="btn-secondary w-full text-center">
          {t('newGoal')}
        </Link>
        <Link to="/" className="btn-ghost w-full text-center">
          {t('backHome')}
        </Link>
        {user && (
          <button
            type="button"
            className="btn-ghost w-full text-coral"
            disabled={signingOut}
            onClick={() => void onSignOut()}
          >
            {signingOut ? t('signingOut') : t('signOut')}
          </button>
        )}
        {!user && configured && (
          <Link to="/auth" className="btn-ghost w-full text-center text-sage-deep">
            {t('signIn')}
          </Link>
        )}
      </div>
    </div>
  )
}
