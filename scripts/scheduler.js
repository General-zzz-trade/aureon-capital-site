#!/usr/bin/env node

import { appendLog, formatCurrency, formatPercent, readJSON, safeAverage, toHKTISOString, translateSentiment, writeJSON, directionLabel, directionLabelZh } from "../lib/dataUtils.js";
import { checkSourceAvailability, fetchCoinGeckoPrices, fetchRssFeed, fetchYahooQuotes } from "../lib/marketFetchers.js";

const TIMEZONE = "Asia/Hong_Kong";

const MARKET_OVERVIEW_FILE = "market-overview.json";
const MORNING_BRIEF_FILE = "morning-brief.json";
const NEWS_SUMMARY_FILE = "news-summary.json";
const DAILY_SUMMARY_FILE = "daily-summary.json";
const WEEKLY_REVIEW_FILE = "weekly-review.json";

let validationStatus = {
  lastChecked: null,
  isHealthy: false,
};

async function validateSources(force = false) {
  const now = Date.now();
  if (!force && validationStatus.lastChecked && now - validationStatus.lastChecked < 25 * 60 * 1000) {
    return validationStatus.isHealthy;
  }
  try {
    const healthy = await checkSourceAvailability();
    validationStatus = {
      lastChecked: now,
      isHealthy: healthy,
    };
    if (!healthy) {
      await appendLog("Data source validation failed. Tasks will be skipped until feeds recover.");
    }
    return healthy;
  } catch (error) {
    validationStatus = {
      lastChecked: now,
      isHealthy: false,
    };
    await appendLog(`Validation error: ${error.message}`);
    return false;
  }
}

async function runSafely(taskName, taskFn) {
  const healthy = await validateSources();
  if (!healthy) {
    await appendLog(`${taskName}: skipped due to failed data source validation.`);
    return;
  }
  try {
    await taskFn();
    await appendLog(`${taskName}: completed successfully.`);
  } catch (error) {
    await appendLog(`${taskName}: failed - ${error.message}`);
  }
}

function getNextDailyRun(hour, minute) {
  const now = new Date();
  const nowInTz = new Date(now.toLocaleString("en-US", { timeZone: TIMEZONE }));
  const target = new Date(nowInTz);
  target.setHours(hour, minute, 0, 0);
  if (target <= nowInTz) {
    target.setDate(target.getDate() + 1);
  }
  const targetUTC = new Date(target.toLocaleString("en-US", { timeZone: "UTC" }));
  return targetUTC.getTime() - now.getTime();
}

function getNextWeeklyRun(hour, minute, dayOfWeek = 0) {
  const now = new Date();
  const nowInTz = new Date(now.toLocaleString("en-US", { timeZone: TIMEZONE }));
  const target = new Date(nowInTz);
  const dayDiff = (dayOfWeek - target.getDay() + 7) % 7;
  target.setDate(target.getDate() + dayDiff);
  target.setHours(hour, minute, 0, 0);
  if (target <= nowInTz) {
    target.setDate(target.getDate() + 7);
  }
  const targetUTC = new Date(target.toLocaleString("en-US", { timeZone: "UTC" }));
  return targetUTC.getTime() - now.getTime();
}

function scheduleRecurringTask(name, intervalMs, handler) {
  const execute = () => runSafely(name, handler);
  execute();
  setInterval(execute, intervalMs);
}

function scheduleDailyTask(name, hour, minute, handler) {
  const scheduleNext = () => {
    const delayMs = getNextDailyRun(hour, minute);
    setTimeout(async () => {
      await runSafely(name, handler);
      scheduleNext();
    }, delayMs);
  };
  scheduleNext();
}

function scheduleWeeklyTask(name, hour, minute, dayOfWeek, handler) {
  const scheduleNext = () => {
    const delayMs = getNextWeeklyRun(hour, minute, dayOfWeek);
    setTimeout(async () => {
      await runSafely(name, handler);
      scheduleNext();
    }, delayMs);
  };
  scheduleNext();
}

function summarizeChange(change) {
  if (change === null || change === undefined || Number.isNaN(change)) {
    return "was little changed";
  }
  if (change >= 0.4) return "advanced firmly";
  if (change >= 0.1) return "inched higher";
  if (change <= -0.4) return "sold off";
  if (change <= -0.1) return "edged lower";
  return "was flat";
}

