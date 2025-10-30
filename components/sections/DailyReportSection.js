import { getDailyReport } from "@/lib/marketIntelligence";

export async function DailyReportSection() {
  const data = await getDailyReport();

  return (
    <section className="card space-y-6" id="daily-report">
      <header className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Aureon Capital Daily Summary 日终总结</h2>
        <p className="text-sm text-gray-400">
          Scheduled 17:00 HKT · 固定于香港时间17:00发布
          {data?.updatedAt ? ` · Last updated: ${data.updatedAt}` : ""}
        </p>
      </header>
      {data ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-gray-100 leading-relaxed">{data.recap.en}</p>
            <p className="text-gray-400 leading-relaxed">{data.recap.zh}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-100">Volatility 波动率</h3>
              <p className="text-gray-100">{data.volatility.en}</p>
              <p className="text-gray-400">{data.volatility.zh}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-100">Key Drivers 关键因素</h3>
              <p className="text-gray-100">{data.news.en}</p>
              <p className="text-gray-400">{data.news.zh}</p>
            </div>
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
                    <tr key={row.label}>
                      <td className="py-3 pr-4">
                        <div className="font-medium text-gray-100">{row.label}</div>
                        <div className="text-xs text-gray-500">{row.labelZh}</div>
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
            <p className="text-gray-100">{data.closing.en}</p>
            <p className="text-gray-400">{data.closing.zh}</p>
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
