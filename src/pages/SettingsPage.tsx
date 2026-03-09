import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Target, Lock, Trash2, ChevronRight, LogOut } from "lucide-react";

const menuItems = [
  { icon: User, label: "Shaxsiy ma'lumotlar", desc: "Ism, yosh, vazn, bo'y" },
  { icon: Target, label: "Maqsadlarni o'zgartirish", desc: "Vazn maqsadi va faoliyat" },
  { icon: Lock, label: "Parolni o'zgartirish", desc: "Yangi parol o'rnatish" },
];

export default function SettingsPage() {
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div className="px-4 pt-6">
      <h1 className="font-display font-bold text-2xl text-foreground mb-1">Sozlamalar</h1>
      <p className="text-muted-foreground text-sm mb-6">Hisobingizni boshqaring</p>

      {/* Profile card */}
      <div className="glass-card p-5 mb-6 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center text-primary-foreground font-display font-bold text-xl">
          F
        </div>
        <div>
          <h2 className="font-semibold text-foreground">Foydalanuvchi</h2>
          <p className="text-sm text-muted-foreground">user@example.com</p>
        </div>
      </div>

      {/* Menu */}
      <div className="space-y-2 mb-6">
        {menuItems.map((item, i) => (
          <button key={i} className="glass-card p-4 w-full flex items-center gap-4 hover:shadow-elevated transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
              <item.icon className="w-5 h-5 text-accent-foreground" />
            </div>
            <div className="flex-1 text-left">
              <span className="block font-semibold text-foreground text-sm">{item.label}</span>
              <span className="block text-xs text-muted-foreground">{item.desc}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={() => navigate("/")}
        className="w-full py-3 rounded-xl border border-border text-foreground font-semibold flex items-center justify-center gap-2 hover:bg-muted transition-colors mb-3"
      >
        <LogOut className="w-4 h-4" />
        Chiqish
      </button>

      {/* Delete */}
      <button
        onClick={() => setShowDelete(true)}
        className="w-full py-3 rounded-xl border border-destructive/30 text-destructive font-semibold flex items-center justify-center gap-2 hover:bg-destructive/5 transition-colors"
      >
        <Trash2 className="w-4 h-4" />
        Hisobni o'chirish
      </button>

      {showDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm px-4">
          <div className="glass-card p-6 max-w-sm w-full">
            <h3 className="font-display font-bold text-lg text-foreground mb-2">Hisobni o'chirish</h3>
            <p className="text-sm text-muted-foreground mb-5">
              Haqiqatan ham hisobingizni o'chirmoqchimisiz? Bu amalni qaytarib bo'lmaydi.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDelete(false)}
                className="flex-1 py-2.5 rounded-xl border border-border font-semibold text-foreground hover:bg-muted transition-colors"
              >
                Bekor qilish
              </button>
              <button className="flex-1 py-2.5 rounded-xl bg-destructive text-destructive-foreground font-semibold hover:opacity-90 transition-opacity">
                O'chirish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
