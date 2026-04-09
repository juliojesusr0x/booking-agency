import React, { memo } from "react";
import type { Booking } from "@/types";
import { formatDateRange } from "@/utils/dateUtils";

interface BookingCardProps {
  booking: Booking;
  propertyTitle?: string;
  propertyType?: string;
  onEdit: (bookingId: string | number) => void;
  onDelete: (bookingId: string | number) => void;
}

const BookingCardComponent: React.FC<BookingCardProps> = ({
  booking,
  propertyTitle,
  propertyType,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      data-testid={`booking-card-${booking.id}`}
      className="h-fit rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="mb-1 text-lg font-semibold text-gray-900">
            {propertyTitle || `Property ${booking.propertyId}`}
          </h3>
          {propertyType && (
            <span className="text-sm capitalize text-gray-500">
              {propertyType}
            </span>
          )}
        </div>
      </div>
      <div className="my-4 text-sm text-gray-700">
        <strong>Dates:</strong>{" "}
        {formatDateRange(booking.startDate, booking.endDate)}
      </div>
      <div className="my-4 text-sm text-gray-500">
        <div>
          <strong>Guest:</strong> {booking.guestName}
        </div>
        <div>
          <strong>Email:</strong> {booking.guestEmail}
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => onEdit(booking.id)}
          className="rounded-md border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(booking.id)}
          className="rounded-md border border-red-500 bg-white px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export const BookingCard = memo(BookingCardComponent);
