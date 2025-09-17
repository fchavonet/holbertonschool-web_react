import React, { useState, useEffect, useMemo } from 'react';
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
import { newContext, defaultUser } from '../Context/context';

const LoginWithLogging = WithLogging(Login);
const CourseListWithLogging = WithLogging(CourseList);

const styles = StyleSheet.create({
  reset: {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
      scrollBehavior: 'smooth',
    },
    '*::before': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
    },
    '*::after': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
    },
  },
  app: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  body: {
    flex: 1,
    padding: '20px',
  },
  footer: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    fontSize: '0.8rem',
    fontWeight: 200,
    fontStyle: 'italic',
    borderTop: '0.25rem solid #e1003c',
  },
});

function App() {
  // State management
  const [displayDrawer, setDisplayDrawer] = useState(true);
  const [user, setUser] = useState({ ...defaultUser });
  const [notifications, setNotifications] = useState([]);
  const [courses, setCourses] = useState([]);

  const handleDisplayDrawer = React.useCallback(() => { setDisplayDrawer(true); }, []);
  const handleHideDrawer = React.useCallback(() => { setDisplayDrawer(false); }, []);

  // Memoized callback functions for reference stability
  const logOut = React.useCallback(() => {
    setUser({ ...defaultUser });
  }, []);

  const logIn = React.useCallback((email, password) => {
    const newUser = {
      email: email || '',
      password: password || '',
      isLoggedIn: true,
    };
    setUser(newUser);
  }, []);

  const markNotificationAsRead = React.useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`);
    setNotifications((prevNotifications) =>
      prevNotifications.filter(item => item.id !== id)
    );
  }, []);

  // Handle keyboard events (Ctrl+H for logout)
  const handleKeyDown = React.useCallback((event) => {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      logOut();
    }
  }, [logOut]);

  // Context value with memoization to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    user,
    logOut
  }), [user, logOut]);

  // Fetch notifications data on component mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:3000/notifications.json');

        const rawData = response.data.notifications || response.data;

        const notificationsData = rawData.map(notification => {
          if (notification.type === 'urgent' && !notification.value && !notification.html) {
            return {
              ...notification,
              html: { __html: getLatestNotification() }
            };
          }
          if (notification.id === 3) {
            return {
              ...notification,
              html: { __html: getLatestNotification() }
            };
          }
          return notification;
        });

        setNotifications(notificationsData);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);


  // Fetch courses data when user state changes
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/courses.json');

        // Gérer les deux structures possibles : response.data ou response.data.courses
        const coursesData = response.data.courses || response.data;

        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    // Only fetch courses when user authentication changes
    fetchCourses();
  }, [user.isLoggedIn]);

  // DOM setup and keyboard event listener
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof document === 'undefined' || !document.addEventListener) {
      return;
    }

    let styleElement = null;

    try {
      // Add keyboard event listener
      document.addEventListener('keydown', handleKeyDown);

      // Add CSS reset styles only if not already present
      if (!document.querySelector('#app-reset-styles')) {
        const resetCSS = `
          *,
          *::before,
          *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            scroll-behavior: smooth;
          }

          #root {
            height: 100vh;
            display: flex;
            flex-direction: column;
          }
        `;

        styleElement = document.createElement('style');
        styleElement.id = 'app-reset-styles';
        styleElement.textContent = resetCSS;
        document.head.appendChild(styleElement);
      }
    } catch (error) {
      console.warn('Could not set up DOM listeners:', error);
    }

    // Cleanup function
    return () => {
      try {
        if (document && document.removeEventListener) {
          document.removeEventListener('keydown', handleKeyDown);
        }

        if (styleElement && styleElement.parentNode) {
          styleElement.parentNode.removeChild(styleElement);
        }

        const existingStyle = document.querySelector('#app-reset-styles');
        if (existingStyle && existingStyle.parentNode) {
          existingStyle.parentNode.removeChild(existingStyle);
        }
      } catch (error) {
        // Ignore cleanup errors in tests
      }
    };
  }, [handleKeyDown]);

  return (
    <newContext.Provider value={contextValue}>
      <div className={css(styles.app)}>
        <Notifications
          notifications={notifications}
          displayDrawer={displayDrawer}
          handleDisplayDrawer={handleDisplayDrawer}
          handleHideDrawer={handleHideDrawer}
          markNotificationAsRead={markNotificationAsRead}
        />

        <Header />

        <div className={css(styles.body)}>
          {user.isLoggedIn ? (
            <BodySectionWithMarginBottom title="Course list">
              <CourseListWithLogging courses={courses} />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom title="Log in to continue">
              <LoginWithLogging
                logIn={logIn}
                email={user.email}
                password={user.password}
              />
            </BodySectionWithMarginBottom>
          )}

          <BodySection title="News from the School">
            <p>Holberton School News goes here</p>
          </BodySection>
        </div>

        <div className={css(styles.footer)}>
          <Footer />
        </div>
      </div>
    </newContext.Provider>
  );
}

export default App;
