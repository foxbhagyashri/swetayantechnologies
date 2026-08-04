import React, { useState, useEffect, useRef } from "react";
import {
  HardDrive,
  MessageCircle,
  Home,
  ChevronRight,
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Send,
  CheckCircle2,
  Bookmark,
} from "lucide-react";

/* ---------------------------------------------------------
   Swetayan Technologies — Blog
   Reuses the exact design tokens, motion language and brand
   mark from the Home / About / Services / Contact pages
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
        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=70&auto=format&fit=crop"
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
          <span className="font-mono text-[11px] tracking-[0.2em] text-orange-400">FROM THE BENCH</span>
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

/* ---------- data ---------- */

const CATEGORIES = ["All", "Data Recovery", "Laptop Repair", "Prevention Tips", "Case Studies"];

const POSTS = [
  {
    id: 1,
    title: "5 Warning Signs Your Hard Drive Is About to Fail",
    excerpt: "Clicking sounds, slow file access, and repeated freezes are rarely random. Here's what your drive is actually telling you — and what to do in the first hour.",
    category: "Prevention Tips",
    date: "Jul 28, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=900&q=75&auto=format&fit=crop",
    featured: true,
  },
  {
    id: 2,
    title: "SSD vs HDD Recovery: Why the Process Isn't the Same",
    excerpt: "Solid-state drives fail differently than spinning disks, which means the recovery approach has to change too. A look at controller faults and NAND-level extraction.",
    category: "Data Recovery",
    date: "Jul 21, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=700&q=75&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "We Recovered 3 Years of Wedding Photography From a Dead RAID",
    excerpt: "A studio's four-drive RAID 5 array failed mid-season. Here's how we rebuilt it without losing a single client folder.",
    category: "Case Studies",
    date: "Jul 14, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700&q=75&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Cracked Screen, Dead Keyboard, or Both? A Repair Cost Guide",
    excerpt: "Not every laptop issue needs a full board swap. Here's how to tell what's actually broken before you pay for a repair.",
    category: "Laptop Repair",
    date: "Jul 7, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=700&q=75&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Why You Should Never Freeze a Failing Hard Drive",
    excerpt: "It's one of the oldest pieces of internet advice — and one of the most likely to turn a recoverable drive into an unrecoverable one.",
    category: "Prevention Tips",
    date: "Jun 30, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=75&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Formatted the Wrong Drive? Here's What to Do in the Next 10 Minutes",
    excerpt: "Accidental formats are recoverable far more often than people expect — but only if you stop using the drive immediately.",
    category: "Data Recovery",
    date: "Jun 23, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?w=700&q=75&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Liquid Damage: What Happens in the First 24 Hours Matters Most",
    excerpt: "A spilled cup of coffee doesn't have to be the end of your laptop — provided you avoid the most common (and most damaging) instincts.",
    category: "Laptop Repair",
    date: "Jun 16, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=700&q=75&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Inside a Chip-Level Motherboard Repair",
    excerpt: "A walkthrough of how component-level diagnosis finds the actual point of failure instead of replacing an entire board.",
    category: "Laptop Repair",
    date: "Jun 9, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=75&auto=format&fit=crop",
  },
  {
    id: 9,
    title: "How Often Should You Actually Back Up Your Data?",
    excerpt: "The honest answer depends on what you'd lose — and it's usually more often than people think.",
    category: "Prevention Tips",
    date: "Jun 2, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=700&q=75&auto=format&fit=crop",
  },
];

/* ---------- featured post ---------- */

