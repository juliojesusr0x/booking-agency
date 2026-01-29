import React, { memo } from "react";
import styled from "styled-components";
import type { Booking } from "@/types";
import { formatDateRange } from "@/utils/dateUtils";

const Card = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  background: white;
  height: fit-content;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
`;

const PropertyInfo = styled.div`
  flex: 1;
`;

const PropertyTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
`;

const PropertyType = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
  text-transform: capitalize;
`;

const Dates = styled.div`
  margin: 1rem 0;
  font-size: 0.875rem;
  color: #374151;
`;

const GuestInfo = styled.div`
  margin: 1rem 0;
  font-size: 0.875rem;
  color: #6b7280;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const Button = styled.button<{ variant?: "primary" | "danger" }>`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid;
  transition: all 0.2s;

  ${(props) =>
    props.variant === "primary"
      ? `
    background-color: #3b82f6;
    color: white;
    border-color: #3b82f6;
    &:hover {
      background-color: #2563eb;
      border-color: #2563eb;
    }
  `
      : props.variant === "danger"
        ? `
    background-color: white;
    color: #ef4444;
    border-color: #ef4444;
    &:hover {
      background-color: #fef2f2;
    }
  `
        : `
    background-color: white;
    color: #374151;
    border-color: #d1d5db;
    &:hover {
      background-color: #f9fafb;
    }
  `}
`;

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
    <Card data-testid={`booking-card-${booking.id}`}>
      <Header>
        <PropertyInfo>
          <PropertyTitle>
            {propertyTitle || `Property ${booking.id}`}
          </PropertyTitle>
          {propertyType && <PropertyType>{propertyType}</PropertyType>}
        </PropertyInfo>
      </Header>
      <Dates>
        <strong>Dates:</strong>{" "}
        {formatDateRange(booking.startDate, booking.endDate)}
      </Dates>
      <GuestInfo>
        <div>
          <strong>Guest:</strong> {booking.guestName}
        </div>
        <div>
          <strong>Email:</strong> {booking.guestEmail}
        </div>
      </GuestInfo>
      <ButtonGroup>
        <Button
          variant="primary"
          onClick={() => onEdit(booking.id as string | number)}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          onClick={() => onDelete(booking.id as string | number)}
        >
          Delete
        </Button>
      </ButtonGroup>
    </Card>
  );
};

export const BookingCard = memo(BookingCardComponent);
