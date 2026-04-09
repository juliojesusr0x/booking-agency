import {
  format,
  isBefore,
  parse,
  startOfDay,
} from "date-fns";

/**
 * Parse YYYY-MM-DD (or ISO string) as local date (avoids UTC-midnight off-by-one)
 */
export function parseLocalDateString(isoDate: string): Date {
  const datePart = isoDate.slice(0, 10);
  return parse(datePart, "yyyy-MM-dd", new Date());
}

/**
 * Format date to YYYY-MM-DD string (for HTML5 date input)
 */
export function formatDateForInput(date: Date | string): string {
  if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date;
  }
  const d = typeof date === "string" ? parseLocalDateString(date) : date;
  return format(d, "yyyy-MM-dd");
}

/**
 * Format date for display (e.g., "Jan 15, 2024")
 */
export function formatDateForDisplay(date: Date | string): string {
  const d = typeof date === "string" ? parseLocalDateString(date) : date;
  return format(d, "MMM d, yyyy");
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
  return format(new Date(), "yyyy-MM-dd");
}

/**
 * Check if date is in the past
 */
export function isPastDate(date: Date | string): boolean {
  const d = typeof date === "string" ? parseLocalDateString(date) : date;
  return isBefore(startOfDay(d), startOfDay(new Date()));
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
  return isBefore(parse(startDate), parse(endDate));
}
