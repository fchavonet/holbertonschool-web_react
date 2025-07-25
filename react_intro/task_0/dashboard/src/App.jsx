import holbertonLogo from './assets/holberton-logo.jpg'
import './App.css'

function App() {

  return (
    <>
      <div className='App-header'>
        <img className='holberton-logo' src={holbertonLogo} alt="Holberton logo" />
        <h1>School Dashboard</h1>
      </div>

      <div className='App-body'>
        <p>Login to access the full dashboard</p>
      </div>

      <div className='App-footer'>
        <p>Copyright {new Date().getFullYear()} - Holberton School</p>
      </div>
    </>
  )
}

export default App
