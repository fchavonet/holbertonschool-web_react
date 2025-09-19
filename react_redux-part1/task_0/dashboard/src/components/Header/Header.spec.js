// External libraries.
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Styles.
import { StyleSheetTestUtils } from 'aphrodite';

// Components.
import Header from './Header';

// Suppress Aphrodite style injection before tests.
beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

// Clear and resume style injection after tests.
afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

/******************
* COMPONENT TESTS *
******************/

describe('Header Component Tests', () => {
  test('Renders logo image', () => {
    render(<Header user={{ isLoggedIn: false }} logOut={() => { }} />);
    
    const imgElement = screen.getByAltText(/holberton logo/i);
    expect(imgElement).toBeInTheDocument();
  });

  test('Renders main heading with "School Dashboard" text', () => {
    render(<Header user={{ isLoggedIn: false }} logOut={() => { }} />);
    
    const headingElement = screen.getByRole('heading', { name: /school dashboard/i });
    expect(headingElement).toBeInTheDocument();
  });

  test('Logout section is hidden when user is not logged in', () => {
    render(<Header user={{ isLoggedIn: false }} logOut={() => { }} />);
    
    expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /logout/i })).not.toBeInTheDocument();
  });

  test('Logout section is displayed when user is logged in', () => {
    const logOutSpy = jest.fn();
    const user = { email: 'user@example.com', isLoggedIn: true };

    render(<Header user={user} logOut={logOutSpy} />);

    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/user@example.com/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /logout/i })).toBeInTheDocument();
  });

  test('Clicking logout link triggers logOut function', async () => {
    const userUi = userEvent.setup();
    const logOutSpy = jest.fn();
    const user = { email: 'user@example.com', isLoggedIn: true };

    render(<Header user={user} logOut={logOutSpy} />);

    const logoutLink = screen.getByRole('link', { name: /logout/i });
    await userUi.click(logoutLink);
    
    expect(logOutSpy).toHaveBeenCalled();
  });
});
