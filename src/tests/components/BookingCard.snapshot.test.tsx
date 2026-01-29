import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { BookingCard } from "@/components/BookingCard";
import type { Booking } from "@/types";

const sampleBooking: Booking = {
  id: 10,
  startDate: new Date("2025-01-10"),
  endDate: new Date("2025-01-12"),
  guestName: "John Doe",
  guestEmail: "john@example.com",
};

describe("BookingCard (snapshot)", () => {
  it("matches snapshot for a sample booking", () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    const { container } = render(
      <BookingCard
        booking={sampleBooking}
        propertyTitle="Cozy Apartment Downtown"
        propertyType="apartment"
        onEdit={onEdit}
        onDelete={onDelete}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
