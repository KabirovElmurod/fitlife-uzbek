import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Target, Lock, Trash2, ChevronRight, LogOut, Save, X } from "lucide-react";

export default function SettingsPage() {
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);
  const [editSection, setEditSection] = useState(null);

  const [profile, setProfile] = useState({
    name: "Foydalanuvchi",
    email: "user@example.com",
    age: "25",
    weight: "72",
    height: "175",
  });

  const [goals, setGoals] = useState({
    targetWeight: "68",
    activity: "O'rtacha faol",
    goal: "Vazn kamaytirish",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const handleSaveProfile = () => {
    setEditSection(null);
  };

  const handleSaveGoals = () => {
    setEditSection(null);
  };

  const handleSavePassword = () => {
    if (passwords.newPass !== passwords.confirm) return;
    setPasswords({ current: "", newPass: "", confirm: "" });
    setEditSection(null);
  };

  const InputField = ({ label, value, onChange, type = "text" }) => (
    <div className="mb-3">
      <label className="block text-xs text-muted-foreground mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );

  const SelectField = ({ label, value, onChange, options }) => (
    <div className="mb-3">
      <label className="block text-xs text-muted-foreground mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <div className="px-4 pt-6 pb-24">
      <h1 className="font-display font-bold text-2xl text-foreground mb-1">Sozlamalar</h1>
      <p className="text-muted-foreground text-sm mb-6">Hisobingizni boshqaring</p>

      {/* Profile card */}
      <div className="glass-card p-5 mb-6 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center text-primary-foreground font-display font-bold text-xl">
          {profile.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="font-semibold text-foreground">{profile.name}</h2>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
        </div>
      </div>

      {/* Personal Info */}
      <div className="glass-card mb-3 overflow-hidden">
        <button
          onClick={() => setEditSection(editSection === "profile" ? null : "profile")}
          className="p-4 w-full flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <User className="w-5 h-5 text-accent-foreground" />
          </div>
          <div className="flex-1 text-left">
            <span className="block font-semibold text-foreground text-sm">Shaxsiy ma'lumotlar</span>
            <span className="block text-xs text-muted-foreground">Ism, yosh, vazn, bo'y</span>
          </div>
          <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${editSection === "profile" ? "rotate-90" : ""}`} />
        </button>
        {editSection === "profile" && (
          <div className="px-4 pb-4 border-t border-border pt-4">
            <InputField label="Ism" value={profile.name} onChange={(v) => setProfile({ ...profile, name: v })} />
            <InputField label="Email" value={profile.email} onChange={(v) => setProfile({ ...profile, email: v })} type="email" />
            <InputField label="Yosh" value={profile.age} onChange={(v) => setProfile({ ...profile, age: v })} type="number" />
            <InputField label="Vazn (kg)" value={profile.weight} onChange={(v) => setProfile({ ...profile, weight: v })} type="number" />
            <InputField label="Bo'y (sm)" value={profile.height} onChange={(v) => setProfile({ ...profile, height: v })} type="number" />
            <div className="flex gap-2 mt-2">
              <button onClick={() => setEditSection(null)} className="flex-1 py-2.5 rounded-xl border border-border text-foreground font-semibold text-sm flex items-center justify-center gap-1">
                <X className="w-4 h-4" /> Bekor
              </button>
              <button onClick={handleSaveProfile} className="flex-1 py-2.5 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-1">
                <Save className="w-4 h-4" /> Saqlash
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Goals */}
      <div className="glass-card mb-3 overflow-hidden">
        <button
          onClick={() => setEditSection(editSection === "goals" ? null : "goals")}
          className="p-4 w-full flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <Target className="w-5 h-5 text-accent-foreground" />
          </div>
          <div className="flex-1 text-left">
            <span className="block font-semibold text-foreground text-sm">Maqsadlarni o'zgartirish</span>
            <span className="block text-xs text-muted-foreground">Vazn maqsadi va faoliyat</span>
          </div>
          <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${editSection === "goals" ? "rotate-90" : ""}`} />
        </button>
        {editSection === "goals" && (
          <div className="px-4 pb-4 border-t border-border pt-4">
            <InputField label="Maqsad vazn (kg)" value={goals.targetWeight} onChange={(v) => setGoals({ ...goals, targetWeight: v })} type="number" />
            <SelectField label="Faoliyat darajasi" value={goals.activity} onChange={(v) => setGoals({ ...goals, activity: v })} options={["Kam faol", "O'rtacha faol", "Faol", "Juda faol"]} />
            <SelectField label="Maqsad" value={goals.goal} onChange={(v) => setGoals({ ...goals, goal: v })} options={["Vazn kamaytirish", "Vazn oshirish", "Vaznni saqlash"]} />
            <div className="flex gap-2 mt-2">
              <button onClick={() => setEditSection(null)} className="flex-1 py-2.5 rounded-xl border border-border text-foreground font-semibold text-sm flex items-center justify-center gap-1">
                <X className="w-4 h-4" /> Bekor
              </button>
              <button onClick={handleSaveGoals} className="flex-1 py-2.5 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-1">
                <Save className="w-4 h-4" /> Saqlash
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Password */}
      <div className="glass-card mb-6 overflow-hidden">
        <button
          onClick={() => setEditSection(editSection === "password" ? null : "password")}
          className="p-4 w-full flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <Lock className="w-5 h-5 text-accent-foreground" />
          </div>
          <div className="flex-1 text-left">
            <span className="block font-semibold text-foreground text-sm">Parolni o'zgartirish</span>
            <span className="block text-xs text-muted-foreground">Yangi parol o'rnatish</span>
          </div>
          <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${editSection === "password" ? "rotate-90" : ""}`} />
        </button>
        {editSection === "password" && (
          <div className="px-4 pb-4 border-t border-border pt-4">
            <InputField label="Joriy parol" value={passwords.current} onChange={(v) => setPasswords({ ...passwords, current: v })} type="password" />
            <InputField label="Yangi parol" value={passwords.newPass} onChange={(v) => setPasswords({ ...passwords, newPass: v })} type="password" />
            <InputField label="Parolni tasdiqlash" value={passwords.confirm} onChange={(v) => setPasswords({ ...passwords, confirm: v })} type="password" />
            {passwords.newPass && passwords.confirm && passwords.newPass !== passwords.confirm && (
              <p className="text-xs text-destructive mb-2">Parollar mos kelmaydi</p>
            )}
            <div className="flex gap-2 mt-2">
              <button onClick={() => setEditSection(null)} className="flex-1 py-2.5 rounded-xl border border-border text-foreground font-semibold text-sm flex items-center justify-center gap-1">
                <X className="w-4 h-4" /> Bekor
              </button>
              <button onClick={handleSavePassword} className="flex-1 py-2.5 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-1">
                <Save className="w-4 h-4" /> Saqlash
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Logout */}
      <button
        onClick={() => navigate("/")}
        className="w-full py-3 rounded-xl border border-border text-foreground font-semibold flex items-center justify-center gap-2 hover:bg-muted transition-colors mb-3"
      >
        <LogOut className="w-4 h-4" /> Chiqish
      </button>

      {/* Delete */}
      <button
        onClick={() => setShowDelete(true)}
        className="w-full py-3 rounded-xl border border-destructive/30 text-destructive font-semibold flex items-center justify-center gap-2 hover:bg-destructive/5 transition-colors"
      >
        <Trash2 className="w-4 h-4" /> Hisobni o'chirish
      </button>

      {showDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm px-4">
          <div className="glass-card p-6 max-w-sm w-full">
            <h3 className="font-display font-bold text-lg text-foreground mb-2">Hisobni o'chirish</h3>
            <p className="text-sm text-muted-foreground mb-5">
              Haqiqatan ham hisobingizni o'chirmoqchimisiz? Bu amalni qaytarib bo'lmaydi.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowDelete(false)} className="flex-1 py-2.5 rounded-xl border border-border font-semibold text-foreground hover:bg-muted transition-colors">
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
