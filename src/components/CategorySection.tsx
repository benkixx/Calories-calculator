import { useState, type ReactNode } from 'react'

type CategorySectionProps = {
  title: string
  count: number
  forceOpen: boolean
  children: ReactNode
}

export function CategorySection({ title, count, forceOpen, children }: CategorySectionProps) {
  const [open, setOpen] = useState(false)
  const isOpen = open || forceOpen

  return (
    <div className="pixel-panel mb-4 bg-white p-3">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-1 py-1 text-left"
      >
        <h2 className="font-pixel-display text-sm text-plum">
          {title} <span className="font-pixel-body text-lg font-normal text-plum-soft">({count})</span>
        </h2>
        <span className={`font-pixel-display text-plum-soft transition-transform ${isOpen ? 'rotate-180' : ''}`}>⌄</span>
      </button>

      {isOpen && (
        <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">{children}</div>
      )}
    </div>
  )
}
