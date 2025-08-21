import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StyleSheetTestUtils } from 'aphrodite';
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

let consoleSpy;

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
  consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  consoleSpy.mockRestore();
  cleanup();
});

test('Renders 3 notification items with appropriate text', () => {
  const { getByText, container } = render(
    <Notifications
      displayDrawer={true}
      notifications={mockNotifications}
    />
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

test('Always displays "Your notifications" title', () => {
  const { getByText } = render(<Notifications />);

  expect(getByText('Your notifications')).toBeInTheDocument();
});

test('Does not display drawer elements when displayDrawer is false', () => {
  const { queryByText, queryByRole, container, getByText } = render(
    <Notifications displayDrawer={false} notifications={mockNotifications} />
  );

  expect(getByText('Your notifications')).toBeInTheDocument();
  expect(queryByText('Here is the list of notifications')).not.toBeInTheDocument();
  expect(container.querySelectorAll('li')).toHaveLength(0);
  expect(queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
});

test('Displays list, paragraph and close button when displayDrawer is true', () => {
  const { getByText, getByRole, container } = render(
    <Notifications displayDrawer={true} notifications={mockNotifications} />
  );

  expect(getByText('Your notifications')).toBeInTheDocument();
  expect(getByText('Here is the list of notifications')).toBeInTheDocument();
  expect(container.querySelectorAll('li')).toHaveLength(3);
  expect(getByRole('button', { name: /close/i })).toBeInTheDocument();
});

test('Displays "No new notification for now" when displayDrawer is true and no notifications', () => {
  const { getByText, getByRole, queryAllByRole } = render(
    <Notifications displayDrawer={true} notifications={[]} />
  );

  expect(getByText('Your notifications')).toBeInTheDocument();
  expect(getByText('No new notification for now')).toBeInTheDocument();
  expect(queryAllByRole('listitem')).toHaveLength(0);
  expect(getByRole('button', { name: /close/i })).toBeInTheDocument();
});

test('Logs correct message when clicking on first notification item', () => {
  const { getByText } = render(
    <Notifications
      displayDrawer={true}
      notifications={mockNotifications}
    />
  );

  const firstNotification = getByText('New course available');
  fireEvent.click(firstNotification);

  expect(consoleSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');
});

test('Logs correct message when clicking on second notification item', () => {
  const { getByText } = render(
    <Notifications
      displayDrawer={true}
      notifications={mockNotifications}
    />
  );

  const secondNotification = getByText('New resume available');
  fireEvent.click(secondNotification);

  expect(consoleSpy).toHaveBeenCalledWith('Notification 2 has been marked as read');
});

test('Logs correct message when clicking on third notification item', () => {
  const { container } = render(
    <Notifications
      displayDrawer={true}
      notifications={mockNotifications}
    />
  );

  const notificationItems = container.querySelectorAll('li');
  const thirdNotification = notificationItems[2];
  fireEvent.click(thirdNotification);

  expect(consoleSpy).toHaveBeenCalledWith('Notification 3 has been marked as read');
});

test('Calls handleDisplayDrawer when clicking on the menu item', () => {
  const handleDisplayDrawer = jest.fn();
  const { getByText } = render(
    <Notifications
      displayDrawer={false}
      notifications={mockNotifications}
      handleDisplayDrawer={handleDisplayDrawer}
    />
  );
  const menuItem = getByText('Your notifications');
  fireEvent.click(menuItem);
  expect(handleDisplayDrawer).toHaveBeenCalledTimes(1);
});

test('Calls handleHideDrawer when clicking on the close button', () => {
  const handleHideDrawer = jest.fn();
  const { getByRole } = render(
    <Notifications
      displayDrawer={true}
      notifications={mockNotifications}
      handleHideDrawer={handleHideDrawer}
    />
  );
  const closeBtn = getByRole('button', { name: /close/i });
  fireEvent.click(closeBtn);
  expect(handleHideDrawer).toHaveBeenCalledTimes(1);
});
