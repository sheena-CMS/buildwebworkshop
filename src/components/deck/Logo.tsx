export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="leading-none select-none whitespace-nowrap flex items-baseline gap-2">
      <span
        className={`text-xl font-black tracking-tight ${
          dark ? "text-[var(--bms-dark)]" : "text-white"
        }`}
      >
        BUILD
      </span>
      <span
        className="text-[10px] font-semibold tracking-[0.2em]"
        style={{ color: "var(--bms-pink)" }}
      >
        MADE SIMPLE
      </span>
    </div>
  );
}
