const HKT_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Hong_Kong",
  hour: "2-digit",
  minute: "2-digit",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function formatHKT(date = new Date()) {
  return HKT_FORMATTER.format(date);
}

export function toHKTimeISOString(date = new Date()) {
  const tzDate = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" })
  );
  return tzDate.toISOString();
}
