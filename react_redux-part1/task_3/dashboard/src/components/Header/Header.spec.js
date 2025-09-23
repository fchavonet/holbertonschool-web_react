// External libraries.
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// Styles.
import { StyleSheetTestUtils } from 'aphrodite';

// Components.
import Header from './Header';

// Redux reducers
import authReducer from '../../features/auth/authSlice';

// Helper function to create test store
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        isLoggedIn: false,
        user: { email: '', password: '' },
        ...initialState.auth
      }
    }
  });
};

// Helper function to render with Redux Provider
const renderWithRedux = (component, initialState = {}) => {
  const store = createTestStore(initialState);
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

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
    renderWithRedux(<Header />);

    const imgElement = screen.getByAltText(/holberton logo/i);
    expect(imgElement).toBeInTheDocument();
  });

  test('Renders main heading with "School Dashboard" text', () => {
    renderWithRedux(<Header />);

    const headingElement = screen.getByRole('heading', { name: /school dashboard/i });
    expect(headingElement).toBeInTheDocument();
  });

  test('Logout section is hidden when user is not logged in', () => {
    renderWithRedux(<Header />, {
      auth: {
        isLoggedIn: false,
        user: { email: '', password: '' }
      }
    });

    expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /logout/i })).not.toBeInTheDocument();
  });

  test('Logout section is displayed when user is logged in', () => {
    renderWithRedux(<Header />, {
      auth: {
        isLoggedIn: true,
        user: { email: 'user@example.com', password: 'password' }
      }
    });

    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/user@example.com/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /logout/i })).toBeInTheDocument();
  });

  test('Clicking logout link triggers logout action', async () => {
    const userUi = userEvent.setup();
    
    const store = createTestStore({
      auth: {
        isLoggedIn: true,
        user: { email: 'user@example.com', password: 'password' }
      }
    });

    // Spy on store dispatch to verify logout action is called
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const logoutLink = screen.getByRole('link', { name: /logout/i });
    await userUi.click(logoutLink);

    // Verify that dispatch was called (logout action)
    expect(dispatchSpy).toHaveBeenCalled();
    
    // Verify that the state changed (user is logged out)
    const state = store.getState();
    expect(state.auth.isLoggedIn).toBe(false);

    dispatchSpy.mockRestore();
  });
});
