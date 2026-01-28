import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Search } from "./pages/Search";
import { PlaceDetails } from "./pages/PlaceDetails";
import { MyBookings } from "./pages/MyBookings";
import { NotFound } from "./pages/NotFound";
import styled from "styled-components";

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
`;

const App: React.FC = () => {
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
