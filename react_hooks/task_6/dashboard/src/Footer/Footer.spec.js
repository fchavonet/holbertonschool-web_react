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

test('renders correct copyright text', () => {
  render(<Footer user={{ isLoggedIn: false }} />);

  const currentYear = new Date().getFullYear();
  const footerParagraph = screen.getByText(
    new RegExp(`copyright ${currentYear}.*holberton school`, 'i')
  );

  expect(footerParagraph).toBeInTheDocument();
});

test('does NOT display "Contact us" link when user is logged out', () => {
  render(<Footer user={{ isLoggedIn: false }} />);

  const contactLink = screen.queryByRole('link', { name: /contact us/i });
  expect(contactLink).not.toBeInTheDocument();
});

test('displays "Contact us" link when user is logged in', () => {
  const user = { email: 'user@example.com', isLoggedIn: true };
  render(<Footer user={user} />);

  const contactLink = screen.getByRole('link', { name: /contact us/i });
  expect(contactLink).toBeInTheDocument();
});
