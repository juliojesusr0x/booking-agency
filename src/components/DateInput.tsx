import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${(props) => (props.$hasError ? '#dc2626' : '#d1d5db')};
  border-radius: 0.375rem;
  font-size: 1rem;
  background-color: white;
  color: #111827;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$hasError ? '#dc2626' : '#3b82f6')};
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.$hasError ? 'rgba(220, 38, 38, 0.15)' : 'rgba(59, 130, 246, 0.1)'};
  }

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    filter: opacity(0.6);
  }
`;

interface DateInputProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
  hasError?: boolean;
  'data-testid'?: string;
}

export const DateInput: React.FC<DateInputProps> = ({
  id,
  name,
  value,
  onChange,
  min,
  max,
  hasError = false,
  'data-testid': testId,
}) => {
  return (
    <StyledInput
      id={id}
      type="date"
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      min={min}
      max={max}
      $hasError={hasError}
      aria-invalid={hasError || false}
      data-testid={testId}
    />
  );
};
