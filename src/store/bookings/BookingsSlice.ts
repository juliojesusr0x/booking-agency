import type { Booking } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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
    addBooking: (state: BookingsState, action: PayloadAction<Booking>) => {
      state.bookings.push(action.payload);
    },
    updateBooking: (state: BookingsState, action: PayloadAction<Booking>) => {
      const { id, ...updatedBooking } = action.payload;
      state.bookings = state.bookings.map((booking) =>
        booking.id === id ? { ...booking, ...updatedBooking } : booking,
      );
    },
    deleteBooking: (state: BookingsState, action: PayloadAction<number>) => {
      state.bookings = state.bookings.filter(
        (booking) => booking.id !== action.payload,
      );
    },
  },
});

export const { setBookings, addBooking, updateBooking, deleteBooking } =
  bookingsSlice.actions;
export default bookingsSlice.reducer;
