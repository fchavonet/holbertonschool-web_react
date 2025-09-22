// Components.
import { getCurrentYear, getFooterCopy } from '../../utils/utils';

function Footer({ user, logOut }) {
  return (
    <footer className='App-footer' style={{ textAlign: 'center' }}>
      {user.isLoggedIn && (
        <a href="#" aria-label="Contact us link">
          contact us
        </a>
      )}

      <p style={{ marginTop: '0.5rem' }}>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
    </footer>
  );
}

export default Footer;
