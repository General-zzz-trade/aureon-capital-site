import { readJSON, formatHKDateTime } from "../lib/dataUtils.js";

function RecapList({ recap, locale, variant = "light" }) {
  if (!recap?.length) {
    return <p className="text-sm text-muted">Loading…</p>;
  }
  const textClass = variant === "dark" ? "text-white" : "text-ink";
  return (
    <ul className={`space-y-3 text-sm ${variant === "dark" ? "text-white/80" : "text-muted"}`}>
      {recap.map((item) => (
        <li key={`${locale}-${item.label}`} className="leading-relaxed">
          <p className={`font-medium ${textClass}`}>{locale === "en" ? item.english : item.chinese}</p>
        </li>
      ))}
    </ul>
  );
}

function KeyNews({ content, variant = "light" }) {
  if (!content) {
    return <p className="text-sm text-muted">Loading…</p>;
  }
  const baseClass = variant === "dark" ? "text-white/80" : "text-muted";
  return (
    <div className={`space-y-2 text-sm ${baseClass}`}>
      {content.split("\n").map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  );
}

export default function DailySummary() {
  const data = readJSON("daily-summary.json");
  return (
    <section className="container-xl grid gap-8 lg:grid-cols-2">
      <div className="card space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Daily Market Summary</p>
            <h3 className="heading-md text-ink">Aureon Capital Daily Summary</h3>
          </div>
          <p className="text-xs text-muted">{data ? `${formatHKDateTime(data.generatedAt)} HKT` : "Loading…"}</p>
        </div>
        {data ? (
          <div className="space-y-4">
            <RecapList recap={data.english.recap} locale="en" />
            <div className="rounded-2xl border border-black/10 bg-black/5 p-4 text-sm text-muted">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Volatility</p>
              <p className="text-ink">{data.english.volatility}</p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white p-4 text-sm text-muted">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Key News</p>
              <KeyNews content={data.english.keyNews} />
            </div>
            <p className="text-sm font-medium text-ink">{data.english.closingComment}</p>
          </div>
        ) : (
          <p className="text-sm text-muted">Loading…</p>
        )}
      </div>
      <div className="card-muted space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow">每日收市摘要</p>
            <h3 className="heading-md text-ink">Aureon Capital 每日收市摘要</h3>
          </div>
          <p className="text-xs text-muted">{data ? `${formatHKDateTime(data.generatedAt)} HKT` : "加载中…"}</p>
        </div>
        {data ? (
          <div className="space-y-4 text-sm text-white/80">
            <RecapList recap={data.chinese.recap} locale="zh" variant="dark" />
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">波动点评</p>
              <p>{data.chinese.volatility}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">要闻速览</p>
              <KeyNews content={data.chinese.keyNews} variant="dark" />
            </div>
            <p className="font-medium text-white">{data.chinese.closingComment}</p>
          </div>
        ) : (
          <p className="text-sm text-white/70">加载中…</p>
        )}
      </div>
    </section>
  );
}
