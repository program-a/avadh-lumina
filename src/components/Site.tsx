import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
// import heroFood from "@/assets/hero-food.jpg";
// import logoImg from "@/assets/logo-1.png";
// import bokchoyImg from "@/assets/bokchoy.jpg";
// import swooshiImg from "@/assets/swooshi.jpg";
// import lilbunsImg from "@/assets/lilbuns.jpg";

/** Served from `public/` — hero: flagship spread; brands aligned to cuisine (see filenames in public). */
const heroFood = "/billbuns-7.jpeg";
const logoImg = "/logo-1.png";
const bokchoyImg = "/billbuns-4.jpeg";
const swooshiImg = "/billbuns-8.jpeg";
const lilbunsImg = "/billbuns-3.jpeg";
/** About section column — steamed dumplings in signature sauce (see `public/billbuns-5.jpeg`). */
const aboutSectionImg = "/billbuns-5.jpeg";
const bokchoyLogo = "/bokchoi-logo.png";
const swooshiLogo = "/swooshi-logo.png";
const lilbunsLogo = "/billbuns-logo.png";
import type { SiteMessageKey } from "@/i18n/siteCopy";
import { t } from "@/i18n/siteCopy";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

/* ---------- shared atoms ---------- */

function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`label-eyebrow text-charcoal/60 inline-flex items-center gap-3 ${className}`}>
      <span className="inline-block h-px w-8 bg-charcoal/40" />
      {children}
    </span>
  );
}

