export const metadata = {
  title: "Network — AUREON CAPITAL LIMITED",
};

const networkPillars = [
  {
    title: "Strategic Partners",
    description:
      "Custody banks, market operators, and infrastructure providers who collaborate with us on operating model design and execution.",
    highlights: [
      "Digital asset custodians spanning Asia, Europe, and the Middle East",
      "Execution venues supporting 24/5 liquidity with institutional controls",
      "Independent consultants specialising in regulatory change and compliance",
    ],
  },
  {
    title: "Intelligence Contributors",
    description:
      "Economists, data vendors, and academic fellows who enrich our research exchange with differentiated perspectives and datasets.",
    highlights: [
      "Macro research boutiques with emerging market coverage",
      "Alternative data providers across blockchain, payments, and trade",
      "Academic collaborators exploring tokenisation, CBDCs, and market microstructure",
    ],
  },
  {
    title: "Capability Builders",
    description:
      "Technology specialists and programme leads who co-develop tooling, training, and change management for client teams.",
    highlights: [
      "Engineering studios focused on capital markets automation",
      "Risk practitioners formalising model governance frameworks",
      "Learning designers delivering executive and operational upskilling",
    ],
  },
];

const regionalHubs = [
  {
    region: "Asia-Pacific",
    details:
      "Headquartered in Hong Kong with partnerships across Singapore, Tokyo, and Sydney to support market entry, licensing, and execution.",
  },
  {
    region: "Middle East",
    details:
      "Collaborations in Abu Dhabi Global Market and Dubai International Financial Centre focused on tokenisation programmes and regulatory design.",
  },
  {
    region: "Europe",
    details:
      "Research contributors in London, Frankfurt, and Zurich tracking MiCA implementation, digital euro pilots, and institutional adoption pathways.",
  },
];

const engagementChannels = [
  {
    name: "Insight Briefings",
    description:
      "Monthly deep-dives synthesising market signals, policy updates, and operational implications for our network members.",
  },
  {
    name: "Scenario Labs",
    description:
      "Interactive simulations built with partners to rehearse regulatory, technology, or liquidity shocks before they materialise.",
  },
  {
    name: "Innovation Sprints",
    description:
      "Focused two-week programmes aligning stakeholders to prototype tooling, dashboards, or governance improvements.",
  },
];

export default function Page() {
  return (
    <div className="space-y-16">
      <header className="space-y-6 max-w-3xl">
        <p className="eyebrow">Aureon Network</p>
        <h1 className="heading-lg text-ink">An ecosystem of practitioners advancing institutional digital finance.</h1>
        <p className="copy-lg">
          Aureon Capital curates a network of partners, contributors, and programme leads who extend our advisory and research capabilities.
          Together we translate intelligence into execution across jurisdictions, asset classes, and operating models.
        </p>
      </header>

      <section className="grid gap-8 lg:grid-cols-3">
        {networkPillars.map((pillar) => (
          <div key={pillar.title} className="card space-y-4">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-primary">{pillar.title}</p>
              <p className="text-sm text-muted leading-relaxed">{pillar.description}</p>
            </div>
            <ul className="space-y-3 text-sm text-muted leading-relaxed">
              {pillar.highlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="rounded-[32px] border border-black/10 bg-white/70 p-10 space-y-8">
        <div className="space-y-4">
          <p className="eyebrow">Regional Presence</p>
          <h2 className="heading-md text-ink">Connectivity across key innovation hubs.</h2>
          <p className="copy-lg">
            Our ecosystem spans leading financial centres where regulation, capital, and technology are converging. Partnerships are structured to
            provide on-the-ground insight and implementation support.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3 text-sm text-muted">
          {regionalHubs.map((hub) => (
            <div key={hub.region} className="space-y-2">
              <h3 className="text-xs uppercase tracking-[0.3em] text-primary">{hub.region}</h3>
              <p>{hub.details}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="heading-md text-ink">How we collaborate with our ecosystem</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {engagementChannels.map((channel) => (
            <div key={channel.name} className="card-muted">
              <p className="text-xs uppercase tracking-[0.3em] text-primary">{channel.name}</p>
              <p className="text-sm text-muted leading-relaxed">{channel.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-black/10 bg-white/70 p-10 space-y-6">
        <p className="eyebrow">Join the Network</p>
        <h2 className="heading-md text-ink">Let&apos;s build resilient market infrastructure together.</h2>
        <p className="copy-lg max-w-3xl">
          Organisations contributing differentiated expertise across custody, data, regulation, or technology can apply to join the Aureon Network.
          Share your focus areas and we will coordinate a discovery session with the relevant programme leads.
        </p>
      </section>
    </div>
  );
}
