import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { askClaude } from "@/lib/ai/claude.functions";
import { AIResponseBox } from "../AIResponseBox";
import { CopyBox } from "../CopyBox";

const LINES = [
  'This is for...',
  'It helps them...',
  'The main flow is...',
  '[Show the flow live]',
  'Next I would improve...',
];

export function Slide11(_: { goNext: () => void }) {
  const ask = useServerFn(askClaude);
  const [audience, setAudience] = useState("");
  const [help, setHelp] = useState("");
  const [improve, setImprove] = useState("");
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleWrite = async () => {
    if (!audience.trim() || !help.trim() || !improve.trim()) return;
    setLoading(true);
    setText("");
    setError(null);
    try {
      const res = await ask({
        data: { kind: "demo", audience, help, improve },
      });
      setText(res.text);
      setError(res.error);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <span
          className="bg-[var(--bms-pink)] text-white px-6 py-3 rounded-full text-2xl md:text-3xl font-bold inline-block"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          🏁 Finish Line
        </span>
      </div>

      <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
        You're at the finish line!
      </h2>

      <p className="text-xl md:text-2xl opacity-80">
        You've got 60 seconds to demo.
      </p>

      <p className="text-xl md:text-2xl opacity-80">
        Ask Claude to help write your script.
      </p>

      <ol className="space-y-2">
        {LINES.map((l, i) => (
          <li key={i} className="flex items-start gap-4">
            <span
              className="text-2xl font-black shrink-0 w-8"
              style={{ color: "var(--bms-pink)" }}
            >
              {i + 1}
            </span>
            <span className="text-lg md:text-xl font-medium">{l}</span>
          </li>
        ))}
      </ol>

      <div className="grid md:grid-cols-3 gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold opacity-80">Who is it for?</span>
          <input
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className="rounded-md px-4 py-3 bg-black/5 border border-black/15 focus:outline-none focus:border-[var(--bms-pink)]"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold opacity-80">
            What does it help them do?
          </span>
          <input
            value={help}
            onChange={(e) => setHelp(e.target.value)}
            className="rounded-md px-4 py-3 bg-black/5 border border-black/15 focus:outline-none focus:border-[var(--bms-pink)]"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold opacity-80">
            What would you improve next?
          </span>
          <input
            value={improve}
            onChange={(e) => setImprove(e.target.value)}
            className="rounded-md px-4 py-3 bg-black/5 border border-black/15 focus:outline-none focus:border-[var(--bms-pink)]"
          />
        </label>
      </div>

      <div>
        <button
          onClick={handleWrite}
          disabled={loading || !audience.trim() || !help.trim() || !improve.trim()}
          className="px-7 py-3.5 rounded-md text-base font-semibold text-white disabled:opacity-50"
          style={{ backgroundColor: "var(--bms-pink)" }}
        >
          {loading ? "Thinking..." : "Write my script ↗"}
        </button>
      </div>

      {(loading || error) && (
        <AIResponseBox loading={loading} text="" error={error} />
      )}
      {!loading && !error && text && <CopyBox text={text} label="Copy script" />}

      <p
        className="text-xl md:text-2xl font-black"
        style={{ color: "var(--bms-pink)" }}
      >
        That's it. You built something real today.
      </p>
    </div>
  );
}
