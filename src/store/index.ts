import { configureStore } from "@reduxjs/toolkit";
import propertiesReducer from "./properties/PropertySlice";
import bookingsReducer from "./bookings/BookingsSlice";
import statusReducer from "./status/StatusSlice";

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    bookings: bookingsReducer,
    status: statusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
