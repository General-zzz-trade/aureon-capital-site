import { readJSON, formatHKDateTime, formatHKTime, formatCurrency, formatPercent } from "../lib/dataUtils.js";

function MarketOverviewTable({ data }) {
  if (!data || !data.assets || data.assets.length === 0) {
    return (
      <div className="card">
        <p className="text-sm text-muted">Loading…</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-black/5 pb-4">
        <div>
          <p className="eyebrow">Real-Time Market Overview</p>
          <p className="heading-md text-ink">Latest cross-asset pulse</p>
        </div>
        <div className="text-right text-xs text-muted">
          <p>Last updated</p>
          <p>{formatHKDateTime(data.generatedAt)} HKT</p>
        </div>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-muted">
            <tr>
              <th className="py-2 pr-4 font-medium">Asset</th>
              <th className="py-2 pr-4 font-medium">Latest Price</th>
              <th className="py-2 pr-4 font-medium">24h Change</th>
              <th className="py-2 pr-4 font-medium">Last Updated (HKT)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {data.assets.map((asset) => (
              <tr key={asset.name} className="align-top">
                <td className="py-3 pr-4 font-medium text-ink">{asset.name}</td>
                <td className="py-3 pr-4 text-muted">{formatCurrency(asset.latestPrice)}</td>
                <td className={`py-3 pr-4 font-medium ${typeof asset.change === "number" ? (asset.change >= 0 ? "text-emerald-600" : "text-rose-600") : "text-muted"}`}>
                  {formatPercent(asset.change)}
                </td>
                <td className="py-3 pr-4 text-muted">{formatHKTime(data.generatedAt)} HKT</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function MarketOverview() {
  const data = readJSON("market-overview.json");
  return (
    <section className="container-xl space-y-6">
      <MarketOverviewTable data={data} />
    </section>
  );
}
