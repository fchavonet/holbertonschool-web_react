import Login from './Login';
import { render, screen } from '@testing-library/react';

test('Render 2 input elements', () => {
    render(<Login />)

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByLabelText(/Password/i);

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

test('Render a button with the text "OK"', () => {
    render(<Login />);

    const button = screen.getByRole('button', { name: /ok/i });

    expect(button).toBeInTheDocument();
});