import Link from "next/link";
import { posts } from "../content/posts";

const practiceAreas = [
  {
    title: "Digital Asset Strategy",
    description:
      "Institutional frameworks for asset allocation, token launches, and exchange operations across Asia-Pacific.",
  },
  {
    title: "Algorithmic Research",
    description:
      "Systematic model development, execution engineering, and quantitative due diligence for complex market structures.",
  },
  {
    title: "Risk & Intelligence",
    description:
      "Actionable insights on macro liquidity, regulatory change, and geopolitical risk to inform strategic decision-making.",
  },
];

const governancePillars = [
  {
    title: "Compliance Alignment",
    detail:
      "Advisory grounded in Hong Kong regulatory frameworks, AML controls, and institutional-grade reporting standards.",
  },
  {
    title: "Operational Resilience",
    detail:
      "Robust vendor selection, cloud governance, and cybersecurity assessments tailored to digital asset infrastructure.",
  },
  {
    title: "Risk Stewardship",
    detail:
      "Independent oversight for treasury, liquidity, and counterparty management across centralized and decentralized venues.",
  },
  {
    title: "Strategic Partnerships",
    detail:
      "Collaboration with legal, audit, and technology specialists to build sustainable market-entry and expansion roadmaps.",
  },
];

const executionProcess = [
  {
    phase: "Discovery",
    copy:
      "Workshops with executive, risk, and technology stakeholders to map objectives, constraints, and governance parameters.",
  },
  {
    phase: "Design",
    copy:
      "Quantitative research, scenario analysis, and regulatory benchmarking to architect a bespoke operating model.",
  },
  {
    phase: "Deployment",
    copy:
      "Implementation playbooks, testing schedules, and change-management support to activate the strategy across teams.",
  },
  {
    phase: "Oversight",
    copy:
      "Ongoing performance reviews, risk monitoring, and intelligence briefings to ensure measurable results.",
  },
];

export default function Page() {
  const latestInsights = posts.slice(0, 2);

  return (
    <div className="space-y-20">
      <section className="text-center py-16 sm:py-24">
        <div className="mx-auto max-w-5xl space-y-6">
          <p className="uppercase tracking-[0.35em] text-xs text-primary/80">AUREON CAPITAL LIMITED</p>
          <h1 className="h1">Institutional Intelligence for the Digital Asset Era</h1>
          <p className="p-lg text-gray-300">
            We partner with exchanges, family offices, and fintech innovators to launch scalable digital asset operations, protect
            capital, and navigate regulatory change across Greater China and global markets.
          </p>
          <div className="flex flex-col sm:flex-row sm:justify-center gap-3 sm:gap-5 pt-4">
            <Link href="/services" className="btn btn-primary">Explore Our Services</Link>
            <Link href="/contact" className="btn">Schedule a Consultation</Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {practiceAreas.map((area) => (
          <div key={area.title} className="card h-full">
            <h3 className="h2 text-xl">{area.title}</h3>
            <p className="mt-3 text-gray-300">{area.description}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-8 sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="space-y-5">
            <h2 className="h2 text-3xl">Built on a Full Corporate Governance Stack</h2>
            <p className="text-gray-300">
              AUREON CAPITAL LIMITED combines regulatory-grade controls, risk intelligence, and strategic partnerships to deliver
              resilient operating models for emerging and established digital asset businesses.
            </p>
            <Link href="/company" className="link">View Company Framework →</Link>
          </div>
          <dl className="grid gap-4 sm:grid-cols-2">
            {governancePillars.map((pillar) => (
              <div key={pillar.title} className="card h-full border border-zinc-800 bg-transparent">
                <dt className="font-semibold text-gray-100">{pillar.title}</dt>
                <dd className="mt-2 text-sm text-gray-300">{pillar.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="h2 text-3xl">Execution Blueprint</h2>
            <p className="text-gray-300">Structured engagement to turn research into deployment across risk, trading, and compliance teams.</p>
          </div>
          <Link href="/contact" className="link">Discuss Your Objectives →</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {executionProcess.map((item, index) => (
            <div key={item.phase} className="card h-full">
              <div className="text-primary text-sm font-semibold">{String(index + 1).padStart(2, "0")}</div>
              <h3 className="mt-2 text-lg font-semibold text-gray-100">{item.phase}</h3>
              <p className="mt-3 text-sm text-gray-300">{item.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="h2 text-3xl">Latest Intelligence Briefings</h2>
            <p className="text-gray-300">Insights curated for executive leadership and investment committees.</p>
          </div>
          <Link href="/insights" className="link">View All Insights →</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {latestInsights.map((post) => (
            <article key={post.slug} className="card">
              <div className="text-xs uppercase tracking-[0.2em] text-primary/70">Insight</div>
              <h3 className="h2 text-2xl mt-3">
                <Link className="link" href={`/insights/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="mt-3 text-gray-300">{post.excerpt}</p>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
                <span>{new Date(post.date).toLocaleDateString()}</span>
                <Link className="link" href={`/insights/${post.slug}`}>Read →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-primary/40 bg-primary/5 p-8 text-center">
        <h2 className="h2 text-3xl">Ready to build a resilient digital asset business?</h2>
        <p className="mt-4 text-gray-300">
          Engage our team for a tailored workshop covering governance, liquidity strategy, and product rollout pathways.
        </p>
        <div className="mt-6">
          <Link href="/contact" className="btn btn-primary">Connect with AUREON CAPITAL LIMITED</Link>
        </div>
      </section>
    </div>
  );
}