import App from '../App/App'
import Header from './Footer';
import { render, screen } from '@testing-library/react';

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