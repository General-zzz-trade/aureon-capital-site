import { getWeeklyReview } from "@/lib/marketIntelligence";

export async function WeeklyReviewSection() {
  const data = await getWeeklyReview();

  return (
    <section className="card space-y-6" id="weekly-review">
      <header className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Aureon Capital Weekly Review 每周回顾</h2>
        <p className="text-sm text-gray-400">
          Scheduled Sunday 20:00 HKT · 周日20:00（香港时间）更新
          {data?.updatedAt ? ` · Last updated: ${data.updatedAt}` : ""}
        </p>
      </header>
      {data ? (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-gray-400 uppercase tracking-wide text-xs">
                <tr>
                  <th className="py-2 pr-4">Asset / 资产</th>
                  <th className="py-2 pr-4">Last Price</th>
                  <th className="py-2 pr-4">Weekly %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {data.rows.map((row) => {
                  const tone = Number.isFinite(row.change)
                    ? row.change >= 0
                      ? "text-emerald-400"
                      : "text-rose-400"
                    : "text-gray-400";

                  return (
                    <tr key={row.label}>
                      <td className="py-3 pr-4 font-medium text-gray-100">{row.label}</td>
                      <td className="py-3 pr-4 text-gray-200">{row.priceLabel}</td>
                      <td className={`py-3 pr-4 font-medium ${tone}`}>{row.changeLabel}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-100">Macro Developments 宏观事件</h3>
            <ul className="list-disc list-inside space-y-2">
              {data.macroEvents.map((item, index) => (
                <li key={`macro-${index}`}>
                  <p className="text-gray-100">{item.en}</p>
                  <p className="text-gray-400">{item.zh}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2 border-t border-zinc-800 pt-4">
            <p className="text-gray-100">Outlook: {data.outlook.en}</p>
            <p className="text-gray-400">展望：{data.outlook.zh}</p>
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
