import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { Search } from "@/pages/Search";
import type { RootState } from "@/store";

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

type PropertiesState = {
  properties: Property[];
};

let mockState: { properties: PropertiesState };
let mockDispatch: ReturnType<typeof vi.fn>;

vi.mock("@/hooks/useAppDispatch", async () => {
  const actual = await vi.importActual<typeof import("@/hooks/useAppDispatch")>(
    "@/hooks/useAppDispatch"
  );
  return {
    ...actual,
    useAppDispatch: () => mockDispatch,
    useAppSelector: <T,>(selector: (state: RootState) => T) =>
      selector(mockState as unknown as RootState),
  };
});

const renderWithRouter = () =>
  render(
    <MemoryRouter>
      <Search />
    </MemoryRouter>
  );

describe("Search page", () => {
  beforeEach(() => {
    mockDispatch = vi.fn();
    mockState = {
      properties: {
        properties: [],
      },
    };
  });

  it("renders all properties by default", () => {
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
      {
        id: 3,
        title: "Mountain Chalet Retreat",
        address: "789 Mountain Rd",
        type: "chalet",
        price: 300,
        images: [],
        rating: 4.9,
        description: "Chalet in the mountains",
      },
    ];

    renderWithRouter();

    expect(
      screen.getByRole("heading", { name: /search properties/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/cozy apartment downtown/i)).toBeInTheDocument();
    expect(screen.getByText(/modern house with garden/i)).toBeInTheDocument();
    expect(screen.getByText(/mountain chalet retreat/i)).toBeInTheDocument();
  });

  it("filters properties by name/address", async () => {
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

    renderWithRouter();

    const input = screen.getByRole("textbox", { name: /place name/i });
    await user.type(input, "Cozy");

    // wait for filtered result to appear to ensure state updates are flushed
    expect(
      await screen.findByText(/cozy apartment downtown/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/modern house with garden/i)
    ).not.toBeInTheDocument();
  });

  it('shows "No results" when search has no matches', async () => {
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

    renderWithRouter();

    const input = screen.getByRole("textbox", { name: /place name/i });
    await user.type(input, "xyz123");

    // wait for "No results" state to appear
    expect(
      await screen.findByRole("heading", { name: /no results/i })
    ).toBeInTheDocument();
  });
});
