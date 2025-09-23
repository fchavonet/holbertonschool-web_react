import authReducer, { login, logout } from "../auth/authSlice";

describe('authSlice', () => {
  const initialState = {
    user: {
      email: '',
      password: ''
    },
    isLoggedIn: false
  };

  it('Should return the initial state', () => {
    expect(authReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle login', () => {
    const loginPayload = {
      email: 'test@example.com',
      password: 'password123'
    };

    const expectedState = {
      user: {
        email: 'test@example.com',
        password: 'password123'
      },
      isLoggedIn: true
    };

    expect(authReducer(initialState, login(loginPayload))).toEqual(expectedState);
  });

  it('Should handle logout', () => {
    const loggedInState = {
      user: {
        email: 'test@example.com',
        password: 'password123'
      },
      isLoggedIn: true
    };

    expect(authReducer(loggedInState, logout())).toEqual(initialState);
  });

  it('Should reset user state correctly on logout', () => {
    const loggedInState = {
      user: {
        email: 'user@test.com',
        password: 'mypassword'
      },
      isLoggedIn: true
    };

    const result = authReducer(loggedInState, logout());

    expect(result.user.email).toBe('');
    expect(result.user.password).toBe('');
    expect(result.isLoggedIn).toBe(false);
  });

  it('Should update state correctly with different login credentials', () => {
    const loginPayload1 = {
      email: 'first@example.com',
      password: 'firstpass'
    };

    const loginPayload2 = {
      email: 'second@example.com',
      password: 'secondpass'
    };

    let state = authReducer(initialState, login(loginPayload1));
    expect(state.user.email).toBe('first@example.com');
    expect(state.user.password).toBe('firstpass');
    expect(state.isLoggedIn).toBe(true);

    state = authReducer(state, login(loginPayload2));
    expect(state.user.email).toBe('second@example.com');
    expect(state.user.password).toBe('secondpass');
    expect(state.isLoggedIn).toBe(true);
  });
});
