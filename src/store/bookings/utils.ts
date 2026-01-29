import type { Booking } from "@/types";
import { parseLocalDateString } from "@/utils/dateUtils";

export const validateBookingOverlap = (
  bookings: Booking[],
  booking: Booking,
  excludeBookingId?: string | number,
) => {
  const existingBookings = bookings.filter(
    (bkng) => bkng.id === booking.id && bkng.id !== excludeBookingId,
  );

  const overlap = existingBookings.some((bkng) => {
    const bookingStart = parseLocalDateString(
      typeof bkng.startDate === "string"
        ? bkng.startDate
        : bkng.startDate.toISOString().slice(0, 10),
    );
    const bookingEnd = parseLocalDateString(
      typeof bkng.endDate === "string"
        ? bkng.endDate
        : bkng.endDate.toISOString().slice(0, 10),
    );

    // Overlap condition: start1 <= end2 AND end1 >= start2
    return booking.startDate <= bookingEnd && booking.endDate >= bookingStart;
  });

  if (overlap) {
    throw new Error(
      "These dates are already booked. Please select different dates.",
    );
  }
};
