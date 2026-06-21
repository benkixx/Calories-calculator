import riceIcon from '../assets/foods/rice.png'
import eggIcon from '../assets/foods/egg.png'
import chickenIcon from '../assets/foods/chicken.png'
import beefIcon from '../assets/foods/beef.png'
import fishIcon from '../assets/foods/fish.png'
import breadIcon from '../assets/foods/bread.png'
import popcornIcon from '../assets/foods/popcorn.png'
import salmonIcon from '../assets/foods/salmon.png'
import sausageIcon from '../assets/foods/sausage.png'
import baconIcon from '../assets/foods/bacon.png'
import cookiesIcon from '../assets/foods/cookies.png'
import noodlesIcon from '../assets/foods/noodles.png'
import friedEggIcon from '../assets/foods2/fried_egg.png'
import toastIcon from '../assets/foods2/toast.png'
import avocadoToastIcon from '../assets/foods2/avocado_toast.png'
import baconToastIcon from '../assets/foods2/bacon_toast.png'
import eggToastIcon from '../assets/foods2/egg_toast.png'
import jamToastIcon from '../assets/foods2/jam_toast.png'
import pbjToastIcon from '../assets/foods2/pbj_toast.png'
import pancakesIcon from '../assets/foods2/pancakes.png'
import waffleIcon from '../assets/foods2/waffle.png'
import croissantIcon from '../assets/foods2/croissant.png'
import chocolateCroissantIcon from '../assets/foods2/chocolate_croissant.png'
import bagelIcon from '../assets/foods2/bagel.png'
import steakIcon from '../assets/foods2/steak.png'
import roastChickenLegIcon from '../assets/foods2/roast_chicken_leg.png'
import porkRoastIcon from '../assets/foods2/pork_roast.png'
import lambChopIcon from '../assets/foods2/lamb_chop.png'
import burgerIcon from '../assets/foods2/burger.png'
import pizzaIcon from '../assets/foods2/pizza.png'
import hotDogIcon from '../assets/foods2/hot_dog.png'
import cornDogIcon from '../assets/foods2/corn_dog.png'
import burritoIcon from '../assets/foods2/burrito.png'
import tacoIcon from '../assets/foods2/taco.png'
import sandwichIcon from '../assets/foods2/sandwich.png'
import garlicBreadIcon from '../assets/foods2/garlic_bread.png'
import meatballsIcon from '../assets/foods2/meatballs.png'
import sushiRollIcon from '../assets/foods2/sushi_roll.png'
import shrimpIcon from '../assets/foods2/shrimp.png'
import lobsterIcon from '../assets/foods2/lobster.png'
import calamariIcon from '../assets/foods2/calamari.png'
import snailIcon from '../assets/foods2/snail.png'
import ramenIcon from '../assets/foods2/ramen.png'
import macAndCheeseIcon from '../assets/foods2/mac_and_cheese.png'
import saladIcon from '../assets/foods2/salad.png'
import baguetteIcon from '../assets/foods2/baguette.png'
import carrotStewIcon from '../assets/foods2/carrot_stew.png'
import tomatoStewIcon from '../assets/foods2/tomato_stew.png'
import mushroomStewIcon from '../assets/foods2/mushroom_stew.png'
import pumpkinSoupIcon from '../assets/foods2/pumpkin_soup.png'
import soupIcon from '../assets/foods2/soup.png'
import mushroomIcon from '../assets/foods2/mushroom.png'
import capiaPepperIcon from '../assets/foods2/capia_pepper.png'
import cheeseIcon from '../assets/foods2/cheese.png'
import picklesIcon from '../assets/foods2/pickles.png'
import oreoIcon from '../assets/foods2/oreo.png'
import candyIcon from '../assets/foods2/candy.png'
import chestnutIcon from '../assets/foods2/chestnut.png'
import walnutIcon from '../assets/foods2/walnut.png'
import peanutsIcon from '../assets/foods2/peanuts.png'
import pretzelIcon from '../assets/foods2/pretzel.png'
import nachosIcon from '../assets/foods2/nachos.png'
import cupcakeIcon from '../assets/foods2/cupcake.png'
import chocolateCakeIcon from '../assets/foods2/chocolate_cake.png'
import strawberryCakeIcon from '../assets/foods2/strawberry_cake.png'
import pieIcon from '../assets/foods2/pie.png'
import jelloIcon from '../assets/foods2/jello.png'
import puddingIcon from '../assets/foods2/pudding.png'
import iceCreamIcon from '../assets/foods2/ice_cream.png'
import milkshakeIcon from '../assets/foods2/milkshake.png'
import chocolateDoughnutIcon from '../assets/foods2/chocolate_doughnut.png'
import jamDoughnutIcon from '../assets/foods2/jam_doughnut.png'
import pistachioDoughnutIcon from '../assets/foods2/pistachio_doughnut.png'
import strawberryDoughnutIcon from '../assets/foods2/strawberry_doughnut.png'
import chocolateBarIcon from '../assets/foods2/chocolate_bar.png'
import honeyIcon from '../assets/foods2/honey.png'
import milkAndCookiesIcon from '../assets/foods2/milk_and_cookies.png'
import cupOfCoffeeIcon from '../assets/foods2/cup_of_coffee.png'
import cupOfTeaIcon from '../assets/foods2/cup_of_tea.png'
import milkIcon from '../assets/foods2/milk.png'
import beerIcon from '../assets/foods2/beer.png'
import wineIcon from '../assets/foods2/wine.png'
import cokeIcon from '../assets/foods2/coke.png'
import lemonadeIcon from '../assets/foods2/lemonade.png'
import ketchupIcon from '../assets/foods2/ketchup.png'
import mustardIcon from '../assets/foods2/mustard.png'
import mayonnaiseIcon from '../assets/foods2/mayonnaise.png'
import salsaIcon from '../assets/foods2/salsa.png'
import oliveOilIcon from '../assets/foods2/olive_oil.png'

