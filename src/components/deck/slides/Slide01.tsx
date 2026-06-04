export function Slide01({ goNext }: { goNext: () => void }) {
  return (
    <div className="flex flex-col items-start gap-10">
      <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05]">
        Build a Website or
        <br />
        Web Application. Today.
      </h1>
      <p className="text-xl md:text-2xl opacity-80 whitespace-nowrap">
        A 90-minute live workshop with Sheena Karim — Founder, Change Made Simple
      </p>
      <a
        href="https://www.changemadesimple.com.au"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl md:text-2xl font-semibold underline underline-offset-4"
        style={{ color: "#FF4DA6" }}
      >
        www.changemadesimple.com.au
      </a>

      <button
        onClick={goNext}
        className="mt-2 px-10 py-5 rounded-md text-lg md:text-xl font-bold text-white"
        style={{ backgroundColor: "var(--bms-pink)" }}
      >
        Let's go →
      </button>
    </div>
  );
}
