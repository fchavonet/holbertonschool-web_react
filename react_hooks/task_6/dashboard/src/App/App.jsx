// External libraries.
import React, { useReducer, useEffect, useCallback } from 'react';
import axios from 'axios';
import { StyleSheet, css } from 'aphrodite';

// Utilities.
import { getLatestNotification } from '../utils/utils';

// Reducer / State.
import { APP_ACTIONS, appReducer, initialState } from './appReducer';

// Components.
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import CourseList from '../CourseList/CourseList';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
import WithLogging from '../HOC/WithLogging';

// HOCs with logging.
const LoginWithLoggingHOC = WithLogging(Login);
const CourseListWithLoggingHOC = WithLogging(CourseList);

// Styles.
const styles = StyleSheet.create({
  appContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  mainBody: {
    flex: 1,
    padding: '1rem'
  },
  footerContainer: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.8rem',
    fontWeight: 200,
    fontStyle: 'italic',
    borderTop: '0.25rem solid #e1003c'
  },
});

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Notifications drawer.
  const toggleNotificationsDrawer = useCallback(() => dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER }), []);

  // User authentication.
  const handleLogin = useCallback((email, password) => {
    dispatch({ type: APP_ACTIONS.LOGIN, payload: { email, password } });
  }, []);

  const handleLogout = useCallback(() => dispatch({ type: APP_ACTIONS.LOGOUT }), []);

  // Notifications.
  const markNotificationReadById = useCallback((id) => {
    dispatch({ type: APP_ACTIONS.MARK_NOTIFICATION_READ, payload: id });
  }, []);

  // Keyboard shortcut (Ctrl + h).
  const handleCtrlHKey = useCallback((event) => {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      handleLogout();
    }
  }, [handleLogout]);

  // Fetch notifications.
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get('http://localhost:3000/notifications.json');
        const notificationsList = (res.data.notifications || res.data).map((notif) => {
          if ((!notif.value && !notif.html) || notif.id === 3) {
            return { ...notif, html: { __html: getLatestNotification() } };
          }

          return notif;
        });
        dispatch({ type: APP_ACTIONS.SET_NOTIFICATIONS, payload: notificationsList });
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    };

    fetchNotifications();
  }, []);

  // Fetch courses if logged in.
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:3000/courses.json');
        const coursesList = res.data.courses || res.data;

        dispatch({ type: APP_ACTIONS.SET_COURSES, payload: coursesList });
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };

    if (state.user.isLoggedIn) fetchCourses();
  }, [state.user.isLoggedIn]);

  // Keyboard event listener.
  useEffect(() => {
    document.addEventListener('keydown', handleCtrlHKey);

    return () => document.removeEventListener('keydown', handleCtrlHKey);
  }, [handleCtrlHKey]);

  return (
    <div className={css(styles.appContainer)}>
      <Notifications
        notifications={state.notifications}
        displayDrawer={state.displayDrawer}
        handleDisplayDrawer={toggleNotificationsDrawer}
        handleHideDrawer={toggleNotificationsDrawer}
        markNotificationAsRead={markNotificationReadById}
      />

      <Header user={state.user} logOut={handleLogout} />

      <div className={css(styles.mainBody)}>
        {state.user.isLoggedIn ? (
          <BodySectionWithMarginBottom title="Course list">
            <CourseListWithLoggingHOC courses={state.courses} />
          </BodySectionWithMarginBottom>
        ) : (
          <BodySectionWithMarginBottom title="Log in to continue">
            <LoginWithLoggingHOC logIn={handleLogin} email={state.user.email} password={state.user.password} />
          </BodySectionWithMarginBottom>
        )}

        <BodySection title="News from the School">
          <p>Holberton School News goes here</p>
        </BodySection>
      </div>

      <div className={css(styles.footerContainer)}>
        <Footer user={state.user} logOut={handleLogout} />
      </div>
    </div>
  );
}

export default App;
