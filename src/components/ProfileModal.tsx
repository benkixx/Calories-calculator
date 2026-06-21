import { useState, type FormEvent } from 'react'
import {
  ACTIVITY_LABELS,
  GOAL_LABELS,
  type ActivityLevel,
  type Goal,
  type Profile,
  type Sex,
} from '../lib/nutrition'

type ProfileModalProps = {
  initial: Profile | null
  onSave: (profile: Profile) => void
  onClose: () => void
}

const DEFAULT_PROFILE: Profile = {
  name: '',
  age: 25,
  sex: 'female',
  heightCm: 165,
  weightKg: 60,
  activity: 'moderate',
  goal: 'maintain',
}

export function ProfileModal({ initial, onSave, onClose }: ProfileModalProps) {
  const [form, setForm] = useState<Profile>(initial ?? DEFAULT_PROFILE)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <div className="pixel-mode fixed inset-0 z-50 flex items-center justify-center bg-plum/40 p-4">
      <form
        onSubmit={submit}
        className="pixel-panel w-full max-w-sm bg-white p-6"
      >
        <h2 className="mb-4 text-center font-pixel-display text-sm text-plum">
          TELL ME ABOUT YOU
        </h2>

        <div className="flex flex-col gap-3 font-pixel-body text-lg text-plum">
          <label className="flex flex-col gap-1">
            Name
            <input
              required
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="pixel-chip bg-white px-3 py-1.5"
            />
          </label>

          <div className="flex gap-3">
            <label className="flex flex-1 flex-col gap-1">
              Age
              <input
                required
                type="number"
                min={1}
                max={120}
                value={form.age}
                onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
                className="pixel-chip bg-white px-3 py-1.5"
              />
            </label>
            <label className="flex flex-1 flex-col gap-1">
              Sex
              <select
                value={form.sex}
                onChange={(e) => setForm({ ...form, sex: e.target.value as Sex })}
                className="pixel-chip bg-white px-3 py-1.5"
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </label>
          </div>

          <div className="flex gap-3">
            <label className="flex flex-1 flex-col gap-1">
              Height (cm)
              <input
                required
                type="number"
                min={50}
                max={250}
                value={form.heightCm}
                onChange={(e) => setForm({ ...form, heightCm: Number(e.target.value) })}
                className="pixel-chip bg-white px-3 py-1.5"
              />
            </label>
            <label className="flex flex-1 flex-col gap-1">
              Weight (kg)
              <input
                required
                type="number"
                min={20}
                max={400}
                value={form.weightKg}
                onChange={(e) => setForm({ ...form, weightKg: Number(e.target.value) })}
                className="pixel-chip bg-white px-3 py-1.5"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1">
            Activity level
            <select
              value={form.activity}
              onChange={(e) => setForm({ ...form, activity: e.target.value as ActivityLevel })}
              className="pixel-chip bg-white px-3 py-1.5"
            >
              {Object.entries(ACTIVITY_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1">
            Goal
            <select
              value={form.goal}
              onChange={(e) => setForm({ ...form, goal: e.target.value as Goal })}
              className="pixel-chip bg-white px-3 py-1.5"
            >
              {Object.entries(GOAL_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-5 flex gap-2">
          {initial && (
            <button
              type="button"
              onClick={onClose}
              className="pixel-btn flex-1 bg-peach/60 py-2 font-pixel-display text-xs text-plum"
            >
              CANCEL
            </button>
          )}
          <button
            type="submit"
            className="pixel-btn flex-1 bg-berry py-2 font-pixel-display text-xs text-white"
          >
            SAVE
          </button>
        </div>
      </form>
    </div>
  )
}
