const COINGECKO_ENDPOINT =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true&precision=4";

const YAHOO_ENDPOINT =
  "https://query1.finance.yahoo.com/v7/finance/quote?symbols=%5EIXIC,%5EGSPC,GC=F,CL=F,%5ETNX";

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "User-Agent": "AureonSiteBot/1.0",
      ...(options.headers || {}),
    },
    next: options.next,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return response.json();
}

function formatPercent(value) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return null;
  }

  return value;
}

export async function getMarketOverviewData() {
  try {
    const [crypto, yahoo] = await Promise.all([
      fetchJson(COINGECKO_ENDPOINT, { next: { revalidate: 600 } }),
      fetchJson(YAHOO_ENDPOINT, { next: { revalidate: 600 } }),
    ]);

    const quotes = yahoo?.quoteResponse?.result || [];
    const nasdaq = quotes.find((item) => item.symbol === "^IXIC");
    const gold = quotes.find((item) => item.symbol === "GC=F");

    if (!crypto?.bitcoin || !crypto?.ethereum || !nasdaq || !gold) {
      throw new Error("Incomplete market data");
    }

    const payload = [
      {
        asset: "BTC/USD",
        price: crypto.bitcoin.usd,
        change24h: formatPercent(crypto.bitcoin.usd_24h_change),
      },
      {
        asset: "ETH/USD",
        price: crypto.ethereum.usd,
        change24h: formatPercent(crypto.ethereum.usd_24h_change),
      },
      {
        asset: "NASDAQ",
        price: nasdaq.regularMarketPrice,
        change24h: formatPercent(nasdaq.regularMarketChangePercent),
      },
      {
        asset: "GOLD",
        price: gold.regularMarketPrice,
        change24h: formatPercent(gold.regularMarketChangePercent),
      },
    ];

    return { status: "ready", entries: payload };
  } catch (error) {
    console.error("Market overview error", error);
    return { status: "error" };
  }
}

export async function getExtendedMarketSnapshot() {
  try {
    const [crypto, yahoo] = await Promise.all([
      fetchJson(COINGECKO_ENDPOINT, { next: { revalidate: 900 } }),
      fetchJson(YAHOO_ENDPOINT, { next: { revalidate: 900 } }),
    ]);

    const quotes = yahoo?.quoteResponse?.result || [];
    const map = new Map(quotes.map((item) => [item.symbol, item]));

    if (!crypto?.bitcoin || !crypto?.ethereum) {
      throw new Error("Missing crypto payload");
    }

    return {
      status: "ready",
      assets: {
        BTC: {
          price: crypto.bitcoin.usd,
          change24h: formatPercent(crypto.bitcoin.usd_24h_change),
        },
        ETH: {
          price: crypto.ethereum.usd,
          change24h: formatPercent(crypto.ethereum.usd_24h_change),
        },
        NASDAQ: map.get("^IXIC"),
        SP500: map.get("^GSPC"),
        GOLD: map.get("GC=F"),
        CRUDE: map.get("CL=F"),
        US10Y: map.get("^TNX"),
      },
    };
  } catch (error) {
    console.error("Extended snapshot error", error);
    return { status: "error" };
  }
}
