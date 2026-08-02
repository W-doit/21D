import { useEffect, useState } from 'react'
import {
  canPromptInstall,
  isIos,
  isStandalone,
  promptInstall,
  subscribeInstall,
} from '../lib/pwa/install'
import { useI18n } from '../i18n/I18nProvider'

export function InstallButton({
  variant = 'primary',
  className = '',
}: {
  variant?: 'primary' | 'secondary'
  className?: string
}) {
  const { t } = useI18n()
  const [ready, setReady] = useState(canPromptInstall())
  const [installed, setInstalled] = useState(isStandalone())
  const [iosHint, setIosHint] = useState(false)
  const ios = isIos()

  useEffect(() => {
    setInstalled(isStandalone())
    return subscribeInstall(() => {
      setReady(canPromptInstall())
      setInstalled(isStandalone())
    })
  }, [])

  if (installed) {
    return (
      <p className={`text-sm text-sage-deep ${className}`}>{t('installed')}</p>
    )
  }

  const btnClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary'

  const onClick = async () => {
    if (ready) {
      await promptInstall()
      return
    }
    if (ios) setIosHint(true)
  }

  return (
    <div className={className}>
      <button type="button" className={`${btnClass} w-full`} onClick={onClick}>
        {ready ? t('downloadApp') : ios ? t('addToHomeScreen') : t('downloadApp')}
      </button>
      {iosHint && (
        <p className="mt-3 text-center text-sm leading-relaxed text-ink-soft">
          {t('iosInstallHint')}
        </p>
      )}
      {!ready && !ios && !iosHint && (
        <p className="mt-2 text-center text-xs text-ink/45">
          {t('androidInstallHint')}
        </p>
      )}
    </div>
  )
}
