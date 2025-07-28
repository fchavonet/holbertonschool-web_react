import Login from './Login';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('Render 2 input elements', () => {
    render(<Login />)

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
});

test('Render 2 label elements with the text "Email:" and "Password:"', () => {
    render(<Login />);

    const emailLabel = screen.getByText(/email:/i);
    const passwordLabel = screen.getByText(/password:/i);

    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
});

test('focuses the input when the corresponding label is clicked', async () => {
    render(<Login />);
    const user = userEvent.setup();
    const emailLabel = screen.getByText(/email:/i);
    const emailInput = screen.getByLabelText(/email/i);

    await user.click(emailLabel);
    expect(emailInput).toHaveFocus();
});

test('Render a button with the text "OK"', () => {
    render(<Login />);

    const button = screen.getByRole('button', { name: /ok/i });

    expect(button).toBeInTheDocument();
});