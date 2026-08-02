import { useState, type FormEvent } from 'react'
import { useI18n } from '../i18n/I18nProvider'
import type { DayOfWeek, MediaPlatform, UserRoutine } from '../types'

const PLATFORMS: MediaPlatform[] = ['none', 'youtube', 'tiktok', 'instagram']

const DAY_KEYS = [
  'daySun',
  'dayMon',
  'dayTue',
  'dayWed',
  'dayThu',
  'dayFri',
  'daySat',
] as const

export function RoutineEditForm({
  routine,
  onCancel,
  onSave,
}: {
  routine: UserRoutine
  onCancel: () => void
  onSave: (next: UserRoutine) => Promise<void> | void
}) {
  const { t } = useI18n()
  const [title, setTitle] = useState(routine.title)
  const [description, setDescription] = useState(routine.description)
  const [category, setCategory] = useState(routine.category)
  const [expectedDays, setExpectedDays] = useState(routine.expectedDaysToResult)
  const [stepsText, setStepsText] = useState(routine.steps.join('\n'))
  const [mediaPlatform, setMediaPlatform] = useState<MediaPlatform>(
    routine.mediaPlatform || 'none',
  )
  const [mediaUrl, setMediaUrl] = useState(routine.mediaUrl || '')
  const [time, setTime] = useState(routine.schedule.time)
  const [notify, setNotify] = useState(routine.schedule.notify)
  const [days, setDays] = useState<DayOfWeek[]>(
    routine.schedule.days?.length
      ? [...routine.schedule.days]
      : [0, 1, 2, 3, 4, 5, 6],
  )
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const toggleDay = (day: DayOfWeek) => {
    setDays((prev) => {
      if (prev.includes(day)) {
        const next = prev.filter((d) => d !== day)
        return next.length ? next : prev
      }
      return [...prev, day].sort((a, b) => a - b) as DayOfWeek[]
    })
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) {
      setError(t('customTitleRequired'))
      return
    }
    const steps = stepsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)

    setSaving(true)
    setError(null)
    try {
      await onSave({
        ...routine,
        title: trimmed,
        description: description.trim(),
        category: category.trim() || routine.category,
        expectedDaysToResult:
          Number.isFinite(expectedDays) && expectedDays >= 7 && expectedDays <= 90
            ? Math.round(expectedDays)
            : routine.expectedDaysToResult,
        mediaPlatform,
        mediaUrl: mediaPlatform === 'none' ? '' : mediaUrl.trim(),
        steps: steps.length ? steps : routine.steps,
        schedule: {
          time: time || routine.schedule.time,
          days,
          notify,
        },
      })
    } catch {
      setError(t('saveRoutineFailed'))
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-medium text-ink-soft">{t('editRoutine')}</h2>
        <button
          type="button"
          className="text-sm text-ink-soft hover:text-ink"
          onClick={onCancel}
        >
          {t('cancelEdit')}
        </button>
      </div>

      <div>
        <label className="label" htmlFor="edit-title">
          {t('customTitle')}
        </label>
        <input
          id="edit-title"
          className="field"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="label" htmlFor="edit-desc">
          {t('customDescription')}
        </label>
        <textarea
          id="edit-desc"
          className="field min-h-[88px] resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label" htmlFor="edit-category">
            {t('customCategoryLabel')}
          </label>
          <input
            id="edit-category"
            className="field"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <label className="label" htmlFor="edit-days">
            {t('customDays')}
          </label>
          <input
            id="edit-days"
            type="number"
            min={7}
            max={90}
            className="field"
            value={expectedDays}
            onChange={(e) => setExpectedDays(Number(e.target.value) || 21)}
          />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="edit-platform">
          {t('customMediaPlatform')}
        </label>
        <select
          id="edit-platform"
          className="field"
          value={mediaPlatform}
          onChange={(e) => setMediaPlatform(e.target.value as MediaPlatform)}
        >
          {PLATFORMS.map((p) => (
            <option key={p} value={p}>
              {p === 'none' ? t('customMediaNone') : p}
            </option>
          ))}
        </select>
      </div>

      {mediaPlatform !== 'none' && (
        <div>
          <label className="label" htmlFor="edit-media-url">
            {t('customMediaUrl')}
          </label>
          <input
            id="edit-media-url"
            type="url"
            className="field"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            placeholder="https://…"
          />
          <p className="mt-1 text-xs text-ink/40">{t('editVideoHint')}</p>
        </div>
      )}

      <div>
        <label className="label" htmlFor="edit-steps">
          {t('customSteps')}
        </label>
        <textarea
          id="edit-steps"
          className="field min-h-[140px] resize-none"
          value={stepsText}
          onChange={(e) => setStepsText(e.target.value)}
        />
        <p className="mt-1 text-xs text-ink/40">{t('customStepsHint')}</p>
      </div>

      <div className="surface !p-4">
        <p className="text-sm font-medium text-ink">{t('alarm')}</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <input
            type="time"
            className="field !w-auto"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            aria-label={t('alarm')}
          />
          <label className="flex items-center gap-2 text-sm text-ink-soft">
            <input
              type="checkbox"
              checked={notify}
              onChange={(e) => setNotify(e.target.checked)}
              className="size-4 accent-sage"
            />
            {t('notifyMe')}
          </label>
        </div>

        <p className="mt-4 text-xs font-medium uppercase tracking-wider text-ink/40">
          {t('scheduleDays')}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {DAY_KEYS.map((key, i) => {
            const day = i as DayOfWeek
            const on = days.includes(day)
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggleDay(day)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  on
                    ? 'bg-ink text-mist'
                    : 'bg-white/70 text-ink-soft ring-1 ring-ink/10'
                }`}
              >
                {t(key)}
              </button>
            )
          })}
        </div>
      </div>

      {error && (
        <p className="rounded-2xl bg-coral/10 px-4 py-3 text-sm text-coral">
          {error}
        </p>
      )}

      <button type="submit" className="btn-primary w-full" disabled={saving}>
        {saving ? t('savingRoutine') : t('saveRoutine')}
      </button>
    </form>
  )
}
