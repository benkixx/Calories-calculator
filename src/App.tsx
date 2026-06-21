import { useEffect, useMemo, useState } from 'react'
import { foods, gramsFor, CATEGORY_ORDER } from './data/foods'
import { FoodCard } from './components/FoodCard'
import { CalorieRing } from './components/CalorieRing'
import { MacroBar } from './components/MacroBar'
import { ProfileModal } from './components/ProfileModal'
import { MealConfigModal } from './components/MealConfigModal'
import { Calendar } from './components/Calendar'
import { Analytics } from './components/Analytics'
import { MealTabs } from './components/MealTabs'
import { CategorySection } from './components/CategorySection'
import { totalsForLog, totalsForMeal } from './lib/dayTotals'
import {
  loadProfile,
  saveProfile,
  loadDays,
  saveDays,
  loadMealConfig,
  saveMealConfig,
  currentMealId,
  todayKey,
  mealTypeMeta,
  type DaysMap,
  type MealConfig,
} from './lib/storage'
import { targetMacros, type Profile } from './lib/nutrition'

const FALLBACK_TARGET = { kcal: 2000, protein: 100, carbs: 250, fat: 70 }

function App() {
  const [profile, setProfile] = useState<Profile | null>(() => loadProfile())
  const [editingProfile, setEditingProfile] = useState(false)
  const [mealConfig, setMealConfig] = useState<MealConfig>(() => loadMealConfig())
  const [editingMeals, setEditingMeals] = useState(false)
  const [days, setDays] = useState<DaysMap>(() => loadDays())
  const [selectedDate, setSelectedDate] = useState(todayKey())
  const [activeMeal, setActiveMeal] = useState(() => currentMealId(loadMealConfig()))
  const [query, setQuery] = useState('')

  useEffect(() => saveDays(days), [days])

  const dayLog = useMemo(() => days[selectedDate] ?? {}, [days, selectedDate])
  const amounts = useMemo(() => dayLog[activeMeal] ?? {}, [dayLog, activeMeal])

  const updateAmount = (id: string, value: number) =>
    setDays((d) => {
      const day = { ...(d[selectedDate] ?? {}) }
      const meal = { ...(day[activeMeal] ?? {}) }
      if (value > 0) meal[id] = value
      else delete meal[id]
      day[activeMeal] = meal
      return { ...d, [selectedDate]: day }
    })

  const visibleFoods = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? foods.filter((f) => f.name.toLowerCase().includes(q)) : foods
  }, [query])

  const groups = useMemo(
    () =>
      CATEGORY_ORDER.map((category) => ({
        category,
        items: visibleFoods.filter((f) => f.category === category),
      })).filter((g) => g.items.length > 0),
    [visibleFoods],
  )

  const dayTotals = useMemo(() => totalsForLog(dayLog), [dayLog])

  const kcalByMeal = useMemo(() => {
    const result: Record<string, number> = {}
    for (const slot of mealConfig) result[slot.id] = totalsForMeal(dayLog[slot.id]).kcal
    return result
  }, [dayLog, mealConfig])

  const target = profile ? targetMacros(profile) : FALLBACK_TARGET

  const handleSaveProfile = (p: Profile) => {
    setProfile(p)
    saveProfile(p)
    setEditingProfile(false)
  }

  const handleSaveMealConfig = (config: MealConfig) => {
    setMealConfig(config)
    saveMealConfig(config)
    if (!config.some((slot) => slot.id === activeMeal)) {
      setActiveMeal(config[0].id)
    }
    setEditingMeals(false)
  }

  const activeMealSlot = mealConfig.find((m) => m.id === activeMeal) ?? mealConfig[0]
  const activeMealLabel = mealTypeMeta(activeMealSlot.type).label

  return (
    <div className="pixel-mode min-h-screen pb-16">
      {(!profile || editingProfile) && (
        <ProfileModal
          initial={profile}
          onSave={handleSaveProfile}
          onClose={() => setEditingProfile(false)}
        />
      )}
      {editingMeals && (
        <MealConfigModal
          initial={mealConfig}
          onSave={handleSaveMealConfig}
          onClose={() => setEditingMeals(false)}
        />
      )}

      <header className="px-4 pt-8 text-center md:px-6">
        <div className="pixel-panel mx-auto max-w-2xl bg-white p-6">
          <h1 className="font-pixel-display text-lg text-berry md:text-2xl">CALORIES CALCULATOR</h1>
          <p className="mt-3 font-pixel-body text-xl text-plum-soft">
            {profile ? `Hi ${profile.name}! ` : ''}Log a meal, close it, come back for the next one.
          </p>
          <div className="mt-2 flex justify-center gap-4 font-pixel-body text-base">
            {profile && (
              <button type="button" onClick={() => setEditingProfile(true)} className="text-berry underline">
                Edit profile
              </button>
            )}
            <button type="button" onClick={() => setEditingMeals(true)} className="text-berry underline">
              Edit meals
            </button>
          </div>

          <div className="mt-5">
            <MealTabs config={mealConfig} active={activeMeal} onChange={setActiveMeal} kcalByMeal={kcalByMeal} />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search foods… 🔍"
            className="pixel-chip mx-auto mt-4 block w-full max-w-xs bg-white px-4 py-2 text-center font-pixel-body text-lg text-plum focus:outline-none focus:ring-2 focus:ring-berry"
          />
        </div>
      </header>

      <main className="mx-auto mt-8 flex max-w-6xl flex-col gap-8 px-4 md:px-6 lg:flex-row">
        <section className="flex-1">
          {groups.length === 0 && (
            <p className="text-center font-pixel-body text-lg text-plum-soft">No foods match "{query}" 🥲</p>
          )}
          {groups.map(({ category, items }) => (
            <CategorySection
              key={category}
              title={category}
              count={items.length}
              forceOpen={query.trim() !== ''}
            >
              {items.map((food) => (
                <FoodCard
                  key={food.id}
                  food={food}
                  amount={amounts[food.id] ?? 0}
                  onChange={(value) => updateAmount(food.id, value)}
                />
              ))}
            </CategorySection>
          ))}
        </section>

        <aside className="flex w-full shrink-0 flex-col gap-5 lg:w-80">
          <div className="sticky top-6 flex flex-col gap-5">
            <Calendar
              selectedDate={selectedDate}
              onSelect={setSelectedDate}
              days={days}
              targetKcal={target.kcal}
            />

            <div className="pixel-panel bg-white p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-pixel-display text-xs text-plum">MY PLATE</h2>
                {selectedDate !== todayKey() && (
                  <button
                    type="button"
                    onClick={() => setSelectedDate(todayKey())}
                    className="font-pixel-body text-base text-berry underline"
                  >
                    Back to today
                  </button>
                )}
              </div>
              <p className="text-center font-pixel-body text-base text-plum-soft">
                {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>

              <div className="mt-4 flex justify-center">
                <CalorieRing kcal={dayTotals.kcal} goal={Math.round(target.kcal)} />
              </div>

              <div className="mt-5 flex flex-col gap-3">
                <MacroBar label="Protein" grams={dayTotals.protein} goalGrams={target.protein} color="var(--color-berry)" />
                <MacroBar label="Carbs" grams={dayTotals.carbs} goalGrams={target.carbs} color="var(--color-mint-deep)" />
                <MacroBar label="Fat" grams={dayTotals.fat} goalGrams={target.fat} color="var(--color-butter)" />
              </div>

              <p className="mt-5 text-center font-pixel-display text-[11px] text-plum-soft">
                {activeMealLabel.toUpperCase()} ITEMS
              </p>
              <ul className="mt-2 flex flex-col gap-2">
                {Object.keys(amounts).length === 0 && (
                  <li className="text-center font-pixel-body text-lg text-plum-soft">
                    Nothing in {activeMealLabel.toLowerCase()} yet 🍽️
                  </li>
                )}
                {foods
                  .filter((f) => (amounts[f.id] ?? 0) > 0)
                  .map((f) => {
                    const grams = gramsFor(f, amounts[f.id])
                    const kcal = (f.kcal100 / 100) * grams
                    return (
                      <li key={f.id} className="flex items-center justify-between font-pixel-body text-lg">
                        <span>
                          {f.name}{' '}
                          <span className="text-plum-soft">
                            ×{amounts[f.id]} {f.unitLabel === 'g' ? 'g' : f.unitLabel}
                          </span>
                        </span>
                        <span className="font-semibold text-plum-soft">{Math.round(kcal)} kcal</span>
                      </li>
                    )
                  })}
              </ul>
            </div>

            <Analytics days={days} selectedDate={selectedDate} targetKcal={target.kcal} goal={profile?.goal ?? null} />
          </div>
        </aside>
      </main>
    </div>
  )
}

export default App
