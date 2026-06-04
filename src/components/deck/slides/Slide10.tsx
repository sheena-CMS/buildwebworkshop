import { Checklist } from "../Checklist";
import { RescuePrompt } from "../RescuePrompt";

export function Slide10(_: { goNext: () => void }) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
        Does it do the thing?
      </h2>
      <p className="text-xl md:text-2xl opacity-80">
        Test it like you're about to hand it to someone.
      </p>

      <div className="mt-4">
        <Checklist
          items={[
            "I've published the live URL — not just the Lovable preview",
            "I've tested the main flow on the live link",
            "Someone else could use this without me explaining it",
          ]}
        />
      </div>

      <RescuePrompt text="Review this for publishing. Check the main flow, clarity, and any obvious broken states. Tell me only the critical fixes before I go live." />

      <p
        className="text-xl md:text-2xl font-black"
        style={{ color: "var(--bms-pink)" }}
      >
        If it works on the live URL — you've shipped. Well done.
      </p>
    </div>
  );
}
