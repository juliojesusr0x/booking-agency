import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { BookingCard } from "@/components/BookingCard";
import { EmptyState } from "@/components/EmptyState";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { deleteBooking } from "@/store/bookings/BookingsSlice";

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

  const handleEdit = useCallback(
    (bookingId: string | number) => {
      const booking = bookings.find((b) => b.id === bookingId);
      if (booking) {
        navigate(`/property/${booking.propertyId}/booking/${bookingId}`);
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
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        console.error(error);
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
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">My Bookings</h1>

      {successMessage && (
        <div
          className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-900"
          role="status"
        >
          {successMessage}
        </div>
      )}

      {bookings.length === 0 ? (
        <EmptyState
          title="No Bookings Yet"
          message="You haven't made any bookings yet. Start exploring properties!"
          actionLabel="Search Properties"
          actionLink="/"
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => {
            const property = properties.find(
              (p) => String(p.id) === String(booking.propertyId),
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
        </div>
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
    </div>
  );
};
