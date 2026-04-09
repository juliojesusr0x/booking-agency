import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import type { Booking } from "@/types";
import { saveBookings } from "@/utils/storage";
import {
  createBooking,
  deleteBooking,
  setBookings,
  updateBooking,
} from "./BookingsSlice";

export const bookingsListenerMiddleware = createListenerMiddleware();

bookingsListenerMiddleware.startListening({
  matcher: isAnyOf(
    createBooking,
    updateBooking,
    deleteBooking,
    setBookings,
  ),
  effect: (_action, api) => {
    const state = api.getState() as { bookings: { bookings: Booking[] } };
    saveBookings(state.bookings.bookings);
  },
});
