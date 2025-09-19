// External libraries.
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

// Styles.
import { StyleSheetTestUtils } from 'aphrodite';

// Components.
import App from './App.jsx';

// Mocks axios.
jest.mock('axios');

// Mock data.
const mockNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: 'Urgent requirement - complete by EOD' } },
];

const mockCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

// Suppress Aphrodite style injection before tests.
beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

// Clear and resume style injection after tests.
afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

// Reset mocks before each test.
beforeEach(() => {
  jest.clearAllMocks();
  axios.get.mockImplementation((url) => {
    if (url.includes('notifications')) return Promise.resolve({ data: mockNotifications });
    if (url.includes('courses')) return Promise.resolve({ data: mockCourses });
    return Promise.resolve({ data: [] });
  });
});

/******************
* COMPONENT TESTS *
******************/

describe('App Component Tests', () => {
  test('Renders all main components', async () => {
    render(<App />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/notifications.json');
    });

    expect(screen.getByText(/school dashboard/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /log in to continue/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /news from the school/i })).toBeInTheDocument();
    expect(screen.getByText(/holberton school news goes here/i)).toBeInTheDocument();
    expect(screen.getByText(/copyright/i)).toBeInTheDocument();
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });

  test('Login displays course list and hides login form', async () => {
    render(<App />);
    const user = userEvent.setup();

    await waitFor(() => expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/notifications.json'));

    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/password/i), 'strongpass');
    await user.click(screen.getByRole('button', { name: /ok/i }));

    await waitFor(() => expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/courses.json'));
    await waitFor(() => screen.getByRole('heading', { name: /course list/i }));

    expect(screen.queryByRole('heading', { name: /log in to continue/i })).not.toBeInTheDocument();
  });

  test('Logout works correctly', async () => {
    render(<App />);
    const user = userEvent.setup();

    await waitFor(() => expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/notifications.json'));

    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/password/i), 'strongpass');
    await user.click(screen.getByRole('button', { name: /ok/i }));

    await waitFor(() => screen.getByText('logout'));
    await user.click(screen.getByText('logout'));

    await waitFor(() => screen.getByRole('heading', { name: /log in to continue/i }));
  });

  test('Notifications are loaded from API', async () => {
    render(<App />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/notifications.json'));
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });

  test('Displays notifications when available', async () => {
    axios.get.mockImplementation((url) => {
      if (url.includes('notifications')) {
        return Promise.resolve({
          data: {
            notifications: [
              { id: 1, type: 'default', value: 'New course available' },
              { id: 2, type: 'urgent', value: 'New resume available' },
            ],
          },
        });
      }
      return Promise.resolve({ data: [] });
    });

    render(<App />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/notifications.json'));

    await act(async () => new Promise((resolve) => setTimeout(resolve, 100)));

    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });
});

/***********************
* KEYBOARD EVENT TESTS *
***********************/

describe('Keyboard events', () => {
  test('Ctrl+H logs out user', async () => {
    render(<App />);
    const user = userEvent.setup();
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => { });

    await waitFor(() => expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/notifications.json'));

    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/password/i), 'strongpass');
    await user.click(screen.getByRole('button', { name: /ok/i }));

    await waitFor(() => screen.getByRole('heading', { name: /course list/i }));

    await act(async () => {
      const event = new KeyboardEvent('keydown', { key: 'h', ctrlKey: true });
      document.dispatchEvent(event);
    });

    await waitFor(() => expect(alertMock).toHaveBeenCalledWith('Logging you out'));
    await waitFor(() => screen.getByRole('heading', { name: /log in to continue/i }));

    alertMock.mockRestore();
  });
});
