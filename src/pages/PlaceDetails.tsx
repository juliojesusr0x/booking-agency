import React, { useMemo, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/hooks/useAppDispatch";
import { formatDateForInput, parseLocalDateString } from "@/utils/dateUtils";
import { PropertyBookingCard } from "@/components/PropertyBookingCard";
import { BookingForm } from "@/components/BookingForm";
import { ErrorMessage } from "@/components/ErrorMessage";
import { createBooking, updateBooking } from "@/store/bookings/BookingsSlice";
import { createBookingId } from "@/utils/bookingId";
import type { BookingFormValues } from "@/schemas/booking";

type bookingStatus =
  | {
      status: "success";
      error: null;
    }
  | {
      status: "error";
      error: string;
    }
  | {
      status: "pending";
      error: null;
    }
  | {
      status: "idle";
      error: null;
    };

export const PlaceDetails: React.FC = () => {
  const { id, bookingId } = useParams<{ id: string; bookingId?: string }>();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const { properties } = useAppSelector((state) => state.properties);
  const { bookings } = useAppSelector((state) => state.bookings);

  const property = properties.find((p) => p.id === Number(id));
  const isEditMode = !!bookingId;
  const bookingData = bookings.find(
    (b) => String(b.id) === String(bookingId),
  );

  const [bookingStatus, setBookingStatus] = useState<bookingStatus>({
    status: "idle",
    error: null,
  });

  // Get initial form data - memoized to prevent unnecessary re-renders
  // Must be called before any conditional returns (rules of hooks)
  const initialData = useMemo(() => {
    if (isEditMode && bookingData) {
      return {
        startDate: formatDateForInput(bookingData.startDate),
        endDate: formatDateForInput(bookingData.endDate),
        guestName: bookingData.guestName,
        guestEmail: bookingData.guestEmail,
      };
    }
    return {
      startDate: searchParams.get("start") || "",
      endDate: searchParams.get("end") || "",
      guestName: "",
      guestEmail: "",
    };
  }, [isEditMode, bookingData, searchParams]);

  const handleSubmit = async (formData: BookingFormValues) => {
    if (!property) return;
    try {
      setBookingStatus({ status: "pending", error: null });

      const start = parseLocalDateString(formData.startDate);
      const end = parseLocalDateString(formData.endDate);

      if (isEditMode && bookingData) {
        dispatch(
          updateBooking({
            id: bookingData.id,
            propertyId: property.id,
            startDate: start,
            endDate: end,
            guestName: formData.guestName,
            guestEmail: formData.guestEmail,
          }),
        );
      } else {
        dispatch(
          createBooking({
            id: createBookingId(),
            propertyId: property.id,
            guestName: formData.guestName,
            guestEmail: formData.guestEmail,
            startDate: start,
            endDate: end,
          }),
        );
      }
      setBookingStatus({ status: "success", error: null });

      setTimeout(() => {
        navigate("/bookings");
      }, 1000);
    } catch (error) {
      setBookingStatus({ status: "error", error: (error as Error).message });
    }
  };

  if (!property) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-6 rounded-md border border-gray-300 bg-gray-100 px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-200"
        >
          ← Back to Search
        </button>
        <ErrorMessage message="Property not found" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <button
        type="button"
        onClick={() => navigate(isEditMode ? "/bookings" : "/")}
        className="mb-6 rounded-md border border-gray-300 bg-gray-100 px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-200"
      >
        ← Back {isEditMode ? "to Bookings" : "to Search"}
      </button>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <PropertyBookingCard property={property} />
        </div>

        <div className="sticky top-8 h-fit rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">
            {isEditMode ? "Update Booking" : "Book This Property"}
          </h2>
          {bookingStatus.status === "error" && (
            <ErrorMessage
              message={bookingStatus.error || "An error occurred"}
            />
          )}
          {bookingStatus.status === "success" && (
            <div className="mb-4 text-emerald-600">
              Booking {isEditMode ? "updated" : "created"} successfully!!
            </div>
          )}
          <BookingForm
            initialData={initialData}
            isLoading={bookingStatus.status === "pending"}
            onSubmit={handleSubmit}
            submitLabel={isEditMode ? "Update Booking" : "Save Booking"}
          />
        </div>
      </div>
    </div>
  );
};
