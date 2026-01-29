import type { Property } from "@/types";
import styled from "styled-components";

const ImageGallery = styled.div`
  margin-bottom: 1.5rem;
`;

const MainImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 0.5rem;
  background-color: #f3f4f6;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const Address = styled.p`
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 1rem;
`;

const InfoRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
`;

const Type = styled.span`
  padding: 0.25rem 0.75rem;
  background-color: #f3f4f6;
  color: #374151;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  text-transform: capitalize;
`;

const Price = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 1rem;
  color: #6b7280;
`;

const Description = styled.p`
  color: #374151;
  line-height: 1.6;
  margin-top: 1.5rem;
`;

export const PropertyBookingCard = ({ property }: { property: Property }) => {
  return (
    <>
      <ImageGallery>
        <MainImage
          src={property.images[0] || "/assets/common/property-placeholder.svg"}
          alt={property.title}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/assets/common/property-placeholder.svg";
          }}
        />
      </ImageGallery>
      <Title>{property.title}</Title>
      <Address>{property.address}</Address>
      <InfoRow>
        <Type>{property.type}</Type>
        <Price>${property.price}/night</Price>
        <Rating>
          <span>⭐</span>
          <span>{property.rating.toFixed(1)}</span>
        </Rating>
      </InfoRow>
      <Description>{property.description}</Description>
    </>
  );
};
