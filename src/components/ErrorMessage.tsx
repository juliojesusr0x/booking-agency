import React from "react";

interface ErrorMessageProps {
  message: string;
  "data-testid"?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  "data-testid": testId,
}) => {
  if (!message) return null;

  return (
    <div
      data-testid={testId}
      className="mt-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-900"
    >
      {message}
    </div>
  );
};
