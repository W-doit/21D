import type {
  AppStore,
  ProgressPhoto,
  RemedyRating,
  RoutineCheckin,
  UserRoutine,
  Profile,
} from '../types'
import { STORE_KEY } from './pwa/install'

const defaultProfile: Profile = {
  displayName: '',
  onboardingDone: false,
}

function emptyStore(): AppStore {
  return {
    profile: { ...defaultProfile },
    routines: [],
    checkins: [],
    photos: [],
    ratings: [],
  }
}

export function loadStore(): AppStore {
  try {
    const raw = localStorage.getItem(STORE_KEY)
    if (!raw) return emptyStore()
    return { ...emptyStore(), ...JSON.parse(raw) } as AppStore
  } catch {
    return emptyStore()
  }
}

export function saveStore(store: AppStore) {
  localStorage.setItem(STORE_KEY, JSON.stringify(store))
}

export function uid(prefix = 'id') {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`
}

export function dayIndexSince(startDate: string, now = new Date()): number {
  const start = new Date(startDate)
  start.setHours(0, 0, 0, 0)
  const today = new Date(now)
  today.setHours(0, 0, 0, 0)
  return Math.max(
    0,
    Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)),
  )
}

export function todayKey(d = new Date()) {
  return d.toISOString().slice(0, 10)
}

export function upsertRoutine(routine: UserRoutine) {
  const store = loadStore()
  const idx = store.routines.findIndex((r) => r.id === routine.id)
  if (idx >= 0) store.routines[idx] = routine
  else store.routines.unshift(routine)
  saveStore(store)
  return routine
}

export function updateProfile(patch: Partial<Profile>) {
  const store = loadStore()
  store.profile = { ...store.profile, ...patch }
  saveStore(store)
  return store.profile
}

export function addCheckin(checkin: RoutineCheckin) {
  const store = loadStore()
  const exists = store.checkins.some(
    (c) => c.routineId === checkin.routineId && c.dayIndex === checkin.dayIndex,
  )
  if (!exists) {
    store.checkins.push(checkin)
    saveStore(store)
  }
  return checkin
}

export function removeCheckin(routineId: string, dayIndex: number) {
  const store = loadStore()
  store.checkins = store.checkins.filter(
    (c) => !(c.routineId === routineId && c.dayIndex === dayIndex),
  )
  saveStore(store)
}

export function addPhoto(photo: ProgressPhoto) {
  const store = loadStore()
  store.photos.push(photo)
  saveStore(store)
  return photo
}

export function addRating(rating: RemedyRating) {
  const store = loadStore()
  store.ratings = store.ratings.filter((r) => r.routineId !== rating.routineId)
  store.ratings.push(rating)
  saveStore(store)
  return rating
}

export function getRoutine(id: string) {
  return loadStore().routines.find((r) => r.id === id)
}
