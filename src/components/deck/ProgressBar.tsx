export function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = (current / total) * 100;
  return (
    <div className="fixed top-0 left-0 right-0 z-40">
      <div className="h-1 w-full bg-black/10">
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${pct}%`, backgroundColor: "var(--bms-purple)" }}
        />
      </div>
      <div
        className="absolute right-6 top-3 text-xs font-semibold tracking-wide"
        style={{ color: "var(--bms-purple)" }}
      >
        Step {current} of {total}
      </div>
    </div>
  );
}
