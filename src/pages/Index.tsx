import { useNavigate } from "react-router-dom";
import { Shield, ArrowRight, Scale, MessageCircle, Smartphone } from "lucide-react";
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

      <Button size="lg" className="mb-12 rounded-2xl px-8" onClick={() => navigate("/chat")}>
        Начать чат
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl w-full">
        {[
          { icon: Scale, title: "Законы РК", desc: "Ответы на основе актуального законодательства" },
          { icon: MessageCircle, title: "Проверка релевантности", desc: "Несколько фрагментов и отбор лучших для ответа" },
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
