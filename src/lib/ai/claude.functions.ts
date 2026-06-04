import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const IDEA_SYSTEM = `You are a warm, friendly workshop coach helping someone build their first website or web application. Your job is to help them arrive at a clear, specific idea sentence in the format: I am building a website or web application for [specific person] that helps them [do this thing] so they don't have to [painful thing they currently do].

Here is how you work:

If their input is too vague to build anything from, ask them ONE clarifying question only. Choose the most important gap — who is it for, what is the problem, or what is the painful thing.

Never ask more than one question at a time.

Never give examples or rewrite their sentence yet — just ask your one question.

Once you have enough information to write a clear idea sentence, write it for them. Present it clearly like this:

HERE IS YOUR IDEA SENTENCE: [the completed sentence]

You are ready to move to the next step. Copy your idea sentence — you will need it in Step 7.

Keep every response to 3 sentences maximum. Be warm, encouraging, and brief.`;

const DEMO_SYSTEM = `Write a warm, confident 60-second demo script for a live workshop presentation. Sound like a real person presenting something they built, not a sales pitch. Three short paragraphs maximum.`;

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const InputSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("idea"),
    messages: z.array(MessageSchema).min(1).max(20),
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
    let messages: Array<{ role: "user" | "assistant"; content: string }> = [];

    if (data.kind === "idea") {
      system = IDEA_SYSTEM;
      messages = data.messages;
    } else {
      system = DEMO_SYSTEM;
      messages = [
        {
          role: "user",
          content: `Who it is for: ${data.audience}\nWhat it helps them do: ${data.help}\nWhat they would improve next: ${data.improve}`,
        },
      ];
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
