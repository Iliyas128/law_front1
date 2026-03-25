import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, Shield, Trash2, ArrowLeft, Users, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ResponseMode } from "@/lib/mockApi";

interface HeaderProps {
  onClearHistory?: () => void;
  mode?: ResponseMode;
}

export function Header({ onClearHistory, mode = "citizen" }: HeaderProps) {
  const navigate = useNavigate();
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });
  const [lang, setLang] = useState<"RU" | "KZ">("RU");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const ModeIcon = mode === "official" ? Briefcase : Users;
  const modeLabel = mode === "official" ? "Официальный" : "Гражданский";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")} title="На главную">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-foreground hidden sm:inline">Знай свои права</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1 mr-1">
            <ModeIcon className="h-3 w-3 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">{modeLabel}</span>
          </div>
          {onClearHistory && (
            <Button variant="ghost" size="icon" onClick={onClearHistory} title="Очистить чат">
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="text-xs font-medium px-2"
            onClick={() => setLang(lang === "RU" ? "KZ" : "RU")}
          >
            {lang}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setDark(!dark)}>
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
