import Header from './Header';
import { render, screen } from '@testing-library/react';

test('renders img element', () => {
    render(<Header />);

    const imgElement = screen.getByAltText(/holberton logo/i);

    expect(imgElement).toBeInTheDocument();
});

test('Renders h1 element with "School Dashboard text"', () => {
    render(<Header />);

    const headingElement = screen.getByRole('heading', {
        name: /school dashboard/i
    });
    
    expect(headingElement).toBeInTheDocument();
});