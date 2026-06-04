export function ProgressBar({
  current,
  total,
  isDark = true,
}: {
  current: number;
  total: number;
  isDark?: boolean;
}) {
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
        className="absolute right-6 top-4 text-base md:text-lg font-bold tracking-wide"
        style={{ color: isDark ? "#ffffff" : "#1d1d1f" }}
      >
        Step {current} of {total}
      </div>
    </div>
  );
}

