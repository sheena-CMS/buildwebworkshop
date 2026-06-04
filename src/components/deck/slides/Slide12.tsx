const STEPS: { title: string; body: React.ReactNode }[] = [
  {
    title: "Publish it in Lovable",
    body: (
      <>
        Hit the Publish button in Lovable. You'll get a free URL that looks like{" "}
        <span className="font-semibold">yourproject.lovable.app</span> — that's
        your live site right now. Share that link immediately.
      </>
    ),
  },
  {
    title: "Keep iterating",
    body: (
      <>
        Your site is never finished. Go back into Lovable, keep prompting, keep
        improving. Each session builds on the last.
      </>
    ),
  },
  {
    title: "Connect a custom domain",
    body: (
      <>
        <p className="mb-3">When you're ready to look professional:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Buy a domain — ask Claude or ChatGPT which registrar has the best
            deal right now
          </li>
          <li>
            In Lovable go to <span className="font-semibold">Settings → Custom Domain</span>
          </li>
          <li>Follow the instructions to point your domain to Lovable</li>
          <li>Takes about 10 minutes</li>
        </ul>
      </>
    ),
  },
  {
    title: "Tell people about it",
    body: (
      <>
        Share the link. LinkedIn post. Email your network. Don't wait until it's
        perfect.
      </>
    ),
  },
];

export function Slide12(_: { goNext: () => void }) {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
        Your site is live. Now what?
      </h2>

      <ol className="space-y-6">
        {STEPS.map((s, i) => (
          <li key={i} className="flex items-start gap-5">
            <span
              className="text-4xl md:text-5xl font-black shrink-0 w-12 leading-none"
              style={{ color: "var(--bms-pink)" }}
            >
              {i + 1}
            </span>
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{s.title}</h3>
              <div className="text-lg md:text-xl opacity-80 leading-relaxed">
                {s.body}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
