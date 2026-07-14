import { useState, type SyntheticEvent } from 'react';
import validator from 'validator';
import { useAuth } from '../../contexts/AuthContext';
import './LoginPage.css';

interface ServerMessages {
  login: { type: 'success' | 'error'; text: string[] } | null;
  registration: { type: 'success' | 'error'; text: string[] } | null;
}

function LoginPage() {
  const { login, register } = useAuth();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registrationName, setRegistrationName] = useState('');
  const [registrationEmail, setRegistrationEmail] = useState('');
  const [registrationPassword, setRegistrationPassword] = useState('');
  const [registrationErrors, setRegistrationErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [serverMessages, setServerMessages] = useState<ServerMessages>({
    login: null,
    registration: null,
  });

  const validateEmail = (email: string) => {
    return validator.isEmail(email) ? '' : 'Please enter a valid email address.';
  };

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

    if (!validator.isLength(password, { min: 8 })) {
      return 'Password must be at least 8 characters long.';
    }
    if (!regex.test(password)) {
      return 'Password must contain uppercase, lowercase, number and special character.';
    }
    return '';
  };

  const validatePasswordLogin = (password: string) => {
    if (!password || password.trim().length === 0) {
      return 'Password must be inserted.';
    }
    return '';
  };

  const validateName = (name: string) => {
    return validator.isLength(name.trim(), { min: 2 })
      ? ''
      : 'Name must be at least 2 characters long.';
  };

  const handleLoginSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailError = validateEmail(loginEmail);
    const passwordError = validatePasswordLogin(loginPassword);
    setServerMessages((prev) => ({ ...prev, login: null }));

    if (emailError || passwordError) {
      setServerMessages((prev) => ({
        ...prev,
        login: { type: 'error', text: [emailError, passwordError].filter((v): v is string => !!v) },
      }));
      return;
    }

    const result = await login(loginEmail, loginPassword);

    if (result.success) {
      setServerMessages((prev) => ({
        ...prev,
        login: { type: 'success', text: [result.message || 'Signed in.'] },
      }));
    } else {
      setServerMessages((prev) => ({
        ...prev,
        login: { type: 'error', text: result.errors || ['Login failed.'] },
      }));
    }
  };

  const handleRegistrationSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nameError = validateName(registrationName);
    const emailError = validateEmail(registrationEmail);
    const passwordError = validatePassword(registrationPassword);

    setRegistrationErrors({ name: nameError, email: emailError, password: passwordError });
    setServerMessages((prev) => ({ ...prev, registration: null }));

    if (nameError || emailError || passwordError) return;

    const result = await register(registrationName, registrationEmail, registrationPassword);

    if (result.success) {
      setServerMessages((prev) => ({
        ...prev,
        registration: { type: 'success', text: [result.message || 'Account created.'] },
      }));
      setRegistrationName('');
      setRegistrationEmail('');
      setRegistrationPassword('');
      setRegistrationErrors({ name: '', email: '', password: '' });
    } else {
      setServerMessages((prev) => ({
        ...prev,
        registration: { type: 'error', text: result.errors || ['Registration failed.'] },
      }));
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
          <form action="/login/login" method="post" onSubmit={handleLoginSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="login-email">Email</label>
              <input
                type="email"
                id="login-email"
                name="email"
                value={loginEmail}
                onChange={(event) => setLoginEmail(event.target.value)}
                required
              />
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
              />
            </div>
            {serverMessages.login && (
              <div
                className={
                  serverMessages.login.type === 'success' ? 'server-success' : 'server-errors'
                }
                role="alert"
              >
                {serverMessages.login.text.map((msg, i) => (
                  <p key={i}>{msg}</p>
                ))}
              </div>
            )}
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="registration-section">
          <div className="section-heading">
            <p>Registration</p>
            <h2>Create your account</h2>
            <span>Register to access your account and continue shopping.</span>
          </div>
          <form
            action="/login/register"
            method="post"
            onSubmit={handleRegistrationSubmit}
            noValidate
          >
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
              <label htmlFor="registration-email">Email</label>
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
              <label htmlFor="registration-password">Password</label>
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
            {serverMessages.registration && (
              <div
                className={
                  serverMessages.registration.type === 'success'
                    ? 'server-success'
                    : 'server-errors'
                }
                role="alert"
              >
                {serverMessages.registration.text.map((msg, i) => (
                  <p key={i}>{msg}</p>
                ))}
              </div>
            )}
            <button type="submit">Register</button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
