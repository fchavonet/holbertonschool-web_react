import './Login.css'
import { useRef } from 'react';

function Login() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    return (
        <div className='App-body' >
            <p>Login to access the full dashboard</p>

            <form>
                <label htmlFor='email' onClick={() => emailRef.current && emailRef.current.focus()}>Email:</label>
                <input id='email' name='email' type='email' ref={emailRef} />

                <label htmlFor='password' onClick={() => passwordRef.current && passwordRef.current.focus()}>Password:</label>
                <input id='password' name='password' type='password' ref={passwordRef} />

                <button type='submit'>OK</button>
            </form>
        </div>
    )
}

export default Login