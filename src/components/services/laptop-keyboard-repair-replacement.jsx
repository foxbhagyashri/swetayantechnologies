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
    Keyboard,
    KeyRound,
    Droplets,
    Layers,
    Lightbulb,
    Cable,
    MousePointer2,
} from "lucide-react";

/* ---------------------------------------------------------
   Swetayan Technologies — Laptop Keyboard Repair &
   Replacement Service
   Reuses the exact design tokens, motion language and brand
   mark from the Home / About / Services / Data Recovery pages
   (Space Grotesk + Inter + IBM Plex Mono, orange-500 accent,
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

        <a href="tel:+919876543210"
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
                src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1600&q=70&auto=format&fit=crop"
                alt="Close-up of a laptop keyboard during repair"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/95 to-neutral-950/80" />
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="max-w-7xl mx-auto px-5 py-14 md:py-16 relative">
                <div className="flex items-center gap-2 mb-4">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-orange-500" />
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.2em] text-orange-400">CERTIFIED REPAIR TECHNICIANS</span>
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
                            Keys sticking, missing, or not registering at all?
                        </h3>
                        <p className="font-body text-neutral-900/80 mt-2">
                            Don't type around a broken keyboard — get a free inspection before you decide anything.
                        </p>
                    </div>
                    <a href="#contact" className="bg-neutral-950 hover:bg-neutral-800 hover:scale-105 text-white font-body font-semibold px-6 py-3 rounded-md whitespace-nowrap transition-all flex items-center gap-2">
                        Get Free Inspection <ArrowRight className="w-4 h-4" />
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
        { value: 16, suffix: "+", label: "Years repairing laptops" },
        { value: 12000, suffix: "+", label: "Keyboards repaired" },
        { value: 96, suffix: "%", label: "First-visit fix rate" },
        { value: 24, suffix: "hr", label: "Typical turnaround" },
    ];
    return (
        <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-2 gap-14 items-center">
                <Reveal>
                    <span className="font-mono text-xs tracking-[0.2em] text-orange-600">KEYBOARD REPAIR SERVICE</span>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 mt-3 tracking-tight leading-tight">
                        Sticky keys, missing caps, or a keyboard that's stopped responding — fixed properly, without opening up the rest of the laptop.
                    </h2>
                    <p className="font-body text-neutral-600 mt-5 leading-relaxed">
                        A faulty keyboard is one of the most common laptop complaints —
                        and one of the easiest to get wrong if it's not handled
                        carefully. We diagnose whether the fault is a single key, a
                        damaged ribbon cable, spill residue under the keys, or a full
                        keyboard assembly failure, and repair only what's actually
                        needed. Because we're a data recovery lab first, every keyboard
                        job is handled with the same care around your files — the drive
                        is never touched during a keyboard repair. We work on all major
                        laptop brands, from everyday consumer machines to business
                        ultrabooks and gaming laptops, and quote honestly before any
                        work begins.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-8">
                        <a href="#contact" className="bg-orange-500 hover:bg-orange-400 hover:scale-105 text-neutral-950 font-body font-semibold px-6 py-3 rounded-md transition-all flex items-center gap-2">
                            Book a Free Inspection <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </Reveal>
                <Reveal delay={150}>
                    <div className="rounded-2xl overflow-hidden mb-6 border border-neutral-200">
                        <Img
                            src="/ChatGPT Image Aug 31, 2026, 11_18_39 AM.png"
                            alt="Technician replacing a laptop keyboard"
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

/* ---------- laptops we repair ---------- */

