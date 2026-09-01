import React, { useState, useEffect, useRef } from "react";
import {
    ShieldCheck,
    Clock,
    CheckCircle2,
    ArrowRight,
    Home,
    ChevronRight,
    ChevronDown,
    Lock,
    Zap,
    MessageCircle,
    ScanSearch,
    FileCheck2,
    PackageCheck,
    Wrench,
    AlertTriangle,
    MemoryStick,
    Layers,
    Gauge,
    RefreshCw,
    Cpu,
    ClipboardCheck,
} from "lucide-react";

/* ---------------------------------------------------------
   Swetayan Technologies — Laptop RAM Replacement, Fix &
   Upgrade Service
   Reuses the exact design tokens, motion language and brand
   mark from the Home / About / Services / Data Recovery /
   Virus Removal / Power Repair / Overheating / Screen / Fan
   / Not Charging / Hinge Repair / SSD Installation / Charging
   Point Repair / Motherboard Repair pages (Space Grotesk +
   Inter + IBM Plex Mono, orange-500 accent, neutral-950
   chrome).
--------------------------------------------------------- */

const FONT_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
  .font-display { font-family: 'Space Grotesk', sans-serif; }
  .font-body { font-family: 'Inter', sans-serif; }
  .font-mono { font-family: 'IBM Plex Mono', monospace; }

  @keyframes glow-pulse { 0%, 100% { opacity: 0.35; } 50% { opacity: 0.7; } }
  .animate-glow { animation: glow-pulse 3.5s ease-in-out infinite; }

  @keyframes ring-pulse {
    0% { box-shadow: 0 0 0 0 rgba(249,115,22,0.55); }
    100% { box-shadow: 0 0 0 16px rgba(249,115,22,0); }
  }
  .animate-ring { animation: ring-pulse 2s ease-out infinite; }

  @keyframes pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
  .animate-pulse-dot { animation: pulse-dot 1.8s ease-in-out infinite; }

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
                <MemoryStick className="w-10 h-10 text-neutral-600" />
            </div>
        );
    }
    return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} loading="lazy" />;
}

/* ---------- shared chrome ---------- */

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

