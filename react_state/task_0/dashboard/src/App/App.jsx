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
import { getLatestNotification } from "../utils/utils";

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
    }
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
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    fontSize: '0.8rem',
    fontWeight: 200,
    fontStyle: 'italic',
    borderTop: '0.25rem solid #e1003c',
  }
});

class App extends Component {
  static defaultProps = {
    isLoggedIn: false,
    logOut: () => { }
  };

  constructor(props) {
    super(props);
    this.state = {
      displayDrawer: false
    };
  }

  handleDisplayDrawer = () => {
    this.setState({ displayDrawer: true });
  };

  handleHideDrawer = () => {
    this.setState({ displayDrawer: false });
  };

  handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      this.props.logOut();
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);

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

  render() {
    const { isLoggedIn = false } = this.props;

    const notificationsList = [
      {
        id: 1,
        type: "default",
        value: "New course available"
      },
      {
        id: 2,
        type: "urgent",
        value: "New resume available"
      },
      {
        id: 3,
        type: "urgent",
        value: getLatestNotification()
      }
    ];

    const coursesList = [
      {
        id: 1,
        name: 'ES6',
        credit: 60
      },
      {
        id: 2,
        name: 'Webpack',
        credit: 20
      },
      {
        id: 3,
        name: 'React',
        credit: 40
      }
    ];

    return (
      <div className={css(styles.app)}>
        <Notifications
          notifications={notificationsList}
          displayDrawer={this.state.displayDrawer}
          handleDisplayDrawer={this.handleDisplayDrawer}
          handleHideDrawer={this.handleHideDrawer}
        />

        <Header />

        <div className={css(styles.body)}>
          {isLoggedIn ? (
            <BodySectionWithMarginBottom title="Course list">
              <CourseListWithLogging courses={coursesList} />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom title="Log in to continue">
              <LoginWithLogging />
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
    );
  }
}

export default App;