export type Food = {
  id: string
  name: string
  icon: string
  category: string
  bg: string
  /** label for one unit, e.g. 'egg', 'slice', 'bowl' — or 'g' for free-weight foods */
  unitLabel: string
  /** grams represented by one unit (1 for gram-mode foods) */
  gramsPerUnit: number
  /** 'stepper' = count of unitLabel; 'grams' = free numeric grams entry */
  inputMode: 'stepper' | 'grams'
  /** +/- increment (units for stepper, grams for grams-mode) */
  step: number
  /** quantity to jump to when first added (0 for stepper, a default gram amount for grams-mode) */
  defaultAmount: number
  kcal100: number
  protein100: number
  carbs100: number
  fat100: number
}

export const CATEGORY_ORDER = ["Breakfast", "Mains", "Sides & Soups", "Snacks & Sweets", "Drinks", "Condiments"]

export function gramsFor(food: Food, amount: number): number {
  return food.inputMode === 'grams' ? amount : amount * food.gramsPerUnit
}

export function macrosFor(food: Food, amount: number) {
  const grams = gramsFor(food, amount)
  return {
    kcal: (food.kcal100 / 100) * grams,
    protein: (food.protein100 / 100) * grams,
    carbs: (food.carbs100 / 100) * grams,
    fat: (food.fat100 / 100) * grams,
  }
}

