import { gramsFor, macrosFor, type Food } from '../data/foods'

type FoodCardProps = {
  food: Food
  amount: number
  onChange: (amount: number) => void
}

export function FoodCard({ food, amount, onChange }: FoodCardProps) {
  const isGrams = food.inputMode === 'grams'
  const active = amount > 0
  const grams = gramsFor(food, amount)
  const { kcal } = macrosFor(food, amount)

  const decrement = () => {
    const next = isGrams ? Math.max(amount - food.step, 0) : Math.max(amount - 1, 0)
    onChange(next)
  }
  const increment = () => {
    if (amount === 0) {
      onChange(isGrams ? food.defaultAmount : 1)
    } else {
      onChange(isGrams ? amount + food.step : amount + 1)
    }
  }

  const caption = isGrams
    ? `${Math.round(food.kcal100)} kcal / 100g`
    : `1 ${food.unitLabel} ≈ ${food.gramsPerUnit}g · ${Math.round((food.kcal100 / 100) * food.gramsPerUnit)} kcal`

  return (
    <div
      className="pixel-panel relative flex flex-col items-center gap-1 bg-white p-3 text-center"
      style={active ? { boxShadow: '5px 5px 0 0 var(--color-berry)', borderColor: 'var(--color-berry)' } : undefined}
    >
      <div className={`pixel-chip flex h-16 w-16 items-center justify-center ${food.bg}`}>
        <img src={food.icon} alt={food.name} className="h-11 w-11 object-contain" />
      </div>
      <p className="font-pixel-display text-[11px] leading-relaxed text-plum">{food.name}</p>
      <p className="font-pixel-body text-base text-plum-soft">{caption}</p>
      <p className="font-pixel-body text-base font-semibold text-berry">
        {active ? `${Math.round(kcal)} kcal (${Math.round(grams)}g)` : '—'}
      </p>

      <div className="mt-1 flex items-center gap-2">
        <button
          type="button"
          onClick={decrement}
          disabled={amount === 0}
          aria-label={`Remove ${food.name}`}
          className="pixel-btn flex h-7 w-7 items-center justify-center bg-peach font-pixel-display text-plum disabled:opacity-30"
        >
          −
        </button>

        {isGrams ? (
          <input
            type="number"
            min={0}
            step={food.step}
            value={amount === 0 ? '' : amount}
            placeholder="0"
            onChange={(e) => onChange(Math.max(Number(e.target.value) || 0, 0))}
            className="pixel-chip w-14 bg-cream px-1 py-0.5 text-center font-pixel-body text-base"
          />
        ) : (
          <span className="w-5 font-pixel-body text-lg font-semibold">{amount}</span>
        )}

        <button
          type="button"
          onClick={increment}
          aria-label={`Add ${food.name}`}
          className="pixel-btn flex h-7 w-7 items-center justify-center bg-mint-deep font-pixel-display text-white"
        >
          +
        </button>
      </div>
    </div>
  )
}
