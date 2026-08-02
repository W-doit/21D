import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../app/auth-context'
import { useI18n } from '../i18n/I18nProvider'
import { loadStore } from '../lib/store'

export function AuthPage() {
  const { signIn, signUp, continueAsGuest, configured } = useAuth()
  const { t } = useI18n()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'in' | 'up'>('up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const goNext = () => {
    const onboarded = loadStore().profile.onboardingDone
    navigate(onboarded ? '/today' : '/onboarding')
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError(null)
    const result =
      mode === 'in'
        ? await signIn(email, password)
        : await signUp(email, password, name)
    setBusy(false)
    if (result.error) {
      setError(result.error)
      return
    }
    goNext()
  }

  const onGuest = () => {
    continueAsGuest()
    goNext()
  }

  return (
    <div className="page-wide">
      <Link to="/" className="display text-3xl text-ink">
        21D
      </Link>
      <h1 className="mt-8 text-2xl font-medium text-ink">
        {mode === 'in' ? t('welcomeBack') : t('createSpace')}
      </h1>
      <p className="mt-2 text-sm text-ink-soft">
        {configured ? t('authCloud') : t('authDemo')}
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        {mode === 'up' && (
          <div>
            <label className="label" htmlFor="name">
              {t('name')}
            </label>
            <input
              id="name"
              className="field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('namePlaceholder')}
              autoComplete="name"
            />
          </div>
        )}
        <div>
          <label className="label" htmlFor="email">
            {t('email')}
          </label>
          <input
            id="email"
            type="email"
            required={configured}
            className="field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            autoComplete="email"
          />
        </div>
        <div>
          <label className="label" htmlFor="password">
            {t('password')}
          </label>
          <input
            id="password"
            type="password"
            required={configured}
            minLength={6}
            className="field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete={mode === 'in' ? 'current-password' : 'new-password'}
          />
        </div>

        {error && (
          <p className="rounded-2xl bg-coral/10 px-4 py-3 text-sm text-coral">
            {error}
          </p>
        )}

        <button type="submit" className="btn-primary w-full" disabled={busy}>
          {busy ? t('oneMoment') : mode === 'in' ? t('signIn') : t('continue')}
        </button>
      </form>

      <button
        type="button"
        className="btn-ghost mt-3 w-full"
        onClick={() => setMode(mode === 'in' ? 'up' : 'in')}
      >
        {mode === 'in' ? t('needAccount') : t('haveAccount')}
      </button>

      <button type="button" className="btn-secondary mt-6 w-full" onClick={onGuest}>
        {t('continueGuest')}
      </button>
    </div>
  )
}
