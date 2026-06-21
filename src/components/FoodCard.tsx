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
      className={`relative flex flex-col items-center gap-1 rounded-3xl border-2 p-3 text-center shadow-[0_4px_0_rgba(0,0,0,0.05)] transition-transform hover:-translate-y-1 ${
        active ? 'border-berry bg-white' : 'border-white/0 bg-white'
      }`}
    >
      <div className={`flex h-20 w-20 items-center justify-center rounded-full ${food.bg}`}>
        <img src={food.icon} alt={food.name} className="h-14 w-14 object-contain" />
      </div>
      <p className="font-display text-sm font-semibold">{food.name}</p>
      <p className="text-xs text-plum-soft">{caption}</p>
      <p className="text-xs font-semibold text-berry">
        {active ? `${Math.round(kcal)} kcal (${Math.round(grams)}g)` : '—'}
      </p>

      <div className="mt-1 flex items-center gap-2">
        <button
          type="button"
          onClick={decrement}
          disabled={amount === 0}
          aria-label={`Remove ${food.name}`}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-peach text-plum disabled:opacity-30"
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
            className="w-14 rounded-full border border-peach bg-cream px-1 py-0.5 text-center text-sm"
          />
        ) : (
          <span className="w-5 text-sm font-semibold">{amount}</span>
        )}

        <button
          type="button"
          onClick={increment}
          aria-label={`Add ${food.name}`}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-mint-deep text-white"
        >
          +
        </button>
      </div>
    </div>
  )
}
