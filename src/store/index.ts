import { configureStore } from "@reduxjs/toolkit";
import propertiesReducer from "./properties/PropertySlice";
import bookingsReducer from "./bookings/BookingsSlice";
import statusReducer from "./status/StatusSlice";
import { bookingsListenerMiddleware } from "./bookings/persistenceMiddleware";

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    bookings: bookingsReducer,
    status: statusReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(bookingsListenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
