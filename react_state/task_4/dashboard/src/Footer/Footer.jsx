import React, { useContext } from 'react';
import { getCurrentYear, getFooterCopy } from '../utils/utils';
import { newContext } from '../Context/context';

function Footer() {
  const context = useContext(newContext);
  const user = context && context.user ? context.user : { isLoggedIn: false };

  const shouldShowContact = user && user.isLoggedIn === true;

  return (
    <footer className='App-footer'>
      <p>Copyright {getCurrentYear()} {getFooterCopy()}</p>
      {shouldShowContact && (
        <p>
          <a href="#" aria-label="Contact us link">Contact us</a>
        </p>
      )}
    </footer>
  );
}

export default Footer;
