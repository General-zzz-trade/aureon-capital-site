import { getDailyMorningBrief } from "@/lib/marketIntelligence";

export async function DailyBriefSection() {
  const data = await getDailyMorningBrief();

  return (
    <section className="card space-y-6" id="daily-brief">
      <header className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Aureon Capital Daily Market Brief 每日晨报</h2>
        <p className="text-sm text-gray-400">
          Scheduled 09:00 HKT · 固定于香港时间09:00发布
          {data?.updatedAt ? ` · Last updated: ${data.updatedAt}` : ""}
        </p>
      </header>
      {data ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-gray-100 leading-relaxed">{data.overview.en}</p>
            <p className="text-gray-400 leading-relaxed">{data.overview.zh}</p>
          </div>
          <div className="space-y-2">
            <p className="text-gray-100">Sentiment: {data.sentiment}</p>
            <p className="text-gray-400">市场情绪：{translateSentimentLabel(data.sentiment)}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-gray-400 uppercase tracking-wide text-xs">
                <tr>
                  <th className="py-2 pr-4">Asset / 资产</th>
                  <th className="py-2 pr-4">Price / 价格</th>
                  <th className="py-2 pr-4">24h %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {data.rows.map((row) => {
                  const tone = Number.isFinite(row.changeValue)
                    ? row.changeValue >= 0
                      ? "text-emerald-400"
                      : "text-rose-400"
                    : "text-gray-400";

                  return (
                    <tr key={row.asset}>
                      <td className="py-3 pr-4">
                        <div className="font-medium text-gray-100">{row.asset}</div>
                        <div className="text-xs text-gray-500">{row.assetZh}</div>
                      </td>
                      <td className="py-3 pr-4">
                        <div className="text-gray-200">{row.price}</div>
                        <div className="text-xs text-gray-500">{row.priceZh}</div>
                      </td>
                      <td className={`py-3 pr-4 font-medium ${tone}`}>{row.change}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="space-y-2 border-t border-zinc-800 pt-4">
            <p className="text-gray-100">Tactical Insight: {data.insight.en}</p>
            <p className="text-gray-400">策略提示：{data.insight.zh}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-400">Loading…</p>
      )}
      <footer className="text-xs text-gray-500 border-t border-zinc-800 pt-3">
        Aureon Capital Research Desk · Auto-updated by CodeX
      </footer>
    </section>
  );
}

function translateSentimentLabel(value) {
  if (value === "risk-on") return "风险偏好";
  if (value === "risk-off") return "风险厌恶";
  return "中性";
}
