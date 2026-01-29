import type { Property, Booking } from "@/types";
import { parseLocalDateString } from "@/utils/dateUtils";

interface FakeDatabase {
  properties: Property[];
  bookings: Booking[];
}

const db: FakeDatabase = {
  properties: [],
  bookings: [],
};

const STORAGE_KEYS = {
  PROPERTIES: "booking_agency_properties",
  BOOKINGS: "booking_agency_bookings",
};

// Persistence functions
async function saveToPersistence(): Promise<void> {
  try {
    localStorage.setItem(
      STORAGE_KEYS.PROPERTIES,
      JSON.stringify(db.properties),
    );
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(db.bookings));
  } catch (error) {
    // Handle quota exceeded or disabled localStorage
    if (error instanceof DOMException && error.code === 22) {
      console.error(
        "localStorage quota exceeded. Data will only be stored in memory.",
      );
    } else {
      console.error("Failed to save to localStorage:", error);
    }
    // Continue with in-memory only - don't throw, just log
  }
}

async function loadFromPersistence(): Promise<void> {
  try {
    const propertiesJson = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
    const bookingsJson = localStorage.getItem(STORAGE_KEYS.BOOKINGS);

    if (propertiesJson) {
      try {
        db.properties = JSON.parse(propertiesJson);
        // Validate parsed data is an array
        if (!Array.isArray(db.properties)) {
          throw new Error("Invalid properties data format");
        }
      } catch (parseError) {
        console.error(
          "Failed to parse properties from localStorage:",
          parseError,
        );
        db.properties = [];
      }
    }

    if (bookingsJson) {
      try {
        db.bookings = JSON.parse(bookingsJson);
        // Validate parsed data is an array
        if (!Array.isArray(db.bookings)) {
          throw new Error("Invalid bookings data format");
        }
        // Keep startDate/endDate as YYYY-MM-DD strings (no UTC parse → avoids off-by-one)
      } catch (parseError) {
        console.error(
          "Failed to parse bookings from localStorage:",
          parseError,
        );
        db.bookings = [];
      }
    }
  } catch (error) {
    console.error("Failed to load from localStorage:", error);
    // Initialize with empty arrays
    db.properties = [];
    db.bookings = [];
  }
}

// Initial properties seed data
function getInitialProperties(): Property[] {
  return [
    {
      id: 1,
      title: "Cozy Apartment Downtown",
      address: "123 Main St, New York, NY 10001",
      type: "apartment",
      price: 150,
      images: [
        "/assets/properties/property-1-1.jpg",
        "/assets/properties/property-1-2.jpg",
      ],
      rating: 4.5,
      description:
        "Beautiful apartment in the heart of downtown. Perfect for a weekend getaway.",
    },
    {
      id: 2,
      title: "Modern House with Garden",
      address: "456 Oak Avenue, Los Angeles, CA 90001",
      type: "house",
      price: 250,
      images: [
        "/assets/properties/property-2-1.jpg",
        "/assets/properties/property-2-2.jpg",
      ],
      rating: 4.8,
      description:
        "Spacious modern house with a beautiful garden. Great for families.",
    },
    {
      id: 3,
      title: "Mountain Chalet Retreat",
      address: "789 Mountain Road, Aspen, CO 81611",
      type: "chalet",
      price: 300,
      images: [
        "/assets/properties/property-3-1.jpg",
        "/assets/properties/property-3-2.jpg",
      ],
      rating: 4.9,
      description:
        "Luxurious chalet with stunning mountain views. Perfect for a peaceful retreat.",
    },
    {
      id: 4,
      title: "Beachside Apartment",
      address: "321 Ocean Drive, Miami, FL 33139",
      type: "apartment",
      price: 200,
      images: [
        "/assets/properties/property-4-1.jpg",
        "/assets/properties/property-4-2.jpg",
      ],
      rating: 4.7,
      description:
        "Stunning beachside apartment with ocean views. Steps away from the beach.",
    },
    {
      id: 5,
      title: "Family-Friendly House",
      address: "654 Park Street, Chicago, IL 60601",
      type: "house",
      price: 180,
      images: [
        "/assets/properties/property-5-1.jpg",
        "/assets/properties/property-5-2.jpg",
      ],
      rating: 4.6,
      description:
        "Comfortable family house in a quiet neighborhood. Perfect for longer stays.",
    },
  ];
}

