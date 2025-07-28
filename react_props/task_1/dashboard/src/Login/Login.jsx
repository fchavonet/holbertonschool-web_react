import './Login.css'

function Login() {
    return (
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
    )
}

export default Login