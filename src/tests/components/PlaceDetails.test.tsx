import { describe, it, expect, beforeEach, vi } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlaceDetails } from "@/pages/PlaceDetails";
import type { RootState } from "@/store";

// Mock date functions to control "today" for validation
vi.mock("@/utils/dateUtils", async () => {
  const actual =
    await vi.importActual<typeof import("@/utils/dateUtils")>(
      "@/utils/dateUtils",
    );
  return {
    ...actual,
    getTodayString: () => "2025-01-01",
    // In these tests we don't care about "past" logic, so always treat dates as valid.
    isPastDate: () => false,
  };
});

type Property = {
  id: number;
  title: string;
  address: string;
  type: "apartment" | "house" | "chalet";
  price: number;
  images: string[];
  rating: number;
  description: string;
};

type Booking = {
  id: number;
  propertyId: number;
  startDate: string;
  endDate: string;
  guestName: string;
  guestEmail: string;
};

type PropertiesState = {
  properties: Property[];
};

type BookingsState = {
  bookings: Booking[];
};

let mockState: { properties: PropertiesState; bookings: BookingsState };
let mockDispatch: ReturnType<typeof vi.fn>;

vi.mock("@/hooks/useAppDispatch", async () => {
  const actual = await vi.importActual<typeof import("@/hooks/useAppDispatch")>(
    "@/hooks/useAppDispatch",
  );
  return {
    ...actual,
    useAppDispatch: () => mockDispatch,
    useAppSelector: <T,>(selector: (state: RootState) => T) =>
      selector(mockState as unknown as RootState),
  };
});

const renderWithRoute = (initialEntry: string) =>
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/property/:id" element={<PlaceDetails />} />
        <Route
          path="/property/:id/booking/:bookingId"
          element={<PlaceDetails />}
        />
      </Routes>
    </MemoryRouter>,
  );

describe("PlaceDetails page", () => {
  beforeEach(() => {
    mockDispatch = vi.fn();
    mockState = {
      properties: {
        properties: [],
      },
      bookings: {
        bookings: [],
      },
    };
  });

  it("shows success message when creating a booking (create mode)", async () => {
    const user = userEvent.setup();

    mockState.properties.properties = [
      {
        id: 1,
        title: "Cozy Apartment Downtown",
        address: "123 Main St",
        type: "apartment",
        price: 150,
        images: [],
        rating: 4.5,
        description: "Nice place",
      },
    ];

    // No error thrown from dispatch => success message shown
    mockDispatch.mockReturnValue(undefined);

    renderWithRoute("/property/1?start=2025-01-10&end=2025-01-12");

    // Fill guest fields
    const nameInput = screen.getByLabelText(/guest name/i);
    const emailInput = screen.getByLabelText(/guest email/i);
    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "john@example.com");

    const submitButton = screen.getByRole("button", { name: /save booking/i });
    await user.click(submitButton);

    expect(
      await screen.findByText(/booking created successfully!!/i),
    ).toBeInTheDocument();
  });

  it("pre-fills form fields when editing an existing booking (edit mode)", () => {
    mockState.properties.properties = [
      {
        id: 1,
        title: "Cozy Apartment Downtown",
        address: "123 Main St",
        type: "apartment",
        price: 150,
        images: [],
        rating: 4.5,
        description: "Nice place",
      },
    ];

    mockState.bookings.bookings = [
      {
        id: 10,
        propertyId: 1,
        startDate: "2025-01-10",
        endDate: "2025-01-12",
        guestName: "John Doe",
        guestEmail: "john@example.com",
      },
    ];

    renderWithRoute("/property/1/booking/10");

    const startInput = screen.getByLabelText(/start date/i) as HTMLInputElement;
    const endInput = screen.getByLabelText(/end date/i) as HTMLInputElement;
    const nameInput = screen.getByLabelText(/guest name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(
      /guest email/i,
    ) as HTMLInputElement;
    const submitButton = screen.getByRole("button", {
      name: /update booking/i,
    });

    expect(startInput.value).toBe("2025-01-10");
    expect(endInput.value).toBe("2025-01-12");
    expect(nameInput.value).toBe("John Doe");
    expect(emailInput.value).toBe("john@example.com");
    expect(submitButton).toBeInTheDocument();
  });

  it("shows success message when updating a booking (edit mode)", async () => {
    const user = userEvent.setup();

    mockState.properties.properties = [
      {
        id: 1,
        title: "Cozy Apartment Downtown",
        address: "123 Main St",
        type: "apartment",
        price: 150,
        images: [],
        rating: 4.5,
        description: "Nice place",
      },
    ];

    mockState.bookings.bookings = [
      {
        id: 10,
        propertyId: 1,
        startDate: "2025-01-10",
        endDate: "2025-01-12",
        guestName: "John Doe",
        guestEmail: "john@example.com",
      },
    ];

    mockDispatch.mockReturnValue(undefined);

    renderWithRoute("/property/1/booking/10");

    const nameInput = screen.getByLabelText(/guest name/i) as HTMLInputElement;
    await user.clear(nameInput);
    await user.type(nameInput, "John Updated");

    const submitButton = screen.getByRole("button", {
      name: /update booking/i,
    });
    await user.click(submitButton);

    expect(
      await screen.findByText(/booking updated successfully!!/i),
    ).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    const user = userEvent.setup();

    mockState.properties.properties = [
      {
        id: 1,
        title: "Cozy Apartment Downtown",
        address: "123 Main St",
        type: "apartment",
        price: 150,
        images: [],
        rating: 4.5,
        description: "Nice place",
      },
    ];

    renderWithRoute("/property/1");

    const submitButton = screen.getByRole("button", { name: /save booking/i });
    await user.click(submitButton);

    expect(screen.getByText(/start date is required/i)).toBeInTheDocument();
    expect(screen.getByText(/end date is required/i)).toBeInTheDocument();
    expect(screen.getByText(/guest name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/guest email is required/i)).toBeInTheDocument();
  });
});
