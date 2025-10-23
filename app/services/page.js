export const metadata = {
  title: "Services — AUREON CAPITAL LIMITED",
};

export default function Page() {
  return (
    <div className="space-y-12">
      <header className="space-y-3">
        <h1 className="h1">Our Core Services</h1>
        <p className="p-lg max-w-3xl">
          We provide integrated advisory and research solutions designed to navigate the complexity of digital and global markets.
          Our multidisciplinary team combines regulatory intelligence, quantitative engineering, and operational expertise.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="h2 text-2xl">Digital Asset Strategy Consulting</h3>
          <p className="mt-3 text-gray-300">
            Advisory on crypto asset allocation, market structure analysis, and regulatory alignment.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gray-400">
            <li>Tokenomics, treasury, and liquidity design</li>
            <li>Exchange launch, licensing, and operating model reviews</li>
            <li>Competitive benchmarking across APAC digital asset hubs</li>
          </ul>
        </div>
        <div className="card">
          <h3 className="h2 text-2xl">Algorithmic & Quantitative Research</h3>
          <p className="mt-3 text-gray-300">
            Development of backtested trading models and systematic execution strategies across spot, futures, and derivatives markets.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gray-400">
            <li>Alpha research pipelines with governance controls</li>
            <li>Market microstructure analysis and execution optimization</li>
            <li>Risk-adjusted performance diagnostics and reporting</li>
          </ul>
        </div>
        <div className="card">
          <h3 className="h2 text-2xl">Market Intelligence & Risk Advisory</h3>
          <p className="mt-3 text-gray-300">
            Data-driven insights on macroeconomic shifts, liquidity conditions, and cross-asset risk metrics.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gray-400">
            <li>Liquidity heatmaps and funding analytics</li>
            <li>Scenario planning for regulatory and geopolitical developments</li>
            <li>Board-level briefings and investment committee support</li>
          </ul>
        </div>
        <div className="card">
          <h3 className="h2 text-2xl">Digital Transformation Consultancy</h3>
          <p className="mt-3 text-gray-300">
            Integration of AI, analytics, and automation tools into institutional decision-making processes.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gray-400">
            <li>Operating model redesign for front-to-back integration</li>
            <li>Vendor selection, RFP support, and implementation oversight</li>
            <li>Change management and capability-building programs</li>
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <h2 className="h2 text-3xl">Engagement Models</h2>
            <p className="text-gray-300">
              Choose from modular programs tailored to your organization’s maturity level. Each model is underpinned by a governance
              charter and measurable KPIs.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card h-full border border-zinc-800 bg-transparent">
              <h3 className="text-lg font-semibold text-gray-100">Advisory Retainer</h3>
              <p className="mt-2 text-sm text-gray-300">Monthly strategy clinics, executive briefings, and on-demand research support.</p>
            </div>
            <div className="card h-full border border-zinc-800 bg-transparent">
              <h3 className="text-lg font-semibold text-gray-100">Transformation Sprint</h3>
              <p className="mt-2 text-sm text-gray-300">6–12 week engagements to design and implement specific operating capabilities.</p>
            </div>
            <div className="card h-full border border-zinc-800 bg-transparent">
              <h3 className="text-lg font-semibold text-gray-100">Managed Intelligence</h3>
              <p className="mt-2 text-sm text-gray-300">Continuous delivery of market, regulatory, and risk dashboards for leadership teams.</p>
            </div>
            <div className="card h-full border border-zinc-800 bg-transparent">
              <h3 className="text-lg font-semibold text-gray-100">Joint Venture Build</h3>
              <p className="mt-2 text-sm text-gray-300">Partner-led operating entities with shared governance and performance oversight.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="h2 text-3xl">Delivery Toolkit</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="card h-full">
            <h3 className="text-lg font-semibold text-gray-100">Regulatory Intelligence Hub</h3>
            <p className="mt-2 text-sm text-gray-300">Dynamic trackers covering Hong Kong, Singapore, EU, and Middle East regulatory developments.</p>
          </div>
          <div className="card h-full">
            <h3 className="text-lg font-semibold text-gray-100">Quantitative Research Stack</h3>
            <p className="mt-2 text-sm text-gray-300">Model governance, backtesting infrastructure, and execution simulators for digital assets.</p>
          </div>
          <div className="card h-full">
            <h3 className="text-lg font-semibold text-gray-100">Risk & Controls Framework</h3>
            <p className="mt-2 text-sm text-gray-300">Policy templates, playbooks, and metrics enabling enterprise-grade operational resilience.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
