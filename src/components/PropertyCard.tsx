import React, { memo } from "react";
import styled from "styled-components";
import type { Property } from "@/types";

const Card = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  background: white;
  height: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  background-color: #f3f4f6;
`;

const Content = styled.div`
  padding: 1rem;
`;

const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const Address = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.75rem;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Type = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
  text-transform: capitalize;
`;

const Price = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: #6b7280;
`;

interface PropertyCardProps {
  property: Property;
}

const PropertyCardComponent: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Card>
      <Image
        src={property.images[0] || "/assets/common/property-placeholder.svg"}
        alt={property.title}
      />
      <Content>
        <Title>{property.title}</Title>
        <Address>{property.address}</Address>
        <InfoRow>
          <Type>{property.type}</Type>
          <Price>${property.price}/night</Price>
        </InfoRow>
        <Rating>
          <span>⭐</span>
          <span>{property.rating.toFixed(1)}</span>
        </Rating>
      </Content>
    </Card>
  );
};

export const PropertyCard = memo(PropertyCardComponent);
