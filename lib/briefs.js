import { getExtendedMarketSnapshot } from "./market";
import { formatHKT } from "./time";

function classifySentiment(assetChanges) {
  const values = assetChanges.filter((value) => typeof value === "number");
  if (!values.length) {
    return "Neutral";
  }

  const average = values.reduce((sum, val) => sum + val, 0) / values.length;
  if (average > 0.3) return "Risk-on";
  if (average < -0.3) return "Risk-off";
  return "Neutral";
}

function bilingualSentence(english, chinese) {
  return { en: english, zh: chinese };
}

function formatChange(change) {
  if (typeof change !== "number" || Number.isNaN(change)) {
    return "n/a";
  }
  return `${change.toFixed(2)}%`;
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

export async function generateDailyBrief() {
  const snapshot = await getExtendedMarketSnapshot();
  if (snapshot.status !== "ready") {
    return { status: "error" };
  }

  const { assets } = snapshot;
  const sentiment = classifySentiment([
    assets.BTC?.change24h,
    assets.ETH?.change24h,
    assets.NASDAQ?.regularMarketChangePercent,
    assets.SP500?.regularMarketChangePercent,
    assets.GOLD?.regularMarketChangePercent,
    assets.CRUDE?.regularMarketChangePercent,
  ]);

  const sentimentText =
    sentiment === "Risk-on"
      ? bilingualSentence(
          "Market sentiment leans risk-on as gains extend across major benchmarks.",
          "主要指数普遍上涨，市场情绪偏向风险偏好。"
        )
      : sentiment === "Risk-off"
      ? bilingualSentence(
          "Market sentiment turns risk-off amid broad-based pressure on risk assets.",
          "风险资产全面承压，市场情绪偏向规避风险。"
        )
      : bilingualSentence(
          "Market sentiment remains cautious amid mixed signals from equities and crypto markets.",
          "市场情绪保持谨慎，风险资产短线波动加剧。"
        );

  const tacticalCue = (() => {
    const btcChange = assets.BTC?.change24h ?? 0;
    if (btcChange > 1.5) {
      return bilingualSentence(
        "Momentum turning constructive; watch resistance near recent highs.",
        "动能略显积极，留意近期高位阻力。"
      );
    }
    if (btcChange < -1.5) {
      return bilingualSentence(
        "Short-term downside risk elevated; monitor support retention.",
        "短期下行风险加剧，关注支撑位是否守住。"
      );
    }
    return bilingualSentence(
      "Range-bound trade likely; focus on catalysts from macro data releases.",
      "价格或维持区间震荡，关注宏观数据触发因素。"
    );
  })();

  const table = [
    {
      asset: "BTC/USD",
      price: formatPrice(assets.BTC?.price),
      change: formatChange(assets.BTC?.change24h),
    },
    {
      asset: "ETH/USD",
      price: formatPrice(assets.ETH?.price),
      change: formatChange(assets.ETH?.change24h),
    },
    {
      asset: "NASDAQ",
      price: formatPrice(assets.NASDAQ?.regularMarketPrice),
      change: formatChange(assets.NASDAQ?.regularMarketChangePercent),
    },
    {
      asset: "S&P 500",
      price: formatPrice(assets.SP500?.regularMarketPrice),
      change: formatChange(assets.SP500?.regularMarketChangePercent),
    },
    {
      asset: "GOLD",
      price: formatPrice(assets.GOLD?.regularMarketPrice),
      change: formatChange(assets.GOLD?.regularMarketChangePercent),
    },
    {
      asset: "Crude Oil",
      price: formatPrice(assets.CRUDE?.regularMarketPrice),
      change: formatChange(assets.CRUDE?.regularMarketChangePercent),
    },
  ];

  return {
    status: "ready",
    generatedAt: formatHKT(),
    overview: bilingualSentence(
      "Digital assets and equities open the session with a focus on macro catalysts, while commodities remain sensitive to supply narratives.",
      "数字资产与股市在宏观催化因素下开局，商品市场仍对供给叙事保持敏感。"
    ),
    sentiment: sentimentText,
    table,
    tactical: tacticalCue,
  };
}

export async function generateDailyReport() {
  const snapshot = await getExtendedMarketSnapshot();
  if (snapshot.status !== "ready") {
    return { status: "error" };
  }

  const { assets } = snapshot;
  const highlights = [];

  if (typeof assets.BTC?.change24h === "number") {
    highlights.push(
      bilingualSentence(
        `BTC consolidates near ${formatPrice(assets.BTC.price)} with a ${formatChange(assets.BTC.change24h)} move over 24h.`,
        `比特币在${formatPrice(assets.BTC.price)}附近整理，24小时变动${formatChange(assets.BTC.change24h)}。`
      )
    );
  }

  if (typeof assets.NASDAQ?.regularMarketChangePercent === "number") {
    highlights.push(
      bilingualSentence(
        `NASDAQ closes at ${formatPrice(assets.NASDAQ.regularMarketPrice)}, ${formatChange(assets.NASDAQ.regularMarketChangePercent)} on the day.`,
        `纳斯达克收于${formatPrice(assets.NASDAQ.regularMarketPrice)}点，日内变动${formatChange(assets.NASDAQ.regularMarketChangePercent)}。`
      )
    );
  }

  if (typeof assets.GOLD?.regularMarketChangePercent === "number") {
    highlights.push(
      bilingualSentence(
        `Gold trades at ${formatPrice(assets.GOLD.regularMarketPrice)}, ${formatChange(assets.GOLD.regularMarketChangePercent)} over 24h.`,
        `黄金价格为${formatPrice(assets.GOLD.regularMarketPrice)}，24小时变动${formatChange(assets.GOLD.regularMarketChangePercent)}。`
      )
    );
  }

  return {
    status: "ready",
    generatedAt: formatHKT(),
    recap: bilingualSentence(
      "Markets navigated a mixed tone today, with digital assets tracking broader risk sentiment and precious metals offering defensive balance.",
      "今日市场整体基调偏混合，数字资产随风险情绪波动，贵金属提供防御性平衡。"
    ),
    volatility: bilingualSentence(
      "Volatility remained contained, though option markets continue to price event risks into the week ahead.",
      "波动率维持可控，但期权市场仍对未来事件风险定价。"
    ),
    highlights,
    closing: bilingualSentence(
      "Market tone ends the day balanced, with positioning tuned to forthcoming catalysts.",
      "市场在收盘时维持平衡，仓位等待即将到来的催化因素。"
    ),
  };
}

export async function generateWeeklyReview() {
  const snapshot = await getExtendedMarketSnapshot();
  if (snapshot.status !== "ready") {
    return { status: "error" };
  }

  const { assets } = snapshot;
  const table = [
    {
      asset: "BTC/USD",
      price: formatPrice(assets.BTC?.price),
      change: formatChange(assets.BTC?.change24h),
    },
    {
      asset: "ETH/USD",
      price: formatPrice(assets.ETH?.price),
      change: formatChange(assets.ETH?.change24h),
    },
    {
      asset: "NASDAQ",
      price: formatPrice(assets.NASDAQ?.regularMarketPrice),
      change: formatChange(assets.NASDAQ?.regularMarketChangePercent),
    },
    {
      asset: "GOLD",
      price: formatPrice(assets.GOLD?.regularMarketPrice),
      change: formatChange(assets.GOLD?.regularMarketChangePercent),
    },
    {
      asset: "US10Y",
      price: formatPrice(assets.US10Y?.regularMarketPrice),
      change: formatChange(assets.US10Y?.regularMarketChangePercent),
    },
  ];

  return {
    status: "ready",
    generatedAt: formatHKT(),
    overview: bilingualSentence(
      "Weekly review highlights cross-asset flows reacting to macro signals and policy expectations.",
      "本周回顾聚焦跨资产资金在宏观信号与政策预期下的流动。"
    ),
    macroEvents: [
      bilingualSentence(
        "Monitor FOMC communications and upcoming CPI data for further guidance.",
        "关注美联储沟通及即将公布的CPI数据以获取指引。"
      ),
      bilingualSentence(
        "Energy markets track OPEC supply updates amid geopolitical developments.",
        "能源市场在地缘政治动态下关注OPEC供给更新。"
      ),
    ],
    outlook: bilingualSentence(
      "AI-generated outlook: expect tactical volatility with bias to range-bound trading next week.",
      "AI展望：预计下周战术性波动仍存，价格或维持区间运行。"
    ),
    table,
  };
}
