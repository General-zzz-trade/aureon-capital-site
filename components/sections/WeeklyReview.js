import { generateWeeklyReview } from "../../lib/briefs";

function TextRow({ content }) {
  return (
    <li className="space-y-1">
      <p className="text-gray-100">{content.en}</p>
      <p className="text-sm text-gray-300">{content.zh}</p>
    </li>
  );
}

export async function WeeklyReview() {
  const review = await generateWeeklyReview();

  if (review.status !== "ready") {
    return (
      <section className="card space-y-4">
        <header className="flex items-center justify-between">
          <h2 className="h2">Aureon Capital Weekly Review</h2>
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
          <h2 className="h2">Aureon Capital Weekly Review</h2>
          <p className="text-sm text-gray-400">Generated at {review.generatedAt} HKT</p>
        </div>
      </header>
      <p className="text-gray-100">{review.overview.en}</p>
      <p className="text-sm text-gray-300">{review.overview.zh}</p>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-gray-400 border-b border-gray-700">
            <tr>
              <th className="py-2 pr-4 font-medium">Asset</th>
              <th className="py-2 pr-4 font-medium">Last Price</th>
              <th className="py-2 font-medium">Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {review.table.map((row) => (
              <tr key={row.asset}>
                <td className="py-2 pr-4 font-semibold text-gray-100">{row.asset}</td>
                <td className="py-2 pr-4 text-gray-200">{row.price}</td>
                <td className="py-2 text-gray-200">{row.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="space-y-3">
        <h3 className="text-sm uppercase tracking-wide text-gray-400">Macro Events</h3>
        <ul className="space-y-3 list-disc list-inside">
          {review.macroEvents.map((event, index) => (
            <TextRow key={index} content={event} />
          ))}
        </ul>
      </div>
      <div className="space-y-1">
        <h3 className="text-sm uppercase tracking-wide text-gray-400">Outlook</h3>
        <p className="text-gray-100">{review.outlook.en}</p>
        <p className="text-sm text-gray-300">{review.outlook.zh}</p>
      </div>
      <footer className="text-xs text-gray-500 text-right">
        Aureon Capital Research Desk · Auto-updated by CodeX
      </footer>
    </section>
  );
}
