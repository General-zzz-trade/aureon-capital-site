import Link from "next/link";
import { posts } from "../../content/posts";

export const metadata = {
  title: "Insights — AUREON CAPITAL LIMITED",
};

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

      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((p) => (
          <article key={p.slug} className="card h-full">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">{p.category}</p>
            <h3 className="heading-md text-2xl text-ink">
              <Link className="hover:text-primary transition-colors" href={`/insights/${p.slug}`}>
                {p.title}
              </Link>
            </h3>
            <p className="text-xs text-muted">{new Date(p.date).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })} • {p.readTime}</p>
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
