import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../app/auth-context'
import { InstallButton } from '../components/InstallButton'
import { LangToggle } from '../components/LangToggle'
import { useI18n } from '../i18n/I18nProvider'
import {
  getNotificationPermission,
  requestNotificationPermission,
} from '../lib/notifications'
import { isStandalone } from '../lib/pwa/install'
import { loadStore, updateProfile } from '../lib/store'

export function ProfilePage() {
  const { t } = useI18n()
  const { user, configured, signOut } = useAuth()
  const store = loadStore()
  const [name, setName] = useState(store.profile.displayName)
  const [birthDate, setBirthDate] = useState(store.profile.birthDate ?? '')
  const [birthTime, setBirthTime] = useState(store.profile.birthTime ?? '')
  const [birthPlace, setBirthPlace] = useState(store.profile.birthPlace ?? '')
  const [perm, setPerm] = useState(getNotificationPermission())
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setPerm(getNotificationPermission())
  }, [])

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
        <button type="button" className="btn-secondary mt-4 w-full" onClick={enableNotifs}>
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
        {(user || configured) && (
          <button
            type="button"
            className="btn-ghost w-full text-coral"
            onClick={() => signOut()}
          >
            {t('signOut')}
          </button>
        )}
      </div>
    </div>
  )
}
