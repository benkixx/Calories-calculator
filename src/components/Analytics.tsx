import { toKey } from '../lib/storage'
import { totalsForLog } from '../lib/dayTotals'
import type { DaysMap } from '../lib/storage'
import type { Goal } from '../lib/nutrition'

type AnalyticsProps = {
  days: DaysMap
  selectedDate: string
  targetKcal: number
  goal: Goal | null
}

const GOAL_OVER_MESSAGE: Record<Goal, string> = {
  lose: "That's over your goal — a lighter day tomorrow will balance it out.",
  maintain: "That's a fair bit over today's target.",
  gain: 'Over target — nice, that helps the bulk!',
}

const GOAL_UNDER_MESSAGE: Record<Goal, string> = {
  lose: 'Under target — great progress toward getting leaner.',
  maintain: 'Under target today — maybe add a snack.',
  gain: "You're under target — eat a bit more to keep bulking.",
}

export function Analytics({ days, selectedDate, targetKcal, goal }: AnalyticsProps) {
  const todayKcal = totalsForLog(days[selectedDate]).kcal
  const diff = todayKcal - targetKcal

  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(selectedDate + 'T00:00:00')
    d.setDate(d.getDate() - (6 - i))
    const key = toKey(d)
    return { key, kcal: totalsForLog(days[key]).kcal }
  })
  const maxKcal = Math.max(targetKcal, ...last7.map((d) => d.kcal), 1)

  let message = 'Log a meal to see how today is tracking.'
  if (todayKcal > 0 && goal) {
    message =
      Math.abs(diff) <= targetKcal * 0.05
        ? "Right on target — nicely balanced!"
        : diff > 0
          ? `${Math.round(diff)} kcal over target. ${GOAL_OVER_MESSAGE[goal]}`
          : `${Math.round(-diff)} kcal under target. ${GOAL_UNDER_MESSAGE[goal]}`
  }

  return (
    <div className="pixel-panel bg-white p-4">
      <h3 className="mb-2 text-center font-pixel-display text-xs text-plum">LAST 7 DAYS</h3>
      <div className="flex items-end justify-between gap-1.5" style={{ height: 70 }}>
        {last7.map(({ key, kcal }) => (
          <div key={key} className="flex flex-1 flex-col items-center justify-end gap-1">
            <div
              className={`w-full border-2 border-plum ${key === selectedDate ? 'bg-berry' : 'bg-peach'}`}
              style={{ height: `${Math.min((kcal / maxKcal) * 100, 100)}%`, minHeight: kcal > 0 ? 4 : 0 }}
            />
            <span className="font-pixel-body text-sm text-plum-soft">
              {new Date(key + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'narrow' })}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center font-pixel-body text-base text-plum-soft">{message}</p>
    </div>
  )
}
