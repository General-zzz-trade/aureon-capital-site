import Link from "next/link";
import { posts } from "../../content/posts";

export const metadata = {
  title: "Insights — AUREON CAPITAL LIMITED",
};

export default function Page() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <h1 className="h1">Insights</h1>
        <p className="p-lg max-w-3xl">
          Research and commentary on digital asset market dynamics, macroeconomic shifts, institutional trading developments, and governance frameworks shaping regulated markets.
        </p>
        <p className="text-sm text-gray-400">
          Our research desks publish scenario analysis, risk dashboards, and technology briefings to help decision makers build resilient digital asset operations.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((p) => (
          <article key={p.slug} className="card flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-primary">
                <span>{p.category}</span>
                <span className="text-gray-600">•</span>
                <span>{p.readTime}</span>
              </div>
              <h3 className="h2 text-2xl mt-3">
                <Link className="link" href={`/insights/${p.slug}`}>
                  {p.title}
                </Link>
              </h3>
              <div className="text-gray-400 text-sm mt-2">
                {new Date(p.date).toLocaleDateString()} — {p.author}
              </div>
              <p className="mt-4 text-gray-300">{p.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.topics.map((topic) => (
                  <span key={topic} className="badge">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <Link className="btn" href={`/insights/${p.slug}`}>
                Read More
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}