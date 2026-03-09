import { useState, useRef, useEffect } from "react";
import { Plus, X, Search, Sparkles, ChevronDown, ChevronUp, Clock } from "lucide-react";
import { getAllFoods, aiEstimateCalories, saveCustomFood } from "@/lib/mealStore";

export default function MealSlotEditor({ slot, items = [], onChange, onTimeChange }) {
  const [open, setOpen] = useState(true);
  const [adding, setAdding] = useState(false);
  const [search, setSearch] = useState("");
  const [editingTime, setEditingTime] = useState(false);
  const [timeValue, setTimeValue] = useState(slot.time);
  const inputRef = useRef(null);

  useEffect(() => {
    if (adding && inputRef.current) inputRef.current.focus();
  }, [adding]);

  const allFoods = getAllFoods();
  const filtered = search.trim()
    ? allFoods.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))
    : allFoods.slice(0, 8);

  const addFood = (food) => {
    onChange([...items, { ...food, id: Date.now() + Math.random() }]);
    setSearch("");
    setAdding(false);
  };

  const addCustomFood = () => {
    if (!search.trim()) return;
    const estimated = aiEstimateCalories(search.trim());
    saveCustomFood(estimated);
    addFood(estimated);
  };

  const removeItem = (id) => {
    onChange(items.filter(item => item.id !== id));
  };

  const totalCal = items.reduce((s, i) => s + (i.cal || 0), 0);

  const saveTime = () => {
    onTimeChange(timeValue);
    setEditingTime(false);
  };

  return (
    <div className="glass-card overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">
              {slot.label.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="font-display font-bold text-foreground">{slot.label}</h3>
            {!editingTime ? (
              <button
                onClick={(e) => { e.stopPropagation(); setEditingTime(true); }}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <Clock className="w-3 h-3" />
                {slot.time}
              </button>
            ) : (
              <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                <input
                  value={timeValue}
                  onChange={e => setTimeValue(e.target.value)}
                  onBlur={saveTime}
                  onKeyDown={e => e.key === "Enter" && saveTime()}
                  className="text-xs border border-input rounded px-2 py-0.5 bg-background text-foreground w-32"
                  autoFocus
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-primary">{totalCal} kkal</span>
          {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </div>
      </button>

      {/* Items list */}
      {open && (
        <div className="px-4 pb-4">
          {items.length > 0 && (
            <div className="space-y-2 mb-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-muted/50 rounded-xl px-3 py-2.5">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground truncate">{item.name}</p>
                    <div className="flex gap-3 text-[10px] text-muted-foreground mt-0.5">
                      <span>P: {item.protein}g</span>
                      <span>Y: {item.fat}g</span>
                      <span>U: {item.carb}g</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    <span className="text-xs font-semibold text-primary whitespace-nowrap">{item.cal} kkal</span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center hover:bg-destructive/20 transition-colors"
                    >
                      <X className="w-3 h-3 text-destructive" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add food */}
          {adding ? (
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  ref={inputRef}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Taom nomini yozing..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="max-h-48 overflow-y-auto space-y-1 rounded-xl border border-border p-2 bg-card">
                {filtered.map((f, i) => (
                  <button
                    key={i}
                    onClick={() => addFood({ ...f, id: Date.now() })}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-accent transition-colors flex justify-between items-center"
                  >
                    <span className="text-sm text-foreground">{f.name}</span>
                    <span className="text-xs text-muted-foreground">{f.cal} kkal</span>
                  </button>
                ))}

                {search.trim() && !filtered.find(f => f.name.toLowerCase() === search.toLowerCase()) && (
                  <button
                    onClick={addCustomFood}
                    className="w-full text-left px-3 py-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-primary" />
                    <div>
                      <span className="text-sm font-medium text-foreground">"{search}"</span>
                      <span className="text-xs text-muted-foreground ml-1">— AI kaloriya hisoblaydi</span>
                    </div>
                  </button>
                )}
              </div>

              <button
                onClick={() => { setAdding(false); setSearch(""); }}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Bekor qilish
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAdding(true)}
              className="w-full py-2.5 rounded-xl border-2 border-dashed border-border hover:border-primary/40 transition-colors flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary"
            >
              <Plus className="w-4 h-4" />
              Taom qo'shish
            </button>
          )}
        </div>
      )}
    </div>
  );
}
