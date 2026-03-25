import { Car, FileText, Search, Building2, Wine } from "lucide-react";

const actions = [
  { label: "Меня остановили ДПС", message: "Меня остановили сотрудники ДПС. Какие у меня права?", icon: Car },
  { label: "Требуют документы", message: "Полицейский требует показать документы. Обязан ли я?", icon: FileText },
  { label: "Хотят досмотр", message: "Сотрудник полиции хочет провести досмотр моего автомобиля. Что делать?", icon: Search },
  { label: "Зовут в РУВД", message: "Меня хотят забрать в отделение полиции. Какие у меня права?", icon: Building2 },
  { label: "Подозрение на алкоголь", message: "Меня подозревают в вождении в нетрезвом виде. Что делать?", icon: Wine },
];

interface QuickActionsProps {
  onSelect: (message: string) => void;
  disabled?: boolean;
}

export function QuickActions({ onSelect, disabled }: QuickActionsProps) {
  return (
    <div className="flex flex-wrap gap-2 px-4 py-3">
      {actions.map((action) => (
        <button
          key={action.label}
          disabled={disabled}
          onClick={() => onSelect(action.message)}
          className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-accent hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <action.icon className="h-3.5 w-3.5 text-primary" />
          {action.label}
        </button>
      ))}
    </div>
  );
}
