import { render, screen } from '@testing-library/react';
import App from './App.jsx'

test('Renders h1 element with "School Dashboard text"', () => {
    render(<App />);

    const headingElement = screen.getByRole('heading', {
        name: /school dashboard/i
    });

    expect(headingElement).toBeInTheDocument();
});

test('Renders correct text content in p elements', () => {
    render(<App />);

    const bodyParagraph = screen.getByText(/login to access the full dashboard/i);
    expect(bodyParagraph).toBeInTheDocument();

    const currentYear = new Date().getFullYear();
    const footerParagraph = screen.getByText(
        new RegExp(`copyright ${currentYear} - holberton school`, 'i')
    );
    expect(footerParagraph).toBeInTheDocument();
});

test('renders img element', () => {
    render(<App />);

    const imgElement = screen.getByAltText(/holberton logo/i);
    expect(imgElement).toBeInTheDocument();
});