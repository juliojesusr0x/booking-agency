import React from "react";
import styled from "styled-components";
import { Link } from "react-router";

const Container = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const Message = styled.p`
  font-size: 1rem;
  margin-bottom: 1.5rem;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }
`;

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
    <Container>
      <Title>{title}</Title>
      <Message>{message}</Message>
      {actionLabel && actionLink && (
        <StyledLink to={actionLink}>{actionLabel}</StyledLink>
      )}
    </Container>
  );
};