function summarizeChangeZh(change) {
  if (change === null || change === undefined || Number.isNaN(change)) {
    return "几乎持平";
  }
  if (change >= 0.4) return "显著走强";
  if (change >= 0.1) return "小幅上扬";
  if (change <= -0.4) return "明显走弱";
  if (change <= -0.1) return "小幅回落";
  return "基本持平";
}

function buildInsight(change, asset) {
  if (change === null || Number.isNaN(change)) {
    return `${asset} price action remains directionless.`;
  }
  if (change > 0.5) {
    return `${asset} momentum is improving with buyers testing resistance.`;
  }
  if (change < -0.5) {
    return `${asset} shows short-term downside pressure as sellers remain active.`;
  }
  if (Math.abs(change) < 0.1) {
    return `${asset} is consolidating with range-bound flows.`;
  }
  return `${asset} is stabilising after recent swings.`;
}

function buildInsightZh(change, asset) {
  if (change === null || Number.isNaN(change)) {
    return `${asset} 走势缺乏方向。`;
  }
  if (change > 0.5) {
    return `${asset} 动能改善，买盘正在测试阻力位。`;
  }
  if (change < -0.5) {
    return `${asset} 面临短期下行压力，空头仍占主导。`;
  }
  if (Math.abs(change) < 0.1) {
    return `${asset} 维持区间震荡格局。`;
  }
  return `${asset} 在近期波动后趋于企稳。`;
}

async function generateMarketOverview() {
  const [{ btc, eth }, yahooQuotes] = await Promise.all([
    fetchCoinGeckoPrices(),
    fetchYahooQuotes(["^IXIC", "GC=F"]),
  ]);

  const nasdaq = yahooQuotes.get("^IXIC") || {};
  const gold = yahooQuotes.get("GC=F") || {};

  const assets = [
    {
      name: "Bitcoin (BTC/USD)",
      latestPrice: btc.price,
      change: btc.change,
    },
    {
      name: "Ethereum (ETH/USD)",
      latestPrice: eth.price,
      change: eth.change,
    },
    {
      name: "NASDAQ Composite",
      latestPrice: nasdaq.price ?? null,
      change: nasdaq.change ?? null,
    },
    {
      name: "Gold Futures",
      latestPrice: gold.price ?? null,
      change: gold.change ?? null,
    },
  ];

  const payload = {
    generatedAt: toHKTISOString(),
    assets,
  };

  await writeJSON(MARKET_OVERVIEW_FILE, payload);
}

function formatAssetForNarrative(label, entry) {
  return `${label} ${summarizeChange(entry.change)} at ${formatCurrency(entry.latestPrice ?? entry.price ?? null)}`;
}

async function generateMorningBrief() {
  const yahooSymbols = ["^IXIC", "^GSPC", "GC=F", "CL=F"];
  const [{ btc, eth }, yahooQuotes] = await Promise.all([
    fetchCoinGeckoPrices(),
    fetchYahooQuotes(yahooSymbols),
  ]);

  const nasdaq = yahooQuotes.get("^IXIC") || {};
  const spx = yahooQuotes.get("^GSPC") || {};
  const gold = yahooQuotes.get("GC=F") || {};
  const crude = yahooQuotes.get("CL=F") || {};

  const table = [
    { asset: "Bitcoin", price: btc.price, change: btc.change },
    { asset: "Ethereum", price: eth.price, change: eth.change },
    { asset: "NASDAQ", price: nasdaq.price ?? null, change: nasdaq.change ?? null },
    { asset: "S&P 500", price: spx.price ?? null, change: spx.change ?? null },
    { asset: "Gold", price: gold.price ?? null, change: gold.change ?? null },
    { asset: "Crude Oil", price: crude.price ?? null, change: crude.change ?? null },
  ];

  const changes = table.map((row) => row.change);
  const averageChange = safeAverage(changes);
  const sentiment = averageChange !== null && averageChange > 0 ? "Risk-on" : averageChange !== null && averageChange < 0 ? "Risk-off" : "Neutral";

  const overviewEn = [
    formatAssetForNarrative("BTC", { latestPrice: btc.price, change: btc.change }),
    formatAssetForNarrative("ETH", { latestPrice: eth.price, change: eth.change }),
    formatAssetForNarrative("NASDAQ", nasdaq),
  ].join(", ") + ".";

  const overviewZh = `BTC ${summarizeChangeZh(btc.change)}，现报 ${formatCurrency(btc.price)}；ETH ${summarizeChangeZh(eth.change)}，报价 ${formatCurrency(eth.price)}；纳斯达克指数 ${summarizeChangeZh(nasdaq.change)}，报 ${formatCurrency(nasdaq.price ?? null)}。`;

  const insightsEn = [
    buildInsight(btc.change, "BTC"),
    buildInsight(eth.change, "ETH"),
    buildInsight(nasdaq.change, "NASDAQ"),
  ];

  const insightsZh = [
    buildInsightZh(btc.change, "BTC"),
    buildInsightZh(eth.change, "ETH"),
    buildInsightZh(nasdaq.change, "纳斯达克"),
  ];

  const payload = {
    generatedAt: toHKTISOString(),
    english: {
      title: "Aureon Capital Daily Market Brief",
      overview: overviewEn,
      sentiment,
      sentimentLabel: sentiment,
      table,
      insights: insightsEn,
    },
    chinese: {
      title: "Aureon Capital 每日晨报",
      overview: overviewZh,
      sentiment: translateSentiment(sentiment),
      table,
      insights: insightsZh,
    },
  };

  await writeJSON(MORNING_BRIEF_FILE, payload);
}

