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
    Server,
    HardDrive,
    Database,
    ShieldOff,
    RotateCcw,
    Cpu,
} from "lucide-react";

/* ---------------------------------------------------------
   Swetayan Technologies — RAID Server Recovery
   Reuses the exact design tokens, motion language and brand
   mark from the Home / About / Services / MacBook / CCTV / NAS
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
                <Server className="w-10 h-10 text-neutral-600" />
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
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=70&auto=format&fit=crop"
                alt="Rack server with RAID drive bays during diagnostics"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/95 to-neutral-950/80" />
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="max-w-7xl mx-auto px-5 py-14 md:py-16 relative">
                <div className="flex items-center gap-2 mb-4">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-orange-500" />
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.2em] text-orange-400">CLEAN-ROOM-STANDARD LAB</span>
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
        <section className="bg-[#ff8904] py-14 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-2xl animate-glow" />
            <Reveal>
                <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-6 relative">
                    <div>
                        <h3 className="font-display font-bold text-2xl sm:text-3xl text-neutral-950 tracking-tight">
                            Server down with a degraded or failed RAID array?
                        </h3>
                        <p className="font-body text-neutral-900/80 mt-2">
                            Don't force a rebuild or reinitialize the controller first — get a free diagnosis before anything else touches the disks.
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

/* ---------- intro + stats ---------- */

