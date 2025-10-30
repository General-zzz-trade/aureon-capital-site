import { generateDailyBrief } from "../../lib/briefs";

function TextBlock({ title, content }) {
  return (
    <div className="space-y-1">
      <h3 className="text-sm uppercase tracking-wide text-gray-400">{title}</h3>
      <p className="text-gray-100">{content.en}</p>
      <p className="text-gray-300 text-sm">{content.zh}</p>
    </div>
  );
}

export async function DailyBrief() {
  const brief = await generateDailyBrief();

  if (brief.status !== "ready") {
    return (
      <section className="card space-y-4">
        <header className="flex items-center justify-between">
          <h2 className="h2">Aureon Capital Daily Market Brief</h2>
          <span className="text-sm text-gray-400">Loading…</span>
        </header>
        <p className="text-gray-400">Awaiting validated market data.</p>
      </section>
    );
  }

  return (
    <section className="card space-y-6">
      <header className="flex items-start justify-between">
        <div>
          <h2 className="h2">Aureon Capital Daily Market Brief</h2>
          <p className="text-sm text-gray-400">Updated at {brief.generatedAt} HKT</p>
        </div>
      </header>
      <div className="grid gap-4">
        <TextBlock title="Overview" content={brief.overview} />
        <TextBlock title="Market Sentiment" content={brief.sentiment} />
      </div>
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
            {brief.table.map((row) => (
              <tr key={row.asset}>
                <td className="py-2 pr-4 font-semibold text-gray-100">{row.asset}</td>
                <td className="py-2 pr-4 text-gray-200">{row.price}</td>
                <td className="py-2 text-gray-200">{row.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TextBlock title="Tactical Insight" content={brief.tactical} />
      <footer className="text-xs text-gray-500 text-right">
        Aureon Capital Research Desk · Auto-updated by CodeX
      </footer>
    </section>
  );
}
