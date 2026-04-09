import React, { useMemo, useState } from "react";
import { PropertyCard } from "@/components/PropertyCard";
import type { Property } from "@/types";
import { EmptyState } from "@/components/EmptyState";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppDispatch";

export const Search: React.FC = () => {
  const { properties } = useAppSelector((state) => state.properties);

  const [searchValue, setSearchValue] = useState<string>("");

  const filteredProperties = useMemo(() => {
    const q = searchValue.trim().toLowerCase();
    if (!q) return properties;
    return properties.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q),
    );
  }, [properties, searchValue]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">
          Search Properties
        </h2>
        <form>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="place"
              className="text-sm font-medium text-gray-700"
            >
              Place name
            </label>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              name="place"
              id="place"
              placeholder="Search by property name or address..."
              className="rounded-md border border-gray-200 px-4 py-3 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </form>
      </div>

      {properties.length === 0 ? (
        <EmptyState
          title="No Properties Available"
          message="There are no properties available at the moment."
        />
      ) : filteredProperties.length === 0 ? (
        <EmptyState
          title="No results"
          message={`No properties match "${searchValue}". Try a different search.`}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
          {filteredProperties.map((property: Property) => (
            <Link
              to={`/property/${property.id}`}
              key={property.id}
              className="block no-underline"
            >
              <PropertyCard property={property} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
