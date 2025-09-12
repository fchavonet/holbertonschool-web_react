import React from 'react';
import { getCurrentYear, getFooterCopy } from '../utils/utils';
import { newContext } from '../Context/context';

function Footer() {
  const context = React.useContext(newContext);
  const { user, logOut } = context || {};

  return (
    <footer className='App-footer' style={{ textAlign: 'center' }}>
      <p>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
      {user && user.isLoggedIn && (
        <div>
          <p>Welcome {user.email}!</p>
          <p>
            <a href="#" onClick={(e) => { e.preventDefault(); logOut(); }} aria-label="Logout">
              Logout
            </a>
          </p>
          <p>
            <a href="#" onClick={(e) => { e.preventDefault(); logOut(); }} aria-label="Contact us link">
              Contact us
            </a>
          </p>
        </div>
      )}
    </footer>
  );
}

export default Footer;
