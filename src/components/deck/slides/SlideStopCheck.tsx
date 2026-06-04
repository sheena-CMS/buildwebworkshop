import { Check, OctagonAlert } from "lucide-react";

const PINK = "#FF4DA6";

const items = [
  {
    title: "An idea",
    body: "You know what you want to build and who it's for.",
  },
  {
    title: "A credit card",
    body: "Lovable is a paid tool. Have your card ready before Step 4.",
  },
  {
    title: "A Claude account",
    body: "We'll use Sheena's Claude API for today's workshop. In future you'll need your own — create a free account at console.anthropic.com when you're ready.",
  },
  {
    title: "Two screens or a large monitor",
    body: "You'll need one screen for this workshop and one for Lovable. No two screens? Open two windows side by side on one large monitor. A laptop alone will be a squeeze.",
  },
];

export function SlideStopCheck() {
  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <div className="flex items-center gap-4">
        <OctagonAlert
          size={72}
          strokeWidth={2.5}
          color={PINK}
          className="shrink-0"
        />
        <div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
            Stop. Check you're ready.
          </h1>
        </div>
      </div>

      <p className="text-xl md:text-2xl opacity-80 max-w-3xl">
        This workshop moves fast. Make sure you have these four things before
        we go any further.
      </p>

      <ul className="flex flex-col gap-5 md:gap-6">
        {items.map((it) => (
          <li key={it.title} className="flex items-start gap-4">
            <span
              className="shrink-0 mt-1 rounded-full p-2"
              style={{ backgroundColor: `${PINK}22` }}
            >
              <Check size={28} strokeWidth={3} color={PINK} />
            </span>
            <div>
              <div className="text-2xl md:text-3xl font-bold leading-tight">
                {it.title}
              </div>
              <div className="text-lg md:text-xl opacity-80 mt-1">
                {it.body}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <p className="text-2xl md:text-3xl font-black tracking-tight pt-2">
        Not ready? Pause here. Sort it. Then come back.
      </p>
    </div>
  );
}
