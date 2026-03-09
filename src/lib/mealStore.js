// Simple meal store using localStorage

const STORAGE_KEY = "fitlife_meals";
const CUSTOM_FOODS_KEY = "fitlife_custom_foods";

// O'zbek milliy taomlari va kaloriyalari (AI bazasi)
export const foodDatabase = [
  { name: "Palov (kam yog'li)", cal: 450, protein: 25, fat: 15, carb: 55 },
  { name: "Palov (an'anaviy)", cal: 650, protein: 28, fat: 25, carb: 65 },
  { name: "Lag'mon", cal: 380, protein: 18, fat: 12, carb: 48 },
  { name: "Sho'rva (go'shtli)", cal: 350, protein: 28, fat: 12, carb: 25 },
  { name: "Mastava", cal: 320, protein: 20, fat: 10, carb: 35 },
  { name: "Somsa (go'shtli)", cal: 280, protein: 12, fat: 16, carb: 24 },
  { name: "Somsa (kartoshkali)", cal: 220, protein: 5, fat: 12, carb: 28 },
  { name: "Manti", cal: 350, protein: 18, fat: 15, carb: 35 },
  { name: "Chuchvara", cal: 300, protein: 15, fat: 12, carb: 30 },
  { name: "No'xatli sho'rva", cal: 280, protein: 16, fat: 8, carb: 38 },
  { name: "Sabzavot salat", cal: 80, protein: 2, fat: 5, carb: 8 },
  { name: "Achichuk salat", cal: 45, protein: 1, fat: 3, carb: 5 },
  { name: "Sut bilan bo'tqa", cal: 250, protein: 12, fat: 8, carb: 35 },
  { name: "Tuxum qovurmasi", cal: 180, protein: 14, fat: 12, carb: 2 },
  { name: "Non (yarim)", cal: 100, protein: 3, fat: 1, carb: 20 },
  { name: "Non (butun)", cal: 200, protein: 6, fat: 2, carb: 40 },
  { name: "Ayron", cal: 60, protein: 3, fat: 2, carb: 6 },
  { name: "Choy (qandsiz)", cal: 2, protein: 0, fat: 0, carb: 0 },
  { name: "Choy (qandli)", cal: 30, protein: 0, fat: 0, carb: 8 },
  { name: "Yong'oq va mevalar", cal: 100, protein: 3, fat: 7, carb: 8 },
  { name: "Qatiq", cal: 90, protein: 5, fat: 4, carb: 8 },
  { name: "Shashlik", cal: 320, protein: 30, fat: 18, carb: 5 },
  { name: "Kabob", cal: 280, protein: 26, fat: 16, carb: 4 },
  { name: "Dimlama", cal: 350, protein: 22, fat: 14, carb: 32 },
  { name: "Osh-tuxum", cal: 200, protein: 10, fat: 8, carb: 22 },
  { name: "Guruch (oddiy)", cal: 130, protein: 3, fat: 0, carb: 28 },
  { name: "Banan", cal: 105, protein: 1, fat: 0, carb: 27 },
  { name: "Olma", cal: 52, protein: 0, fat: 0, carb: 14 },
  { name: "Makaron", cal: 220, protein: 8, fat: 1, carb: 43 },
  { name: "Tovuq go'shti (qaynatilgan)", cal: 165, protein: 31, fat: 4, carb: 0 },
  { name: "Mol go'shti (qaynatilgan)", cal: 250, protein: 26, fat: 15, carb: 0 },
];

// AI kaloriya hisoblash (mock) - taom nomidan taxminiy hisoblaydi
export function aiEstimateCalories(foodName) {
  const name = foodName.toLowerCase();

  // Known food in database
  const found = foodDatabase.find(f => f.name.toLowerCase() === name);
  if (found) return { ...found };

  // AI estimation logic based on keywords
  let cal = 200, protein = 10, fat = 8, carb = 25;

  if (name.includes("go'sht") || name.includes("kabob") || name.includes("shashlik")) {
    cal = 300; protein = 25; fat = 15; carb = 5;
  } else if (name.includes("sho'rva") || name.includes("oshqozon")) {
    cal = 280; protein = 18; fat = 10; carb = 28;
  } else if (name.includes("salat") || name.includes("sabzavot")) {
    cal = 70; protein = 2; fat = 4; carb = 8;
  } else if (name.includes("non")) {
    cal = 150; protein = 4; fat = 1; carb = 30;
  } else if (name.includes("choy") || name.includes("suv")) {
    cal = 5; protein = 0; fat = 0; carb = 1;
  } else if (name.includes("sut") || name.includes("qatiq") || name.includes("ayron")) {
    cal = 80; protein = 4; fat = 3; carb = 7;
  } else if (name.includes("meva") || name.includes("olma") || name.includes("banan")) {
    cal = 80; protein = 1; fat = 0; carb = 20;
  } else if (name.includes("palov") || name.includes("osh")) {
    cal = 500; protein = 22; fat = 18; carb = 55;
  } else if (name.includes("somsa") || name.includes("manti") || name.includes("chuchvara")) {
    cal = 300; protein = 14; fat = 14; carb = 28;
  } else if (name.includes("tuxum")) {
    cal = 155; protein = 12; fat = 10; carb = 2;
  } else if (name.includes("guruch") || name.includes("makaron")) {
    cal = 180; protein = 5; fat = 1; carb = 36;
  } else if (name.includes("tovuq")) {
    cal = 165; protein = 31; fat = 4; carb = 0;
  }

  return { name: foodName, cal, protein, fat, carb };
}

// Get today's date key
function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

// Default meal slots
export const defaultMealSlots = [
  { id: "nonushta", label: "Nonushta", time: "07:00 - 08:00" },
  { id: "tushlik", label: "Tushlik", time: "12:00 - 13:00" },
  { id: "kechlik", label: "Kechlik", time: "18:00 - 19:00" },
  { id: "qoshimcha", label: "Qo'shimcha ovqat", time: "Istalgan vaqt" },
];

export function getTodayMeals() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return data[todayKey()] || {};
  } catch {
    return {};
  }
}

export function saveTodayMeals(meals) {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    data[todayKey()] = meals;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export function getCustomFoods() {
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_FOODS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveCustomFood(food) {
  const customs = getCustomFoods();
  if (!customs.find(f => f.name.toLowerCase() === food.name.toLowerCase())) {
    customs.push(food);
    localStorage.setItem(CUSTOM_FOODS_KEY, JSON.stringify(customs));
  }
}

export function getAllFoods() {
  return [...foodDatabase, ...getCustomFoods()];
}
