import { generateDailyReport } from "../../lib/briefs";

function TextBlock({ title, content }) {
  return (
    <div className="space-y-1">
      <h3 className="text-sm uppercase tracking-wide text-gray-400">{title}</h3>
      <p className="text-gray-100">{content.en}</p>
      <p className="text-sm text-gray-300">{content.zh}</p>
    </div>
  );
}

export async function DailyReport() {
  const report = await generateDailyReport();

  if (report.status !== "ready") {
    return (
      <section className="card space-y-4">
        <header className="flex items-center justify-between">
          <h2 className="h2">Aureon Capital Daily Summary</h2>
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
          <h2 className="h2">Aureon Capital Daily Summary</h2>
          <p className="text-sm text-gray-400">Generated at {report.generatedAt} HKT</p>
        </div>
      </header>
      <TextBlock title="Market Recap" content={report.recap} />
      <TextBlock title="Volatility" content={report.volatility} />
      <div className="space-y-3">
        <h3 className="text-sm uppercase tracking-wide text-gray-400">Key Highlights</h3>
        <ul className="space-y-3 list-disc list-inside">
          {report.highlights.map((item, index) => (
            <li key={index} className="space-y-1">
              <p className="text-gray-100">{item.en}</p>
              <p className="text-sm text-gray-300">{item.zh}</p>
            </li>
          ))}
        </ul>
      </div>
      <TextBlock title="Closing Comment" content={report.closing} />
      <footer className="text-xs text-gray-500 text-right">
        Aureon Capital Research Desk · Auto-updated by CodeX
      </footer>
    </section>
  );
}
