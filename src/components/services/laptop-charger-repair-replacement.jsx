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
    Cable,
    PlugZap,
    Flame,
    Gauge,
    BatteryCharging,
    ClipboardCheck,
} from "lucide-react";

/* ---------------------------------------------------------
   Swetayan Technologies — Laptop Charger Repair &
   Replacement Service
   Reuses the exact design tokens, motion language and brand
   mark from the Home / About / Services / Data Recovery /
   Virus Removal / Power Repair / Overheating / Screen / Fan
   / Not Charging / Hinge Repair / SSD Installation / Charging
   Point Repair / Motherboard Repair / RAM Replacement /
   Booting Issue Repair pages (Space Grotesk + Inter + IBM
   Plex Mono, orange-500 accent, neutral-950 chrome).
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
                <Cable className="w-10 h-10 text-neutral-600" />
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
                src="https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=1600&q=70&auto=format&fit=crop"
                alt="Laptop charger adapter and cable being tested by a technician"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/95 to-neutral-950/80" />
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="max-w-7xl mx-auto px-5 py-14 md:py-16 relative">
                <div className="flex items-center gap-2 mb-4">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-orange-500" />
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.2em] text-orange-400">CERTIFIED CHARGER & ADAPTER TECHNICIANS</span>
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
                            Charger brick running hot or not powering up?
                        </h3>
                        <p className="font-body text-neutral-900/80 mt-2">
                            Get a free charger test before it damages your laptop's charging circuit.
                        </p>
                    </div>
                    <a href="#contact" className="bg-neutral-950 hover:bg-neutral-800 hover:scale-105 text-white font-body font-semibold px-6 py-3 rounded-md whitespace-nowrap transition-all flex items-center gap-2">
                        Get Free Charger Test <ArrowRight className="w-4 h-4" />
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
        { value: 6300, suffix: "+", label: "Chargers tested & repaired" },
        { value: 100, suffix: "%", label: "Output voltage verified" },
        { value: 1, suffix: "hr", label: "Typical turnaround" },
    ];
    return (
        <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-2 gap-14 items-center">
                <Reveal>
                    <span className="font-mono text-xs tracking-[0.2em] text-orange-600">CHARGER REPAIR & REPLACEMENT</span>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 mt-3 tracking-tight leading-tight">
                        Before you blame the laptop, test the charger.
                    </h2>
                    <p className="font-body text-neutral-600 mt-5 leading-relaxed">
                        A charger that's stopped working, gotten hot, or developed a
                        frayed cable is one of the most common — and cheapest — reasons
                        a laptop appears to have "died." We test your adapter's actual
                        output against what your laptop needs, repair what can be
                        safely fixed like a damaged cable or connector, and replace
                        the unit with a correctly rated one when the internal
                        electronics have failed.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-8">
                        <a href="#contact" className="bg-orange-500 hover:bg-orange-400 hover:scale-105 text-neutral-950 font-body font-semibold px-6 py-3 rounded-md transition-all flex items-center gap-2">
                            Book a Free Charger Test <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </Reveal>
                <Reveal delay={150}>
                    <div className="rounded-2xl overflow-hidden mb-6 border border-neutral-200">
                        <Img
                            src="/ChatGPT Image Aug 31, 2026, 12_02_01 PM.png"
                            alt="Technician testing a laptop charger adapter with a multimeter"
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
        { img: "/images (48).jfif", label: "No Light on Adapter" },
        { img: "/images (49).jfif", label: "Frayed / Damaged Cable" },
        { img: "/pexels-steve-845239.jpg", label: "Adapter Runs Very Hot" },
        { img: "/01QrMgyTzeIkB5MzfJmQ3nT-16.fit_lim.size_1050x.webp", label: "Charging Cuts In and Out" },
        { img: "/hey-guys-is-it-normal-for-my-laptop-to-make-a-faint-buzzing-v0-t1bqcwbr6rfe1.webp", label: "Buzzing / Humming Noise" },
        { img: "/images (50).jfif", label: "Bent or Broken Pin/Tip" },
    ];
    return (
        <section className="bg-white py-14 border-y border-neutral-100">
            <div className="max-w-7xl mx-auto px-5">
                <Reveal>
                    <p className="font-mono text-xs tracking-[0.2em] text-neutral-400 text-center mb-8">SIGNS YOUR CHARGER NEEDS ATTENTION</p>
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
            icon: Gauge,
            title: "Charger Output Testing",
            desc: "Measuring your adapter's actual voltage and current output against your laptop's exact power requirements.",
            points: ["Voltage & amperage testing", "Load testing under use", "Spec comparison to laptop rating"],
        },
        {
            icon: Cable,
            title: "Cable & Connector Repair",
            desc: "Repairing a frayed cable, loose barrel connector, or damaged strain-relief point on an otherwise healthy adapter.",
            points: ["Cable continuity testing", "Connector re-termination", "Strain-relief reinforcement"],
        },
        {
            icon: PlugZap,
            title: "Genuine Adapter Replacement",
            desc: "Sourcing and supplying a correctly rated replacement charger when the original adapter has failed internally.",
            points: ["Exact wattage matching", "Original connector type sourced", "Full functional testing"],
        },
        {
            icon: Flame,
            title: "Overheating Adapter Diagnosis",
            desc: "Identifying why a charger is running hot, buzzing, or smelling of burning, and whether it's safe to keep using.",
            points: ["Internal component inspection", "Thermal behaviour check", "Safety risk assessment"],
        },
        {
            icon: BatteryCharging,
            title: "Charging Circuit Cross-Check",
            desc: "Confirming whether a charging fault sits with the adapter or the laptop's own charging port and circuit.",
            points: ["Known-good charger cross-test", "Laptop-side port inspection", "Fault-source isolation"],
        },
        {
            icon: ClipboardCheck,
            title: "Universal / Third-Party Charger Advice",
            desc: "Assessing whether a universal or third-party charger is safe and correctly matched to your laptop.",
            points: ["Wattage & polarity check", "Connector-tip compatibility", "Safety recommendation"],
        },
    ];
    return (
        <section className="bg-neutral-50 py-20">
            <div className="max-w-7xl mx-auto px-5">
                <Reveal>
                    <div className="max-w-2xl mb-14">
                        <span className="font-mono text-xs tracking-[0.2em] text-orange-600">WHAT WE HANDLE</span>
                        <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 mt-3 tracking-tight">
                            Every kind of charger fault, one visit.
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
            title: "Output testing",
            desc: "The adapter's voltage and current are measured under load and compared against your laptop's rated power draw.",
        },
        {
            img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=70&auto=format&fit=crop",
            title: "Cable & connector repair",
            desc: "Frayed cables and loose connectors are repaired or re-terminated, or the unit is flagged for replacement if unsafe.",
        },
        {
            img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=900&q=70&auto=format&fit=crop",
            title: "Cross-test on your laptop",
            desc: "The repaired or replacement charger is tested directly on your laptop to confirm stable, consistent charging.",
        },
    ];
    return (
        <section className="bg-neutral-950 py-20">
            <div className="max-w-7xl mx-auto px-5">
                <Reveal>
                    <div className="max-w-2xl mb-14">
                        <span className="font-mono text-xs tracking-[0.2em] text-orange-500">INSIDE THE LAB</span>
                        <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mt-3 tracking-tight">
                            What happens to your charger.
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
        { icon: ScanSearch, title: "Free Charger Test", desc: "We measure your adapter's actual output and compare it to your laptop's exact power requirement." },
        { icon: FileCheck2, title: "Honest Quote", desc: "You get a clear price for a repair or replacement before anything is fixed or ordered." },
        { icon: Wrench, title: "Repair or Replace", desc: "The cable or connector is repaired, or a correctly rated replacement adapter is fitted." },
        { icon: Zap, title: "Cross-Test on Your Laptop", desc: "The charger is tested directly on your laptop to confirm stable, consistent charging." },
        { icon: PackageCheck, title: "Ready to Collect", desc: "Your laptop is returned charging reliably, with a charger you can trust." },
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
        "Keep using a charger that's hot to the touch, buzzing, or smells of burning",
        "Wrap the charger cable tightly around the adapter body, which stresses the cable at the joint",
        "Use an unrated third-party charger without checking its voltage and wattage match",
        "Cover the adapter while it's in use, since this traps heat and can accelerate failure",
    ];
    const dos = [
        "Note whether the adapter light turns on at all, and if the cable feels loose or damaged",
        "Try a different wall socket to rule out a simple power supply issue",
        "Check the wattage printed on the adapter against your laptop's original charger",
        "Bring the laptop along with the charger so both can be tested together",
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
        { icon: Lock, title: "Data Left Untouched", desc: "Charger repair and replacement is external to the laptop — your drive and files are never involved." },
        { icon: Clock, title: "1 Hour Turnaround", desc: "Most charger tests and cable repairs are completed within the hour, replacements while you wait if in stock." },
        { icon: ShieldCheck, title: "Correctly Rated Replacements", desc: "Replacement adapters are matched exactly to your laptop's voltage, wattage, and connector type." },
        { icon: Zap, title: "Warranty on Repair", desc: "Every charger repair or replacement we provide is backed by a service warranty." },
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
        { q: "How do I know if it's the charger or the laptop that's faulty?", a: "The clearest way is to test with a known-good charger of the correct spec. During the free test, we measure your adapter's output directly and cross-check it against your laptop to isolate exactly where the fault is." },
        { q: "Is it safe to keep using a charger that gets hot?", a: "A charger that's warm under normal use is expected, but one that's hot to the touch, buzzing, or smells of burning should be stopped immediately and tested, as it can be a fire or damage risk." },
        { q: "Can a damaged charger harm my laptop?", a: "Yes. An adapter outputting the wrong voltage or a failing internal component can stress or damage your laptop's charging circuit over time, which is why we always recommend testing rather than continuing to use a suspect charger." },
        { q: "Can you repair just the cable, or does the whole adapter need replacing?", a: "If the fault is limited to the cable or connector, we repair that directly. If the failure is inside the adapter brick itself, replacement with a correctly rated unit is the safer and more reliable option." },
        { q: "Will a third-party charger work fine for my laptop?", a: "Only if it matches your laptop's exact voltage, wattage, and connector type. We can check any charger you already have and let you know plainly whether it's safe to keep using." },
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

export default function LaptopChargerRepairServicePage() {
    return (
        <div className="font-body bg-white min-h-screen">
            <style>{FONT_STYLES}</style>

            <Breadcrumb
                title="Laptop Charger Repair & Replacement Service"
                subtitle="Faulty adapters, frayed cables, and overheating chargers tested, repaired, or replaced with the correct rating."
                trail={[
                    { label: "Home", href: "#" },
                    { label: "Services", href: "#services" },
                    { label: "Charger Repair & Replacement", href: "#laptop-charger-repair-service" },
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