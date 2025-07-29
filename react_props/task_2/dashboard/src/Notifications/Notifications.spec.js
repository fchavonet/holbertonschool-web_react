import { render } from '@testing-library/react';
import Notifications from './Notifications';
import { getLatestNotification } from "../utils/utils";

const mockNotifications = [
    {
        id: 1,
        type: "default",
        value: "New course available"
    },
    {
        id: 2,
        type: "urgent",
        value: "New resume available"
    },
    {
        id: 3,
        type: "urgent",
        value: getLatestNotification()
    }
];

test('Renders 3 notification items with appropriate text', () => {
    const { getByText, container } = render(
        <Notifications notifications={mockNotifications} />
    );

    expect(getByText('New course available')).toBeInTheDocument();
    expect(getByText('New resume available')).toBeInTheDocument();

    const notificationItems = container.querySelectorAll('li');
    expect(notificationItems).toHaveLength(3);
});

test('Renders with empty notifications array by default', () => {
    const { container } = render(<Notifications />);

    const notificationItems = container.querySelectorAll('li');
    expect(notificationItems).toHaveLength(0);
});