import App from './App.jsx'
import { render, screen } from '@testing-library/react';

test('Renders Notifications component', () => {
    render(<App />);

    const notification = screen.getByText(/notifications/i);

    expect(notification).toBeInTheDocument();
});

test('Renders Header component', () => {
    render(<App />);

    const header = screen.getByText(/school dashboard/i);

    expect(header).toBeInTheDocument();
});

test('Renders Login component', () => {
    render(<App />);

    const loginText = screen.getByText(/login to access the full dashboard/i);

    expect(loginText).toBeInTheDocument();
});

test('Renders Footer component', () => {
    render(<App />);

    const footer = screen.getByText(/copyright/i);
    
    expect(footer).toBeInTheDocument();
});







