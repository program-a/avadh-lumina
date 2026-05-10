import { createFileRoute } from "@tanstack/react-router";
import Site from "@/components/Site";
import { t } from "@/i18n/siteCopy";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: t("meta.title") },
      { name: "description", content: t("meta.description") },
      { property: "og:title", content: t("brand.short") },
      { property: "og:description", content: t("home.tagline") },
    ],
  }),
  component: Site,
});
