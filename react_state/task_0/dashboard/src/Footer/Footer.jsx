import React from 'react';
import { getCurrentYear, getFooterCopy } from '../utils/utils'

function Footer() {
    return (
        <footer className='App-footer'>
            <p>Copyright {getCurrentYear()} {getFooterCopy()}</p>
        </footer>
    )
}

export default Footer