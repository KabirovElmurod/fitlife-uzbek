import { Flame, Zap, Droplets, Target } from "lucide-react";

const meals = [
  {
    type: "Nonushta",
    time: "07:00 - 08:00",
    items: [
      { name: "Sut bilan bo'tqa", cal: 250, protein: 12, fat: 8, carb: 35 },
      { name: "Yong'oq va mevalar", cal: 100, protein: 3, fat: 7, carb: 8 },
    ],
  },
  {
    type: "Tushlik",
    time: "12:00 - 13:00",
    items: [
      { name: "Palov (kam yog'li)", cal: 450, protein: 25, fat: 15, carb: 55 },
      { name: "Sabzavot salat", cal: 80, protein: 2, fat: 5, carb: 8 },
      { name: "Ayron", cal: 60, protein: 3, fat: 2, carb: 6 },
    ],
  },
  {
    type: "Kechlik",
    time: "18:00 - 19:00",
    items: [
      { name: "Go'sht sho'rva", cal: 350, protein: 28, fat: 12, carb: 25 },
      { name: "Non (yarim)", cal: 100, protein: 3, fat: 1, carb: 20 },
    ],
  },
];

export default function Meals() {
  return (
    <div className="px-4 pt-6">
      <h1 className="font-display font-bold text-2xl text-foreground mb-1">Ovqatlanish rejasi</h1>
      <p className="text-muted-foreground text-sm mb-6">O'zbek milliy taomlariga moslashtirilgan</p>

      {/* Summary */}
      <div className="glass-card p-4 mb-6">
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            { icon: Flame, value: "1,390", label: "kkal", cls: "text-primary" },
            { icon: Zap, value: "76g", label: "Protein", cls: "text-info" },
            { icon: Droplets, value: "50g", label: "Yog'", cls: "text-warning" },
            { icon: Target, value: "157g", label: "Ugleod", cls: "text-destructive" },
          ].map((s, i) => (
            <div key={i}>
              <s.icon className={`w-4 h-4 mx-auto mb-1 ${s.cls}`} />
              <span className="block text-lg font-bold text-foreground">{s.value}</span>
              <span className="block text-[10px] text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Meals */}
      <div className="space-y-5">
        {meals.map((meal) => (
          <div key={meal.type}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-display font-bold text-lg text-foreground">{meal.type}</h2>
              <span className="text-xs text-muted-foreground">{meal.time}</span>
            </div>
            <div className="space-y-2">
              {meal.items.map((item, j) => (
                <div key={j} className="glass-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-foreground">{item.name}</span>
                    <span className="text-sm font-medium text-primary">{item.cal} kkal</span>
                  </div>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>Protein: {item.protein}g</span>
                    <span>Yog': {item.fat}g</span>
                    <span>Ugleod: {item.carb}g</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