function Breadcrumb({ trail, title, subtitle }) {
    return (
        <section className="relative bg-neutral-950 text-white overflow-hidden">
            <Img
                src="https://images.unsplash.com/photo-1591405351990-4726e331f141?w=1600&q=70&auto=format&fit=crop"
                alt="Technician installing a RAM module into a laptop"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/95 to-neutral-950/80" />
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="max-w-7xl mx-auto px-5 py-14 md:py-16 relative">
                <div className="flex items-center gap-2 mb-4">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-orange-500" />
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.2em] text-orange-400">CERTIFIED MEMORY UPGRADE TECHNICIANS</span>
                </div>
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

function CTABanner() {
    return (
        <section className="bg-orange-500 py-14 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-2xl animate-glow" />
            <Reveal>
                <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-6 relative">
                    <div>
                        <h3 className="font-display font-bold text-2xl sm:text-3xl text-neutral-950 tracking-tight">
                            Too many tabs and everything grinds to a halt?
                        </h3>
                        <p className="font-body text-neutral-900/80 mt-2">
                            Get a free memory check and see exactly how much RAM your laptop needs.
                        </p>
                    </div>
                    <a href="#contact" className="bg-neutral-950 hover:bg-neutral-800 hover:scale-105 text-white font-body font-semibold px-6 py-3 rounded-md whitespace-nowrap transition-all flex items-center gap-2">
                        Get Free RAM Check <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </Reveal>
        </section>
    );
}

/* ---------- intro + stats ---------- */

function Intro() {
    const [ref, inView] = useInView(0.4);
    const stats = [
        { value: 16, suffix: "+", label: "Years in IT services" },
        { value: 8600, suffix: "+", label: "RAM modules fitted" },
        { value: 100, suffix: "%", label: "Compatibility checked first" },
        { value: 1, suffix: "hr", label: "Typical turnaround" },
    ];
    return (
        <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-2 gap-14 items-center">
                <Reveal>
                    <span className="font-mono text-xs tracking-[0.2em] text-orange-600">RAM REPLACEMENT, FIX & UPGRADE</span>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 mt-3 tracking-tight leading-tight">
                        Multitasking shouldn't bring your laptop to a crawl.
                    </h2>
                    <p className="font-body text-neutral-600 mt-5 leading-relaxed">
                        A laptop that slows down under multiple tabs and apps, restarts
                        on its own, or throws blue-screen memory errors is usually
                        telling you it's short on RAM or running a failing module. We
                        check your laptop's exact memory type, slots, and maximum
                        supported capacity, then fit or replace RAM that's fully
                        compatible — fixing faulty modules and upgrading capacity in
                        the same visit where it makes sense.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-8">
                        <a href="#contact" className="bg-orange-500 hover:bg-orange-400 hover:scale-105 text-neutral-950 font-body font-semibold px-6 py-3 rounded-md transition-all flex items-center gap-2">
                            Book a Free RAM Check <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </Reveal>
                <Reveal delay={150}>
                    <div className="rounded-2xl overflow-hidden mb-6 border border-neutral-200">
                        <Img
                            src="/ChatGPT Image Aug 31, 2026, 11_59_24 AM.png"
                            alt="Close-up of a RAM module being seated into a laptop slot"
                            className="w-full h-80 object-cover"
                        />
                    </div>
                    <div ref={ref} className="bg-neutral-950 rounded-2xl p-8 grid grid-cols-2 gap-8">
                        {stats.map((s) => {
                            const n = useCountUp(s.value, inView);
                            return (
                                <div key={s.label}>
                                    <p className="font-display font-bold text-3xl text-orange-500 font-mono">
                                        {n.toLocaleString()}
                                        {s.suffix}
                                    </p>
                                    <p className="font-body text-sm text-neutral-400 mt-1.5">{s.label}</p>
                                </div>
                            );
                        })}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* ---------- symptoms we diagnose ---------- */

function SymptomsGrid() {
    const items = [
        { img: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=500&q=70&auto=format&fit=crop", label: "Slows Down with Many Tabs" },
        { img: "/images (45).jfif", label: "Random Restarts" },
        { img: "/images (46).jfif", label: "Blue Screen Memory Errors" },
        { img: "/images (47).jfif", label: "Apps Crash Unexpectedly" },
        { img: "/pexels-elias-gamez-2002621-10558598 (3).jpg", label: "Laptop Not Detecting Full RAM" },
        { img: "/pexels-gabby-k-9429403.jpg", label: "Beeping on Startup" },
    ];
    return (
        <section className="bg-white py-14 border-y border-neutral-100">
            <div className="max-w-7xl mx-auto px-5">
                <Reveal>
                    <p className="font-mono text-xs tracking-[0.2em] text-neutral-400 text-center mb-8">SIGNS YOU NEED A RAM FIX OR UPGRADE</p>
                </Reveal>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                    {items.map((d, i) => (
                        <Reveal key={d.label} delay={i * 70}>
                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="rounded-xl overflow-hidden border border-neutral-200">
                                    <Img src={d.img} alt={d.label} className="w-full h-auto" />
                                </div>
                                <span className="font-body text-xs text-neutral-500">{d.label}</span>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ---------- services (detailed) ---------- */

function ServiceCases() {
    const cases = [
        {
            icon: MemoryStick,
            title: "RAM Capacity Upgrade",
            desc: "Adding or swapping in higher-capacity modules so your laptop handles multitasking, browser tabs, and heavier apps smoothly.",
            points: ["Max-supported capacity check", "Compatible module sourcing", "Dual-channel configuration"],
        },
        {
            icon: Wrench,
            title: "Faulty RAM Module Replacement",
            desc: "Replacing a failing stick that's causing blue screens, freezes, or boot failures with a tested, healthy module.",
            points: ["Per-module fault isolation", "Memtest verification", "Matched module replacement"],
        },
        {
            icon: Layers,
            title: "Mixed / Mismatched RAM Correction",
            desc: "Fixing performance loss caused by mismatched speed or capacity across slots, and reconfiguring for optimal dual-channel use.",
            points: ["Speed & timing matching", "Slot reseating & reordering", "Dual-channel bandwidth check"],
        },
        {
            icon: Cpu,
            title: "Soldered RAM Diagnosis",
            desc: "For laptops with memory soldered to the board, diagnosing whether the fault is in the RAM chip itself or elsewhere on the board.",
            points: ["Board-level memory testing", "BIOS memory-count verification", "Chip-level repair assessment"],
        },
        {
            icon: ClipboardCheck,
            title: "Compatibility & Slot Check",
            desc: "Confirming your laptop's memory type, speed, and available slots before any RAM is purchased or fitted.",
            points: ["DDR generation identification", "Slot count & availability check", "Motherboard support verification"],
        },
        {
            icon: Gauge,
            title: "Post-Upgrade Performance Testing",
            desc: "Benchmarking and stress-testing after installation so you can see the real difference the upgrade makes.",
            points: ["Boot & load-time benchmarking", "Stability stress test", "Before & after comparison"],
        },
    ];
    return (
        <section className="bg-neutral-50 py-20">
            <div className="max-w-7xl mx-auto px-5">
                <Reveal>
                    <div className="max-w-2xl mb-14">
                        <span className="font-mono text-xs tracking-[0.2em] text-orange-600">WHAT WE HANDLE</span>
                        <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 mt-3 tracking-tight">
                            Every kind of memory issue, one visit.
                        </h2>
                    </div>
                </Reveal>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cases.map((c, i) => (
                        <Reveal key={c.title} delay={i * 90}>
                            <div className="group h-full bg-white border border-neutral-200 hover:border-orange-300 hover:shadow-lg rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
                                <div className="w-11 h-11 rounded-lg bg-orange-500 flex items-center justify-center mb-5">
                                    <c.icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <h3 className="font-display font-semibold text-base text-neutral-900">{c.title}</h3>
                                <p className="font-body text-sm text-neutral-500 mt-2 leading-relaxed">{c.desc}</p>
                                <ul className="mt-4 space-y-1.5">
                                    {c.points.map((p) => (
                                        <li key={p} className="flex items-start gap-2 font-body text-xs text-neutral-500">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 mt-0.5 shrink-0" />
                                            {p}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ---------- inside the lab (image gallery) ---------- */

function LabGallery() {
    const shots = [
        {
            img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=70&auto=format&fit=crop",
            title: "Memory diagnosis",
            desc: "Each RAM module is tested individually to identify which stick, if any, is causing crashes or boot failures.",
        },
        {
            img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=70&auto=format&fit=crop",
            title: "Module fitting",
            desc: "The correct-spec module is seated into the slot and secured, matched for speed and capacity with any existing RAM.",
        },
        {
            img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=900&q=70&auto=format&fit=crop",
            title: "Boot & stress test",
            desc: "The laptop is booted, memory-tested, and benchmarked to confirm the new capacity is fully recognised and stable.",
        },
    ];
    return (
        <section className="bg-neutral-950 py-20">
            <div className="max-w-7xl mx-auto px-5">
                <Reveal>
                    <div className="max-w-2xl mb-14">
                        <span className="font-mono text-xs tracking-[0.2em] text-orange-500">INSIDE THE LAB</span>
                        <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mt-3 tracking-tight">
                            What happens to your laptop.
                        </h2>
                    </div>
                </Reveal>
                <div className="grid md:grid-cols-3 gap-6">
                    {shots.map((s, i) => (
                        <Reveal key={s.title} delay={i * 100}>
                            <div className="rounded-xl overflow-hidden border border-neutral-800">
                                <Img src={s.img} alt={s.title} className="w-full h-48 object-cover" />
                                <div className="p-5 bg-neutral-900">
                                    <h3 className="font-display font-semibold text-white text-sm">{s.title}</h3>
                                    <p className="font-body text-xs text-neutral-400 mt-2 leading-relaxed">{s.desc}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ---------- process ---------- */

function Process() {
    const steps = [
        { icon: ScanSearch, title: "Free Memory Check", desc: "We check your current RAM, slots, and maximum supported capacity for your exact laptop model." },
        { icon: FileCheck2, title: "Honest Quote", desc: "You get a clear price for the right module and labour before anything is ordered or fitted." },
        { icon: Wrench, title: "Fit or Replace RAM", desc: "The new or replacement module is seated and configured for the best dual-channel performance." },
        { icon: RefreshCw, title: "Boot & Stress Testing", desc: "The laptop is booted, memory-tested, and stress-tested to confirm stability under load." },
        { icon: PackageCheck, title: "Ready to Collect", desc: "Your laptop is returned handling multitasking smoothly, with every module verified." },
    ];
    return (
        <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-5">
                <Reveal>
                    <div className="max-w-2xl mb-14">
                        <span className="font-mono text-xs tracking-[0.2em] text-orange-600">HOW IT WORKS</span>
                        <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 mt-3 tracking-tight">
                            Five steps, start to finish.
                        </h2>
                    </div>
                </Reveal>
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {steps.map((s, i) => (
                        <Reveal key={s.title} delay={i * 100}>
                            <div className="relative h-full">
                                <span className="font-mono text-xs text-orange-500">0{i + 1}</span>
                                <div className="w-11 h-11 rounded-lg bg-neutral-950 flex items-center justify-center my-4">
                                    <s.icon className="w-5 h-5 text-orange-400" />
                                </div>
                                <h3 className="font-display font-semibold text-base text-neutral-900">{s.title}</h3>
                                <p className="font-body text-sm text-neutral-500 mt-2 leading-relaxed">{s.desc}</p>
                                {i < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-[74px] -right-3 w-6 h-px bg-neutral-300" />
                                )}
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ---------- do's and don'ts ---------- */

function DoDont() {
    const donts = [
        "Buy RAM online before confirming your laptop's exact type, speed, and available slots",
        "Mix mismatched capacities or speeds across slots without checking compatibility first",
        "Keep restarting a laptop that's blue-screening, since repeated crashes can affect other components",
        "Open the laptop yourself without proper ESD precautions to swap RAM",
    ];
    const dos = [
        "Note how often the slowdowns, crashes, or restarts happen and what you're usually doing",
        "Check Task Manager or Activity Monitor to see how much memory is typically in use",
        "Know your laptop's exact model number, so the right module can be confirmed quickly",
        "Bring or ship the laptop to us with its original charger",
    ];
    return (
        <section className="bg-neutral-950 py-20">
            <div className="max-w-7xl mx-auto px-5">
                <Reveal>
                    <div className="max-w-2xl mb-14">
                        <span className="font-mono text-xs tracking-[0.2em] text-orange-500">BEFORE YOU BRING IT IN</span>
                        <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mt-3 tracking-tight">
                            What to do — and what to avoid.
                        </h2>
                    </div>
                </Reveal>
                <div className="grid md:grid-cols-2 gap-6">
                    <Reveal>
                        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-7 h-full">
                            <div className="flex items-center gap-2.5 mb-5">
                                <CheckCircle2 className="w-5 h-5 text-orange-400" />
                                <h3 className="font-display font-semibold text-white">Do this</h3>
                            </div>
                            <ul className="space-y-3">
                                {dos.map((d) => (
                                    <li key={d} className="flex items-start gap-2.5 font-body text-sm text-neutral-400">
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0" />
                                        {d}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                    <Reveal delay={120}>
                        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-7 h-full">
                            <div className="flex items-center gap-2.5 mb-5">
                                <AlertTriangle className="w-5 h-5 text-neutral-500" />
                                <h3 className="font-display font-semibold text-white">Avoid this</h3>
                            </div>
                            <ul className="space-y-3">
                                {donts.map((d) => (
                                    <li key={d} className="flex items-start gap-2.5 font-body text-sm text-neutral-400">
                                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-2 shrink-0" />
                                        {d}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

/* ---------- guarantees ---------- */

function Guarantees() {
    const items = [
        { icon: Lock, title: "Zero Data Loss", desc: "RAM upgrades and replacements don't touch your drive — your files, apps, and settings stay untouched." },
        { icon: Clock, title: "1–2 Hour Turnaround", desc: "Most RAM fits and replacements are completed within an hour once the module is in stock." },
        { icon: ShieldCheck, title: "Genuine Branded Modules", desc: "We fit trusted-brand RAM matched exactly to your laptop's speed and type." },
        { icon: Zap, title: "Warranty on Repair", desc: "Every RAM installation we complete is backed by a service warranty." },
    ];
    return (
        <section className="bg-neutral-50 py-14">
            <div className="max-w-7xl mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-8">
                {items.map((it, i) => (
                    <Reveal key={it.title} delay={i * 90}>
                        <div className="text-center">
                            <it.icon className="w-6 h-6 text-orange-500 mx-auto mb-3" />
                            <p className="font-display font-semibold text-sm text-neutral-900">{it.title}</p>
                            <p className="font-body text-xs text-neutral-500 mt-2 leading-relaxed">{it.desc}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}

/* ---------- FAQ ---------- */

function FAQItem({ q, a, defaultOpen = false }) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-neutral-200 py-5">
            <button
                onClick={() => setOpen((o) => !o)}
                className="w-full flex items-center justify-between text-left gap-4"
                aria-expanded={open}
            >
                <span className="font-display font-semibold text-neutral-900">{q}</span>
                <ChevronDown className={`w-5 h-5 text-orange-500 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
            </button>
            <div className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                    <p className="font-body text-sm text-neutral-500 leading-relaxed">{a}</p>
                </div>
            </div>
        </div>
    );
}

function FAQ() {
    const faqs = [
        { q: "Will upgrading my RAM delete my files?", a: "No. A RAM upgrade only involves the memory modules, not your hard drive or SSD. Your files, apps, and settings are completely unaffected." },
        { q: "How much RAM do I actually need?", a: "It depends on how you use your laptop. During the free check we look at your current usage and recommend a capacity that fits your workload, rather than just upselling the maximum." },
        { q: "Can any laptop have its RAM upgraded?", a: "Most laptops with accessible RAM slots can be upgraded. Some newer, thinner models have memory soldered to the board, which we'll confirm during the free check and explain your options." },
        { q: "What causes blue screens related to RAM?", a: "A failing or incompatible memory module is one of the most common causes of random blue screens and restarts. We test each stick individually to confirm whether RAM is the culprit." },
        { q: "How long does a RAM upgrade take?", a: "Most RAM fits and replacements take about an hour if the module is in stock. If a specific module needs to be sourced, we'll give you an accurate timeline upfront." },
    ];
    return (
        <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-3 gap-12">
                <Reveal>
                    <span className="font-mono text-xs tracking-[0.2em] text-orange-600">FAQ</span>
                    <h2 className="font-display font-bold text-3xl text-neutral-900 mt-3 tracking-tight">
                        Questions we hear often.
                    </h2>
                    <p className="font-body text-neutral-500 mt-4 leading-relaxed">
                        Can't find what you're looking for? Reach out and we'll answer directly.
                    </p>
                </Reveal>
                <Reveal delay={120} className="md:col-span-2">
                    <div>
                        {faqs.map((f, i) => (
                            <FAQItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

export default function LaptopRAMReplacementServicePage() {
    return (
        <div className="font-body bg-white min-h-screen">
            <style>{FONT_STYLES}</style>

            <Breadcrumb
                title="Laptop RAM Replacement, Fix & Upgrade Service"
                subtitle="Faster multitasking, fewer crashes, and no more blue screens — RAM diagnosed, fixed, and upgraded with the right modules."
                trail={[
                    { label: "Home", href: "#" },
                    { label: "Services", href: "#services" },
                    { label: "RAM Replacement & Upgrade", href: "#laptop-ram-replacement-service" },
                ]}
            />
            <Intro />
            <SymptomsGrid />
            <ServiceCases />
            <LabGallery />
            <Process />
            <DoDont />
            <Guarantees />
            <FAQ />
            <CTABanner />

            <FloatingContact />
        </div>
    );
}