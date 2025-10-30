import { readJSON, formatHKDateTime, formatPercent, formatCurrency } from "../lib/dataUtils.js";

function PerformanceTable({ rows, variant = "light" }) {
  if (!rows?.length) {
    return <p className={`text-sm ${variant === "dark" ? "text-white/60" : "text-muted"}`}>Loading…</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className={`text-left ${variant === "dark" ? "text-white/60" : "text-muted"}`}>
          <tr>
            <th className="py-2 pr-4 font-medium">{variant === "dark" ? "资产" : "Asset"}</th>
            <th className="py-2 pr-4 font-medium">{variant === "dark" ? "价格" : "Price"}</th>
            <th className="py-2 pr-4 font-medium">{variant === "dark" ? "周变动" : "Weekly Change"}</th>
          </tr>
        </thead>
        <tbody className={`divide-y ${variant === "dark" ? "divide-white/10" : "divide-black/5"}`}>
          {rows.map((row) => (
            <tr key={row.asset}>
              <td className={`py-3 pr-4 font-medium ${variant === "dark" ? "text-white" : "text-ink"}`}>{row.asset}</td>
              <td className={`py-3 pr-4 ${variant === "dark" ? "text-white/70" : "text-muted"}`}>
                {row.displayPrice ?? formatCurrency(row.price)}
              </td>
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

function MacroEvents({ events, variant = "light" }) {
  if (!events?.length) {
    return <p className={`text-sm ${variant === "dark" ? "text-white/60" : "text-muted"}`}>Loading…</p>;
  }
  return (
    <ul className={`space-y-3 text-sm ${variant === "dark" ? "text-white/80" : "text-muted"}`}>
      {events.map((event, index) => (
        <li key={`${variant}-${index}`} className="leading-relaxed space-y-1">
          <p className={`text-xs uppercase tracking-[0.3em] ${variant === "dark" ? "text-white/60" : "text-muted"}`}>
            {event.weekIdentifier}
          </p>
          <p className={`font-medium ${variant === "dark" ? "text-white" : "text-ink"}`}>{event.title}</p>
          <p>{event.description}</p>
        </li>
      ))}
    </ul>
  );
}

export default function WeeklyReview() {
  const data = readJSON("weekly-review.json");
  return (
    <section className="container-xl grid gap-8 lg:grid-cols-2">
      <div className="card space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Weekly Market Review</p>
            <h3 className="heading-md text-ink">Aureon Capital Weekly Review</h3>
          </div>
          <p className="text-xs text-muted">{data ? `${formatHKDateTime(data.generatedAt)} HKT` : "Loading…"}</p>
        </div>
        {data ? (
          <div className="space-y-4">
            <PerformanceTable rows={data.english.performance} />
            <div className="rounded-2xl border border-black/10 bg-white p-4 text-sm text-muted">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Macro Events</p>
              <MacroEvents events={data.english.macroEvents} />
            </div>
            <div className="rounded-2xl border border-black/10 bg-black/5 p-4 text-sm text-muted">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Outlook</p>
              <p className="text-ink">{data.english.outlook}</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted">Loading…</p>
        )}
      </div>
      <div className="card-muted space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow">每周观察</p>
            <h3 className="heading-md text-ink">Aureon Capital 每周观察</h3>
          </div>
          <p className="text-xs text-muted">{data ? `${formatHKDateTime(data.generatedAt)} HKT` : "加载中…"}</p>
        </div>
        {data ? (
          <div className="space-y-4 text-sm text-white/80">
            <PerformanceTable rows={data.chinese.performance} variant="dark" />
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">宏观事件</p>
              <MacroEvents events={data.chinese.macroEvents} variant="dark" />
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">下周展望</p>
              <p>{data.chinese.outlook}</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted">加载中…</p>
        )}
      </div>
    </section>
  );
}
