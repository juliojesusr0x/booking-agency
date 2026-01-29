import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Search } from "./pages/Search";
import { PlaceDetails } from "./pages/PlaceDetails";
import { MyBookings } from "./pages/MyBookings";
import { NotFound } from "./pages/NotFound";
import styled from "styled-components";
import initialDb from "./db/initialDb";
import { setProperties } from "./store/properties/PropertySlice";
import type { Property, Booking } from "./types";
import { setBookings } from "./store/bookings/BookingsSlice";
import { useAppDispatch } from "./hooks/useAppDispatch";

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
`;

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setProperties(initialDb.properties as Property[]));
    dispatch(setBookings(initialDb.bookings as Booking[]));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AppContainer>
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
      </AppContainer>
    </BrowserRouter>
  );
};

export default App;
