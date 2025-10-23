export const metadata = {
  title: "Services — AUREON CAPITAL LIMITED",
};

const services = [
  {
    title: "Strategic Advisory",
    description:
      "Design institutional digital asset strategies, target operating models, and governance frameworks aligned with regulatory expectations.",
    outcomes: [
      "Market entry strategies and board-ready policy recommendations.",
      "Operating model design covering custody, liquidity, and risk.",
      "Implementation roadmaps with measurable milestones.",
    ],
  },
  {
    title: "Systematic Research Partnerships",
    description:
      "Build integrated research pipelines that translate data and macro signals into disciplined trading and allocation decisions.",
    outcomes: [
      "Research sprints combining proprietary and third-party data.",
      "Model governance frameworks for AI- and quant-driven processes.",
      "Signal distribution and execution coordination support.",
    ],
  },
  {
    title: "Policy & Risk Intelligence",
    description:
      "Monitor regulatory evolution across key jurisdictions and convert policy change into proactive risk management actions.",
    outcomes: [
      "Jurisdictional heatmaps and regulatory impact briefings.",
      "Scenario planning and control enhancement recommendations.",
      "Stakeholder communication packs for boards and regulators.",
    ],
  },
  {
    title: "Capability Acceleration",
    description:
      "Embed with teams to build digital asset infrastructure, data platforms, and operational resilience.",
    outcomes: [
      "Technology stack assessments and integration playbooks.",
      "Vendor evaluation and partnership support across custody, execution, and data.",
      "Training programs for leadership, risk, and operations teams.",
    ],
  },
  {
    title: "Capital Ecosystem Alignment",
    description:
      "Connect with exchanges, liquidity providers, and service partners to operationalise new market opportunities responsibly.",
    outcomes: [
      "Counterparty readiness assessments and onboarding frameworks.",
      "Liquidity partner evaluation and performance scorecards.",
      "Co-marketing and education plans to scale institutional adoption.",
    ],
  },
];

const accelerators = [
  {
    name: "Insights Platform",
    detail: "Always-on access to macro, policy, and market structure dashboards curated for your investment committee.",
  },
  {
    name: "Implementation PMO",
    detail: "Dedicated programme management office aligning vendors, technology teams, and governance stakeholders.",
  },
  {
    name: "Capability Academy",
    detail: "Modular training covering risk, compliance, operations, and product to embed institutional knowledge.",
  },
];

export default function Page() {
  return (
    <div className="space-y-16">
      <header className="space-y-6 max-w-3xl">
        <p className="eyebrow">Our Capabilities</p>
        <h1 className="heading-lg text-ink">Integrated advisory and research services for institutional leaders.</h1>
        <p className="copy-lg">
          We operate as an extension of your investment and strategy teams—from framing the opportunity to executing on digital
          asset initiatives and translating intelligence into action.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {services.map((service) => (
          <div key={service.title} className="card space-y-4">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-primary">Offering</p>
              <h2 className="heading-md text-ink text-2xl">{service.title}</h2>
              <p className="text-sm text-muted leading-relaxed">{service.description}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">How we create value</p>
              <ul className="mt-3 space-y-3 text-sm text-muted leading-relaxed">
                {service.outcomes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <section className="rounded-[32px] border border-black/10 bg-white/70 p-10 space-y-6">
        <h2 className="heading-md text-ink">Engagement Model</h2>
        <p className="copy-lg">
          Each engagement is structured around discovery, research sprints, and implementation milestones. We combine on-site
          workshops with ongoing intelligence briefings to ensure momentum and accountability.
        </p>
        <div className="grid gap-6 md:grid-cols-3 text-sm text-muted">
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-[0.3em] text-primary">Discovery</h3>
            <p>Clarify objectives, governance, and risk parameters to shape the mandate.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-[0.3em] text-primary">Research & Design</h3>
            <p>Iterative research sprints translating insights into strategies and operating models.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-[0.3em] text-primary">Execution</h3>
            <p>Implementation support, capability building, and structured performance tracking.</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="heading-md text-ink">Acceleration layers</h2>
        <div className="grid gap-6 md:grid-cols-3 text-sm text-muted">
          {accelerators.map((item) => (
            <div key={item.name} className="card h-full">
              <p className="text-xs uppercase tracking-[0.3em] text-primary">{item.name}</p>
              <p className="text-sm text-muted leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
