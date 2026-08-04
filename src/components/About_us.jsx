import React, { useState, useEffect, useRef } from "react";
import {
  HardDrive,
  Laptop,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Star,
  Cpu,
  ArrowRight,
  Menu,
  X,
  Home,
  ChevronRight,
  Target,
  Eye,
  Lock,
  Zap,
  Award,
  Users,
  MessageCircle,
  Quote,
} from "lucide-react";

/* ---------------------------------------------------------
   Swetayan Technologies — About Us
   Shares the same design tokens, motion language and brand
   mark as the home page. In a real project, Logo / TopBar /
   Header / Footer / Reveal / Img below should live in shared
   component files and be imported into both pages instead of
   duplicated — see the note at the end of this response.
--------------------------------------------------------- */

const FONT_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
  .font-display { font-family: 'Space Grotesk', sans-serif; }
  .font-body { font-family: 'Inter', sans-serif; }
  .font-mono { font-family: 'IBM Plex Mono', monospace; }

  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
  .animate-blink { animation: blink 1.6s ease-in-out infinite; }

  @keyframes float-y { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
  .animate-float { animation: float-y 4.5s ease-in-out infinite; }
  .animate-float-slow { animation: float-y 6.5s ease-in-out infinite; animation-delay: 0.6s; }

  @keyframes kenburns {
    0% { transform: scale(1) translate(0,0); }
    100% { transform: scale(1.12) translate(-1%, -1%); }
  }
  .animate-kenburns { animation: kenburns 14s ease-in-out infinite alternate; }

  @keyframes glow-pulse { 0%, 100% { opacity: 0.35; } 50% { opacity: 0.7; } }
  .animate-glow { animation: glow-pulse 3.5s ease-in-out infinite; }

  @keyframes ring-pulse {
    0% { box-shadow: 0 0 0 0 rgba(249,115,22,0.55); }
    100% { box-shadow: 0 0 0 16px rgba(249,115,22,0); }
  }
  .animate-ring { animation: ring-pulse 2s ease-out infinite; }

  .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal-in { opacity: 1; transform: translateY(0); }
`;

/* ---------- utility hooks ---------- */

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`reveal ${inView ? "reveal-in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function useCountUp(target, inView, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
      else setVal(target);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return val;
}

function Img({ src, alt, className }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`${className} bg-gradient-to-br from-neutral-800 to-neutral-950 flex items-center justify-center`}>
        <HardDrive className="w-10 h-10 text-neutral-600" />
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} loading="lazy" />;
}

/* ---------- shared chrome (Logo / TopBar / Header / Footer / Floating) ---------- */

function Logo({ dark }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative w-9 h-9 shrink-0">
        <svg viewBox="0 0 40 40" className="w-9 h-9">
          <circle cx="20" cy="20" r="17" fill="none" stroke="#f97316" strokeWidth="2.5" strokeDasharray="70 35" strokeLinecap="round" transform="rotate(-45 20 20)" />
          <circle cx="20" cy="20" r="17" fill="none" stroke={dark ? "#0a0a0a" : "#fafaf9"} strokeWidth="2.5" strokeDasharray="70 35" strokeLinecap="round" transform="rotate(135 20 20)" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display font-extrabold text-sm text-orange-500">ST</span>
        </div>
      </div>
      <div className="leading-none">
        <div className={`font-display font-bold tracking-tight text-lg ${dark ? "text-neutral-900" : "text-white"}`}>
          SWETAYAN <span className="text-orange-500">TECHNOLOGIES</span>
        </div>
        <div className={`font-mono text-[10px] tracking-[0.2em] mt-0.5 ${dark ? "text-neutral-500" : "text-neutral-400"}`}>
          DATA RECOVERY &amp; LAPTOP REPAIR
        </div>
      </div>
    </div>
  );
}





