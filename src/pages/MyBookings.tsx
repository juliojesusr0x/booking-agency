import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { BookingCard } from "@/components/BookingCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { EmptyState } from "@/components/EmptyState";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { setBookings } from "@/store/bookings/BookingsSlice";
import { setProperties } from "@/store/properties/PropertySlice";
import { deleteBooking } from "@/store/bookings/BookingsSlice";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 2rem;
`;

const SuccessMessage = styled.div`
  padding: 0.75rem;
  background-color: #d1fae5;
  border: 1px solid #a7f3d0;
  border-radius: 0.375rem;
  color: #065f46;
  margin-bottom: 1rem;
`;

const BookingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const MyBookings: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { bookings } = useAppSelector((state) => state.bookings);
  const { properties } = useAppSelector((state) => state.properties);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookingToDeleteId, setBookingToDeleteId] = useState<
    string | number | null
  >(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    dispatch(setBookings(bookings));
    dispatch(setProperties(properties));
  }, [dispatch, bookings, properties]);

  const handleEdit = useCallback(
    (bookingId: string | number) => {
      const booking = bookings.find((b) => b.id === bookingId);
      if (booking) {
        navigate(`/property/${booking.id}/booking/${bookingId}`);
      }
    },
    [bookings, navigate],
  );

  const handleDeleteClick = useCallback((bookingId: string | number) => {
    setBookingToDeleteId(bookingId);
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (bookingToDeleteId) {
      try {
        await dispatch(deleteBooking(bookingToDeleteId));
        setSuccessMessage("Booking deleted successfully!");
        setDeleteDialogOpen(false);
        setBookingToDeleteId(null);
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        console.error(error);
        // Error is handled by Redux state
        setDeleteDialogOpen(false);
        setBookingToDeleteId(null);
      }
    }
  }, [bookingToDeleteId, dispatch]);

  const handleDeleteCancel = useCallback(() => {
    setDeleteDialogOpen(false);
    setBookingToDeleteId(null);
  }, []);

  return (
    <Container>
      <Title>My Bookings</Title>

      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

      {bookings.length === 0 ? (
        <EmptyState
          title="No Bookings Yet"
          message="You haven't made any bookings yet. Start exploring properties!"
          actionLabel="Search Properties"
          actionLink="/"
        />
      ) : (
        <BookingsGrid>
          {bookings.map((booking) => {
            const property = properties.find(
              (p) => p.id === booking.propertyId,
            );
            return (
              <BookingCard
                key={booking.id}
                booking={booking}
                propertyTitle={property?.title}
                propertyType={property?.type}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            );
          })}
        </BookingsGrid>
      )}

      <ConfirmDialog
        isOpen={deleteDialogOpen}
        title="Delete Booking"
        message="Are you sure you want to delete this booking? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </Container>
  );
};
