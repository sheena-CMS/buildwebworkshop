const OUTCOMES = [
  "You'll have a live, working website or web application",
  "You'll know exactly how to prompt it into existence",
  "You'll be able to build the next one yourself",
];

export function Slide02(_: { goNext: () => void }) {
  return (
    <div className="flex flex-col gap-12">
      <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
        By the end of this session...
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {OUTCOMES.map((text, i) => (
          <div
            key={i}
            className="rounded-lg p-8 text-white"
            style={{
              backgroundColor: "var(--bms-dark)",
              borderLeft: "4px solid var(--bms-pink)",
            }}
          >
            <div
              className="text-sm font-semibold mb-4"
              style={{ color: "var(--bms-pink)" }}
            >
              0{i + 1}
            </div>
            <p className="text-lg md:text-xl font-semibold leading-snug">{text}</p>
          </div>
        ))}
      </div>

      <p className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
        No coding. No agency. No waiting.
      </p>
    </div>
  );
}
