const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatCurrency(value) {
  if (typeof value !== "number" || Number.isNaN(value)) return "-";
  return currencyFormatter.format(value);
}

export function formatPercent(value) {
  if (typeof value !== "number" || Number.isNaN(value)) return "-";
  return percentFormatter.format(value / 100);
}

export function formatHKT(date = new Date()) {
  try {
    return new Intl.DateTimeFormat("en-HK", {
      timeZone: "Asia/Hong_Kong",
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch (error) {
    console.error("Failed to format HKT time", error);
    return "-";
  }
}

export function formatChineseCurrency(value) {
  if (typeof value !== "number" || Number.isNaN(value)) return "-";
  return `${value.toLocaleString("zh-HK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} 美元`;
}

export function describeChange(change) {
  if (typeof change !== "number" || Number.isNaN(change)) return "unchanged";
  if (change > 1.5) return "strong gains";
  if (change > 0.4) return "moderate gains";
  if (change > -0.4) return "stable";
  if (change > -1.5) return "mild losses";
  return "sharp losses";
}

export function describeChangeZh(change) {
  if (typeof change !== "number" || Number.isNaN(change)) return "基本持平";
  if (change > 1.5) return "显著上行";
  if (change > 0.4) return "温和上行";
  if (change > -0.4) return "相对稳定";
  if (change > -1.5) return "温和回落";
  return "显著回落";
}

export function translateSentiment(sentiment) {
  if (sentiment === "risk-on") return "风险偏好";
  if (sentiment === "balanced") return "中性";
  return "风险厌恶";
}