function BrandsSupported() {
    const items = [
        { img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=70&auto=format&fit=crop", label: "Dell / HP / Lenovo" },
        { img: "/pexels-joshsorenson-11237834.jpg", label: "Apple MacBook" },
        { img: "/pexels-ferarcosn-169484.jpg", label: "Asus / Acer / MSI" },
        { img: "/lenovo-loq-15-2024-gaming-laptop-1024x661.jpg", label: "Gaming Laptops" },
        { img: "https://images.unsplash.com/photo-1588200908342-23b585c03e26?w=500&q=70&auto=format&fit=crop", label: "Business Ultrabooks" },
        { img: "/images (53).jfif", label: "2-in-1 & Convertibles" },
    ];
    return (
        <section className="bg-white py-14 border-y border-neutral-100">
            <div className="max-w-7xl mx-auto px-5">
                <Reveal>
                    <p className="font-mono text-xs tracking-[0.2em] text-black text-center mb-8">LAPTOPS WE REPAIR</p>
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

/* ---------- keyboard fault cases (detailed) ---------- */

function RepairCases() {
    const cases = [
        {
            icon: KeyRound,
            title: "Sticky or Unresponsive Keys",
            desc: "Individual keys that stick, double-type, or don't register at all, without needing a full replacement.",
            points: ["Single-key stem & switch repair", "Keys that double-type or lag", "Cleaning under sticking keys"],
        },
        {
            icon: Layers,
            title: "Missing or Broken Keycaps",
            desc: "Snapped, popped-off, or missing keycaps and hinges replaced to match your exact model.",
            points: ["Individual keycap replacement", "Broken scissor / butterfly hinges", "Colour & profile matched to model"],
        },
        {
            icon: Droplets,
            title: "Spill Damage Under the Keys",
            desc: "Coffee, water, or juice spilled directly on the keyboard — cleaned before it reaches the board beneath.",
            points: ["Full keyboard disassembly & cleaning", "Corrosion check on the membrane", "Post-spill functional testing"],
        },
        {
            icon: Keyboard,
            title: "Full Keyboard Replacement",
            desc: "When the keyboard assembly itself has failed, we replace it with a genuine or OEM-matched unit.",
            points: ["Genuine / OEM-matched keyboards", "Palm-rest & chassis-integrated units", "Backlit keyboard variants available"],
        },
        {
            icon: Cable,
            title: "Ribbon Cable & Connector Faults",
            desc: "Loose, torn, or disconnected keyboard ribbon cables causing partial or total keyboard failure.",
            points: ["Ribbon cable reseating & repair", "Connector pin repair on the board", "Diagnosing rows/columns that fail"],
        },
        {
            icon: Lightbulb,
            title: "Backlight & Trackpad Issues",
            desc: "Keyboard backlighting that won't turn on, and trackpads affected by the same assembly.",
            points: ["Backlight circuit diagnosis", "Trackpad click / tracking faults", "Function-key & shortcut testing"],
        },
    ];
    return (
        <section className="bg-neutral-50 py-20">
            <div className="max-w-7xl mx-auto px-5">
                <Reveal>
                    <div className="max-w-2xl mb-14">
                        <span className="font-mono text-xs tracking-[0.2em] text-orange-600">REPAIRS WE HANDLE</span>
                        <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 mt-3 tracking-tight">
                            Every kind of keyboard fault, one lab.
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

// function LabGallery() {
//     const shots = [
//         {
//             img: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=900&q=70&auto=format&fit=crop",
//             title: "Careful disassembly",
//             desc: "The keyboard is removed key by key or as a full assembly, without disturbing the drive underneath.",
//         },
//         {
//             img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&q=70&auto=format&fit=crop",
//             title: "Key & switch level repair",
//             desc: "Individual switches, hinges, and keycaps are repaired where possible instead of a full swap.",
//         },
//         {
//             img: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=900&q=70&auto=format&fit=crop",
//             title: "Genuine parts & testing",
//             desc: "Every key is tested for registration and travel before the laptop goes back to you.",
//         },
//     ];
//     return (
//         <section className="bg-neutral-950 py-20">
//             <div className="max-w-7xl mx-auto px-5">
//                 <Reveal>
//                     <div className="max-w-2xl mb-14">
//                         <span className="font-mono text-xs tracking-[0.2em] text-orange-500">INSIDE THE LAB</span>
//                         <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mt-3 tracking-tight">
//                             What happens to your laptop.
//                         </h2>
//                     </div>
//                 </Reveal>
//                 <div className="grid md:grid-cols-3 gap-6">
//                     {shots.map((s, i) => (
//                         <Reveal key={s.title} delay={i * 100}>
//                             <div className="rounded-xl overflow-hidden border border-neutral-800">
//                                 <Img src={s.img} alt={s.title} className="w-full h-48 object-cover" />
//                                 <div className="p-5 bg-neutral-900">
//                                     <h3 className="font-display font-semibold text-white text-sm">{s.title}</h3>
//                                     <p className="font-body text-xs text-neutral-400 mt-2 leading-relaxed">{s.desc}</p>
//                                 </div>
//                             </div>
//                         </Reveal>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }

/* ---------- process ---------- */

function Process() {
    const steps = [
        { icon: ScanSearch, title: "Free Inspection", desc: "We test every key and identify whether the fault is a switch, cable, or full assembly." },
        { icon: FileCheck2, title: "Honest Quote", desc: "You get a clear price and timeline before any repair work begins." },
        { icon: Wrench, title: "Repair / Replace", desc: "Our technicians repair individual keys or fit a full replacement keyboard as needed." },
        { icon: ShieldCheck, title: "Testing", desc: "Every key is tested for travel and registration before we call it done." },
        { icon: PackageCheck, title: "Ready to Collect", desc: "Your laptop is returned clean, working, and with your data intact." },
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
        "Keep typing on keys that are stuck, especially if a liquid spill caused it",
        "Try to pry off keycaps yourself without knowing the hinge type",
        "Use compressed air aggressively near a spilled or sticky keyboard",
        "Keep the laptop powered on right after a liquid spill on the keys",
    ];
    const dos = [
        "Shut the laptop down immediately if liquid gets on the keyboard",
        "Turn the laptop upside down (gently) to let any liquid drain out",
        "Note which specific keys are affected before bringing it in",
        "Bring or ship the laptop to us as-is, along with the charger",
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
                                <AlertTriangle className="w-5 h-5 text-black" />
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
        { icon: Lock, title: "Data Kept Intact", desc: "Keyboard repairs are done without touching your drive or files." },
        { icon: Clock, title: "24–48 Hour Turnaround", desc: "Most keyboard repairs are completed within one to two working days." },
        { icon: ShieldCheck, title: "Genuine / OEM-Matched Parts", desc: "Every replacement keyboard or keycap is matched to your exact model." },
        { icon: Zap, title: "Warranty on Repairs", desc: "Every repair we complete is backed by a service warranty." },
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
        { q: "Can a single key be repaired, or does the whole keyboard need replacing?", a: "Most of the time, a single key can be repaired — we replace the individual stem, hinge, or switch. A full keyboard replacement is only needed if the assembly itself, the membrane, or the ribbon cable has failed." },
        { q: "Will a keyboard repair affect my files or data?", a: "No. Keyboard repairs are done at the input-device level and never touch the storage drive, so your files stay exactly as they were." },
        { q: "I spilled liquid on my keyboard — what should I do first?", a: "Shut the laptop down immediately, unplug it, and avoid typing or pressing keys. Bring it in as soon as possible — the sooner it's cleaned, the less chance of corrosion spreading to the board underneath." },
        { q: "Do you match the exact keyboard layout and backlighting?", a: "Yes. We source genuine or OEM-matched keyboards for your specific model, including backlit variants where the original had one." },
        { q: "How long does a keyboard repair take?", a: "Single-key repairs are often same-day. Full keyboard replacements typically take 24 to 48 hours depending on part availability." },
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

export default function LaptopKeyboardRepairServicePage() {
    return (
        <div className="font-body bg-white min-h-screen">
            <style>{FONT_STYLES}</style>

            <Breadcrumb
                title="Laptop Keyboard Repair & Replacement"
                subtitle="Sticky keys, spill damage, missing keycaps, or a full keyboard swap — repaired properly, with your data kept intact."
                trail={[
                    { label: "Home", href: "#" },
                    { label: "Services", href: "#services" },
                    { label: "Keyboard Repair & Replacement", href: "#laptop-keyboard-repair-service" },
                ]}
            />
            <Intro />
            <BrandsSupported />
            <RepairCases />
            {/* <LabGallery /> */}
            <Process />
            <DoDont />
            <Guarantees />
            <FAQ />
            <CTABanner />

            <FloatingContact />
        </div>
    );
}