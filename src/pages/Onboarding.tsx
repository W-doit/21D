import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { updateProfile, loadStore } from '../lib/store'

export function OnboardingPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const existing = loadStore().profile
  const [goal, setGoal] = useState(existing.goal ?? '')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!goal.trim()) return
    updateProfile({
      goal: goal.trim(),
      onboardingDone: true,
    })
    navigate('/suggest', { state: { goal: goal.trim() } })
  }

  return (
    <div className="page">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink/40">
        {t('step1')}
      </p>
      <h1 className="display mt-3 text-4xl leading-tight text-ink">
        {t('onboardingTitle')}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        {t('onboardingSub')}
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <div>
          <label className="label" htmlFor="goal">
            {t('yourFocus')}
          </label>
          <textarea
            id="goal"
            className="field min-h-[140px] resize-none"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder={t('goalPlaceholder')}
            required
          />
        </div>

        <button type="submit" className="btn-primary w-full">
          {t('suggestRoutines')}
        </button>
      </form>
    </div>
  )
}
