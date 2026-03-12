import { Link, useLocation } from "react-router-dom";
import { Home, LayoutDashboard, Utensils, Dumbbell, TrendingUp, Settings } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Bosh" },
  { to: "/meals", icon: Utensils, label: "Ovqat" },
  { to: "/workouts", icon: Dumbbell, label: "Mashq" },
  { to: "/progress", icon: TrendingUp, label: "Progress" },
  { to: "/settings", icon: Settings, label: "Sozlama" },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-t border-border">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              <item.icon className={`w-5 h-5 ${active ? "text-primary" : ""}`} />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </Link>
          );
        })}
        <div className="flex items-center justify-center">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
