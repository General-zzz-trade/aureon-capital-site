import Link from "next/link";
import { getGlobalMarketNews } from "@/lib/marketIntelligence";

export async function GlobalMarketNewsSection() {
  const data = await getGlobalMarketNews();

  const items = data?.items || [];
  const isEmpty = data && items.length === 0;

  return (
    <section className="card space-y-6" id="global-market-news">
      <header className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Global Market News 全球市场资讯</h2>
        <p className="text-sm text-gray-400">
          Scheduled 10:00 HKT · 固定于香港时间10:00发布
          {data?.updatedAt ? ` · Last updated: ${data.updatedAt}` : ""}
        </p>
      </header>
      {!data ? (
        <p className="text-gray-400">Loading…</p>
      ) : isEmpty ? (
        <p className="text-gray-400">No major updates today · 今日暂无重大更新</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={`${item.source}-${item.title}`} className="space-y-1">
              <p className="text-gray-100 leading-relaxed">{item.summary.en}</p>
              <p className="text-gray-400 leading-relaxed">{item.summary.zh}</p>
              {item.link ? (
                <Link href={item.link} className="link text-sm" target="_blank" rel="noreferrer">
                  Read more
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      )}
      <footer className="text-xs text-gray-500 border-t border-zinc-800 pt-3">
        Aureon Capital Research Desk · Auto-updated by CodeX
      </footer>
    </section>
  );
}
