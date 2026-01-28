import { configureStore } from "@reduxjs/toolkit";
import propertiesReducer from "./properties/PropertySlice";
import bookingsReducer from "./bookings/BookingsSlice";

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    bookings: bookingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
