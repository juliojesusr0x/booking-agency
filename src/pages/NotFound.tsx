import React from "react";
import styled from "styled-components";
import { EmptyState } from "../components/EmptyState";

const Container = styled.div`
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NotFound: React.FC = () => {
  return (
    <Container>
      <EmptyState
        title="404 - Page Not Found"
        message="The page you're looking for doesn't exist."
        actionLabel="Go to Homepage"
        actionLink="/"
      />
    </Container>
  );
};
