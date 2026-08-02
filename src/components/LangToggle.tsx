import { useI18n } from '../i18n/I18nProvider'

export function LangToggle({ className = '' }: { className?: string }) {
  const { locale, setLocale, t } = useI18n()

  return (
    <div
      className={`inline-flex items-center rounded-full bg-ink/5 p-0.5 text-xs font-medium ${className}`}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLocale('es')}
        className={`rounded-full px-2.5 py-1 transition ${
          locale === 'es' ? 'bg-white text-ink shadow-sm' : 'text-ink/45'
        }`}
      >
        {t('langEs')}
      </button>
      <button
        type="button"
        onClick={() => setLocale('en')}
        className={`rounded-full px-2.5 py-1 transition ${
          locale === 'en' ? 'bg-white text-ink shadow-sm' : 'text-ink/45'
        }`}
      >
        {t('langEn')}
      </button>
    </div>
  )
}
