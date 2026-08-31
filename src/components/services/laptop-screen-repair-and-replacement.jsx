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
    Monitor,
    Sparkles,
    Layers,
    Contrast,
    ScanLine,
    PenTool,
    Frame,
} from "lucide-react";

/* ---------------------------------------------------------
   Swetayan Technologies — Laptop Screen Repair & Replacement
   Repair Service
   Reuses the exact design tokens, motion language and brand
   mark from the Home / About / Services / Data Recovery /
   Virus Removal / Power Repair / Overheating pages (Space
   Grotesk + Inter + IBM Plex Mono, orange-500 accent,
   neutral-950 chrome).
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
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1600&q=70&auto=format&fit=crop"
                alt="Technician inspecting a cracked laptop screen on the bench"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/95 to-neutral-950/80" />
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="max-w-7xl mx-auto px-5 py-14 md:py-16 relative">
                <div className="flex items-center gap-2 mb-4">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-orange-500" />
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.2em] text-orange-400">CERTIFIED DISPLAY & PANEL TECHNICIANS</span>
                </div>
                <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-tight">{title}</h1>
                {subtitle && <p className="font-body text-white mt-2 max-w-xl">{subtitle}</p>}
                <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-xs text-white mt-5">
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
                            Cracked, flickering, or blacked-out screen?
                        </h3>
                        <p className="font-body text-neutral-900/80 mt-2">
                            Don't keep squinting through lines and dead pixels — get a free screen diagnosis first.
                        </p>
                    </div>
                    <a href="#contact" className="bg-neutral-950 hover:bg-neutral-800 hover:scale-105 text-white font-body font-semibold px-6 py-3 rounded-md whitespace-nowrap transition-all flex items-center gap-2">
                        Get Free Screen Diagnosis <ArrowRight className="w-4 h-4" />
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
        { value: 14200, suffix: "+", label: "Screens replaced" },
        { value: 98, suffix: "%", label: "Same-day panel match" },
        { value: 24, suffix: "hr", label: "Typical turnaround" },
    ];
    return (
        <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-2 gap-14 items-center">
                <Reveal>
                    <span className="font-mono text-xs tracking-[0.2em] text-orange-600">SCREEN REPAIR & REPLACEMENT</span>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 mt-3 tracking-tight leading-tight">
                        Cracked, flickering, or dark screen? We match the panel and get it right.
                    </h2>
                    <p className="font-body text-neutral-600 mt-5 leading-relaxed">
                        A damaged screen isn't always a full-panel replacement — sometimes
                        it's a loose display cable, a failed backlight, or a cracked
                        outer glass over an otherwise healthy panel. We inspect the
                        display assembly first, confirm the exact part your model needs,
                        and fit a matching panel with correct resolution and colour
                        accuracy — instead of guessing. Because we're a data recovery
                        lab first, every repair is done with your files protected —
                        nothing is wiped unless you ask for it.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-8">
                        <a href="#contact" className="bg-orange-500 hover:bg-orange-400 hover:scale-105 text-neutral-950 font-body font-semibold px-6 py-3 rounded-md transition-all flex items-center gap-2">
                            Book a Free Screen Diagnosis <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </Reveal>
                <Reveal delay={150}>
                    <div className="rounded-2xl overflow-hidden mb-6 border border-neutral-200">
                        <Img
                            src="/ChatGPT Image Aug 31, 2026, 11_41_17 AM.png"
                            alt="Technician fitting a replacement laptop display panel"
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
                                    <p className="font-body text-sm text-black mt-1.5">{s.label}</p>
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
        { img: "/pexels-thefullonmonet-28379997.jpg", label: "Cracked / Shattered Glass" },
        { img: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500&q=70&auto=format&fit=crop", label: "Black Screen, PC On" },
        { img: "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=500&q=70&auto=format&fit=crop", label: "Flickering Display" },
        { img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&q=70&auto=format&fit=crop", label: "Lines or Dead Pixels" },
        { img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&q=70&auto=format&fit=crop", label: "Dim / No Backlight" },
        { img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=70&auto=format&fit=crop", label: "Discoloured Patches" },
    ];
    return (
        <section className="bg-white py-14 border-y border-neutral-100">
            <div className="max-w-7xl mx-auto px-5">
                <Reveal>
                    <p className="font-mono text-xs tracking-[0.2em] text-black text-center mb-8">SYMPTOMS WE DIAGNOSE</p>
                </Reveal>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                    {items.map((d, i) => (
                        <Reveal key={d.label} delay={i * 70}>
                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="rounded-xl overflow-hidden border border-neutral-200">
                                    <Img src={d.img} alt={d.label} className="w-full h-auto" />
                                </div>
                                <span className="font-body text-xs text-black">{d.label}</span>
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
            icon: Monitor,
            title: "Full Panel Replacement",
            desc: "Cracked, shattered, or dead panels swapped for a resolution- and colour-matched replacement.",
            points: ["Exact model & resolution match", "FHD / touch / OLED panel options", "Post-fit colour & clarity check"],
        },
        {
            icon: Layers,
            title: "Display Cable & Hinge Repair",
            desc: "Flickering or intermittent screens that trace back to a worn LVDS/eDP cable or hinge pinch point.",
            points: ["Cable continuity testing", "Hinge cable routing fix", "Connector reseating & replacement"],
        },
        {
            icon: Contrast,
            title: "Backlight & Inverter Fix",
            desc: "Screens that stay dim, dark, or only visible with a flashlight held up to them.",
            points: ["Backlight strip diagnosis", "Inverter board testing", "Brightness restoration"],
        },
        {
            icon: ScanLine,
            title: "Dead Pixels & Lines",
            desc: "Vertical or horizontal lines, coloured bands, or clusters of dead or stuck pixels.",
            points: ["Pixel-pattern diagnosis", "Panel vs. cable isolation", "Replacement only where needed"],
        },
        {
            icon: PenTool,
            title: "Touchscreen Digitiser Repair",
            desc: "Touch that's unresponsive, ghost-clicking, or a digitiser layer cracked separately from the LCD.",
            points: ["Digitiser-only replacement where possible", "Touch calibration & testing", "Bezel & adhesive reseal"],
        },
        {
            icon: Frame,
            title: "Bezel & Lid Cosmetic Repair",
            desc: "Cracked outer glass, dented lids, or broken bezels reassembled to a clean, secure fit.",
            points: ["Bezel & lid replacement", "Clean adhesive reseal", "Alignment & gap inspection"],
        },
    ];
    return (
        <section className="bg-neutral-50 py-20">
            <div className="max-w-7xl mx-auto px-5">
                <Reveal>
                    <div className="max-w-2xl mb-14">
                        <span className="font-mono text-xs tracking-[0.2em] text-orange-600">WHAT WE HANDLE</span>
                        <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 mt-3 tracking-tight">
                            Every reason a screen fails, one visit.
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
                                <p className="font-body text-sm text-black mt-2 leading-relaxed">{c.desc}</p>
                                <ul className="mt-4 space-y-1.5">
                                    {c.points.map((p) => (
                                        <li key={p} className="flex items-start gap-2 font-body text-sm text-black">
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
            title: "Panel & cable diagnosis",
            desc: "We isolate whether the fault is the panel, the display cable, or the graphics output before ordering any part.",
        },
        {
            img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=70&auto=format&fit=crop",
            title: "Bezel strip-down",
            desc: "The bezel, hinges, and old panel are carefully removed without stressing the surrounding chassis.",
        },
        {
            img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=70&auto=format&fit=crop",
            title: "Fit & colour calibration",
            desc: "The new panel is seated, cabled, and checked for colour, brightness, and touch accuracy before reassembly.",
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
                                    <p className="font-body text-xs text-white mt-2 leading-relaxed">{s.desc}</p>
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
        { icon: ScanSearch, title: "Free Screen Diagnosis", desc: "We isolate whether it's the panel, cable, backlight, or digitiser before quoting anything." },
        { icon: FileCheck2, title: "Honest Quote", desc: "You get the exact panel model, price, and timeline before any part is ordered or fitted." },
        { icon: Wrench, title: "Panel Replacement", desc: "Bezel, hinges, and cabling are handled carefully so nothing around the display is damaged." },
        { icon: Sparkles, title: "Colour & Touch Check", desc: "Brightness, colour accuracy, and touch response are tested before reassembly is finalised." },
        { icon: PackageCheck, title: "Ready to Collect", desc: "Your laptop is returned with a crisp, fully working display and your data intact." },
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
                                <p className="font-body text-sm text-black mt-2 leading-relaxed">{s.desc}</p>
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
        "Press on a cracked screen or close the lid on loose glass fragments",
        "Keep using the laptop with visible lines, flicker, or a spreading dark patch",
        "Try to peel off or replace the panel yourself without the right tools",
        "Ignore a screen that only works when the lid is held at a certain angle",
    ];
    const dos = [
        "Power off the laptop if the glass is cracked, to avoid further damage",
        "Note when the fault happens — always, only at certain angles, or only sometimes",
        "Keep any loose glass or panel fragments in a bag if the screen is shattered",
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
                                    <li key={d} className="flex items-start gap-2.5 font-body text-sm text-white">
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
                                <AlertTriangle className="w-5 h-5 text-black" />
                                <h3 className="font-display font-semibold text-white">Avoid this</h3>
                            </div>
                            <ul className="space-y-3">
                                {donts.map((d) => (
                                    <li key={d} className="flex items-start gap-2.5 font-body text-sm text-white">
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
        { icon: Lock, title: "Data Kept Intact", desc: "Screen repairs are done at the display assembly level without touching your storage drive." },
        { icon: Clock, title: "24–48 Hour Turnaround", desc: "Most panel replacements are completed within one to two working days, subject to part availability." },
        { icon: ShieldCheck, title: "Genuine-Grade Panels", desc: "Every replacement panel is genuine or manufacturer-grade, matched to your exact model." },
        { icon: Zap, title: "Warranty on Repair", desc: "Every screen repair we complete is backed by a service warranty." },
    ];
    return (
        <section className="bg-neutral-50 py-14">
            <div className="max-w-7xl mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-8">
                {items.map((it, i) => (
                    <Reveal key={it.title} delay={i * 90}>
                        <div className="text-center">
                            <it.icon className="w-6 h-6 text-orange-500 mx-auto mb-3" />
                            <p className="font-display font-semibold text-sm text-neutral-900">{it.title}</p>
                            <p className="font-body text-xs text-black mt-2 leading-relaxed">{it.desc}</p>
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
                    <p className="font-body text-sm text-black leading-relaxed">{a}</p>
                </div>
            </div>
        </div>
    );
}

function FAQ() {
    const faqs = [
        { q: "My screen is cracked but the laptop still turns on — do I need a full replacement?", a: "Usually yes for the panel itself, since cracked glass and LCD layers can't be repaired invisibly. If it's an external touch digitiser separate from the LCD, sometimes only that layer needs replacing." },
        { q: "Will a screen replacement erase my data?", a: "No. Screen repairs work entirely on the display assembly — your storage drive and files are never touched." },
        { q: "The screen is fine but there's no image — is that the screen or the laptop?", a: "It could be either. We check for external display output first; if that works, the fault is isolated to the panel, cable, or graphics output on your specific laptop." },
        { q: "Can you match the exact screen resolution and panel type?", a: "Yes. We identify your model's original panel specification — resolution, touch or non-touch, matte or glossy — and source a matching replacement." },
        { q: "How long does a screen replacement take?", a: "Most replacements are completed within 24 hours when the matching panel is in stock. Less common panels may take up to 48 hours." },
    ];
    return (
        <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-3 gap-12">
                <Reveal>
                    <span className="font-mono text-xs tracking-[0.2em] text-orange-600">FAQ</span>
                    <h2 className="font-display font-bold text-3xl text-neutral-900 mt-3 tracking-tight">
                        Questions we hear often.
                    </h2>
                    <p className="font-body text-black mt-4 leading-relaxed">
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

export default function LaptopScreenRepairServicePage() {
    return (
        <div className="font-body bg-white min-h-screen">
            <style>{FONT_STYLES}</style>

            <Breadcrumb
                title="Laptop Screen Repair & Replacement Service"
                subtitle="Cracked glass, flickering panels, dead pixels, and dark displays diagnosed and fixed, with your data kept intact."
                trail={[
                    { label: "Home", href: "#" },
                    { label: "Services", href: "#services" },
                    { label: "Screen Repair", href: "#laptop-screen-repair-service" },
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