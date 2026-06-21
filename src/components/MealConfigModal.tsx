import { useState } from 'react'
import {
  MEAL_TYPE_OPTIONS,
  type MealConfig,
  type MealType,
} from '../lib/storage'

type MealConfigModalProps = {
  initial: MealConfig
  onSave: (config: MealConfig) => void
  onClose: () => void
}

const DEFAULT_TYPE_FOR_INDEX: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack', 'drinks']
const QUICK_COUNTS = [1, 2, 3, 4, 5, 6]
const MAX_MEALS = 10

export function MealConfigModal({ initial, onSave, onClose }: MealConfigModalProps) {
  const [count, setCount] = useState(initial.length)
  const [types, setTypes] = useState<MealType[]>(
    Array.from({ length: Math.max(initial.length, 1) }, (_, i) => initial[i]?.type ?? DEFAULT_TYPE_FOR_INDEX[i % 5]),
  )

  const setMealCount = (n: number) => {
    const clamped = Math.max(1, Math.min(n, MAX_MEALS))
    setCount(clamped)
    setTypes((prev) =>
      Array.from({ length: clamped }, (_, i) => prev[i] ?? DEFAULT_TYPE_FOR_INDEX[i % 5]),
    )
  }

  const setTypeAt = (index: number, type: MealType) =>
    setTypes((prev) => prev.map((t, i) => (i === index ? type : t)))

  const submit = () => {
    const config: MealConfig = types.slice(0, count).map((type, i) => ({
      id: initial[i]?.id ?? `meal_${i + 1}`,
      type,
    }))
    onSave(config)
  }

  return (
    <div className="pixel-mode fixed inset-0 z-50 flex items-center justify-center bg-plum/40 p-4">
      <div className="pixel-panel w-full max-w-sm bg-white p-6">
        <h2 className="mb-1 text-center font-pixel-display text-sm text-plum">🍽️ YOUR MEALS</h2>
        <p className="mb-4 text-center font-pixel-body text-base text-plum-soft">
          How many meals do you eat per day?
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {QUICK_COUNTS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setMealCount(n)}
              className={`pixel-btn flex h-9 w-9 items-center justify-center font-pixel-display text-xs ${
                count === n ? 'bg-berry text-white' : 'bg-peach/50 text-plum'
              }`}
            >
              {n}
            </button>
          ))}
          <input
            type="number"
            min={1}
            max={MAX_MEALS}
            value={count}
            onChange={(e) => setMealCount(Number(e.target.value) || 1)}
            className="pixel-chip h-9 w-16 bg-white px-2 text-center font-pixel-body text-base"
            aria-label="Or type a custom number of meals"
          />
        </div>

        <div className="mt-5 flex flex-col gap-2">
          {types.slice(0, count).map((type, i) => (
            <label key={i} className="flex items-center justify-between gap-3 font-pixel-body text-lg text-plum">
              <span className="font-pixel-display text-[11px]">MEAL {i + 1}</span>
              <select
                value={type}
                onChange={(e) => setTypeAt(i, e.target.value as MealType)}
                className="pixel-chip flex-1 bg-white px-3 py-1.5"
              >
                {MEAL_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.icon} {opt.label}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="pixel-btn flex-1 bg-peach/60 py-2 font-pixel-display text-xs text-plum"
          >
            CANCEL
          </button>
          <button
            type="button"
            onClick={submit}
            className="pixel-btn flex-1 bg-berry py-2 font-pixel-display text-xs text-white"
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  )
}
