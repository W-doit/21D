export type MediaPlatform = 'youtube' | 'tiktok' | 'instagram' | 'none'

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface RoutineSchedule {
  time: string
  days: DayOfWeek[]
  notify: boolean
}

export interface RemedySuggestion {
  id: string
  title: string
  description: string
  category: string
  expectedDaysToResult: number
  mediaPlatform: MediaPlatform
  mediaUrl: string
  /** Optional static guide image (e.g. /acupressure/li4.svg). */
  imageUrl?: string
  steps: string[]
}

export interface UserRoutine {
  id: string
  remedyId?: string
  title: string
  description: string
  category: string
  expectedDaysToResult: number
  mediaPlatform: MediaPlatform
  mediaUrl: string
  imageUrl?: string
  steps: string[]
  schedule: RoutineSchedule
  startDate: string
  targetDays: number
  status: 'active' | 'completed' | 'paused'
  baselineCaption?: string
  createdAt: string
}

export interface RoutineCheckin {
  id: string
  routineId: string
  dayIndex: number
  doneAt: string
  note?: string
}

export interface ProgressPhoto {
  id: string
  routineId: string
  dayIndex: number
  dataUrl: string
  caption: string
  createdAt: string
}

export interface RemedyRating {
  id: string
  routineId: string
  stars: number
  comment: string
  createdAt: string
}

export interface TransitPrompt {
  id: string
  date: string
  scope: 'daily' | 'weekly' | 'upcoming'
  title: string
  body: string
}

export interface Profile {
  displayName: string
  birthDate?: string
  birthTime?: string
  birthPlace?: string
  goal?: string
  onboardingDone: boolean
}

export interface AppStore {
  profile: Profile
  routines: UserRoutine[]
  checkins: RoutineCheckin[]
  photos: ProgressPhoto[]
  ratings: RemedyRating[]
}
