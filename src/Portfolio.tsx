import { useState, useEffect, useRef, ReactNode } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
interface FadeInProps {
  children: ReactNode;
  delay?: number;
}

interface Project {
  title: string;
  lang: string;
  desc: string;
  highlights: (string | JSX.Element)[];
}

interface Award {
  name: string;
  detail: string;
  date: string;
}

interface Role {
  title: string;
  period: string;
  org: string;
  desc: string;
}

// ── Scroll-reveal wrapper ──────────────────────────────────────────────────
function FadeIn({ children, delay = 0 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { setVisible(entry.isIntersecting); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────
const projects: Project[] = [
  {
    title: "Image Convolution Engine",
    lang: "C++20",
    desc: "High-performance image convolution engine implementing Gaussian blur with configurable kernel generation, padding strategies, and float-precision processing in a modular pipeline.",
    highlights: [
      <>Achieved a <b>5.37x speedup (81% runtime reduction)</b> by refactoring direct 2D Gaussian convolution <b>(O(N·K²))</b> into a separable 1D implementation <b>(O(N·K))</b> benchmarked on 612×460 RGB images with 11×11 kernels.</>,
      <>Validated <b>numerical correctness</b> against the direct 2D method using <b>mean squared error (4.6e-15)</b> and <b>maximum absolute error (6.5e-7)</b>, confirming floating-point equivalence.</>,
      <>Built a <b>benchmarking framework</b> (20+ runs, mean/std computation) that outputs structured <b>CSV performance reports</b> for quantitative scalability analysis.</>,
    ],
  },
  {
    title: "Algorithmic Trading Bot Trainer",
    lang: "Qt / C++",
    desc: "A trading simulator that allows users to test different trading strategies in a simulated market environment, built collaboratively in a team of three.",
    highlights: [
      <>Collaborated and combined code in a team of three in <b>Object-Oriented</b> fashion to create <b>automated trading algorithms</b>, interactive price and trading history charts, and <b>real-time performance tracking</b>.</>,
      <>Applied <b>polymorphism</b> across core trading, charting, and data-handling classes to standardise behaviour and prevent type-specific failures, improving <b>system hierarchy and data conversion stability</b>.</>,
    ],
  },
];

const roles: Role[] = [
  {
    title: "Sponsorships Officer",
    period: "Feb 2025 – Present",
    org: "Adelaide Competitive Programming Club (ACPC)",
    desc: "Constructed structured outreach pipelines and maintained corporate correspondence to acquire sponsorships from industry partners. Personally networked with university contacts to grow company connections.",
  },
  {
    title: "Avionics Team Member",
    period: "Apr 2025 – Present",
    org: "Adept Rocketry Division",
    desc: "Engineered rocket avionics from scratch — integrating IMU and barometric pressure sensors, implementing onboard data logging at 30 Hz, performing sensor fusion testing, and hardware-in-loop validation. Refined 3D flight-data visualisation scripts for multi-axis coordinate plots.",
  },
  {
    title: "Chassis Lighting System — PCB Designer",
    period: "Jul 2025 – Present",
    org: "Adelaide Rover Team",
    desc: "Designed schematics and industry-standard PCBs in Altium Designer. Implemented reverse-polarity protection and maximum stand-off voltage considerations to minimise electrical failure risk. Worked closely across multiple sub-teams in a coordinated professional environment.",
  },
];

const awards: Award[] = [
  {
    name: "Susquehanna Algothon",
    detail:
      "Built a Python-based trading algorithm designed to maximise profits in a simulated market environment. Applied Sharpe-optimised reward functions to improve risk-reduction decision-making. Reduced portfolio volatility by ~10–20% compared to baseline strategies in simulation testing.",
    date: "Jul 2025",
  },
  {
    name: "SQUAD Datathon — 4th Place",
    detail:
      "18-hour university-wide datathon as part of a three-member team. Implemented a Random Forest classifier (200 trees) achieving 80% accuracy — a 4% improvement over base models and 99% of the industry benchmark. Improved learning efficiency ~15% through feature selection and noise reduction.",
    date: "Apr 2025",
  },
  {
    name: "ACPC Competitive Programming",
    detail:
      "Participated in AUCPL, AllUni, and the South Pacific ICPC Preliminary Contest. First-solved a problem in AllUni against 300+ competitors across Australia and New Zealand.",
    date: "Feb 2025 – Present",
  },
];

// ── Styles (shared tokens) ─────────────────────────────────────────────────
const C = {
  bg: "#0a0a0a",
  border: "#222",
  accent: "#e8ff47",
  accent2: "#47b3ff",
  text: "#ffffff",
  muted: "#666",
};

const sectionLabel: React.CSSProperties = {
  fontSize: 10,
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  color: C.accent,
  marginBottom: 32,
  display: "flex",
  alignItems: "center",
  gap: 16,
};

const divider: React.CSSProperties = {
  flex: 1,
  height: 1,
  background: C.border,
};

// ── Main component ─────────────────────────────────────────────────────────
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");

  // Track which section is in view for potential future nav highlighting
  useEffect(() => {
    const sections = document.querySelectorAll("section[data-id]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection((e.target as HTMLElement).dataset.id ?? "");
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const containerStyle: React.CSSProperties = {
    background: C.bg,
    color: C.text,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 15,
    lineHeight: 1.7,
    minHeight: "100vh",
    paddingBottom: 100,
  };

  const mainStyle: React.CSSProperties = {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "60px 48px 0",
  };

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Syne:wght@400;700;800&family=JetBrains+Mono:wght@300;400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0a; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #333; }
      `}</style>
      <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%230a0a0a'/%3E%3Ctext x='50' y='78' font-family='Georgia,serif' font-size='80' font-weight='900' fill='%23e8ff47' text-anchor='middle'%3ES%3C/text%3E%3C/svg%3E" />

      <div style={containerStyle}>
        <main style={mainStyle}>

          {/* ── HERO ── */}
          <section data-id="hero" style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: 48, marginBottom: 72 }}>
            <FadeIn>
              <p style={{ fontSize: 11, letterSpacing: "0.2em", color: C.accent, textTransform: "uppercase", marginBottom: 20 }}>
                Portfolio · 2026
              </p>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(52px, 11vw, 96px)",
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: -1,
                color: "#fff",
                marginBottom: 24,
              }}>
                Shashwat<br />
                <span style={{ color: C.accent }}>Singh.</span>
              </h1>
              <p style={{ color: C.muted, maxWidth: 600, fontSize: 14, marginBottom: 32 }}>
                Electrical & Electronic Engineering and Mathematics & Computer Science student @ Adelaide University.
              </p>
            </FadeIn>
          </section>

          {/* ── ABOUT ── */}
          <section data-id="about" style={{ marginBottom: 72 }}>
            <FadeIn>
              <div style={sectionLabel}>About <span style={divider} /></div>
            </FadeIn>
            <FadeIn delay={100}>
              <p style={{ color: C.text, fontSize: 15, lineHeight: 1.9, marginBottom: 16 }}>
                First-year Electrical & Electronic Engineering and Mathematics & Computer Science student at the University of Adelaide with a strong interest in avionics, competitive programming, and applied problem-solving. I enjoy working at the intersection of hardware, software, and data — whether through engineering projects, coding competitions, or group technical collaborations.
              </p>
              <p style={{ color: C.text, fontSize: 15, lineHeight: 1.9 }}>
                Actively focused on algorithmic data structures, competitive programming in state and nation wide programming contests, while simultaneously contributing to avionics engineering projects involving hardware design and embedded software development, currently centred on Adelaide University student manufactured rocket telemetry systems. Always open to opportunities that expand technical depth, practical engineering capability, and collaborative innovation.
              </p>
            </FadeIn>
          </section>

          {/* ── PROJECTS ── */}
          <section data-id="projects" style={{ marginBottom: 72 }}>
            <FadeIn>
              <div style={sectionLabel}>Projects <span style={divider} /></div>
            </FadeIn>
            {projects.map((p, i) => (
              <FadeIn key={p.title} delay={i * 120}>
                <div style={{
                  border: `1px solid ${C.border}`,
                  padding: 28,
                  marginBottom: 16,
                  transition: "border-color 0.2s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "#444")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 14 }}>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 19, fontWeight: 700, color: "#fff" }}>{p.title}</span>
                    <span style={{ fontSize: 10, letterSpacing: "0.15em", color: C.accent2, border: `1px solid ${C.accent2}`, padding: "3px 10px", whiteSpace: "nowrap" }}>{p.lang}</span>
                  </div>
                  <p style={{ color: C.text, fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{p.desc}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {p.highlights.map((h, j) => (
                      <div key={j} style={{ fontSize: 13, color: C.text, paddingLeft: 18, position: "relative", lineHeight: 1.7 }}>
                        <span style={{ position: "absolute", left: 0, color: C.accent }}>→</span>
                        {h}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </section>

          {/* ── COMMUNITY ── */}
          <section data-id="community" style={{ marginBottom: 72 }}>
            <FadeIn>
              <div style={sectionLabel}>Community Involvement <span style={divider} /></div>
            </FadeIn>
            {roles.map((r, i) => (
              <FadeIn key={r.title} delay={i * 100}>
                <div style={{ padding: "22px 0", borderBottom: `1px solid ${C.border}`, ...(i === 0 ? { borderTop: `1px solid ${C.border}` } : {}) }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, flexWrap: "wrap", gap: 4 }}>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "#fff" }}>{r.title}</span>
                    <span style={{ fontSize: 11, color: C.muted }}>{r.period}</span>
                  </div>
                  <div style={{ fontSize: 12, color: C.accent2, letterSpacing: "0.1em", marginBottom: 10 }}>{r.org}</div>
                  <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7 }}>{r.desc}</p>
                </div>
              </FadeIn>
            ))}
          </section>

          {/* ── AWARDS ── */}
          <section data-id="awards" style={{ marginBottom: 72 }}>
            <FadeIn>
              <div style={sectionLabel}>Awards & Achievements <span style={divider} /></div>
            </FadeIn>
            {awards.map((a, i) => (
              <FadeIn key={a.name} delay={i * 100}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: 16,
                  padding: "22px 0",
                  borderBottom: `1px solid ${C.border}`,
                  ...(i === 0 ? { borderTop: `1px solid ${C.border}` } : {}),
                  alignItems: "start",
                }}>
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{a.name}</div>
                    <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6 }}>{a.detail}</div>
                  </div>
                  <div style={{ fontSize: 11, color: C.accent, whiteSpace: "nowrap" }}>{a.date}</div>
                </div>
              </FadeIn>
            ))}
          </section>

          {/* ── SKILLS ── */}
          <section data-id="skills" style={{ marginBottom: 72 }}>
            <FadeIn>
              <div style={sectionLabel}>Skills <span style={divider} /></div>
            </FadeIn>
            <FadeIn delay={80}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: C.border }}>
                {[
                  { label: "Languages", tags: ["C++", "C", "Python", "MATLAB"] },
                  { label: "Technologies", tags: ["STM Cube IDE", "Arduino IDE", "Altium Designer", "Git", "Qt"] },
                ].map((g) => (
                  <div key={g.label} style={{ background: C.bg, padding: 24 }}>
                    <div style={{ fontSize: 10, letterSpacing: "0.2em", color: C.accent, textTransform: "uppercase", marginBottom: 14 }}>{g.label}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {g.tags.map(t => <span key={t} style={{ fontSize: 12, background: "#181818", border: "1px solid #282828", padding: "6px 14px", color: "#fff" }}>{t}</span>)}
                    </div>
                  </div>
                ))}
                <div style={{ background: C.bg, padding: 24, gridColumn: "span 2" }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.2em", color: C.accent, textTransform: "uppercase", marginBottom: 14 }}>Hardware</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {["PCB Design", "IMU Integration", "Sensor Fusion", "Embedded Systems"].map(t => (
                      <span key={t} style={{ fontSize: 12, background: "#181818", border: "1px solid #282828", padding: "6px 14px", color: "#fff" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </section>

          {/* ── CONTACT ── */}
          <section data-id="contact" style={{ marginBottom: 72 }}>
            <FadeIn>
              <div style={sectionLabel}>Contact <span style={divider} /></div>
            </FadeIn>
            <FadeIn delay={80}>
              <p style={{ color: C.muted, fontSize: 14, marginBottom: 20 }}>
                Currently based in Adelaide, Australia. Open to internships, research roles, and interesting collaborations.
              </p>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
                <div style={{ fontSize: 14, color: C.muted }}>
                  Email:{" "}
                  <a href="mailto:shashwatsingh5021@gmail.com" style={{ color: C.accent2, textDecoration: "none" }}>
                    shashwatsingh5021@gmail.com
                  </a>
                </div>
                <div style={{ fontSize: 14, color: C.muted }}>
                  LinkedIn:{" "}
                  <a href="https://www.linkedin.com/in/shashwat-singh-6a165a28b/" target="_blank" rel="noreferrer" style={{ color: C.accent2, textDecoration: "none" }}>
                    shashwat-singh
                  </a>
                </div>
              </div>
            </FadeIn>
          </section>

        </main>
      </div>

      {/* ── STICKY BOTTOM NAV ── */}
      <nav style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(10,10,10,0.92)",
        backdropFilter: "blur(12px)",
        borderTop: `1px solid ${C.border}`,
        zIndex: 100,
        display: "flex",
        justifyContent: "center",
        gap: 0,
        padding: "0 24px",
      }}>
        {[
          { label: "LinkedIn", href: "https://www.linkedin.com/in/shashwat-singh-6a165a28b/", external: true },
          { label: "GitHub", href: "https://github.com/ShashwatSingh67", external: true },
          { label: "Resume", href: "Shashwat_Singh_cv.pdf", external: true },
        ].map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "16px 28px",
              color: "#ffffff",
              textDecoration: "none",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              transition: "color 0.2s",
              borderRight: i < 2 ? `1px solid ${C.border}` : "none",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = C.accent)}
            onMouseLeave={e => (e.currentTarget.style.color = "#ffffff")}
          >
            {link.label === "LinkedIn" && "⟶ "}
            {link.label === "GitHub" && "⟶ "}
            {link.label === "Resume" && "⬇ "}
            {link.label}
          </a>
        ))}
      </nav>
    </>
  );
}