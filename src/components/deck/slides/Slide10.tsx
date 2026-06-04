import { Checklist } from "../Checklist";
import { RescuePrompt } from "../RescuePrompt";

export function Slide10(_: { goNext: () => void }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <span
          className="bg-[var(--bms-pink)] text-white px-6 py-3 rounded-full text-2xl md:text-3xl font-bold inline-block"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          🏁 Check Point 3
        </span>
      </div>

      <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
        Are you ready to go live?
      </h2>

      <p className="text-xl md:text-2xl opacity-80">
        If yes, click Publish.
      </p>

      <p className="text-xl md:text-2xl opacity-80">
        Then use the live URL to test.
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

      <p className="text-xl md:text-2xl opacity-80">
        Stuck? Copy the rescue prompt. Paste it straight into Lovable.
      </p>

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
