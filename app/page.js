import Link from "next/link";
import { posts } from "../content/posts";

const stats = [
  {
    label: "Incorporated",
    value: "Hong Kong • 2025",
    description: "Licensed corporate advisory and analytics house registered in Central, Hong Kong.",
  },
  {
    label: "Focus",
    value: "Digital Asset Intelligence",
    description: "Strategy, quantitative research, and governance for institutional participants.",
  },
  {
    label: "Coverage",
    value: "Asia-Pacific & Global",
    description: "Cross-jurisdictional mandates spanning Hong Kong, Singapore, UAE, EU, and North America.",
  },
];

const operatingPillars = [
  {
    title: "Research & Intelligence",
    description:
      "Macro, microstructure, and geopolitical analysis translated into actionable investment committee briefings.",
  },
  {
    title: "Quantitative Engineering",
    description:
      "Systematic models, execution frameworks, and data infrastructure tailored to institutional governance requirements.",
  },
  {
    title: "Governance & Compliance",
    description:
      "Corporate secretarial, regulatory alignment, and control tower design for digital asset mandates.",
  },
  {
    title: "Partnership Delivery",
    description:
      "Embedded engagements with asset managers, exchanges, treasuries, and family offices across the region.",
  },
];

const engagementPhases = [
  {
    phase: "01",
    title: "Diagnostic & Roadmapping",
    detail:
      "Evaluate mandate objectives, regulatory perimeter, and current-state capabilities to blueprint a target operating model.",
  },
  {
    phase: "02",
    title: "Solution Engineering",
    detail:
      "Design quantitative, technology, and governance workstreams with defined milestones, controls, and reporting cadences.",
  },
  {
    phase: "03",
    title: "Implementation & Oversight",
    detail:
      "Deploy cross-functional teams, provide control tower oversight, and embed feedback loops with client leadership.",
  },
  {
    phase: "04",
    title: "Sustainability & Scaling",
    detail:
      "Institutionalize playbooks, ensure regulatory readiness, and transition knowledge to internal operating teams.",
  },
];

export default function Page() {
  const featuredPosts = posts.slice(0, 2);

  return (
    <div className="space-y-20">
      <section className="py-16 sm:py-24 text-center space-y-8">
        <div className="flex flex-col gap-4">
          <span className="uppercase text-xs tracking-[0.4em] text-primary/80">
            Strategic Intelligence for the Digital Asset Era
          </span>
          <h1 className="h1">
            Institutional-grade advisory, research, and governance for digital markets
          </h1>
          <p className="p-lg mx-auto max-w-4xl">
            AUREON CAPITAL LIMITED partners with asset managers, exchanges, corporates, and family offices to architect secure, compliant, and data-driven participation in the digital asset economy.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/services" className="btn btn-primary">
            Explore Our Services
          </Link>
          <Link href="/company" className="btn">
            View Company Framework
          </Link>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="card space-y-3">
            <p className="text-xs uppercase tracking-wide text-primary">{stat.label}</p>
            <h3 className="h2 text-2xl">{stat.value}</h3>
            <p className="text-sm text-gray-300">{stat.description}</p>
          </div>
        ))}
      </section>

      <section className="space-y-8">
        <header className="space-y-3">
          <h2 className="h2">Operating Pillars</h2>
          <p className="text-gray-300 max-w-3xl">
            Our multidisciplinary teams coordinate research, quantitative engineering, and corporate governance to deliver resilient operating models for clients navigating regulated digital asset markets.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-2">
          {operatingPillars.map((pillar) => (
            <div key={pillar.title} className="card h-full">
              <h3 className="text-xl font-semibold text-white">{pillar.title}</h3>
              <p className="mt-3 text-gray-300">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <header className="space-y-3">
          <h2 className="h2">Engagement Lifecycle</h2>
          <p className="text-gray-300 max-w-3xl">
            Structured delivery ensures stakeholders, regulators, and counterparties receive consistent transparency from discovery to post-launch assurance.
          </p>
        </header>
        <div className="timeline">
          {engagementPhases.map((phase) => (
            <div key={phase.phase} className="timeline-item">
              <div className="timeline-marker">{phase.phase}</div>
              <div>
                <h3 className="text-lg font-semibold text-white">{phase.title}</h3>
                <p className="mt-2 text-gray-300 text-sm leading-relaxed">{phase.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <header className="space-y-3">
          <h2 className="h2">Latest Intelligence</h2>
          <p className="text-gray-300 max-w-3xl">
            Briefings and research extracts from our intelligence desks. Read more in our <Link href="/insights" className="link">Insights library</Link>.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-2">
          {featuredPosts.map((post) => (
            <article key={post.slug} className="card space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-primary">
                <span>{post.category}</span>
                <span className="text-gray-700">•</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-2xl font-semibold text-white">
                <Link className="link" href={`/insights/${post.slug}`}>
                  {post.title}
                </Link>
              </h3>
              <p className="text-gray-400 text-sm">
                {new Date(post.date).toLocaleDateString()} — {post.author}
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2">
                {post.topics.map((topic) => (
                  <span key={topic} className="badge">
                    {topic}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="card text-center space-y-4 bg-gradient-to-br from-zinc-900 to-zinc-950">
        <h2 className="h2">Ready to build institutional trust in digital markets?</h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Connect with our partners to scope due diligence, research mandates, or governance upgrades tailored to your objectives.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="btn btn-primary">
            Contact Our Team
          </Link>
          <Link href="/about" className="btn">
            Learn About the Firm
          </Link>
        </div>
      </section>
    </div>
  );
}