import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { useRef } from 'react';

function Login() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const styles = StyleSheet.create({
        AppBody: {
            padding: '2rem',
            flex: 1
        },
        AppBodyP: {
            marginBottom: '1rem'
        },
        form: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '1rem',
            '@media (max-width: 900px)': {
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '0.5rem'
            }
        },
        formInput: {
            padding: '0 0.25rem'
        },
        formButton: {
            padding: '0 0.25rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    });

    return (
        <div className={css(styles.AppBody)}>
            <p className={css(styles.AppBodyP)}>Login to access the full dashboard</p>

            <form className={css(styles.form)}>
                <label htmlFor='email' onClick={() => emailRef.current && emailRef.current.focus()}>Email:</label>
                <input
                    id='email'
                    name='email'
                    type='email'
                    ref={emailRef}
                    className={css(styles.formInput)}
                />

                <label htmlFor='password' onClick={() => passwordRef.current && passwordRef.current.focus()}>Password:</label>
                <input
                    id='password'
                    name='password'
                    type='password'
                    role="textbox"
                    ref={passwordRef}
                    className={css(styles.formInput)}
                />

                <button type='submit' className={css(styles.formButton)}>OK</button>
            </form>
        </div>
    );
}

export default Login;
