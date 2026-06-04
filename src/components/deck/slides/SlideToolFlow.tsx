import { ScreenshotPlaceholder } from "../ScreenshotPlaceholder";

const PURPLE = "#5e5ce6";
const PINK = "#FF4DA6";

export function SlideToolFlow(_: { goNext: () => void }) {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
        Two tools. One flow. Here's how they connect.
      </h2>

      <p className="text-lg md:text-xl text-white/80 max-w-4xl">
        In this workshop you are using two AI tools. Here is exactly what
        happens when you type something into this course website — and how that
        connects to Lovable.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className="rounded-lg border border-white/40 bg-white/5 p-6 border-t-4"
          style={{ borderTopColor: PURPLE }}
        >
          <div
            className="text-2xl md:text-3xl font-black mb-3"
            style={{ color: PURPLE }}
          >
            Claude — the brain
          </div>
          <p className="text-base md:text-lg text-white/90 leading-relaxed">
            Claude thinks, reasons, and writes. When you type your idea into
            this website, Claude reads it and responds. It sharpens your idea
            and builds your Lovable prompt for you.
          </p>
        </div>

        <div
          className="rounded-lg border border-white/40 bg-white/5 p-6 border-t-4"
          style={{ borderTopColor: PINK }}
        >
          <div
            className="text-2xl md:text-3xl font-black mb-3"
            style={{ color: PINK }}
          >
            Lovable — the hands
          </div>
          <p className="text-base md:text-lg text-white/90 leading-relaxed">
            Lovable takes a prompt and builds your website or web application.
            No coding required. You paste your prompt in, it plans and builds.
          </p>
        </div>
      </div>

      <ScreenshotPlaceholder
        label="Upload: Claude and Lovable flow diagram"
        dark
      />

      <p
        className="text-2xl md:text-3xl font-black text-center"
        style={{ color: PINK }}
      >
        Claude does the thinking. Lovable does the building. You do the
        directing.
      </p>
    </div>
  );
}
