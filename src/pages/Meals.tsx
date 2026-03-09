import { useState, useEffect } from "react";
import { Flame, Zap, Droplets, Target } from "lucide-react";
import { getTodayMeals, saveTodayMeals, defaultMealSlots } from "@/lib/mealStore";
import MealSlotEditor from "@/components/MealSlotEditor";

export default function Meals() {
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

  const updateSlotItems = (slotId, items) => {
    setMealSlots(prev => prev.map(s => s.id === slotId ? { ...s, items } : s));
  };

  const updateSlotTime = (slotId, time) => {
    setMealSlots(prev => prev.map(s => s.id === slotId ? { ...s, time } : s));
  };

  return (
    <div className="px-4 pt-6 pb-24">
      <h1 className="font-display font-bold text-2xl text-foreground mb-1">Ovqatlanish rejasi</h1>
      <p className="text-muted-foreground text-sm mb-6">Taomlarni qo'shing — AI kaloriyasini hisoblaydi</p>

      {/* Summary */}
      <div className="glass-card p-4 mb-6">
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            { icon: Flame, value: totalCal.toLocaleString(), label: "kkal", cls: "text-primary" },
            { icon: Zap, value: `${totalProtein}g`, label: "Protein", cls: "text-info" },
            { icon: Droplets, value: `${totalFat}g`, label: "Yog'", cls: "text-warning" },
            { icon: Target, value: `${totalCarb}g`, label: "Ugleod", cls: "text-destructive" },
          ].map((s, i) => (
            <div key={i}>
              <s.icon className={`w-4 h-4 mx-auto mb-1 ${s.cls}`} />
              <span className="block text-lg font-bold text-foreground">{s.value}</span>
              <span className="block text-[10px] text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Meal slots */}
      <div className="space-y-3">
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
  );
}
