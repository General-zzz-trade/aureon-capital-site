import Link from "next/link";
import { posts } from "../../content/posts";

export const metadata = {
  title: "Insights — AUREON CAPITAL LIMITED",
};

export default function Page() {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const [featured, ...rest] = sortedPosts;
  const categoryDescriptions = {
    "Market Structure": "Depth, flow, and liquidity formation across global digital asset venues.",
    Innovation: "Emerging technologies, data sources, and research tooling reshaping institutional workflows.",
    "Treasury & Risk": "Balance sheet strategy, treasury operations, and risk disciplines for digital assets.",
    "Policy & Governance": "Regulatory movement and governance standards guiding compliant adoption.",
    Execution: "Practical playbooks for operating models, trading infrastructure, and credit formation.",
    Infrastructure: "Connectivity, settlement, and interoperability across public and private networks.",
    Sustainability: "Responsible finance, ESG integration, and stakeholder alignment in digital markets.",
  };
  const categories = Array.from(
    sortedPosts.reduce((acc, post) => {
      if (!acc.has(post.category)) {
        acc.set(post.category, { name: post.category, count: 0 });
      }
      acc.get(post.category).count += 1;
      return acc;
    }, new Map())
  ).map(([, value]) => value);
  categories.sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-16">
      <header className="space-y-6 max-w-3xl">
        <p className="eyebrow">Latest Thinking</p>
        <h1 className="heading-lg text-ink">Insights designed to navigate market structure, policy change, and digital finance.</h1>
        <p className="copy-lg">
          Our analysts publish focused perspectives that blend macroeconomic signals, digital asset structure, and institutional
          governance. Each article is designed to inform strategy and execution.
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="heading-sm text-muted uppercase tracking-[0.3em]">Research Themes</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <div key={category.name} className="card h-full space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-primary">{category.name}</p>
              <p className="text-sm text-muted leading-relaxed">
                {categoryDescriptions[category.name] ?? "Focused analysis from Aureon's research team."}
              </p>
              <p className="text-xs text-muted">{category.count} {category.count === 1 ? "brief" : "briefs"}</p>
            </div>
          ))}
        </div>
      </section>

      {featured && (
        <section className="grid gap-10 md:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)] items-start">
          <div className="card space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Featured Analysis</p>
            <h2 className="heading-lg text-ink">
              <Link className="hover:text-primary transition-colors" href={`/insights/${featured.slug}`}>
                {featured.title}
              </Link>
            </h2>
            <p className="text-xs text-muted">
              {new Date(featured.date).toLocaleDateString(undefined, {
                day: "numeric",
                month: "long",
                year: "numeric",
              })} • {featured.readTime}
            </p>
            <p className="copy-lg text-muted">{featured.excerpt}</p>
            <Link className="btn btn-primary w-fit" href={`/insights/${featured.slug}`}>
              Explore the brief
            </Link>
          </div>
          <div className="space-y-6">
            <h3 className="heading-sm text-muted uppercase tracking-[0.3em]">Inside the Report</h3>
            <ul className="space-y-4 text-sm text-muted leading-relaxed">
              <li>
                <span className="font-semibold text-ink">Why now:</span> contextualises the latest signals shaping liquidity, regulation, and institutional adoption windows.
              </li>
              <li>
                <span className="font-semibold text-ink">Operational impact:</span> distils execution, risk, and governance actions teams can sequence over the next quarter.
              </li>
              <li>
                <span className="font-semibold text-ink">Cross-market view:</span> connects insights across geographies, asset classes, and counterparties to inform holistic strategy.
              </li>
            </ul>
          </div>
        </section>
      )}

      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="heading-sm text-muted uppercase tracking-[0.3em]">Latest Briefings</h2>
          <p className="text-xs text-muted">Chronological view of our most recent publications.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {rest.map((p) => (
            <article key={p.slug} className="card h-full">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">{p.category}</p>
              <h3 className="heading-md text-2xl text-ink">
                <Link className="hover:text-primary transition-colors" href={`/insights/${p.slug}`}>
                  {p.title}
                </Link>
              </h3>
              <p className="text-xs text-muted">
                {new Date(p.date).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })} • {p.readTime}
              </p>
              <p className="text-sm text-muted leading-relaxed">{p.excerpt}</p>
              <Link className="btn btn-secondary w-fit" href={`/insights/${p.slug}`}>
                Read More
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
