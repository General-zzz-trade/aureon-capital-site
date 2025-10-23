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
  {
    year: "2028",
    description: "Established the Aureon Intelligence Network connecting academics, former regulators, and market operators.",
  },
];

const leadership = [
  {
    title: "Chief Strategist",
    focus: "Leads thematic research programmes that translate macro and policy signals into capital deployment frameworks.",
  },
  {
    title: "Head of Digital Infrastructure",
    focus: "Designs technology roadmaps spanning custody, market connectivity, and data engineering standards.",
  },
  {
    title: "Director of Governance & Risk",
    focus: "Chairs our governance forum, ensuring mandates align with regulatory expectations and institutional controls.",
  },
];

const principles = [
  {
    name: "Evidence-led decisions",
    description:
      "Every recommendation is backed by repeatable research processes, scenario analysis, and quantified impact assessments.",
  },
  {
    name: "Operational empathy",
    description:
      "We embed with investment, risk, and operations teams to design solutions that are practical within existing constraints.",
  },
  {
    name: "Shared accountability",
    description:
      "Mandates are structured with transparent milestones, joint steering committees, and measurable outcomes.",
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
          <h2 className="heading-md text-ink">A multidisciplinary executive committee guiding each mandate.</h2>
          <p className="copy-lg">
            Aureon Capital is led by an executive collective with backgrounds across sovereign wealth funds, digital asset
            infrastructure, central banking, and enterprise technology. The committee convenes weekly to calibrate client
            engagements, review risk dashboards, and steward the Aureon Intelligence Network.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3 text-sm text-muted">
          {leadership.map((role) => (
            <div key={role.title} className="space-y-2">
              <h3 className="text-xs uppercase tracking-[0.3em] text-primary">{role.title}</h3>
              <p>{role.focus}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1fr,1.1fr] items-start">
        <div className="card-muted space-y-4">
          <p className="eyebrow">Intelligence Network</p>
          <h2 className="heading-md text-ink">Global specialists augment our internal team.</h2>
          <p className="text-sm text-muted leading-relaxed">
            Our practitioner network spans former regulators, exchange operators, cybersecurity engineers, and data scientists
            across Asia, Europe, and the Middle East. They contribute to scenario modelling, policy interpretation, and
            implementation reviews—ensuring each engagement is grounded in on-the-ground realities.
          </p>
        </div>
        <div className="grid gap-4">
          {principles.map((principle) => (
            <div key={principle.name} className="card">
              <h3 className="heading-md text-ink text-2xl capitalize">{principle.name}</h3>
              <p className="text-sm text-muted leading-relaxed">{principle.description}</p>
            </div>
          ))}
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
