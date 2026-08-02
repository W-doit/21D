import { useMemo, useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PhotoCapture } from '../components/PhotoCapture'
import { StarRating } from '../components/StarRating'
import { VideoEmbed } from '../components/VideoEmbed'
import { useI18n } from '../i18n/I18nProvider'
import {
  getNotificationPermission,
  requestNotificationPermission,
  sendDemoNotification,
} from '../lib/notifications'
import {
  addPhoto,
  addRating,
  dayIndexSince,
  getRoutine,
  loadStore,
  uid,
  upsertRoutine,
} from '../lib/store'

export function RoutineDetailPage() {
  const { t } = useI18n()
  const { id = '' } = useParams()
  const [version, setVersion] = useState(0)
  const refresh = () => setVersion((n) => n + 1)

  const routine = useMemo(() => getRoutine(id), [id, version])
  const store = useMemo(() => loadStore(), [version])

  const [time, setTime] = useState(routine?.schedule.time ?? '21:00')
  const [notify, setNotify] = useState(routine?.schedule.notify ?? true)
  const [caption, setCaption] = useState('')
  const [stars, setStars] = useState(
    store.ratings.find((r) => r.routineId === id)?.stars ?? 0,
  )
  const [comment, setComment] = useState(
    store.ratings.find((r) => r.routineId === id)?.comment ?? '',
  )
  const [permMsg, setPermMsg] = useState<string | null>(null)

  if (!routine) {
    return (
      <div className="page">
        <p className="text-ink-soft">{t('routineNotFound')}</p>
        <Link to="/today" className="btn-secondary mt-4 inline-flex">
          {t('backToday')}
        </Link>
      </div>
    )
  }

  const day = dayIndexSince(routine.startDate)
  const photos = store.photos.filter((p) => p.routineId === routine.id)
  const needsBaseline = !photos.some((p) => p.dayIndex === 0)
  const resultDay = routine.expectedDaysToResult
  const readyToRate = day + 1 >= Math.min(resultDay, routine.targetDays)

  const saveSchedule = async () => {
    let nextNotify = notify
    if (notify) {
      const perm = await requestNotificationPermission()
      if (perm === 'granted') {
        sendDemoNotification(routine.title, `${time}`)
        setPermMsg(t('notifOn'))
      } else if (perm === 'denied') {
        nextNotify = false
        setNotify(false)
        setPermMsg(t('notifBlocked'))
      } else if (perm === 'unsupported') {
        setPermMsg(t('notifUnsupported'))
      } else {
        setPermMsg(t('status', { perm: getNotificationPermission() }))
      }
    }
    upsertRoutine({
      ...routine,
      schedule: { ...routine.schedule, time, notify: nextNotify },
    })
    refresh()
  }

  const onPhoto = (dataUrl: string, dayIndex: number) => {
    addPhoto({
      id: uid('photo'),
      routineId: routine.id,
      dayIndex,
      dataUrl,
      caption,
      createdAt: new Date().toISOString(),
    })
    if (dayIndex === 0 && caption) {
      upsertRoutine({ ...routine, baselineCaption: caption })
    }
    setCaption('')
    refresh()
  }

  const onRate = (e: FormEvent) => {
    e.preventDefault()
    if (stars < 1) return
    addRating({
      id: uid('rating'),
      routineId: routine.id,
      stars,
      comment,
      createdAt: new Date().toISOString(),
    })
    refresh()
  }

  return (
    <div className="page">
      <Link to="/today" className="text-sm text-ink-soft">
        {t('backToday')}
      </Link>

      <p className="mt-4 text-[11px] uppercase tracking-wider text-ink/40">
        {routine.category} · {t('dayOf', {
          day: Math.min(day + 1, routine.targetDays),
          total: routine.targetDays,
        })}
      </p>
      <h1 className="mt-1 text-3xl font-medium leading-tight text-ink">
        {routine.title}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        {routine.description}
      </p>

      <div className="mt-6">
        <VideoEmbed
          platform={routine.mediaPlatform}
          url={routine.mediaUrl}
          fallbackTitle={routine.title}
        />
      </div>

      <section className="mt-8">
        <h2 className="text-sm font-medium text-ink-soft">{t('steps')}</h2>
        <ol className="mt-3 space-y-2">
          {routine.steps.map((step, i) => (
            <li key={step} className="surface flex gap-3 !py-3 text-sm text-ink">
              <span className="text-ink/30">{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8 surface">
        <h2 className="font-medium text-ink">{t('alarm')}</h2>
        <p className="mt-1 text-xs text-ink/45">{t('alarmHint')}</p>
        <div className="mt-4 flex items-center gap-3">
          <input
            type="time"
            className="field !w-auto"
            value={time}
            onChange={(e) => setTime(e.target.value)}
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
        <button type="button" className="btn-secondary mt-4 w-full" onClick={saveSchedule}>
          {t('saveSchedule')}
        </button>
        {permMsg && <p className="mt-2 text-xs text-ink/50">{permMsg}</p>}
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-medium text-ink-soft">{t('progressPhotos')}</h2>
        {needsBaseline && (
          <div className="surface mt-3">
            <p className="font-medium text-ink">{t('day0Baseline')}</p>
            <p className="mt-1 text-xs text-ink/45">{t('day0Hint')}</p>
            <textarea
              className="field mt-3 min-h-[72px] resize-none"
              placeholder={t('describeLook')}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <div className="mt-3">
              <PhotoCapture
                label={t('takeBaseline')}
                onCapture={(dataUrl) => onPhoto(dataUrl, 0)}
              />
            </div>
          </div>
        )}

        {readyToRate && (
          <div className="surface mt-3">
            <p className="font-medium text-ink">{t('checkinPhoto', { n: resultDay })}</p>
            <p className="mt-1 text-xs text-ink/45">{t('checkinHint')}</p>
            <div className="mt-3">
              <PhotoCapture
                label={t('uploadFollowup')}
                onCapture={(dataUrl) => onPhoto(dataUrl, resultDay)}
              />
            </div>
          </div>
        )}

        {photos.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3">
            {photos.map((p) => (
              <figure key={p.id} className="overflow-hidden rounded-2xl ring-1 ring-ink/8">
                <img
                  src={p.dataUrl}
                  alt={p.caption || t('dayLabel', { n: p.dayIndex })}
                  className="aspect-square w-full object-cover"
                />
                <figcaption className="bg-white/80 px-2 py-1.5 text-[11px] text-ink-soft">
                  {t('dayLabel', { n: p.dayIndex })}
                  {p.caption ? ` · ${p.caption}` : ''}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>

      <section className="mt-8 surface">
        <h2 className="font-medium text-ink">{t('rateRoutine')}</h2>
        <p className="mt-1 text-xs text-ink/45">{t('rateHint')}</p>
        <form onSubmit={onRate} className="mt-4 space-y-3">
          <StarRating value={stars} onChange={setStars} />
          <textarea
            className="field min-h-[80px] resize-none"
            placeholder={t('whatWorked')}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit" className="btn-primary w-full" disabled={stars < 1}>
            {t('saveRating')}
          </button>
        </form>
      </section>
    </div>
  )
}
