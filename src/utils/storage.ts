import type { Booking } from "@/types";

const BOOKINGS_KEY = "booking-agency-bookings";

function isBookingRecord(x: unknown): x is Booking {
  if (x === null || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.id !== "undefined" &&
    typeof o.propertyId !== "undefined" &&
    typeof o.guestName === "string" &&
    typeof o.guestEmail === "string" &&
    (typeof o.startDate === "string" || o.startDate instanceof Date) &&
    (typeof o.endDate === "string" || o.endDate instanceof Date)
  );
}

export function loadBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isBookingRecord);
  } catch {
    return [];
  }
}

export function saveBookings(bookings: Booking[]): void {
  try {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  } catch {
    // ignore quota / private mode
  }
}
