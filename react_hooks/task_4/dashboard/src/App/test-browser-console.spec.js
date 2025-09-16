// Catch browser warns and errors
const originalError = console.error;
const originalWarn = console.warn;

let consoleOutput = [];

console.error = (...args) => {
  consoleOutput.push(['error', args[0]]);
};

console.warn = (...args) => {
  consoleOutput.push(['warn', args[0]]);
};

beforeEach(() => {
  consoleOutput = [];
});

afterEach(() => {
  jest.clearAllMocks();
  
  if (consoleOutput.length > 0) {
    throw new Error(
      'Test failed: Console warnings or errors detected:\n' +
      consoleOutput.map(([type, message]) => `${type}: ${message}`).join('\n')
    );
  }
});

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockAxios from 'jest-mock-axios';
import App from "./App";
import newContextDefault, * as newContextNamedExports from '../Context/context';
const newContext = newContextNamedExports.newContext || newContextDefault;
import { StyleSheetTestUtils } from 'aphrodite';

beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

jest.mock('axios', () => require('jest-mock-axios').default);

describe('App component when user is logged in', () => {
	const mockCoursesResponse = {
		data: {
			"courses": [
				{ "id": 1, "name": "ES6", "credit": 60 },
				{ "id": 2, "name": "Webpack", "credit": 20 },
				{ "id": 3, "name": "React", "credit": 40 }
			]
		}
	};

	const mockEmptyNotificationsResponse = {
		data: {
			notifications: []
		}
	};

	// clean up state after each test
	afterEach(() => {
		mockAxios.reset();
	});

	const renderAppWithContext = (initialContextValue = {}) => {
    const defaultContext = {
      user: {
        email: '',
        password: '',
        isLoggedIn: false
      },
      logOut: jest.fn()
    };

    return render(
      <newContext.Provider value={{ ...defaultContext, ...initialContextValue }}>
        <App />
      </newContext.Provider>
    );
  };

	test('The App component should fetch courses data successfully whenever user is logged in', async () => {
		const user = userEvent.setup();

		mockAxios.get.mockImplementation((url) => {
			if (url.includes('notifications')) {
				return Promise.resolve(mockEmptyNotificationsResponse);
			}
			if (url.includes('courses')) {
				return Promise.resolve(mockCoursesResponse);
			}
		});

		renderAppWithContext()

		const emailInput = screen.getByLabelText(/email/i);
		const passwordInput = screen.getByLabelText(/password/i);
		const submitButton = screen.getByRole('button', { name: /ok/i });

		// Login process
		await user.type(emailInput, 'test@example.com');
		await user.type(passwordInput, 'password123');
		await user.click(submitButton);

		// Wait for courses to load
		await waitFor(() => {
			expect(screen.getByText('ES6')).toBeInTheDocument();
			expect(screen.getByText('Webpack')).toBeInTheDocument();
			expect(screen.getByText('React')).toBeInTheDocument();
		}, { timeout: 3000 });

		expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:5173/courses.json');
    expect(mockAxios.get).toHaveBeenLastCalledWith('http://localhost:5173/courses.json')
	});
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});