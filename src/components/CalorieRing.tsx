type CalorieRingProps = {
  kcal: number
  goal: number
}

const SIZE = 148
const STROKE = 14
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function CalorieRing({ kcal, goal }: CalorieRingProps) {
  const ratio = goal > 0 ? Math.min(kcal / goal, 1) : 0
  const offset = CIRCUMFERENCE * (1 - ratio)

  return (
    <div className="relative" style={{ width: SIZE, height: SIZE }}>
      <svg width={SIZE} height={SIZE} className="-rotate-90">
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="var(--color-peach)"
          strokeWidth={STROKE}
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="var(--color-berry)"
          strokeWidth={STROKE}
          strokeLinecap="square"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-pixel-display text-xl leading-none text-plum">{Math.round(kcal)}</span>
        <span className="mt-2 font-pixel-body text-base text-plum-soft">of {goal} kcal</span>
      </div>
    </div>
  )
}