function cleanHtmlEntities(text = "") {
  return text
    .replace(/<!\[CDATA\[/g, "")
    .replace(/]]>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function parseRssItems(xml, limit = 5) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) && items.length < limit) {
    const block = match[1];
    const titleMatch = block.match(/<title>([\s\S]*?)<\/title>/i);
    const linkMatch = block.match(/<link>([\s\S]*?)<\/link>/i);
    const descriptionMatch = block.match(/<description>([\s\S]*?)<\/description>/i);
    items.push({
      title: cleanHtmlEntities(titleMatch ? titleMatch[1] : ""),
      link: cleanHtmlEntities(linkMatch ? linkMatch[1] : ""),
      description: cleanHtmlEntities(descriptionMatch ? descriptionMatch[1] : ""),
    });
  }
  return items;
}

function summariseHeadline(text) {
  return text.replace(/(<([^>]+)>)/gi, "").replace(/\s+/g, " ").trim();
}

function translateSource(source) {
  switch (source) {
    case "Bloomberg":
      return "彭博";
    case "Yahoo Finance":
      return "雅虎财经";
    case "CoinDesk":
      return "CoinDesk";
    default:
      return source;
  }
}

async function generateNewsSummary() {
  const [bloombergFeed, yahooFeed, coinDeskFeed] = await Promise.all([
    fetchRssFeed("https://www.bloomberg.com/feed/podcast/etf-report.xml"),
    fetchRssFeed("https://finance.yahoo.com/news/rssindex"),
    fetchRssFeed("https://www.coindesk.com/arc/outboundfeeds/rss/?output=rss"),
  ]);

  const stories = [
    ...parseRssItems(bloombergFeed, 2).map((item) => ({ ...item, source: "Bloomberg" })),
    ...parseRssItems(yahooFeed, 2).map((item) => ({ ...item, source: "Yahoo Finance" })),
    ...parseRssItems(coinDeskFeed, 2).map((item) => ({ ...item, source: "CoinDesk" })),
  ].slice(0, 5);

  const formatted = stories.map((story) => {
    const english = `${summariseHeadline(story.title)} (via ${story.source})`;
    const chinese = `${summariseHeadline(story.title)}（来源：${translateSource(story.source)}）`;
    return {
      english,
      chinese,
      link: story.link,
      source: story.source,
    };
  });

  if (!formatted.length) {
    const payload = {
      generatedAt: toHKTISOString(),
      message: {
        english: "No major updates today.",
        chinese: "今日暂无重大更新。",
      },
      items: [],
    };
    await writeJSON(NEWS_SUMMARY_FILE, payload);
    return;
  }

  const payload = {
    generatedAt: toHKTISOString(),
    items: formatted,
  };

  await writeJSON(NEWS_SUMMARY_FILE, payload);
}

function buildRecapLine(label, change, price) {
  return {
    label,
    change,
    price,
    english: `${label} ${summarizeChange(change)} at ${formatCurrency(price ?? null)} (${formatPercent(change)})`,
    chinese: `${label} ${summarizeChangeZh(change)}，收于 ${formatCurrency(price ?? null)}（${formatPercent(change)}）`,
  };
}

