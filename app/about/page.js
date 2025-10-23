export const metadata = {
  title: "About — AUREON CAPITAL LIMITED",
};

const milestones = [
  {
    year: "2025",
    description: "Aureon Capital Limited incorporated in Hong Kong to serve institutional investors across Asia-Pacific.",
  },
  {
    year: "2026",
    description: "Expanded macro research coverage to 12 jurisdictions with dedicated policy tracking.",
  },
  {
    year: "2027",
    description: "Launched systematic research partnerships spanning digital assets, FX, and rates markets.",
  },
];

export default function Page() {
  return (
    <div className="space-y-16">
      <header className="space-y-6 max-w-3xl">
        <p className="eyebrow">Our Firm</p>
        <h1 className="heading-lg text-ink">Institutional insight rooted in disciplined research and governance.</h1>
        <p className="copy-lg">
          AUREON CAPITAL LIMITED is a Hong Kong–incorporated consulting and analytics firm focusing on digital transformation,
          algorithmic trading frameworks, and market intelligence for global institutions navigating structural change.
        </p>
      </header>

      <section className="grid gap-12 lg:grid-cols-[1.2fr,0.8fr] items-start">
        <div className="space-y-8">
          <h2 className="heading-md text-ink">What defines our practice</h2>
          <ul className="space-y-6 text-sm text-muted leading-relaxed">
            <li>
              <strong className="text-ink">Systems Perspective.</strong> We connect macro, policy, and technology signals into operating
              strategies that endure beyond market cycles.
            </li>
            <li>
              <strong className="text-ink">Governance First.</strong> Mandates are structured to align with regulatory obligations, risk
              frameworks, and transparent decision rights.
            </li>
            <li>
              <strong className="text-ink">Co-creation.</strong> We integrate with executive and investment teams, building capabilities and
              processes that remain long after initial engagement.
            </li>
          </ul>
        </div>
        <div className="card space-y-4">
          <h3 className="heading-md text-ink">Company Information</h3>
          <dl className="grid gap-3 text-sm text-muted">
            <div>
              <dt className="font-semibold text-ink">Business Registration No.</dt>
              <dd>78966763</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Date of Incorporation</dt>
              <dd>17 October 2025</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Registered Office</dt>
              <dd>Unit 2A, 17/F, Glenealy Tower, No.1 Glenealy, Central, Hong Kong</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Company Secretary</dt>
              <dd>Sleek Hong Kong Limited</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="rounded-[32px] border border-black/10 bg-white/70 p-10 space-y-10">
        <div className="space-y-4">
          <p className="eyebrow">Leadership</p>
          <h2 className="heading-md text-ink">Mr. LIAO Zelong 廖澤龍 — Founder</h2>
          <p className="copy-lg">
            Mr. Liao built Aureon Capital after leading systematic trading and digital transformation initiatives across
            Asia-Pacific markets. His work integrates quantitative research, geopolitical insight, and digital asset expertise to
            help clients build enduring competitive advantage.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3 text-sm text-muted">
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-[0.3em] text-primary">Experience</h3>
            <p>15+ years building systematic investment processes and risk governance frameworks.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-[0.3em] text-primary">Expertise</h3>
            <p>Macro research, algorithmic execution, digital asset infrastructure, policy analysis.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-[0.3em] text-primary">Mission</h3>
            <p>To help institutions convert information and technology into resilient capital strategies.</p>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="heading-md text-ink">Milestones</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {milestones.map((item) => (
            <div key={item.year} className="card-muted">
              <p className="text-xs uppercase tracking-[0.3em] text-primary">{item.year}</p>
              <p className="text-sm text-muted leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