function FloatingContact() {
  return (
    <a
      href="tel:+919876543210"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-orange-500 hover:bg-orange-400 text-neutral-950 flex items-center justify-center shadow-2xl animate-ring transition-colors"
      aria-label="Call Swetayan Technologies"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}

/* ---------- breadcrumb ---------- */

function Breadcrumb({ trail, title, subtitle }) {
  return (
    <section className="relative bg-neutral-950 text-white overflow-hidden">
      <Img
        src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=70&auto=format&fit=crop"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/95 to-neutral-950/80" />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="max-w-7xl mx-auto px-5 py-14 md:py-16 relative">
        <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-tight">{title}</h1>
        {subtitle && <p className="font-body text-neutral-400 mt-2 max-w-xl">{subtitle}</p>}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-xs text-neutral-400 mt-5">
          {trail.map((item, i) => (
            <span key={item.label} className="flex items-center gap-2">
              {i === 0 ? (
                <a href={item.href} className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                  <Home className="w-3.5 h-3.5" /> {item.label}
                </a>
              ) : i === trail.length - 1 ? (
                <span className="text-orange-400">{item.label}</span>
              ) : (
                <a href={item.href} className="hover:text-orange-400 transition-colors">
                  {item.label}
                </a>
              )}
              {i < trail.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}

/* ---------- page sections ---------- */

function OurStory() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-2 gap-14 items-center">
        <Reveal>
          <div className="relative">
            <Img
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80&auto=format&fit=crop"
              alt="Technician inspecting a circuit board in the lab"
              className="w-full h-[420px] object-cover rounded-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-2xl px-5 py-4 hidden sm:flex items-center gap-3 animate-float-slow">
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div className="leading-tight">
                <p className="font-display font-bold text-sm text-neutral-900">Est. 2010</p>
                <p className="font-mono text-[10px] text-neutral-500">15+ years in the field</p>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <span className="font-mono text-xs tracking-[0.2em] text-orange-600">OUR STORY</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 mt-3 tracking-tight leading-tight">
            Started on a workbench, built on trust.
          </h2>
          <div className="font-body text-neutral-600 mt-5 space-y-4 leading-relaxed">
            <p>
              Swetayan Technologies began as a single repair bench fixing laptops for
              neighbourhood shops and students. The first hard drive recovery came from
              a customer who'd lost a decade of family photos — and once we brought
              them back, word travelled faster than any advertisement could.
            </p>
            <p>
              Today we run a dedicated data recovery lab alongside a full laptop repair
              service, but the standard hasn't changed: diagnose honestly, quote fairly,
              and never treat a customer's data as just another job ticket.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-8">
            <a href="#contact" className="bg-orange-500 hover:bg-orange-400 hover:scale-105 text-neutral-950 font-body font-semibold px-6 py-3 rounded-md transition-all flex items-center gap-2">
              Work With Us <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MissionVision() {
  return (
    <section className="bg-neutral-50 py-20">
      <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-2 gap-6">
        <Reveal>
          <div className="bg-white border border-neutral-200 rounded-xl p-8 h-full">
            <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center mb-5">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-display font-bold text-xl text-neutral-900">Our Mission</h3>
            <p className="font-body text-neutral-600 mt-3 leading-relaxed">
              To give every customer their data and their devices back — recovered
              honestly, repaired properly, and delivered without unnecessary delay
              or unnecessary cost.
            </p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="bg-neutral-950 text-white rounded-xl p-8 h-full">
            <div className="w-12 h-12 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center mb-5">
              <Eye className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="font-display font-bold text-xl">Our Vision</h3>
            <p className="font-body text-neutral-400 mt-3 leading-relaxed">
              To be the lab people trust first when something they can't afford to
              lose stops working — known for precision, transparency, and treating
              every drive like it holds someone's memories, because it usually does.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StatsStrip() {
  const [ref, inView] = useInView(0.4);
  const stats = [
    { value: 15, suffix: "+", label: "Years in operation" },
    { value: 12400, suffix: "+", label: "Drives recovered" },
    { value: 9800, suffix: "+", label: "Laptops repaired" },
    { value: 96, suffix: "%", label: "Recovery success rate" },
  ];
  return (
    <section className="bg-neutral-950 py-14">
      <div ref={ref} className="max-w-7xl mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => {
          const n = useCountUp(s.value, inView);
          return (
            <div key={s.label} className="text-center">
              <p className="font-display font-bold text-3xl sm:text-4xl text-orange-500 font-mono">
                {n.toLocaleString()}
                {s.suffix}
              </p>
              <p className="font-body text-sm text-neutral-400 mt-2">{s.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Values() {
  const values = [
    { icon: Lock, title: "Confidentiality", desc: "Your files are never viewed, copied, or shared beyond what recovery requires." },
    { icon: CheckCircle2, title: "Honesty", desc: "If a drive isn't recoverable, we tell you upfront — not after you've paid." },
    { icon: Zap, title: "Speed", desc: "Most diagnostics complete within 24 hours, because waiting makes it worse." },
    { icon: ShieldCheck, title: "Precision", desc: "Chip-level repair and clean-room-standard handling, every single time." },
  ];
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-5">
        <Reveal>
          <div className="max-w-2xl mb-14">
            <span className="font-mono text-xs tracking-[0.2em] text-orange-600">WHAT DRIVES US</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 mt-3 tracking-tight">
              The values behind every job ticket.
            </h2>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 100}>
              <div className="group border border-neutral-200 hover:border-orange-300 rounded-xl p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <v.icon className="w-6 h-6 text-orange-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-display font-semibold text-base text-neutral-900">{v.title}</h3>
                <p className="font-body text-sm text-neutral-500 mt-2 leading-relaxed">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  const events = [
    { year: "2010", title: "The first bench", desc: "Opened as a single-technician laptop repair counter." },
    { year: "2014", title: "Data recovery lab", desc: "Built a dedicated clean-room-standard recovery bench for HDD & SSD cases." },
    { year: "2018", title: "RAID & NAS capability", desc: "Added multi-drive array reconstruction for small business and studio clients." },
    { year: "2023", title: "Full-service center", desc: "Expanded into the two-lab model operating today — recovery and repair, under one roof." },
  ];
  return (
    <section className="bg-neutral-50 py-20">
      <div className="max-w-7xl mx-auto px-5">
        <Reveal>
          <div className="max-w-2xl mb-14">
            <span className="font-mono text-xs tracking-[0.2em] text-orange-600">OUR JOURNEY</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 mt-3 tracking-tight">
              Milestones along the way.
            </h2>
          </div>
        </Reveal>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-neutral-300 md:-translate-x-1/2" />
          <div className="space-y-10">
            {events.map((e, i) => (
              <Reveal key={e.year} delay={i * 120}>
                <div className={`relative flex md:items-center gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-orange-500 -translate-x-1/2 ring-4 ring-neutral-50 z-10" />
                  <div className={`pl-12 md:pl-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <span className="font-mono text-xs text-orange-600">{e.year}</span>
                    <h3 className="font-display font-bold text-lg text-neutral-900 mt-1">{e.title}</h3>
                    <p className="font-body text-sm text-neutral-500 mt-1.5 leading-relaxed">{e.desc}</p>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Team() {
  const team = [
    { name: "Rohan Desai", role: "Founder & Lead Recovery Engineer", img: "https://i.pravatar.cc/200?img=13" },
    { name: "Meera Kulkarni", role: "Chip-Level Repair Specialist", img: "https://i.pravatar.cc/200?img=45" },
    { name: "Sanjay Iyer", role: "RAID & NAS Recovery Lead", img: "https://i.pravatar.cc/200?img=53" },
    { name: "Anjali Rao", role: "Customer Diagnostics Manager", img: "https://i.pravatar.cc/200?img=44" },
  ];
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-5">
        <Reveal>
          <div className="max-w-2xl mb-14">
            <span className="font-mono text-xs tracking-[0.2em] text-orange-600">THE TEAM</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 mt-3 tracking-tight">
              The hands behind the lab.
            </h2>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 100}>
              <div className="group text-center">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4">
                  <Img src={m.img} alt={m.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="font-display font-semibold text-base text-neutral-900">{m.name}</h3>
                <p className="font-body text-xs text-neutral-500 mt-1">{m.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="bg-orange-500 py-14 relative overflow-hidden">
      <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-2xl animate-glow" />
      <Reveal>
        <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-6 relative">
          <div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-neutral-950 tracking-tight">
              Got a device that needs us?
            </h3>
            <p className="font-body text-neutral-900/80 mt-2">
              Free diagnosis, honest quote, and a team that's done this for 15 years.
            </p>
          </div>
          <a href="#contact" className="bg-neutral-950 hover:bg-neutral-800 hover:scale-105 text-white font-body font-semibold px-6 py-3 rounded-md whitespace-nowrap transition-all flex items-center gap-2">
            Get Free Diagnosis <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="font-body bg-white min-h-screen">
      <style>{FONT_STYLES}</style>
    
      <Breadcrumb
        title="About Swetayan Technologies"
        subtitle="Fifteen years of bringing back data people thought was gone for good — and the laptops it lived on."
        trail={[
          { label: "Home", href: "#" },
          { label: "About Us", href: "#about" },
        ]}
      />
      <OurStory />
      <MissionVision />
      <StatsStrip />
      <Values />
      <Timeline />
      <Team />
      <CTABanner />
    
      <FloatingContact />
    </div>
  );
}