import ReactMarkdown from "react-markdown";
import { Scale, User, Bot } from "lucide-react";
import type { Message } from "@/hooks/useChatHistory";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

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

        {!isUser && message.law && (
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
      </div>
    </div>
  );
}
