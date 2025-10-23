import Link from "next/link";
import { posts } from "../../content/posts";

export const metadata = {
  title: "Insights — AUREON CAPITAL LIMITED",
};

const themes = [
  {
    title: "Market Structure Evolution",
    description: "Liquidity, collateral, and trading microstructure shifts across CeFi and DeFi venues.",
  },
  {
    title: "Policy & Governance",
    description: "Regulatory trajectories, licensing regimes, and board-level implications for digital assets.",
  },
  {
    title: "Technology & Resilience",
    description: "Infrastructure design, cybersecurity, and operating model transformation for institutional adoption.",
  },
];

export default function Page() {
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

      <section className="card-muted space-y-6">
        <div className="grid gap-6 md:grid-cols-3 text-sm text-muted">
          {themes.map((theme) => (
            <div key={theme.title} className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-primary">{theme.title}</p>
              <p className="leading-relaxed">{theme.description}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-sm text-muted leading-relaxed">
          <p>
            Subscribe to the Aureon Intelligence Bulletin to receive new articles, policy trackers, and event invites. Contact us via
            <a className="link" href="mailto:insights@aureoncapitallimited.com"> insights@aureoncapitallimited.com</a> to
            onboard your organisation.
          </p>
        </div>
      </section>

      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((p) => (
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
    </div>
  );
}
