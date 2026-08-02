import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../app/auth-context'
import { syncRoutinesFromCloud } from '../lib/routinesApi'
import { loadStore, subscribeStore } from '../lib/store'
import type { DayOfWeek, UserRoutine } from '../types'

export function isScheduledOn(routine: UserRoutine, date = new Date()) {
  const days = routine.schedule.days
  if (!days?.length) return true
  return days.includes(date.getDay() as DayOfWeek)
}

/** Today's focus line from weekday-labelled steps, if any. */
export function focusForDate(routine: UserRoutine, date = new Date()) {
  const weekdayEs = [
    'domingo',
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
  ]
  const weekdayEn = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ]
  const d = date.getDay()
  const keys = [weekdayEs[d], weekdayEn[d]]
  // Also match unaccented miércoles / sábado
  if (d === 3) keys.push('miercoles')
  if (d === 6) keys.push('sabado')

  const match = routine.steps.find((s) => {
    const lower = s.toLowerCase()
    return keys.some(
      (k) =>
        lower.startsWith(k) ||
        lower.includes(`${k} —`) ||
        lower.includes(`${k} -`),
    )
  })
  if (!match) return null

  const sep = match.includes('—') ? '—' : match.includes(' - ') ? ' - ' : null
  if (sep) {
    const part = match.split(sep).slice(1).join(sep).trim()
    if (part) return part
  }
  return match
}

export function useActiveRoutines(opts?: { forDate?: Date }) {
  const { user, loading: authLoading } = useAuth()
  const [version, setVersion] = useState(0)
  const [syncing, setSyncing] = useState(false)
  const [syncError, setSyncError] = useState<string | null>(null)
  const forDate = opts?.forDate

  useEffect(() => subscribeStore(() => setVersion((n) => n + 1)), [])

  useEffect(() => {
    if (authLoading) return
    if (!user) return

    let alive = true
    setSyncing(true)
    setSyncError(null)
    void syncRoutinesFromCloud()
      .then((routines) => {
        if (!alive) return
        if (routines.length === 0) {
          setSyncError('empty')
        }
      })
      .catch(() => {
        if (alive) setSyncError('failed')
      })
      .finally(() => {
        if (alive) {
          setSyncing(false)
          setVersion((n) => n + 1)
        }
      })

    return () => {
      alive = false
    }
  }, [user, authLoading])

  const store = useMemo(() => loadStore(), [version])
  const active = useMemo(() => {
    return store.routines
      .filter((r: UserRoutine) => r.status === 'active')
      .filter((r) => (forDate ? isScheduledOn(r, forDate) : true))
      .slice()
      .sort((a, b) => a.schedule.time.localeCompare(b.schedule.time))
  }, [store, forDate])

  return {
    active,
    store,
    syncing,
    syncError,
    isGuest: !authLoading && !user,
    refresh: () => setVersion((n) => n + 1),
  }
}
