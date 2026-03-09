import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, ArrowRight } from "lucide-react";

const activityLevels = [
  { value: "sedentary", label: "Kam harakatli", desc: "Ofis ishi, kam yurish" },
  { value: "light", label: "Yengil faol", desc: "Haftada 1-3 marta mashq" },
  { value: "moderate", label: "O'rta faol", desc: "Haftada 3-5 marta mashq" },
  { value: "active", label: "Juda faol", desc: "Haftada 6-7 marta mashq" },
];

const goals = [
  { value: "lose", label: "Vazn kamaytirish", emoji: "⬇️" },
  { value: "maintain", label: "Vaznni saqlash", emoji: "⚖️" },
  { value: "gain", label: "Vazn oshirish", emoji: "⬆️" },
];

export default function Onboarding() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("");
  const [goal, setGoal] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen gradient-hero py-8 px-4">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl text-foreground">FitLife AI</span>
        </div>

        <div className="glass-card p-8">
          <h1 className="font-display font-bold text-2xl text-foreground text-center mb-2">Shaxsiy ma'lumotlar</h1>
          <p className="text-muted-foreground text-center mb-8">Sizga maxsus reja tayyorlash uchun</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Yosh</label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="25" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Jins</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" required>
                  <option value="">Tanlang</option>
                  <option value="male">Erkak</option>
                  <option value="female">Ayol</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Vazn (kg)</label>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="70" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Bo'y (sm)</label>
                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="175" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">Faoliyat darajasi</label>
              <div className="grid grid-cols-2 gap-3">
                {activityLevels.map((a) => (
                  <button
                    key={a.value}
                    type="button"
                    onClick={() => setActivity(a.value)}
                    className={`p-3 rounded-xl border text-left transition-all ${activity === a.value ? "border-primary bg-accent" : "border-input hover:border-primary/50"}`}
                  >
                    <span className="block text-sm font-semibold text-foreground">{a.label}</span>
                    <span className="block text-xs text-muted-foreground">{a.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">Maqsad</label>
              <div className="grid grid-cols-3 gap-3">
                {goals.map((g) => (
                  <button
                    key={g.value}
                    type="button"
                    onClick={() => setGoal(g.value)}
                    className={`p-3 rounded-xl border text-center transition-all ${goal === g.value ? "border-primary bg-accent" : "border-input hover:border-primary/50"}`}
                  >
                    <span className="block text-2xl mb-1">{g.emoji}</span>
                    <span className="block text-xs font-semibold text-foreground">{g.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="w-full py-3.5 rounded-xl gradient-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              Rejamni yaratish
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
