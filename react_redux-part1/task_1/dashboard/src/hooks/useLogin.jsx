// External libraries.
import { useState } from 'react';

// Custom hook for managing login form state and validation.
const useLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enableSubmit, setEnableSubmit] = useState(false);

  // Validates email format using regex.
  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  // Validates entire form based on email and password criteria.
  const validateForm = (emailValue, passwordValue) => {
    const emailOk = emailValue.length > 0 && validateEmail(emailValue);
    const passwordOk = passwordValue.length >= 8;
    return emailOk && passwordOk;
  };

  // Handles email input change and validates form.
  const handleChangeEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setEnableSubmit(validateForm(emailValue, password));
  };

  // Handles password input change and validates form.
  const handleChangePassword = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    setEnableSubmit(validateForm(email, passwordValue));
  };

  // Handles form submission and calls onLogin callback.
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (typeof onLogin === 'function') {
      onLogin(email, password);
    }
  };

  // Return hook interface.
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
