type MacroBarProps = {
  label: string
  grams: number
  goalGrams: number
  color: string
}

const SEGMENTS = 10

export function MacroBar({ label, grams, goalGrams, color }: MacroBarProps) {
  const pct = goalGrams > 0 ? Math.min(grams / goalGrams, 1) : 0
  const filled = Math.round(pct * SEGMENTS)

  return (
    <div>
      <div className="mb-1 flex justify-between font-pixel-body text-base text-plum-soft">
        <span>{label}</span>
        <span>{Math.round(grams)}g</span>
      </div>
      <div className="grid grid-cols-10 gap-1">
        {Array.from({ length: SEGMENTS }, (_, i) => (
          <span
            key={i}
            className="h-2.5 border-2"
            style={{ borderColor: color, backgroundColor: i < filled ? color : 'transparent' }}
          />
        ))}
      </div>
    </div>
  )
}
