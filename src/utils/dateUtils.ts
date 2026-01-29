/**
 * Parse YYYY-MM-DD (or ISO string) as local date (avoids UTC-midnight off-by-one)
 */
export function parseLocalDateString(isoDate: string): Date {
  const datePart = isoDate.slice(0, 10);
  // if (!/^\d{4}-\d{2}-\d{2}$/.test(datePart)) return new Date(isoDate);
  const [y, m, d] = datePart.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/**
 * Format date to YYYY-MM-DD string (for HTML5 date input)
 */
export function formatDateForInput(date: Date | string): string {
  if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date;
  }
  const d = typeof date === "string" ? parseLocalDateString(date) : date;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Format date for display (e.g., "Jan 15, 2024")
 */
export function formatDateForDisplay(date: Date | string): string {
  const d = typeof date === "string" ? parseLocalDateString(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Format date range for display (e.g., "Jan 15 - Jan 20, 2024")
 */
export function formatDateRange(
  startDate: Date | string,
  endDate: Date | string,
): string {
  const start = formatDateForDisplay(startDate);
  const end = formatDateForDisplay(endDate);
  return `${start} - ${end}`;
}

/**
 * Get today's date as YYYY-MM-DD string
 */
export function getTodayString(): string {
  return formatDateForInput(new Date());
}

/**
 * Check if date is in the past
 */
export function isPastDate(date: Date | string): boolean {
  const d = typeof date === "string" ? parseLocalDateString(date) : date;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dNorm = new Date(d);
  dNorm.setHours(0, 0, 0, 0);
  return dNorm < today;
}

/**
 * Check if start date is before end date (at least 1 night)
 */
export function isValidDateRange(
  startDate: Date | string,
  endDate: Date | string,
): boolean {
  const parse = (x: Date | string) =>
    typeof x === "string" ? parseLocalDateString(x) : x;
  return parse(startDate) < parse(endDate);
}
