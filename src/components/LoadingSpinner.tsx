import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Spinner = styled.div`
  border: 4px solid #f3f4f6;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

interface LoadingSpinnerProps {
  'data-testid'?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  'data-testid': testId,
}) => {
  return (
    <SpinnerContainer data-testid={testId}>
      <Spinner />
    </SpinnerContainer>
  );
};
