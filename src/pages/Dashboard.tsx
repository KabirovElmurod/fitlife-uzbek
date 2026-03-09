import { Flame, Droplets, Zap, Target, TrendingDown, Utensils, Dumbbell } from "lucide-react";

const macros = [
  { label: "Kaloriya", value: "2,150", unit: "kkal", icon: Flame, color: "text-primary" },
  { label: "Protein", value: "120", unit: "g", icon: Zap, color: "text-info" },
  { label: "Yog'", value: "65", unit: "g", icon: Droplets, color: "text-warning" },
  { label: "Uglevodlar", value: "280", unit: "g", icon: Target, color: "text-destructive" },
];

const todayMeals = [
  { time: "07:00", name: "Sut bilan bo'tqa", cal: 350 },
  { time: "12:00", name: "Osh (palov)", cal: 650 },
  { time: "19:00", name: "Sabzavotli go'sht sho'rva", cal: 450 },
];

const todayWorkouts = [
  { name: "Yugurib isitish", duration: "10 daq" },
  { name: "Squat", duration: "3x12" },
  { name: "Planka", duration: "3x45s" },
];

export default function Dashboard() {
  return (
    <div className="px-4 pt-6">
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

      {/* Macros */}
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

      {/* Today meals */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Utensils className="w-5 h-5 text-primary" />
          <h2 className="font-display font-bold text-lg text-foreground">Bugungi ovqat</h2>
        </div>
        <div className="space-y-2">
          {todayMeals.map((m, i) => (
            <div key={i} className="glass-card p-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-muted-foreground">{m.time}</span>
                <p className="font-semibold text-foreground">{m.name}</p>
              </div>
              <span className="text-sm font-medium text-primary">{m.cal} kkal</span>
            </div>
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
