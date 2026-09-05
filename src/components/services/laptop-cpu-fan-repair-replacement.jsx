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
    Fan,
    Thermometer,
    Volume2,
    Wind,
    Gauge,
    CircuitBoard,
} from "lucide-react";

/* ---------------------------------------------------------
   Swetayan Technologies — Laptop CPU Fan Repair &
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

  @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .animate-spin-slow { animation: spin-slow 3s linear infinite; }

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
                src="https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=1600&q=70&auto=format&fit=crop"
                alt="Laptop internals showing the cooling fan during repair"
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
                            Fan running loud, laptop overheating, or shutting down on its own?
                        </h3>
                        <p className="font-body text-neutral-900/80 mt-2">
                            Don't wait for thermal shutdown to become permanent damage — get a free inspection today.
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
        { value: 14000, suffix: "+", label: "Fans cleaned or replaced" },
        { value: 96, suffix: "%", label: "First-visit fix rate" },
        { value: 24, suffix: "hr", label: "Typical turnaround" },
    ];
    return (
        <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-2 gap-14 items-center">
                <Reveal>
                    <span className="font-mono text-xs tracking-[0.2em] text-orange-600">CPU FAN REPAIR SERVICE</span>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 mt-3 tracking-tight leading-tight">
                        Loud fans, overheating, or thermal shutdowns — fixed properly, without risking the components around it.
                    </h2>
                    <p className="font-body text-neutral-600 mt-5 leading-relaxed">
                        A struggling CPU fan is one of the fastest ways a laptop starts
                        throttling performance, shutting down mid-task, or getting
                        uncomfortably hot to hold. We open the cooling assembly, clear
                        out dust and debris, replace worn bearings or the fan unit
                        itself, and re-apply thermal paste so heat actually transfers
                        the way it should. Because we're a data recovery lab first,
                        every job is handled with the same care around your files — the
                        drive is never touched during a fan or cooling repair. We work
                        on all major laptop brands, from everyday consumer machines to
                        business ultrabooks and gaming laptops, and quote honestly
                        before any work begins.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-8">
                        <a href="/EnquiryForm" className="bg-orange-500 hover:bg-orange-400 hover:scale-105 text-neutral-950 font-body font-semibold px-6 py-3 rounded-md transition-all flex items-center gap-2">
                            Book a Free Inspection <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </Reveal>
                <Reveal delay={150}>
                    <div className="rounded-2xl overflow-hidden mb-6 border border-neutral-200">
                        <Img
                            src="/ChatGPT Image Aug 31, 2026, 11_24_14 AM.png"
                            alt="Technician cleaning a laptop cooling fan and heatsink"
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
        { img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=70&auto=format&fit=crop", label: "Apple MacBook" },
        { img: "/images (54).jfif", label: "Asus / Acer / MSI" },
        { img: "/images (55).jfif", label: "Gaming Laptops" },
        { img: "https://images.unsplash.com/photo-1588200908342-23b585c03e26?w=500&q=70&auto=format&fit=crop", label: "Business Ultrabooks" },
        { img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=70&auto=format&fit=crop", label: "2-in-1 & Convertibles" },
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

/* ---------- fan / cooling fault cases (detailed) ---------- */

