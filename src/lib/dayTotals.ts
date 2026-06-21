import { foods, macrosFor } from '../data/foods'
import type { DayLog, MealLog } from './storage'

type Totals = { kcal: number; protein: number; carbs: number; fat: number }

export function totalsForMeal(meal: MealLog | undefined): Totals {
  const totals: Totals = { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  if (!meal) return totals
  for (const food of foods) {
    const amount = meal[food.id] ?? 0
    if (amount <= 0) continue
    const m = macrosFor(food, amount)
    totals.kcal += m.kcal
    totals.protein += m.protein
    totals.carbs += m.carbs
    totals.fat += m.fat
  }
  return totals
}

export function totalsForLog(day: DayLog | undefined): Totals {
  const totals: Totals = { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  if (!day) return totals
  for (const meal of Object.values(day)) {
    const t = totalsForMeal(meal)
    totals.kcal += t.kcal
    totals.protein += t.protein
    totals.carbs += t.carbs
    totals.fat += t.fat
  }
  return totals
}

export function dayHasEntries(day: DayLog | undefined): boolean {
  if (!day) return false
  return Object.values(day).some((meal) => meal && Object.keys(meal).length > 0)
}
