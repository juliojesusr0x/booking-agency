/** Unique id for a new booking (browser crypto API). */
export function createBookingId(): string {
  return crypto.randomUUID();
}
