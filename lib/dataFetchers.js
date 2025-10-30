import { formatHKT } from "./formatters";

const DEFAULT_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "application/json, text/plain, */*",
};

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { ...DEFAULT_HEADERS, ...(options.headers || {}) },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed for ${url}: ${response.status}`);
  }

  return response.json();
}

export async function fetchMarketSnapshots() {
  try {
    const coingeckoUrl =
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true";
    const yahooUrl =
      "https://query1.finance.yahoo.com/v7/finance/quote?symbols=%5EIXIC,GC=F,%5EGSPC,CL=F,%5ETNX";

    const [coinGeckoData, yahooData] = await Promise.all([
      fetchJson(coingeckoUrl),
      fetchJson(yahooUrl),
    ]);

    const results = yahooData?.quoteResponse?.result || [];
    if (!coinGeckoData?.bitcoin || results.length === 0) {
      throw new Error("Insufficient market data returned from upstream");
    }

    const quoteMap = Object.fromEntries(results.map((item) => [item.symbol, item]));

    return {
      timestamp: formatHKT(),
      markets: {
        BTCUSD: {
          label: "BTC/USD",
          price: coinGeckoData.bitcoin.usd,
          change24h: coinGeckoData.bitcoin.usd_24h_change,
        },
        ETHUSD: {
          label: "ETH/USD",
          price: coinGeckoData.ethereum.usd,
          change24h: coinGeckoData.ethereum.usd_24h_change,
        },
        NASDAQ: mapYahooQuote(quoteMap["^IXIC"], "NASDAQ"),
        GOLD: mapYahooQuote(quoteMap["GC=F"], "Gold"),
        SP500: mapYahooQuote(quoteMap["^GSPC"], "S&P 500"),
        CRUDE: mapYahooQuote(quoteMap["CL=F"], "Crude Oil"),
        US10Y: mapYahooQuote(quoteMap["^TNX"], "US 10Y"),
      },
    };
  } catch (error) {
    console.error("Failed to fetch market snapshots", error);
    return null;
  }
}

function mapYahooQuote(quote, fallbackLabel) {
  if (!quote) return null;
  return {
    label: fallbackLabel,
    price: quote.regularMarketPrice ?? null,
    change24h: quote.regularMarketChangePercent ?? null,
    previousClose: quote.regularMarketPreviousClose ?? null,
    currency: quote.currency || "USD",
  };
}

export async function fetchYahooChart(symbol, range = "5d", interval = "1d") {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
      symbol
    )}?range=${range}&interval=${interval}`;
    return await fetchJson(url);
  } catch (error) {
    console.error(`Failed to fetch chart for ${symbol}`, error);
    return null;
  }
}

export async function fetchCoinGeckoSeries(id, days = 7) {
  try {
    const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`;
    return await fetchJson(url);
  } catch (error) {
    console.error(`Failed to fetch market chart for ${id}`, error);
    return null;
  }
}

export async function fetchRssFeed(url) {
  try {
    const response = await fetch(url, {
      headers: {
        ...DEFAULT_HEADERS,
        Accept: "application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`RSS request failed for ${url}: ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    console.error(`Failed to fetch RSS feed ${url}`, error);
    return null;
  }
}