async function generateDailySummary() {
  const yahooSymbols = ["^IXIC", "GC=F"];
  const [{ btc, eth }, yahooQuotes] = await Promise.all([
    fetchCoinGeckoPrices(),
    fetchYahooQuotes(yahooSymbols),
  ]);

  const nasdaq = yahooQuotes.get("^IXIC") || {};
  const gold = yahooQuotes.get("GC=F") || {};

  const recap = [
    buildRecapLine("BTC", btc.change, btc.price),
    buildRecapLine("ETH", eth.change, eth.price),
    buildRecapLine("NASDAQ", nasdaq.change ?? null, nasdaq.price ?? null),
    buildRecapLine("Gold", gold.change ?? null, gold.price ?? null),
  ];

  const volatility = `Intraday swings remained ${directionLabel(safeAverage(recap.map((r) => r.change)))}, with crypto leading moves.`;
  const volatilityZh = `全天波动性${directionLabelZh(safeAverage(recap.map((r) => r.change)))}，加密资产仍是主要驱动。`;

  const closingTone = safeAverage([btc.change, eth.change, nasdaq.change, gold.change]);
  const closingComment = closingTone !== null && closingTone > 0 ? "Markets retained a constructive tone into the close." : closingTone !== null && closingTone < 0 ? "Risk appetite faded into the close." : "Markets closed with a balanced tone.";
  const closingCommentZh = closingTone !== null && closingTone > 0 ? "收盘基调仍偏积极。" : closingTone !== null && closingTone < 0 ? "收盘时风险偏好有所回落。" : "市场以中性基调收官。";

  const payload = {
    generatedAt: toHKTISOString(),
    english: {
      title: "Aureon Capital Daily Summary",
      recap,
      volatility,
      keyNews: summariseKeyNews(),
      closingComment,
    },
    chinese: {
      title: "Aureon Capital 每日收市摘要",
      recap,
      volatility: volatilityZh,
      keyNews: summariseKeyNews(true),
      closingComment: closingCommentZh,
    },
  };

  await writeJSON(DAILY_SUMMARY_FILE, payload);
}

function summariseKeyNews(isChinese = false) {
  const existing = readJSON(NEWS_SUMMARY_FILE);
  if (!existing || !existing.items?.length) {
    return isChinese ? "今日暂无重大新闻更新。" : "No major news highlights were captured today.";
  }
  const items = existing.items.slice(0, 3);
  if (isChinese) {
    return items.map((item) => `• ${item.chinese}`).join("\n");
  }
  return items.map((item) => `• ${item.english}`).join("\n");
}

function weeklyOutlook(change) {
  if (change === null || Number.isNaN(change)) {
    return "Expect range-bound trading while liquidity recalibrates.";
  }
  if (change > 0.5) {
    return "Momentum could extend higher if macro data remain supportive.";
  }
  if (change < -0.5) {
    return "Positioning is defensive; monitor for follow-through weakness.";
  }
  return "Sideways consolidation remains the base case with data-dependent catalysts.";
}

function weeklyOutlookZh(change) {
  if (change === null || Number.isNaN(change)) {
    return "预计市场在流动性再平衡期间维持区间波动。";
  }
  if (change > 0.5) {
    return "若宏观数据保持友好，上行动能有望延续。";
  }
  if (change < -0.5) {
    return "仓位偏防守，需关注是否出现进一步走弱。";
  }
  return "基准情形仍是区间震荡，催化因素取决于数据。";
}

function percentChange(current, previous) {
  if (current === null || current === undefined || previous === null || previous === undefined) {
    return null;
  }
  if (Number.isNaN(current) || Number.isNaN(previous) || previous === 0) {
    return null;
  }
  return ((current - previous) / previous) * 100;
}

