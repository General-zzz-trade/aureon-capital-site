import { getMarketOverviewData } from "../../lib/market";
import { formatHKT } from "../../lib/time";

function formatChange(change) {
  if (typeof change !== "number" || Number.isNaN(change)) {
    return "n/a";
  }
  const prefix = change > 0 ? "+" : "";
  return `${prefix}${change.toFixed(2)}%`;
}

function formatPrice(value) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "n/a";
  }

  if (value >= 1000) {
    return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
  }
  return value.toFixed(2);
}

export async function MarketOverview() {
  const data = await getMarketOverviewData();

  if (data.status !== "ready") {
    return (
      <section className="card">
        <header className="flex items-center justify-between mb-4">
          <h2 className="h2">Market Overview</h2>
          <span className="text-sm text-gray-400">Loading…</span>
        </header>
        <p className="text-gray-400">Data pending validation.</p>
      </section>
    );
  }

  return (
    <section className="card space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="h2">Market Overview</h2>
          <p className="text-sm text-gray-400">Auto-updated every 10 minutes.</p>
        </div>
        <span className="text-sm text-gray-400">{formatHKT()}</span>
      </header>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-gray-400 border-b border-gray-700">
            <tr>
              <th className="py-2 pr-4 font-medium">Asset</th>
              <th className="py-2 pr-4 font-medium">Last Price</th>
              <th className="py-2 font-medium">24h Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {data.entries.map((row) => (
              <tr key={row.asset}>
                <td className="py-2 pr-4 font-semibold text-gray-100">{row.asset}</td>
                <td className="py-2 pr-4 text-gray-200">{formatPrice(row.price)}</td>
                <td
                  className={`py-2 font-semibold ${
                    typeof row.change24h === "number"
                      ? row.change24h > 0
                        ? "text-emerald-400"
                        : row.change24h < 0
                        ? "text-red-400"
                        : "text-gray-300"
                      : "text-gray-300"
                  }`}
                >
                  {formatChange(row.change24h)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer className="text-xs text-gray-500 text-right">
        Aureon Capital Research Desk · Auto-updated by CodeX
      </footer>
    </section>
  );
}