function FeaturedPost({ post }) {
  return (
    <section className="bg-white pt-20 pb-4">
      <div className="max-w-7xl mx-auto px-5">
        <Reveal>
          <a href="#" className="group grid md:grid-cols-2 gap-8 items-center border border-neutral-200 hover:border-orange-300 hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-300">
            <div className="relative h-64 md:h-full">
              <Img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <span className="absolute top-4 left-4 bg-orange-500 text-neutral-950 font-mono text-[11px] tracking-wide px-3 py-1 rounded-full">
                FEATURED
              </span>
            </div>
            <div className="p-6 md:p-2 md:pr-10">
              <span className="font-mono text-xs tracking-[0.2em] text-orange-600">{post.category.toUpperCase()}</span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 mt-3 tracking-tight leading-tight group-hover:text-orange-600 transition-colors">
                {post.title}
              </h2>
              <p className="font-body text-neutral-500 mt-4 leading-relaxed">{post.excerpt}</p>
              <div className="flex items-center gap-4 mt-6 font-mono text-xs text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {post.readTime}
                </span>
              </div>
              <span className="inline-flex items-center gap-2 mt-6 font-body font-semibold text-sm text-neutral-900 group-hover:text-orange-600 transition-colors">
                Read the full story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- filter bar ---------- */

function FilterBar({ active, setActive, query, setQuery }) {
  return (
    <section className="bg-white sticky top-0 z-30 border-b border-neutral-100 py-5">
      <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`font-mono text-xs px-4 py-2 rounded-full border transition-colors ${
                active === cat
                  ? "bg-neutral-950 border-neutral-950 text-white"
                  : "border-neutral-200 text-neutral-600 hover:border-orange-300 hover:text-orange-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="input-field w-full rounded-full pl-10 pr-4 py-2.5 font-body text-sm text-neutral-900"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- post grid ---------- */

function PostCard({ post, delay }) {
  return (
    <Reveal delay={delay}>
      <a href="#" className="group flex flex-col h-full border border-neutral-200 hover:border-orange-300 hover:shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1">
        <div className="relative h-48 overflow-hidden">
          <Img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <span className="absolute top-3 left-3 bg-white/95 text-neutral-900 font-mono text-[10px] tracking-wide px-2.5 py-1 rounded-full">
            {post.category}
          </span>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-display font-semibold text-base text-neutral-900 leading-snug group-hover:text-orange-600 transition-colors">
            {post.title}
          </h3>
          <p className="font-body text-sm text-neutral-500 mt-2.5 leading-relaxed flex-1">{post.excerpt}</p>
          <div className="flex items-center justify-between mt-5 pt-4 border-t border-neutral-100">
            <div className="flex items-center gap-3 font-mono text-[11px] text-neutral-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {post.readTime}
              </span>
            </div>
            <Bookmark className="w-4 h-4 text-neutral-300 group-hover:text-orange-500 transition-colors" />
          </div>
        </div>
      </a>
    </Reveal>
  );
}

function PostGrid({ posts }) {
  if (posts.length === 0) {
    return (
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <p className="font-display font-semibold text-lg text-neutral-900">No articles match that search.</p>
          <p className="font-body text-sm text-neutral-500 mt-2">Try a different keyword or category.</p>
        </div>
      </section>
    );
  }
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <PostCard key={post.id} post={post} delay={(i % 3) * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- newsletter ---------- */

function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <section className="bg-neutral-950 py-16">
      <div className="max-w-7xl mx-auto px-5">
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <span className="font-mono text-xs tracking-[0.2em] text-orange-400">STAY AHEAD OF DRIVE FAILURE</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mt-3 tracking-tight">
              Get recovery tips before you need them.
            </h2>
            <p className="font-body text-neutral-400 mt-3">
              One email a month — practical, no spam, unsubscribe anytime.
            </p>

            {subscribed ? (
              <div className="mt-7 inline-flex items-center gap-2.5 bg-neutral-900 border border-neutral-800 rounded-full px-5 py-3">
                <CheckCircle2 className="w-4 h-4 text-orange-400" />
                <p className="font-body text-sm text-neutral-300">You're subscribed — welcome aboard.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-7 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-field flex-1 rounded-full px-5 py-3 font-body text-sm text-neutral-900"
                />
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-400 hover:scale-105 text-neutral-950 font-body font-semibold px-6 py-3 rounded-full transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  Subscribe <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function BlogPage() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = POSTS.filter((p) => {
    const matchesCategory = active === "All" || p.category === active;
    const matchesQuery = (p.title + p.excerpt).toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const featured = POSTS.find((p) => p.featured);
  const rest = filtered.filter((p) => p.id !== featured?.id || active !== "All" || query !== "");

  return (
    <div className="font-body bg-white min-h-screen">
      <style>{FONT_STYLES}</style>

      <Breadcrumb
        title="The Swetayan Blog"
        subtitle="Practical notes on data recovery, laptop repair, and keeping your files safe before disaster strikes."
        trail={[
          { label: "Home", href: "#" },
          { label: "Blog", href: "#blog" },
        ]}
      />

      {active === "All" && query === "" && featured && <FeaturedPost post={featured} />}

      <FilterBar active={active} setActive={setActive} query={query} setQuery={setQuery} />
      <PostGrid posts={active === "All" && query === "" ? rest : filtered} />
      <Newsletter />

      <FloatingContact />
    </div>
  );
}