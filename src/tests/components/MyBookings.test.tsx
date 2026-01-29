import { describe, it, expect, beforeEach, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MyBookings } from "@/pages/MyBookings";

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
  startDate: string;
  endDate: string;
  guestName: string;
  guestEmail: string;
};

type BookingsState = {
  bookings: Booking[];
};

type PropertiesState = {
  properties: Property[];
};

let mockState: { bookings: BookingsState; properties: PropertiesState };
let mockDispatch: ReturnType<typeof vi.fn>;

vi.mock("@/hooks/useAppDispatch", async () => {
  const actual = await vi.importActual<typeof import("@/hooks/useAppDispatch")>(
    "@/hooks/useAppDispatch",
  );
  return {
    ...actual,
    useAppDispatch: () => mockDispatch,
    useAppSelector: (selector: (state: any) => any) => selector(mockState),
  };
});

const renderWithProviders = () =>
  render(
    <MemoryRouter>
      <MyBookings />
    </MemoryRouter>,
  );

describe("MyBookings page", () => {
  beforeEach(() => {
    mockDispatch = vi.fn();
    mockState = {
      bookings: {
        bookings: [],
      },
      properties: {
        properties: [],
      },
    };
  });

  it("lists multiple bookings", () => {
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
      {
        id: 2,
        title: "Modern House with Garden",
        address: "456 Oak Ave",
        type: "house",
        price: 250,
        images: [],
        rating: 4.8,
        description: "Spacious house",
      },
    ];

    mockState.bookings.bookings = [
      {
        id: 1,
        startDate: "2025-01-10",
        endDate: "2025-01-12",
        guestName: "John Doe",
        guestEmail: "john@example.com",
      },
      {
        id: 2,
        startDate: "2025-02-01",
        endDate: "2025-02-05",
        guestName: "Jane Smith",
        guestEmail: "jane@example.com",
      },
    ];

    renderWithProviders();

    expect(
      screen.getByRole("heading", { name: /my bookings/i }),
    ).toBeInTheDocument();

    expect(screen.getByText(/cozy apartment downtown/i)).toBeInTheDocument();
    expect(screen.getByText(/modern house with garden/i)).toBeInTheDocument();
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/jane smith/i)).toBeInTheDocument();
  });

  it("shows empty state when there are no bookings", () => {
    mockState.bookings.bookings = [];

    renderWithProviders();

    expect(
      screen.getByRole("heading", { name: /no bookings yet/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/you haven't made any bookings yet/i),
    ).toBeInTheDocument();
  });

  it("shows success message after confirming delete", async () => {
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
        startDate: "2025-01-10",
        endDate: "2025-01-12",
        guestName: "John Doe",
        guestEmail: "john@example.com",
      },
    ];

    // Make dispatch return an object with unwrap() for thunks
    mockDispatch.mockReturnValue(undefined);

    renderWithProviders();

    // Click the Delete button on the booking card (first Delete button)
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    await user.click(deleteButton);

    // Now the confirm dialog is open; click the confirm Delete (second Delete button)
    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    const confirmDeleteButton = deleteButtons[1];
    await user.click(confirmDeleteButton);

    expect(
      await screen.findByText(/booking deleted successfully!/i),
    ).toBeInTheDocument();
  });
});
