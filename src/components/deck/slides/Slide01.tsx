export function Slide01({ goNext }: { goNext: () => void }) {
  return (
    <div className="flex flex-col items-start gap-10">
      <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05]">
        Build a Website or
        <br />
        Web Application. Today.
      </h1>
      <p className="text-xl md:text-2xl opacity-80 max-w-3xl">
        A 90-minute live workshop with Sheena Karim — Founder, Change Made Simple
      </p>

      <div
        className="w-full max-w-3xl aspect-video rounded-lg border-2 border-dashed flex items-center justify-center text-sm font-mono"
        style={{
          borderColor: "rgba(255,255,255,0.2)",
          color: "rgba(255,255,255,0.5)",
        }}
      >
        [YouTube embed: Sheena intro video]
      </div>

      <button
        onClick={goNext}
        className="mt-2 px-8 py-4 rounded-md text-base font-semibold text-white"
        style={{ backgroundColor: "var(--bms-pink)" }}
      >
        Let's go →
      </button>
    </div>
  );
}
