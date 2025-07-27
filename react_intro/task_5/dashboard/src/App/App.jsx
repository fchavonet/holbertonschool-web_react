import holbertonLogo from '../assets/holberton-logo.jpg'
import '../App/App.css'
import { getCurrentYear, getFooterCopy } from '../utils/utils'
import Notifications from '../Notifications/Notifications';

function App() {

  return (
    <>
      <div className='root-notifications'>
        <Notifications />
      </div>

      <div className='App-header'>
        <img className='holberton-logo' src={holbertonLogo} alt='holberton logo' />
        <h1>School Dashboard</h1>
      </div>

      <div className='App-body'>
        <p>Login to access the full dashboard</p>

        <form>
          <label htmlFor='email'>Email:</label>
          <input id='email' name='email' type='email' />

          <label htmlFor='password'>Password:</label>
          <input id='password' name='password' type='password' />

          <button type='submit'>OK</button>
        </form>
      </div>

      <div className='App-footer'>
        <p>Copyright {getCurrentYear()} - {getFooterCopy()}</p>
      </div>
    </>
  )
}

export default App
