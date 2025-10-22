export const metadata = {
  title: "Services — AUREON CAPITAL LIMITED",
};

export default function Page() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="h1">Our Core Services</h1>
        <p className="p-lg mt-3 max-w-3xl">
          We provide integrated advisory and research solutions designed to navigate the complexity of digital and global markets.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="h2 text-2xl">Digital Asset Strategy Consulting</h3>
          <p className="mt-3 text-gray-300">
            Advisory on crypto asset allocation, market structure analysis, and regulatory alignment.
          </p>
        </div>
        <div className="card">
          <h3 className="h2 text-2xl">Algorithmic & Quantitative Research</h3>
          <p className="mt-3 text-gray-300">
            Development of backtested trading models and systematic execution strategies across spot, futures, and derivatives markets.
          </p>
        </div>
        <div className="card">
          <h3 className="h2 text-2xl">Market Intelligence & Risk Advisory</h3>
          <p className="mt-3 text-gray-300">
            Data-driven insights on macroeconomic shifts, liquidity conditions, and cross-asset risk metrics.
          </p>
        </div>
        <div className="card">
          <h3 className="h2 text-2xl">Digital Transformation Consultancy</h3>
          <p className="mt-3 text-gray-300">
            Integration of AI, analytics, and automation tools into institutional decision-making processes.
          </p>
        </div>
      </div>
    </div>
  );
}