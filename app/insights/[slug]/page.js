import { posts } from "../../../content/posts";

export async function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = posts.find(p => p.slug === params.slug);
  return { title: post ? `${post.title} — AUREON CAPITAL LIMITED` : "Insights — AUREON CAPITAL LIMITED" };
}

export default function Page({ params }) {
  const post = posts.find(p => p.slug === params.slug);
  if (!post) {
    return <div>Not found.</div>
  }
  return (
    <article className="prose prose-invert prose-zinc max-w-none">
      <h1>{post.title}</h1>
      <p className="text-gray-400">{new Date(post.date).toLocaleDateString()}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content.replaceAll("\n", "<br/>") }} />
      <p className="mt-8 text-xs text-gray-500 italic">AUREON CAPITAL LIMITED does not provide investment advice. All information is for educational and analytical purposes only.</p>
    </article>
  );
}