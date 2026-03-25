import { useRef, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/chat/Header";
import { QuickActions } from "@/components/chat/QuickActions";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { useChatHistory } from "@/hooks/useChatHistory";
import { sendMessage, type ResponseMode } from "@/lib/mockApi";
import { Shield, Briefcase, Users } from "lucide-react";

export default function ChatPage() {
  const [searchParams] = useSearchParams();
  const mode = (searchParams.get("mode") as ResponseMode) || "citizen";
  const { messages, addMessage, clearHistory } = useChatHistory(mode);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (text: string) => {
    addMessage({ role: "user", content: text });
    setLoading(true);
    try {
      const res = await sendMessage(text, mode);
      addMessage({ role: "ai", content: res.answer, law: res.law, article: res.article });
    } catch {
      addMessage({ role: "ai", content: "Произошла ошибка. Попробуйте ещё раз." });
    } finally {
      setLoading(false);
    }
  };

  const isEmpty = messages.length === 0;
  const ModeIcon = mode === "official" ? Briefcase : Users;
  const modeLabel = mode === "official" ? "Официальный режим" : "Гражданский режим";

  return (
    <div className="flex h-screen flex-col bg-background">
      <Header onClearHistory={messages.length > 0 ? clearHistory : undefined} mode={mode} />

      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full px-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-1">Чем могу помочь?</h2>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 mb-4">
              <ModeIcon className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">{modeLabel}</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md mb-6">
              Выберите ситуацию ниже или задайте свой вопрос о правах при взаимодействии с полицией
            </p>
            <QuickActions onSelect={handleSend} disabled={loading} />
          </div>
        ) : (
          <div className="mx-auto max-w-3xl py-4">
            <QuickActions onSelect={handleSend} disabled={loading} />
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {loading && <TypingIndicator />}
          </div>
        )}
      </div>

      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
}
