import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

class Login extends Component {
  static defaultProps = {
    email: '',
    password: '',
    logIn: () => { },
  };

  constructor(props) {
    super(props);
    this.state = {
      email: props.email || '',
      password: props.password || '',
    };
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  styles = StyleSheet.create({
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

  validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  handleChangeEmail = (e) => {
    const value = e.target.value;
    this.setState({ email: value });
  };

  handleChangePassword = (e) => {
    const value = e.target.value;
    this.setState({ password: value });
  };

  handleLoginSubmit = (e) => {
    e.preventDefault();
    if (typeof this.props.logIn === 'function') {
      this.props.logIn(this.state.email, this.state.password);
    }
  };

  render() {
    const emailOk =
      this.state.email.length > 0 && this.validateEmail(this.state.email);
    const passwordOk = this.state.password.length >= 8;

    let isSubmitEnabled = false;
    if (emailOk && passwordOk) {
      isSubmitEnabled = true;
    }

    return (
      <div className={css(this.styles.AppBody)}>
        <p className={css(this.styles.AppBodyP)}>Login to access the full dashboard</p>
        <form role="form" aria-label="login form" className={css(this.styles.form)} onSubmit={this.handleLoginSubmit}>
          <label
            htmlFor="email"
            onClick={() => this.emailRef.current && this.emailRef.current.focus()}
          >
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            ref={this.emailRef}
            className={css(this.styles.formInput)}
            value={this.state.email}
            onChange={this.handleChangeEmail}
          />
          <label
            htmlFor="password"
            onClick={() => this.passwordRef.current && this.passwordRef.current.focus()}
          >
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            role="textbox"
            ref={this.passwordRef}
            className={css(this.styles.formInput)}
            value={this.state.password}
            onChange={this.handleChangePassword}
          />
          <input
            type="submit"
            value="OK"
            className={css(this.styles.formButton)}
            disabled={!isSubmitEnabled}
          />
        </form>
      </div>
    );
  }
}

export default Login;
