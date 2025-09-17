import { useState } from 'react';

const useLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enableSubmit, setEnableSubmit] = useState(false);

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const validateForm = (emailValue, passwordValue) => {
    const emailOk = emailValue.length > 0 && validateEmail(emailValue);
    const passwordOk = passwordValue.length >= 8;
    return emailOk && passwordOk;
  };

  const handleChangeEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setEnableSubmit(validateForm(emailValue, password));
  };

  const handleChangePassword = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    setEnableSubmit(validateForm(email, passwordValue));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (typeof onLogin === 'function') {
      onLogin(email, password);
    }
  };

  return {
    email,
    password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleLoginSubmit,
  };
};

export default useLogin;
