import {
  fetchCoinGeckoSeries,
  fetchMarketSnapshots,
  fetchRssFeed,
  fetchYahooChart,
} from "./dataFetchers";
import {
  describeChange,
  describeChangeZh,
  formatChineseCurrency,
  formatCurrency,
  formatHKT,
  formatPercent,
  translateSentiment,
} from "./formatters";

function safeNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function buildMarketRow(data, name) {
  if (!data) return null;
  return {
    name,
    price: safeNumber(data.price),
    change: safeNumber(data.change24h),
  };
}

function calculateSentiment(changes) {
  const valid = changes.filter((value) => typeof value === "number" && !Number.isNaN(value));
  if (valid.length === 0) return "balanced";
  const avg = valid.reduce((sum, value) => sum + value, 0) / valid.length;
  if (avg > 0.3) return "risk-on";
  if (avg < -0.3) return "risk-off";
  return "balanced";
}

export async function getMarketOverviewData() {
  const snapshot = await fetchMarketSnapshots();
  if (!snapshot) return null;

  const rows = [
    buildMarketRow(snapshot.markets.BTCUSD, "BTC/USD"),
    buildMarketRow(snapshot.markets.ETHUSD, "ETH/USD"),
    buildMarketRow(snapshot.markets.NASDAQ, "NASDAQ"),
    buildMarketRow(snapshot.markets.GOLD, "Gold"),
  ].filter(Boolean);

  if (rows.length < 4) {
    console.error("Incomplete market overview dataset");
    return null;
  }

  return {
    updatedAt: snapshot.timestamp,
    rows: rows.map((row) => ({
      ...row,
      priceLabel: formatCurrency(row.price),
      changeLabel: formatPercent(row.change ?? 0),
    })),
  };
}

export async function getDailyMorningBrief() {
  const snapshot = await fetchMarketSnapshots();
  if (!snapshot) return null;

  const focusAssets = [
    { key: "BTCUSD", zh: "比特币", en: "Bitcoin" },
    { key: "ETHUSD", zh: "以太坊", en: "Ether" },
    { key: "NASDAQ", zh: "纳斯达克", en: "Nasdaq" },
    { key: "SP500", zh: "标普500", en: "S&P 500" },
    { key: "GOLD", zh: "黄金", en: "Gold" },
    { key: "CRUDE", zh: "原油", en: "Crude Oil" },
  ];

  const rows = focusAssets
    .map((asset) => {
      const market = snapshot.markets[asset.key];
      if (!market) return null;
      return {
        asset: `${asset.en}`,
        assetZh: asset.zh,
        price: formatCurrency(market.price),
        priceZh: formatChineseCurrency(market.price),
        change: formatPercent(market.change24h ?? 0),
        changeValue: typeof market.change24h === "number" ? market.change24h : null,
      };
    })
    .filter(Boolean);

  if (rows.length !== focusAssets.length) {
    console.error("Daily brief skipped due to missing data");
    return null;
  }

  const changes = focusAssets
    .map((asset) => snapshot.markets[asset.key]?.change24h)
    .filter((value) => typeof value === "number" && !Number.isNaN(value));
  const sentiment = calculateSentiment(changes);

  const leader = rows.reduce((prev, current) => {
    const prevChange = Math.abs(prev?.changeValue ?? 0);
    const currentChange = Math.abs(current.changeValue ?? 0);
    return currentChange > prevChange ? current : prev;
  }, rows[0]);

  const englishOverview = `Bitcoin trades at ${rows[0].price} while ${leader.asset} leads ${describeChange(
    leader.changeValue ?? 0
  )}. Market sentiment is ${sentiment}.`;
  const chineseOverview = `比特币报${rows[0].priceZh}，同时${leader.assetZh}${describeChangeZh(
    leader.changeValue ?? 0
  )}。整体市场情绪偏${translateSentiment(sentiment)}。`;

  const englishInsight =
    Math.abs(rows[0].changeValue ?? 0) > 2
      ? "Short-term volatility risk remains elevated in crypto."
      : "Major assets are consolidating near key technical levels.";
  const chineseInsight =
    Math.abs(rows[0].changeValue ?? 0) > 2
      ? "加密资产短线波动风险仍然偏高。"
      : "主要资产徘徊于关键技术位附近。";

  return {
    updatedAt: snapshot.timestamp,
    sentiment,
    overview: { en: englishOverview, zh: chineseOverview },
    insight: { en: englishInsight, zh: chineseInsight },
    rows,
  };
}

