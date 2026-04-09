import { z } from "zod";
import {
  isPastDate,
  parseLocalDateString,
} from "@/utils/dateUtils";

export const bookingFormSchema = z
  .object({
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    guestName: z.string().trim().min(1, "Guest name is required"),
    guestEmail: z
      .string()
      .min(1, "Guest email is required")
      .email("Please enter a valid email address"),
  })
  .superRefine((data, ctx) => {
    if (!data.startDate || !data.endDate) return;
    const start = parseLocalDateString(data.startDate);
    const end = parseLocalDateString(data.endDate);
    if (start >= end) {
      ctx.addIssue({
        code: "custom",
        message:
          "End date must be after start date (at least 1 night required)",
        path: ["endDate"],
      });
    }
    if (isPastDate(data.startDate)) {
      ctx.addIssue({
        code: "custom",
        message: "Start date cannot be in the past",
        path: ["startDate"],
      });
    }
  });

export type BookingFormValues = z.infer<typeof bookingFormSchema>;
