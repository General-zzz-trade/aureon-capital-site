import Link from "next/link";
import { MarketOverviewSection } from "@/components/sections/MarketOverviewSection";
import { DailyBriefSection } from "@/components/sections/DailyBriefSection";
import { GlobalMarketNewsSection } from "@/components/sections/GlobalMarketNewsSection";
import { DailyReportSection } from "@/components/sections/DailyReportSection";
import { WeeklyReviewSection } from "@/components/sections/WeeklyReviewSection";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <div className="space-y-14">
      <section className="text-center py-16 sm:py-24">
        <h1 className="h1">Strategic Intelligence for the Digital Asset Era</h1>
        <p className="p-lg mt-6 max-w-3xl mx-auto">
          A Hong Kong–based consultancy specializing in digital asset strategy, algorithmic trading systems, and market intelligence advisory.
        </p>
        <div className="mt-8">
          <Link href="/services" className="btn btn-primary">Explore Our Services</Link>
        </div>
      </section>

      <section className="grid sm:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="h2 text-xl">Quantitative Research</h3>
          <p className="mt-3 text-gray-300">Development of systematic trading models and execution frameworks.</p>
        </div>
        <div className="card">
          <h3 className="h2 text-xl">Digital Asset Strategy</h3>
          <p className="mt-3 text-gray-300">Consulting on crypto asset management, token economics, and exchange operations.</p>
        </div>
        <div className="card">
          <h3 className="h2 text-xl">Strategic Insights</h3>
          <p className="mt-3 text-gray-300">Macro, liquidity, and geopolitical risk intelligence for institutional clients.</p>
        </div>
      </section>

      <section className="text-center">
        <p className="text-gray-300 italic">Transforming data into strategy — empowering decisions in a volatile world.</p>
      </section>

      <MarketOverviewSection />
      <DailyBriefSection />
      <GlobalMarketNewsSection />
      <DailyReportSection />
      <WeeklyReviewSection />
    </div>
  );
}