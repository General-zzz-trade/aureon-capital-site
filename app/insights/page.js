import Link from "next/link";
import { posts } from "../../content/posts";

export const metadata = {
  title: "Insights — AUREON CAPITAL LIMITED",
};

export default function Page() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="h1">Insights</h1>
        <p className="p-lg mt-3 max-w-3xl">
          Research and commentary on digital asset market dynamics, macroeconomic shifts, and institutional trading developments.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((p) => (
          <article key={p.slug} className="card">
            <h3 className="h2 text-2xl">
              <Link className="link" href={`/insights/${p.slug}`}>{p.title}</Link>
            </h3>
            <div className="text-gray-400 text-sm mt-1">{new Date(p.date).toLocaleDateString()}</div>
            <p className="mt-3 text-gray-300">{p.excerpt}</p>
            <div className="mt-4">
              <Link className="btn" href={`/insights/${p.slug}`}>Read More</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}