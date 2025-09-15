import React from 'react';
import App from './App.jsx';
import { render, screen, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StyleSheetTestUtils } from 'aphrodite';

describe('App Component Tests', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  test('Renders Notifications component', () => {
    render(<App />);
    const notificationTitle = screen.getByText(/your notifications/i);
    expect(notificationTitle).toBeInTheDocument();
  });

  test('Renders Header component', () => {
    render(<App />);
    const header = screen.getByText(/school dashboard/i);
    expect(header).toBeInTheDocument();
  });

  test('Renders Login component by default (not logged in)', () => {
    render(<App />);
    const loginTitle = screen.getByRole('heading', { name: /log in to continue/i });
    expect(loginTitle).toBeInTheDocument();

    const courseListTitle = screen.queryByRole('heading', { name: /course list/i });
    expect(courseListTitle).not.toBeInTheDocument();
  });

  test('Renders Footer component', () => {
    render(<App />);
    const footer = screen.getByText(/copyright/i);
    expect(footer).toBeInTheDocument();
  });

  test('Displays News from the School section by default', () => {
    render(<App />);
    const newsTitle = screen.getByRole('heading', { name: /news from the school/i });
    expect(newsTitle).toBeInTheDocument();

    const newsParagraph = screen.getByText(/holberton school news goes here/i);
    expect(newsParagraph).toBeInTheDocument();
  });

  test('After a successful login, Course list is displayed and Login disappears', async () => {
    render(<App />);
    const user = userEvent.setup();

    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);
    const submit = screen.getByRole('button', { name: /ok/i });

    await user.type(email, 'user@example.com');
    await user.type(password, 'strongpass');
    await user.click(submit);

    const courseListTitle = screen.getByRole('heading', { name: /course list/i });
    expect(courseListTitle).toBeInTheDocument();

    const loginTitle = screen.queryByRole('heading', { name: /log in to continue/i });
    expect(loginTitle).not.toBeInTheDocument();
  });

  test('After login, the Header shows logoutSection with user email', async () => {
    render(<App />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/password/i), 'strongpass');
    await user.click(screen.getByRole('button', { name: /ok/i }));

    const logoutSection = screen.getByRole('banner');
    const logoutLink = within(logoutSection).getByText('(logout)');
    expect(logoutLink).toBeInTheDocument();
    expect(within(logoutSection).getByText(/welcome/i)).toBeInTheDocument();
    expect(within(logoutSection).getByText(/user@example.com/i)).toBeInTheDocument();
  });

  test('Clicking on Header logout link logs the user out and UI returns to Login', async () => {
    render(<App />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/password/i), 'strongpass');
    await user.click(screen.getByRole('button', { name: /ok/i }));

    const logoutLink = await screen.findByText('(logout)');  // ← CHANGEMENT ICI

    await act(async () => {
      await user.click(logoutLink);
    });

    const loginTitle = await screen.findByRole('heading', { name: /log in to continue/i });
    expect(loginTitle).toBeInTheDocument();
  });

  // -------- Nouveaux tests demandés --------
  test('Clicking on a notification item removes it from the list', async () => {
    render(<App />);
    const user = userEvent.setup();

    const menuItem = screen.getByText(/your notifications/i);
    await user.click(menuItem);

    const drawer = screen.getByText(/here is the list of notifications/i).closest('div');
    const listBefore = within(drawer).getAllByRole('listitem');
    expect(listBefore.length).toBeGreaterThan(0);

    const firstItem = screen.getByText('New course available');

    await act(async () => {
      await user.click(firstItem);
    });

    const removed = screen.queryByText('New course available');
    expect(removed).not.toBeInTheDocument();
  });

  test('Clicking on a notification logs the expected message with the ID', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    render(<App />);
    const user = userEvent.setup();

    const menuItem = screen.getByText(/your notifications/i);
    await user.click(menuItem);

    const secondItem = screen.getByText('New resume available');

    await act(async () => {
      await user.click(secondItem);
    });

    expect(consoleSpy).toHaveBeenCalledWith('Notification 2 has been marked as read');

    consoleSpy.mockRestore();
  });
});

describe('App Keyboard Events Tests', () => {
  let alertMock;

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    alertMock = jest.spyOn(window, 'alert').mockImplementation(() => { });
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    alertMock.mockRestore();
  });

  test('Alert when ctrl + h and user is logged in, and returns to Login view', async () => {
    render(<App />);
    const user = userEvent.setup();

    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);
    const submit = screen.getByRole('button', { name: /ok/i });

    await user.type(email, 'user@example.com');
    await user.type(password, 'strongpass');
    await user.click(submit);

    const courseListTitle = await screen.findByRole('heading', { name: /course list/i });
    expect(courseListTitle).toBeInTheDocument();

    await act(async () => {
      const keyboardEvent = new KeyboardEvent('keydown', { key: 'h', ctrlKey: true });
      document.dispatchEvent(keyboardEvent);
    });

    expect(alertMock).toHaveBeenCalledWith('Logging you out');

    const loginTitle = await screen.findByRole('heading', { name: /log in to continue/i });
    expect(loginTitle).toBeInTheDocument();
  });
});
