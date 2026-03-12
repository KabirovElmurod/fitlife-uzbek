import { useState, useEffect } from "react";
import { Flame, Droplets, Zap, Target, TrendingDown, Utensils, Dumbbell, Plus, X, Image } from "lucide-react";
import { getTodayMeals, saveTodayMeals, defaultMealSlots, getAllMealSlots, saveCustomSlot, deleteCustomSlot, getAllFoods } from "@/lib/mealStore";
import MealSlotEditor from "@/components/MealSlotEditor";

const todayWorkouts = [
  { name: "Yugurib isitish", duration: "10 daq" },
  { name: "Squat", duration: "3x12" },
  { name: "Planka", duration: "3x45s" },
];

export default function Dashboard() {
  const [mealSlots, setMealSlots] = useState(() => {
    const saved = getTodayMeals();
    const allSlots = getAllMealSlots();
    return allSlots.map(slot => ({
      ...slot,
      time: saved[slot.id]?.time || slot.time,
      items: saved[slot.id]?.items || [],
    }));
  });

  const [showAddSlot, setShowAddSlot] = useState(false);
  const [newSlotLabel, setNewSlotLabel] = useState("");
  const [newSlotTime, setNewSlotTime] = useState("");
  const [showAddFoodModal, setShowAddFoodModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedSlotId, setSelectedSlotId] = useState(null);

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

  const handleAddCustomSlot = () => {
    if (!newSlotLabel.trim() || !newSlotTime.trim()) return;
    const newSlot = saveCustomSlot(newSlotLabel.trim(), newSlotTime.trim());
    setMealSlots(prev => [...prev, { ...newSlot, items: [] }]);
    setNewSlotLabel("");
    setNewSlotTime("");
    setShowAddSlot(false);
  };

  const handleDeleteSlot = (slotId) => {
    deleteCustomSlot(slotId);
    setMealSlots(prev => prev.filter(s => s.id !== slotId));
  };

  const handleAddSuggestedFood = (food) => {
    setSelectedFood(food);
    setShowAddFoodModal(true);
    setSelectedSlotId(null);
  };

  const handleConfirmAddFood = () => {
    if (!selectedFood || !selectedSlotId) return;
    const foodWithId = { ...selectedFood, id: Date.now() + Math.random() };
    setMealSlots(prev => prev.map(s => 
      s.id === selectedSlotId ? { ...s, items: [...s.items, foodWithId] } : s
    ));
    setShowAddFoodModal(false);
    setSelectedFood(null);
    setSelectedSlotId(null);
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
            <div key={slot.id} className="relative">
              <MealSlotEditor
                slot={slot}
                items={slot.items}
                onChange={(items) => updateSlotItems(slot.id, items)}
                onTimeChange={(time) => updateSlotTime(slot.id, time)}
              />
              {slot.isCustom && (
                <button
                  onClick={() => handleDeleteSlot(slot.id)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center hover:bg-destructive/20 transition-colors z-10"
                >
                  <X className="w-3 h-3 text-destructive" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add custom meal slot */}
        {!showAddSlot ? (
          <button
            onClick={() => setShowAddSlot(true)}
            className="w-full mt-3 py-3 rounded-xl border-2 border-dashed border-border hover:border-primary/40 transition-colors flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <Plus className="w-4 h-4" />
            Yangi ovqat vaqti qo'shish
          </button>
        ) : (
          <div className="mt-3 glass-card p-4">
            <h3 className="font-semibold text-foreground mb-3">Yangi ovqat vaqti</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Ovqat nomi (masalan: Qo'shimcha snack)"
                value={newSlotLabel}
                onChange={(e) => setNewSlotLabel(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="text"
                placeholder="Vaqt (masalan: 10:00 - 11:00)"
                value={newSlotTime}
                onChange={(e) => setNewSlotTime(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddCustomSlot}
                  className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
                >
                  Qo'shish
                </button>
                <button
                  onClick={() => { setShowAddSlot(false); setNewSlotLabel(""); setNewSlotTime(""); }}
                  className="flex-1 py-2 rounded-lg border border-input text-foreground font-medium text-sm hover:bg-muted transition-colors"
                >
                  Bekor
                </button>
              </div>
            </div>
          </div>
        )}
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

      {/* Suggested foods */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Utensils className="w-5 h-5 text-primary" />
          <h2 className="font-display font-bold text-lg text-foreground">Taklif etilgan taomlar</h2>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {getAllFoods().slice(0, 12).map((food, i) => (
            <div key={i} className="glass-card overflow-hidden flex flex-col">
              {/* Image placeholder */}
              <div className="w-full aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border-b border-border">
                <Image className="w-7 h-7 text-muted-foreground" />
              </div>
              {/* Food info */}
              <div className="p-2 flex-1 flex flex-col">
                <h3 className="font-semibold text-foreground text-xs truncate">{food.name}</h3>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-base font-display font-bold text-primary">{food.cal}</span>
                  <span className="text-[10px] text-muted-foreground">kkal</span>
                </div>
                <button
                  onClick={() => handleAddSuggestedFood(food)}
                  className="mt-auto pt-1 w-full py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-medium text-[10px] transition-colors"
                >
                  Qo'shish
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for selecting meal slot */}
      {showAddFoodModal && selectedFood && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="glass-card p-6 rounded-2xl w-full max-w-sm">
            <h3 className="font-display font-bold text-lg text-foreground mb-4">
              "{selectedFood.name}" qaysi vaqtga qo'shilsin?
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
              {mealSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => setSelectedSlotId(slot.id)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                    selectedSlotId === slot.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className="font-semibold text-foreground">{slot.label}</div>
                  <div className="text-xs text-muted-foreground">{slot.time}</div>
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleConfirmAddFood}
                disabled={!selectedSlotId}
                className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Qo'shish
              </button>
              <button
                onClick={() => { setShowAddFoodModal(false); setSelectedFood(null); setSelectedSlotId(null); }}
                className="flex-1 py-2 rounded-lg border border-input text-foreground font-medium text-sm hover:bg-muted transition-colors"
              >
                Bekor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
