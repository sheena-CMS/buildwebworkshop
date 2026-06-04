## Switch Claude calls to the proxy

Replace the direct Anthropic call in `src/lib/ai/claude.functions.ts` with a call to the proxy worker. The proxy holds the API key, so the server function no longer needs `ANTHROPIC_API_KEY`.

### Changes

**`src/lib/ai/claude.functions.ts`**
- Remove the `process.env.ANTHROPIC_API_KEY` read and the missing-key error branch.
- Replace the `fetch("https://api.anthropic.com/v1/messages", …)` call with `fetch("https://wandering-bonus-0e54.sheena-47c.workers.dev", …)`.
- Drop the `x-api-key` and `anthropic-version` headers; keep `Content-Type: application/json`.
- Send the same JSON body (`model`, `max_tokens`, `system`, `messages`) unchanged.
- Keep the existing response parsing (`content[].text`) — assumes the proxy forwards Anthropic's response shape verbatim.
- Keep error handling/logging the same, just relabel messages to "AI" instead of "Claude".

### Not changing
- Slide components, prompts (`IDEA_SYSTEM`, `DEMO_SYSTEM`), input schema, model name, or max_tokens.
- No secret needed anymore — the previously requested `ANTHROPIC_API_KEY` can be ignored/removed.
