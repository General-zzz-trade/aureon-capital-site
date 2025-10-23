import { posts } from "../../../content/posts";

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = posts.find((p) => p.slug === params.slug);
  return {
    title: post
      ? `${post.title} — AUREON CAPITAL LIMITED`
      : "Insights — AUREON CAPITAL LIMITED",
  };
}

function renderBlock(block, idx) {
  switch (block.type) {
    case "heading":
      return (
        <h2 key={idx} className="mt-10 first:mt-0">
          {block.text}
        </h2>
      );
    case "paragraph":
      return (
        <p key={idx} className="leading-relaxed text-gray-200">
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul key={idx} className="space-y-2">
          {block.items.map((item, itemIdx) => (
            <li key={itemIdx} className="list-disc list-inside text-gray-200">
              {item}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote
          key={idx}
          className="border-l-4 border-primary/70 pl-4 italic text-gray-200"
        >
          {block.text}
        </blockquote>
      );
    default:
      return null;
  }
}

export default function Page({ params }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) {
    return <div className="text-gray-300">Not found.</div>;
  }

  return (
    <article className="prose prose-invert prose-zinc max-w-none">
      <header className="not-prose">
        <div className="uppercase tracking-wide text-xs text-primary font-semibold">
          {post.category}
        </div>
        <h1 className="mt-2 text-3xl sm:text-5xl font-bold tracking-tight">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-400">
          <span>{new Date(post.date).toLocaleDateString()}</span>
          <span>•</span>
          <span>{post.readTime}</span>
          <span>•</span>
          <span>{post.author}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.topics.map((topic) => (
            <span key={topic} className="badge">
              {topic}
            </span>
          ))}
        </div>
      </header>

      <div className="mt-10 space-y-6">
        {post.content.map((block, idx) => renderBlock(block, idx))}
      </div>

      <p className="mt-10 text-xs text-gray-500 italic not-prose">
        {post.disclaimer}
      </p>
    </article>
  );
}