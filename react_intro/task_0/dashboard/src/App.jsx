import holbertonLogo from './assets/holberton-logo.jpg'
import './App.css'

function App() {

  return (
    <>
      <header className='App-header'>
        <img className='holberton-logo' src={holbertonLogo} alt="Holberton logo" />
        <h1>School Dashboard</h1>
      </header>

      <main className='App-body'>
        <p>Login to access the full dashboard</p>
      </main>

      <footer className='App-footer'>
        <p>Copyright {new Date().getFullYear()} - Holberton School</p>
      </footer>
    </>
  )
}

export default App
