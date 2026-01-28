export type PropertyType = 'apartment' | 'house' | 'chalet';

export interface Property {
  id: string | number;
  title: string;
  address: string;
  type: PropertyType;
  price: number; // Price per night
  images: string[];
  rating: number; // Rating (e.g., 4.5)
  description: string;
}

export interface Booking {
  id: string | number;
  propertyId: string | number;
  startDate: Date | string;
  endDate: Date | string;
  guestName: string;
  guestEmail: string;
}