function RepairCases() {
    const cases = [
        {
            icon: Volume2,
            title: "Loud or Grinding Fan Noise",
            desc: "Rattling, grinding, or high-pitched whining fans caused by worn bearings or trapped debris.",
            points: ["Worn bearing diagnosis", "Debris & hair caught in the blades", "Fan balancing & noise testing"],
        },
        {
            icon: Thermometer,
            title: "Overheating & Thermal Shutdowns",
            desc: "A laptop that gets hot to the touch, throttles performance, or shuts down unexpectedly under load.",
            points: ["Full thermal diagnostic under load", "Heatsink contact & seating check", "Shutdown-threshold verification"],
        },
        {
            icon: Wind,
            title: "Dust Build-Up & Blocked Vents",
            desc: "Compacted dust inside the heatsink fins and vents restricting airflow over time.",
            points: ["Full internal dust removal", "Vent & fin deep cleaning", "Airflow path inspection"],
        },
        {
            icon: Fan,
            title: "Fan Not Spinning / Dead Fan",
            desc: "A fan that stays silent even under heavy load, often the first sign of total cooling failure.",
            points: ["Fan motor & connector testing", "Full fan unit replacement", "BIOS / EC fan-control check"],
        },
        {
            icon: CircuitBoard,
            title: "Thermal Paste & Pad Replacement",
            desc: "Dried-out or degraded thermal paste on the CPU/GPU that stops heat transferring to the heatsink.",
            points: ["CPU & GPU repaste", "Thermal pad replacement", "Idle & load temperature retest"],
        },
        {
            icon: Gauge,
            title: "Fan Running Constantly at High Speed",
            desc: "A fan stuck at full speed even at idle, usually a sensor, control, or airflow-restriction issue.",
            points: ["Temperature sensor diagnosis", "Fan-curve / EC firmware check", "Airflow restriction troubleshooting"],
        },
    ];
    return (
        <section className="bg-neutral-50 py-20">
            <div className="max-w-7xl mx-auto px-5">
                <Reveal>
                    <div className="max-w-2xl mb-14">
                        <span className="font-mono text-xs tracking-[0.2em] text-orange-600">REPAIRS WE HANDLE</span>
                        <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 mt-3 tracking-tight">
                            Every kind of fan & cooling fault, one lab.
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
//             img: "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=900&q=70&auto=format&fit=crop",
//             title: "Full cooling teardown",
//             desc: "The fan and heatsink assembly is removed carefully, keeping the drive and data untouched.",
//         },
//         {
//             img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=900&q=70&auto=format&fit=crop",
//             title: "Deep dust & debris removal",
//             desc: "Heatsink fins, vents, and blades are cleaned of compacted dust that restricts airflow.",
//         },
//         {
//             img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=70&auto=format&fit=crop",
//             title: "Repaste & load testing",
//             desc: "Fresh thermal paste is applied and temperatures are verified under real load before it's returned.",
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
//                                     <p className="font-body text-xs text-white mt-2 leading-relaxed">{s.desc}</p>
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
        { icon: ScanSearch, title: "Free Inspection", desc: "We check fan noise, airflow, and temperatures under load to pinpoint the fault." },
        { icon: FileCheck2, title: "Honest Quote", desc: "You get a clear price and timeline before any repair work begins." },
        { icon: Wrench, title: "Clean / Repair / Replace", desc: "We clean the cooling path, repaste, or fit a new fan — only what's actually needed." },
        { icon: ShieldCheck, title: "Testing", desc: "Temperatures are verified under real load before we call it done." },
        { icon: PackageCheck, title: "Ready to Collect", desc: "Your laptop is returned running cool, quiet, and with your data intact." },
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
        "Keep using a laptop that shuts down or restarts unexpectedly under load",
        "Block the vents by using the laptop on a bed, pillow, or soft surface",
        "Open the chassis yourself to clean the fan if you're unsure of the model",
        "Ignore a fan that's grinding or squealing louder over time",
    ];
    const dos = [
        "Shut the laptop down if it feels unusually hot or shuts off on its own",
        "Use it on a hard, flat surface until the fan is inspected",
        "Note when the noise or heat started, and what you were doing at the time",
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
        { icon: Lock, title: "Data Kept Intact", desc: "Cooling repairs never touch your drive or files." },
        { icon: Clock, title: "24–48 Hour Turnaround", desc: "Most fan and cooling repairs are completed within one to two working days." },
        { icon: ShieldCheck, title: "Genuine / OEM-Matched Fans", desc: "Every replacement fan is sourced and tested for your exact model." },
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
        { q: "Does a noisy fan always mean it needs replacing?", a: "Not always. A lot of fan noise comes from trapped dust or debris on the blades, which a deep clean resolves. We only recommend a full fan replacement if the motor or bearing itself has actually worn out." },
        { q: "Will cleaning the fan affect my files or data?", a: "No. Fan and cooling repairs are done entirely at the hardware level around the cooling assembly and never involve the storage drive, so your files are unaffected." },
        { q: "My laptop shuts down randomly under load — is that the fan?", a: "It's one of the most common causes. When cooling can't keep up, the system shuts itself down to protect the CPU. We run a full thermal diagnostic under load to confirm whether it's the fan, dust blockage, or dried-out thermal paste." },
        { q: "How often should thermal paste be replaced?", a: "Typically every 2–3 years, or sooner if the laptop is used heavily for gaming, rendering, or other sustained workloads. Dried-out paste is one of the most common causes of gradual overheating." },
        { q: "How long does a fan or cooling repair take?", a: "A clean and repaste is often same-day. A full fan replacement typically takes 24 to 48 hours depending on part availability." },
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

export default function LaptopFanRepairServicePage() {
    return (
        <div className="font-body bg-white min-h-screen">
            <style>{FONT_STYLES}</style>

            <Breadcrumb
                title="Laptop CPU Fan Repair & Replacement"
                subtitle="Loud fans, overheating, dust build-up, or a dead cooling fan — repaired properly, with your data kept intact."
                trail={[
                    { label: "Home", href: "/" },
                    { label: "Services", href: "/" },
                    { label: "CPU Fan Repair & Replacement", href: "#laptop-fan-repair-service" },
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