import { useNavigate } from "react-router-dom";
import { Shield, ArrowRight, Scale, MessageCircle, Smartphone, Briefcase, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 mb-6">
        <Shield className="h-10 w-10 text-primary" />
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-3 text-center">
        Знай свои права
      </h1>
      <p className="text-lg text-muted-foreground max-w-md text-center mb-10">
        AI-помощник по законам Казахстана при взаимодействии с полицией и ДПС
      </p>

      <p className="text-sm font-semibold text-foreground mb-4">Выберите режим:</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg w-full mb-12">
        <button
          onClick={() => navigate("/chat?mode=citizen")}
          className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20">
            <Users className="h-7 w-7 text-primary" />
          </div>
          <h3 className="text-base font-bold text-foreground">Я гражданин</h3>
          <p className="text-xs text-muted-foreground text-center">
            Простым языком — понятные ответы без юридического жаргона
          </p>
          <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
        </button>

        <button
          onClick={() => navigate("/chat?mode=official")}
          className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20">
            <Briefcase className="h-7 w-7 text-primary" />
          </div>
          <h3 className="text-base font-bold text-foreground">Я госслужащий</h3>
          <p className="text-xs text-muted-foreground text-center">
            Официальный стиль — с точными формулировками и ссылками на НПА
          </p>
          <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl w-full">
        {[
          { icon: Scale, title: "Законы РК", desc: "Ответы на основе актуального законодательства" },
          { icon: MessageCircle, title: "Два формата", desc: "Простой язык для граждан, официальный — для служащих" },
          { icon: Smartphone, title: "Всегда под рукой", desc: "Работает на любом устройстве — телефоне или компьютере" },
        ].map((f) => (
          <div key={f.title} className="flex flex-col items-center text-center rounded-2xl border border-border bg-card p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 mb-3">
              <f.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">{f.title}</h3>
            <p className="text-xs text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
