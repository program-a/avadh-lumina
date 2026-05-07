import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import heroFood from "@/assets/hero-food.jpg";
import bokchoyImg from "@/assets/bokchoy.jpg";
import swooshiImg from "@/assets/swooshi.jpg";
import lilbunsImg from "@/assets/lilbuns.jpg";
import founderImg from "@/assets/founder.jpg";

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
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
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

/* ---------- nav ---------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["House", "#house"],
    ["Brands", "#brands"],
    ["Vision", "#vision"],
    ["Contact", "#contact"],
  ];
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.4 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
        scrolled ? "py-4 bg-ivory/80 backdrop-blur-md border-b border-border/60" : "py-7"
      }`}
    >
      <div className="mx-auto max-w-[1500px] px-6 md:px-12 flex items-center justify-between">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-serif text-xl tracking-tight">Avadh</span>
          <span className="label-eyebrow text-charcoal/50 hidden sm:inline">— Food & Beverages</span>
        </a>
        <nav className="hidden md:flex items-center gap-10">
          {links.map(([l, h]) => (
            <a key={l} href={h} className="label-eyebrow text-charcoal/70 hover:text-crimson transition-colors">
              {l}
            </a>
          ))}
        </nav>
        <a href="#contact" className="label-eyebrow text-charcoal hover:text-crimson transition-colors">
          Enquire ↗
        </a>
      </div>
    </motion.header>
  );
}

/* ---------- hero ---------- */

