import { useState, useEffect } from "react";

export interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  law?: string;
  article?: string;
  timestamp: number;
}

function buildStorageKey(scope: string) {
  return `znaj-svoi-prava-chat:${scope}`;
}

export function useChatHistory(scope = "citizen") {
  const storageKey = buildStorageKey(scope);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      setMessages(saved ? (JSON.parse(saved) as Message[]) : []);
    } catch {
      setMessages([]);
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(messages));
  }, [messages, storageKey]);

  const addMessage = (msg: Omit<Message, "id" | "timestamp">) => {
    const newMsg: Message = {
      ...msg,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMsg]);
    return newMsg;
  };

  const clearHistory = () => setMessages([]);

  return { messages, addMessage, clearHistory };
}
