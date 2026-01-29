import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Navigation } from '@/components/Navigation';

describe('Navigation (snapshot)', () => {
  it('matches snapshot on homepage route', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Navigation />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it('matches snapshot on bookings route', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/bookings']}>
        <Navigation />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});

