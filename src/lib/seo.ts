/**
 * Centralized site-wide SEO constants (titles, URLs, JSON-LD).
 *
 * Social crawlers require absolute image URLs. Set `VITE_SITE_URL` to your live
 * domain (for example on Netlify). Falls back to deploy URL env vars, then a
 * production placeholder — update `public/robots.txt` and `public/sitemap.xml`
 * if your canonical domain differs.
 */

import { t } from "@/i18n/siteCopy";

const rawSiteUrl =
  import.meta.env.VITE_SITE_URL ||
  (typeof process !== "undefined" ? process.env.URL || process.env.DEPLOY_PRIME_URL : undefined) ||
  "https://avadhfoodandbeverages.com";

export const SITE_URL = rawSiteUrl.replace(/\/+$/, "");

export const SITE_NAME = t("brand.short");
export const SITE_TAGLINE = t("home.tagline");
export const DEFAULT_TITLE = t("meta.title");
export const DEFAULT_DESCRIPTION = t("meta.description");
export const DEFAULT_KEYWORDS = t("meta.keywords");

/** Served from `/public` for absolute OG / Twitter URLs */
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const OG_IMAGE_ALT = t("seo.ogImageAlt");
export const LOGO_IMAGE = `${SITE_URL}/logo-1.png`;

/** Open Graph image dimensions (hero asset used as social preview) */
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export const ORG = {
  legalName: SITE_NAME,
  email: t("contact.emailValue"),
  telephoneDisplay: t("contact.phoneValue"),
  telephoneE164: "+918769512472",
  founded: "2020",
  streetAddress: "office 49, first floor, MKM market, sector 57",
  locality: "Gurgaon",
  region: "Haryana",
  postalCode: "122003",
  country: "IN",
  countryName: "India",
  geo: { lat: 28.425, lng: 77.092 },
} as const;

export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: SITE_NAME,
    legalName: ORG.legalName,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO_IMAGE,
      width: 512,
      height: 512,
    },
    image: OG_IMAGE,
    description: DEFAULT_DESCRIPTION,
    foundingDate: ORG.founded,
    foundingLocation: {
      "@type": "Place",
      name: `${ORG.locality}, ${ORG.region}, ${ORG.countryName}`,
    },
    email: ORG.email,
    telephone: ORG.telephoneE164,
    areaServed: ["Gurgaon", "Delhi NCR", "Haryana", "India"],
    address: {
      "@type": "PostalAddress",
      streetAddress: ORG.streetAddress,
      addressLocality: ORG.locality,
      addressRegion: ORG.region,
      postalCode: ORG.postalCode,
      addressCountry: ORG.country,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: ORG.email,
        telephone: ORG.telephoneE164,
        areaServed: ORG.country,
        availableLanguage: ["en", "hi"],
      },
    ],
    brand: [
      { "@type": "Brand", name: t("brands.bokchoy.name") },
      { "@type": "Brand", name: t("brands.swooshi.name") },
      { "@type": "Brand", name: t("brands.lilbuns.name") },
    ],
  };
}

export function localBusinessJsonLd(): Record<string, unknown> {
  return {
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}#localbusiness`,
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    image: OG_IMAGE,
    logo: LOGO_IMAGE,
    url: SITE_URL,
    email: ORG.email,
    telephone: ORG.telephoneE164,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: ORG.streetAddress,
      addressLocality: ORG.locality,
      addressRegion: ORG.region,
      postalCode: ORG.postalCode,
      addressCountry: ORG.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: ORG.geo.lat,
      longitude: ORG.geo.lng,
    },
  };
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "en-IN",
    publisher: { "@id": `${SITE_URL}#organization` },
  };
}

export function breadcrumbJsonLd(): Record<string, unknown> {
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}#breadcrumbs`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("nav.home"), item: SITE_URL },
      { "@type": "ListItem", position: 2, name: t("nav.about"), item: `${SITE_URL}#about` },
      { "@type": "ListItem", position: 3, name: t("nav.mission"), item: `${SITE_URL}#mission` },
      { "@type": "ListItem", position: 4, name: t("nav.why"), item: `${SITE_URL}#why` },
      { "@type": "ListItem", position: 5, name: t("nav.brands"), item: `${SITE_URL}#brands` },
      { "@type": "ListItem", position: 6, name: t("nav.contact"), item: `${SITE_URL}#contact` },
    ],
  };
}

export function rootLdJsonGraph(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [organizationJsonLd(), localBusinessJsonLd(), websiteJsonLd()],
  });
}

export function indexPageLdJsonGraph(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbJsonLd(),
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}#brands`,
        name: `${SITE_NAME} — ${t("brands.sectionTitle")}`,
        numberOfItems: 3,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "Brand",
              name: t("brands.bokchoy.name"),
              description: t("brands.bokchoy.p1"),
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "Brand",
              name: t("brands.swooshi.name"),
              description: t("brands.swooshi.p1"),
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@type": "Brand",
              name: t("brands.lilbuns.name"),
              description: t("brands.lilbuns.p1"),
            },
          },
        ],
      },
    ],
  });
}
