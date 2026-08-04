import React, { useState, useEffect, useRef } from "react";
import {
  HardDrive,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Home,
  ChevronRight,
  Send,
  CheckCircle2,
  Truck,
  Building2,
  ShieldCheck,
} from "lucide-react";

/* ---------------------------------------------------------
   Swetayan Technologies — Contact Us
   Reuses the exact design tokens, motion language and brand
   mark from the Home / About / Services pages (Space Grotesk +
   Inter + IBM Plex Mono, orange-500 accent, neutral-950 chrome).
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

  .input-field {
    background: #fff;
    border: 1px solid #e5e5e5;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .input-field:focus {
    outline: none;
    border-color: #f97316;
    box-shadow: 0 0 0 3px rgba(249,115,22,0.15);
  }
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

/* ---------- inline social icons (lucide no longer ships brand marks) ---------- */

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 9h2.5V6h-2.5c-2.2 0-4 1.8-4 4v2H8v3h2v6h3v-6h2.5l.5-3H13v-1.7c0-.7.6-1.3 1.3-1.3Z" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="7.5" y1="10" x2="7.5" y2="17" />
      <circle cx="7.5" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11.5 17v-4.2c0-1.6 1-2.8 2.5-2.8s2.5 1.2 2.5 2.8V17" />
    </svg>
  );
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
        src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1600&q=70&auto=format&fit=crop"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/95 to-neutral-950/80" />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="max-w-7xl mx-auto px-5 py-14 md:py-16 relative">
        <div className="flex items-center gap-2 mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-orange-500" />
          </span>
          <span className="font-mono text-[11px] tracking-[0.2em] text-orange-400">USUALLY REPLY WITHIN THE HOUR</span>
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

/* ---------- quick contact cards ---------- */

