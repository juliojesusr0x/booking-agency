import React from "react";

interface LoadingSpinnerProps {
  "data-testid"?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  "data-testid": testId,
}) => {
  return (
    <div
      data-testid={testId}
      className="flex items-center justify-center p-8"
    >
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"
        aria-hidden
      />
    </div>
  );
};
