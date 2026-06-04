import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const IDEA_SYSTEM = `You are a workshop coach helping someone scope a buildable website or web application idea. Read their idea sentence. If it is too vague, tell them exactly what to make more specific — who the person is, what they need to do, or what the painful thing is they currently do. Be warm, direct, under 3 sentences. If it is solid, tell them it is ready and what makes it strong.`;

const DEMO_SYSTEM = `Write a warm, confident 60-second demo script for a live workshop presentation. Sound like a real person presenting something they built, not a sales pitch. Three short paragraphs maximum.`;

const InputSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("idea"),
    idea: z.string().min(1).max(2000),
  }),
  z.object({
    kind: z.literal("demo"),
    audience: z.string().min(1).max(500),
    help: z.string().min(1).max(500),
    improve: z.string().min(1).max(500),
  }),
]);

export const askClaude = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    let system = "";
    let userMessage = "";

    if (data.kind === "idea") {
      system = IDEA_SYSTEM;
      userMessage = `Idea sentence: ${data.idea}`;
    } else {
      system = DEMO_SYSTEM;
      userMessage = `Who it is for: ${data.audience}\nWhat it helps them do: ${data.help}\nWhat they would improve next: ${data.improve}`;
    }

    try {
      const res = await fetch("https://wandering-bonus-0e54.sheena-47c.workers.dev", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 500,
          system,
          messages: [{ role: "user", content: userMessage }],
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("AI API error:", res.status, errText);
        return { text: "", error: `AI API error (${res.status}). Try again.` };
      }

      const json = (await res.json()) as {
        content?: Array<{ type: string; text?: string }>;
      };
      const text =
        json.content
          ?.filter((c) => c.type === "text")
          .map((c) => c.text ?? "")
          .join("\n")
          .trim() ?? "";
      return { text, error: null as string | null };
    } catch (err) {
      console.error("AI request failed:", err);
      return { text: "", error: "Network error talking to AI." };
    }
  });
