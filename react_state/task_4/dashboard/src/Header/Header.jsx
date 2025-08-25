import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import holbertonLogo from '../assets/holberton-logo.jpg';
import { newContext } from '../Context/context';

const styles = StyleSheet.create({
  AppHeader: {
    display: 'flex',
    flexDirection: 'column',
    borderBottom: '0.25rem solid #e1003c',
    paddingBottom: '1rem',
  },
  headerRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '1rem',
  },
  AppHeaderH1: {
    fontFamily:
      "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
    fontWeight: 600,
    letterSpacing: '0.025rem',
    color: '#e1003c',
  },
  AppLogo: {
    height: '15rem',
  },
  logoutSection: {
    marginTop: '0.75rem',
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  },
  logoutLink: {
    marginLeft: '0.25rem',
    cursor: 'pointer',
  },
});

class Header extends Component {
  // Consommer le contexte via ContextType (exigence)
  static contextType = newContext;

  handleLogoutClick(event, logOut) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    if (typeof logOut === 'function') {
      logOut();
    }
  }

  render() {
    const { user, logOut } = this.context;

    return (
      <header className={css(styles.AppHeader)}>
        <div className={css(styles.headerRow)}>
          <img
            className={css(styles.AppLogo)}
            src={holbertonLogo}
            alt="holberton logo"
          />
          <h1 className={css(styles.AppHeaderH1)}>School Dashboard</h1>
        </div>

        {/* Afficher la section uniquement si l'utilisateur est connecté */}
        {user && user.isLoggedIn && (
          <section id="logoutSection" className={css(styles.logoutSection)}>
            Welcome <b>{user.email}</b>
            <a
              href="#"
              className={css(styles.logoutLink)}
              onClick={(e) => this.handleLogoutClick(e, logOut)}
            >
              (logout)
            </a>
          </section>
        )}
      </header>
    );
  }
}

export default Header;
