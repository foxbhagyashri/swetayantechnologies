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
    Power,
    RotateCcw,
    MonitorX,
    Cpu,
    Settings2,
    TerminalSquare,
    RefreshCw,
} from "lucide-react";

/* ---------------------------------------------------------
   Swetayan Technologies — Laptop Booting Issue Repair
   Service
   Reuses the exact design tokens, motion language and brand
   mark from the Home / About / Services / Data Recovery /
   Virus Removal / Power Repair / Overheating / Screen / Fan
   / Not Charging / Hinge Repair / SSD Installation pages
   (Space Grotesk + Inter + IBM Plex Mono, orange-500 accent,
   neutral-950 chrome).
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
                <Power className="w-10 h-10 text-neutral-600" />
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
                alt="Technician diagnosing a laptop that won't boot"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/95 to-neutral-950/80" />
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="max-w-7xl mx-auto px-5 py-14 md:py-16 relative">
                <div className="flex items-center gap-2 mb-4">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-orange-500" />
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.2em] text-orange-400">CERTIFIED BOOT & STARTUP DIAGNOSTICS</span>
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
                            Laptop stuck on a black screen or logo?
                        </h3>
                        <p className="font-body text-neutral-900/80 mt-2">
                            Get a free boot diagnosis and know exactly what's wrong before you pay anything.
                        </p>
                    </div>
                    <a href="#contact" className="bg-neutral-950 hover:bg-neutral-800 hover:scale-105 text-white font-body font-semibold px-6 py-3 rounded-md whitespace-nowrap transition-all flex items-center gap-2">
                        Get Free Boot Diagnosis <ArrowRight className="w-4 h-4" />
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
        { value: 7400, suffix: "+", label: "Boot failures fixed" },
        { value: 100, suffix: "%", label: "Data preserved, zero loss" },
        { value: 24, suffix: "hr", label: "Typical turnaround" },
    ];
    return (
        <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-2 gap-14 items-center">
                <Reveal>
                    <span className="font-mono text-xs tracking-[0.2em] text-orange-600">BOOTING ISSUE REPAIR</span>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 mt-3 tracking-tight leading-tight">
                        Laptop won't start? We find out why before we touch anything.
                    </h2>
                    <p className="font-body text-neutral-600 mt-5 leading-relaxed">
                        A laptop that won't boot can mean a dozen different things — a
                        corrupted operating system, a failing drive, bad RAM, a damaged
                        boot sector, or a hardware fault further down the chain. We run a
                        structured diagnostic to isolate the actual cause instead of
                        guessing, and because we're a data recovery lab first, your files
                        are never at risk while we work — even if the fix means
                        reinstalling the OS.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-8">
                        <a href="#contact" className="bg-orange-500 hover:bg-orange-400 hover:scale-105 text-neutral-950 font-body font-semibold px-6 py-3 rounded-md transition-all flex items-center gap-2">
                            Book a Free Boot Diagnosis <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </Reveal>
                <Reveal delay={150}>
                    <div className="rounded-2xl overflow-hidden mb-6 border border-neutral-200">
                        <Img
                            src="/ChatGPT Image Aug 31, 2026, 11_53_44 AM.png"
                            alt="Technician running boot diagnostics on a laptop"
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
        { img: "/pexels-artempodrez-4884116.jpg", label: "Black Screen on Power-Up" },
        { img: "/pexels-tima-miroshnichenko-6611937.jpg", label: "Stuck at Logo Screen" },
        { img: "/computer-repeatedly-restarts-when-trying-to-boot-up-v0-73u4ex9tar1h1.png", label: "Boot Loop / Restarts Repeatedly" },
        { img: "/pexels-thefullonmonet-28379999 (1).jpg", label: "Blue / Black Error Screen" },
        { img: "/pexels-cup-of-couple-6633283.jpg", label: "'No Bootable Device' Message" },
        { img: "/images (42).jfif", label: "Fans Spin, Screen Stays Dark" },
    ];
    return (
        <section className="bg-white py-14 border-y border-neutral-100">
            <div className="max-w-7xl mx-auto px-5">
                <Reveal>
                    <p className="font-mono text-xs tracking-[0.2em] text-neutral-400 text-center mb-8">SIGNS YOUR LAPTOP NEEDS BOOT REPAIR</p>
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
            icon: MonitorX,
            title: "Black Screen / No Display Boot",
            desc: "Laptop powers on — fans spin, lights come on — but nothing ever shows on screen.",
            points: ["Display vs. motherboard fault isolation", "External monitor test", "RAM & GPU reseating"],
        },
        {
            icon: RotateCcw,
            title: "Boot Loop Repair",
            desc: "Laptop restarts itself over and over before ever reaching the desktop.",
            points: ["Boot log analysis", "Faulty startup driver removal", "Power circuit inspection"],
        },
        {
            icon: TerminalSquare,
            title: "Corrupted OS / Boot Sector",
            desc: "Windows won't load because system files, the bootloader, or the boot sector are damaged.",
            points: ["Boot record repair (MBR/GPT)", "System file restoration", "Startup repair without wiping data"],
        },
        {
            icon: Settings2,
            title: "BIOS / UEFI Recovery",
            desc: "The laptop won't get past the BIOS or UEFI screen, or boot order settings have gone wrong.",
            points: ["BIOS/UEFI reset & reconfiguration", "Firmware update where needed", "Boot priority correction"],
        },
        {
            icon: Cpu,
            title: "Failing Drive Diagnosis",
            desc: "A dying hard drive or SSD is often the real reason a laptop refuses to boot.",
            points: ["Drive health & SMART check", "Data recovery before replacement", "Fresh install on new drive"],
        },
        {
            icon: RefreshCw,
            title: "Clean Reinstall & Recovery",
            desc: "When repair isn't possible, a clean OS reinstall with your data recovered and restored first.",
            points: ["Data backed up before reinstall", "Fresh, activated OS install", "Drivers & essential apps restored"],
        },
    ];
    return (
        <section className="bg-neutral-50 py-20">
            <div className="max-w-7xl mx-auto px-5">
                <Reveal>
                    <div className="max-w-2xl mb-14">
                        <span className="font-mono text-xs tracking-[0.2em] text-orange-600">WHAT WE HANDLE</span>
                        <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 mt-3 tracking-tight">
                            Every kind of boot failure, one visit.
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

// function LabGallery() {
//     const shots = [
//         {
//             img: "https://images.unsplash.com/photo-1591405351990-4726e331f141?w=900&q=70&auto=format&fit=crop",
//             title: "Full drive backup",
//             desc: "Before any repair or reinstall begins, your data is imaged and verified so nothing is ever at risk.",
//         },
//         {
//             img: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=900&q=70&auto=format&fit=crop",
//             title: "Boot-path diagnostics",
//             desc: "We trace the failure through BIOS, bootloader, OS, and hardware to isolate the exact point it breaks.",
//         },
//         {
//             img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=70&auto=format&fit=crop",
//             title: "Repair, boot & verify",
//             desc: "The fix is applied, the laptop is booted through several full cycles, and your data is confirmed intact.",
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
        { icon: ScanSearch, title: "Free Boot Diagnosis", desc: "We power-cycle the laptop and trace exactly where in the boot sequence it's failing." },
        { icon: FileCheck2, title: "Honest Quote", desc: "You get a clear price for the fix before any repair, reinstall, or part replacement begins." },
        { icon: Wrench, title: "Backup & Repair", desc: "Your data is backed up first, then the boot issue is repaired at its actual root cause." },
        { icon: RefreshCw, title: "Multi-Cycle Boot Testing", desc: "The laptop is powered through several full restart cycles to confirm the fix holds." },
        { icon: PackageCheck, title: "Ready to Collect", desc: "Your laptop is returned booting cleanly, with every file exactly where you left it." },
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
        "Keep hard-powering the laptop off and on repeatedly, since this can worsen boot or drive damage",
        "Run random 'boot repair' tools downloaded online without a backup first",
        "Reset or reinstall Windows yourself if you haven't backed up your files",
        "Ignore a burning smell, repeated clicking, or unusual heat during power-on",
    ];
    const dos = [
        "Note exactly what you see — black screen, logo freeze, an error message, or restart loop",
        "Note anything that changed recently: an update, a fall, a spill, or a power cut",
        "Try booting on AC power only, in case it's a battery-related issue",
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
        { icon: Lock, title: "Zero Data Loss", desc: "Your drive is fully backed up and verified before any repair or reinstall begins." },
        { icon: Clock, title: "2–24 Hour Turnaround", desc: "Most boot repairs are completed within a few hours, same day where possible." },
        { icon: ShieldCheck, title: "Root-Cause Diagnosis", desc: "We isolate the actual cause of the failure instead of guessing or swapping parts blindly." },
        { icon: Zap, title: "Warranty on Repair", desc: "Every boot repair we complete is backed by a service warranty." },
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
        { q: "Will I lose my files if my laptop won't boot?", a: "Not through us. We back up and verify your data first, whether the fix is a boot repair, a drive swap, or a clean OS reinstall." },
        { q: "My laptop turns on but the screen stays black — what's wrong?", a: "This usually points to a display, RAM, or graphics fault rather than the OS itself. Our free diagnosis isolates which one it is before any repair." },
        { q: "Can a boot loop damage my laptop further?", a: "Repeated forced restarts can stress a failing drive or power circuit further, so it's best to stop power-cycling it and get it diagnosed." },
        { q: "Do I need a full OS reinstall, or can it be repaired?", a: "Most boot failures can be repaired without touching your data. A reinstall is only used as a last resort, and always after your files are backed up." },
        { q: "How long does a boot repair take?", a: "Most boot repairs are completed within 2 to 4 hours. Drive failures or full reinstalls may take up to 24 hours." },
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

export default function LaptopBootingIssueRepairServicePage() {
    return (
        <div className="font-body bg-white min-h-screen">
            <style>{FONT_STYLES}</style>

            <Breadcrumb
                title="Laptop Booting Issue Repair Service"
                subtitle="Black screens, boot loops, and stuck logos diagnosed and fixed — with zero data loss."
                trail={[
                    { label: "Home", href: "#" },
                    { label: "Services", href: "#services" },
                    { label: "Booting Issue Repair", href: "#laptop-booting-issue-repair-service" },
                ]}
            />
            <Intro />
            <SymptomsGrid />
            <ServiceCases />
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