import { useI18n } from '../i18n/I18nProvider'

export function StarRating({
  value,
  onChange,
  size = 'md',
}: {
  value: number
  onChange?: (n: number) => void
  size?: 'sm' | 'md'
}) {
  const { t } = useI18n()
  const dim = size === 'sm' ? 'text-lg' : 'text-2xl'

  return (
    <div className="flex gap-1" role="group" aria-label={t('ratingAria')}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={!onChange}
          onClick={() => onChange?.(n)}
          className={`${dim} leading-none transition ${
            n <= value ? 'text-coral' : 'text-ink/20'
          } ${onChange ? 'cursor-pointer' : 'cursor-default'}`}
          aria-label={t('starsAria', { n })}
        >
          ★
        </button>
      ))}
    </div>
  )
}
