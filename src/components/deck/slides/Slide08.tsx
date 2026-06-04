import { Checklist } from "../Checklist";
import { RescuePrompt } from "../RescuePrompt";

export function Slide08(_: { goNext: () => void }) {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
        15 minutes in — drop your Lovable link in the chat.
      </h2>

      <Checklist
        items={[
          "My first screen is live in Lovable",
          "A new visitor would understand what this is for",
          "I've dropped my link in the chat",
        ]}
      />

      <RescuePrompt text="Improve the first screen so a new visitor immediately understands who this is for, what problem it solves, and what action to take next." />

      <p className="text-xl md:text-2xl font-black">
        Stuck? Copy the rescue prompt. Paste it straight into Lovable.
      </p>
    </div>
  );
}
