export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="leading-none select-none">
      <div
        className={`text-3xl font-black tracking-tight ${
          dark ? "text-[var(--bms-dark)]" : "text-white"
        }`}
      >
        BUILD
      </div>
      <div
        className="text-xs font-semibold tracking-[0.2em] mt-1"
        style={{ color: "var(--bms-pink)" }}
      >
        MADE SIMPLE
      </div>
    </div>
  );
}
