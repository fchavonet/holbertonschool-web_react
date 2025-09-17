import React, { useReducer, useEffect, useCallback } from 'react';
import { StyleSheet, css } from 'aphrodite';
import axios from 'axios';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import WithLogging from '../HOC/WithLogging';
import { getLatestNotification } from '../utils/utils';
import { APP_ACTIONS, appReducer, initialState } from './appReducer';

const LoginWithLogging = WithLogging(Login);
const CourseListWithLogging = WithLogging(CourseList);

const styles = StyleSheet.create({
  app: { minHeight: '100vh', display: 'flex', flexDirection: 'column' },
  body: { flex: 1, padding: '20px' },
  footer: { padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '0.8rem', fontWeight: 200, fontStyle: 'italic', borderTop: '0.25rem solid #e1003c' },
});

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const handleDisplayDrawer = useCallback(() => dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER }), []);
  const handleHideDrawer = useCallback(() => dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER }), []);

  const logIn = useCallback((email, password) => {
    dispatch({ type: APP_ACTIONS.LOGIN, payload: { email, password } });
  }, []);

  const logOut = useCallback(() => {
    dispatch({ type: APP_ACTIONS.LOGOUT });
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    dispatch({ type: APP_ACTIONS.MARK_NOTIFICATION_READ, payload: id });
  }, []);

  const handleKeyDown = useCallback((event) => {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      logOut();
    }
  }, [logOut]);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get('http://localhost:3000/notifications.json');
        const notificationsData = (res.data.notifications || res.data).map((notif) => {
          if ((!notif.value && !notif.html) || notif.id === 3) {
            return { ...notif, html: { __html: getLatestNotification() } };
          }
          return notif;
        });
        dispatch({ type: APP_ACTIONS.SET_NOTIFICATIONS, payload: notificationsData });
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    };
    fetchNotifications();
  }, []);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:3000/courses.json');
        const coursesData = res.data.courses || res.data;
        dispatch({ type: APP_ACTIONS.SET_COURSES, payload: coursesData });
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };
    if (state.user.isLoggedIn) fetchCourses();
  }, [state.user.isLoggedIn]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className={css(styles.app)}>
      <Notifications
        notifications={state.notifications}
        displayDrawer={state.displayDrawer}
        handleDisplayDrawer={handleDisplayDrawer}
        handleHideDrawer={handleHideDrawer}
        markNotificationAsRead={markNotificationAsRead}
      />

      <Header user={state.user} logOut={logOut} />

      <div className={css(styles.body)}>
        {state.user.isLoggedIn ? (
          <BodySectionWithMarginBottom title="Course list">
            <CourseListWithLogging courses={state.courses} />
          </BodySectionWithMarginBottom>
        ) : (
          <BodySectionWithMarginBottom title="Log in to continue">
            <LoginWithLogging logIn={logIn} email={state.user.email} password={state.user.password} />
          </BodySectionWithMarginBottom>
        )}

        <BodySection title="News from the School">
          <p>Holberton School News goes here</p>
        </BodySection>
      </div>

      <div className={css(styles.footer)}>
        <Footer user={state.user} logOut={logOut} />
      </div>
    </div>
  );
}

export default App;
