import planBuildMode from "@/assets/plan-build-mode.png.asset.json";

export function Slide04(_: { goNext: () => void }) {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
        Two modes. Know when to use each.
      </h2>

      <img
        src={planBuildMode.url}
        alt="Lovable chat input showing the Plan and Build mode toggle"
        className="w-full rounded-lg border border-black/10 shadow-sm"
      />

      <div className="grid md:grid-cols-2 gap-6">
        <div
          className="rounded-lg p-6 flex flex-col gap-3"
          style={{
            backgroundColor: "var(--bms-grey)",
            borderTop: "4px solid var(--bms-purple)",
          }}
        >
          <div
            className="text-sm font-bold tracking-widest"
            style={{ color: "var(--bms-purple)" }}
          >
            PLAN MODE
          </div>
          <p className="text-lg md:text-xl leading-relaxed">
            Think before you build. Lovable asks clarifying questions and
            proposes a structure. Always start here.
          </p>
        </div>

        <div
          className="rounded-lg p-6 flex flex-col gap-3"
          style={{
            backgroundColor: "var(--bms-grey)",
            borderTop: "4px solid var(--bms-pink)",
          }}
        >
          <div
            className="text-sm font-bold tracking-widest"
            style={{ color: "var(--bms-pink)" }}
          >
            BUILD MODE
          </div>
          <p className="text-lg md:text-xl leading-relaxed">
            Now it builds. Your website or web application takes shape. Only
            switch here once your plan is locked.
          </p>
        </div>
      </div>

      <p className="text-2xl md:text-3xl font-black">
        Rule: Always start in Plan mode. Always.
      </p>
    </div>
  );
}
