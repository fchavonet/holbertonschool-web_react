import holbertonLogo from './assets/holberton-logo.jpg'
import './App.css'
import { getCurrentYear, getFooterCopy } from './utils'
import Notifications from './Notifications';

function App() {

  return (
    <>
      <div className='root-notifications'>
        <Notifications />
      </div>

      <div className='App-header'>
        <img className='holberton-logo' src={holbertonLogo} alt="holberton logo" />
        <h1>School Dashboard</h1>
      </div>

      <div className='App-body'>
        <p>Login to access the full dashboard</p>
      </div>

      <div className='App-footer'>
        <p>Copyright {getCurrentYear()} - {getFooterCopy()}</p>
      </div>
    </>
  )
}

export default App
