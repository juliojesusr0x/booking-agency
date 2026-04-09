import React from "react";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  actionLink?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  actionLabel,
  actionLink,
}) => {
  return (
    <div className="px-4 py-12 text-center text-gray-500">
      <h2 className="mb-2 text-2xl font-semibold text-gray-900">{title}</h2>
      <p className="mb-6 text-base">{message}</p>
      {actionLabel && actionLink && (
        <Link
          to={actionLink}
          className="inline-block rounded-md bg-blue-600 px-6 py-3 font-medium text-white no-underline transition hover:bg-blue-700"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
};
