import { posts } from "../../../content/posts";

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = posts.find((p) => p.slug === params.slug);
  return {
    title: post ? `${post.title} — AUREON CAPITAL LIMITED` : "Insights — AUREON CAPITAL LIMITED",
    description: post?.excerpt,
  };
}

export default function Page({ params }) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return <div className="text-sm text-muted">Not found.</div>;
  }

  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">{post.category}</p>
        <h1 className="heading-lg text-ink">{post.title}</h1>
        <p className="text-xs text-muted">
          {new Date(post.date).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })} • {post.readTime}
        </p>
        <p className="copy-lg max-w-3xl">{post.excerpt}</p>
      </header>
      <div className="prose-custom" dangerouslySetInnerHTML={{ __html: post.content }} />
      <p className="text-xs text-muted italic">
        AUREON CAPITAL LIMITED does not provide investment advice. All information is supplied for educational and analytical purposes only.
      </p>
    </article>
  );
}
