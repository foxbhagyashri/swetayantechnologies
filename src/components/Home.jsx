import React, { useState, useEffect, useRef } from "react";
import {
  HardDrive,
  Laptop,
  Wrench,
  Database,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Star,
  Cpu,
  AlertTriangle,
  ArrowRight,
  Menu,
  X,
  Search,
  FileSearch,
  PackageCheck,
  Send,
  Quote,
  MessageCircle,
  Sparkles,
} from "lucide-react";

import SiteHeader from "./Header";
import Footer from "./Footer";

/* ---------------------------------------------------------
   Swetayan Technologies — Data Recovery & Laptop Repair
   Signature element: the "Recovery Scanner" — a diagnostic
   sweep across a disk platter in the hero, layered over real
   lab photography, echoing the two halves of the brand mark.
--------------------------------------------------------- */

const FONT_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
  .font-display { font-family: 'Arial'; }
  .font-body { font-family: 'Arial'; }
  .font-mono { font-family: 'Arial'; }

  @keyframes sweep {
    0% { transform: translateY(-100%); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(480%); opacity: 0; }
  }
  .animate-sweep { animation: sweep 2.4s ease-in-out infinite; }

  @keyframes platter-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-platter { animation: platter-spin 3s linear infinite; }

  @keyframes fillbar {
    0% { width: 8%; }
    50% { width: 78%; }
    100% { width: 8%; }
  }
  .animate-fillbar { animation: fillbar 3.6s ease-in-out infinite; }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.25; }
  }
  .animate-blink { animation: blink 1.6s ease-in-out infinite; }

  @keyframes float-y {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  .animate-float { animation: float-y 4.5s ease-in-out infinite; }
  .animate-float-slow { animation: float-y 6.5s ease-in-out infinite; animation-delay: 0.6s; }

  @keyframes kenburns {
    0% { transform: scale(1) translate(0,0); }
    100% { transform: scale(1.12) translate(-1%, -1%); }
  }
  .animate-kenburns { animation: kenburns 14s ease-in-out infinite alternate; }

  @keyframes pop-in {
    0% { transform: scale(0.6); opacity: 0; }
    70% { transform: scale(1.08); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  .animate-pop { animation: pop-in 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }

  @keyframes ring-pulse {
    0% { box-shadow: 0 0 0 0 rgba(249,115,22,0.55); }
    100% { box-shadow: 0 0 0 16px rgba(249,115,22,0); }
  }
  .animate-ring { animation: ring-pulse 2s ease-out infinite; }

  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  .animate-marquee { animation: marquee 28s linear infinite; }

  @keyframes glow-pulse {
    0%, 100% { opacity: 0.35; }
    50% { opacity: 0.7; }
  }
  .animate-glow { animation: glow-pulse 3.5s ease-in-out infinite; }

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
    <div
      ref={ref}
      className={`reveal ${inView ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
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

/* ---------- brand ---------- */


function RecoveryScanner() {
  return (
    <div className="relative w-full aspect-square">
      <Img
        src="WhatsApp Image 2026-08-04 at 1.32.36 PM.jpeg"
        alt="Open hard drive in the recovery lab"
        className="absolute inset-0 w-full h-full object-cover rounded-3xl animate-kenburns"
      />
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
      <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10" />

      {/* scan sweep overlay */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <div className="absolute left-0 right-0 h-1/4 bg-gradient-to-b from-transparent via-orange-500/20 to-transparent animate-sweep" />
      </div>

      {/* floating readout card */}
      <div className="absolute bottom-5 left-5 right-5 bg-neutral-900/90 backdrop-blur border border-neutral-700 rounded-lg px-4 py-3 font-mono text-[11px] text-neutral-300 shadow-xl animate-float">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-neutral-400">SECTOR SCAN</span>
          <span className="text-orange-400">RECOVERABLE</span>
        </div>
        <div className="h-1.5 rounded-full bg-neutral-800 overflow-hidden">
          <div className="h-full bg-orange-400 animate-fillbar rounded-full" />
        </div>
      </div>

      {/* floating badge */}
      <div className="absolute -top-5 -left-5 hidden sm:flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-2xl animate-float-slow">
        <div className="w-9 h-9 rounded-full bg-orange-400 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>
        <div className="leading-tight">
          <p className="font-display font-bold text-sm text-neutral-900">96% Success</p>
          <p className="font-mono text-[10px] text-neutral-600">recovery rate</p>
        </div>
      </div>
    </div>
  );
}

function StatItem({ value, suffix, label, inView }) {
  const n = useCountUp(value, inView);
  return (
    <div>
      <span className="text-white text-lg sm:text-xl font-semibold font-mono">
        {n.toLocaleString()}
        {suffix}
      </span>
      <span className="block sm:inline sm:ml-1">{label}</span>
    </div>
  );
}

function Hero() {
  const [mounted, setMounted] = useState(false);
  const [statsRef, statsInView] = useInView(0.4);
  useEffect(() => setMounted(true), []);
  return (
    <section className="bg-neutral-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl animate-glow" />
      <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-glow" />
      <div className="max-w-7xl mx-auto px-5 py-16 md:py-24 grid md:grid-cols-2 gap-14 items-center relative">
        <div>
          <div
            className={`inline-flex items-center gap-2 font-mono text-md text-orange-400 border border-orange-400/30 bg-orange-400/10 rounded-full px-3 py-1 mb-6 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
              }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" /> No fix, no fee — on every recovery job
          </div>
          <h1
            className={`font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            Your drive failed.
            <br />
            Your data <span className="text-[#ff8904]">didn't</span>.
          </h1>
          <p
            className={`font-body text-white text-lg mt-6 max-w-md leading-relaxed transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            Crashed hard drives, dead laptops, corrupted RAID arrays — we bring
            them back. Free diagnosis, transparent pricing, and a lab-grade
            process behind every recovery and repair.
          </p>
          <div
            className={`flex flex-wrap gap-3 mt-8 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            <a href="/EnquiryForm" className="bg-orange-400 hover:bg-orange-400 hover:scale-105 text-neutral-950 font-body font-semibold px-6 py-3 rounded-md transition-all flex items-center gap-2">
              Start Free Diagnosis <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#services" className="border border-neutral-700 hover:border-orange-400 hover:text-orange-400 font-body font-semibold px-6 py-3 rounded-md transition-colors">
              View Services
            </a>
          </div>
          <div ref={statsRef} className="flex items-center gap-6 mt-10 font-mono text-xs text-white flex-wrap">
            <StatItem value={12400} suffix="+" label=" drives recovered" inView={statsInView} />
            <div className="w-px h-8 bg-neutral-800" />
            <StatItem value={96} suffix="%" label=" success rate" inView={statsInView} />
            <div className="w-px h-8 bg-neutral-800" />
            <StatItem value={15} suffix="+" label=" yrs experience" inView={statsInView} />
          </div>
        </div>
        <div className={`transition-all duration-1000 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <RecoveryScanner />
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ image, icon: Icon, title, tagline, items, accent, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="group bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300">
        <div className="relative h-80 overflow-hidden">
          <Img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/10 to-transparent" />
          <div className={`absolute bottom-4 left-5 w-11 h-11 rounded-lg flex items-center justify-center shadow-lg ${accent}`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="p-7">
          <h3 className="font-display font-bold text-xl text-neutral-900">{title}</h3>
          <p className="font-body text-neutral-600 text-sm mt-1.5 mb-5">{tagline}</p>
          <ul className="space-y-2.5">
            {items.map((it) => (
              <li key={it} className="flex items-start gap-2.5 font-body text-sm text-neutral-700">
                <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                {it}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

function Services() {
  return (
    <section id="services" className="bg-neutral-50 py-20">
      <div className="max-w-7xl mx-auto px-5">
        <Reveal>
          <div className="max-w-2xl mb-12">
            <span className="font-mono text-md tracking-[0.2em] text-orange-600">WHAT WE FIX</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 mt-3 tracking-tight">
              Two labs under one roof.
            </h2>
            <p className="font-body text-neutral-600 mt-3">
              One bench recovers what's lost. The other keeps your machine running so it doesn't happen again.
            </p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          <ServiceCard
            image="WhatsApp Image 2026-08-04 at 1.29.10 PM.jpeg"
            icon={HardDrive}
            title="Data Recovery"
            tagline="From clicking hard drives to formatted SSDs."
            accent="bg-orange-400"
            delay={0}
            items={[
              "Hard disk & SSD recovery (physical + logical)",
              "RAID, NAS & server array reconstruction",
              "Formatted, corrupted or deleted partitions",
              "Water, fire & physically damaged drives",
              "Phone & memory card data recovery",
            ]}
          />
          <ServiceCard
            image="ChatGPT Image Aug 5, 2026, 11_59_30 AM.png"
            icon={Laptop}
            title="Laptop Repair"
            tagline="All brands, all generations, honest quotes."
            accent="bg-neutral-900"
            delay={120}
            items={[
              "Screen, keyboard & battery replacement",
              "Motherboard & chip-level repair",
              "Liquid damage cleaning & restoration",
              "OS installation, tune-ups & upgrades",
              "Hinge, port & body damage repair",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { icon: FileSearch, title: "Diagnose", desc: "Free evaluation of your drive or device — usually within 24 hours." },
    { icon: Search, title: "Quote", desc: "A fixed, itemised price before any work begins. No surprises later." },
    { icon: Wrench, title: "Recover / Repair", desc: "Work happens in our clean-room-standard lab under trained technicians." },
    { icon: PackageCheck, title: "Verify & Deliver", desc: "You review recovered files or a tested repair before final handover." },
  ];
  return (
    <section id="process" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-5">
        <Reveal>
          <div className="max-w-2xl mb-14">
            <span className="font-mono text-md tracking-[0.2em] text-orange-600">HOW IT WORKS</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 mt-3 tracking-tight">
              Four steps, start to finish.
            </h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-neutral-200" />
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 120}>
              <div className="relative group">
                <div className="w-12 h-12 rounded-full bg-neutral-950 text-white flex items-center justify-center font-mono text-sm relative z-10 mb-5 group-hover:bg-orange-400 group-hover:scale-110 transition-all duration-300">
                  0{i + 1}
                </div>
                <s.icon className="w-5 h-5 text-orange-500 mb-2" />
                <h3 className="font-display font-bold text-lg text-neutral-900">{s.title}</h3>
                <p className="font-body text-sm text-neutral-600 mt-1.5 leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const points = [
    { icon: ShieldCheck, title: "No recovery, no fee", desc: "If we can't recover your data, you don't pay for the attempt." },
    { icon: Clock, title: "Fast turnaround", desc: "Most diagnostics in 24 hrs, standard jobs in 2–4 business days." },
    { icon: Database, title: "Every media type", desc: "HDD, SSD, RAID, NAS, USB, SD cards, and mobile devices." },
    { icon: Cpu, title: "Certified technicians", desc: "Chip-level repair skill, not just parts-swapping." },
  ];
  return (
    <section id="why-us" className="bg-neutral-950 text-white py-20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-5 relative">
        <Reveal>
          <div className="max-w-2xl mb-14">
            <span className="font-mono text-md tracking-[0.2em] text-orange-400">WHY SWETAYAN</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl mt-3 tracking-tight">
              Built for the worst day your device has had.
            </h2>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="group bg-neutral-900 border border-neutral-800 hover:border-orange-500/50 rounded-xl p-6 h-full transition-all duration-300 hover:-translate-y-1">
                <p.icon className="w-6 h-6 text-orange-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-display font-semibold text-base">{p.title}</h3>
                <p className="font-body text-sm text-neutral-400 mt-2 leading-relaxed">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Brands() {
  const brands = ["Seagate", "Western Digital", "Toshiba", "Samsung", "Dell", "HP", "Lenovo", "Apple", "ASUS", "Acer"];
  const loop = [...brands, ...brands];
  return (
    <section className="bg-neutral-50 py-14 border-y border-neutral-200 overflow-hidden">
      <p className="text-center font-mono text-xs tracking-[0.2em] text-neutral-600 mb-8">
        WE SERVICE EVERY MAJOR BRAND
      </p>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-neutral-50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-neutral-50 to-transparent z-10" />
        <div className="flex w-max animate-marquee">
          {loop.map((b, i) => (
            <span key={i} className="font-display font-semibold text-neutral-400 hover:text-orange-500 transition-colors text-lg px-8 whitespace-nowrap">
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { name: "Ritika Sharma", role: "Freelance Photographer", quote: "My external drive with two years of client shoots stopped mounting overnight. Swetayan recovered every single folder within three days.", stars: 5, img: "usericon.png" },
    { name: "Arvind Mehta", role: "Small Business Owner", quote: "Our office NAS crashed with all our billing records. They rebuilt the RAID and handed everything back verified and organised.", stars: 5, img: "usericon.png" },
    { name: "Priya Nair", role: "College Student", quote: "Spilled water on my laptop right before finals. They cleaned it, replaced the keyboard, and had it back to me in two days.", stars: 5, img: "usericon.png" },
  ];
  return (
    <section id="reviews" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-5">
        <Reveal>
          <div className="max-w-2xl mb-12">
            <span className="font-mono text-md tracking-[0.2em] text-orange-600">CLIENT STORIES</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 mt-3 tracking-tight">
              Real drives, real recoveries.
            </h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 120}>
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <Quote className="w-6 h-6 text-orange-500 mb-4" />
                <p className="font-body text-sm text-neutral-700 leading-relaxed flex-1">"{r.quote}"</p>
                <div className="flex items-center gap-1 mt-5 mb-3">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-orange-500 text-orange-500" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <Img src={r.img} alt={r.name} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <p className="font-display font-semibold text-sm text-neutral-900">{r.name}</p>
                    <p className="font-body text-xs text-neutral-600">{r.role}</p>
                  </div>
                </div>
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
    <section className="bg-orange-400 py-14 relative overflow-hidden">
      <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-2xl animate-glow" />
      <Reveal>
        <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-6 relative">
          <div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-neutral-950 tracking-tight">
              Don't touch that drive again.
            </h3>
            <p className="font-body text-neutral-900/80 mt-2">
              Every extra power-on risks the data. Bring it in for a free evaluation today.
            </p>
          </div>
          <a href="#contact" className="bg-neutral-950 hover:bg-neutral-800 hover:scale-105 text-white font-body font-semibold px-6 py-3 rounded-md whitespace-nowrap transition-all flex items-center gap-2">
            Talk to a Technician <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <section id="contact" className="bg-neutral-50 py-20">
      <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-2 gap-12">
        <Reveal>
          <div>
            <span className="font-mono text-md tracking-[0.2em] text-orange-600">GET IN TOUCH</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 mt-3 tracking-tight">
              Tell us what happened.
            </h2>
            <p className="font-body text-neutral-600 mt-3 max-w-md">
              Describe the device, the symptoms, and how urgent it is. We'll get back with next steps and an estimate.
            </p>
            <div className="mt-8 space-y-5 font-body text-sm text-neutral-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 mt-0.5" />
                <span>Shop No 2 Keshavkunj Building, Opp Yashoda Medical , Nr Bank of Maharashtra , Pimple Gurav, Pune 411061</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-orange-500 mt-0.5" />
                <span>+91 9284562996 / 8421873733 — 9. 30 am To 9.30 pm, all days</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-orange-500 mt-0.5" />
                <span>swetayantechnologies@gmail.com </span>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="bg-white border border-neutral-200 rounded-xl p-7 shadow-sm">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mb-4 animate-pop">
                  <CheckCircle2 className="w-9 h-9 text-orange-500" />
                </div>
                <h3 className="font-display font-bold text-lg text-neutral-900">Request received</h3>
                <p className="font-body text-sm text-neutral-600 mt-2">We'll reach out shortly with your free diagnosis details.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input required placeholder="Full name" className="w-full border border-neutral-300 rounded-md px-3.5 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow" />
                  <input required type="tel" placeholder="Phone number" className="w-full border border-neutral-300 rounded-md px-3.5 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow" />
                </div>
                <select required defaultValue="" className="w-full border border-neutral-300 rounded-md px-3.5 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-neutral-700 transition-shadow">
                  <option value="" disabled>What do you need help with?</option>
                  <option>Data Recovery — Hard Drive / SSD</option>
                  <option>Data Recovery — RAID / NAS</option>
                  <option>Data Recovery — Phone / Memory Card</option>
                  <option>Laptop Repair</option>
                  <option>Not sure — need advice</option>
                </select>
                <textarea required rows={4} placeholder="Briefly describe what happened to your device" className="w-full border border-neutral-300 rounded-md px-3.5 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none transition-shadow" />
                <button type="submit" className="w-full bg-orange-400 hover:bg-orange-300 hover:scale-[1.02] text-neutral-950 font-body font-semibold px-6 py-3 rounded-md transition-all flex items-center justify-center gap-2">
                  Request Free Diagnosis <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}



function FloatingContact() {
  return (
    <a
      href="tel:+919876543210"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-orange-400 hover:bg-orange-300 text-neutral-950 flex items-center justify-center shadow-2xl animate-ring transition-colors"
      aria-label="Call Swetayan Technologies"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}

export default function SwetayanTechnologiesWebsite() {
  return (
    <div className="font-body bg-white min-h-screen">
      <style>{FONT_STYLES}</style>


      <Hero />
      <Services />
      <Process />
      <WhyUs />
      <Brands />
      <Testimonials />
      <CTABanner />
      <Contact />

      <FloatingContact />
    </div>
  );
}