function Reveal({ children, delay = 0, y = 28 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SplitWord({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");
  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 1.1, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function ParagraphBlock({ keys }: { keys: readonly SiteMessageKey[] }) {
  return (
    <div className="space-y-6 max-w-2xl text-charcoal/75 leading-[1.85]">
      {keys.map((key) => (
        <p key={key}>{t(key)}</p>
      ))}
    </div>
  );
}

/* ---------- nav ---------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links: [SiteMessageKey, string][] = [
    ["nav.home", "#top"],
    ["nav.brands", "#brands"],
    ["nav.about", "#about"],
    // ["nav.mission", "#mission"],
    ["nav.why", "#why"],
  ];
  const mobileLinks: [SiteMessageKey, string][] = [...links, ["nav.contact", "#contact"]];
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.4 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
        scrolled ? "py-4 bg-ivory/80 backdrop-blur-md border-b border-border/60" : "py-7"
      }`}
    >
      <div className="mx-auto max-w-[1500px] px-5 md:px-12 flex items-center justify-between gap-4">
        <a
          href="#top"
          aria-label={t("brand.short")}
          className="flex items-center gap-2.5 sm:gap-3 min-w-0 shrink rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
        >
          <img
            src={logoImg}
            alt=""
            width={48}
            height={48}
            className="h-10 w-10 sm:h-11 sm:w-11 shrink-0 object-contain"
            decoding="async"
          />
          <span className="editorial-h text-[0.95rem] sm:text-lg font-light text-charcoal leading-snug tracking-tight text-left">
            {t("brand.short")}
          </span>
        </a>
        <div className="flex items-center gap-3 shrink-0">
          <nav className="hidden lg:flex items-center gap-8 flex-wrap justify-end" aria-label={t("nav.menuTitle")}>
            {links.map(([k, h]) => (
              <a key={k} href={h} className="label-eyebrow text-charcoal/70 hover:text-crimson transition-colors">
                {t(k)}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="hidden lg:inline-flex label-eyebrow text-charcoal hover:text-crimson transition-colors"
          >
            {t("nav.contact")}
          </a>

          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-md border border-border/80 bg-ivory/90 text-charcoal hover:bg-cream/80 hover:text-crimson transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson/40"
                aria-expanded={mobileNavOpen}
                aria-controls="mobile-site-nav"
                aria-label={t("nav.openMenu")}
              >
                <Menu className="h-6 w-6" strokeWidth={1.5} aria-hidden />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              closeAriaLabel={t("nav.closeMenu")}
              className="bg-ivory border-border !w-[min(100vw-1.5rem,22rem)] sm:!max-w-[22rem]"
            >
              <SheetTitle className="sr-only">{t("nav.menuTitle")}</SheetTitle>
              <nav id="mobile-site-nav" className="flex flex-col gap-1 pt-8">
                {mobileLinks.map(([k, h]) => (
                  <a
                    key={k}
                    href={h}
                    className="label-eyebrow py-3 text-charcoal/85 border-b border-border/60 hover:text-crimson transition-colors"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    {t(k)}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}

/* ---------- home ---------- */

function HomeSection() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 120]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section
      id="top"
      className="relative min-h-0 md:min-h-[100svh] overflow-hidden pt-28 md:pt-40 pb-16 md:pb-24"
    >
      <motion.div className="absolute inset-0" aria-hidden>
        <motion.img
          src={heroFood}
          alt={t("img.hero.alt")}
          style={{ y: bgY }}
          className="absolute inset-0 h-[115%] w-full object-cover object-center"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 bg-gradient-to-r from-ivory from-[38%] via-ivory/88 to-ivory/50 md:via-ivory/72 md:to-ivory/20"
        />
      </motion.div>

      <motion.div className="relative z-10 mx-auto max-w-[1500px] px-5 md:px-12 flex flex-col justify-center md:min-h-[calc(100svh-10rem)]">
        <motion.div className="max-w-2xl md:max-w-3xl lg:max-w-[42rem] flex flex-col">
          <Reveal>
            <p className="flex flex-wrap items-baseline gap-x-3 gap-y-2 text-charcoal/90">
              <span className="inline-block h-px w-10 bg-charcoal/35 shrink-0 translate-y-[-0.12em]" aria-hidden />
              <span className="editorial-h text-[clamp(1.65rem,5vw,3.5rem)] font-light tracking-tight leading-tight">
                {t("home.title")}
              </span>
            </p>
          </Reveal>
          <h1 className="editorial-h mt-8 md:mt-10 text-[clamp(2rem,8vw,6rem)] text-charcoal leading-[1.05] text-balance">
            <SplitWord text={t("home.tagline")} />
          </h1>
          <Reveal delay={0.25}>
            <div className="mt-10 md:mt-12">
              <ParagraphBlock keys={["home.p1", "home.p2", "home.p3"]} />
            </div>
          </Reveal>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-3"
        aria-hidden
      >
        <motion.span
          className="block w-px h-16 bg-charcoal/40 origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

/* ---------- about ---------- */

function AboutSection() {
  const coreItems: SiteMessageKey[] = ["about.core1", "about.core2", "about.core3", "about.core4"];
  const brandLines: SiteMessageKey[] = ["about.brandLine.bokchoy", "about.brandLine.swooshi", "about.brandLine.lilbuns"];
  const missionItems: SiteMessageKey[] = ["mission.m1", "mission.m2", "mission.m3", "mission.m4", "mission.m5"];
  return (
    <section id="about" className="relative py-16 md:py-40 border-t border-border">
      <div className="mx-auto max-w-[1500px] px-5 md:px-12">
        <Reveal>
          <Eyebrow>{t("about.eyebrow")}</Eyebrow>
        </Reveal>
        <h2 className="editorial-h mt-6 md:mt-8 text-[clamp(2.25rem,8vw,5.5rem)] leading-[0.95] max-w-4xl">
          <SplitWord text={t("about.title")} />
        </h2>

        <div className="mt-10 md:mt-14 grid grid-cols-12 gap-10 md:gap-14 lg:gap-16 items-start">
          <div className="col-span-12 md:col-span-6">
            <div className="space-y-6 max-w-2xl md:max-w-none text-charcoal/75 leading-[1.85]">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
            </div>
            <div className="mt-12 md:mt-16">
              <p className="label-eyebrow text-charcoal/80 mb-4">{t("about.coreIntro")}</p>
              <ul className="space-y-3 max-w-2xl md:max-w-none list-disc pl-5 text-charcoal/80 leading-[1.8]">
                {coreItems.map((key) => (
                  <li key={key}>{t(key)}</li>
                ))}
              </ul>
            </div>
            <div className="mt-12 md:mt-16 space-y-6 max-w-2xl md:max-w-none">
              <p className="text-charcoal/80 leading-[1.85]">{t("about.brandsIntro")}</p>
              <ul className="space-y-4 list-none pl-0">
                {brandLines.map((key) => (
                  <li key={key} className="pl-4 border-l-2 border-crimson/50 text-charcoal/75 leading-[1.8]">
                    {t(key)}
                  </li>
                ))}
              </ul>
              <p className="text-charcoal/75 leading-[1.85] pt-2">{t("about.closing")}</p>
            </div>
          </div>

          <div className="col-span-12 md:col-span-5 md:col-start-8">
            <Reveal delay={0.12}>
              <figure className="md:sticky md:top-28">
                <div className="relative aspect-[4/5] max-h-[min(85vh,52rem)] mx-auto md:mx-0 overflow-hidden brand-image-fade">
                  <img
                    src={aboutSectionImg}
                    alt={t("img.about.alt")}
                    width={1200}
                    height={1500}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
              </figure>
            </Reveal>
          </div>
        </div>

        <div
          id="mission"
          className="mt-16 md:mt-24 pt-16 md:pt-20 border-t border-border scroll-mt-28 md:scroll-mt-32"
        >
          <div className="grid grid-cols-12 gap-10 md:gap-14 lg:gap-16">
            <div className="col-span-12 md:col-span-6">
              <Reveal>
                <h3 className="font-serif text-xl md:text-2xl font-light text-crimson leading-snug">
                  {t("mission.ourMission")}
                </h3>
              </Reveal>
              <ul className="mt-6 space-y-4 list-disc pl-5 text-charcoal/80 leading-[1.85]">
                {missionItems.map((key) => (
                  <li key={key}>{t(key)}</li>
                ))}
              </ul>
            </div>
            <div className="col-span-12 md:col-span-6">
              <Reveal delay={0.06}>
                <h3 className="font-serif text-xl md:text-2xl font-light text-crimson leading-snug">
                  {t("mission.ourVision")}
                </h3>
              </Reveal>
              <p className="mt-6 text-charcoal/80 leading-[1.85]">{t("mission.visionText")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- why choose us ---------- */

function WhySection() {
  const items: SiteMessageKey[] = ["why.1", "why.2", "why.3", "why.4", "why.5"];
  return (
    <section id="why" className="relative py-24 md:py-40">
      <div className="mx-auto max-w-[1500px] px-5 md:px-12">
        <Reveal>
          <Eyebrow>{t("why.title")}</Eyebrow>
        </Reveal>
        <h2 className="editorial-h mt-6 md:mt-8 text-[clamp(2.25rem,8vw,5rem)] leading-[0.95]">
          <SplitWord text={t("why.title")} />
        </h2>
        <ul className="mt-12 md:mt-16 space-y-0 divide-y divide-border border-y border-border">
          {items.map((key, i) => (
            <Reveal key={key} delay={i * 0.06}>
              <li className="py-6 md:py-8 grid grid-cols-[2.5rem_1fr] md:grid-cols-[3rem_1fr] gap-4 items-baseline">
                <span className="label-eyebrow text-crimson">{String(i + 1).padStart(2, "0")}</span>
                <p className="font-serif text-xl md:text-3xl text-charcoal/85 leading-snug">{t(key)}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- brands ---------- */

type BrandTitleVariant = "default" | "accent" | "italic";
type BrandBlobShape = "a" | "b" | "c";

type BrandProps = {
  nameKey: SiteMessageKey;
  brandLogo: string;
  logoAltKey: SiteMessageKey;
  paragraphKeys: readonly SiteMessageKey[];
  img: string;
  imgAltKey: SiteMessageKey;
  motif: React.ReactNode;
  align: "left" | "right";
  blobShape: BrandBlobShape;
  titleVariant?: BrandTitleVariant;
};

const brandBlobClass: Record<BrandBlobShape, string> = {
  a: "brand-blob--shape-a",
  b: "brand-blob--shape-b",
  c: "brand-blob--shape-c",
};

function BrandBlobImage({
  src,
  alt,
  shape,
}: {
  src: string;
  alt: string;
  shape: BrandBlobShape;
}) {
  return (
    <motion.div
      className={`brand-blob ${brandBlobClass[shape]} brand-image-fade`}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="h-full w-full object-cover scale-[1.14]"
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1.1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        loading="lazy"
        decoding="async"
      />
    </motion.div>
  );
}

const brandTitleClass: Record<BrandTitleVariant, string> = {
  default: "text-charcoal",
  accent: "text-crimson",
  italic: "italic font-light text-charcoal/90",
};

function BrandChapter({
  nameKey,
  brandLogo,
  logoAltKey,
  paragraphKeys,
  img,
  imgAltKey,
  motif,
  align,
  blobShape,
  titleVariant = "default",
}: BrandProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [80, -80]), { stiffness: 60, damping: 20 });
  const imgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const name = t(nameKey);

  return (
    <div ref={ref} className="relative py-24 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1500px] px-5 md:px-12 grid grid-cols-12 gap-6 md:gap-10 items-start">
        <div
          className={`col-span-12 md:col-span-6 order-2 mt-10 md:mt-0 ${
            align === "right" ? "md:col-start-7 md:order-2" : "md:order-none"
          }`}
        >
          <motion.div
            style={{ y: imgY }}
            className={`relative flex w-full justify-center ${align === "right" ? "md:justify-end" : "md:justify-start"}`}
          >
            <BrandBlobImage src={img} alt={t(imgAltKey)} shape={blobShape} />
            <div className="pointer-events-none absolute -top-6 -right-4 md:-top-8 md:-right-8 w-20 h-20 md:w-32 md:h-32 opacity-50 text-charcoal">
              {motif}
            </div>
          </motion.div>
        </div>

        <motion.div
          style={{ y }}
          className={`col-span-12 md:col-span-5 order-1 ${
            align === "right" ? "md:col-start-1 md:order-1" : "md:col-start-8"
          }`}
        >
          <Reveal>
            <img
              src={brandLogo}
              alt={t(logoAltKey)}
              width={320}
              height={320}
              loading="lazy"
              decoding="async"
              className="mb-5 md:mb-6 h-16 md:h-24 w-auto max-w-[min(100%,14rem)] object-contain object-left"
            />
          </Reveal>
          <h3
            className={`editorial-h text-[clamp(2rem,9vw,5.5rem)] leading-[0.95] ${brandTitleClass[titleVariant]}`}
          >
            <SplitWord text={name} />
          </h3>
          <div className="mt-8 space-y-6 max-w-md text-charcoal/75 leading-[1.9]">
            {paragraphKeys.map((key) => (
              <Reveal key={key} delay={0.05}>
                <p>{t(key)}</p>
              </Reveal>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function BrandsSection() {
  return (
    <section id="brands" className="relative border-t border-border">
      <div className="mx-auto max-w-[1500px] px-5 md:px-12 pt-24 md:pt-32 pb-8 md:pb-12">
        <Reveal>
          <Eyebrow>{t("brands.eyebrow")}</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="editorial-h mt-6 md:mt-8 text-[clamp(2.25rem,9vw,7rem)] leading-[0.95] max-w-5xl">
            <SplitWord text={t("brands.sectionTitle")} />
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-10 max-w-3xl text-charcoal/75 leading-[1.85] text-lg md:text-xl">{t("brands.intro")}</p>
        </Reveal>
      </div>

      <BrandChapter
        nameKey="brands.bokchoy.name"
        brandLogo={bokchoyLogo}
        logoAltKey="brands.bokchoy.logoAlt"
        paragraphKeys={["brands.bokchoy.p1", "brands.bokchoy.p2", "brands.bokchoy.p3"]}
        img={bokchoyImg}
        imgAltKey="img.bokchoy.alt"
        blobShape="a"
        align="left"
        motif={
          <svg viewBox="0 0 100 100" fill="none" aria-hidden>
            <motion.path
              d="M20 80 Q30 40 50 50 T80 20"
              stroke="currentColor"
              strokeWidth="0.6"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5 }}
            />
            <motion.path
              d="M30 85 Q40 55 60 60 T85 30"
              stroke="currentColor"
              strokeWidth="0.6"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, delay: 0.3 }}
            />
          </svg>
        }
      />

      <BrandChapter
        nameKey="brands.swooshi.name"
        brandLogo={swooshiLogo}
        logoAltKey="brands.swooshi.logoAlt"
        paragraphKeys={["brands.swooshi.p1", "brands.swooshi.p2", "brands.swooshi.p3"]}
        img={swooshiImg}
        imgAltKey="img.swooshi.alt"
        blobShape="b"
        align="right"
        titleVariant="accent"
        motif={
          <svg viewBox="0 0 100 100" fill="none" aria-hidden>
            <motion.path
              d="M50 20 C20 20 20 80 50 80 C75 80 80 50 65 40"
              stroke="currentColor"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
          </svg>
        }
      />

      <BrandChapter
        nameKey="brands.lilbuns.name"
        brandLogo={lilbunsLogo}
        logoAltKey="brands.lilbuns.logoAlt"
        paragraphKeys={["brands.lilbuns.p1", "brands.lilbuns.p2", "brands.lilbuns.p3"]}
        img={lilbunsImg}
        imgAltKey="img.lilbuns.alt"
        blobShape="c"
        align="left"
        titleVariant="italic"
        motif={
          <svg viewBox="0 0 100 100" fill="none" aria-hidden>
            <motion.circle
              cx="35"
              cy="50"
              r="20"
              stroke="currentColor"
              strokeWidth="0.7"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
            />
            <motion.circle
              cx="65"
              cy="50"
              r="20"
              stroke="currentColor"
              strokeWidth="0.7"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.2 }}
            />
            <motion.circle
              cx="50"
              cy="35"
              r="20"
              stroke="currentColor"
              strokeWidth="0.7"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.4 }}
            />
          </svg>
        }
      />
    </section>
  );
}

/* ---------- contact ---------- */

function ContactSection() {
  const year = new Date().getFullYear();
  return (
    <section id="contact" className="relative pt-28 md:pt-40 pb-12 md:pb-16 border-t border-border">
      <div className="mx-auto max-w-[1500px] px-5 md:px-12">
        <Reveal>
          <Eyebrow>{t("contact.eyebrow")}</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="editorial-h mt-6 md:mt-8 text-[clamp(2.5rem,12vw,9rem)] leading-[0.85]">
            <SplitWord text={t("contact.title")} />
          </h2>
        </Reveal>

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 border-t border-border pt-12 md:pt-16">
          <div>
            <Reveal>
              <p className="font-serif text-2xl md:text-3xl text-charcoal">{t("contact.company")}</p>
              <p className="mt-4 text-charcoal/75 text-lg">{t("contact.location")}</p>
            </Reveal>
          </div>
          <div>
            <Reveal delay={0.1}>
              <p className="text-charcoal/80 leading-[1.85] mb-6">{t("contact.inquiries")}</p>
              <dl className="space-y-4 text-charcoal/85">
                <div>
                  <dt className="label-eyebrow text-charcoal/55">{t("contact.emailLabel")}</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${t("contact.emailValue")}`} className="font-serif text-xl hover:text-crimson transition-colors break-all">
                      {t("contact.emailValue")}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="label-eyebrow text-charcoal/55">{t("contact.phoneLabel")}</dt>
                  <dd className="mt-1">
                    <a href={`tel:${t("contact.phoneValue").replace(/\s/g, "")}`} className="font-serif text-xl hover:text-crimson transition-colors">
                      {t("contact.phoneValue")}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="label-eyebrow text-charcoal/55">{t("contact.addressLabel")}</dt>
                  <dd className="mt-1 font-serif text-xl leading-snug">{t("contact.addressValue")}</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 md:mt-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8 border-t border-border pt-8">
          <p className="font-serif italic text-lg md:text-xl text-charcoal/70">{t("footer.tagline")}</p>
          <p className="label-eyebrow text-charcoal/50">{t("footer.copyright", { year })}</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- root ---------- */

export default function Site() {
  return (
    <div className="grain min-h-screen bg-ivory text-charcoal antialiased overflow-x-hidden">
      <Nav />
      <main>
        <HomeSection />
        <BrandsSection />
        <AboutSection />
        <WhySection />
        <ContactSection />
      </main>
    </div>
  );
}
