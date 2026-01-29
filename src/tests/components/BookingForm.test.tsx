import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookingForm } from '@/components/BookingForm';

// Mock getTodayString to have stable min dates in tests
vi.mock('@/utils/dateUtils', async () => {
  const actual = await vi.importActual<typeof import('@/utils/dateUtils')>(
    '@/utils/dateUtils'
  );
  return {
    ...actual,
    getTodayString: () => '2025-01-01',
  };
});

describe('BookingForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('shows validation errors when submitting empty form', async () => {
    const onSubmit = vi.fn();

    render(<BookingForm onSubmit={onSubmit} />);

    const submitButton = screen.getByRole('button', { name: /save booking/i });
    await userEvent.click(submitButton);

    expect(
      screen.getByText(/start date is required/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/end date is required/i)).toBeInTheDocument();
    expect(screen.getByText(/guest name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/guest email is required/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with valid data', async () => {
    const onSubmit = vi.fn();

    // Ensure \"today\" is before the chosen start date, so validation passes
    vi.setSystemTime(new Date('2025-01-01T00:00:00Z'));

    render(<BookingForm onSubmit={onSubmit} />);

    // fill dates (use test ids because DateInput is not wired with label/id)
    const startDateInput = screen.getByTestId('start-date-input');
    const endDateInput = screen.getByTestId('end-date-input');
    fireEvent.change(startDateInput, { target: { value: '2025-01-10' } });
    fireEvent.change(endDateInput, { target: { value: '2025-01-12' } });

    // fill guest info (these inputs have proper label/id)
    const nameInput = screen.getByLabelText(/guest name/i);
    const emailInput = screen.getByLabelText(/guest email/i);
    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');

    const submitButton = screen.getByRole('button', { name: /save booking/i });
    await userEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      startDate: '2025-01-10',
      endDate: '2025-01-12',
      guestName: 'John Doe',
      guestEmail: 'john@example.com',
    });
  });

  it('disables submit button and shows loading label when isLoading is true', () => {
    const onSubmit = vi.fn();

    render(<BookingForm onSubmit={onSubmit} isLoading />);

    const submitButton = screen.getByRole('button', { name: /saving.../i });
    expect(submitButton).toBeDisabled();
  });
});

