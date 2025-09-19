// Components.
import { getCurrentYear, getFooterCopy } from '../utils/utils';

function Footer({ user, logOut }) {
  return (
    <footer className='App-footer' style={{ textAlign: 'center' }}>
      <p>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
      {user.isLoggedIn && (
        <div>
          <p><a href="#" onClick={(e) => { e.preventDefault(); logOut(); }} aria-label="Logout">Logout</a></p>
        </div>
      )}
    </footer>
  );
}

export default Footer;
