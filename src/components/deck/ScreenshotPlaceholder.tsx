export function ScreenshotPlaceholder({
  label,
  dark = false,
}: {
  label: string;
  dark?: boolean;
}) {
  return (
    <div
      className="w-full rounded-lg border-2 border-dashed flex items-center justify-center text-sm font-mono py-16 px-6"
      style={{
        borderColor: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
        color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)",
      }}
    >
      [Screenshot: {label}]
    </div>
  );
}
