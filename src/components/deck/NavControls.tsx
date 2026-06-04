export function NavControls({
  onBack,
  onNext,
  onStart,
  showBack,
  showNext,
  showStart = true,
  nextLabel = "Next →",
}: {
  onBack: () => void;
  onNext: () => void;
  onStart?: () => void;
  showBack: boolean;
  showNext: boolean;
  showStart?: boolean;
  nextLabel?: string;
}) {
  return (
    <>
      {showStart && onStart && (
        <div className="fixed bottom-6 left-6 z-40">
          <button
            onClick={onStart}
            className="px-5 py-3 rounded-md text-sm font-semibold bg-black/10 text-current hover:bg-black/20 transition-colors"
          >
            Start →
          </button>
        </div>
      )}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {showBack && (
          <button
            onClick={onBack}
            className="px-5 py-3 rounded-md text-sm font-semibold bg-black/10 text-current hover:bg-black/20 transition-colors"
          >
            ← Back
          </button>
        )}
        {showNext && (
          <button
            onClick={onNext}
            className="px-6 py-3 rounded-md text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--bms-pink)" }}
          >
            {nextLabel}
          </button>
        )}
      </div>
    </>
  );
}

