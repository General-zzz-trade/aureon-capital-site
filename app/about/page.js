export const metadata = {
  title: "About — AUREON CAPITAL LIMITED",
};

const leadership = [
  {
    name: "Mr. LIAO Zelong 廖澤龍",
    role: "Founder & Managing Partner",
    bio: "Former head of digital strategy for a multi-family office, with 12 years of experience spanning algorithmic trading, venture acceleration, and cross-border capital advisory.",
  },
  {
    name: "Ms. Natalie Wong",
    role: "Chief Operating Officer",
    bio: "Specialist in regulatory operations and institutional onboarding. Led governance programs for Hong Kong SFC Type 9 managers and virtual asset exchanges.",
  },
  {
    name: "Dr. Marco Santori",
    role: "Head of Research & Macro Strategy",
    bio: "Economist focused on digital asset macroeconomics, with prior roles at global investment banks covering liquidity, derivatives, and geopolitical risk scenarios.",
  },
];

const coreValues = [
  {
    title: "Institutional Discipline",
    description:
      "We design operating models that embed governance and compliance from inception, aligning stakeholders with regulatory expectations across jurisdictions.",
  },
  {
    title: "Data with Context",
    description:
      "Quantitative analysis is paired with qualitative intelligence to inform investment committees, boards, and risk councils.",
  },
  {
    title: "Partnership Delivery",
    description:
      "Engagements are co-developed with client teams, ensuring knowledge transfer, operational continuity, and measurable outcomes.",
  },
];

const governance = [
  {
    title: "Corporate Registry",
    detail: "AUREON CAPITAL LIMITED — Business Registration No. 78966763, incorporated on 17 October 2025 in Hong Kong.",
  },
  {
    title: "Registered Office",
    detail: "Unit 2A, 17/F, Glenealy Tower, No.1 Glenealy, Central, Hong Kong.",
  },
  {
    title: "Company Secretary",
    detail: "Sleek Hong Kong Limited, providing corporate compliance, filings, and statutory record management.",
  },
  {
    title: "Governance Cadence",
    detail: "Quarterly board meetings with independent advisors overseeing risk, strategy, and technology roadmaps.",
  },
];

const advisoryCouncil = [
  {
    title: "Capital Markets Advisor",
    description: "Advises on global liquidity access, counterparty management, and institutional product structuring.",
  },
  {
    title: "Regulatory & Compliance Advisor",
    description: "Guides jurisdictional analysis across Hong Kong, Singapore, and Abu Dhabi for digital asset mandates.",
  },
  {
    title: "Technology & Cybersecurity Advisor",
    description: "Oversees system architecture, cloud security, and incident response protocols for mission-critical infrastructure.",
  },
];

export default function Page() {
  return (
    <article className="space-y-16">
      <section className="space-y-6">
        <h1 className="h1">About AUREON CAPITAL LIMITED</h1>
        <p className="p-lg max-w-3xl">
          AUREON CAPITAL LIMITED is a Hong Kong–incorporated consulting and analytics firm focused on the intersection of digital assets, institutional finance, and data-driven transformation.
        </p>
        <p className="text-gray-300 max-w-3xl">
          We blend macro intelligence, quantitative engineering, and corporate governance expertise to architect resilient operating models for clients navigating global digital markets.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="h2">Leadership Team</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {leadership.map((leader) => (
            <div key={leader.name} className="card space-y-3">
              <div className="text-xs uppercase tracking-wide text-primary">{leader.role}</div>
              <h3 className="text-xl font-semibold text-white">{leader.name}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{leader.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="h2">Mission & Values</h2>
        <p className="text-gray-300 max-w-3xl">
          Our mission is to deliver institutional-grade insight and technology-driven strategies that redefine decision-making in global digital markets.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {coreValues.map((value) => (
            <div key={value.title} className="card space-y-3">
              <h3 className="text-lg font-semibold text-white">{value.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="h2">Corporate Governance</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {governance.map((item) => (
            <div key={item.title} className="card space-y-2">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="h2">Advisory Council</h2>
        <p className="text-gray-300 max-w-3xl">
          A network of senior advisors augments our leadership team, providing guidance across product governance, risk, and technology domains.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {advisoryCouncil.map((advisor) => (
            <div key={advisor.title} className="card space-y-3">
              <h3 className="text-lg font-semibold text-white">{advisor.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{advisor.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card space-y-4 bg-gradient-to-br from-zinc-900 to-zinc-950">
        <h2 className="h2">Commitment to Clients</h2>
        <p className="text-gray-300">
          We partner with clients over the long term, ensuring strategic initiatives translate into measurable performance, operational resilience, and regulatory confidence.
        </p>
      </section>
    </article>
  );
}