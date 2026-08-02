import type { TransitPrompt } from '../types'
import { useI18n } from '../i18n/I18nProvider'

export function AstroNudge({ prompt }: { prompt?: TransitPrompt }) {
  const { t } = useI18n()

  const resolved: TransitPrompt = prompt ?? {
    id: 'fallback-daily',
    date: new Date().toISOString().slice(0, 10),
    scope: 'daily',
    title: t('fallbackTransitTitle'),
    body: t('fallbackTransitBody'),
  }

  const scopeLabel =
    resolved.scope === 'daily'
      ? t('transitDaily')
      : resolved.scope === 'weekly'
        ? t('transitWeekly')
        : t('transitUpcoming')

  return (
    <aside className="relative overflow-hidden rounded-3xl bg-ink px-5 py-4 text-mist">
      <div
        className="pointer-events-none absolute -right-6 -top-8 h-28 w-28 rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, #8fa88a 0%, transparent 70%)',
        }}
      />
      <p className="text-[11px] uppercase tracking-[0.18em] text-leaf/80">
        {scopeLabel}
      </p>
      <h3 className="display mt-1 text-xl text-mist">{resolved.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-mist/75">{resolved.body}</p>
    </aside>
  )
}
