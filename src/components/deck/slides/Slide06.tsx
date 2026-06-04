import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { askClaude } from "@/lib/ai/claude.functions";

const FONT_OPTIONS = [
  "Modern & Clean",
  "Bold & Strong",
  "Friendly & Rounded",
  "Classic & Professional",
];
const TONE_OPTIONS = [
  "Professional",
  "Friendly & Warm",
  "Direct & No-nonsense",
  "Fun & Energetic",
];
const VIBE_OPTIONS = [
  "Minimal & Simple",
  "Bold & Striking",
  "Soft & Approachable",
  "Dark & Premium",
];

const DATA_OPTIONS = [
  { value: "No — keep it simple", label: "No — keep it simple" },
  { value: "Yes — store data", label: "Yes — store data" },
  { value: "Yes — user logins too", label: "Yes — user logins too" },
];

export function Slide06(_: { goNext: () => void }) {
  const ask = useServerFn(askClaude);

  const [idea, setIdea] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#000000");
  const [secondaryColor, setSecondaryColor] = useState("#ffffff");
  const [accentColor, setAccentColor] = useState("#FF4DA6");
  const [fontStyle, setFontStyle] = useState(FONT_OPTIONS[0]);
  const [tone, setTone] = useState(TONE_OPTIONS[0]);
  const [vibe, setVibe] = useState(VIBE_OPTIONS[0]);
  const [pages, setPages] = useState("");
  const [dataNeeds, setDataNeeds] = useState(DATA_OPTIONS[0].value);
  const [notDo, setNotDo] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [built, setBuilt] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleBuild = async () => {
    if (!idea.trim()) {
      setError("Paste your idea sentence first.");
      return;
    }
    setLoading(true);
    setError(null);
    setBuilt(null);
    try {
      const res = await ask({
        data: {
          kind: "lovablePrompt",
          idea: idea.trim(),
          primaryColor,
          secondaryColor,
          accentColor,
          fontStyle,
          tone,
          vibe,
          pages: pages.trim(),
          dataNeeds,
          notDo: notDo.trim(),
        },
      });
      if (res.error) {
        setError(res.error);
      } else if (!res.text) {
        setError("No response from Claude. Try again.");
      } else {
        setBuilt(res.text);
      }
    } catch (e) {
      console.error(e);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!built) return;
    try {
      await navigator.clipboard.writeText(built);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  const inputClass =
    "w-full rounded-md px-4 py-3 bg-white border border-black/15 focus:outline-none focus:border-[var(--bms-pink)] text-base";
  const labelClass = "text-sm font-semibold opacity-80";

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
          Let's build your Lovable prompt.
        </h2>
        <p className="text-lg md:text-xl opacity-80 max-w-3xl">
          Got your idea sentence from Step 6? Paste it in below and answer a few
          quick questions — Claude will write your Lovable prompt for you.
        </p>
      </header>

      {/* Section 1 */}
      <section className="flex flex-col gap-3">
        <h3 className="text-2xl font-bold">1. Your idea sentence</h3>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Paste your idea sentence here</span>
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="I am building a web application for plumbers that helps them..."
            rows={3}
            className={inputClass}
          />
        </label>
      </section>

      {/* Section 2 */}
      <section className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold">2. Your style</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <ColorField
            label="Primary colour"
            value={primaryColor}
            onChange={setPrimaryColor}
            placeholder="#000000"
          />
          <ColorField
            label="Secondary colour"
            value={secondaryColor}
            onChange={setSecondaryColor}
            placeholder="#ffffff"
          />
          <ColorField
            label="Accent colour"
            value={accentColor}
            onChange={setAccentColor}
            placeholder="#FF4DA6"
          />
          <SelectField
            label="Font style"
            value={fontStyle}
            onChange={setFontStyle}
            options={FONT_OPTIONS}
          />
          <SelectField
            label="Tone of voice"
            value={tone}
            onChange={setTone}
            options={TONE_OPTIONS}
          />
          <SelectField
            label="Overall vibe"
            value={vibe}
            onChange={setVibe}
            options={VIBE_OPTIONS}
          />
        </div>
      </section>

      {/* Section 3 */}
      <section className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold">3. Your build</h3>

        <label className="flex flex-col gap-2">
          <span className={labelClass}>What pages or screens do you need?</span>
          <textarea
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            placeholder="e.g. Home page, intake form, results page"
            rows={2}
            className={inputClass}
          />
        </label>

        <div className="flex flex-col gap-2">
          <span className={labelClass}>
            Do you need to store data or have user logins?
          </span>
          <div className="grid md:grid-cols-3 gap-3">
            {DATA_OPTIONS.map((opt) => {
              const selected = dataNeeds === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setDataNeeds(opt.value)}
                  className="text-left rounded-lg p-5 border-2 transition-all"
                  style={{
                    borderColor: selected
                      ? "var(--bms-pink)"
                      : "rgba(0,0,0,0.15)",
                    backgroundColor: selected
                      ? "rgba(255,77,166,0.08)"
                      : "white",
                  }}
                >
                  <span className="text-base font-semibold">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <label className="flex flex-col gap-2">
          <span className={labelClass}>What should it NOT do?</span>
          <textarea
            value={notDo}
            onChange={(e) => setNotDo(e.target.value)}
            placeholder="e.g. No payment processing, no complex admin dashboard"
            rows={2}
            className={inputClass}
          />
        </label>
      </section>

      <div>
        <button
          onClick={handleBuild}
          disabled={loading}
          className="px-8 py-4 rounded-md text-lg font-bold text-white disabled:opacity-60"
          style={{ backgroundColor: "var(--bms-pink)" }}
        >
          {loading ? "Thinking..." : "Build my Lovable prompt ↗"}
        </button>
      </div>

      {error && (
        <p className="text-sm font-semibold" style={{ color: "#c0392b" }}>
          {error}
        </p>
      )}

      {built && (
        <div className="flex flex-col gap-4">
          <pre
            className="rounded-lg p-6 text-sm md:text-base whitespace-pre-wrap font-mono leading-relaxed text-white overflow-auto"
            style={{ backgroundColor: "var(--bms-dark)", maxHeight: "60vh" }}
          >
            {built}
          </pre>
          <div>
            <button
              onClick={handleCopy}
              className="px-6 py-3 rounded-md text-base font-bold text-white"
              style={{ backgroundColor: "var(--bms-pink)" }}
            >
              {copied ? "Copied ✓" : "Copy my prompt"}
            </button>
          </div>
          <p
            className="text-sm font-semibold rounded-lg p-4"
            style={{
              color: "var(--bms-purple)",
              backgroundColor: "rgba(94,92,230,0.08)",
              borderLeft: "4px solid var(--bms-purple)",
            }}
          >
            Paste this into Lovable in Plan mode. Do not switch to Build mode
            until Lovable has proposed a structure you are happy with.
          </p>
          <p
            className="text-base font-semibold rounded-lg p-4"
            style={{
              color: "#0f7a3d",
              backgroundColor: "rgba(34,170,90,0.10)",
              borderLeft: "4px solid #22aa5a",
            }}
          >
            ✅ Your prompt is ready. Head to Lovable now.
          </p>
        </div>
      )}
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  const isValidHex = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(value);
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold opacity-80">{label}</span>
      <div className="flex items-center gap-2 rounded-md border border-black/15 bg-white px-3 py-2 focus-within:border-[var(--bms-pink)]">
        <input
          type="color"
          value={isValidHex ? value : "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-12 cursor-pointer rounded border border-black/10 bg-transparent p-0"
          aria-label={`${label} colour picker`}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-base font-mono"
        />
      </div>
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold opacity-80">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md px-4 py-3 bg-white border border-black/15 focus:outline-none focus:border-[var(--bms-pink)] text-base"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
