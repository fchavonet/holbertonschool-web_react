import React, { Component } from 'react';
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

class App extends Component {
  constructor(props) {
    super(props);

    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.handleDisplayDrawer = this.handleDisplayDrawer.bind(this);
    this.handleHideDrawer = this.handleHideDrawer.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this);

    this.state = {
      user: { ...defaultUser },
      logOut: this.logOut,
      contextValue: {
        user: { ...defaultUser },
        logOut: this.logOut,
      },

      notifications: notificationsList,
      courses: coursesList,

      displayDrawer: true,
    };
  }

  logIn(email, password) {
    const user = {
      email: email || '',
      password: password || '',
      isLoggedIn: true,
    };
    
    // Utiliser un callback pour éviter les problèmes de timing
    this.setState((prevState) => ({
      user,
      contextValue: {
        user,
        logOut: this.logOut,
      },
    }));
  }

  logOut() {
    const user = { ...defaultUser };
    
    // Utiliser un callback pour éviter les problèmes de timing
    this.setState((prevState) => ({
      user,
      contextValue: {
        user,
        logOut: this.logOut,
      },
    }));
  }

  handleDisplayDrawer() {
    this.setState({ displayDrawer: true });
  }

  handleHideDrawer() {
    this.setState({ displayDrawer: false });
  }

  handleKeyDown(event) {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      this.logOut();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);

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

    const style = document.createElement('style');
    style.textContent = resetCSS;
    document.head.appendChild(style);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  markNotificationAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);

    this.setState((prevState) => {
      const filtered = prevState.notifications.filter(item => item.id !== id);
      return { notifications: filtered };
    });
  }

  render() {
    const { user, contextValue } = this.state;

    return (
      <newContext.Provider value={contextValue}>
        <div className={css(styles.app)}>
          <Notifications
            notifications={this.state.notifications}
            displayDrawer={this.state.displayDrawer}
            handleDisplayDrawer={this.handleDisplayDrawer}
            handleHideDrawer={this.handleHideDrawer}
            markNotificationAsRead={this.markNotificationAsRead}
          />

          <Header />

          <div className={css(styles.body)}>
            {user.isLoggedIn ? (
              <BodySectionWithMarginBottom title="Course list">
                <CourseListWithLogging courses={this.state.courses} />
              </BodySectionWithMarginBottom>
            ) : (
              <BodySectionWithMarginBottom title="Log in to continue">
                <LoginWithLogging
                  logIn={this.logIn}
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
}

export default App;
