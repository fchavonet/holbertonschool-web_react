import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      email: '',
      password: '',
      enableSubmit: false
    };
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  styles = StyleSheet.create({
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

  validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  updateEnableSubmit = () => {
    const emailOk = this.state.email.length > 0 && this.validateEmail(this.state.email);
    const passwordOk = this.state.password.length >= 8;
    if (emailOk && passwordOk) {
      this.setState({ enableSubmit: true });
    } else {
      this.setState({ enableSubmit: false });
    }
  };

  handleChangeEmail = (e) => {
    const value = e.target.value;
    this.setState({ email: value }, this.updateEnableSubmit);
  };

  handleChangePassword = (e) => {
    const value = e.target.value;
    this.setState({ password: value }, this.updateEnableSubmit);
  };

  handleLoginSubmit = (e) => {
    e.preventDefault();
    this.setState({ isLoggedIn: true });
  };

  render() {
    return (
      <div className={css(this.styles.AppBody)}>
        <p className={css(this.styles.AppBodyP)}>Login to access the full dashboard</p>
        <form className={css(this.styles.form)} onSubmit={this.handleLoginSubmit}>
          <label htmlFor='email' onClick={() => this.emailRef.current && this.emailRef.current.focus()}>Email:</label>
          <input
            id='email'
            name='email'
            type='email'
            ref={this.emailRef}
            className={css(this.styles.formInput)}
            value={this.state.email}
            onChange={this.handleChangeEmail}
          />
          <label htmlFor='password' onClick={() => this.passwordRef.current && this.passwordRef.current.focus()}>Password:</label>
          <input
            id='password'
            name='password'
            type='password'
            role='textbox'
            ref={this.passwordRef}
            className={css(this.styles.formInput)}
            value={this.state.password}
            onChange={this.handleChangePassword}
          />
          <input
            type='submit'
            value='OK'
            className={css(this.styles.formButton)}
            disabled={!this.state.enableSubmit}
          />
        </form>
      </div>
    );
  }
}

export default Login;
