import React, { useMemo, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "@/hooks/useAppDispatch";
import { formatDateForInput, parseLocalDateString } from "@/utils/dateUtils";
import { PropertyBookingCard } from "@/components/PropertyBookingCard";
import { BookingForm } from "@/components/BookingForm";
import { ErrorMessage } from "@/components/ErrorMessage";
import { createBooking, updateBooking } from "@/store/bookings/BookingsSlice";

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const BackButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 1.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e5e7eb;
  }
`;

const PropertySection = styled.div``;

const BookingSection = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  position: sticky;
  top: 2rem;
  height: fit-content;
`;

const BookingTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #111827;
`;

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
  const bookingData = bookings.find((b) => b.id === Number(bookingId));

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

  const handleSubmit = async (formData: {
    startDate: string;
    endDate: string;
    guestName: string;
    guestEmail: string;
  }) => {
    try {
      setBookingStatus({ status: "pending", error: null });

      const start = parseLocalDateString(formData.startDate);
      const end = parseLocalDateString(formData.endDate);

      if (isEditMode) {
        dispatch(
          updateBooking({
            id: property?.id,
            startDate: start,
            endDate: end,
            guestName: formData.guestName,
            guestEmail: formData.guestEmail,
          }),
        );
      } else {
        dispatch(
          createBooking({
            ...formData,
            id: property?.id,
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
      <ContentContainer>
        <BackButton onClick={() => navigate("/")}>← Back to Search</BackButton>
        <ErrorMessage message="Property not found" />
      </ContentContainer>
    );
  }

  return (
    <ContentContainer>
      <BackButton onClick={() => navigate(isEditMode ? "/bookings" : "/")}>
        ← Back {isEditMode ? "to Bookings" : "to Search"}
      </BackButton>

      <Content>
        <PropertySection>
          <PropertyBookingCard property={property} />
        </PropertySection>

        <BookingSection>
          <BookingTitle>
            {isEditMode ? "Update Booking" : "Book This Property"}
          </BookingTitle>
          {bookingStatus.status === "error" && (
            <ErrorMessage
              message={bookingStatus.error || "An error occurred"}
            />
          )}
          {bookingStatus.status === "success" && (
            <div style={{ color: "#10b981", marginBottom: "1rem" }}>
              Booking {isEditMode ? "updated" : "created"} successfully!!
            </div>
          )}
          <BookingForm
            initialData={initialData}
            isLoading={bookingStatus.status === "pending"}
            onSubmit={handleSubmit}
            submitLabel={isEditMode ? "Update Booking" : "Save Booking"}
          />
        </BookingSection>
      </Content>
    </ContentContainer>
  );
};
