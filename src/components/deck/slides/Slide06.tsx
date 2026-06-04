import { useState } from "react";
import { CopyBox } from "../CopyBox";

const TEMPLATE =
  "I am building a [website or web application] for [specific person]. The problem they have is [problem]. This website or web application [describe what it does]. It should have [core features]. It should not [constraints]. Ask me clarifying questions, then propose the minimum version we can build and publish in 90 minutes.";

const FIELDS = [
  { key: "kind", label: "What are you building (website or web application)?" },
  { key: "person", label: "Who specifically is it for?" },
  { key: "problem", label: "What is their problem?" },
  { key: "does", label: "What does it do?" },
  { key: "constraints", label: "What should it NOT do?" },
] as const;

type Key = (typeof FIELDS)[number]["key"];

export function Slide06(_: { goNext: () => void }) {
  const [values, setValues] = useState<Record<Key, string>>({
    kind: "",
    person: "",
    problem: "",
    does: "",
    constraints: "",
  });
  const [built, setBuilt] = useState<string | null>(null);

  const handleBuild = () => {
    const v = values;
    const prompt = `I am building a ${v.kind || "[website or web application]"} for ${v.person || "[specific person]"}. The problem they have is ${v.problem || "[problem]"}. This ${v.kind || "website or web application"} ${v.does || "[describe what it does]"}. It should have [core features]. It should not ${v.constraints || "[constraints]"}. Ask me clarifying questions, then propose the minimum version we can build and publish in 90 minutes.`;
    setBuilt(prompt);
  };

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
        The prompt that starts everything.
      </h2>

      <pre
        className="rounded-lg p-6 text-sm md:text-base whitespace-pre-wrap font-mono leading-relaxed text-white"
        style={{ backgroundColor: "var(--bms-dark)" }}
      >
        {TEMPLATE}
      </pre>

      <div className="grid md:grid-cols-2 gap-4">
        {FIELDS.map((f) => (
          <label key={f.key} className="flex flex-col gap-2">
            <span className="text-sm font-semibold opacity-80">{f.label}</span>
            <input
              type="text"
              value={values[f.key]}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, [f.key]: e.target.value }))
              }
              className="rounded-md px-4 py-3 bg-black/5 border border-black/15 focus:outline-none focus:border-[var(--bms-pink)]"
            />
          </label>
        ))}
      </div>

      <div>
        <button
          onClick={handleBuild}
          className="px-7 py-3.5 rounded-md text-base font-semibold text-white"
          style={{ backgroundColor: "var(--bms-pink)" }}
        >
          Build my prompt ↗
        </button>
      </div>

      {built && <CopyBox text={built} />}

      <p
        className="text-sm font-semibold rounded-lg p-4"
        style={{
          color: "var(--bms-purple)",
          backgroundColor: "rgba(94,92,230,0.08)",
          borderLeft: "4px solid var(--bms-purple)",
        }}
      >
        Paste this into Lovable in Plan mode. Do not switch to Build mode yet.
      </p>
    </div>
  );
}
