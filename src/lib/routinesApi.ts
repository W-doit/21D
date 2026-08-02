import { supabase } from './supabase'
import { loadStore, saveStore, upsertRoutine } from './store'
import type { MediaPlatform, RemedySuggestion, RoutineSchedule, UserRoutine } from '../types'
import { uid } from './store'

type DbRoutine = {
  id: string
  remedy_id: string | null
  title: string
  description: string | null
  category: string | null
  expected_days_to_result: number | null
  media_platform: string | null
  media_url: string | null
  image_url: string | null
  steps: unknown
  schedule: RoutineSchedule | null
  start_date: string
  target_days: number
  status: string
  baseline_caption: string | null
  created_at: string
}

function mapDbRoutine(row: DbRoutine): UserRoutine {
  const schedule = row.schedule ?? {
    time: '09:00',
    days: [0, 1, 2, 3, 4, 5, 6],
    notify: true,
  }
  const steps = Array.isArray(row.steps)
    ? row.steps.map((s) => String(s))
    : []
  const platform = (row.media_platform ?? 'none') as MediaPlatform

  return {
    id: row.id,
    remedyId: row.remedy_id ?? undefined,
    title: row.title,
    description: row.description ?? '',
    category: row.category ?? 'Personal',
    expectedDaysToResult: row.expected_days_to_result ?? 21,
    mediaPlatform: ['youtube', 'tiktok', 'instagram', 'none'].includes(platform)
      ? platform
      : 'none',
    mediaUrl: row.media_url ?? '',
    imageUrl: row.image_url ?? undefined,
    steps,
    schedule: {
      time: schedule.time || '09:00',
      days: schedule.days?.length ? schedule.days : [0, 1, 2, 3, 4, 5, 6],
      notify: schedule.notify !== false,
    },
    startDate: row.start_date,
    targetDays: row.target_days ?? 21,
    status: (row.status as UserRoutine['status']) || 'active',
    baselineCaption: row.baseline_caption ?? undefined,
    createdAt: row.created_at,
  }
}

/** Pull cloud routines into local store for the signed-in user. */
export async function syncRoutinesFromCloud(): Promise<UserRoutine[]> {
  if (!supabase) return loadStore().routines

  const {
    data: { session },
  } = await supabase.auth.getSession()
  const user = session?.user
  if (!user) return loadStore().routines

  const { data, error } = await supabase
    .from('user_routines')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (error) {
    console.warn('syncRoutinesFromCloud', error.message)
    return loadStore().routines
  }

  const cloud = ((data ?? []) as DbRoutine[]).map(mapDbRoutine)
  const store = loadStore()
  // Cloud is the source of truth when signed in.
  store.routines = cloud
  saveStore(store)
  return store.routines
}

export async function createRoutineForUser(
  item: RemedySuggestion,
  schedule: RoutineSchedule,
): Promise<UserRoutine> {
  const local: UserRoutine = {
    id: uid('routine'),
    remedyId:
      item.id.startsWith('custom_') || item.id.startsWith('acu-')
        ? undefined
        : item.id,
    title: item.title,
    description: item.description,
    category: item.category,
    expectedDaysToResult: item.expectedDaysToResult,
    mediaPlatform: item.mediaPlatform,
    mediaUrl: item.mediaUrl,
    imageUrl: item.imageUrl,
    steps: item.steps,
    schedule,
    startDate: new Date().toISOString().slice(0, 10),
    targetDays: 21,
    status: 'active',
    createdAt: new Date().toISOString(),
  }

  if (!supabase) {
    upsertRoutine(local)
    return local
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    upsertRoutine(local)
    return local
  }

  let remedyUuid: string | null = null
  const looksLikeUuid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      item.id,
    )

  if (looksLikeUuid) {
    remedyUuid = item.id
  } else {
    const { data: rem } = await supabase
      .from('remedies')
      .insert({
        title: item.title,
        description: item.description,
        category: item.category,
        expected_days_to_result: item.expectedDaysToResult,
        media_platform: item.mediaPlatform,
        media_url: item.mediaUrl || null,
        image_url: item.imageUrl || null,
        steps: item.steps,
        created_by: user.id,
        is_curated: false,
      })
      .select('id')
      .single()
    remedyUuid = rem?.id ?? null
  }

  const { data, error } = await supabase
    .from('user_routines')
    .insert({
      user_id: user.id,
      remedy_id: remedyUuid,
      title: item.title,
      description: item.description,
      category: item.category,
      expected_days_to_result: item.expectedDaysToResult,
      media_platform: item.mediaPlatform,
      media_url: item.mediaUrl || null,
      image_url: item.imageUrl || null,
      steps: item.steps,
      schedule,
      start_date: local.startDate,
      target_days: 21,
      status: 'active',
    })
    .select('*')
    .single()

  if (error || !data) {
    console.warn('createRoutineForUser cloud failed', error?.message)
    upsertRoutine(local)
    return local
  }

  const cloudRoutine = mapDbRoutine(data as DbRoutine)
  upsertRoutine(cloudRoutine)
  return cloudRoutine
}

export async function updateRoutineScheduleCloud(
  routine: UserRoutine,
): Promise<void> {
  return updateRoutineCloud(routine)
}

/** Persist full routine edits locally and to Supabase when signed in. */
export async function updateRoutineCloud(routine: UserRoutine): Promise<void> {
  upsertRoutine(routine)
  if (!supabase) return

  const {
    data: { session },
  } = await supabase.auth.getSession()
  const user = session?.user
  if (!user) return

  const { error } = await supabase
    .from('user_routines')
    .update({
      title: routine.title,
      description: routine.description,
      category: routine.category,
      expected_days_to_result: routine.expectedDaysToResult,
      media_platform: routine.mediaPlatform,
      media_url: routine.mediaUrl || null,
      image_url: routine.imageUrl || null,
      steps: routine.steps,
      schedule: routine.schedule,
      target_days: routine.targetDays,
      status: routine.status,
      baseline_caption: routine.baselineCaption ?? null,
    })
    .eq('id', routine.id)
    .eq('user_id', user.id)

  if (error) {
    console.warn('updateRoutineCloud', error.message)
  }
}