function QuickContact() {
  const cards = [
    { icon: Phone, title: "Call Us", value: "+91 98765 43210", href: "tel:+919876543210", cta: "Tap to call" },
    { icon: Mail, title: "Email Us", value: "hello@swetayantech.com", href: "mailto:hello@swetayantech.com", cta: "Tap to email" },
    { icon: MapPin, title: "Visit the Lab", value: "Shivaji Nagar, Pune, MH", href: "#map", cta: "Get directions" },
    { icon: Clock, title: "Working Hours", value: "Mon–Sat, 10am–7pm", href: null, cta: "Sunday: closed" },
  ];
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 90}>
              <div className="group h-full border border-neutral-200 hover:border-orange-300 hover:shadow-lg rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
                <div className="w-11 h-11 rounded-lg bg-orange-500 flex items-center justify-center mb-5">
                  <c.icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="font-display font-semibold text-base text-neutral-900">{c.title}</h3>
                {c.href ? (
                  <a href={c.href} className="font-body text-sm text-neutral-600 mt-2 block hover:text-orange-600 transition-colors">
                    {c.value}
                  </a>
                ) : (
                  <p className="font-body text-sm text-neutral-600 mt-2">{c.value}</p>
                )}
                <p className="font-mono text-[11px] text-orange-500 mt-3">{c.cta}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- form + map/details split ---------- */

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "Data Recovery", message: "" });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-neutral-50 py-20">
      <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-5 gap-10">
        <Reveal className="lg:col-span-3">
          <div className="bg-white border border-neutral-200 rounded-2xl p-8">
            <span className="font-mono text-xs tracking-[0.2em] text-orange-600">GET IN TOUCH</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 mt-3 tracking-tight">
              Tell us what's going on with your device.
            </h2>
            <p className="font-body text-neutral-500 mt-3 leading-relaxed">
              Share a few details and we'll get back to you with next steps — usually within the hour during working hours.
            </p>

            {submitted ? (
              <div className="mt-8 bg-orange-50 border border-orange-200 rounded-xl p-6 flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-display font-semibold text-neutral-900">Message received.</p>
                  <p className="font-body text-sm text-neutral-600 mt-1">
                    Thanks, {form.name || "there"} — we'll reach out shortly at {form.phone || form.email || "the contact you provided"}.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-body text-sm font-medium text-neutral-700 block mb-1.5" htmlFor="name">
                      Full name
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="input-field w-full rounded-md px-4 py-2.5 font-body text-sm text-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="font-body text-sm font-medium text-neutral-700 block mb-1.5" htmlFor="phone">
                      Phone number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 00000 00000"
                      className="input-field w-full rounded-md px-4 py-2.5 font-body text-sm text-neutral-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-body text-sm font-medium text-neutral-700 block mb-1.5" htmlFor="email">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="input-field w-full rounded-md px-4 py-2.5 font-body text-sm text-neutral-900"
                  />
                </div>

                <div>
                  <label className="font-body text-sm font-medium text-neutral-700 block mb-1.5" htmlFor="service">
                    What do you need help with?
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="input-field w-full rounded-md px-4 py-2.5 font-body text-sm text-neutral-900"
                  >
                    <option>Data Recovery</option>
                    <option>Laptop Repair</option>
                    <option>RAID / NAS Recovery</option>
                    <option>Something else</option>
                  </select>
                </div>

                <div>
                  <label className="font-body text-sm font-medium text-neutral-700 block mb-1.5" htmlFor="message">
                    Describe the issue
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="e.g. Laptop hard disk making a clicking sound and won't boot..."
                    className="input-field w-full rounded-md px-4 py-2.5 font-body text-sm text-neutral-900 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-400 hover:scale-[1.02] text-neutral-950 font-body font-semibold px-6 py-3 rounded-md transition-all flex items-center gap-2"
                >
                  Send Message <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </Reveal>

        <Reveal delay={150} className="lg:col-span-2">
          <div className="flex flex-col gap-6 h-full">
            <div id="map" className="relative rounded-2xl overflow-hidden h-64">
              <Img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=900&q=70&auto=format&fit=crop"
                alt="Map area near the Swetayan Technologies lab"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-neutral-950/30" />
              <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg px-4 py-3 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
                <div className="leading-tight">
                  <p className="font-display font-semibold text-sm text-neutral-900">Swetayan Technologies Lab</p>
                  <p className="font-body text-xs text-neutral-500">Shivaji Nagar, Pune, Maharashtra</p>
                </div>
              </div>
            </div>

            <div className="bg-neutral-950 rounded-2xl p-7 flex-1">
              <div className="flex items-center gap-2.5 mb-4">
                <Truck className="w-5 h-5 text-orange-400" />
                <h3 className="font-display font-semibold text-white">Can't visit in person?</h3>
              </div>
              <p className="font-body text-sm text-neutral-400 leading-relaxed">
                Ship your drive or laptop to our lab in its original packaging where possible.
                We'll confirm receipt, run a free diagnosis, and send you a quote before any work begins.
              </p>
              <div className="flex items-center gap-2.5 mt-5 pt-5 border-t border-neutral-800">
                <Building2 className="w-4 h-4 text-neutral-500 shrink-0" />
                <p className="font-mono text-xs text-neutral-500">GSTIN available on request for business clients</p>
              </div>
            </div>

            <div className="border border-neutral-200 rounded-2xl p-6 flex items-center gap-4">
              <ShieldCheck className="w-8 h-8 text-orange-500 shrink-0" />
              <p className="font-body text-sm text-neutral-600 leading-relaxed">
                Every device and drive we receive is logged, tracked, and handled confidentially from drop-off to delivery.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- social + closing strip ---------- */

function SocialStrip() {
  const links = [
    { icon: InstagramIcon, label: "Instagram", href: "#" },
    { icon: FacebookIcon, label: "Facebook", href: "#" },
    { icon: LinkedinIcon, label: "LinkedIn", href: "#" },
  ];
  return (
    <section className="bg-white py-16 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-6">
        <Reveal>
          <div className="text-center md:text-left">
            <h3 className="font-display font-bold text-xl text-neutral-900">Follow the lab.</h3>
            <p className="font-body text-sm text-neutral-500 mt-1">Repair tips, recovery stories, and behind-the-scenes from the bench.</p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="flex items-center gap-3">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                aria-label={l.label}
                className="w-11 h-11 rounded-full border border-neutral-200 hover:border-orange-400 hover:bg-orange-50 flex items-center justify-center transition-colors"
              >
                <l.icon className="w-[18px] h-[18px] text-neutral-600" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <div className="font-body bg-white min-h-screen">
      <style>{FONT_STYLES}</style>

      <Breadcrumb
        title="Contact Us"
        subtitle="Questions, quotes, or a device that needs looking at — reach us however's easiest."
        trail={[
          { label: "Home", href: "#" },
          { label: "Contact", href: "#contact" },
        ]}
      />
      <QuickContact />
      <ContactForm />
      <SocialStrip />

      <FloatingContact />
    </div>
  );
}