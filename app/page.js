import Link from "next/link";
import { posts } from "../content/posts";

const featuredPosts = posts.slice(0, 3);

const pillars = [
  {
    title: "Macro & Market Regimes",
    description:
      "We translate structural shifts in global liquidity, policy, and technology into decision frameworks for institutional portfolios.",
  },
  {
    title: "Digital Asset Infrastructure",
    description:
      "Advising on operating models, governance, and integration pathways for digital asset ecosystems and tokenized finance.",
  },
  {
    title: "Systematic Research & Execution",
    description:
      "Building disciplined research pipelines, data strategies, and algorithmic execution aligned to institutional controls.",
  },
];

const differentiators = [
  {
    stat: "25+",
    label: "institutional engagements informed by our cross-market intelligence.",
  },
  {
    stat: "12",
    label: "jurisdictions monitored for policy, liquidity, and regulatory change.",
  },
  {
    stat: "24/5",
    label: "global coverage that mirrors digital asset market structure.",
  },
];

export default function Page() {
  return (
    <div className="space-y-24">
      <section className="relative overflow-hidden rounded-[40px] border border-black/10 bg-white/70 hero-sheen">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/0 to-primary/5" aria-hidden />
        <div className="relative container-xl py-20 grid gap-12 lg:grid-cols-[1.2fr,0.8fr] items-center">
          <div className="space-y-8">
            <p className="eyebrow">Navigating Structural Change</p>
            <h1 className="heading-xl text-ink">
              Strategic intelligence for institutions operating at the frontier of markets and technology.
            </h1>
            <p className="copy-xl max-w-2xl">
              Aureon Capital Limited partners with sovereign, institutional, and family office clients to interpret global regime
              shifts, build resilient digital asset capabilities, and translate research into action.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/services" className="btn btn-primary">
                Explore Our Capabilities
              </Link>
              <Link href="/insights" className="btn btn-secondary">
                Read the Latest Thinking
              </Link>
            </div>
          </div>
          <div className="grid gap-6">
            <div className="card">
              <p className="text-sm uppercase tracking-[0.3em] text-muted">What we deliver</p>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden />
                  Integrated strategy across macro, policy, and digital asset structure.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden />
                  Research pipelines that convert data into disciplined positioning.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden />
                  Governance-driven implementation with measurable outcomes.
                </li>
              </ul>
            </div>
            <div className="card-muted">
              <p className="text-sm uppercase tracking-[0.3em] text-muted">Latest Insight</p>
              <Link href={`/insights/${featuredPosts[0].slug}`} className="heading-md block text-ink">
                {featuredPosts[0].title}
              </Link>
              <p className="text-sm text-muted">{featuredPosts[0].excerpt}</p>
              <Link href={`/insights/${featuredPosts[0].slug}`} className="btn btn-secondary w-fit">
                View Insight
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-xl space-y-12">
        <div className="max-w-3xl space-y-4">
          <p className="eyebrow">Disciplined Perspective</p>
          <h2 className="heading-lg text-ink">A research and advisory partner built for compounding resilience.</h2>
          <p className="copy-lg">
            Our work is anchored in repeatable processes—combining macro, policy, and market structure expertise with technology
            and data engineering so that leaders can act with conviction.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {differentiators.map((item) => (
            <div key={item.label} className="pillar-card">
              <p className="text-4xl font-semibold text-primary">{item.stat}</p>
              <p className="text-sm text-muted leading-relaxed">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-xl grid gap-12 lg:grid-cols-[1fr,1.1fr] items-center">
        <div className="space-y-6">
          <p className="eyebrow">How We Engage</p>
          <h2 className="heading-lg text-ink">From discovery to execution, we operate as an extension of your investment office.</h2>
          <p className="copy-lg">
            We embed alongside leadership teams to translate questions into research streams and actionable policy. Each mandate is
            governed by transparent milestones, with implementation support tailored to institutional controls.
          </p>
          <ul className="space-y-4 text-sm text-muted">
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden />
              Strategy diagnostic workshops that crystallise objectives and governance requirements.
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden />
              Iterative research sprints combining proprietary data, third-party intelligence, and expert networks.
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden />
              Implementation playbooks that translate findings into operating models and execution roadmaps.
            </li>
          </ul>
        </div>
        <div className="grid gap-4">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="card">
              <h3 className="heading-md text-ink text-2xl">{pillar.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[40px] border border-black/10 bg-[#14100E] text-white">
        <div className="absolute inset-0 opacity-40" aria-hidden>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-primary/70" />
        </div>
        <div className="relative container-xl py-20 space-y-10">
          <p className="eyebrow text-white/70">Leadership View</p>
          <blockquote className="max-w-3xl space-y-6">
            <p className="heading-lg text-white">
              &ldquo;Institutions succeed when insight, governance, and technology operate as a single system. We built Aureon Capital
              to deliver that synthesis for clients navigating accelerated change.&rdquo;
            </p>
            <footer className="text-sm text-white/70">
              Mr. LIAO Zelong 廖澤龍 • Founder, Aureon Capital Limited
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="container-xl space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <p className="eyebrow">Latest Thinking</p>
            <h2 className="heading-lg text-ink">Research and perspectives shaping tomorrow&rsquo;s market architecture.</h2>
            <p className="copy-lg">
              We publish concise perspectives on macro structure, policy transformation, and the digital asset ecosystem so leaders
              can act with clarity.
            </p>
          </div>
          <Link href="/insights" className="btn btn-secondary self-start">
            View All Insights
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredPosts.map((post) => (
            <article key={post.slug} className="card h-full">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">{post.category}</p>
              <h3 className="heading-md text-2xl text-ink">
                <Link href={`/insights/${post.slug}`} className="hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </h3>
              <p className="text-xs text-muted">{new Date(post.date).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })} • {post.readTime}</p>
              <p className="text-sm text-muted leading-relaxed">{post.excerpt}</p>
              <Link href={`/insights/${post.slug}`} className="btn btn-secondary w-fit">
                Read Insight
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="container-xl rounded-[32px] border border-black/10 bg-white/70 p-12 space-y-6">
        <p className="eyebrow">Engage With Us</p>
        <h2 className="heading-lg text-ink">Let&rsquo;s design a strategy calibrated to structural change.</h2>
        <p className="copy-lg max-w-3xl">
          Whether you are expanding digital asset capabilities or re-evaluating global portfolios, we tailor research-driven
          partnerships that align with your governance and objectives.
        </p>
        <Link href="/contact" className="btn btn-primary w-fit">
          Start a Conversation
        </Link>
      </section>
    </div>
  );
}
