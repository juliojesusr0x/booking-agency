import { parseLocalDateString, isPastDate } from "@/utils/dateUtils";

/**
 * Basic email validation
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.trim() === "") return false;
  // Simple email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validate guest name (non-empty string)
 */
export function isValidGuestName(name: string): boolean {
  return name.trim().length > 0;
}

/**
 * Validate all booking form fields
 */
export interface BookingFormErrors {
  startDate?: string;
  endDate?: string;
  guestName?: string;
  guestEmail?: string;
}

export interface BookingFormData {
  startDate: string;
  endDate: string;
  guestName: string;
  guestEmail: string;
}

export function validateBookingForm(data: BookingFormData): BookingFormErrors {
  const errors: BookingFormErrors = {};

  // Start date validation
  if (!data.startDate) {
    errors.startDate = "Start date is required";
  }

  // End date validation
  if (!data.endDate) {
    errors.endDate = "End date is required";
  }

  // Date range validation
  if (data.startDate && data.endDate) {
    const start = parseLocalDateString(data.startDate);
    const end = parseLocalDateString(data.endDate);

    if (start >= end) {
      errors.endDate =
        "End date must be after start date (at least 1 night required)";
    }

    // Check if start date is in the past
    if (isPastDate(data.startDate)) {
      console.log("erro was here 1");
      errors.startDate = "Start date cannot be in the past";
    }
  }

  // Guest name validation
  if (!isValidGuestName(data.guestName)) {
    errors.guestName = "Guest name is required";
  }

  // Guest email validation
  if (!data.guestEmail) {
    errors.guestEmail = "Guest email is required";
  } else if (!isValidEmail(data.guestEmail)) {
    errors.guestEmail = "Please enter a valid email address";
  }

  return errors;
}