export const foods: Food[] = [
  { id: 'rice', name: 'Rice', icon: riceIcon, category: 'Sides & Soups', bg: 'bg-mint', unitLabel: 'g', gramsPerUnit: 1, inputMode: 'grams', step: 25, defaultAmount: 158, kcal100: 129.747, protein100: 2.532, carbs100: 28.481, fat100: 0.253 },
  { id: 'egg', name: 'Eggs', icon: eggIcon, category: 'Breakfast', bg: 'bg-butter', unitLabel: 'egg', gramsPerUnit: 50, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 156.0, protein100: 12.0, carbs100: 1.0, fat100: 10.0 },
  { id: 'chicken', name: 'Chicken', icon: chickenIcon, category: 'Mains', bg: 'bg-peach', unitLabel: 'drumstick', gramsPerUnit: 120, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 233.333, protein100: 15.833, carbs100: 8.333, fat100: 15.0 },
  { id: 'beef', name: 'Beef', icon: beefIcon, category: 'Mains', bg: 'bg-pink', unitLabel: 'g', gramsPerUnit: 1, inputMode: 'grams', step: 25, defaultAmount: 100, kcal100: 250.0, protein100: 26.0, carbs100: 0.0, fat100: 17.0 },
  { id: 'fish', name: 'Fish', icon: fishIcon, category: 'Mains', bg: 'bg-mint', unitLabel: 'g', gramsPerUnit: 1, inputMode: 'grams', step: 25, defaultAmount: 100, kcal100: 140.0, protein100: 26.0, carbs100: 0.0, fat100: 3.0 },
  { id: 'bread', name: 'Bread', icon: breadIcon, category: 'Sides & Soups', bg: 'bg-butter', unitLabel: 'slice', gramsPerUnit: 30, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 266.667, protein100: 10.0, carbs100: 50.0, fat100: 3.333 },
  { id: 'popcorn', name: 'Popcorn', icon: popcornIcon, category: 'Snacks & Sweets', bg: 'bg-peach', unitLabel: 'cup', gramsPerUnit: 8, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 387.5, protein100: 12.5, carbs100: 75.0, fat100: 5.0 },
  { id: 'salmon', name: 'Salmon nigiri', icon: salmonIcon, category: 'Mains', bg: 'bg-pink', unitLabel: 'piece', gramsPerUnit: 20, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 325.0, protein100: 20.0, carbs100: 45.0, fat100: 7.5 },
  { id: 'sausage', name: 'Sausage', icon: sausageIcon, category: 'Mains', bg: 'bg-mint', unitLabel: 'link', gramsPerUnit: 75, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 293.333, protein100: 16.0, carbs100: 2.667, fat100: 24.0 },
  { id: 'bacon', name: 'Bacon', icon: baconIcon, category: 'Breakfast', bg: 'bg-butter', unitLabel: 'slice', gramsPerUnit: 8, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 562.5, protein100: 37.5, carbs100: 1.875, fat100: 43.75 },
  { id: 'cookies', name: 'Cookie', icon: cookiesIcon, category: 'Snacks & Sweets', bg: 'bg-peach', unitLabel: 'cookie', gramsPerUnit: 16, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 487.5, protein100: 6.25, carbs100: 62.5, fat100: 25.0 },
  { id: 'noodles', name: 'Noodles', icon: noodlesIcon, category: 'Mains', bg: 'bg-pink', unitLabel: 'g', gramsPerUnit: 1, inputMode: 'grams', step: 25, defaultAmount: 140, kcal100: 157.143, protein100: 4.286, carbs100: 28.571, fat100: 2.857 },
  { id: 'fried_egg', name: 'Fried egg', icon: friedEggIcon, category: 'Breakfast', bg: 'bg-butter', unitLabel: 'egg', gramsPerUnit: 46, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 195.652, protein100: 13.043, carbs100: 0.87, fat100: 15.217 },
  { id: 'toast', name: 'Toast', icon: toastIcon, category: 'Breakfast', bg: 'bg-peach', unitLabel: 'slice', gramsPerUnit: 30, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 400.0, protein100: 10.0, carbs100: 50.0, fat100: 16.667 },
  { id: 'avocado_toast', name: 'Avocado toast', icon: avocadoToastIcon, category: 'Breakfast', bg: 'bg-mint', unitLabel: 'serving', gramsPerUnit: 150, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 126.667, protein100: 2.667, carbs100: 12.0, fat100: 8.0 },
  { id: 'bacon_toast', name: 'Bacon toast', icon: baconToastIcon, category: 'Breakfast', bg: 'bg-pink', unitLabel: 'serving', gramsPerUnit: 150, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 140.0, protein100: 6.0, carbs100: 10.0, fat100: 8.667 },
  { id: 'egg_toast', name: 'Egg toast', icon: eggToastIcon, category: 'Breakfast', bg: 'bg-butter', unitLabel: 'serving', gramsPerUnit: 150, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 133.333, protein100: 6.0, carbs100: 10.0, fat100: 8.0 },
  { id: 'jam_toast', name: 'Jam toast', icon: jamToastIcon, category: 'Breakfast', bg: 'bg-peach', unitLabel: 'serving', gramsPerUnit: 80, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 187.5, protein100: 3.75, carbs100: 35.0, fat100: 5.0 },
  { id: 'pbj_toast', name: 'PB&J toast', icon: pbjToastIcon, category: 'Breakfast', bg: 'bg-mint', unitLabel: 'serving', gramsPerUnit: 90, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 311.111, protein100: 8.889, carbs100: 36.667, fat100: 14.444 },
  { id: 'pancakes', name: 'Pancakes', icon: pancakesIcon, category: 'Breakfast', bg: 'bg-pink', unitLabel: 'pancake', gramsPerUnit: 40, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 216.667, protein100: 5.0, carbs100: 32.5, fat100: 7.5 },
  { id: 'waffle', name: 'Waffle', icon: waffleIcon, category: 'Breakfast', bg: 'bg-butter', unitLabel: 'waffle', gramsPerUnit: 75, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 293.333, protein100: 8.0, carbs100: 33.333, fat100: 14.667 },
  { id: 'croissant', name: 'Croissant', icon: croissantIcon, category: 'Breakfast', bg: 'bg-peach', unitLabel: 'croissant', gramsPerUnit: 57, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 403.509, protein100: 8.772, carbs100: 45.614, fat100: 21.053 },
  { id: 'chocolate_croissant', name: 'Chocolate croissant', icon: chocolateCroissantIcon, category: 'Breakfast', bg: 'bg-mint', unitLabel: 'croissant', gramsPerUnit: 70, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 414.286, protein100: 7.143, carbs100: 45.714, fat100: 22.857 },
  { id: 'bagel', name: 'Bagel', icon: bagelIcon, category: 'Breakfast', bg: 'bg-pink', unitLabel: 'bagel', gramsPerUnit: 95, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 257.895, protein100: 10.526, carbs100: 50.526, fat100: 1.579 },
  { id: 'steak', name: 'Steak', icon: steakIcon, category: 'Mains', bg: 'bg-peach', unitLabel: 'g', gramsPerUnit: 1, inputMode: 'grams', step: 25, defaultAmount: 150, kcal100: 253.333, protein100: 26.667, carbs100: 0.0, fat100: 16.0 },
  { id: 'roast_chicken_leg', name: 'Roast chicken leg', icon: roastChickenLegIcon, category: 'Mains', bg: 'bg-butter', unitLabel: 'leg', gramsPerUnit: 150, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 213.333, protein100: 20.0, carbs100: 0.0, fat100: 14.667 },
  { id: 'pork_roast', name: 'Pork roast', icon: porkRoastIcon, category: 'Mains', bg: 'bg-pink', unitLabel: 'g', gramsPerUnit: 1, inputMode: 'grams', step: 25, defaultAmount: 150, kcal100: 213.333, protein100: 23.333, carbs100: 0.0, fat100: 12.667 },
  { id: 'lamb_chop', name: 'Lamb chop', icon: lambChopIcon, category: 'Mains', bg: 'bg-mint', unitLabel: 'chop', gramsPerUnit: 100, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 280.0, protein100: 25.0, carbs100: 0.0, fat100: 20.0 },
  { id: 'burger', name: 'Burger', icon: burgerIcon, category: 'Mains', bg: 'bg-peach', unitLabel: 'burger', gramsPerUnit: 220, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 204.545, protein100: 11.364, carbs100: 15.909, fat100: 10.455 },
  { id: 'pizza', name: 'Pizza', icon: pizzaIcon, category: 'Mains', bg: 'bg-butter', unitLabel: 'slice', gramsPerUnit: 125, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 228.0, protein100: 9.6, carbs100: 28.8, fat100: 8.0 },
  { id: 'hot_dog', name: 'Hot dog', icon: hotDogIcon, category: 'Mains', bg: 'bg-pink', unitLabel: 'hot dog', gramsPerUnit: 100, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 290.0, protein100: 11.0, carbs100: 24.0, fat100: 17.0 },
  { id: 'corn_dog', name: 'Corn dog', icon: cornDogIcon, category: 'Mains', bg: 'bg-mint', unitLabel: 'corn dog', gramsPerUnit: 70, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 357.143, protein100: 12.857, carbs100: 32.857, fat100: 20.0 },
  { id: 'burrito', name: 'Burrito', icon: burritoIcon, category: 'Mains', bg: 'bg-peach', unitLabel: 'burrito', gramsPerUnit: 250, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 192.0, protein100: 8.8, carbs100: 22.0, fat100: 7.6 },
  { id: 'taco', name: 'Taco', icon: tacoIcon, category: 'Mains', bg: 'bg-butter', unitLabel: 'taco', gramsPerUnit: 85, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 247.059, protein100: 11.765, carbs100: 21.176, fat100: 12.941 },
  { id: 'sandwich', name: 'Sandwich', icon: sandwichIcon, category: 'Mains', bg: 'bg-pink', unitLabel: 'sandwich', gramsPerUnit: 200, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 175.0, protein100: 9.0, carbs100: 17.5, fat100: 7.5 },
  { id: 'garlic_bread', name: 'Garlic bread', icon: garlicBreadIcon, category: 'Mains', bg: 'bg-mint', unitLabel: 'slice', gramsPerUnit: 25, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 400.0, protein100: 10.0, carbs100: 48.0, fat100: 18.0 },
  { id: 'meatballs', name: 'Meatballs', icon: meatballsIcon, category: 'Mains', bg: 'bg-peach', unitLabel: 'meatball', gramsPerUnit: 30, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 233.333, protein100: 15.0, carbs100: 8.333, fat100: 15.833 },
  { id: 'sushi_roll', name: 'Sushi roll', icon: sushiRollIcon, category: 'Mains', bg: 'bg-butter', unitLabel: 'piece', gramsPerUnit: 21, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 151.786, protein100: 5.357, carbs100: 22.619, fat100: 4.167 },
  { id: 'shrimp', name: 'Shrimp', icon: shrimpIcon, category: 'Mains', bg: 'bg-pink', unitLabel: 'g', gramsPerUnit: 1, inputMode: 'grams', step: 25, defaultAmount: 100, kcal100: 99.0, protein100: 24.0, carbs100: 0.2, fat100: 0.3 },
  { id: 'lobster', name: 'Lobster', icon: lobsterIcon, category: 'Mains', bg: 'bg-mint', unitLabel: 'g', gramsPerUnit: 1, inputMode: 'grams', step: 25, defaultAmount: 100, kcal100: 89.0, protein100: 19.0, carbs100: 0.0, fat100: 0.9 },
  { id: 'calamari', name: 'Calamari', icon: calamariIcon, category: 'Mains', bg: 'bg-peach', unitLabel: 'g', gramsPerUnit: 1, inputMode: 'grams', step: 25, defaultAmount: 100, kcal100: 240.0, protein100: 12.0, carbs100: 12.0, fat100: 16.0 },
  { id: 'snail', name: 'Snail (escargot)', icon: snailIcon, category: 'Mains', bg: 'bg-butter', unitLabel: 'snail', gramsPerUnit: 15, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 144.444, protein100: 13.333, carbs100: 2.222, fat100: 8.889 },
  { id: 'ramen', name: 'Ramen', icon: ramenIcon, category: 'Mains', bg: 'bg-pink', unitLabel: 'bowl', gramsPerUnit: 500, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 90.0, protein100: 4.0, carbs100: 12.0, fat100: 2.8 },
  { id: 'mac_and_cheese', name: 'Mac and cheese', icon: macAndCheeseIcon, category: 'Mains', bg: 'bg-mint', unitLabel: 'g', gramsPerUnit: 1, inputMode: 'grams', step: 25, defaultAmount: 200, kcal100: 155.0, protein100: 6.0, carbs100: 17.5, fat100: 7.0 },
  { id: 'salad', name: 'Salad', icon: saladIcon, category: 'Mains', bg: 'bg-peach', unitLabel: 'g', gramsPerUnit: 1, inputMode: 'grams', step: 25, defaultAmount: 300, kcal100: 50.0, protein100: 1.333, carbs100: 4.0, fat100: 3.333 },
  { id: 'baguette', name: 'Baguette', icon: baguetteIcon, category: 'Sides & Soups', bg: 'bg-butter', unitLabel: 'slice', gramsPerUnit: 30, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 266.667, protein100: 10.0, carbs100: 53.333, fat100: 1.667 },
  { id: 'carrot_stew', name: 'Carrot stew', icon: carrotStewIcon, category: 'Sides & Soups', bg: 'bg-pink', unitLabel: 'g', gramsPerUnit: 1, inputMode: 'grams', step: 50, defaultAmount: 250, kcal100: 72.0, protein100: 2.4, carbs100: 10.0, fat100: 2.4 },
  { id: 'tomato_stew', name: 'Tomato stew', icon: tomatoStewIcon, category: 'Sides & Soups', bg: 'bg-mint', unitLabel: 'g', gramsPerUnit: 1, inputMode: 'grams', step: 50, defaultAmount: 250, kcal100: 64.0, protein100: 2.0, carbs100: 8.0, fat100: 2.4 },
  { id: 'mushroom_stew', name: 'Mushroom stew', icon: mushroomStewIcon, category: 'Sides & Soups', bg: 'bg-peach', unitLabel: 'g', gramsPerUnit: 1, inputMode: 'grams', step: 50, defaultAmount: 250, kcal100: 76.0, protein100: 2.4, carbs100: 7.2, fat100: 4.0 },
  { id: 'pumpkin_soup', name: 'Pumpkin soup', icon: pumpkinSoupIcon, category: 'Sides & Soups', bg: 'bg-butter', unitLabel: 'g', gramsPerUnit: 1, inputMode: 'grams', step: 50, defaultAmount: 250, kcal100: 60.0, protein100: 1.6, carbs100: 8.8, fat100: 2.4 },
  { id: 'soup', name: 'Soup', icon: soupIcon, category: 'Sides & Soups', bg: 'bg-pink', unitLabel: 'g', gramsPerUnit: 1, inputMode: 'grams', step: 50, defaultAmount: 250, kcal100: 80.0, protein100: 2.4, carbs100: 7.2, fat100: 4.8 },
  { id: 'mushroom', name: 'Mushroom', icon: mushroomIcon, category: 'Sides & Soups', bg: 'bg-mint', unitLabel: 'g', gramsPerUnit: 1, inputMode: 'grams', step: 10, defaultAmount: 70, kcal100: 21.429, protein100: 2.857, carbs100: 2.857, fat100: 0.286 },
  { id: 'capia_pepper', name: 'Capia pepper', icon: capiaPepperIcon, category: 'Sides & Soups', bg: 'bg-peach', unitLabel: 'pepper', gramsPerUnit: 120, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 30.833, protein100: 0.833, carbs100: 5.833, fat100: 0.333 },
  { id: 'cheese', name: 'Cheese', icon: cheeseIcon, category: 'Sides & Soups', bg: 'bg-butter', unitLabel: 'slice', gramsPerUnit: 30, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 366.667, protein100: 23.333, carbs100: 3.333, fat100: 30.0 },
  { id: 'pickles', name: 'Pickles', icon: picklesIcon, category: 'Sides & Soups', bg: 'bg-pink', unitLabel: 'spear', gramsPerUnit: 35, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 17.143, protein100: 0.857, carbs100: 4.0, fat100: 0.0 },
  { id: 'oreo', name: 'Oreo', icon: oreoIcon, category: 'Snacks & Sweets', bg: 'bg-mint', unitLabel: 'cookie', gramsPerUnit: 11, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 484.848, protein100: 3.03, carbs100: 75.758, fat100: 21.212 },
  { id: 'candy', name: 'Candy', icon: candyIcon, category: 'Snacks & Sweets', bg: 'bg-peach', unitLabel: 'piece', gramsPerUnit: 10, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 400.0, protein100: 0.0, carbs100: 100.0, fat100: 0.0 },
  { id: 'chestnut', name: 'Chestnut', icon: chestnutIcon, category: 'Snacks & Sweets', bg: 'bg-butter', unitLabel: 'nut', gramsPerUnit: 10, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 206.0, protein100: 3.2, carbs100: 46.0, fat100: 2.0 },
  { id: 'walnut', name: 'Walnut', icon: walnutIcon, category: 'Snacks & Sweets', bg: 'bg-pink', unitLabel: 'g', gramsPerUnit: 1, inputMode: 'grams', step: 5, defaultAmount: 28, kcal100: 660.714, protein100: 15.357, carbs100: 14.286, fat100: 64.286 },
  { id: 'peanuts', name: 'Peanuts', icon: peanutsIcon, category: 'Snacks & Sweets', bg: 'bg-mint', unitLabel: 'g', gramsPerUnit: 1, inputMode: 'grams', step: 5, defaultAmount: 28, kcal100: 575.0, protein100: 25.0, carbs100: 17.857, fat100: 50.0 },
  { id: 'pretzel', name: 'Pretzel', icon: pretzelIcon, category: 'Snacks & Sweets', bg: 'bg-peach', unitLabel: 'pretzel', gramsPerUnit: 90, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 377.778, protein100: 10.0, carbs100: 80.0, fat100: 2.222 },
  { id: 'nachos', name: 'Nachos', icon: nachosIcon, category: 'Snacks & Sweets', bg: 'bg-butter', unitLabel: 'g', gramsPerUnit: 1, inputMode: 'grams', step: 25, defaultAmount: 150, kcal100: 233.333, protein100: 6.0, carbs100: 24.0, fat100: 12.667 },
  { id: 'cupcake', name: 'Cupcake', icon: cupcakeIcon, category: 'Snacks & Sweets', bg: 'bg-pink', unitLabel: 'cupcake', gramsPerUnit: 65, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 369.231, protein100: 4.615, carbs100: 53.846, fat100: 15.385 },
  { id: 'chocolate_cake', name: 'Chocolate cake', icon: chocolateCakeIcon, category: 'Snacks & Sweets', bg: 'bg-mint', unitLabel: 'slice', gramsPerUnit: 95, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 389.474, protein100: 5.263, carbs100: 52.632, fat100: 18.947 },
  { id: 'strawberry_cake', name: 'Strawberry cake', icon: strawberryCakeIcon, category: 'Snacks & Sweets', bg: 'bg-peach', unitLabel: 'slice', gramsPerUnit: 100, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 320.0, protein100: 4.0, carbs100: 45.0, fat100: 14.0 },
  { id: 'pie', name: 'Pie', icon: pieIcon, category: 'Snacks & Sweets', bg: 'bg-butter', unitLabel: 'slice', gramsPerUnit: 125, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 232.0, protein100: 1.6, carbs100: 32.8, fat100: 10.4 },
  { id: 'jello', name: 'Jello', icon: jelloIcon, category: 'Snacks & Sweets', bg: 'bg-pink', unitLabel: 'cup', gramsPerUnit: 170, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 47.059, protein100: 1.176, carbs100: 11.176, fat100: 0.0 },
  { id: 'pudding', name: 'Pudding', icon: puddingIcon, category: 'Snacks & Sweets', bg: 'bg-mint', unitLabel: 'cup', gramsPerUnit: 150, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 100.0, protein100: 2.0, carbs100: 16.667, fat100: 2.667 },
  { id: 'ice_cream', name: 'Ice cream', icon: iceCreamIcon, category: 'Snacks & Sweets', bg: 'bg-peach', unitLabel: 'cup', gramsPerUnit: 140, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 192.857, protein100: 3.571, carbs100: 22.857, fat100: 10.0 },
  { id: 'milkshake', name: 'Milkshake', icon: milkshakeIcon, category: 'Snacks & Sweets', bg: 'bg-butter', unitLabel: 'cup', gramsPerUnit: 300, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 116.667, protein100: 2.667, carbs100: 16.667, fat100: 4.333 },
  { id: 'chocolate_doughnut', name: 'Chocolate doughnut', icon: chocolateDoughnutIcon, category: 'Snacks & Sweets', bg: 'bg-pink', unitLabel: 'doughnut', gramsPerUnit: 60, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 400.0, protein100: 5.0, carbs100: 50.0, fat100: 21.667 },
  { id: 'jam_doughnut', name: 'Jam doughnut', icon: jamDoughnutIcon, category: 'Snacks & Sweets', bg: 'bg-mint', unitLabel: 'doughnut', gramsPerUnit: 65, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 446.154, protein100: 6.154, carbs100: 58.462, fat100: 21.538 },
  { id: 'pistachio_doughnut', name: 'Pistachio doughnut', icon: pistachioDoughnutIcon, category: 'Snacks & Sweets', bg: 'bg-peach', unitLabel: 'doughnut', gramsPerUnit: 60, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 433.333, protein100: 6.667, carbs100: 53.333, fat100: 21.667 },
  { id: 'strawberry_doughnut', name: 'Strawberry doughnut', icon: strawberryDoughnutIcon, category: 'Snacks & Sweets', bg: 'bg-butter', unitLabel: 'doughnut', gramsPerUnit: 60, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 416.667, protein100: 5.0, carbs100: 55.0, fat100: 20.0 },
  { id: 'chocolate_bar', name: 'Chocolate bar', icon: chocolateBarIcon, category: 'Snacks & Sweets', bg: 'bg-pink', unitLabel: 'bar', gramsPerUnit: 45, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 511.111, protein100: 6.667, carbs100: 57.778, fat100: 28.889 },
  { id: 'honey', name: 'Honey', icon: honeyIcon, category: 'Snacks & Sweets', bg: 'bg-mint', unitLabel: 'tbsp', gramsPerUnit: 21, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 304.762, protein100: 0.0, carbs100: 80.952, fat100: 0.0 },
  { id: 'milk_and_cookies', name: 'Milk and cookies', icon: milkAndCookiesIcon, category: 'Snacks & Sweets', bg: 'bg-peach', unitLabel: 'serving', gramsPerUnit: 300, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 86.667, protein100: 3.0, carbs100: 11.667, fat100: 3.0 },
  { id: 'cup_of_coffee', name: 'Cup of coffee', icon: cupOfCoffeeIcon, category: 'Drinks', bg: 'bg-butter', unitLabel: 'cup', gramsPerUnit: 240, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 2.083, protein100: 0.125, carbs100: 0.0, fat100: 0.0 },
  { id: 'cup_of_tea', name: 'Cup of tea', icon: cupOfTeaIcon, category: 'Drinks', bg: 'bg-pink', unitLabel: 'cup', gramsPerUnit: 240, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 0.833, protein100: 0.0, carbs100: 0.208, fat100: 0.0 },
  { id: 'milk', name: 'Milk', icon: milkIcon, category: 'Drinks', bg: 'bg-mint', unitLabel: 'cup', gramsPerUnit: 244, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 61.475, protein100: 3.279, carbs100: 4.918, fat100: 3.279 },
  { id: 'beer', name: 'Beer', icon: beerIcon, category: 'Drinks', bg: 'bg-peach', unitLabel: 'bottle', gramsPerUnit: 355, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 42.254, protein100: 0.451, carbs100: 3.662, fat100: 0.0 },
  { id: 'wine', name: 'Wine', icon: wineIcon, category: 'Drinks', bg: 'bg-butter', unitLabel: 'glass', gramsPerUnit: 150, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 83.333, protein100: 0.067, carbs100: 2.667, fat100: 0.0 },
  { id: 'coke', name: 'Coke', icon: cokeIcon, category: 'Drinks', bg: 'bg-pink', unitLabel: 'can', gramsPerUnit: 355, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 39.437, protein100: 0.0, carbs100: 10.986, fat100: 0.0 },
  { id: 'lemonade', name: 'Lemonade', icon: lemonadeIcon, category: 'Drinks', bg: 'bg-mint', unitLabel: 'cup', gramsPerUnit: 240, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 41.667, protein100: 0.0, carbs100: 10.833, fat100: 0.0 },
  { id: 'ketchup', name: 'Ketchup', icon: ketchupIcon, category: 'Condiments', bg: 'bg-peach', unitLabel: 'tbsp', gramsPerUnit: 17, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 100.0, protein100: 1.176, carbs100: 26.471, fat100: 0.0 },
  { id: 'mustard', name: 'Mustard', icon: mustardIcon, category: 'Condiments', bg: 'bg-butter', unitLabel: 'tbsp', gramsPerUnit: 15, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 66.667, protein100: 4.0, carbs100: 6.667, fat100: 4.0 },
  { id: 'mayonnaise', name: 'Mayonnaise', icon: mayonnaiseIcon, category: 'Condiments', bg: 'bg-pink', unitLabel: 'tbsp', gramsPerUnit: 14, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 642.857, protein100: 0.714, carbs100: 0.714, fat100: 71.429 },
  { id: 'salsa', name: 'Salsa', icon: salsaIcon, category: 'Condiments', bg: 'bg-mint', unitLabel: 'tbsp', gramsPerUnit: 15, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 33.333, protein100: 1.333, carbs100: 6.667, fat100: 0.0 },
  { id: 'olive_oil', name: 'Olive oil', icon: oliveOilIcon, category: 'Condiments', bg: 'bg-peach', unitLabel: 'tbsp', gramsPerUnit: 14, inputMode: 'stepper', step: 1, defaultAmount: 0, kcal100: 857.143, protein100: 0.0, carbs100: 0.0, fat100: 100.0 },
]
