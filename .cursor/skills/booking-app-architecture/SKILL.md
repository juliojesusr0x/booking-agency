---
name: booking-app-architecture
description: Explains the Booking Agency app state shape, routing, and persistence. Use when changing bookings, properties, Redux, or navigation flows.
---

# Booking Agency architecture

## State (Redux)

- `properties`: list from seed data (`initialDb`).
- `bookings`: user bookings; each booking has `id`, `propertyId`, dates, guest fields.
- `status`: slice exists; wire only if needed for global loading/errors.

## Data model

- `Property.id` identifies a listing.
- `Booking.id` is the booking record id (unique).
- `Booking.propertyId` links a booking to a property. Overlap checks run per property.

## Routes

- `/` — search.
- `/property/:id` — details and new booking.
- `/property/:id/booking/:bookingId` — edit booking.
- `/bookings` — list and delete.

## Persistence

- Bookings are persisted to `localStorage` (key defined in `src/utils/storage.ts`). Load on app init; save after booking mutations.
