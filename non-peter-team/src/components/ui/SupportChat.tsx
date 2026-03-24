"use client";

import { useState, useRef, useEffect } from "react";
import Anthropic from "@anthropic-ai/sdk";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function SupportChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "สวัสดีครับ! ผมคือสตีวาร์ด ผู้ช่วยด้านการลงทุนของคุณ มีคำถามอะไรเกี่ยวกับการลงทุนไหมครับ?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const assistantMsg: Message = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, assistantMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.body) return;
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: updated[updated.length - 1].content + chunk,
          };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "ขออภัย เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้งครับ",
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-on-primary shadow-lg transition-transform hover:scale-105 active:scale-95"
        aria-label="เปิดแชทสนับสนุน"
      >
        <span className="material-symbols-outlined text-2xl">
          {open ? "close" : "support_agent"}
        </span>
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex w-[360px] flex-col rounded-2xl border border-outline-variant bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 rounded-t-2xl bg-primary px-5 py-4 text-on-primary">
            <span className="material-symbols-outlined">support_agent</span>
            <div>
              <p className="font-headline font-bold leading-tight">สตีวาร์ด</p>
              <p className="text-xs opacity-80">ผู้ช่วยด้านการลงทุน · ออนไลน์</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex h-80 flex-col gap-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary text-on-primary"
                      : "bg-surface-container-low text-on-surface"
                  }`}
                >
                  {m.content || (
                    <span className="flex gap-1 opacity-60">
                      <span className="animate-bounce">•</span>
                      <span className="animate-bounce [animation-delay:0.15s]">•</span>
                      <span className="animate-bounce [animation-delay:0.3s]">•</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2 border-t border-outline-variant p-3">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="พิมพ์คำถามของคุณ..."
              disabled={loading}
              className="flex-1 rounded-full border border-outline-variant bg-surface px-4 py-2 text-sm text-on-surface outline-none placeholder:text-on-surface-variant focus:border-primary disabled:opacity-50"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary transition-opacity disabled:opacity-40"
            >
              <span className="material-symbols-outlined text-base">send</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
