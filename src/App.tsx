import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Search } from "./pages/Search";
import { PlaceDetails } from "./pages/PlaceDetails";
import { MyBookings } from "./pages/MyBookings";
import { NotFound } from "./pages/NotFound";
import initialDb from "./db/initialDb";
import { setProperties } from "./store/properties/PropertySlice";
import type { Property } from "./types";
import { setBookings } from "./store/bookings/BookingsSlice";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { loadBookings } from "./utils/storage";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setProperties(initialDb.properties as Property[]));
    dispatch(setBookings(loadBookings()));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/property/:id" element={<PlaceDetails />} />
          <Route
            path="/property/:id/booking/:bookingId"
            element={<PlaceDetails />}
          />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
