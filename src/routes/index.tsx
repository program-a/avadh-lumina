import { createFileRoute } from "@tanstack/react-router";
import Site from "@/components/Site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Avadh Food & Beverages — Crafted by Passion. Inspired by Taste." },
      { name: "description", content: "A multi-brand culinary house from Gurgaon — home to Bokchoy, Swooshi and Lil Buns. An editorial study in flavour, craft and quiet luxury." },
      { property: "og:title", content: "Avadh Food & Beverages" },
      { property: "og:description", content: "Crafted by Passion. Inspired by Taste." },
    ],
  }),
  component: Site,
});
