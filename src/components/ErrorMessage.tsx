import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  padding: 0.75rem;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.375rem;
  color: #991b1b;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

interface ErrorMessageProps {
  message: string;
  'data-testid'?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  'data-testid': testId,
}) => {
  if (!message) return null;

  return (
    <ErrorContainer data-testid={testId}>
      {message}
    </ErrorContainer>
  );
};
