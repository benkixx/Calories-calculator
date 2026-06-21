type MacroBarProps = {
  label: string
  grams: number
  goalGrams: number
  color: string
}

export function MacroBar({ label, grams, goalGrams, color }: MacroBarProps) {
  const pct = goalGrams > 0 ? Math.min((grams / goalGrams) * 100, 100) : 0

  return (
    <div>
      <div className="mb-1 flex justify-between text-xs font-semibold text-plum-soft">
        <span>{label}</span>
        <span>{Math.round(grams)}g</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-peach/60">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}
