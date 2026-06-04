import { Checklist } from "../Checklist";
import { RescuePrompt } from "../RescuePrompt";

export function Slide08(_: { goNext: () => void }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="inline-flex items-center gap-3 bg-[var(--bms-pink)] text-white px-6 py-3 rounded-full">
        <span className="text-2xl">🏁</span>
        <span className="text-3xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: '"Fredoka", ui-sans-serif, system-ui, sans-serif' }}>
          Check Point 1
        </span>
      </div>

      <Checklist
        items={[
          "My first screen is live in Lovable",
          "A new visitor would understand what this is for",
        ]}
      />

      <p className="text-xl md:text-2xl font-black">
        Stuck? Copy the rescue prompt. Paste it straight into Lovable.
      </p>

      <RescuePrompt text="Improve the first screen so a new visitor immediately understands who this is for, what problem it solves, and what action to take next." />
    </div>
  );
}
