import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { askClaude } from "@/lib/ai/claude.functions";
import { AIResponseBox } from "../AIResponseBox";

export function Slide05(_: { goNext: () => void }) {
  const ask = useServerFn(askClaude);
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!idea.trim()) return;
    setLoading(true);
    setText("");
    setError(null);
    try {
      const res = await ask({ data: { kind: "idea", idea } });
      setText(res.text);
      setError(res.error);
    } catch (e) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
        Before you touch Lovable — nail your idea.
      </h2>

      <div
        className="rounded-lg p-8 text-xl md:text-2xl leading-relaxed font-medium"
        style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
      >
        I am building a website or web application for{" "}
        <span style={{ color: "var(--bms-pink)" }}>[specific person]</span> that
        helps them{" "}
        <span style={{ color: "var(--bms-pink)" }}>[do this thing]</span> so
        they don't have to{" "}
        <span style={{ color: "var(--bms-pink)" }}>
          [painful thing they currently do]
        </span>
        .
      </div>

      <textarea
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        rows={4}
        placeholder="Type your idea sentence here..."
        className="w-full rounded-lg p-5 text-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[var(--bms-pink)]"
      />

      <div>
        <button
          onClick={handleCheck}
          disabled={loading || !idea.trim()}
          className="px-10 py-5 rounded-md text-lg md:text-xl font-bold text-white bg-bms-pink disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Check my idea ↗"}
        </button>
        <p className="mt-3 text-lg text-white">
          Claude will review your idea and tell you if it's specific enough to build.
        </p>
      </div>

      <AIResponseBox loading={loading} text={text} error={error} />

      <p className="text-xl md:text-2xl font-bold" style={{ color: "#FF4DA6" }}>
        Don't skip this. A vague idea = a broken build.
      </p>
    </div>
  );
}