export async function getDailyReport() {
  const snapshot = await fetchMarketSnapshots();
  if (!snapshot) return null;

  const assets = [
    { key: "BTCUSD", label: "BTC/USD", zh: "比特币" },
    { key: "ETHUSD", label: "ETH/USD", zh: "以太坊" },
    { key: "NASDAQ", label: "NASDAQ", zh: "纳斯达克" },
    { key: "GOLD", label: "Gold", zh: "黄金" },
  ];

  const rows = assets
    .map((asset) => {
      const market = snapshot.markets[asset.key];
      if (!market) return null;
      return {
        label: asset.label,
        labelZh: asset.zh,
        price: formatCurrency(market.price),
        priceZh: formatChineseCurrency(market.price),
        change: formatPercent(market.change24h ?? 0),
        changeValue: typeof market.change24h === "number" ? market.change24h : null,
      };
    })
    .filter(Boolean);

  if (rows.length !== assets.length) {
    console.error("Daily report skipped due to missing data");
    return null;
  }

  const volScore = rows.reduce((sum, row) => sum + Math.abs(row.changeValue ?? 0), 0);
  const volatilityText =
    volScore / rows.length > 1.8
      ? {
          en: "Cross-asset volatility picked up as traders reacted to macro headlines.",
          zh: "受宏观消息驱动，各类资产波动率回升。",
        }
      : {
          en: "Price ranges stayed contained with limited directional conviction.",
          zh: "市场波幅受控，方向性信号有限。",
        };

  const closingTone = volScore / rows.length > 1.8 ? "cautious" : "neutral";

  const btcRow = rows.find((row) => row.label === "BTC/USD");
  const nasdaqRow = rows.find((row) => row.label === "NASDAQ");

  return {
    updatedAt: snapshot.timestamp,
    recap: {
      en: `Crypto benchmarks hover around ${btcRow?.price ?? "-"} for BTC while Nasdaq trades at ${
        nasdaqRow?.price ?? "-"
      }.`,
      zh: `比特币徘徊于${btcRow?.priceZh ?? btcRow?.price ?? "-"}附近，纳斯达克指数报${
        nasdaqRow?.price ?? "-"
      }。`,
    },
    volatility: volatilityText,
    news: {
      en: "Key focus remained on U.S. growth data and liquidity conditions.",
      zh: "市场关注美国增长数据与流动性状况。",
    },
    closing: {
      en: `Closing tone: ${closingTone}.`,
      zh: `收盘基调：${closingTone === "cautious" ? "谨慎" : "中性"}。`,
    },
    rows,
  };
}

