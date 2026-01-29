import type { Booking } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { validateBookingOverlap } from "./utils";

interface BookingsState {
  bookings: Booking[];
}

const initialState: BookingsState = {
  bookings: [],
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setBookings: (state: BookingsState, action: PayloadAction<Booking[]>) => {
      state.bookings = action.payload;
    },
    createBooking: (state: BookingsState, action: PayloadAction<Booking>) => {
      validateBookingOverlap(state.bookings, action.payload);
      state.bookings.push(action.payload);
    },
    updateBooking: (state: BookingsState, action: PayloadAction<Booking>) => {
      validateBookingOverlap(state.bookings, action.payload, action.payload.id);
      const { id, ...updatedBooking } = action.payload;
      state.bookings = state.bookings.map((booking) =>
        booking.id === id ? { ...booking, ...updatedBooking } : booking,
      );
    },
    deleteBooking: (
      state: BookingsState,
      action: PayloadAction<string | number>,
    ) => {
      state.bookings = state.bookings.filter(
        (booking) => booking.id !== action.payload,
      );
    },
  },
});

export const { setBookings, createBooking, updateBooking, deleteBooking } =
  bookingsSlice.actions;
export default bookingsSlice.reducer;