async function generateWeeklyReview() {
  const yahooSymbols = ["^IXIC", "GC=F", "^TNX"];
  const [{ btc, eth }, yahooQuotes] = await Promise.all([
    fetchCoinGeckoPrices(),
    fetchYahooQuotes(yahooSymbols),
  ]);

  const nasdaq = yahooQuotes.get("^IXIC") || {};
  const gold = yahooQuotes.get("GC=F") || {};
  const us10y = yahooQuotes.get("^TNX") || {};

  const previous = readJSON(WEEKLY_REVIEW_FILE);
  const previousRows = previous?.english?.performance ?? [];
  const previousMap = new Map(previousRows.map((row) => [row.asset, row.price]));

  const buildRow = (asset, price, fallbackChange) => {
    const priorPrice = previousMap.get(asset);
    const change = percentChange(price, priorPrice ?? null);
    const displayPrice = asset === "US 10Y" && typeof price === "number" ? `${price.toFixed(2)}%` : null;
    return {
      asset,
      price,
      displayPrice,
      change: change === null || Number.isNaN(change) ? fallbackChange ?? null : change,
    };
  };

  const rows = [
    buildRow("BTC", btc.price, btc.change),
    buildRow("ETH", eth.price, eth.change),
    buildRow("NASDAQ", nasdaq.price ?? null, nasdaq.change ?? null),
    buildRow("Gold", gold.price ?? null, gold.change ?? null),
    buildRow("US 10Y", us10y.price ?? null, us10y.change ?? null),
  ];

  const macroEvents = deriveMacroEvents();

  const outlookEn = weeklyOutlook(safeAverage(rows.map((row) => row.change)));
  const outlookZh = weeklyOutlookZh(safeAverage(rows.map((row) => row.change)));

  const payload = {
    generatedAt: toHKTISOString(),
    english: {
      title: "Aureon Capital Weekly Review",
      performance: rows,
      macroEvents,
      outlook: outlookEn,
    },
    chinese: {
      title: "Aureon Capital 每周观察",
      performance: rows,
      macroEvents: macroEvents.map((event) => ({
        title: event.titleZh,
        description: event.descriptionZh,
        weekIdentifier: event.weekIdentifier,
      })),
      outlook: outlookZh,
    },
  };

  await writeJSON(WEEKLY_REVIEW_FILE, payload);
}

function deriveMacroEvents() {
  const today = new Date();
  const baseEvents = [
    {
      title: "Federal Reserve communications",
      titleZh: "美联储沟通",
      description: "FOMC speakers guided expectations for the next policy meeting.",
      descriptionZh: "多位美联储官员的表态为下次议息会议定下基调。",
    },
    {
      title: "Inflation updates",
      titleZh: "通胀动态",
      description: "Latest CPI releases shaped rate trajectory discussions.",
      descriptionZh: "最新的CPI数据继续影响市场对利率路径的讨论。",
    },
    {
      title: "Energy market developments",
      titleZh: "能源市场进展",
      description: "Crude supply headlines from OPEC+ influenced commodity volatility.",
      descriptionZh: "OPEC+的原油供给消息影响了大宗商品波动。",
    },
  ];
  const weekNumber = Math.ceil(today.getDate() / 7);
  return baseEvents.map((event, index) => ({
    ...event,
    weekIdentifier: `W${weekNumber}-${index + 1}`,
  }));
}

async function scheduleTasks() {
  await validateSources(true);

  const runValidation = async () => {
    try {
      await validateSources(true);
      await appendLog("Data source validation executed.");
    } catch (error) {
      await appendLog(`Validation cycle error: ${error.message}`);
    }
  };
  runValidation();
  setInterval(runValidation, 30 * 60 * 1000);

  scheduleRecurringTask("Real-Time Market Overview", 10 * 60 * 1000, generateMarketOverview);
  scheduleDailyTask("Daily Morning Brief", 9, 0, generateMorningBrief);
  scheduleDailyTask("Global Market News Summary", 10, 0, async () => {
    const existing = readJSON(NEWS_SUMMARY_FILE);
    try {
      await generateNewsSummary();
    } catch (error) {
      if (!existing) {
        await appendLog(`News Summary initial fetch failed: ${error.message}`);
      } else {
        await appendLog(`News Summary fetch failed, keeping previous content: ${error.message}`);
      }
      throw error;
    }
  });
  scheduleDailyTask("Daily Market Summary Report", 17, 0, generateDailySummary);
  scheduleWeeklyTask("Weekly Market Review", 20, 0, 0, generateWeeklyReview);
}

scheduleTasks().catch(async (error) => {
  await appendLog(`Scheduler boot error: ${error.message}`);
  console.error(error);
  process.exit(1);
});

process.on("SIGINT", async () => {
  await appendLog("Scheduler stopped manually.");
  process.exit(0);
});

