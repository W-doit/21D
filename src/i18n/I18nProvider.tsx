import {
  createContext,
  createElement,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  formatMessage,
  messages,
  type Locale,
  type MessageKey,
} from './translations'

const LANG_KEY = '21d-lang'

function readLocale(): Locale {
  try {
    const stored = localStorage.getItem(LANG_KEY)
    if (stored === 'en' || stored === 'es') return stored
  } catch {
    /* ignore */
  }
  return 'es'
}

interface I18nValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: MessageKey, vars?: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readLocale)

  const value = useMemo<I18nValue>(() => {
    const setLocale = (next: Locale) => {
      setLocaleState(next)
      try {
        localStorage.setItem(LANG_KEY, next)
      } catch {
        /* ignore */
      }
      document.documentElement.lang = next
    }

    const t = (key: MessageKey, vars?: Record<string, string | number>) =>
      formatMessage(messages[locale][key] ?? messages.es[key] ?? key, vars)

    return { locale, setLocale, t }
  }, [locale])

  return createElement(I18nContext.Provider, { value }, children)
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
