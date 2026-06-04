import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { askClaude } from "@/lib/ai/claude.functions";
import { AIResponseBox } from "../AIResponseBox";

type Msg = { role: "user" | "assistant"; content: string };

const MARKER = "HERE IS YOUR IDEA SENTENCE:";

export function Slide05({ goNext }: { goNext: () => void }) {
  const ask = useServerFn(askClaude);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const latestAssistant = [...messages].reverse().find((m) => m.role === "assistant")?.content ?? "";
  const ideaSentence = (() => {
    const idx = latestAssistant.indexOf(MARKER);
    if (idx === -1) return null;
    const after = latestAssistant.slice(idx + MARKER.length).trim();
    const line = after.split(/\n/)[0]?.trim() ?? "";
    return line || null;
  })();

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: input.trim() }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setError(null);
    try {
      const res = await ask({ data: { kind: "idea", messages: next } });
      if (res.error) {
        setError(res.error);
      } else {
        setMessages([...next, { role: "assistant", content: res.text }]);
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!ideaSentence) return;
    try {
      await navigator.clipboard.writeText(ideaSentence);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
        Before you touch Lovable — nail your idea.
      </h2>

      {!ideaSentence && (
        <p
          className="rounded-lg p-8 text-xl md:text-2xl leading-relaxed font-medium"
          style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
        >
          Don't worry about getting it perfect. Just tell us roughly what you want to build — Claude will help you shape it into something buildable.
        </p>
      )}

      {!ideaSentence && messages.length > 0 && (
        <div className="flex flex-col gap-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className="rounded-lg p-5 text-base md:text-lg leading-relaxed whitespace-pre-wrap"
              style={
                m.role === "user"
                  ? { backgroundColor: "rgba(255,255,255,0.08)", borderLeft: "4px solid var(--bms-pink)" }
                  : { backgroundColor: "rgba(94,92,230,0.10)", borderLeft: "4px solid var(--bms-purple)" }
              }
            >
              <div className="text-xs uppercase tracking-wider opacity-60 mb-2">
                {m.role === "user" ? "You" : "Claude"}
              </div>
              {m.content}
            </div>
          ))}
        </div>
      )}

      {!ideaSentence && (
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          placeholder="e.g. I want to build something for small businesses to manage their receipts..."
          className="w-full rounded-lg p-5 text-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[var(--bms-pink)]"
        />
      )}

      {!ideaSentence && (
        <div>
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="px-10 py-5 rounded-md text-lg md:text-xl font-bold text-white bg-bms-pink disabled:opacity-50"
          >
            {loading ? "Thinking..." : "Refine my idea ↗"}
          </button>
          <p className="mt-3 text-lg text-white">
            Claude will ask you one question at a time to sharpen your idea — then write your finished idea sentence for you.
          </p>
        </div>
      )}

      {loading && !ideaSentence && <AIResponseBox loading={true} text="" error={null} />}
      {error && !ideaSentence && <AIResponseBox loading={false} text="" error={error} />}

      {ideaSentence && (
        <div className="flex flex-col gap-4">
          <div
            className="rounded-lg p-6"
            style={{
              backgroundColor: "#ffffff",
              color: "#1d1d1f",
              border: "3px solid #FF4DA6",
            }}
          >
            <div className="text-xs uppercase tracking-wider font-bold mb-2" style={{ color: "#FF4DA6" }}>
              Your idea sentence
            </div>
            <p className="text-lg md:text-xl font-semibold leading-relaxed">{ideaSentence}</p>
          </div>
          <button
            onClick={handleCopy}
            className="self-start px-8 py-4 rounded-md text-base md:text-lg font-bold text-white"
            style={{ backgroundColor: "#FF4DA6" }}
          >
            {copied ? "Copied ✓" : "Copy my idea sentence"}
          </button>
          <p className="text-lg md:text-xl font-bold" style={{ color: "#34c759" }}>
            ✅ You're ready. Move to the next step.
          </p>
          <button
            onClick={goNext}
            className="self-start px-10 py-5 rounded-md text-lg md:text-xl font-bold text-white bg-bms-pink"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
