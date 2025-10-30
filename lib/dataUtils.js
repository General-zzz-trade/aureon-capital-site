import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "content", "generated");
const LOG_DIR = path.join(process.cwd(), "logs");
const LOG_FILE = path.join(LOG_DIR, "scheduler.log");

export function ensureDirectories() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

export async function writeJSON(fileName, data) {
  ensureDirectories();
  const filePath = path.join(DATA_DIR, fileName);
  await fsPromises.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
  return filePath;
}

export function readJSON(fileName) {
  try {
    const filePath = path.join(DATA_DIR, fileName);
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const fileContent = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Failed to read ${fileName}`, error);
    return null;
  }
}

export async function appendLog(message) {
  ensureDirectories();
  const timestamp = new Intl.DateTimeFormat("en-CA", {
    dateStyle: "medium",
    timeStyle: "medium",
    timeZone: "Asia/Hong_Kong",
  }).format(new Date());
  const entry = `[${timestamp} HKT] ${message}\n`;
  await fsPromises.appendFile(LOG_FILE, entry, "utf8");
}

export function formatPercent(value) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

export function formatCurrency(value, options = {}) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: options.currency || "USD",
    minimumFractionDigits: options.minimumFractionDigits ?? 2,
    maximumFractionDigits: options.maximumFractionDigits ?? 2,
  });
  return formatter.format(value);
}

export function toHKTISOString(date = new Date()) {
  return new Date(date).toISOString();
}

export function formatHKTime(date) {
  return new Intl.DateTimeFormat("en-HK", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Hong_Kong",
  }).format(new Date(date));
}

export function formatHKDateTime(date) {
  return new Intl.DateTimeFormat("en-HK", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Hong_Kong",
  }).format(new Date(date));
}

export function translateSentiment(sentiment) {
  if (sentiment === "Risk-on") return "风险偏好";
  if (sentiment === "Risk-off") return "风险规避";
  return "中性";
}

export function safeAverage(values) {
  const filtered = values.filter((v) => typeof v === "number" && !Number.isNaN(v));
  if (!filtered.length) return null;
  return filtered.reduce((sum, v) => sum + v, 0) / filtered.length;
}

export function directionLabel(change) {
  if (change === null || change === undefined || Number.isNaN(change)) {
    return "mixed";
  }
  if (change > 0.4) return "strong gains";
  if (change > 0.1) return "modest gains";
  if (change < -0.4) return "sharp losses";
  if (change < -0.1) return "mild losses";
  return "flat";
}

export function directionLabelZh(change) {
  const label = directionLabel(change);
  switch (label) {
    case "strong gains":
      return "显著上行";
    case "modest gains":
      return "温和上行";
    case "sharp losses":
      return "显著回调";
    case "mild losses":
      return "温和回调";
    case "flat":
      return "基本持平";
    default:
      return "波动不一";
  }
}
