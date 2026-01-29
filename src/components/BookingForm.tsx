import React, { useState } from "react";
import styled from "styled-components";
import { DateInput } from "./DateInput";
import { ErrorMessage } from "./ErrorMessage";
import {
  validateBookingForm,
  type BookingFormData,
  type BookingFormErrors,
} from "@/utils/validation";
import { getTodayString } from "@/utils/dateUtils";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
`;

const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${(props) => (props.$hasError ? "#dc2626" : "#d1d5db")};
  border-radius: 0.375rem;
  font-size: 1rem;
  background-color: white;
  color: #111827;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$hasError ? "#dc2626" : "#3b82f6")};
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.$hasError
          ? "rgba(220, 38, 38, 0.15)"
          : "rgba(59, 130, 246, 0.1)"};
  }
`;

const Button = styled.button<{ disabled?: boolean }>`
  padding: 0.75rem 1.5rem;
  background-color: ${(props) => (props.disabled ? "#9ca3af" : "#3b82f6")};
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #2563eb;
  }
`;

interface BookingFormProps {
  initialData?: {
    startDate?: string;
    endDate?: string;
    guestName?: string;
    guestEmail?: string;
  };
  onSubmit: (data: BookingFormData) => void;
  isLoading?: boolean;
  submitLabel?: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
  submitLabel = "Save Booking",
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    startDate: initialData?.startDate || "",
    endDate: initialData?.endDate || "",
    guestName: initialData?.guestName || "",
    guestEmail: initialData?.guestEmail || "",
  });

  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: keyof BookingFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateBookingForm(formData);
    setErrors(validationErrors);
    setTouched({
      startDate: true,
      endDate: true,
      guestName: true,
      guestEmail: true,
    });

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const today = getTodayString();

  return (
    <Form onSubmit={handleSubmit} noValidate data-testid="booking-form">
      <FormGroup>
        <Label htmlFor="startDate">Start Date *</Label>
        <DateInput
          id="startDate"
          name="startDate"
          value={formData.startDate}
          onChange={(value) => handleChange("startDate", value)}
          min={today}
          hasError={!!(touched.startDate && errors.startDate)}
          data-testid="start-date-input"
        />
        {touched.startDate && errors.startDate && (
          <ErrorMessage message={errors.startDate} />
        )}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="endDate">End Date *</Label>
        <DateInput
          id="endDate"
          name="endDate"
          value={formData.endDate}
          onChange={(value) => handleChange("endDate", value)}
          min={formData.startDate || today}
          hasError={!!(touched.endDate && errors.endDate)}
          data-testid="end-date-input"
        />
        {touched.endDate && errors.endDate && (
          <ErrorMessage message={errors.endDate} />
        )}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="guestName">Guest Name *</Label>
        <Input
          id="guestName"
          name="guestName"
          type="text"
          value={formData.guestName}
          onChange={(e) => handleChange("guestName", e.target.value)}
          onBlur={() => handleBlur("guestName")}
          $hasError={!!(touched.guestName && errors.guestName)}
          data-testid="guest-name-input"
        />
        {touched.guestName && errors.guestName && (
          <ErrorMessage message={errors.guestName} />
        )}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="guestEmail">Guest Email *</Label>
        <Input
          id="guestEmail"
          name="guestEmail"
          type="email"
          value={formData.guestEmail}
          onChange={(e) => handleChange("guestEmail", e.target.value)}
          onBlur={() => handleBlur("guestEmail")}
          $hasError={!!(touched.guestEmail && errors.guestEmail)}
          data-testid="guest-email-input"
        />
        {touched.guestEmail && errors.guestEmail && (
          <ErrorMessage message={errors.guestEmail} />
        )}
      </FormGroup>

      <Button type="submit" disabled={isLoading} data-testid="submit-button">
        {isLoading ? "Saving..." : submitLabel}
      </Button>
    </Form>
  );
};
