import { useState } from "react";
import { TrendingDown, Flame, Dumbbell, Calendar } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, Area, AreaChart
} from "recharts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const weightData = [
  { week: "1-hafta", weight: 75 },
  { week: "2-hafta", weight: 74.2 },
  { week: "3-hafta", weight: 73.5 },
  { week: "4-hafta", weight: 72.8 },
  { week: "5-hafta", weight: 72.3 },
  { week: "6-hafta", weight: 72 },
];

const calorieComparison = [
  { day: "Dush", ai: 2150, user: 2100 },
  { day: "Sesh", ai: 2150, user: 2200 },
  { day: "Chor", ai: 2150, user: 1980 },
  { day: "Pay", ai: 2150, user: 2150 },
  { day: "Jum", ai: 2150, user: 2300 },
  { day: "Shan", ai: 2150, user: 2050 },
  { day: "Yak", ai: 2150, user: 2100 },
];

const userMeals = [
  { name: "Palov", cal: 450 },
  { name: "Bo'tqa", cal: 250 },
  { name: "Sho'rva", cal: 350 },
  { name: "Salat", cal: 80 },
  { name: "Non", cal: 100 },
  { name: "Ayron", cal: 60 },
  { name: "Mevalar", cal: 120 },
  { name: "Yong'oq", cal: 100 },
];

const stats = [
  { icon: TrendingDown, label: "Tushgan vazn", value: "3 kg", color: "text-primary" },
  { icon: Flame, label: "O'rtacha kaloriya", value: "2,126", color: "text-warning" },
  { icon: Dumbbell, label: "Mashq kunlari", value: "18/30", color: "text-info" },
  { icon: Calendar, label: "Izchillik", value: "85%", color: "text-primary" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card p-3 text-xs">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>
          {p.name}: <span className="font-bold">{p.value}</span>
        </p>
      ))}
    </div>
  );
};

export default function Progress() {
  const [calorieView, setCalorieView] = useState("combined");

  return (
    <div className="px-4 pt-6 pb-24">
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

      {/* Weight chart */}
      <div className="glass-card p-5 mb-6">
        <h2 className="font-display font-bold text-foreground mb-4">📉 Vazn o'zgarishi</h2>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weightData}>
              <defs>
                <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(152, 60%, 42%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(152, 60%, 42%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(148, 15%, 90%)" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "hsl(150, 5%, 50%)" }} />
              <YAxis domain={["dataMin - 0.5", "dataMax + 0.5"]} tick={{ fontSize: 11, fill: "hsl(150, 5%, 50%)" }} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone" dataKey="weight" name="Vazn (kg)"
                stroke="hsl(152, 60%, 42%)" strokeWidth={2.5}
                fill="url(#weightGrad)"
                dot={{ r: 4, fill: "hsl(152, 60%, 42%)", strokeWidth: 2, stroke: "#fff" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Calorie comparison */}
      <div className="glass-card p-5 mb-6">
        <h2 className="font-display font-bold text-foreground mb-3">🔥 Kaloriya: AI tavsiya vs Siz</h2>

        <Tabs value={calorieView} onValueChange={setCalorieView} className="mb-4">
          <TabsList className="w-full bg-muted">
            <TabsTrigger value="combined" className="flex-1 text-xs">Birgalikda</TabsTrigger>
            <TabsTrigger value="ai" className="flex-1 text-xs">AI tavsiya</TabsTrigger>
            <TabsTrigger value="user" className="flex-1 text-xs">Siz kiritgan</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={calorieComparison} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(148, 15%, 90%)" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(150, 5%, 50%)" }} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(150, 5%, 50%)" }} />
              <Tooltip content={<CustomTooltip />} />
              {(calorieView === "combined" || calorieView === "ai") && (
                <Bar dataKey="ai" name="AI tavsiya" fill="hsl(152, 60%, 42%)" radius={[4, 4, 0, 0]} />
              )}
              {(calorieView === "combined" || calorieView === "user") && (
                <Bar dataKey="user" name="Siz kiritgan" fill="hsl(210, 80%, 55%)" radius={[4, 4, 0, 0]} />
              )}
              {calorieView === "combined" && <Legend wrapperStyle={{ fontSize: 11 }} />}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Per-meal calorie chart */}
      <div className="glass-card p-5 mb-6">
        <h2 className="font-display font-bold text-foreground mb-4">🍽️ Taomlar bo'yicha kaloriya</h2>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={userMeals} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(148, 15%, 90%)" />
              <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(150, 5%, 50%)" }} />
              <YAxis dataKey="name" type="category" width={65} tick={{ fontSize: 10, fill: "hsl(150, 5%, 50%)" }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="cal" name="Kaloriya" fill="hsl(38, 92%, 50%)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Workout consistency */}
      <div className="glass-card p-5 mb-6">
        <h2 className="font-display font-bold text-foreground mb-4">💪 Mashq izchilligi</h2>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={calorieComparison.map((d, i) => ({ day: d.day, done: i < 5 ? 1 : 0 }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(148, 15%, 90%)" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(150, 5%, 50%)" }} />
              <YAxis domain={[0, 1]} ticks={[0, 1]} tickFormatter={(v) => v ? "✅" : "❌"} tick={{ fontSize: 14 }} />
              <Line type="stepAfter" dataKey="done" name="Mashq" stroke="hsl(152, 60%, 42%)" strokeWidth={2} dot={{ r: 5, fill: "hsl(152, 60%, 42%)" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
