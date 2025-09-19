// External libraries.
import React, { useRef } from 'react';
import { StyleSheet, css } from 'aphrodite';

// Custom hooks.
import useLogin from '../hooks/useLogin';

const Login = (props) => {
  // Extract login function from props with fallback.
  const loginFunction = props.login || props.logIn || (() => { });

  // Use custom login hook for form state management.
  const {
    email,
    password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleLoginSubmit,
  } = useLogin({ onLogin: loginFunction });

  // Refs for input focus management.
  const emailRef = useRef();
  const passwordRef = useRef();

  // Component styles with responsive design.
  const styles = StyleSheet.create({
    AppBody: {
      padding: '2rem',
      flex: 1,
    },
    AppBodyP: {
      marginBottom: '1rem',
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
        gap: '0.5rem',
      },
    },
    formInput: {
      padding: '0 0.25rem',
    },
    formButton: {
      padding: '0 0.25rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <div className={css(styles.AppBody)}>
      <p className={css(styles.AppBodyP)}>Login to access the full dashboard</p>

      <form role="form" aria-label="login form" className={css(styles.form)} onSubmit={handleLoginSubmit}>
        <label
          htmlFor="email"
          onClick={() => emailRef.current && emailRef.current.focus()}
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          ref={emailRef}
          className={css(styles.formInput)}
          value={email}
          onChange={handleChangeEmail}
        />

        <label
          htmlFor="password"
          onClick={() => passwordRef.current && passwordRef.current.focus()}
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          role="textbox"
          ref={passwordRef}
          className={css(styles.formInput)}
          value={password}
          onChange={handleChangePassword}
        />

        <input
          type="submit"
          value="OK"
          className={css(styles.formButton)}
          disabled={!enableSubmit}
        />
      </form>
    </div>
  );
};

export default Login;
