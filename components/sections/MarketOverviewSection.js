import { getMarketOverviewData } from "@/lib/marketIntelligence";

export async function MarketOverviewSection() {
  const data = await getMarketOverviewData();

  return (
    <section className="card space-y-6" id="market-overview">
      <header className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Market Overview 市场总览</h2>
        <p className="text-sm text-gray-400">
          Auto-refreshed every 10 minutes · 每十分钟自动更新
          {data?.updatedAt ? ` · Last updated (HKT): ${data.updatedAt}` : ""}
        </p>
      </header>
      {data ? (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-gray-400 uppercase tracking-wide text-xs">
              <tr>
                <th className="py-2 pr-4">Asset / 资产</th>
                <th className="py-2 pr-4">Price</th>
                <th className="py-2 pr-4">24h %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {data.rows.map((row) => {
                const tone =
                  typeof row.change === "number"
                    ? row.change >= 0
                      ? "text-emerald-400"
                      : "text-rose-400"
                    : "text-gray-400";

                return (
                  <tr key={row.name}>
                    <td className="py-3 pr-4 font-medium text-gray-100">{row.name}</td>
                    <td className="py-3 pr-4 text-gray-200">{row.priceLabel}</td>
                    <td className={`py-3 pr-4 font-medium ${tone}`}>{row.changeLabel}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
