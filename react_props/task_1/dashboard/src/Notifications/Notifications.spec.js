import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from '../Notifications/Notifications';

test('Renders the notifications title', () => {
    render(<Notifications />);

    const titleElement = screen.getByText(/here is the list of notifications/i);

    expect(titleElement).toBeInTheDocument();
});

test('Renders the close button', () => {
    render(<Notifications />);

    const closeButton = screen.getByRole('button', { name: /close/i });

    expect(closeButton).toBeInTheDocument();
});

test('Renders three list items', () => {
    render(<Notifications />);

    const listItems = screen.getAllByRole('listitem');

    expect(listItems).toHaveLength(3);
});

test('Logs message when close button is clicked', () => {
    const consoleLog = jest.spyOn(console, 'log').mockImplementation();

    render(<Notifications />);

    const closeButton = screen.getByRole('button', { name: /close/i });

    fireEvent.click(closeButton);

    expect(consoleLog).toHaveBeenCalledWith('close button has been clicked');

    consoleLog.mockRestore();

});