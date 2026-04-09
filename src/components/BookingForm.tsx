import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateInput } from "./DateInput";
import { ErrorMessage } from "./ErrorMessage";
import {
  bookingFormSchema,
  type BookingFormValues,
} from "@/schemas/booking";
import { getTodayString } from "@/utils/dateUtils";

interface BookingFormProps {
  initialData?: {
    startDate?: string;
    endDate?: string;
    guestName?: string;
    guestEmail?: string;
  };
  onSubmit: (data: BookingFormValues) => void;
  isLoading?: boolean;
  submitLabel?: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
  submitLabel = "Save Booking",
}) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      startDate: initialData?.startDate ?? "",
      endDate: initialData?.endDate ?? "",
      guestName: initialData?.guestName ?? "",
      guestEmail: initialData?.guestEmail ?? "",
    },
    mode: "onSubmit",
  });

  const startDateValue = watch("startDate");
  const today = getTodayString();

  useEffect(() => {
    reset({
      startDate: initialData?.startDate ?? "",
      endDate: initialData?.endDate ?? "",
      guestName: initialData?.guestName ?? "",
      guestEmail: initialData?.guestEmail ?? "",
    });
  }, [initialData, reset]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
      noValidate
      className="flex flex-col gap-6"
      data-testid="booking-form"
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="startDate"
          className="text-sm font-medium text-gray-700"
        >
          Start Date *
        </label>
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <DateInput
              id="startDate"
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              min={today}
              hasError={!!errors.startDate}
              data-testid="start-date-input"
            />
          )}
        />
        {errors.startDate && (
          <ErrorMessage message={errors.startDate.message ?? ""} />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="endDate" className="text-sm font-medium text-gray-700">
          End Date *
        </label>
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <DateInput
              id="endDate"
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              min={startDateValue || today}
              hasError={!!errors.endDate}
              data-testid="end-date-input"
            />
          )}
        />
        {errors.endDate && (
          <ErrorMessage message={errors.endDate.message ?? ""} />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="guestName"
          className="text-sm font-medium text-gray-700"
        >
          Guest Name *
        </label>
        <input
          id="guestName"
          type="text"
          autoComplete="name"
          className={`w-full rounded-md border px-3 py-2.5 text-base text-gray-900 focus:outline-none focus:ring-2 ${
            errors.guestName
              ? "border-red-600 focus:border-red-600 focus:ring-red-500/20"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
          }`}
          data-testid="guest-name-input"
          {...register("guestName")}
        />
        {errors.guestName && (
          <ErrorMessage message={errors.guestName.message ?? ""} />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="guestEmail"
          className="text-sm font-medium text-gray-700"
        >
          Guest Email *
        </label>
        <input
          id="guestEmail"
          type="email"
          autoComplete="email"
          className={`w-full rounded-md border px-3 py-2.5 text-base text-gray-900 focus:outline-none focus:ring-2 ${
            errors.guestEmail
              ? "border-red-600 focus:border-red-600 focus:ring-red-500/20"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
          }`}
          data-testid="guest-email-input"
          {...register("guestEmail")}
        />
        {errors.guestEmail && (
          <ErrorMessage message={errors.guestEmail.message ?? ""} />
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        data-testid="submit-button"
        className="rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {isLoading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
};
