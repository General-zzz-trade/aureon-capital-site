export const metadata = {
  title: "Company Framework — AUREON CAPITAL LIMITED",
};

const structure = [
  {
    title: "Board & Leadership",
    points: [
      "Board chaired by the Founder & Managing Partner with independent advisors covering capital markets, compliance, and technology.",
      "Quarterly strategic reviews covering mandate execution, balance sheet health, and regulatory updates.",
      "Leadership scorecards track delivery across research, engineering, operations, and corporate development.",
    ],
  },
  {
    title: "Operating Committees",
    points: [
      "Investment & Research Committee governing macro outlooks, model approvals, and market intelligence distribution.",
      "Risk & Compliance Committee overseeing regulatory filings, KYC/AML controls, and incident response drills.",
      "Technology & Data Council aligning infrastructure roadmaps, cybersecurity posture, and vendor management.",
    ],
  },
];

const capabilities = [
  {
    title: "Intelligence & Advisory",
    detail:
      "Scenario analysis, competitive intelligence, and geopolitical assessments informing executive and board-level decisions.",
  },
  {
    title: "Quantitative Systems",
    detail:
      "Design, backtesting, and deployment of systematic trading strategies and liquidity provisioning frameworks.",
  },
  {
    title: "Governance & Compliance",
    detail:
      "Corporate secretarial services, regulatory submissions, and integrated policy frameworks across jurisdictions.",
  },
  {
    title: "Client Solutions",
    detail:
      "Program management for institutional clients, including onboarding, partner coordination, and delivery assurance.",
  },
];

const policies = [
  {
    name: "Risk Management",
    description:
      "Enterprise risk policies define quantitative limits, stress testing protocols, and escalation pathways for operational and market risk scenarios.",
  },
  {
    name: "Compliance & Reporting",
    description:
      "Annual compliance plans align with Hong Kong Companies Ordinance, SFC guidelines, and counterpart jurisdictional requirements.",
  },
  {
    name: "Information Security",
    description:
      "Zero-trust architecture with continuous monitoring, access governance, and disaster recovery testing across critical systems.",
  },
  {
    name: "Business Continuity",
    description:
      "Documented continuity procedures covering remote operations, data integrity, and third-party service resilience.",
  },
];

const partnerships = [
  {
    category: "Strategic Ecosystem",
    examples: ["Virtual asset exchanges", "Digital custodians", "Liquidity venues", "Institutional OTC desks"],
  },
  {
    category: "Professional Services",
    examples: ["Legal counsel", "Audit & assurance", "Corporate secretarial", "Tax & structuring"],
  },
  {
    category: "Technology Vendors",
    examples: ["Market data providers", "Cloud infrastructure", "Analytics platforms", "Cybersecurity partners"],
  },
];

export default function Page() {
  return (
    <div className="space-y-16">
      <section className="space-y-6">
        <h1 className="h1">Company Operating Framework</h1>
        <p className="p-lg max-w-3xl">
          Our corporate structure integrates strategic leadership, governance, and delivery teams to provide institutional-grade services across the digital asset value chain.
        </p>
        <p className="text-gray-300 max-w-3xl">
          The framework below outlines how we organize decision making, manage risk, and deliver trusted outcomes for clients and partners.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="h2">Governance Structure</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {structure.map((item) => (
            <div key={item.title} className="card space-y-3">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <ul className="space-y-2 text-sm text-gray-300 leading-relaxed">
                {item.points.map((point) => (
                  <li key={point} className="list-disc list-inside">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="h2">Core Capabilities</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {capabilities.map((capability) => (
            <div key={capability.title} className="card space-y-3">
              <h3 className="text-lg font-semibold text-white">{capability.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{capability.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="h2">Policies & Control Frameworks</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {policies.map((policy) => (
            <div key={policy.name} className="card space-y-3">
              <h3 className="text-lg font-semibold text-white">{policy.name}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{policy.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="h2">Partner Ecosystem</h2>
        <p className="text-gray-300 max-w-3xl">
          Strategic partners expand our reach across custody, liquidity, and compliance domains. We curate best-in-class service providers to deliver integrated solutions.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {partnerships.map((partner) => (
            <div key={partner.category} className="card space-y-3">
              <h3 className="text-lg font-semibold text-white">{partner.category}</h3>
              <ul className="space-y-2 text-sm text-gray-300 leading-relaxed">
                {partner.examples.map((example) => (
                  <li key={example} className="list-disc list-inside">
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="card space-y-4 bg-gradient-to-br from-zinc-900 to-zinc-950">
        <h2 className="h2">Engagement Assurance</h2>
        <p className="text-gray-300">
          Engagements include defined service level objectives, regulatory checkpoints, and reporting dashboards. Clients receive transparent oversight across every mandate.
        </p>
      </section>
    </div>
  );
}
