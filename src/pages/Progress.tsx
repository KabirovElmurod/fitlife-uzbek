import { TrendingDown, Flame, Dumbbell, Calendar } from "lucide-react";

const weightData = [
  { week: "1-hafta", weight: 75 },
  { week: "2-hafta", weight: 74.2 },
  { week: "3-hafta", weight: 73.5 },
  { week: "4-hafta", weight: 72.8 },
  { week: "5-hafta", weight: 72.3 },
  { week: "6-hafta", weight: 72 },
];

const calorieHistory = [
  { day: "Dush", consumed: 2100, target: 2150 },
  { day: "Sesh", consumed: 2200, target: 2150 },
  { day: "Chor", consumed: 1980, target: 2150 },
  { day: "Pay", consumed: 2150, target: 2150 },
  { day: "Jum", consumed: 2300, target: 2150 },
  { day: "Shan", consumed: 2050, target: 2150 },
  { day: "Yak", consumed: 2100, target: 2150 },
];

const stats = [
  { icon: TrendingDown, label: "Tushgan vazn", value: "3 kg", color: "text-primary" },
  { icon: Flame, label: "O'rtacha kaloriya", value: "2,126", color: "text-warning" },
  { icon: Dumbbell, label: "Mashq kunlari", value: "18/30", color: "text-info" },
  { icon: Calendar, label: "Izchillik", value: "85%", color: "text-primary" },
];

export default function Progress() {
  const maxWeight = Math.max(...weightData.map((d) => d.weight));
  const minWeight = Math.min(...weightData.map((d) => d.weight));
  const range = maxWeight - minWeight || 1;

  return (
    <div className="px-4 pt-6">
      <h1 className="font-display font-bold text-2xl text-foreground mb-1">Progressingiz</h1>
      <p className="text-muted-foreground text-sm mb-6">Natijalaringizni kuzating</p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map((s, i) => (
          <div key={i} className="glass-card p-4">
            <s.icon className={`w-5 h-5 mb-2 ${s.color}`} />
            <span className="block text-xs text-muted-foreground">{s.label}</span>
            <span className="block text-xl font-display font-bold text-foreground">{s.value}</span>
          </div>
        ))}
      </div>

      {/* Weight chart (simple bars) */}
      <div className="glass-card p-5 mb-6">
        <h2 className="font-display font-bold text-foreground mb-4">Vazn o'zgarishi</h2>
        <div className="flex items-end gap-2 h-32">
          {weightData.map((d, i) => {
            const h = ((d.weight - minWeight + 0.5) / (range + 1)) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-medium text-foreground">{d.weight}</span>
                <div className="w-full rounded-t-lg gradient-primary" style={{ height: `${h}%` }} />
                <span className="text-[9px] text-muted-foreground">{d.week.replace("-hafta", "H")}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Calorie history */}
      <div className="glass-card p-5 mb-6">
        <h2 className="font-display font-bold text-foreground mb-4">Haftalik kaloriya</h2>
        <div className="space-y-2">
          {calorieHistory.map((d, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xs font-medium text-muted-foreground w-8">{d.day}</span>
              <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full gradient-primary"
                  style={{ width: `${(d.consumed / d.target) * 100}%` }}
                />
              </div>
              <span className={`text-xs font-medium ${d.consumed <= d.target ? "text-primary" : "text-destructive"}`}>
                {d.consumed}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
