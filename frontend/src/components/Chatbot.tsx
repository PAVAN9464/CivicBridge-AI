import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';

type Message = {
  id: string;
  role: 'assistant' | 'user';
  text: string;
};

const initialMessages: Message[] = [
  {
    id: 'm1',
    role: 'assistant',
    text: 'Hello! I’m CivicBridge Assistant. How can I help you with government services today?'
  }
];

const assistantReplies = [
  'You can check eligibility, track application status, or get help with program requirements right here.',
  'For housing support, upload your residency documents and we’ll guide you to the next step.',
  'I’ll help you identify the right scheme and show which forms are required for your request.',
  'Once your application is submitted, use the dashboard to monitor progress and case updates.'
];

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const typingTimer = useRef<number | null>(null);

  const reply = useMemo(
    () => assistantReplies[Math.floor(Math.random() * assistantReplies.length)],
    [messages.length]
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    return () => {
      if (typingTimer.current) {
        clearTimeout(typingTimer.current);
      }
    };
  }, []);

  const handleSend = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;

    const userMessage: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: trimmed
    };

    setDraft('');
    setMessages((current) => [...current, userMessage]);
    setIsTyping(true);

    if (typingTimer.current) {
      clearTimeout(typingTimer.current);
    }

    typingTimer.current = window.setTimeout(() => {
      const assistantMessage: Message = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        text: reply
      };
      setMessages((current) => [...current, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-5 shadow-2xl shadow-black/30 sm:p-8">
      <div className="mb-6 flex flex-col gap-4 rounded-3xl bg-slate-900/95 p-5 text-slate-300 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-civic-gold">Live chat experience</p>
          <p className="mt-2 text-lg font-semibold text-white">AI assistant for citizen support</p>
        </div>
        <div className="inline-flex items-center gap-3 rounded-full bg-white/5 px-4 py-2 text-sm text-slate-300">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span>Active</span>
        </div>
      </div>

      <div className="flex min-h-[28rem] flex-col gap-4 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/95 p-4 sm:p-5">
        <div className="flex-1 space-y-4 overflow-y-auto pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm ${
                  message.role === 'user'
                    ? 'bg-civic-gold/10 text-white ring-1 ring-civic-gold/20'
                    : 'bg-slate-800/90 text-slate-200 ring-1 ring-white/10'
                }`}
              >
                <p className="font-semibold text-xs uppercase tracking-[0.24em] text-slate-400">
                  {message.role === 'user' ? 'You' : 'CivicBridge Assistant'}
                </p>
                <p className="mt-2 whitespace-pre-wrap">{message.text}</p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[70%] rounded-3xl border border-white/10 bg-slate-800/90 px-4 py-3 text-sm text-slate-300 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">CivicBridge Assistant is typing</p>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-400 animate-[pulse_1.2s_ease-in-out_infinite]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-400 animate-[pulse_1.2s_ease-in-out_0.2s_infinite]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-400 animate-[pulse_1.2s_ease-in-out_0.4s_infinite]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="mt-4 flex flex-col gap-3 rounded-3xl bg-slate-950/90 p-4 sm:flex-row sm:items-center">
          <label htmlFor="chat-input" className="sr-only">
            Type a message
          </label>
          <input
            id="chat-input"
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Ask about eligibility, applications, or services…"
            className="flex-1 rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-civic-gold/50 focus:ring-2 focus:ring-civic-gold/20"
          />
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-civic-gold px-6 text-sm font-semibold text-civic-navy transition hover:brightness-105"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
