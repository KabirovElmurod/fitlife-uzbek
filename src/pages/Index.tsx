import { Link } from "react-router-dom";
import { Leaf, Calculator, Utensils, TrendingUp, ChevronRight, Star, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Calculator,
    title: "Aqlli kaloriya hisoblash",
    desc: "AI yordamida kundalik kaloriya ehtiyojingizni aniq hisoblang",
  },
  {
    icon: Utensils,
    title: "Milliy taomlar rejasi",
    desc: "O'zbek milliy taomlariga moslashtirilgan ovqatlanish rejasi",
  },
  {
    icon: TrendingUp,
    title: "Vazn prognozi",
    desc: "Maqsadingizga qancha vaqtda erishishingizni bilib oling",
  },
];

const steps = [
  { num: "01", title: "Ma'lumotlaringizni kiriting", desc: "Yosh, vazn, bo'y va faoliyat darajangiz" },
  { num: "02", title: "Maqsadni tanlang", desc: "Vazn kamaytirish, oshirish yoki saqlash" },
  { num: "03", title: "Shaxsiy reja oling", desc: "AI sizga maxsus reja tayyorlaydi" },
];

const testimonials = [
  { name: "Aziza K.", text: "2 oyda 8 kg tashladim! Taomlar juda mazali va milliy.", rating: 5 },
  { name: "Bobur T.", text: "Mashqlar rejasi juda qulay. Har kuni yangi motivatsiya.", rating: 5 },
  { name: "Nilufar S.", text: "Oilam uchun ham foydalanaman. Bolalarimga ham yoqdi.", rating: 4 },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">FitLife AI</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
              Kirish
            </Link>
            <Link to="/register" className="px-5 py-2.5 text-sm font-semibold rounded-xl gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
              Ro'yxatdan o'tish
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="gradient-hero py-20 md:py-28">
        <div className="container text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6 animate-fade-in">
            <Leaf className="w-4 h-4" />
            AI bilan sog'lom hayot
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Sog'lom tanangiz.{" "}
            <span className="text-primary">Aqlli ovqatlanish.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Sun'iy intellekt yordamida sizga maxsus ovqatlanish va mashqlar rejasi — o'zbek milliy taomlariga moslashtirilgan.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold rounded-2xl gradient-primary text-primary-foreground shadow-elevated hover:opacity-90 transition-all animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            Shaxsiy rejamni boshlash
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-foreground mb-4">Asosiy imkoniyatlar</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">Sizning sog'lom hayotingiz uchun barcha zarur vositalar</p>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="glass-card p-8 hover:shadow-elevated transition-shadow group" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-5 group-hover:gradient-primary transition-all">
                  <f.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-foreground mb-4">Qanday ishlaydi?</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">Faqat 3 oddiy qadam</p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((s, i) => (
              <div key={i} className="text-center relative">
                <div className="text-6xl font-display font-bold text-primary/15 mb-2">{s.num}</div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
                {i < 2 && (
                  <ChevronRight className="hidden md:block absolute top-8 -right-4 w-8 h-8 text-primary/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-foreground mb-12">Foydalanuvchi fikrlari</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="glass-card p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-foreground mb-4">"{t.text}"</p>
                <p className="text-sm font-semibold text-muted-foreground">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 gradient-hero">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Bugun boshlang!</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">Sog'lom hayot sari birinchi qadamni tashlang</p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold rounded-2xl gradient-primary text-primary-foreground shadow-elevated hover:opacity-90 transition-all"
          >
            Bepul boshlash
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container text-center text-sm text-muted-foreground">
          © 2026 FitLife AI. Barcha huquqlar himoyalangan.
        </div>
      </footer>
    </div>
  );
}
