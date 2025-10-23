export const metadata = {
  title: "Services — AUREON CAPITAL LIMITED",
};

const practices = [
  {
    title: "Digital Asset Strategy Consulting",
    description:
      "Mandate formation, competitive analysis, and regulatory navigation for institutional entry into digital assets.",
    deliverables: [
      "Target operating model design and governance frameworks",
      "Jurisdictional analysis and policy positioning",
      "Treasury and balance sheet allocation playbooks",
    ],
  },
  {
    title: "Algorithmic & Quantitative Research",
    description:
      "Development, backtesting, and deployment of systematic trading models across spot, futures, and options markets.",
    deliverables: [
      "Alpha research pipelines with model risk governance",
      "Execution algorithms and liquidity provisioning frameworks",
      "Performance analytics dashboards and reporting",
    ],
  },
  {
    title: "Market Intelligence & Risk Advisory",
    description:
      "Macro, liquidity, and geopolitical intelligence integrated with risk dashboards for trading and corporate stakeholders.",
    deliverables: [
      "Scenario analysis and stress testing",
      "Counterparty and market structure assessments",
      "Risk committees and board briefing materials",
    ],
  },
  {
    title: "Digital Transformation Consultancy",
    description:
      "AI, analytics, and automation solutions embedded into institutional operations and reporting.",
    deliverables: [
      "Workflow automation and control tower design",
      "Data architecture modernization",
      "Regulatory technology integration and change management",
    ],
  },
];

const engagementModels = [
  {
    name: "Retained Advisory",
    description:
      "Ongoing strategic partnership with scheduled governance reviews, insight delivery, and executive alignment.",
  },
  {
    name: "Program Delivery",
    description:
      "Cross-functional teams delivering defined outcomes such as exchange launches, tokenization initiatives, or risk framework upgrades.",
  },
  {
    name: "Rapid Intelligence",
    description:
      "Accelerated market assessments and due diligence for investment committees, M&A processes, or regulatory inquiries.",
  },
];

const differentiators = [
  {
    title: "Institutional Controls",
    copy: "Integrated compliance, legal, and governance expertise ensures programs meet regulatory expectations in Hong Kong and across partner jurisdictions.",
  },
  {
    title: "Technical Depth",
    copy: "Our quantitative engineers and technologists build production-grade systems with observability, model risk management, and security baked in.",
  },
  {
    title: "Insight Velocity",
    copy: "Research desks provide real-time intelligence, scenario modelling, and decision support tailored to executive cadences.",
  },
];

export default function Page() {
  return (
    <div className="space-y-16">
      <header className="space-y-4">
        <h1 className="h1">Our Core Services</h1>
        <p className="p-lg max-w-3xl">
          Integrated advisory and research offerings designed to build institutional-grade operating models in digital and global markets.
        </p>
        <p className="text-sm text-gray-400 max-w-3xl">
          Every engagement combines strategic insight, quantitative rigor, and governance oversight to deliver measurable performance and compliance outcomes.
        </p>
      </header>

      <section className="space-y-8">
        <h2 className="h2">Practice Areas</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {practices.map((practice) => (
            <div key={practice.title} className="card space-y-4">
              <div>
                <h3 className="text-2xl font-semibold text-white">{practice.title}</h3>
                <p className="mt-3 text-gray-300 leading-relaxed">{practice.description}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-primary">Key Deliverables</p>
                <ul className="mt-2 space-y-2 text-sm text-gray-300 leading-relaxed">
                  {practice.deliverables.map((item) => (
                    <li key={item} className="list-disc list-inside">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="h2">Engagement Models</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {engagementModels.map((model) => (
            <div key={model.name} className="card space-y-3">
              <h3 className="text-xl font-semibold text-white">{model.name}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{model.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="h2">Why Clients Choose AUREON</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {differentiators.map((item) => (
            <div key={item.title} className="card space-y-3">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{item.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card space-y-4 bg-gradient-to-br from-zinc-900 to-zinc-950">
        <h2 className="h2">Next Steps</h2>
        <p className="text-gray-300">
          Engage our team to scope a program, request a market assessment, or align on governance enhancements that accelerate your digital asset roadmap.
        </p>
      </section>
    </div>
  );
}