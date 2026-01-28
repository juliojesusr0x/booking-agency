import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { PropertyCard } from "@/components/PropertyCard";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import type { Property } from "@/types";
import { setProperties } from "@/store/properties/PropertySlice";
import { getProperties } from "@/db/fakeDb";
import { EmptyState } from "@/components/EmptyState";
import { Link } from "react-router-dom";

const SearchContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const SearchBox = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const SearchTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #111827;
`;

const SearchInputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SearchInputLabel = styled.label`
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
`;

const SearchInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 1rem;
`;

const PropertiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const Search: React.FC = () => {
  const properties = useSelector(
    (state: RootState) => state.properties.properties,
  );
  const dispatch = useDispatch<AppDispatch>();

  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    dispatch(setProperties(getProperties()));
  }, [dispatch]);

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
    <SearchContainer>
      <SearchBox>
        <SearchTitle>Search Properties</SearchTitle>
        <form>
          <SearchInputBox>
            <SearchInputLabel htmlFor="place">Place name</SearchInputLabel>
            <SearchInput
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              name="place"
              id="place"
              placeholder="Search by property name or address..."
            />
          </SearchInputBox>
        </form>
      </SearchBox>

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
        <PropertiesGrid>
          {filteredProperties.map((property: Property) => (
            <Link to={`/property/${property.id}`} key={property.id}>
              <PropertyCard property={property} />
            </Link>
          ))}
        </PropertiesGrid>
      )}
    </SearchContainer>
  );
};
