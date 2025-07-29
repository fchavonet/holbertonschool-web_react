import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('renders correct text content in p elements', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    const footerParagraph = screen.getByText(
        new RegExp(`copyright ${currentYear}.*holberton school`, 'i')
    );

    expect(footerParagraph).toBeInTheDocument();
});
