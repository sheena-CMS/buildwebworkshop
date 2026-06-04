# Build Made Simple — Workshop Site Plan

A single-page, full-viewport, slide-by-slide workshop deck (desktop-only) with two AI-assisted slides powered by Claude Sonnet via a secure server function.

## Brand & Foundation

- Font: **Inter** (Google Fonts).
- Tokens added to `src/styles.css`:
  - `--bms-bg-dark: #1d1d1f`
  - `--bms-bg-white: #ffffff`
  - `--bms-bg-grey: #f5f5f7`
  - `--bms-pink: #FF4DA6`
  - `--bms-purple: #5e5ce6`
- No gradients, no shadows, no clipart. Generous whitespace, large bold headers.
- Logo: text-only — `BUILD` (large white) over `MADE SIMPLE` (smaller pink). Reusable `<Logo />` component, top-left on every slide.

## Layout & Navigation

- One route `/` with a `Deck` component holding all 11 slides.
- Each slide = full viewport (`h-screen w-screen`), centered content, max-width container.
- **Top progress bar**: thin purple bar showing `Step X of 11` + filled width %.
- **Fixed bottom-right nav**: pink "Next →" button, grey "← Back" button. Hidden Back on slide 1, hidden Next on slide 11.
- **Keyboard nav**: `←` / `→` arrows advance slides. Disabled when focus is in an `<input>` or `<textarea>` to avoid stealing typing.
- Slide state managed with `useState` (current index). Smooth scroll-snap or simple conditional render — going with conditional render for clean fullscreen swaps.

## Reusable Components

- `Logo` — top-left brand mark.
- `ProgressBar` — top, purple fill.
- `NavControls` — fixed bottom-right Next/Back.
- `OutcomeCard` — dark card with pink left border (slide 2).
- `NumberedStep` — large numeral + text (slides 3, 7).
- `Checklist` — pink checkbox list with local state (slides 8, 9, 10).
- `CopyBox` — dark code-style block + one-click "Copy" button using `navigator.clipboard`.
- `RescuePrompt` — purple-bordered copyable box variant.
- `ScreenshotPlaceholder` — labeled empty box (`[Screenshot: ...]`) for you to swap later.
- `AIResponseBox` — purple-bordered box with "Thinking..." loading state.

## Slide-by-Slide Build

1. **Welcome** — dark, logo, headline, subhead, **empty placeholder box** where the YouTube embed will go later, pink "Let's go →" CTA (also advances slide).
2. **What We're Building Today** — white bg, header, 3 `OutcomeCard`s in a row, tagline beneath.
3. **Set Up Lovable** — dark, 5 `NumberedStep`s, `ScreenshotPlaceholder` for Lovable plans page.
4. **Plan Mode vs Build Mode** — white, two side-by-side cards (purple-accent left, pink-accent right), two `ScreenshotPlaceholder`s, bold rule line.
5. **Your Idea** — dark, big template sentence, textarea for participant idea, pink "Check my idea ↗" → calls Claude server function, shows response in `AIResponseBox`.
6. **Your First Prompt** — white, dark template block, 5 labeled inputs, "Build my prompt ↗" button assembles inputs into the full prompt in a `CopyBox`, purple footer note.
7. **Let's Build — Switch to Build Mode** — dark, 3 numbered instructions, purple `RescuePrompt`, `ScreenshotPlaceholder`, pink bold rule.
8. **Checkpoint 1** — dark, 3-item `Checklist`, purple `RescuePrompt`, bold rule.
9. **Checkpoint 2** — white, 4-item `Checklist`, purple `RescuePrompt`.
10. **Checkpoint 3** — dark, header + subhead, 3-item `Checklist`, purple `RescuePrompt`, pink rule.
11. **60-Second Demo** — white, 5 numbered script lines, 3 input fields, pink "Write my script ↗" → Claude server function, response in copyable box, final pink line.

## Claude Integration (Technical)

You chose Anthropic Claude direct. Because the Anthropic API does not allow browser calls (CORS + secret protection), the key cannot live in the frontend. Setup:

1. I'll prompt you to add an `ANTHROPIC_API_KEY` secret via the secrets tool.
2. Create a TanStack Start server function `src/lib/ai/claude.functions.ts` with:
   - Input: `{ kind: 'idea' | 'demo', payload: {...} }` validated with Zod.
   - Reads `process.env.ANTHROPIC_API_KEY` inside `.handler()`.
   - `fetch('https://api.anthropic.com/v1/messages', ...)` with model `claude-sonnet-4-20250514`, `max_tokens: 500`, the system prompt you specified per kind.
   - Returns `{ text: string }` or `{ error: string }`.
3. Slides 5 & 11 call the function via `useServerFn` + local React state for loading/result. Loading text: "Thinking...". Errors surface as a short message in the same `AIResponseBox`.

## File Plan

- `src/styles.css` — add brand tokens + Inter import.
- `src/routes/__root.tsx` — set title "Build Made Simple", description, Inter font link.
- `src/routes/index.tsx` — renders `<Deck />`.
- `src/components/deck/` — `Deck.tsx`, `Logo.tsx`, `ProgressBar.tsx`, `NavControls.tsx`, `CopyBox.tsx`, `RescuePrompt.tsx`, `Checklist.tsx`, `AIResponseBox.tsx`, `ScreenshotPlaceholder.tsx`.
- `src/components/deck/slides/Slide01.tsx` … `Slide11.tsx`.
- `src/lib/ai/claude.functions.ts` — server function.

## What I'll Ask You For During Build

- Confirmation to add the `ANTHROPIC_API_KEY` secret (one-click secure form).
- Later: the YouTube URL and the 4 screenshots to swap into the placeholders.

## Out of Scope (per your spec)

- Mobile responsiveness.
- Persisting participant answers between slides/sessions.
- Auth or per-user accounts.
- Analytics.
