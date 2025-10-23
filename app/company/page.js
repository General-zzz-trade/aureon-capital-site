export const metadata = {
  title: "Company Framework — AUREON CAPITAL LIMITED",
};

const governanceFramework = [
  {
    title: "Corporate Structure",
    points: [
      "Hong Kong–incorporated private limited company with board-level oversight.",
      "Dedicated governance committee reviewing quarterly strategic priorities.",
      "Operational subsidiaries and partners aligned via service-level agreements.",
    ],
  },
  {
    title: "Regulatory Alignment",
    points: [
      "AML/KYC standards mapped to Hong Kong SFC guidelines and global travel-rule requirements.",
      "Periodic legal reviews with external counsel to monitor emerging policy developments.",
      "Structured compliance checklists integrated into project delivery milestones.",
    ],
  },
  {
    title: "Risk Management",
    points: [
      "Enterprise risk register covering counterparty, operational, cybersecurity, and market exposures.",
      "Stress-testing templates for treasury and liquidity planning across centralized and decentralized venues.",
      "Incident response protocols with defined escalation matrix and executive sign-off.",
    ],
  },
  {
    title: "Data Governance",
    points: [
      "Segregated research and production environments with audited access controls.",
      "Encryption-at-rest and in-transit enforced across cloud infrastructure and data pipelines.",
      "Vendor assessments evaluating GDPR, PDPO, and cross-border data transfer obligations.",
    ],
  },
];

const leadership = [
  {
    name: "Mr. Liao Zelong",
    role: "Founder & Managing Director",
    bio: "15+ years in algorithmic trading, digital asset structuring, and cross-border capital advisory across Hong Kong and Singapore.",
  },
  {
    name: "Strategic Advisory Council",
    role: "External Domain Experts",
    bio: "Regional specialists in compliance, quantitative research, and fintech product development engaged on a project basis.",
  },
];

const partnerEcosystem = [
  {
    name: "Legal & Compliance",
    detail: "Sleek Hong Kong Limited serving as company secretary with access to legal affiliates across APAC and Europe.",
  },
  {
    name: "Technology Integrators",
    detail: "Cloud, data, and cybersecurity partners supporting deployment of market data lakes and execution platforms.",
  },
  {
    name: "Capital & Liquidity",
    detail: "Relationships with OTC desks, exchanges, and liquidity providers to structure bespoke market access programs.",
  },
];

export default function Page() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <p className="uppercase tracking-[0.35em] text-xs text-primary/80">Company Framework</p>
        <h1 className="h1">Governance, Capabilities, and Strategic Partnerships</h1>
        <p className="p-lg text-gray-300 max-w-4xl">
          AUREON CAPITAL LIMITED maintains a comprehensive operating model that balances regulatory alignment, quantitative
          research excellence, and enterprise-grade risk management. Our governance system enables clients to engage with a
          fully accountable partner for digital asset strategy and transformation initiatives.
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="h2 text-3xl">Governance Architecture</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {governanceFramework.map((item) => (
            <div key={item.title} className="card h-full">
              <h3 className="text-xl font-semibold text-gray-100">{item.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-300">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="h2 text-3xl">Leadership & Oversight</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {leadership.map((person) => (
            <article key={person.name} className="card h-full">
              <h3 className="text-xl font-semibold text-gray-100">{person.name}</h3>
              <p className="text-sm text-gray-400">{person.role}</p>
              <p className="mt-3 text-gray-300">{person.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="h2 text-3xl">Operational Ecosystem</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {partnerEcosystem.map((partner) => (
            <div key={partner.name} className="card h-full">
              <h3 className="text-xl font-semibold text-gray-100">{partner.name}</h3>
              <p className="mt-3 text-gray-300">{partner.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-8">
        <h2 className="h2 text-3xl">Engagement Governance</h2>
        <p className="text-gray-300">
          Each engagement is supported by a clear governance charter, defining deliverables, escalation paths, confidentiality
          provisions, and performance metrics. Clients gain transparency into project cadence and risk oversight from discovery
          through long-term managed services.
        </p>
        <p className="text-sm text-gray-400">
          Contact our team to request a detailed compliance pack, including policy summaries, insurance coverage, and partner
          due diligence documentation.
        </p>
      </section>
    </div>
  );
}