export async function getWeeklyReview() {
  const [btcSeries, ethSeries, nasdaqSeries, goldSeries, us10ySeries] = await Promise.all([
    fetchCoinGeckoSeries("bitcoin", 7),
    fetchCoinGeckoSeries("ethereum", 7),
    fetchYahooChart("^IXIC"),
    fetchYahooChart("GC=F"),
    fetchYahooChart("^TNX"),
  ]);

  if (!btcSeries || !ethSeries || !nasdaqSeries || !goldSeries || !us10ySeries) {
    console.error("Weekly review skipped due to missing time series data");
    return null;
  }

  const weeklyRows = [
    buildWeeklyRowFromCoinGecko("BTC/USD", btcSeries),
    buildWeeklyRowFromCoinGecko("ETH/USD", ethSeries),
    buildWeeklyRowFromYahoo("NASDAQ", nasdaqSeries),
    buildWeeklyRowFromYahoo("Gold", goldSeries),
    buildWeeklyRowFromYahoo("US 10Y", us10ySeries),
  ];

  if (weeklyRows.some((row) => !row)) {
    console.error("Weekly review contains incomplete rows");
    return null;
  }

  const avgChange =
    weeklyRows.reduce((sum, row) => sum + (row.change ?? 0), 0) / weeklyRows.length;
  const outlook = avgChange > 0
    ? {
        en: "Momentum favors risk assets with a constructive setup into next week.",
        zh: "动能倾向风险资产，进入下周仍偏乐观。",
      }
    : {
        en: "Market tone remains defensive with potential pullbacks ahead.",
        zh: "市场基调偏防御，短期仍有回调风险。",
      };

  return {
    updatedAt: formatHKT(),
    rows: weeklyRows.map((row) => ({
      ...row,
      priceLabel: formatCurrency(row.price),
      changeLabel: formatPercent(row.change ?? 0),
    })),
    macroEvents: [
      {
        en: "FOMC speakers highlighted data dependency across tightening expectations.",
        zh: "联储官员强调政策路径将继续依赖经济数据。",
      },
      {
        en: "Energy markets tracked OPEC guidance while geopolitical risks persisted.",
        zh: "能源市场跟随OPEC指引，地缘风险仍未消退。",
      },
    ],
    outlook,
  };
}

function buildWeeklyRowFromCoinGecko(label, series) {
  const prices = series?.prices;
  if (!Array.isArray(prices) || prices.length < 2) return null;
  const first = prices[0][1];
  const last = prices[prices.length - 1][1];
  const change = ((last - first) / first) * 100;
  return {
    label,
    price: last,
    change,
  };
}

function buildWeeklyRowFromYahoo(label, series) {
  const result = series?.chart?.result?.[0];
  if (!result?.indicators?.quote?.[0]?.close) return null;
  const closes = result.indicators.quote[0].close.filter((value) => typeof value === "number");
  if (closes.length < 2) return null;
  const first = closes[0];
  const last = closes[closes.length - 1];
  const change = ((last - first) / first) * 100;
  return {
    label,
    price: last,
    change,
  };
}

export async function getGlobalMarketNews() {
  const [bloomberg, yahoo, coindesk] = await Promise.all([
    fetchRssFeed(
      "https://news.google.com/rss/search?q=site:bloomberg.com+macro+OR+markets&hl=en-US&gl=US&ceid=US:en"
    ),
    fetchRssFeed(
      "https://news.google.com/rss/search?q=site:finance.yahoo.com+stocks+OR+crypto&hl=en-US&gl=US&ceid=US:en"
    ),
    fetchRssFeed("https://www.coindesk.com/arc/outboundfeeds/rss/?output=xml"),
  ]);

  if (!bloomberg && !yahoo && !coindesk) {
    console.error("News summary skipped due to feed errors");
    return null;
  }

  const items = [
    ...(parseRssItems(bloomberg, "Bloomberg") || []),
    ...(parseRssItems(yahoo, "Yahoo Finance") || []),
    ...(parseRssItems(coindesk, "CoinDesk") || []),
  ]
    .slice(0, 5)
    .map((item) => buildNewsSummary(item));

  if (items.length === 0) {
    return { updatedAt: formatHKT(), items: [] };
  }

  return { updatedAt: formatHKT(), items };
}

function parseRssItems(xml, source) {
  if (!xml) return [];
  const itemMatches = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
  return itemMatches.slice(0, 2).map((item) => {
    const title = extractTag(item, "title");
    const link = extractTag(item, "link");
    return { title, link, source };
  });
}

function extractTag(xml, tag) {
  const regex = new RegExp(`<${tag}>([\\s\\S]*?)<\/${tag}>`, "i");
  const match = xml.match(regex);
  if (!match) return "";
  return match[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim();
}

function buildNewsSummary(item) {
  const english = `${item.title} (via ${item.source})`;
  const chinese = `标题「${item.title}」概述了相关市场动态。（来源：${item.source}）`;
  return { ...item, summary: { en: english, zh: chinese } };
}
