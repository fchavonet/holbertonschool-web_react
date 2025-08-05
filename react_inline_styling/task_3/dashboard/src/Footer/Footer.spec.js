import React from 'react';
import { render, screen } from '@testing-library/react';
import { StyleSheetTestUtils } from 'aphrodite';
import Footer from './Footer';

beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

test('renders correct text content in p elements', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    const footerParagraph = screen.getByText(
        new RegExp(`copyright ${currentYear}.*holberton school`, 'i')
    );

    expect(footerParagraph).toBeInTheDocument();
});
