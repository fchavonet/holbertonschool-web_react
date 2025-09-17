import React from 'react';

export const defaultUser = {
  email: '',
  password: '',
  isLoggedIn: false,
};

export const defaultLogOut = () => { };

export const newContext = React.createContext({
  user: defaultUser,
  logOut: defaultLogOut,
});
