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
    description: "Formalised the Aureon Network, bringing together operating partners across custody, execution, and data.",
  },
];

const leadershipGroups = [
  {
    title: "Executive Committee",
    description:
      "Senior partners overseeing client engagement design, mandate governance, and the integration of advisory teams across regions.",
  },
  {
    title: "Research Council",
    description:
      "Macro strategists, data scientists, and policy specialists who set the research agenda and steward our intelligence platforms.",
  },
  {
    title: "Risk & Assurance Board",
    description:
      "Independent advisors who review methodologies, regulatory alignment, and operational resilience across every programme.",
  },
];

const ecosystemPrograms = [
  {
    name: "Institutional Digital Asset Forum",
    summary:
      "Quarterly closed-door sessions that convene market operators, custodians, and regulators to stress-test upcoming policy shifts.",
  },
  {
    name: "Aureon Research Exchange",
    summary:
      "A subscription library of thematic briefings, live dashboards, and practitioner interviews maintained by our Research Council.",
  },
  {
    name: "Capability Accelerator Lab",
    summary:
      "Hands-on programmes co-developing tooling, playbooks, and training to embed digital asset operations within institutional controls.",
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
          <h2 className="heading-md text-ink">A multidisciplinary governance model built around shared stewardship.</h2>
          <p className="copy-lg">
            Our leadership collective combines institutional operators, market practitioners, and technology specialists. Each
            mandate is stewarded by cross-functional groups that provide independent challenge, ensure methodological rigour, and
            sustain progress beyond the initial engagement.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3 text-sm text-muted">
          {leadershipGroups.map((group) => (
            <div key={group.title} className="space-y-2">
              <h3 className="text-xs uppercase tracking-[0.3em] text-primary">{group.title}</h3>
              <p>{group.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="heading-md text-ink">Programmes powering the Aureon ecosystem</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {ecosystemPrograms.map((programme) => (
            <div key={programme.name} className="card-muted">
              <p className="text-xs uppercase tracking-[0.3em] text-primary">{programme.name}</p>
              <p className="text-sm text-muted leading-relaxed">{programme.summary}</p>
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