function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, 160]);
  const y2 = useTransform(scrollY, [0, 800], [0, -120]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden pt-32 md:pt-40 pb-24">
      {/* floating gradient blobs */}
      <motion.div
        aria-hidden
        className="absolute -top-32 -left-32 w-[40rem] h-[40rem] rounded-full"
        style={{
          background: "radial-gradient(closest-side, oklch(0.92 0.05 60 / 0.6), transparent)",
        }}
        animate={{ x: [0, 40, -20, 0], y: [0, 30, -10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-40 -right-32 w-[34rem] h-[34rem] rounded-full"
        style={{
          background: "radial-gradient(closest-side, oklch(0.88 0.06 30 / 0.45), transparent)",
        }}
        animate={{ x: [0, -30, 15, 0], y: [0, -20, 10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* line art motif */}
      <svg className="absolute right-8 top-32 w-40 h-40 opacity-30" viewBox="0 0 200 200" fill="none">
        <motion.circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, ease: "easeInOut" }} />
        <motion.circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, delay: 0.4 }} />
        <motion.line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="0.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.8 }} />
      </svg>

      <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-7 flex flex-col">
          <Reveal>
            <Eyebrow>Gurgaon · Est. since the love of food</Eyebrow>
          </Reveal>
          <h1 className="editorial-h mt-10 text-[clamp(3rem,9vw,9rem)] text-charcoal">
            <SplitWord text="Crafted by" />
            <br />
            <SplitWord text="Passion." className="italic font-light" delay={0.15} />
            <br />
            <span className="block ml-[12%] md:ml-[28%]">
              <SplitWord text="Inspired by" delay={0.35} />{" "}
              <SplitWord text="Taste." className="text-crimson italic" delay={0.5} />
            </span>
          </h1>
        </div>

        <motion.div
          style={{ y: y1 }}
          className="col-span-12 md:col-span-5 mt-12 md:mt-24 relative"
        >
          <div className="relative aspect-[3/4] overflow-hidden">
            <motion.img
              src={heroFood}
              alt="A single sculpted plate, photographed in soft window light."
              className="w-full h-full object-cover"
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <motion.div
            style={{ y: y2 }}
            className="absolute -left-8 md:-left-16 bottom-10 max-w-[16rem] bg-ivory/90 backdrop-blur-sm p-6 border-l border-crimson/60"
          >
            <p className="font-serif italic text-lg leading-snug">
              "We do not run restaurants. We compose meals."
            </p>
            <p className="label-eyebrow mt-3 text-charcoal/60">— The House of Avadh</p>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="label-eyebrow text-charcoal/50">scroll</span>
        <motion.span
          className="block w-px h-16 bg-charcoal/40 origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

/* ---------- ticker ---------- */

function Ticker() {
  const items = ["Asian Kitchen Bokchoy", "·", "Swooshi", "·", "Lil Buns", "·", "Crafted in Gurgaon", "·"];
  const row = [...items, ...items, ...items];
  return (
    <div className="border-y border-border py-5 overflow-hidden bg-cream/50">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {row.map((t, i) => (
          <span key={i} className="font-serif text-2xl md:text-3xl italic text-charcoal/70">
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ---------- about / house ---------- */

function House() {
  const timeline = [
    ["—", "An evening in Gurgaon. A single recipe written on tracing paper."],
    ["i.", "Avadh is born — a quiet love letter to flavour."],
    ["ii.", "Bokchoy opens. A study in Asian restraint."],
    ["iii.", "Swooshi follows — Japan, drawn in a single brushstroke."],
    ["iv.", "Lil Buns. Joy, made small, made warm."],
    ["v.", "Today — three brands, one house, one obsession."],
  ];
  return (
    <section id="house" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12 grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-5 md:sticky md:top-32 self-start">
          <Reveal><Eyebrow>The House</Eyebrow></Reveal>
          <h2 className="editorial-h mt-8 text-[clamp(2.5rem,6vw,5.5rem)]">
            <SplitWord text="A quiet" />
            <br />
            <SplitWord text="culinary" className="italic" delay={0.1} />
            <br />
            <SplitWord text="atelier." delay={0.2} />
          </h2>
          <Reveal delay={0.3}>
            <p className="mt-10 max-w-md text-charcoal/70 leading-[1.8]">
              Avadh Food &amp; Beverages is a family of independent kitchens, each with its
              own grammar, each composed with the same patient hand. We obsess over a
              single ingredient the way a poet obsesses over a single syllable.
            </p>
          </Reveal>
        </div>

        <div className="col-span-12 md:col-span-7 md:col-start-7">
          <div className="relative aspect-[4/5] overflow-hidden mb-16">
            <motion.img
              src={founderImg}
              alt="Founder portrait in soft window light."
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
              loading="lazy"
            />
          </div>

          <ol className="space-y-10 border-l border-border pl-8 ml-2">
            {timeline.map(([n, t], i) => (
              <Reveal key={i} delay={i * 0.05}>
                <li className="grid grid-cols-[3rem_1fr] gap-6 items-baseline">
                  <span className="label-eyebrow text-crimson">{n}</span>
                  <p className="font-serif text-xl md:text-2xl leading-snug text-charcoal/85">{t}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------- brands ---------- */

type BrandProps = {
  index: string;
  name: string;
  tagline: string;
  copy: string;
  img: string;
  motif: React.ReactNode;
  align: "left" | "right";
  accent?: boolean;
  rounded?: boolean;
};

function BrandChapter({ index, name, tagline, copy, img, motif, align, accent, rounded }: BrandProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [80, -80]), { stiffness: 60, damping: 20 });
  const imgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <div ref={ref} className="relative py-32 md:py-48 overflow-hidden">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12 grid grid-cols-12 gap-6 items-center">
        <div
          className={`col-span-12 md:col-span-6 ${
            align === "right" ? "md:col-start-7 md:order-2" : ""
          }`}
        >
          <motion.div style={{ y: imgY }} className="relative">
            <div className={`relative aspect-[4/5] overflow-hidden ${rounded ? "rounded-[2rem]" : ""}`}>
              <motion.img
                src={img}
                alt={name}
                className="w-full h-full object-cover"
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
                loading="lazy"
              />
            </div>
            <div className="absolute -top-8 -right-8 w-32 h-32 opacity-50 text-charcoal">{motif}</div>
          </motion.div>
        </div>

        <motion.div
          style={{ y }}
          className={`col-span-12 md:col-span-5 ${
            align === "right" ? "md:col-start-1 md:order-1" : "md:col-start-8"
          }`}
        >
          <Reveal>
            <Eyebrow>{`Brand ${index} · House of Avadh`}</Eyebrow>
          </Reveal>
          <h3 className={`editorial-h mt-6 text-[clamp(3rem,8vw,7rem)] ${accent ? "text-crimson" : ""}`}>
            <SplitWord text={name} />
          </h3>
          <Reveal delay={0.2}>
            <p className="font-serif italic text-2xl md:text-3xl mt-6 text-charcoal/80 max-w-md">
              {tagline}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-md text-charcoal/70 leading-[1.9]">{copy}</p>
          </Reveal>
          <Reveal delay={0.4}>
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 mt-10 label-eyebrow border-b border-charcoal/40 pb-1 hover:text-crimson hover:border-crimson transition-colors"
            >
              Discover the kitchen
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
        </motion.div>
      </div>
    </div>
  );
}

function Brands() {
  return (
    <section id="brands" className="relative">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12 pt-32 pb-12">
        <Reveal><Eyebrow>Three Kitchens</Eyebrow></Reveal>
        <Reveal delay={0.1}>
          <h2 className="editorial-h mt-8 text-[clamp(3rem,9vw,8rem)] max-w-5xl">
            One <span className="italic">house.</span>
            <br />
            Three <span className="text-crimson italic">grammars.</span>
          </h2>
        </Reveal>
      </div>

      <BrandChapter
        index="i"
        name="Bokchoy"
        tagline="An Asian kitchen, written in restraint."
        copy="Bok Choy is what happens when you treat an Asian kitchen like a tea ceremony. Wok smoke, rice steam, the soft thud of a cleaver — composed into a single, quiet meal."
        img={bokchoyImg}
        align="left"
        motif={
          <svg viewBox="0 0 100 100" fill="none">
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
        index="ii"
        name="Swooshi"
        tagline="Japan, drawn in a single brushstroke."
        copy="A modern enso. Sushi reduced, refined, then released — a kitchen where every plate is a study in line, edge and pause."
        img={swooshiImg}
        align="right"
        accent
        motif={
          <svg viewBox="0 0 100 100" fill="none">
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
        index="iii"
        name="Lil Buns"
        tagline="Joy, made small. Made warm."
        copy="Pillowy, pleated, perfect. Lil Buns is the most playful room in the house — soft on its surface, exacting underneath."
        img={lilbunsImg}
        align="left"
        rounded
        motif={
          <svg viewBox="0 0 100 100" fill="none">
            <motion.circle cx="35" cy="50" r="20" stroke="currentColor" strokeWidth="0.7"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2 }} />
            <motion.circle cx="65" cy="50" r="20" stroke="currentColor" strokeWidth="0.7"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, delay: 0.2 }} />
            <motion.circle cx="50" cy="35" r="20" stroke="currentColor" strokeWidth="0.7"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, delay: 0.4 }} />
          </svg>
        }
      />
    </section>
  );
}

/* ---------- mission/vision ---------- */

function Vision() {
  return (
    <section id="vision" className="relative py-40 md:py-56 bg-cream/60 border-y border-border">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <Reveal><Eyebrow className="block mx-auto text-center">Mission · Vision</Eyebrow></Reveal>

        <div className="mt-20 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-10 md:col-start-2">
            <Reveal delay={0.1}>
              <p className="editorial-h text-[clamp(2rem,5vw,4.5rem)] text-balance">
                We believe a meal is a quiet conversation between
                <span className="text-crimson italic"> the hand that grew it </span>
                and the hand that <span className="italic">received it</span>.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-32 grid grid-cols-12 gap-12">
          {[
            ["Mission", "To compose food the way one composes music — with patience, with intention, with one ingredient at a time."],
            ["Vision", "A house of small, perfect kitchens — each a quiet rebellion against the loud, the fast and the forgettable."],
          ].map(([title, body], i) => (
            <div
              key={title}
              className={`col-span-12 md:col-span-5 ${i === 1 ? "md:col-start-8 md:mt-32" : "md:col-start-2"}`}
            >
              <Reveal delay={i * 0.15}>
                <span className="label-eyebrow text-crimson">{title}</span>
                <p className="font-serif text-2xl md:text-3xl leading-snug mt-6 text-charcoal/85">
                  {body}
                </p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- why us ---------- */

function Why() {
  const items = [
    ["01", "A single hand", "Every kitchen is led by the founder, every recipe passes through one palate."],
    ["02", "Slow ingredients", "We source like collectors — a single farmer, a single season, a single jar."],
    ["03", "Quiet rooms", "Our spaces are designed to disappear. The food is the only ornament."],
    ["04", "No shortcuts", "We have never used a microwave. We never will."],
  ];
  return (
    <section className="relative py-32 md:py-48">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <div className="grid grid-cols-12 gap-6">
          <Reveal>
            <div className="col-span-12 md:col-span-4 md:sticky md:top-32 self-start">
              <Eyebrow>Why Avadh</Eyebrow>
              <h2 className="editorial-h mt-8 text-[clamp(2.5rem,6vw,5rem)]">
                Four <span className="italic">quiet</span> obsessions.
              </h2>
            </div>
          </Reveal>
          <div className="col-span-12 md:col-span-7 md:col-start-6 space-y-2">
            {items.map(([n, t, b], i) => (
              <Reveal key={n} delay={i * 0.08}>
                <article className="group grid grid-cols-[4rem_1fr] gap-8 py-10 border-t border-border last:border-b transition-colors hover:bg-cream/40 px-2 -mx-2">
                  <span className="label-eyebrow text-crimson pt-2">{n}</span>
                  <div>
                    <h3 className="font-serif text-3xl md:text-4xl group-hover:translate-x-2 transition-transform duration-700">
                      {t}
                    </h3>
                    <p className="mt-4 text-charcoal/65 max-w-lg leading-[1.8]">{b}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- contact ---------- */

function Contact() {
  return (
    <section id="contact" className="relative pt-40 pb-16">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <Reveal><Eyebrow>Contact · Studio</Eyebrow></Reveal>
        <Reveal delay={0.1}>
          <h2 className="editorial-h mt-8 text-[clamp(3.5rem,12vw,12rem)] leading-[0.85]">
            Let us
            <br />
            <span className="italic text-crimson">cook</span> for you.
          </h2>
        </Reveal>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-border pt-16">
          {[
            ["Studio", "Sector 53, Golf Course Road\nGurgaon, India 122003"],
            ["Reservations", "reserve@avadhfb.com\n+91 124 000 0000"],
            ["Press & Partnerships", "studio@avadhfb.com"],
          ].map(([t, b], i) => (
            <div key={t}>
              <Reveal delay={i * 0.1}>
                <span className="label-eyebrow text-charcoal/60">{t}</span>
                <p className="font-serif text-2xl mt-4 whitespace-pre-line leading-snug">{b}</p>
              </Reveal>
            </div>
          ))}
        </div>

        <div className="mt-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-t border-border pt-8">
          <p className="font-serif italic text-xl text-charcoal/70">
            Avadh — composed in Gurgaon, served quietly.
          </p>
          <p className="label-eyebrow text-charcoal/50">© {new Date().getFullYear()} Avadh F&B</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- root ---------- */

export default function Site() {
  return (
    <div className="grain min-h-screen bg-ivory text-charcoal antialiased">
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <House />
        <Brands />
        <Vision />
        <Why />
        <Contact />
      </main>
    </div>
  );
}