// Initialize database
export async function initDb(): Promise<void> {
  await loadFromPersistence();

  // If no data exists, seed initial properties
  if (db.properties.length === 0) {
    db.properties = getInitialProperties();
    try {
      await saveToPersistence();
    } catch (error: unknown) {
      // If save fails, properties still exist in memory
      console.warn(
        "Failed to persist initial properties, but they are available in memory",
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}

// Properties CRUD
export function getProperties(): Property[] {
  return [...db.properties];
}

export function getPropertyById(id: string | number): Property | undefined {
  return db.properties.find((p) => p.id === id);
}

export function addProperty(property: Omit<Property, "id">): Property {
  const newId =
    db.properties.length > 0
      ? Math.max(
          ...db.properties.map((p) => (typeof p.id === "number" ? p.id : 0)),
        ) + 1
      : 1;
  const newProperty: Property = { ...property, id: newId };
  db.properties.push(newProperty);
  return newProperty;
}

export function updateProperty(
  id: string | number,
  updates: Partial<Property>,
): Property | null {
  const index = db.properties.findIndex((p) => p.id === id);
  if (index === -1) return null;
  db.properties[index] = { ...db.properties[index], ...updates };
  return db.properties[index];
}

export function deleteProperty(id: string | number): boolean {
  const index = db.properties.findIndex((p) => p.id === id);
  if (index === -1) return false;
  db.properties.splice(index, 1);
  return true;
}

// Bookings CRUD
export function getBookings(): Booking[] {
  return [...db.bookings];
}

export function getBookingById(id: string | number): Booking | undefined {
  return db.bookings.find((b) => b.id === id);
}

export function getBookingsByPropertyId(
  propertyId: string | number,
): Booking[] {
  return db.bookings.filter((b) => b.propertyId === propertyId);
}

export function addBooking(booking: Omit<Booking, "id">): Booking {
  const newId =
    db.bookings.length > 0
      ? Math.max(
          ...db.bookings.map((b) => (typeof b.id === "number" ? b.id : 0)),
        ) + 1
      : 1;
  const newBooking: Booking = { ...booking, id: newId };
  db.bookings.push(newBooking);
  return newBooking;
}

export function updateBooking(
  id: string | number,
  updates: Partial<Booking>,
): Booking | null {
  const index = db.bookings.findIndex((b) => b.id === id);
  if (index === -1) return null;
  db.bookings[index] = { ...db.bookings[index], ...updates };
  return db.bookings[index];
}

export function deleteBooking(id: string | number): boolean {
  const index = db.bookings.findIndex((b) => b.id === id);
  if (index === -1) return false;
  db.bookings.splice(index, 1);
  return true;
}

// Overlap checking
export function checkBookingOverlap(
  propertyId: string | number,
  startDate: Date,
  endDate: Date,
  excludeBookingId?: string | number,
): boolean {
  const existingBookings = db.bookings.filter(
    (booking) =>
      booking.propertyId === propertyId && booking.id !== excludeBookingId,
  );

  return existingBookings.some((booking) => {
    const bookingStart = parseLocalDateString(
      typeof booking.startDate === "string"
        ? booking.startDate
        : booking.startDate.toISOString().slice(0, 10),
    );
    const bookingEnd = parseLocalDateString(
      typeof booking.endDate === "string"
        ? booking.endDate
        : booking.endDate.toISOString().slice(0, 10),
    );

    // Overlap condition: start1 <= end2 AND end1 >= start2
    return startDate <= bookingEnd && endDate >= bookingStart;
  });
}

// Export save function for API layer
export { saveToPersistence };
