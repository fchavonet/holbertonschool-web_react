import React from 'react';
import App from './App.jsx';
import { render, screen } from '@testing-library/react';
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

  test('Should render the Login component', () => {
    render(<App isLoggedIn={false} />);

    const loginText = screen.getByText(/login to access the full dashboard/i);
    expect(loginText).toBeInTheDocument();

    const courseList = screen.queryByText(/available courses/i);
    expect(courseList).not.toBeInTheDocument();
  });

  test('Should render a CourseList component', () => {
    render(<App isLoggedIn={true} />);

    const courseList = screen.getByText(/available courses/i);
    expect(courseList).toBeInTheDocument();

    const loginText = screen.queryByText(/login to access the full dashboard/i);
    expect(loginText).not.toBeInTheDocument();
  });

  test('Displays Course list title when isLoggedIn is true', () => {
    render(<App isLoggedIn={true} />);

    const courseListTitle = screen.getByRole('heading', { name: /course list/i });
    expect(courseListTitle).toBeInTheDocument();
  });

  test('Displays Log in to continue title when isLoggedIn is false', () => {
    render(<App isLoggedIn={false} />);

    const loginTitle = screen.getByRole('heading', { name: /log in to continue/i });
    expect(loginTitle).toBeInTheDocument();
  });

  test('Displays News from the School section by default', () => {
    render(<App />);

    const newsTitle = screen.getByRole('heading', { name: /news from the school/i });
    expect(newsTitle).toBeInTheDocument();

    const newsParagraph = screen.getByText(/holberton school news goes here/i);
    expect(newsParagraph).toBeInTheDocument();
  });
});

describe('App Keyboard Events Tests', () => {
  let alertMock;
  let logOutMock;

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    alertMock = jest.spyOn(window, "alert").mockImplementation(() => { });
    logOutMock = jest.fn();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    alertMock.mockRestore();
  });

  test("LogOut when ctrl + h", () => {
    render(<App logOut={logOutMock} />);

    const keyboardEvent = new KeyboardEvent("keydown", {
      key: "h",
      ctrlKey: true,
    });
    document.dispatchEvent(keyboardEvent);
    expect(logOutMock).toHaveBeenCalledTimes(1);
  });

  test("Alert when ctrl + h", () => {
    render(<App logOut={logOutMock} />);

    const keyboardEvent = new KeyboardEvent("keydown", {
      key: "h",
      ctrlKey: true,
    });
    document.dispatchEvent(keyboardEvent);

    expect(alertMock).toHaveBeenCalledWith("Logging you out");
  });
});
