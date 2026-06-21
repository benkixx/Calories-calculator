import type { Profile } from './nutrition'

const PROFILE_KEY = 'snackcount:profile'
const DAYS_KEY = 'snackcount:days'
const MEAL_CONFIG_KEY = 'snackcount:mealConfig'

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'drinks'

export const MEAL_TYPE_OPTIONS: { value: MealType; label: string; icon: string }[] = [
  { value: 'breakfast', label: 'Breakfast', icon: '🌅' },
  { value: 'lunch', label: 'Lunch', icon: '☀️' },
  { value: 'dinner', label: 'Dinner', icon: '🌙' },
  { value: 'snack', label: 'Snack', icon: '🍿' },
  { value: 'drinks', label: 'Drinks', icon: '🥤' },
]

export function mealTypeMeta(type: MealType) {
  return MEAL_TYPE_OPTIONS.find((o) => o.value === type) ?? MEAL_TYPE_OPTIONS[0]
}

/** one configurable meal slot, e.g. { id: 'breakfast', type: 'breakfast' } or { id: 'meal_6', type: 'snack' } */
export type MealSlotConfig = { id: string; type: MealType }
export type MealConfig = MealSlotConfig[]

export const DEFAULT_MEAL_CONFIG: MealConfig = [
  { id: 'breakfast', type: 'breakfast' },
  { id: 'lunch', type: 'lunch' },
  { id: 'dinner', type: 'dinner' },
  { id: 'snacks', type: 'snack' },
  { id: 'drinks', type: 'drinks' },
]

/** pick a sensible default active slot for "right now", based on time of day */
export function currentMealId(config: MealConfig): string {
  const hour = new Date().getHours()
  const wanted: MealType = hour < 11 ? 'breakfast' : hour < 15 ? 'lunch' : hour < 21 ? 'dinner' : 'snack'
  return config.find((m) => m.type === wanted)?.id ?? config[0]?.id ?? DEFAULT_MEAL_CONFIG[0].id
}

/** foodId -> amount (grams or unit count, see Food.inputMode) */
export type MealLog = Record<string, number>
/** one calendar day, split into meal slots (keyed by MealSlotConfig.id) */
export type DayLog = Record<string, MealLog>
export type DaysMap = Record<string, DayLog>

export function todayKey(): string {
  return toKey(new Date())
}

export function toKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function loadProfile(): Profile | null {
  try {
    const raw = localStorage.getItem(PROFILE_KEY)
    return raw ? (JSON.parse(raw) as Profile) : null
  } catch {
    return null
  }
}

export function saveProfile(profile: Profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}

export function loadMealConfig(): MealConfig {
  try {
    const raw = localStorage.getItem(MEAL_CONFIG_KEY)
    const parsed = raw ? (JSON.parse(raw) as MealConfig) : null
    return parsed && parsed.length > 0 ? parsed : DEFAULT_MEAL_CONFIG
  } catch {
    return DEFAULT_MEAL_CONFIG
  }
}

export function saveMealConfig(config: MealConfig) {
  localStorage.setItem(MEAL_CONFIG_KEY, JSON.stringify(config))
}

export function loadDays(): DaysMap {
  try {
    const raw = localStorage.getItem(DAYS_KEY)
    return raw ? (JSON.parse(raw) as DaysMap) : {}
  } catch {
    return {}
  }
}

export function saveDays(days: DaysMap) {
  localStorage.setItem(DAYS_KEY, JSON.stringify(days))
}
