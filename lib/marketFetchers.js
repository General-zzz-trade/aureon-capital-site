const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true&precision=4";

const YAHOO_QUOTE_URL =
  "https://query1.finance.yahoo.com/v7/finance/quote?symbols=";

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
}

export async function fetchCoinGeckoPrices() {
  const data = await fetchJson(COINGECKO_URL);
  return {
    btc: {
      price: data?.bitcoin?.usd ?? null,
      change: data?.bitcoin?.usd_24h_change ?? null,
    },
    eth: {
      price: data?.ethereum?.usd ?? null,
      change: data?.ethereum?.usd_24h_change ?? null,
    },
  };
}

export async function fetchYahooQuotes(symbols) {
  const url = `${YAHOO_QUOTE_URL}${encodeURIComponent(symbols.join(","))}`;
  const data = await fetchJson(url);
  const results = data?.quoteResponse?.result ?? [];
  const map = new Map();
  for (const item of results) {
    map.set(item.symbol, {
      price: item.regularMarketPrice ?? null,
      change: item.regularMarketChangePercent ?? null,
      previousClose: item.regularMarketPreviousClose ?? null,
      shortName: item.shortName || item.longName || item.symbol,
      currency: item.currency || "USD",
    });
  }
  return map;
}

export async function checkSourceAvailability() {
  const checks = [
    fetchJson("https://api.coingecko.com/api/v3/ping"),
    fetchJson(`${YAHOO_QUOTE_URL}${encodeURIComponent("^IXIC")}`),
    fetch("https://www.bloomberg.com/markets/api/markets/most-read", {
      headers: { Accept: "application/json" },
    }),
    fetch("https://news.yahoo.com/rss/", {
      method: "HEAD",
    }),
    fetch("https://www.coindesk.com/arc/outboundfeeds/rss/?output=rss", {
      method: "HEAD",
    }),
  ];
  try {
    const responses = await Promise.all(checks);
    return responses.every((res) => !res || res.ok !== false);
  } catch (error) {
    return false;
  }
}

export async function fetchRssFeed(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/rss+xml, application/xml",
    },
  });
  if (!response.ok) {
    throw new Error(`RSS request failed: ${response.status}`);
  }
  const text = await response.text();
  return text;
}
