import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useAuth } from '../app/auth-context'
import { useI18n } from '../i18n/I18nProvider'
import { supabase } from '../lib/supabase'
import { loadStore } from '../lib/store'

export function AuthPage() {
  const { continueAsGuest, configured, user, loading } = useAuth()
  const { t } = useI18n()
  const navigate = useNavigate()

  const goNext = () => {
    const onboarded = loadStore().profile.onboardingDone
    navigate(onboarded ? '/today' : '/onboarding', { replace: true })
  }

  useEffect(() => {
    if (!loading && user) goNext()
  }, [loading, user])

  const onGuest = () => {
    continueAsGuest()
    goNext()
  }

  if (loading) {
    return (
      <div className="page-wide">
        <p className="text-sm text-ink-soft">{t('oneMoment')}</p>
      </div>
    )
  }

  return (
    <div className="page-wide">
      <Link to="/" className="display text-3xl text-ink">
        21D
      </Link>
      <h1 className="mt-8 text-2xl font-medium text-ink">{t('createSpace')}</h1>
      <p className="mt-2 text-sm text-ink-soft">
        {configured ? t('authCloud') : t('authDemo')}
      </p>

      {configured && supabase ? (
        <div className="auth-ui mt-8">
          <Auth
            supabaseClient={supabase}
            view="sign_in"
            providers={[]}
            redirectTo={`${window.location.origin}/auth`}
            localization={{
              variables: {
                sign_in: {
                  email_label: t('email'),
                  password_label: t('password'),
                  button_label: t('signIn'),
                  link_text: t('haveAccount'),
                },
                sign_up: {
                  email_label: t('email'),
                  password_label: t('password'),
                  button_label: t('continue'),
                  link_text: t('needAccount'),
                },
              },
            }}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#1a2e1f',
                    brandAccent: '#4a6b50',
                    brandButtonText: '#f6f4ef',
                    defaultButtonBackground: '#ffffff',
                    defaultButtonBackgroundHover: '#ebe6db',
                    defaultButtonBorder: 'rgba(26, 46, 31, 0.12)',
                    defaultButtonText: '#1a2e1f',
                    inputBackground: 'rgba(255,255,255,0.8)',
                    inputBorder: 'rgba(26, 46, 31, 0.08)',
                    inputBorderHover: 'rgba(107, 143, 113, 0.4)',
                    inputBorderFocus: 'rgba(107, 143, 113, 0.5)',
                    inputText: '#1a2e1f',
                    inputLabelText: '#3d5244',
                    inputPlaceholder: 'rgba(26, 46, 31, 0.35)',
                  },
                  fonts: {
                    bodyFontFamily: 'Outfit, ui-sans-serif, system-ui, sans-serif',
                    buttonFontFamily: 'Outfit, ui-sans-serif, system-ui, sans-serif',
                    inputFontFamily: 'Outfit, ui-sans-serif, system-ui, sans-serif',
                    labelFontFamily: 'Outfit, ui-sans-serif, system-ui, sans-serif',
                  },
                  radii: {
                    borderRadiusButton: '16px',
                    buttonBorderRadius: '16px',
                    inputBorderRadius: '16px',
                  },
                },
              },
            }}
            theme="default"
            onlyThirdPartyProviders={false}
            magicLink={false}
            showLinks
          />
        </div>
      ) : (
        <p className="mt-8 rounded-2xl bg-sand/40 px-4 py-3 text-sm text-ink-soft">
          {t('authDemo')}
        </p>
      )}

      <button type="button" className="btn-secondary mt-6 w-full" onClick={onGuest}>
        {t('continueGuest')}
      </button>
    </div>
  )
}
