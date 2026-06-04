import { RescuePrompt } from "../RescuePrompt";
import { ScreenshotPlaceholder } from "../ScreenshotPlaceholder";

const STEPS = [
  "Review what Lovable proposed in Plan mode — does it match your idea?",
  "If yes — switch to Build mode and hit go",
  "If no — tell Lovable what to change before you switch",
];

export function Slide07(_: { goNext: () => void }) {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
        You've planned. Now build.
      </h2>

      <ol className="space-y-4">
        {STEPS.map((s, i) => (
          <li key={i} className="flex items-start gap-5">
            <span
              className="text-3xl font-black shrink-0"
              style={{ color: "var(--bms-pink)" }}
            >
              {i + 1}
            </span>
            <span className="text-xl md:text-2xl font-medium pt-1">{s}</span>
          </li>
        ))}
      </ol>

      <RescuePrompt text="Before I switch to Build mode I want to change [this]. Please update the plan." />

      <ScreenshotPlaceholder label="Lovable plan proposal screen" dark />

      <p
        className="text-xl md:text-2xl font-black"
        style={{ color: "var(--bms-pink)" }}
      >
        Don't switch to Build mode until the plan feels right. Changing your
        mind mid-build costs you time.
      </p>
    </div>
  );
}
