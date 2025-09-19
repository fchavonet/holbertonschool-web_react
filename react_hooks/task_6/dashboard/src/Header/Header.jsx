// External libraries.
import { StyleSheet, css } from 'aphrodite';

// Assets.
import holbertonLogo from '../assets/holberton-logo.jpg';

// Styles.
const styles = StyleSheet.create({
  AppHeader: {
    display: 'flex',
    flexDirection: 'column',
    borderBottom: '0.25rem solid #e1003c',
    paddingBottom: '1rem'
  },
  headerRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '1rem'
  },
  AppHeaderH1: {
    fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
    fontWeight: 600,
    letterSpacing: '0.025rem',
    color: '#e1003c'
  },
  AppLogo: {
    height: '15rem'
  },
  logoutSection: {
    marginTop: '0.75rem'
  },
  logoutLink: {
    cursor: 'pointer'
  },
  TitleContainer: {
    height: '5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start'
  },
});

function Header({ user, logOut }) {
  // Handle logout click event.
  const handleLogoutClick = (e) => {
    e.preventDefault();
    logOut();
  };

  return (
    <header className={css(styles.AppHeader)}>
      <div className={css(styles.headerRow)}>
        <img className={css(styles.AppLogo)} src={holbertonLogo} alt="holberton logo" />

        <div className={css(styles.TitleContainer)}>
          <h1 className={css(styles.AppHeaderH1)}>School Dashboard</h1>

          {user.isLoggedIn && (
            <div className={css(styles.logoutSection)}>
              Welcome <b>{user.email}</b> (<a href="#" className={css(styles.logoutLink)} onClick={handleLogoutClick}>logout</a>)
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
