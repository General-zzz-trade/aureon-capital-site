import { getNewsHighlights } from "../../lib/news";

export async function GlobalNews() {
  const news = await getNewsHighlights();

  if (news.status !== "ready") {
    return (
      <section className="card space-y-4">
        <header className="flex items-center justify-between">
          <h2 className="h2">Global Market News</h2>
          <span className="text-sm text-gray-400">
            {news.status === "empty" ? "No major updates today" : "Loading…"}
          </span>
        </header>
        {news.status === "empty" ? (
          <p className="text-gray-400">No major updates today</p>
        ) : (
          <p className="text-gray-400">Awaiting news feed validation.</p>
        )}
      </section>
    );
  }

  return (
    <section className="card space-y-4">
      <header className="flex items-start justify-between">
        <div>
          <h2 className="h2">Global Market News</h2>
          <p className="text-sm text-gray-400">Curated across Bloomberg, Yahoo Finance, and CoinDesk</p>
        </div>
      </header>
      <ul className="space-y-4 list-disc list-inside">
        {news.items.map((item) => (
          <li key={item.title} className="space-y-1">
            <p className="text-gray-100">{item.summary.en}</p>
            <p className="text-sm text-gray-300">{item.summary.zh}</p>
          </li>
        ))}
      </ul>
      <footer className="text-xs text-gray-500 text-right">
        Aureon Capital Research Desk · Auto-updated by CodeX
      </footer>
    </section>
  );
}
