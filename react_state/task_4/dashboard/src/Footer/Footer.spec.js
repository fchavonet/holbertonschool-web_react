import React from 'react';
import { render, screen } from '@testing-library/react';
import { StyleSheetTestUtils } from 'aphrodite';
import Footer from './Footer';
import { newContext, defaultUser } from '../Context/context';

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

test('does NOT display "Contact us" link when user is logged out', () => {
  const value = { user: { ...defaultUser }, logOut: () => { } };

  render(
    <newContext.Provider value={value}>
      <Footer />
    </newContext.Provider>
  );

  const contactLink = screen.queryByRole('link', { name: /contact us/i });
  expect(contactLink).not.toBeInTheDocument();
});

test('displays "Contact us" link when user is logged in', () => {
  const value = {
    user: { email: 'user@example.com', password: 'strongpass', isLoggedIn: true },
    logOut: () => { },
  };

  render(
    <newContext.Provider value={value}>
      <Footer />
    </newContext.Provider>
  );

  const contactLink = screen.getByRole('link', { name: /contact us/i });
  expect(contactLink).toBeInTheDocument();
});
