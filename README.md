# Booking Agency

A React-based booking management application that allows users to create, read, update, and delete bookings for properties.

## Features

- ✅ CRUD operations for bookings
- ✅ Property search and listing
- ✅ Date range selection
- ✅ Overlap prevention for bookings
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Form validation
- ✅ Error handling

## Tech Stack

- **React 18** with TypeScript
- **Vite** - Build tool
- **React Router v6** - Routing
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **Styled Components** - Component styling
- **Vitest** - Unit testing

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Testing

### Unit Tests

```bash
npm test
```

## Project Structure

```
src/
├── db/           # fake initial db values
├── store/        # Redux store and slices
├── pages/        # Page components
├── components/   # Reusable components
├── hooks/        # Custom hooks
├── utils/        # Utility functions
├── types/        # TypeScript types
└── tests/        # Test setup
```

## Pages

- **Homepage (Search)** - `/` - Search properties by date range
- **Property Details** - `/property/:id` - View property and create booking
- **Edit Booking** - `/property/:id/booking/:bookingId` - Edit existing booking
- **My Bookings** - `/bookings` - View and manage all bookings

## Notes

- All bookings are validated for overlaps
- Dates cannot be in the past
- At least 1 night stay is required
