import holbertonLogo from './assets/holberton-logo.jpg'
import './App.css'
import { getCurrentYear, getFooterCopy } from './utils'
import Notifications from './Notifications';

function App() {

  return (
    <>
      <div className="App">
        <div className='root-notifications'>
          <Notifications />
        </div>

        <div className='App-header'>
          <img className='App-logo' src={holbertonLogo} alt='holberton logo' />
          <h1>School Dashboard</h1>
        </div>

        <div className='App-body'>
          <p>Login to access the full dashboard</p>

          <form>
            <label htmlFor='email'>Email:</label>
            <input id='email' name='email' type='email' />

            <label htmlFor='password'>Password:</label>
            <input id='password' name='password' type='password' />

            <button className="label-button" type='submit'>OK</button>
          </form>
        </div>

        <div className='App-footer'>
          <p>Copyright {getCurrentYear()} {getFooterCopy()}</p>
        </div>
      </div>
    </>
  )
}

export default App
