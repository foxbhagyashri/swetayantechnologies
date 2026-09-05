import React, { useState, useEffect, useRef } from "react";
import {
    ShieldCheck,
    Clock,
    CheckCircle2,
    ArrowRight,
    Home,
    ChevronRight,
    Lock,
    Zap,
    MessageCircle,
    Target,
    Eye,
    HardDrive,
    Laptop,
    Cpu,
    Disc3,
    UsbIcon,
    Video,
    Server,
    Database,
    Wrench,
    Users,
    Award,
    Building2,
    Heart,
} from "lucide-react";

/* ---------------------------------------------------------
   Swetayan Technologies — About Us
   Reuses the exact design tokens, motion language and brand
   mark from the Home / Services / MacBook / CCTV / NAS / RAID
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
                <Building2 className="w-10 h-10 text-neutral-600" />
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
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=70&auto=format&fit=crop"
                alt="Data recovery engineers working in the lab"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/95 to-neutral-950/80" />
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="max-w-7xl mx-auto px-5 py-14 md:py-16 relative">
                <div className="flex items-center gap-2 mb-4">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-orange-500" />
                    </span>
                    <span className="font-mono text-md tracking-[0.2em] text-orange-400">16+ YEARS IN DATA RECOVERY</span>
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
                            16 years of recovering what mattered — let's see if we can recover yours.
                        </h3>
                        <p className="font-body text-neutral-900/80 mt-2">
                            Free diagnosis, honest quotes, and no charge unless we bring your data back.
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
        { value: 16, suffix: "+", label: "Years in data recovery" },
        { value: 22000, suffix: "+", label: "Devices recovered" },
        { value: 94, suffix: "%", label: "Average success rate" },
        { value: 9, suffix: "", label: "Recovery specializations" },
    ];
    return (
        <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-2 gap-14 items-center">
                <Reveal>
                    <span className="font-mono text-xs tracking-[0.2em] text-orange-600">ABOUT SWETAYAN TECHNOLOGIES</span>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 mt-3 tracking-tight leading-tight">
                        16 years of solving the storage failures other shops turn away.
                    </h2>
                    <p className="font-body text-neutral-600 mt-5 leading-relaxed">
                        We started as a small repair bench and grew into a dedicated
                        data recovery and device repair lab, built one difficult case at
                        a time. Over 16 years, storage technology has changed several
                        times over — from spinning platters to SSDs, from single hard
                        drives to multi-disk RAID arrays — and we've grown our lab,
                        tools, and expertise alongside it. Today we recover data from
                        hard disks, laptops, MacBooks, SSDs, memory cards and USB
                        drives, CCTV recorders, NAS boxes, and RAID servers, and we
                        repair laptops when the fix is mechanical rather than data-deep.
                        What hasn't changed is how we work: diagnose honestly, quote
                        clearly, and never charge for a recovery we couldn't complete.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-8">
                        <a href="/EnquiryForm" className="bg-orange-500 hover:bg-orange-400 hover:scale-105 text-neutral-950 font-body font-semibold px-6 py-3 rounded-md transition-all flex items-center gap-2">
                            Talk to Our Team <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </Reveal>
                <Reveal delay={150}>
                    <div className="rounded-2xl overflow-hidden mb-6 border border-neutral-200">
                        <Img
                            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=70&auto=format&fit=crop"
                            alt="Engineers examining a storage device on the lab bench"
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
                                    <p className="font-body text-sm text-white mt-1.5">{s.label}</p>
                                </div>
                            );
                        })}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* ---------- vision & mission ---------- */

