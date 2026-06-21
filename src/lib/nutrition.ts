export type Sex = 'male' | 'female'
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
export type Goal = 'lose' | 'maintain' | 'gain'

export type Profile = {
  name: string
  age: number
  sex: Sex
  heightCm: number
  weightKg: number
  activity: ActivityLevel
  goal: Goal
}

export const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary: 'Sedentary (little/no exercise)',
  light: 'Light (1-3 days/week)',
  moderate: 'Moderate (3-5 days/week)',
  active: 'Active (6-7 days/week)',
  very_active: 'Very active (hard exercise daily)',
}

export const GOAL_LABELS: Record<Goal, string> = {
  lose: 'Get leaner',
  maintain: 'Stay the same',
  gain: 'Bulk up',
}

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
}

const GOAL_ADJUSTMENT: Record<Goal, number> = {
  lose: -500,
  maintain: 0,
  gain: 400,
}

const PROTEIN_PER_KG: Record<Goal, number> = {
  lose: 2.0,
  maintain: 1.6,
  gain: 1.8,
}

export function bmr(profile: Profile): number {
  const base = 10 * profile.weightKg + 6.25 * profile.heightCm - 5 * profile.age
  return profile.sex === 'male' ? base + 5 : base - 161
}

export function tdee(profile: Profile): number {
  return bmr(profile) * ACTIVITY_MULTIPLIERS[profile.activity]
}

export function targetCalories(profile: Profile): number {
  return Math.max(tdee(profile) + GOAL_ADJUSTMENT[profile.goal], 1200)
}

export function targetMacros(profile: Profile) {
  const kcal = targetCalories(profile)
  const protein = profile.weightKg * PROTEIN_PER_KG[profile.goal]
  const fat = (kcal * 0.25) / 9
  const carbs = Math.max((kcal - protein * 4 - fat * 9) / 4, 0)
  return { kcal, protein, fat, carbs }
}
