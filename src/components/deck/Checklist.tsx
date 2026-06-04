import { useState } from "react";

export function Checklist({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));
  const toggle = (i: number) =>
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li key={i}>
          <button
            type="button"
            onClick={() => toggle(i)}
            className="flex items-start gap-4 text-left w-full group"
          >
            <span
              className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 transition-colors"
              style={{
                borderColor: "var(--bms-pink)",
                backgroundColor: checked[i] ? "var(--bms-pink)" : "transparent",
              }}
            >
              {checked[i] && (
                <svg viewBox="0 0 16 16" className="h-4 w-4 text-white" fill="none">
                  <path
                    d="M3 8.5l3 3 7-7"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <span
              className={`text-lg md:text-xl ${checked[i] ? "opacity-60 line-through" : ""}`}
            >
              {item}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
