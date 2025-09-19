// Components.
import { getCurrentYear, getFooterCopy } from '../../utils/utils';

function Footer({ user, logOut }) {
  return (
    <footer className='App-footer' style={{ textAlign: 'center' }}>
      <p>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
    </footer>
  );
}

export default Footer;
