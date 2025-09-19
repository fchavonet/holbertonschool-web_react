// Components.
import { getCurrentYear, getFooterCopy } from '../utils/utils';

function Footer({ user, logOut }) {
  return (
    <footer className='App-footer' style={{ textAlign: 'center' }}>
      {user.isLoggedIn && (
        <div style={{ marginBottom: '0.5rem' }}>
          <p><a href="#" onClick={(e) => { e.preventDefault(); logOut(); }} aria-label="Logout">Logout</a></p>
        </div>
      )}
      <p>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
    </footer>
  );
}

export default Footer;
