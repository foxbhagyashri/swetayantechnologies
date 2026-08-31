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
    Laptop,
    BatteryCharging,
    Plug,
    Cable,
    BatteryWarning,
    CircuitBoard,
    Battery,
} from "lucide-react";

/* ---------------------------------------------------------
   Swetayan Technologies — Laptop Not Charging Repair
   Service
   Reuses the exact design tokens, motion language and brand
   mark from the Home / About / Services / Data Recovery /
   Virus Removal / Power Repair / Overheating / Screen / Fan
   pages (Space Grotesk + Inter + IBM Plex Mono, orange-500
   accent, neutral-950 chrome).
--------------------------------------------------------- */

const FONT_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
  .font-display { font-family: 'Arial'; }
  .font-body { font-family: 'Arial'; }
  .font-mono { font-family: 'Arial'; }

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
                <Laptop className="w-10 h-10 text-neutral-600" />
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
                src="https://images.unsplash.com/photo-1588200908342-23b585c03e26?w=1600&q=70&auto=format&fit=crop"
                alt="Technician testing a laptop charging port and power adapter"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/95 to-neutral-950/80" />
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="max-w-7xl mx-auto px-5 py-14 md:py-16 relative">
                <div className="flex items-center gap-2 mb-4">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-orange-500" />
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.2em] text-orange-400">CERTIFIED POWER & CHARGING TECHNICIANS</span>
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
                            Plugged in but not charging, or stuck at 0%?
                        </h3>
                        <p className="font-body text-neutral-900/80 mt-2">
                            Don't run it down to empty guessing why — get a free charging diagnosis first.
                        </p>
                    </div>
                    <a href="#contact" className="bg-neutral-950 hover:bg-neutral-800 hover:scale-105 text-white font-body font-semibold px-6 py-3 rounded-md whitespace-nowrap transition-all flex items-center gap-2">
                        Get Free Charging Diagnosis <ArrowRight className="w-4 h-4" />
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
        { value: 17800, suffix: "+", label: "Charging faults fixed" },
        { value: 95, suffix: "%", label: "Fixed without board swap" },
        { value: 24, suffix: "hr", label: "Typical turnaround" },
    ];
    return (
        <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-2 gap-14 items-center">
                <Reveal>
                    <span className="font-mono text-xs tracking-[0.2em] text-orange-600">NOT CHARGING REPAIR</span>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 mt-3 tracking-tight leading-tight">
                        Not charging, charging slowly, or stuck on battery? We find the exact break in the chain.
                    </h2>
                    <p className="font-body text-neutral-600 mt-5 leading-relaxed">
                        A laptop that won't charge isn't always a dead battery. It could
                        be a worn charging port, a faulty adapter or cable, a loose
                        DC-in connector on the motherboard, or a battery that's simply
                        reached the end of its life. We test the adapter, port, and
                        battery separately to isolate exactly where the charge is being
                        lost — instead of guessing. Because we're a data recovery lab
                        first, every repair is done with your files protected — nothing
                        is wiped unless you ask for it.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-8">
                        <a href="#contact" className="bg-orange-500 hover:bg-orange-400 hover:scale-105 text-neutral-950 font-body font-semibold px-6 py-3 rounded-md transition-all flex items-center gap-2">
                            Book a Free Charging Diagnosis <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </Reveal>
                <Reveal delay={150}>
                    <div className="rounded-2xl overflow-hidden mb-6 border border-neutral-200">
                        <Img
                            src="/ChatGPT Image Aug 31, 2026, 11_45_04 AM.png"
                            alt="Technician repairing a laptop DC-in charging port"
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

function BrandsSupported() {
    const items = [
        { img: "/pexels-imthiyaz-syed-3018953-4574586.jpg", label: "No Charging Icon" },
        { img: "/pexels-it-services-eu-9278798-7639355 (1).jpg", label: "Stuck at 0% or 1%" },
        { img: "/pexels-elias-gamez-2002621-10558598 (2).jpg", label: "Charges Only at an Angle" },
        { img: "/pexels-athena-2582930.jpg", label: "Very Slow Charging" },
        { img: "/pexels-it-services-eu-9278798-7639360.jpg", label: "Battery Drains While Plugged In" },
        { img: "/pexels-it-services-eu-9278798-7639374 (1).jpg", label: "Loose or Wobbly Port" },
    ];
    return (
        <section className="bg-white py-14 border-y border-neutral-100">
            <div className="max-w-7xl mx-auto px-5">
                <Reveal>
                    <p className="font-mono text-xs tracking-[0.2em] text-neutral-400 text-center mb-8">SYMPTOMS WE DIAGNOSE</p>
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

/* ---------- repair cases (detailed) ---------- */

function RepairCases() {
    const cases = [
        {
            icon: Plug,
            title: "DC-In / Charging Port Repair",
            desc: "Loose, bent, or broken charging ports that need to wiggle the cable to make contact.",
            points: ["Port continuity testing", "DC-jack resoldering or replacement", "Connector alignment check"],
        },
        {
            icon: Cable,
            title: "Adapter & Cable Testing",
            desc: "Chargers and cables that look fine but no longer deliver a stable output.",
            points: ["Adapter output voltage test", "Cable continuity check", "Genuine replacement sourcing"],
        },
        {
            icon: Battery,
            title: "Battery Replacement",
            desc: "Batteries that no longer hold charge, drain rapidly, or are reported as not detected.",
            points: ["Battery health diagnostics", "Genuine-grade replacement", "Charge-cycle verification"],
        },
        {
            icon: BatteryWarning,
            title: "Stuck at 0% / Not Charging Icon",
            desc: "Laptops that show plugged-in-not-charging or freeze at a fixed battery percentage.",
            points: ["Charge controller diagnosis", "Battery vs. port isolation", "Root-cause repair, not a reset"],
        },
        {
            icon: CircuitBoard,
            title: "Charging Circuit & IC Repair",
            desc: "Board-level charging faults where power reaches the laptop but never reaches the battery.",
            points: ["Charging IC diagnosis", "Component-level board repair", "Power delivery re-testing"],
        },
        {
            icon: BatteryCharging,
            title: "Slow or Unstable Charging",
            desc: "Charging that works but is unusually slow, drops out, or fluctuates while plugged in.",
            points: ["Wattage delivery testing", "Loose connection isolation", "Stability re-test under load"],
        },
    ];
    return (
        <section className="bg-neutral-50 py-20">
            <div className="max-w-7xl mx-auto px-5">
                <Reveal>
                    <div className="max-w-2xl mb-14">
                        <span className="font-mono text-xs tracking-[0.2em] text-orange-600">WHAT WE HANDLE</span>
                        <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 mt-3 tracking-tight">
                            Every reason a laptop won't charge, one visit.
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
            img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&q=70&auto=format&fit=crop",
            title: "Port & adapter testing",
            desc: "We test the charging port, cable, and adapter individually to isolate exactly where power is being lost.",
        },
        {
            img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=70&auto=format&fit=crop",
            title: "Board-level inspection",
            desc: "If power isn't reaching the battery, we trace the charging circuit down to the component level.",
        },
        {
            img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=70&auto=format&fit=crop",
            title: "Repair & re-test",
            desc: "The faulty part is repaired or replaced and the laptop is charge-cycle tested before it's handed back.",
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
        { icon: ScanSearch, title: "Free Charging Diagnosis", desc: "We test the port, cable, adapter, and battery separately to find exactly where charging fails." },
        { icon: FileCheck2, title: "Honest Quote", desc: "You get a clear price and timeline before any port, battery, or board repair begins." },
        { icon: Wrench, title: "Port, Battery or Board Repair", desc: "The faulty part — port, cable, battery, or charging circuit — is repaired or replaced." },
        { icon: BatteryCharging, title: "Charge-Cycle Testing", desc: "The laptop is charged and discharged under monitoring to confirm the fix holds." },
        { icon: PackageCheck, title: "Ready to Collect", desc: "Your laptop is returned charging reliably, with your data intact." },
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
        "Keep wiggling the cable to force a charge, which wears the port out further",
        "Use a generic third-party adapter you're unsure is rated for the laptop",
        "Ignore a battery that drains fast even while it says it's 'charging'",
        "Try to resolder or force the DC-in port yourself without proper tools",
    ];
    const dos = [
        "Note whether the issue is the port, the cable, the adapter, or all three",
        "Check if it only charges at a certain angle, which points to the port",
        "Bring the original charger and cable along with the laptop",
        "Ship or bring the laptop to us as soon as possible if the battery is swollen",
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
        { icon: Lock, title: "Data Kept Intact", desc: "Charging repairs are done at the port, battery, and board level without touching your storage drive." },
        { icon: Clock, title: "24–48 Hour Turnaround", desc: "Most port, cable, and battery repairs are completed within one to two working days." },
        { icon: ShieldCheck, title: "Genuine-Grade Parts", desc: "Every battery, adapter, and port component we fit is genuine or manufacturer-grade." },
        { icon: Zap, title: "Warranty on Repair", desc: "Every charging repair we complete is backed by a service warranty." },
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
        { q: "My laptop shows 'plugged in, not charging' — what does that mean?", a: "It usually means power is reaching the laptop but not making it to the battery. This can point to a battery, charge controller, or charging circuit issue, and we test each to find which." },
        { q: "Will a charging repair erase my data?", a: "No. Charging repairs work on the port, battery, adapter, or charging circuit — your storage drive and files are never touched." },
        { q: "How do I know if it's the charger or the laptop?", a: "If a different, known-working charger of the correct wattage still doesn't charge the laptop, the fault is more likely in the port, battery, or internal circuit rather than the adapter." },
        { q: "My laptop only charges when I hold the cable at an angle — is that serious?", a: "That's a strong sign of a loose or worn charging port. It's best addressed before it stops making contact altogether." },
        { q: "How long does a charging repair take?", a: "Most port and battery repairs are completed within 24 hours. Board-level charging circuit repairs may take up to 48 hours depending on the fault." },
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

export default function LaptopNotChargingRepairServicePage() {
    return (
        <div className="font-body bg-white min-h-screen">
            <style>{FONT_STYLES}</style>

            <Breadcrumb
                title="Laptop Not Charging Repair"
                subtitle="Charging ports, cables, adapters, batteries, and circuit faults diagnosed and fixed, with your data kept intact."
                trail={[
                    { label: "Home", href: "#" },
                    { label: "Services", href: "#services" },
                    { label: "Not Charging Repair", href: "#laptop-not-charging-repair-service" },
                ]}
            />
            <Intro />
            <BrandsSupported />
            <RepairCases />
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