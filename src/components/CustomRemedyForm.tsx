import { useState, type FormEvent } from 'react'
import { useI18n } from '../i18n/I18nProvider'
import type { MediaPlatform, RemedySuggestion, RoutineSchedule } from '../types'
import { uid } from '../lib/store'

const PLATFORMS: MediaPlatform[] = ['none', 'youtube', 'tiktok', 'instagram']

const emptyForm = () => ({
  title: '',
  description: '',
  category: '',
  expectedDaysToResult: 21,
  mediaPlatform: 'none' as MediaPlatform,
  mediaUrl: '',
  stepsText: '',
  time: '09:00',
  notify: true,
})

export function CustomRemedyForm({
  onClose,
  onSave,
}: {
  onClose: () => void
  onSave: (item: RemedySuggestion, schedule: RoutineSchedule) => void
}) {
  const { t } = useI18n()
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const title = form.title.trim()
    if (!title) {
      setError(t('customTitleRequired'))
      return
    }

    const steps = form.stepsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)

    const days = Number(form.expectedDaysToResult)
    const item: RemedySuggestion = {
      id: uid('custom'),
      title,
      description: form.description.trim(),
      category: form.category.trim() || t('customCategory'),
      expectedDaysToResult:
        Number.isFinite(days) && days >= 7 && days <= 90 ? Math.round(days) : 21,
      mediaPlatform: form.mediaPlatform,
      mediaUrl: form.mediaPlatform === 'none' ? '' : form.mediaUrl.trim(),
      steps: steps.length ? steps : [t('customDefaultStep')],
    }

    onSave(item, {
      time: form.time || '09:00',
      days: [0, 1, 2, 3, 4, 5, 6],
      notify: form.notify,
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="custom-remedy-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
        aria-label={t('closeDetail')}
        onClick={onClose}
      />

      <div className="relative z-10 flex max-h-[92dvh] w-full max-w-md flex-col overflow-hidden rounded-t-3xl bg-mist shadow-xl ring-1 ring-ink/10 sm:rounded-3xl">
        <div className="flex items-center justify-between gap-3 border-b border-ink/8 px-5 py-4">
          <h2 id="custom-remedy-title" className="text-lg font-medium text-ink">
            {t('addCustomRemedy')}
          </h2>
          <button
            type="button"
            className="rounded-full px-3 py-1 text-sm text-ink-soft hover:bg-ink/5"
            onClick={onClose}
          >
            {t('closeDetail')}
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 overflow-y-auto px-5 py-4 pb-8">
          <div>
            <label className="label" htmlFor="custom-title">
              {t('customTitle')}
            </label>
            <input
              id="custom-title"
              className="field"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder={t('customTitlePlaceholder')}
              required
            />
          </div>

          <div>
            <label className="label" htmlFor="custom-desc">
              {t('customDescription')}
            </label>
            <textarea
              id="custom-desc"
              className="field min-h-[88px] resize-none"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder={t('customDescriptionPlaceholder')}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label" htmlFor="custom-category">
                {t('customCategoryLabel')}
              </label>
              <input
                id="custom-category"
                className="field"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder={t('customCategoryPlaceholder')}
              />
            </div>
            <div>
              <label className="label" htmlFor="custom-days">
                {t('customDays')}
              </label>
              <input
                id="custom-days"
                type="number"
                min={7}
                max={90}
                className="field"
                value={form.expectedDaysToResult}
                onChange={(e) =>
                  setForm({
                    ...form,
                    expectedDaysToResult: Number(e.target.value) || 21,
                  })
                }
              />
            </div>
          </div>

          <div>
            <label className="label" htmlFor="custom-platform">
              {t('customMediaPlatform')}
            </label>
            <select
              id="custom-platform"
              className="field"
              value={form.mediaPlatform}
              onChange={(e) =>
                setForm({
                  ...form,
                  mediaPlatform: e.target.value as MediaPlatform,
                })
              }
            >
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>
                  {p === 'none' ? t('customMediaNone') : p}
                </option>
              ))}
            </select>
          </div>

          {form.mediaPlatform !== 'none' && (
            <div>
              <label className="label" htmlFor="custom-media-url">
                {t('customMediaUrl')}
              </label>
              <input
                id="custom-media-url"
                type="url"
                className="field"
                value={form.mediaUrl}
                onChange={(e) => setForm({ ...form, mediaUrl: e.target.value })}
                placeholder="https://…"
              />
            </div>
          )}

          <div>
            <label className="label" htmlFor="custom-steps">
              {t('customSteps')}
            </label>
            <textarea
              id="custom-steps"
              className="field min-h-[110px] resize-none"
              value={form.stepsText}
              onChange={(e) => setForm({ ...form, stepsText: e.target.value })}
              placeholder={t('customStepsPlaceholder')}
            />
            <p className="mt-1 text-xs text-ink/40">{t('customStepsHint')}</p>
          </div>

          <div className="surface !p-4">
            <p className="text-sm font-medium text-ink">{t('alarm')}</p>
            <p className="mt-1 text-xs text-ink/45">{t('alarmOnAddHint')}</p>
            <div className="mt-3 flex items-center gap-3">
              <input
                type="time"
                className="field !w-auto"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                aria-label={t('alarm')}
              />
              <label className="flex items-center gap-2 text-sm text-ink-soft">
                <input
                  type="checkbox"
                  checked={form.notify}
                  onChange={(e) => setForm({ ...form, notify: e.target.checked })}
                  className="size-4 accent-sage"
                />
                {t('notifyMe')}
              </label>
            </div>
          </div>

          {error && (
            <p className="rounded-2xl bg-coral/10 px-4 py-3 text-sm text-coral">
              {error}
            </p>
          )}

          <button type="submit" className="btn-primary w-full">
            {t('saveCustomRemedy')}
          </button>
        </form>
      </div>
    </div>
  )
}
