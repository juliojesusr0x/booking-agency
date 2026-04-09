import type { Booking } from "@/types";
import { parseLocalDateString } from "@/utils/dateUtils";

function bookingDateToComparable(
  value: Date | string,
): ReturnType<typeof parseLocalDateString> {
  if (typeof value === "string") {
    return parseLocalDateString(value);
  }
  return parseLocalDateString(value.toISOString().slice(0, 10));
}

export const validateBookingOverlap = (
  bookings: Booking[],
  booking: Booking,
  excludeBookingId?: string | number,
) => {
  const newStart = bookingDateToComparable(booking.startDate);
  const newEnd = bookingDateToComparable(booking.endDate);

  const sameProperty = bookings.filter(
    (b) =>
      String(b.propertyId) === String(booking.propertyId) &&
      String(b.id) !== String(excludeBookingId),
  );

  const overlap = sameProperty.some((bkng) => {
    const bookingStart = bookingDateToComparable(bkng.startDate);
    const bookingEnd = bookingDateToComparable(bkng.endDate);

    return newStart <= bookingEnd && newEnd >= bookingStart;
  });

  if (overlap) {
    throw new Error(
      "These dates are already booked. Please select different dates.",
    );
  }
};
