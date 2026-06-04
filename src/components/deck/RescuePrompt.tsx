import { useState } from "react";

export function RescuePrompt({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };
  return (
    <div
      className="relative rounded-lg p-6 pr-32"
      style={{
        borderLeft: "4px solid var(--bms-purple)",
        backgroundColor: "rgba(94,92,230,0.08)",
      }}
    >
      <p className="text-base md:text-lg leading-relaxed">{text}</p>
      <button
        onClick={handleCopy}
        className="absolute top-4 right-4 px-3 py-2 rounded-md text-xs font-semibold text-white"
        style={{ backgroundColor: "var(--bms-purple)" }}
      >
        {copied ? "Copied ✓" : "Copy"}
      </button>
    </div>
  );
}
