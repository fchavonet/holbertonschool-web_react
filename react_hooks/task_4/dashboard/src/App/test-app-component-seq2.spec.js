import { act, render, fireEvent,screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import newContextDefault, * as newContextNamedExports from '../Context/context';
const newContext = newContextNamedExports.newContext || newContextDefault;
import App from './App';
import { StyleSheetTestUtils } from 'aphrodite';

beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('User State Tests', () => {
	test('user state management through login/logout cycle', async () => {
		const user = userEvent.setup();
		const mockLogOut = jest.fn();

		const { container } = render(
			<newContext.Provider value={{ user: { isLoggedIn: false }, logOut: mockLogOut }}>
				<App />
			</newContext.Provider>
		);

		expect(screen.getByRole('heading', { name: /log in to continue/i })).toBeInTheDocument();
		expect(screen.queryByText('Course list')).not.toBeInTheDocument();

		const emailInput = screen.getByLabelText(/email/i);
		const passwordInput = screen.getByLabelText(/password/i);
		const loginButton = screen.getByRole('button', { name: /ok/i });

		await user.type(emailInput, 'test@example.com');
		await user.type(passwordInput, 'password123');
		await user.click(loginButton);

		expect(screen.getByText(/course list/i)).toBeInTheDocument();
		expect(screen.queryByText(/log in to continue/i)).not.toBeInTheDocument();
		expect(screen.getByText(/Welcome/)).toBeInTheDocument();

		const logoutSection = container.querySelector('div#logoutSection');
		const logoutButton = within(logoutSection).getByText(/logout/i);

		await act(async () => {
			fireEvent.click(logoutButton);
		});

		await waitFor(() => {
			expect(screen.getByRole('heading', { name: /log in to continue/i })).toBeInTheDocument();
			expect(screen.queryByText(/course list/i)).not.toBeInTheDocument();
			expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument();
		});
	});
});
