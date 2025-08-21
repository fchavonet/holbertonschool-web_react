import React from 'react';
import Login from './Login';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

test('renders 2 labels, 2 inputs and 1 submit', () => {
  const { container } = render(<Login />);
  const labels = container.querySelectorAll('label');
  const textInputs = container.querySelectorAll('input[type="email"], input[type="password"]');
  const submit = screen.getByRole('button', { name: /ok/i });
  expect(labels.length).toBe(2);
  expect(textInputs.length).toBe(2);
  expect(submit).toBeInTheDocument();
});

test('focuses the input when its label is clicked', async () => {
  const { container } = render(<Login />);
  const user = userEvent.setup();
  const emailLabel = container.querySelector('label[for="email"]');
  const emailInput = screen.getByLabelText(/email/i);
  await user.click(emailLabel);
  expect(emailInput).toHaveFocus();
});

test('submit is disabled by default', () => {
  render(<Login />);
  const submit = screen.getByRole('button', { name: /ok/i });
  expect(submit).toBeDisabled();
});

test('submit enables only when email is valid and password has at least 8 chars', async () => {
  render(<Login />);
  const user = userEvent.setup();
  const email = screen.getByLabelText(/email/i);
  const password = screen.getByLabelText(/password/i);
  const submit = screen.getByRole('button', { name: /ok/i });
  await user.type(email, 'invalid');
  await user.type(password, '12345678');
  expect(submit).toBeDisabled();
  await user.clear(email);
  await user.clear(password);
  await user.type(email, 'user@example.com');
  await user.type(password, '1234567');
  expect(submit).toBeDisabled();
  await user.clear(password);
  await user.type(password, 'strongpass');
  expect(submit).toBeEnabled();
});
