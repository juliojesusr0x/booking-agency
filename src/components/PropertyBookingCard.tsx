import type { Property } from "@/types";

export const PropertyBookingCard = ({ property }: { property: Property }) => {
  return (
    <>
      <div className="mb-6">
        <img
          src={property.images[0] || "/assets/common/property-placeholder.svg"}
          alt={property.title}
          className="h-80 w-full rounded-lg object-cover bg-gray-100"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/assets/common/property-placeholder.svg";
          }}
        />
      </div>
      <h1 className="mb-2 text-3xl font-bold text-gray-900">{property.title}</h1>
      <p className="mb-4 text-base text-gray-500">{property.address}</p>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <span className="rounded-md bg-gray-100 px-3 py-1 text-sm capitalize text-gray-700">
          {property.type}
        </span>
        <span className="text-xl font-semibold text-gray-900">
          ${property.price}/night
        </span>
        <div className="flex items-center gap-1 text-base text-gray-500">
          <span>⭐</span>
          <span>{property.rating.toFixed(1)}</span>
        </div>
      </div>
      <p className="mt-6 leading-relaxed text-gray-700">{property.description}</p>
    </>
  );
};
