// External libraries.
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { StyleSheetTestUtils } from 'aphrodite';

// Reducers.
import authReducer from '../../features/auth/authSlice';
import coursesReducer from '../../features/courses/coursesSlice';
import notificationsReducer from '../../features/notifications/notificationsSlice';

// Components.
import Footer from './Footer';

// Create test store
const testStore = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    notifications: notificationsReducer,
  },
});

// Suppress Aphrodite style injection before tests.
beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

// Clear and resume style injection after tests.
afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

/******************
* COMPONENT TESTS *
******************/

test('Renders correct copyright text', () => {
  render(
    <Provider store={testStore}>
      <Footer />
    </Provider>
  );

  const currentYear = new Date().getFullYear();
  const footerParagraph = screen.getByText(new RegExp(`copyright ${currentYear}.*holberton school`, 'i'));

  expect(footerParagraph).toBeInTheDocument();
});