function VisionMission() {
    return (
        <section className="bg-neutral-950 py-20">
            <div className="max-w-7xl mx-auto px-5">
                <Reveal>
                    <div className="max-w-2xl mb-14">
                        <span className="font-mono text-xs tracking-[0.2em] text-orange-500">WHAT DRIVES US</span>
                        <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mt-3 tracking-tight">
                            Our vision and mission.
                        </h2>
                    </div>
                </Reveal>
                <div className="grid md:grid-cols-2 gap-6">
                    <Reveal>
                        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 h-full">
                            <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center mb-6">
                                <Eye className="w-6 h-6 text-neutral-950" />
                            </div>
                            <h3 className="font-display font-semibold text-xl text-white">Our Vision</h3>
                            <p className="font-body text-sm text-white mt-3 leading-relaxed">
                                To be the most trusted name in data recovery and device
                                repair — the lab people turn to first when a hard drive,
                                laptop, MacBook, RAID array, or NAS fails, because they
                                know their data will be handled honestly, securely, and
                                with genuine expertise, regardless of how complex the
                                failure is.
                            </p>
                        </div>
                    </Reveal>
                    <Reveal delay={120}>
                        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 h-full">
                            <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center mb-6">
                                <Target className="w-6 h-6 text-neutral-950" />
                            </div>
                            <h3 className="font-display font-semibold text-xl text-white">Our Mission</h3>
                            <p className="font-body text-sm text-white mt-3 leading-relaxed">
                                To recover what matters — using the right method for
                                every device and failure type, quoting honestly before
                                any work begins, protecting every file we touch, and
                                never charging a recovery fee unless we actually bring
                                the data back. We aim to keep pace with every new
                                storage technology so our customers never have to worry
                                whether we can help.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

/* ---------- services we specialize in ---------- */

function Services() {
    const services = [
        { icon: HardDrive, title: "Hard Disk Data Recovery", desc: "Physical and logical recovery from internal and external hard drives." },
        { icon: Laptop, title: "Laptop Data Recovery", desc: "Recovery from any laptop brand — Windows, boot failures, and internal drive faults." },
        { icon: Cpu, title: "Data Recovery for MacBook", desc: "Soldered SSDs, T2/Apple Silicon Macs, APFS and FileVault-protected drives." },
        { icon: Disc3, title: "SSD Data Recovery", desc: "NAND-level and controller-level recovery from solid-state and NVMe drives." },
        { icon: UsbIcon, title: "Removable Media Recovery", desc: "USB drives, memory cards, and other portable storage, however they failed." },
        { icon: Video, title: "CCTV Footage Recovery", desc: "DVR/NVR recorders, overwritten loops, and corrupted surveillance footage." },
        { icon: Server, title: "NAS Data Recovery", desc: "Synology, QNAP, and other multi-bay NAS systems and degraded RAID arrays." },
        { icon: Database, title: "RAID Server Recovery", desc: "Multi-disk servers, RAID controllers, and corrupted VM or database volumes." },
        { icon: Wrench, title: "Laptop Repair Service", desc: "Hardware diagnostics and repair for screens, keyboards, batteries, and boards." },
    ];
    return (
        <section className="bg-neutral-50 py-20">
            <div className="max-w-7xl mx-auto px-5">
                <Reveal>
                    <div className="max-w-2xl mb-14">
                        <span className="font-mono text-xs tracking-[0.2em] text-orange-600">WHAT WE DO</span>
                        <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 mt-3 tracking-tight">
                            Nine specializations, one lab.
                        </h2>
                    </div>
                </Reveal>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((s, i) => (
                        <Reveal key={s.title} delay={i * 80}>
                            <div className="group h-full bg-white border border-neutral-200 hover:border-orange-300 hover:shadow-lg rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
                                <div className="w-11 h-11 rounded-lg bg-orange-500 flex items-center justify-center mb-5">
                                    <s.icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <h3 className="font-display font-semibold text-base text-neutral-900">{s.title}</h3>
                                <p className="font-body text-sm text-neutral-600 mt-2 leading-relaxed">{s.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ---------- timeline / journey ---------- */

function Journey() {
    const milestones = [
        { year: "2009", title: "Lab founded", desc: "Started as a small repair bench focused on hard drive recovery." },
        { year: "2013", title: "Expanded to laptops & Macs", desc: "Added laptop and MacBook data recovery as demand grew." },
        { year: "2017", title: "SSD & RAID capability", desc: "Built out NAND-level SSD recovery and multi-disk RAID reconstruction." },
        { year: "2021", title: "CCTV & NAS recovery", desc: "Added DVR/NVR footage recovery and NAS/array specializations." },
        { year: "Today", title: "16 years, 9 specializations", desc: "A full-service data recovery and device repair lab under one roof." },
    ];
    return (
        <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-5">
                <Reveal>
                    <div className="max-w-2xl mb-14">
                        <span className="font-mono text-xs tracking-[0.2em] text-orange-600">OUR JOURNEY</span>
                        <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 mt-3 tracking-tight">
                            16 years, growing with the technology.
                        </h2>
                    </div>
                </Reveal>
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {milestones.map((m, i) => (
                        <Reveal key={m.year} delay={i * 100}>
                            <div className="relative h-full">
                                <span className="font-mono text-xs text-orange-500">{m.year}</span>
                                <div className="w-11 h-11 rounded-lg bg-neutral-950 flex items-center justify-center my-4">
                                    <Award className="w-5 h-5 text-orange-400" />
                                </div>
                                <h3 className="font-display font-semibold text-base text-neutral-900">{m.title}</h3>
                                <p className="font-body text-sm text-neutral-600 mt-2 leading-relaxed">{m.desc}</p>
                                {i < milestones.length - 1 && (
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

/* ---------- why choose us / values ---------- */

function WhyUs() {
    const items = [
        { icon: Lock, title: "No Data, No Charge", desc: "If we can't recover it, you don't pay the recovery fee." },
        { icon: Clock, title: "24–48 Hour Diagnosis", desc: "Most devices are assessed within one to two working days." },
        { icon: ShieldCheck, title: "Clean-Room-Standard Handling", desc: "Every device is opened and handled under controlled conditions." },
        { icon: Zap, title: "Confidential by Default", desc: "Your data is never viewed beyond what recovery requires." },
        { icon: Users, title: "Experienced Engineers", desc: "16 years of hands-on experience across every storage type." },
        { icon: Heart, title: "Honest, Every Time", desc: "We tell you the truth about recoverability before you spend a rupee." },
    ];
    return (
        <section className="bg-neutral-50 py-14">
            <div className="max-w-7xl mx-auto px-5 grid grid-cols-2 md:grid-cols-3 gap-8">
                {items.map((it, i) => (
                    <Reveal key={it.title} delay={i * 90}>
                        <div className="text-center">
                            <it.icon className="w-6 h-6 text-orange-500 mx-auto mb-3" />
                            <p className="font-display font-semibold text-sm text-neutral-900">{it.title}</p>
                            <p className="font-body text-xs text-neutral-600 mt-2 leading-relaxed">{it.desc}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}

export default function AboutUsPage() {
    return (
        <div className="font-body bg-white min-h-screen">
            <style>{FONT_STYLES}</style>

            <Breadcrumb
                title="About Swetayan Technologies"
                subtitle="16 years of honest, expert data recovery and laptop repair — across every storage technology in between."
                trail={[
                    { label: "Home", href: "#" },
                    { label: "About Us", href: "#about-us" },
                ]}
            />
            <Intro />
            <VisionMission />
            <Services />
            <Journey />
            <WhyUs />
            <CTABanner />

            <FloatingContact />
        </div>
    );
}