import { useCallback, useEffect, useState } from "react";
import { Logo } from "./Logo";
import { ProgressBar } from "./ProgressBar";
import { NavControls } from "./NavControls";
import { Slide01 } from "./slides/Slide01";
import { Slide02 } from "./slides/Slide02";
import { Slide03 } from "./slides/Slide03";
import { Slide04 } from "./slides/Slide04";
import { Slide05 } from "./slides/Slide05";
import { Slide06 } from "./slides/Slide06";
import { Slide07 } from "./slides/Slide07";
import { Slide08 } from "./slides/Slide08";
import { Slide09 } from "./slides/Slide09";
import { Slide10 } from "./slides/Slide10";
import { Slide11 } from "./slides/Slide11";

type SlideDef = {
  bg: "dark" | "white" | "grey";
  Component: React.ComponentType<{ goNext: () => void }>;
};

const SLIDES: SlideDef[] = [
  { bg: "dark", Component: Slide01 },
  { bg: "white", Component: Slide02 },
  { bg: "dark", Component: Slide03 },
  { bg: "white", Component: Slide04 },
  { bg: "dark", Component: Slide05 },
  { bg: "white", Component: Slide06 },
  { bg: "dark", Component: Slide07 },
  { bg: "dark", Component: Slide08 },
  { bg: "white", Component: Slide09 },
  { bg: "dark", Component: Slide10 },
  { bg: "white", Component: Slide11 },
];

const TOTAL = SLIDES.length;

export function Deck() {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];
  const isDark = slide.bg === "dark";

  const goNext = useCallback(
    () => setIndex((i) => Math.min(TOTAL - 1, i + 1)),
    [],
  );
  const goBack = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const goStart = useCallback(() => setIndex(0), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) {
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goBack();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goBack]);

  const bgColor =
    slide.bg === "dark"
      ? "var(--bms-dark)"
      : slide.bg === "grey"
        ? "var(--bms-grey)"
        : "var(--bms-white)";
  const textColor = isDark ? "var(--bms-white)" : "var(--bms-dark)";

  const SlideComponent = slide.Component;

  return (
    <div
      className="min-h-screen w-full transition-colors duration-300"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <ProgressBar current={index + 1} total={TOTAL} />

      <div className="fixed top-6 left-6 z-30">
        <Logo dark={!isDark} />
      </div>

      <main className="min-h-screen w-full flex items-center justify-center px-8 py-24">
        <div className="w-full max-w-6xl">
          <SlideComponent goNext={goNext} />
        </div>
      </main>

      <NavControls
        onBack={goBack}
        onNext={goNext}
        onStart={goStart}
        showBack={index > 0}
        showNext={index < TOTAL - 1}
        showStart={index > 0}
      />
    </div>
  );
}
