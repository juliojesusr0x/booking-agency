import React, { memo } from "react";
import type { Property } from "@/types";

interface PropertyCardProps {
  property: Property;
}

const PropertyCardComponent: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="h-full cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <img
        src={property.images[0] || "/assets/common/property-placeholder.svg"}
        alt={property.title}
        className="h-48 w-full object-cover bg-gray-100"
      />
      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">
          {property.title}
        </h3>
        <p className="mb-3 text-sm text-gray-500">{property.address}</p>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm capitalize text-gray-500">
            {property.type}
          </span>
          <span className="text-base font-semibold text-gray-900">
            ${property.price}/night
          </span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <span>⭐</span>
          <span>{property.rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export const PropertyCard = memo(PropertyCardComponent);
