import plansAndCredits from "@/assets/plans-and-credits.png.asset.json";

const STEPS = [
  "Go to lovable.dev",
  "Create your account",
  "Go to Settings → Plans & Credits",
  "Select a plan and complete checkout.",
];

export function Slide03(_: { goNext: () => void }) {
  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
        First — let's get you into Lovable
      </h2>

      <ol className="space-y-5">
        {STEPS.map((step, i) => (
          <li key={i} className="flex items-start gap-6">
            <span
              className="text-3xl md:text-4xl font-black shrink-0"
              style={{ color: "var(--bms-pink)" }}
            >
              {i + 1}
            </span>
            <span className="text-xl md:text-2xl font-medium pt-1">{step}</span>
          </li>
        ))}
      </ol>

      <ScreenshotPlaceholder label="Lovable plans page" dark />
    </div>
  );
}
