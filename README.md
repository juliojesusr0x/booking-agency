# Booking Agency

A React app for browsing properties and managing stay bookings: search listings, book date ranges, edit or cancel reservations, with validation and duplicate-date prevention per property.

## Features

- Property search by title or address
- Create, update, and delete bookings
- Date range selection with overlap checks for the same property
- Bookings persisted in the browser (`localStorage`)
- Responsive layout
- Form validation (Zod + React Hook Form)
- Unit tests (Vitest, React Testing Library)

## Tech stack

- **React 19** and **TypeScript**
- **Vite** — build and dev server
- **React Router 7** — routing
- **Redux Toolkit** — app state
- **Tailwind CSS v4** — styling
- **React Hook Form** + **Zod** — forms and validation
- **date-fns** — date parsing and formatting
- **Vitest** — tests

## Getting started

### Prerequisites

- Node.js 18+ and npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Production build

```bash
npm run build
npm run preview
```

### Tests

```bash
npm test
```

## Deployment (Vercel)

This is a single-page app. The repo includes `vercel.json` so client routes fall back to `index.html`.

1. Import the repository in [Vercel](https://vercel.com).
2. Framework: Vite (default). Build: `npm run build`. Output: `dist`.
3. After deploy, add your production URL below.

**Live demo:** _add your Vercel URL here_

## Project layout

```
src/
├── db/           # Seed property data
├── store/        # Redux slices and persistence listener
├── schemas/      # Zod schemas
├── pages/        # Route-level views
├── components/   # UI components
├── hooks/        # Typed Redux hooks
├── utils/        # Dates, storage helpers
├── types/        # Shared TypeScript types
└── tests/        # Vitest tests
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Search and list properties |
| `/property/:id` | Property details and new booking |
| `/property/:id/booking/:bookingId` | Edit booking |
| `/bookings` | All bookings |

## Behavior notes

- Bookings store a unique `id` and a `propertyId` linking to the listing.
- Overlapping stays on the same property are rejected.
- Start date cannot be in the past; at least one night is required.
