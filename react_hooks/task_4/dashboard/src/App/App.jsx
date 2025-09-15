import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, css } from 'aphrodite';
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

const notificationsList = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
];

const coursesList = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

function App() {
  // Individual hooks for state management
  const [displayDrawer, setDisplayDrawer] = useState(true);
  const [user, setUser] = useState({ ...defaultUser });
  const [notifications, setNotifications] = useState(notificationsList);

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

  // 🔥 VERSION CORRIGÉE DU useEffect
  useEffect(() => {
    // Vérifier qu'on est dans un navigateur, pas dans les tests
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
      // Ignore les erreurs dans les tests
      console.warn('Could not set up DOM listeners:', error);
    }

    // 🔥 CLEANUP RENFORCÉ
    return () => {
      try {
        if (document && document.removeEventListener) {
          document.removeEventListener('keydown', handleKeyDown);
        }
        
        if (styleElement && styleElement.parentNode) {
          styleElement.parentNode.removeChild(styleElement);
        }
        
        // Nettoyer aussi par ID au cas où
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
              <CourseListWithLogging courses={coursesList} />
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
