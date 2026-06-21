import { mealTypeMeta, type MealConfig } from '../lib/storage'

type MealTabsProps = {
  config: MealConfig
  active: string
  onChange: (mealId: string) => void
  kcalByMeal: Record<string, number>
}

export function MealTabs({ config, active, onChange, kcalByMeal }: MealTabsProps) {
  const seenTypeCounts: Record<string, number> = {}

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-wrap justify-center gap-2">
      {config.map((slot) => {
        const meta = mealTypeMeta(slot.type)
        seenTypeCounts[slot.type] = (seenTypeCounts[slot.type] ?? 0) + 1
        const occurrence = seenTypeCounts[slot.type]
        const sameTypeTotal = config.filter((s) => s.type === slot.type).length
        const label = sameTypeTotal > 1 ? `${meta.label} ${occurrence}` : meta.label

        const isActive = slot.id === active
        const kcal = kcalByMeal[slot.id] ?? 0
        return (
          <button
            key={slot.id}
            type="button"
            onClick={() => onChange(slot.id)}
            className={`pixel-btn px-4 py-2 font-pixel-display text-[11px] transition-colors ${
              isActive ? 'bg-berry text-white' : 'bg-white text-plum hover:bg-peach/30'
            }`}
          >
            {meta.icon} {label}
            {kcal > 0 && (
              <span className={`font-pixel-body text-base ${isActive ? 'text-white/80' : 'text-plum-soft'}`}>
                {' '}
                · {Math.round(kcal)} kcal
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
