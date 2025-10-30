import { readJSON, formatHKDateTime } from "../lib/dataUtils.js";

function EnglishNews({ items, message }) {
  if (message) {
    return <p className="text-sm text-muted">{message}</p>;
  }
  if (!items?.length) {
    return <p className="text-sm text-muted">Loading…</p>;
  }
  return (
    <ul className="space-y-3 text-sm text-muted">
      {items.map((item, index) => (
        <li key={index} className="leading-relaxed">
          <p className="font-medium text-ink">{item.english}</p>
          <p className="text-xs text-muted">{item.chinese}</p>
        </li>
      ))}
    </ul>
  );
}

function ChineseNews({ items, message }) {
  if (message) {
    return <p className="text-sm text-white/70">{message}</p>;
  }
  if (!items?.length) {
    return <p className="text-sm text-white/60">加载中…</p>;
  }
  return (
    <ul className="space-y-3 text-sm text-white/80">
      {items.map((item, index) => (
        <li key={index} className="leading-relaxed">
          <p>{item.chinese}</p>
          <p className="text-xs text-white/60">{item.english}</p>
        </li>
      ))}
    </ul>
  );
}

export default function GlobalNews() {
  const data = readJSON("news-summary.json");
  return (
    <section className="container-xl">
      <div className="card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Global Market News</p>
            <h3 className="heading-md text-ink">Curated daily headlines</h3>
          </div>
          <p className="text-xs text-muted">{data ? `${formatHKDateTime(data.generatedAt)} HKT` : "Loading…"}</p>
        </div>
        <EnglishNews items={data?.items} message={data?.message?.english} />
      </div>
      <div className="card-muted mt-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow">全球市场新闻</p>
            <h3 className="heading-md text-ink">重点资讯摘要</h3>
          </div>
          <p className="text-xs text-muted">{data ? `${formatHKDateTime(data.generatedAt)} HKT` : "加载中…"}</p>
        </div>
        <ChineseNews items={data?.items} message={data?.message?.chinese} />
      </div>
    </section>
  );
}
