import './Header.css'
import holbertonLogo from '../assets/holberton-logo.jpg'

function Header() {
    return (
        <header className='App-header'>
            <img className='holberton-logo' src={holbertonLogo} alt='holberton logo' />
            <h1>School Dashboard</h1>
        </header>
    )
}

export default Header