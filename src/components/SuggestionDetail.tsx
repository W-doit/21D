import { VideoEmbed } from './VideoEmbed'
import { useI18n } from '../i18n/I18nProvider'
import type { RemedySuggestion } from '../types'

export function SuggestionDetail({
  item,
  isAdded,
  onClose,
  onAdd,
}: {
  item: RemedySuggestion
  isAdded: boolean
  onClose: () => void
  onAdd: () => void
}) {
  const { t } = useI18n()

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="suggestion-detail-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
        aria-label={t('closeDetail')}
        onClick={onClose}
      />

      <div className="relative z-10 flex max-h-[92dvh] w-full max-w-md flex-col overflow-hidden rounded-t-3xl bg-mist shadow-xl ring-1 ring-ink/10 sm:rounded-3xl">
        <div className="flex items-center justify-between gap-3 border-b border-ink/8 px-5 py-4">
          <p className="text-[11px] uppercase tracking-wider text-ink/40">
            {item.category} · {t('daysApprox', { n: item.expectedDaysToResult })}
          </p>
          <button
            type="button"
            className="rounded-full px-3 py-1 text-sm text-ink-soft hover:bg-ink/5"
            onClick={onClose}
          >
            {t('closeDetail')}
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-4 pb-8">
          <h2
            id="suggestion-detail-title"
            className="text-2xl font-medium leading-tight text-ink"
          >
            {item.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            {item.description}
          </p>

          {(item.mediaPlatform !== 'none' || item.mediaUrl) && (
            <div className="mt-5">
              <p className="mb-2 text-sm font-medium text-ink-soft">
                {t('visualGuide')}
              </p>
              <VideoEmbed
                platform={item.mediaPlatform}
                url={item.mediaUrl}
                fallbackTitle={item.title}
              />
            </div>
          )}

          {item.steps.length > 0 && (
            <section className="mt-6">
              <h3 className="text-sm font-medium text-ink-soft">{t('steps')}</h3>
              <ol className="mt-3 space-y-2">
                {item.steps.map((step, i) => (
                  <li
                    key={`${item.id}-step-${i}`}
                    className="surface flex gap-3 !py-3 text-sm text-ink"
                  >
                    <span className="text-ink/30">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </section>
          )}

          <button
            type="button"
            disabled={isAdded}
            className={`mt-6 w-full ${isAdded ? 'btn-secondary' : 'btn-primary'}`}
            onClick={onAdd}
          >
            {isAdded ? t('addedToPlan') : t('addToPlan')}
          </button>
        </div>
      </div>
    </div>
  )
}
