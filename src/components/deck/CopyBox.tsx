import { useState } from "react";

export function CopyBox({ text, label = "Copy prompt" }: { text: string; label?: string }) {
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
    <div className="relative">
      <pre
        className="rounded-lg p-6 pr-32 text-sm md:text-base whitespace-pre-wrap font-mono leading-relaxed text-white"
        style={{ backgroundColor: "var(--bms-dark)" }}
      >
        {text}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-4 right-4 px-3 py-2 rounded-md text-xs font-semibold text-white"
        style={{ backgroundColor: "var(--bms-pink)" }}
      >
        {copied ? "Copied ✓" : label}
      </button>
    </div>
  );
}
