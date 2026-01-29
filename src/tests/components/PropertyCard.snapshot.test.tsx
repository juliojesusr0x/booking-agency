import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { PropertyCard } from '@/components/PropertyCard';
import type { Property } from '@/types';

const sampleProperty: Property = {
  id: 1,
  title: 'Cozy Apartment Downtown',
  address: '123 Main St, City',
  type: 'apartment',
  price: 150,
  images: ['https://example.com/image.jpg'],
  rating: 4.5,
  description: 'Nice place in the city center.',
};

describe('PropertyCard (snapshot)', () => {
  it('matches snapshot for a sample property', () => {
    const { container } = render(
      <MemoryRouter>
        <PropertyCard property={sampleProperty} />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});

