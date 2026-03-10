import { useState, useEffect } from "react";
import { Flame, Droplets, Zap, Target, TrendingDown, Utensils, Dumbbell, Plus } from "lucide-react";
import { getTodayMeals, saveTodayMeals, defaultMealSlots } from "@/lib/mealStore";
import MealSlotEditor from "@/components/MealSlotEditor";

const todayWorkouts = [
  { name: "Yugurib isitish", duration: "10 daq" },
  { name: "Squat", duration: "3x12" },
  { name: "Planka", duration: "3x45s" },
];

export default function Dashboard() {
  const [mealSlots, setMealSlots] = useState(() => {
    const saved = getTodayMeals();
    return defaultMealSlots.map(slot => ({
      ...slot,
      time: saved[slot.id]?.time || slot.time,
      items: saved[slot.id]?.items || [],
    }));
  });

  useEffect(() => {
    const data = {};
    mealSlots.forEach(slot => {
      data[slot.id] = { time: slot.time, items: slot.items };
    });
    saveTodayMeals(data);
  }, [mealSlots]);

  const totalCal = mealSlots.reduce((s, slot) => s + slot.items.reduce((ss, i) => ss + (i.cal || 0), 0), 0);
  const totalProtein = mealSlots.reduce((s, slot) => s + slot.items.reduce((ss, i) => ss + (i.protein || 0), 0), 0);
  const totalFat = mealSlots.reduce((s, slot) => s + slot.items.reduce((ss, i) => ss + (i.fat || 0), 0), 0);
  const totalCarb = mealSlots.reduce((s, slot) => s + slot.items.reduce((ss, i) => ss + (i.carb || 0), 0), 0);

  const macros = [
    { label: "Kaloriya", value: totalCal.toLocaleString(), unit: "kkal", icon: Flame, color: "text-primary" },
    { label: "Protein", value: totalProtein.toString(), unit: "g", icon: Zap, color: "text-info" },
    { label: "Yog'", value: totalFat.toString(), unit: "g", icon: Droplets, color: "text-warning" },
    { label: "Uglevodlar", value: totalCarb.toString(), unit: "g", icon: Target, color: "text-destructive" },
  ];

  const updateSlotItems = (slotId, items) => {
    setMealSlots(prev => prev.map(s => s.id === slotId ? { ...s, items } : s));
  };

  const updateSlotTime = (slotId, time) => {
    setMealSlots(prev => prev.map(s => s.id === slotId ? { ...s, time } : s));
  };

  return (
    <div className="px-4 pt-6 pb-24">
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-foreground">Salom, Foydalanuvchi! 👋</h1>
        <p className="text-muted-foreground text-sm">Bugungi rejangiz tayyor</p>
      </div>

      {/* Progress card */}
      <div className="glass-card p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-foreground">Vazn prognozi</span>
          <div className="flex items-center gap-1 text-primary text-sm font-medium">
            <TrendingDown className="w-4 h-4" />
            -0.5 kg/hafta
          </div>
        </div>
        <div className="flex items-end gap-3">
          <span className="text-4xl font-display font-bold text-foreground">72</span>
          <span className="text-muted-foreground mb-1">kg hozirgi</span>
          <span className="text-primary font-semibold mb-1 ml-auto">→ 68 kg maqsad</span>
        </div>
        <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full rounded-full gradient-primary" style={{ width: "50%" }} />
        </div>
      </div>

      {/* Macros - dynamic */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {macros.map((m) => (
          <div key={m.label} className="glass-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <m.icon className={`w-4 h-4 ${m.color}`} />
              <span className="text-xs font-medium text-muted-foreground">{m.label}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-display font-bold text-foreground">{m.value}</span>
              <span className="text-xs text-muted-foreground">{m.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Today meals - editable */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Utensils className="w-5 h-5 text-primary" />
          <h2 className="font-display font-bold text-lg text-foreground">Bugungi ovqat</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {mealSlots.map((slot) => (
            <MealSlotEditor
              key={slot.id}
              slot={slot}
              items={slot.items}
              onChange={(items) => updateSlotItems(slot.id, items)}
              onTimeChange={(time) => updateSlotTime(slot.id, time)}
            />
          ))}
        </div>
      </div>

      {/* Today workouts */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Dumbbell className="w-5 h-5 text-primary" />
          <h2 className="font-display font-bold text-lg text-foreground">Bugungi mashqlar</h2>
        </div>
        <div className="space-y-2">
          {todayWorkouts.map((w, i) => (
            <div key={i} className="glass-card p-4 flex items-center justify-between">
              <span className="font-semibold text-foreground">{w.name}</span>
              <span className="text-sm text-muted-foreground">{w.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
