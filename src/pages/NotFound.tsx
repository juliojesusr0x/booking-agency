import React from "react";
import { EmptyState } from "../components/EmptyState";

export const NotFound: React.FC = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <EmptyState
        title="404 - Page Not Found"
        message="The page you're looking for doesn't exist."
        actionLabel="Go to Homepage"
        actionLink="/"
      />
    </div>
  );
};
