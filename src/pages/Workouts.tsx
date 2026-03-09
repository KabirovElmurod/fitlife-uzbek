import { Dumbbell, Clock, Repeat, Target } from "lucide-react";

const workouts = [
  {
    name: "Squat (o'tirish-turish)",
    sets: "4 x 12",
    difficulty: "O'rta",
    muscles: "Oyoq, dumba",
    emoji: "🦵",
  },
  {
    name: "Push-up (otjimanie)",
    sets: "3 x 15",
    difficulty: "Yengil",
    muscles: "Ko'krak, qo'l",
    emoji: "💪",
  },
  {
    name: "Planka",
    sets: "3 x 45 soniya",
    difficulty: "O'rta",
    muscles: "Press, bel",
    emoji: "🧘",
  },
  {
    name: "Lunges (qadamlar)",
    sets: "3 x 10 (har tomonga)",
    difficulty: "O'rta",
    muscles: "Oyoq, muvozanat",
    emoji: "🏃",
  },
  {
    name: "Burpees",
    sets: "3 x 8",
    difficulty: "Qiyin",
    muscles: "Butun tana",
    emoji: "🔥",
  },
  {
    name: "Bicycle crunches",
    sets: "3 x 20",
    difficulty: "O'rta",
    muscles: "Press",
    emoji: "🚴",
  },
];

const difficultyColor: Record<string, string> = {
  Yengil: "bg-accent text-accent-foreground",
  "O'rta": "bg-warning/15 text-warning",
  Qiyin: "bg-destructive/15 text-destructive",
};

export default function Workouts() {
  return (
    <div className="px-4 pt-6">
      <h1 className="font-display font-bold text-2xl text-foreground mb-1">Mashqlar rejasi</h1>
      <p className="text-muted-foreground text-sm mb-6">Bugungi mashqlaringiz</p>

      {/* Summary */}
      <div className="glass-card p-4 mb-6 flex items-center justify-around">
        <div className="text-center">
          <Dumbbell className="w-5 h-5 text-primary mx-auto mb-1" />
          <span className="block text-lg font-bold text-foreground">6</span>
          <span className="text-[10px] text-muted-foreground">Mashq</span>
        </div>
        <div className="text-center">
          <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
          <span className="block text-lg font-bold text-foreground">45</span>
          <span className="text-[10px] text-muted-foreground">Daqiqa</span>
        </div>
        <div className="text-center">
          <Repeat className="w-5 h-5 text-primary mx-auto mb-1" />
          <span className="block text-lg font-bold text-foreground">19</span>
          <span className="text-[10px] text-muted-foreground">Setlar</span>
        </div>
      </div>

      {/* Workouts list */}
      <div className="space-y-3">
        {workouts.map((w, i) => (
          <div key={i} className="glass-card p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{w.emoji}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-foreground">{w.name}</h3>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${difficultyColor[w.difficulty]}`}>
                    {w.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Repeat className="w-3 h-3" />
                    {w.sets}
                  </span>
                  <span className="flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    {w.muscles}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
