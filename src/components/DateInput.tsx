import React from "react";

interface DateInputProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  min?: string;
  max?: string;
  hasError?: boolean;
  "data-testid"?: string;
}

export const DateInput: React.FC<DateInputProps> = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  min,
  max,
  hasError = false,
  "data-testid": testId,
}) => {
  return (
    <input
      id={id}
      type="date"
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      min={min}
      max={max}
      aria-invalid={hasError}
      data-testid={testId}
      className={`w-full rounded-md border px-3 py-2.5 text-base text-gray-900 focus:outline-none focus:ring-2 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60 ${
        hasError
          ? "border-red-600 focus:border-red-600 focus:ring-red-500/20"
          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
      }`}
    />
  );
};
