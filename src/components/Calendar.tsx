import { useState } from 'react'
import { toKey, type DaysMap } from '../lib/storage'
import { dayHasEntries, totalsForLog } from '../lib/dayTotals'

type CalendarProps = {
  selectedDate: string
  onSelect: (dateKey: string) => void
  days: DaysMap
  targetKcal: number
}

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function dotColor(kcal: number, targetKcal: number) {
  const ratio = kcal / targetKcal
  if (ratio < 0.85) return 'bg-mint-deep'
  if (ratio <= 1.1) return 'bg-berry'
  return 'bg-pink-deep'
}

export function Calendar({ selectedDate, onSelect, days, targetKcal }: CalendarProps) {
  const initial = new Date(selectedDate + 'T00:00:00')
  const [viewYear, setViewYear] = useState(initial.getFullYear())
  const [viewMonth, setViewMonth] = useState(initial.getMonth())

  const first = new Date(viewYear, viewMonth, 1)
  const startOffset = first.getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const todayKeyStr = toKey(new Date())

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  const changeMonth = (delta: number) => {
    let m = viewMonth + delta
    let y = viewYear
    if (m < 0) {
      m = 11
      y -= 1
    } else if (m > 11) {
      m = 0
      y += 1
    }
    setViewMonth(m)
    setViewYear(y)
  }

  return (
    <div className="rounded-3xl bg-white p-4 shadow-[0_4px_0_rgba(0,0,0,0.05)]">
      <div className="mb-2 flex items-center justify-between">
        <button type="button" onClick={() => changeMonth(-1)} className="px-2 text-plum-soft" aria-label="Previous month">
          ‹
        </button>
        <span className="font-display text-sm font-bold text-plum">
          {first.toLocaleString('en-US', { month: 'long' })} {viewYear}
        </span>
        <button type="button" onClick={() => changeMonth(1)} className="px-2 text-plum-soft" aria-label="Next month">
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-plum-soft">
        {WEEKDAYS.map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <span key={i} />
          const key = toKey(new Date(viewYear, viewMonth, day))
          const log = days[key]
          const dayKcal = totalsForLog(log).kcal
          const isSelected = key === selectedDate
          const isToday = key === todayKeyStr

          return (
            <button
              key={i}
              type="button"
              aria-label={`Select ${key}`}
              onClick={() => onSelect(key)}
              className={`relative flex flex-col items-center rounded-full py-1 text-xs ${
                isSelected ? 'bg-berry text-white' : isToday ? 'bg-peach text-plum' : 'text-plum hover:bg-cream'
              }`}
            >
              {day}
              {dayHasEntries(log) && (
                <span className={`mt-0.5 h-1.5 w-1.5 rounded-full ${dotColor(dayKcal, targetKcal)}`} />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
