"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Sparkles, User, Bot, AlertCircle, FileImage, FileVideo, X } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Message {
  role: "user" | "assistant";
  content: string;
  fileUrl?: string | null;
  createdAt: string;
}

interface ChatPanelProps {
  analysisId: string;
  initialMessages?: Message[];
}

export default function ChatPanel({ analysisId, initialMessages = [] }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (selected.size > 800 * 1024 * 1024) {
        setError("El archivo supera el límite de 800MB.");
        return;
      }
      setError("");
      setFile(selected);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if ((!input.trim() && !file) || loading) return;
    setLoading(true);
    setError("");

    let uploadedFilePath: string | null = null;
    let fileUrl: string | null = null;
    let fileMimeType: string | null = null;
    let fileName: string | null = null;

    try {
      // Upload file if present
      if (file) {
        const ext = file.name.split(".").pop();
        const path = `chat/${Math.random()}.${ext}`;
        uploadedFilePath = path;
        const { error: uploadError } = await supabase.storage.from("creatives").upload(path, file);
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from("creatives").getPublicUrl(path);
        fileUrl = data.publicUrl;
        fileMimeType = file.type;
        fileName = file.name;
      }

      const userMessage: Message = {
        role: "user",
        content: input.trim() || (file ? `[Adjunto: ${file.name}]` : ""),
        fileUrl,
        createdAt: new Date().toISOString(),
      };

      setMessages(prev => [...prev, userMessage]);
      setInput("");
      setFile(null);

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5 * 60 * 1000);

      let res: Response;
      try {
        res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({ analysisId, message: userMessage.content, fileUrl, fileMimeType, fileName }),
        });
      } finally {
        clearTimeout(timeout);
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error en el chat");

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply,
        createdAt: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: any) {
      if (uploadedFilePath) {
        supabase.storage.from("creatives").remove([uploadedFilePath]).catch(() => {});
      }
      const msg = err?.name === "AbortError"
        ? "La respuesta tardó demasiado. Por favor, intentá de nuevo."
        : err.message;
      setError(msg);
      // Remove the optimistic user message on error
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]">
      {/* Header */}
      <div className="px-8 py-5 border-b border-slate-100 flex items-center gap-3 bg-gradient-to-r from-slate-50 to-white">
        <div className="w-9 h-9 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-500/20">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-base tracking-tight">Chat con el Auditor IA</h3>
          <p className="text-xs text-slate-400 font-medium">Preguntá, mejorá tu anuncio, subí una nueva versión</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-100 rounded-xl">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-xs font-bold text-amber-700">0.5 créditos / mensaje</span>
        </div>
      </div>

      {/* Messages */}
      <div className="px-6 py-6 space-y-4 max-h-[520px] overflow-y-auto scroll-smooth">
        {messages.length === 0 && (
          <div className="text-center py-10">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Bot className="w-7 h-7 text-slate-400" />
            </div>
            <p className="text-slate-500 font-medium text-sm">Podés hacerme preguntas sobre el análisis,<br />pedir que mejore alguna alternativa, o subir una versión nueva.</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${msg.role === "user" ? "bg-slate-900" : "bg-indigo-600"} shadow-sm`}>
              {msg.role === "user"
                ? <User className="w-4 h-4 text-white" />
                : <Bot className="w-4 h-4 text-white" />
              }
            </div>

            {/* Bubble */}
            <div className={`max-w-[78%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1.5`}>
              {msg.fileUrl && (
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  {msg.fileUrl.match(/\.(mp4|mov|avi|webm)/i)
                    ? <div className="px-4 py-3 bg-slate-100 flex items-center gap-2 text-sm text-slate-600 font-medium"><FileVideo className="w-4 h-4" /> Video adjunto</div>
                    : <img src={msg.fileUrl} alt="adjunto" className="max-w-xs max-h-48 object-cover" />
                  }
                </div>
              )}
              <div className={`px-5 py-3.5 rounded-2xl text-sm font-medium leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-slate-900 text-white rounded-tr-sm"
                  : "bg-slate-50 border border-slate-100 text-slate-700 rounded-tl-sm"
              }`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}

        {/* Loading bubble */}
        {loading && (
          <div className="flex gap-3 animate-in fade-in duration-300">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Error */}
      {error && (
        <div className="mx-6 mb-3 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-start gap-2 text-sm font-semibold">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {/* File preview */}
      {file && (
        <div className="mx-6 mb-3 px-4 py-3 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center gap-3">
          {file.type.startsWith("video/")
            ? <FileVideo className="w-5 h-5 text-indigo-500 shrink-0" />
            : <FileImage className="w-5 h-5 text-indigo-500 shrink-0" />
          }
          <span className="text-sm font-semibold text-slate-700 truncate flex-1">{file.name}</span>
          <button onClick={() => setFile(null)} className="text-slate-400 hover:text-slate-700 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Input area */}
      <div className="px-6 pb-6">
        <div className="flex gap-2 items-end bg-slate-50 border border-slate-200 rounded-2xl p-2 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
          {/* Attach button */}
          <input ref={fileInputRef} type="file" className="hidden" accept="image/*,video/*" onChange={handleFileChange} />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            className="p-2.5 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all disabled:opacity-40 flex-shrink-0"
            title="Adjuntar imagen o video"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribí tu pregunta... (Enter para enviar, Shift+Enter para nueva línea)"
            disabled={loading}
            rows={1}
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-40 min-h-[40px] text-slate-800 text-sm font-medium placeholder-slate-400 py-2.5 px-1 disabled:opacity-50"
            style={{ height: "auto" }}
            onInput={e => {
              const t = e.currentTarget;
              t.style.height = "auto";
              t.style.height = `${Math.min(t.scrollHeight, 160)}px`;
            }}
          />

          {/* Send button */}
          <button
            onClick={sendMessage}
            disabled={loading || (!input.trim() && !file)}
            className="p-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0 shadow-sm hover:shadow-md active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
