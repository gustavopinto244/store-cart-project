import { useState, type SyntheticEvent } from 'react';
import validator from 'validator';

import './LoginPage.css';

function LoginPage() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState({
    email: '',
    password: '',
  });

  const [registrationName, setRegistrationName] = useState('');
  const [registrationEmail, setRegistrationEmail] = useState('');
  const [registrationPassword, setRegistrationPassword] = useState('');
  const [registrationErrors, setRegistrationErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const validateEmail = (email: string) => {
    return validator.isEmail(email) ? '' : 'Please enter a valid email address.';
  };

  const validatePassword = (password: string) => {
    return validator.isLength(password, { min: 8 })
      ? ''
      : 'Password must be at least 8 characters long.';
  };

  const validateName = (name: string) => {
    return validator.isLength(name.trim(), { min: 3 })
      ? ''
      : 'Name must be at least 3 characters long.';
  };

  const handleLoginSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    const emailError = validateEmail(loginEmail);
    const passwordError = validatePassword(loginPassword);

    setLoginErrors({
      email: emailError,
      password: passwordError,
    });

    if (emailError || passwordError) {
      event.preventDefault();
    }
  };

  const handleRegistrationSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    const nameError = validateName(registrationName);
    const emailError = validateEmail(registrationEmail);
    const passwordError = validatePassword(registrationPassword);

    setRegistrationErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
    });

    if (nameError || emailError || passwordError) {
      event.preventDefault();
    }
  };

  return (
    <main className="login-page">
      <section className="authentication-section">
        <div className="login-section">
          <div className="section-heading">
            <p>Login</p>
            <h2>Welcome back!</h2>
            <span>Please login to access your account and continue shopping.</span>
          </div>
          <form action="/login" method="post" onSubmit={handleLoginSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="login-email">Email</label>
              <input
                type="email"
                id="login-email"
                name="email"
                value={loginEmail}
                onChange={(event) => setLoginEmail(event.target.value)}
                required
                aria-invalid={Boolean(loginErrors.email)}
                aria-describedby={loginErrors.email ? 'login-email-error' : undefined}
              />
              {loginErrors.email ? (
                <span id="login-email-error" className="form-error">
                  {loginErrors.email}
                </span>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="login-password">Password</label>
              <input
                type="password"
                id="login-password"
                name="password"
                value={loginPassword}
                onChange={(event) => setLoginPassword(event.target.value)}
                required
                aria-invalid={Boolean(loginErrors.password)}
                aria-describedby={loginErrors.password ? 'login-password-error' : undefined}
              />
              {loginErrors.password ? (
                <span id="login-password-error" className="form-error">
                  {loginErrors.password}
                </span>
              ) : null}
            </div>
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="registration-section">
          <div className="section-heading">
            <p>Registration</p>
            <h2>Create your account</h2>
            <span>Register to access your account and continue shopping.</span>
          </div>
          <form action="/register" method="post" onSubmit={handleRegistrationSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={registrationName}
                onChange={(event) => setRegistrationName(event.target.value)}
                required
                aria-invalid={Boolean(registrationErrors.name)}
                aria-describedby={registrationErrors.name ? 'registration-name-error' : undefined}
              />
              {registrationErrors.name ? (
                <span id="registration-name-error" className="form-error">
                  {registrationErrors.name}
                </span>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="registration-email"
                name="email"
                value={registrationEmail}
                onChange={(event) => setRegistrationEmail(event.target.value)}
                required
                aria-invalid={Boolean(registrationErrors.email)}
                aria-describedby={registrationErrors.email ? 'registration-email-error' : undefined}
              />
              {registrationErrors.email ? (
                <span id="registration-email-error" className="form-error">
                  {registrationErrors.email}
                </span>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="registration-password"
                name="password"
                value={registrationPassword}
                onChange={(event) => setRegistrationPassword(event.target.value)}
                required
                aria-invalid={Boolean(registrationErrors.password)}
                aria-describedby={
                  registrationErrors.password ? 'registration-password-error' : undefined
                }
              />
              {registrationErrors.password ? (
                <span id="registration-password-error" className="form-error">
                  {registrationErrors.password}
                </span>
              ) : null}
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
