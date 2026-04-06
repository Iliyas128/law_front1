import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Scale, User, Bot } from "lucide-react";
import type { Message } from "@/hooks/useChatHistory";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const [open, setOpen] = useState(false);
  const sources = message.sources?.filter((s) => s.text && s.text.trim().length > 0) ?? [];

  return (
    <div className={`flex gap-3 px-4 py-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
          isUser ? "bg-primary text-primary-foreground" : "bg-accent text-foreground"
        }`}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      <div className={`max-w-[80%] space-y-2 ${isUser ? "text-right" : ""}`}>
        <div
          className={`inline-block rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-md"
              : "bg-card text-card-foreground border border-border rounded-tl-md shadow-sm"
          }`}
        >
          {isUser ? (
            <p>{message.content}</p>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>

        {!isUser && message.law && message.law !== "—" && (
          <div className="inline-block rounded-xl border border-primary/20 bg-primary/5 px-3 py-2 text-left">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-primary mb-1">
              <Scale className="h-3.5 w-3.5" />
              Основание закона
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{message.law}</span>
              {message.article && <>, ст. {message.article}</>}
            </p>
          </div>
        )}

        {!isUser && sources.length > 0 && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                type="button"
                size="sm"
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Тексты источников ({sources.length})
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[85vh] max-w-2xl flex flex-col gap-0 p-0 sm:max-w-2xl">
              <DialogHeader className="px-6 pt-6 pb-2 shrink-0">
                <DialogTitle>Фрагменты норм, использованные в ответе</DialogTitle>
                <p className="text-sm text-muted-foreground font-normal">
                  Прокрутите список, чтобы прочитать полный текст каждого фрагмента.
                </p>
              </DialogHeader>
              <ScrollArea className="h-[min(60vh,520px)] px-6 pb-6">
                <div className="space-y-6 pr-4">
                  {sources.map((s, i) => (
                    <article
                      key={`${s.law}-${s.article}-${i}`}
                      className="rounded-lg border border-border bg-muted/30 p-4 text-left"
                    >
                      <h3 className="text-sm font-semibold text-foreground mb-2">
                        {s.law}
                        {s.article ? <span className="text-muted-foreground">, ст. {s.article}</span> : null}
                        <span className="text-xs font-normal text-muted-foreground ml-2">({s.lang})</span>
                      </h3>
                      <pre className="whitespace-pre-wrap font-sans text-xs text-foreground leading-relaxed">
                        {s.text}
                      </pre>
                    </article>
                  ))}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
