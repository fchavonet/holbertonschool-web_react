import React from 'react';
import Header from './Header';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StyleSheetTestUtils } from 'aphrodite';

describe('Header component', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  test('renders img element', () => {
    render(<Header user={{ isLoggedIn: false }} logOut={() => { }} />);
    const imgElement = screen.getByAltText(/holberton logo/i);
    expect(imgElement).toBeInTheDocument();
  });

  test('renders h1 element with "School Dashboard" text', () => {
    render(<Header user={{ isLoggedIn: false }} logOut={() => { }} />);
    const headingElement = screen.getByRole('heading', { name: /school dashboard/i });
    expect(headingElement).toBeInTheDocument();
  });

  test('logout section is NOT rendered when user is not logged in', () => {
    render(<Header user={{ isLoggedIn: false }} logOut={() => { }} />);
    expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /logout/i })).not.toBeInTheDocument();
  });

  test('logout section IS rendered when user is logged in', () => {
    const logOutSpy = jest.fn();
    const user = { email: 'user@example.com', isLoggedIn: true };

    render(<Header user={user} logOut={logOutSpy} />);

    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/user@example.com/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /logout/i })).toBeInTheDocument();
  });

  test('clicking on the "logout" link calls the logOut function', async () => {
    const userUi = userEvent.setup();
    const logOutSpy = jest.fn();
    const user = { email: 'user@example.com', isLoggedIn: true };

    render(<Header user={user} logOut={logOutSpy} />);

    const logoutLink = screen.getByRole('link', { name: /logout/i });
    await userUi.click(logoutLink);
    expect(logOutSpy).toHaveBeenCalled();
  });
});
