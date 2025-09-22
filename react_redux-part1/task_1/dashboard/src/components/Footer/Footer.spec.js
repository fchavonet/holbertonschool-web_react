// External libraries.
import { render, screen } from '@testing-library/react';
import { StyleSheetTestUtils } from 'aphrodite';

// Components.
import Footer from './Footer';

// Suppress Aphrodite style injection before tests.
beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

// Clear and resume style injection after tests.
afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

/******************
* COMPONENT TESTS *
******************/

test('Renders correct copyright text', () => {
  render(<Footer user={{ isLoggedIn: false }} />);

  const currentYear = new Date().getFullYear();
  const footerParagraph = screen.getByText(new RegExp(`copyright ${currentYear}.*holberton school`, 'i'));

  expect(footerParagraph).toBeInTheDocument();
});
