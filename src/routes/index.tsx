import { createFileRoute } from "@tanstack/react-router";
import { Deck } from "@/components/deck/Deck";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Build Made Simple — Live Workshop with Sheena Karim" },
      {
        name: "description",
        content:
          "A 90-minute live workshop. Build a working website or web application today — no code, no agency, no waiting.",
      },
      { property: "og:title", content: "Build Made Simple" },
      {
        property: "og:description",
        content: "Build a website or web application. Today.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <Deck />;
}
