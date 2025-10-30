import { readJSON, formatHKDateTime, formatCurrency, formatPercent, translateSentiment } from "../lib/dataUtils.js";

function BriefTable({ rows, variant = "light" }) {
  if (!rows?.length) {
    return <p className={`text-sm ${variant === "dark" ? "text-white/60" : "text-muted"}`}>Loading…</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className={`text-left ${variant === "dark" ? "text-white/60" : "text-muted"}`}>
          <tr>
            <th className="py-2 pr-4 font-medium">Asset</th>
            <th className="py-2 pr-4 font-medium">Price</th>
            <th className="py-2 pr-4 font-medium">Δ 24h</th>
          </tr>
        </thead>
        <tbody className={`divide-y ${variant === "dark" ? "divide-white/10" : "divide-black/5"}`}>
          {rows.map((row) => (
            <tr key={row.asset}>
              <td className={`py-3 pr-4 font-medium ${variant === "dark" ? "text-white" : "text-ink"}`}>{row.asset}</td>
              <td className={`py-3 pr-4 ${variant === "dark" ? "text-white/70" : "text-muted"}`}>{formatCurrency(row.price)}</td>
              <td
                className={`py-3 pr-4 font-medium ${typeof row.change === "number" ? (row.change >= 0 ? "text-emerald-400" : "text-rose-400") : variant === "dark" ? "text-white/60" : "text-muted"}`}
              >
                {formatPercent(row.change)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DailyBrief() {
  const data = readJSON("morning-brief.json");
  return (
    <section className="container-xl grid gap-8 lg:grid-cols-2">
      <div className="card space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Daily Morning Brief</p>
            <h3 className="heading-md text-ink">Aureon Capital Daily Market Brief</h3>
          </div>
          <p className="text-xs text-muted">{data ? `${formatHKDateTime(data.generatedAt)} HKT` : "Loading…"}</p>
        </div>
        {data ? (
          <div className="space-y-4">
            <p className="copy-sm text-muted">{data.english.overview}</p>
            <div className="rounded-2xl border border-black/10 bg-black/5 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Sentiment</p>
              <p className="heading-sm text-ink">{data.english.sentiment}</p>
              <p className="text-xs text-muted">{translateSentiment(data.english.sentiment)} / {data.english.sentiment}</p>
            </div>
            <BriefTable rows={data.english.table} />
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Tactical Insights</p>
              <ul className="space-y-2 text-sm text-muted">
                {data.english.insights.map((line, index) => (
                  <li key={index} className="leading-relaxed">{line}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted">Loading…</p>
        )}
      </div>
      <div className="card-muted space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">每日晨报</p>
            <h3 className="heading-md text-ink">Aureon Capital 每日晨报</h3>
          </div>
          <p className="text-xs text-muted">{data ? `${formatHKDateTime(data.generatedAt)} HKT` : "加载中…"}</p>
        </div>
        {data ? (
          <div className="space-y-4 text-sm text-white/80">
            <p className="leading-relaxed">{data.chinese.overview}</p>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">市场情绪</p>
              <p className="heading-sm text-white">{data.chinese.sentiment}</p>
              <p className="text-xs text-white/60">{data.english.sentiment}</p>
            </div>
            <BriefTable rows={data.chinese.table} variant="dark" />
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">策略提示</p>
              <ul className="space-y-2 text-white/80">
                {data.chinese.insights.map((line, index) => (
                  <li key={index} className="leading-relaxed">{line}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-sm text-white/70">加载中…</p>
        )}
      </div>
    </section>
  );
}
