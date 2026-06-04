import { Checklist } from "../Checklist";
import { RescuePrompt } from "../RescuePrompt";

export function Slide09(_: { goNext: () => void }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="inline-flex items-center gap-3 bg-[var(--bms-pink)] text-white px-6 py-3 rounded-full">
        <span className="text-2xl">🏁</span>
        <span className="text-3xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: '"Fredoka", ui-sans-serif, system-ui, sans-serif' }}>
          Check Point 2
        </span>
      </div>

      <Checklist
        items={[
          "My user can complete the main action",
          "They see a result at the end",
          "I haven't added anything outside the main flow",
        ]}
      />

      <p className="text-xl md:text-2xl font-black">
        Stuck? Copy the rescue prompt. Paste it straight into Lovable.
      </p>

      <RescuePrompt text="Stop adding new features. Help me simplify this into one clear flow that I can demo in 60 seconds." />
    </div>
  );
}
