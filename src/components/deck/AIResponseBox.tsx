export function AIResponseBox({
  loading,
  text,
  error,
}: {
  loading: boolean;
  text: string;
  error: string | null;
}) {
  if (!loading && !text && !error) return null;
  return (
    <div
      className="rounded-lg p-6"
      style={{
        borderLeft: "4px solid var(--bms-purple)",
        backgroundColor: "rgba(94,92,230,0.08)",
      }}
    >
      {loading ? (
        <p className="text-base md:text-lg italic opacity-70">Thinking...</p>
      ) : error ? (
        <p className="text-base md:text-lg" style={{ color: "var(--bms-pink)" }}>
          {error}
        </p>
      ) : (
        <p className="text-base md:text-lg leading-relaxed whitespace-pre-wrap">{text}</p>
      )}
    </div>
  );
}