function Intro() {
    const [ref, inView] = useInView(0.4);
    const stats = [
        { value: 15, suffix: "+", label: "Years recovering servers" },
        { value: 2900, suffix: "+", label: "RAID/server jobs recovered" },
        { value: 95, suffix: "%", label: "Success rate" },
        { value: 48, suffix: "hr", label: "Typical diagnosis time" },
    ];
    return (
        <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-2 gap-14 items-center">
                <Reveal>
                    <span className="font-mono text-xs tracking-[0.2em] text-orange-600">RAID SERVER RECOVERY</span>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 mt-3 tracking-tight leading-tight">
                        Multi-disk failure, a dead controller, or a corrupted virtual disk — we still get your server back online.
                    </h2>
                    <p className="font-body text-neutral-600 mt-5 leading-relaxed">
                        Server-grade RAID isn't a single point of failure — it's a
                        hardware or software array spanning multiple disks, managed by a
                        controller with its own cache and metadata, running production
                        databases, virtual machines, or file shares on top. That makes a
                        failed array harder to recover from with generic tools, but not
                        impossible in the right hands. We work with Dell PowerEdge, HPE
                        ProLiant, and other rack and tower servers — through multi-disk
                        failure, RAID controller faults, failed rebuilds, and corrupted
                        VMFS, ext4, NTFS, or database volumes. We diagnose first, quote
                        honestly, and only charge the recovery fee once your data is
                        actually back.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-8">
                        <a href="#contact" className="bg-orange-500 hover:bg-orange-400 hover:scale-105 text-neutral-950 font-body font-semibold px-6 py-3 rounded-md transition-all flex items-center gap-2">
                            Book a Free Diagnosis <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </Reveal>
                <Reveal delay={150}>
                    <div className="rounded-2xl overflow-hidden mb-6 border border-neutral-200">
                        <Img
                            src="/ChatGPT Image Aug 6, 2026, 11_55_34 AM.png"
                            alt="Rack-mounted server with drive bays open during inspection"
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

/* ---------- systems / RAID types we recover ---------- */

function SystemsSupported() {
    const items = [
        { img: "/pexels-pok-rie-33563-1432680.jpg", label: "Dell PowerEdge" },
        { img: "/pexels-cookiecutter-37605910.jpg", label: "HPE ProLiant" },
        { img: "/pexels-cottonbro-8720589.jpg", label: "Hardware & Software RAID" },
        { img: "/pexels-sejio402-6466141.jpg", label: "VMware / Hyper-V Datastores" },
        { img: "/pexels-cookiecutter-17489152.jpg", label: "SQL / Exchange Servers" },
        { img: "/pexels-vladimirsrajber-13963756.jpg", label: "RAID 0/1/5/6/10/50/60" },
    ];
    return (
        <section className="bg-white py-14 border-y border-neutral-100">
            <div className="max-w-7xl mx-auto px-5">
                <Reveal>
                    <p className="font-mono text-xs tracking-[0.2em] text-black text-center mb-8">SYSTEMS WE RECOVER FROM</p>
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

/* ---------- server failure cases (detailed) ---------- */

function RecoveryCases() {
    const cases = [
        {
            icon: Server,
            title: "Degraded & Multi-Disk Failure",
            desc: "A second or third disk failing beyond the array's fault tolerance is the most common cause of total server downtime.",
            points: ["Multiple simultaneous disk failures", "Array beyond redundancy threshold", "Predictive failure warnings ignored"],
        },
        {
            icon: Cpu,
            title: "RAID Controller Failure",
            desc: "A dead or faulty controller can make an otherwise healthy array unreadable, and swapping controllers carelessly risks the config.",
            points: ["Dead or malfunctioning RAID card", "Lost or mismatched controller config", "Cache battery / BBU failures"],
        },
        {
            icon: RotateCcw,
            title: "Failed Rebuilds & Reinitializations",
            desc: "A rebuild that fails partway, or an accidental reinitialize, can overwrite array metadata needed for recovery.",
            points: ["Rebuild failed or aborted mid-way", "Accidental array reinitialization", "Incorrect disk order after replacement"],
        },
        {
            icon: Database,
            title: "Corrupted VMs & Database Volumes",
            desc: "Virtual machine datastores and production databases sitting on the array can corrupt independently of the RAID itself.",
            points: ["Corrupted VMFS/VHD/VHDX datastores", "Damaged SQL Server / Exchange databases", "Unmountable ext4/XFS/NTFS volumes"],
        },
        {
            icon: ShieldOff,
            title: "Ransomware & Security Incidents",
            desc: "Production servers are high-value ransomware targets — we assess what's recoverable without paying a ransom.",
            points: ["Ransomware-encrypted volumes", "Compromised domain/admin accounts", "Deleted logs or backup catalogs"],
        },
        {
            icon: HardDrive,
            title: "Power Events & Physical Damage",
            desc: "Surges, failed PSUs, or physical shock to a rack server can damage drives and controllers together.",
            points: ["Power surge or failed PSU", "Fire, flood, or physical shock", "Overheating-related drive failure"],
        },
    ];
    return (
        <section className="bg-neutral-50 py-20">
            <div className="max-w-7xl mx-auto px-5">
                <Reveal>
                    <div className="max-w-2xl mb-14">
                        <span className="font-mono text-xs tracking-[0.2em] text-orange-600">SERVER ISSUES WE HANDLE</span>
                        <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 mt-3 tracking-tight">
                            Every kind of RAID failure, one lab.
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
//             title: "Controller & array mapping",
//             desc: "We document RAID level, stripe size, disk order, and controller metadata before touching anything.",
//         },
//         {
//             img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=70&auto=format&fit=crop",
//             title: "Disk-by-disk imaging",
//             desc: "Every member disk is imaged individually in our lab, so recovery work never runs against the originals.",
//         },
//         {
//             img: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=900&q=70&auto=format&fit=crop",
//             title: "Virtual RAID reconstruction",
//             desc: "The array, VMs, and databases are reconstructed virtually from the disk images to extract data intact.",
//         },
//     ];
//     return (
//         <section className="bg-neutral-950 py-20">
//             <div className="max-w-7xl mx-auto px-5">
//                 <Reveal>
//                     <div className="max-w-2xl mb-14">
//                         <span className="font-mono text-xs tracking-[0.2em] text-orange-500">INSIDE THE LAB</span>
//                         <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mt-3 tracking-tight">
//                             What happens to your server.
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
        { icon: ScanSearch, title: "Free Diagnosis", desc: "We inspect the array and controller to identify whether the fault is logical, drive-level, or controller-level." },
        { icon: FileCheck2, title: "Honest Quote", desc: "You get a clear price and timeline before any recovery work begins." },
        { icon: Wrench, title: "Recovery", desc: "Our engineers recover the data using the method the fault actually calls for." },
        { icon: ShieldCheck, title: "Verification", desc: "Recovered VMs, databases, and files are checked and verified before handover." },
        { icon: PackageCheck, title: "Secure Delivery", desc: "Your data is returned on a drive of your choice, securely." },
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
        "Force a rebuild or 'foreign config import' without knowing which disk actually failed",
        "Reinitialize the array or reinstall the OS before checking for recoverable data",
        "Swap disk order or slots while troubleshooting a degraded array",
        "Keep power-cycling a server that's showing controller or predictive-failure errors",
    ];
    const dos = [
        "Power down the server as soon as you notice a degraded, offline, or failed array",
        "Label each disk with its bay/slot number before removing anything",
        "Record any controller error codes or event log messages",
        "Bring or ship all member disks together, along with the controller if possible",
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
        { icon: Lock, title: "No Data, No Charge", desc: "If we can't recover it, you don't pay the recovery fee." },
        { icon: Clock, title: "24–48 Hour Diagnosis", desc: "Most servers and arrays are assessed within one to two working days." },
        { icon: ShieldCheck, title: "Clean-Room-Standard Handling", desc: "Every disk is opened and handled under controlled conditions." },
        { icon: Zap, title: "Confidential by Default", desc: "Your data is never viewed beyond what recovery requires." },
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
        { q: "Two disks failed in my RAID 5 array — can it still be recovered?", a: "RAID 5 tolerates one disk failure by design, so a second failure typically takes the array offline. Recovery is still often possible by imaging the surviving disks and reconstructing the array virtually, but stopping immediately matters." },
        { q: "My RAID controller died — is the data on the disks still safe?", a: "In most cases, yes. The data lives on the disks themselves, not the controller. As long as the disks aren't reformatted or rebuilt incorrectly on a replacement controller, the underlying data is usually intact." },
        { q: "A rebuild failed halfway through — what should I do?", a: "Stop the server immediately and avoid retrying the rebuild. A failed rebuild can leave array metadata inconsistent, and repeated attempts reduce the chances of a clean recovery." },
        { q: "Can you recover a corrupted VMware or Hyper-V datastore?", a: "Yes. We image the underlying array first, then work at the datastore level to extract and repair individual VMs, VHDs, or VMDKs where possible." },
        { q: "What happens if my server's data can't be recovered?", a: "You only pay for the diagnosis, not the recovery fee. We'll always tell you upfront if an array isn't recoverable rather than attempting work we don't expect to succeed." },
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

export default function RAIDServerRecoveryPage() {
    return (
        <div className="font-body bg-white min-h-screen">
            <style>{FONT_STYLES}</style>

            <Breadcrumb
                title="RAID Server Recovery"
                subtitle="Multi-disk failure, dead controllers, failed rebuilds, or corrupted VMs — recovered honestly and handled with care."
                trail={[
                    { label: "Home", href: "#" },
                    { label: "Services", href: "#services" },
                    { label: "RAID Server Recovery", href: "#raid-server-recovery" },
                ]}
            />
            <Intro />
            <SystemsSupported />
            <RecoveryCases />
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