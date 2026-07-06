import './LoginPage.css';

function LoginPage() {
  return (
    <main className="login-page">
      <section className="authentication-section">
        <div className="login-section">
          <div className="section-heading">
            <p>Login</p>
            <h2>Welcome back!</h2>
            <span>Please login to access your account and continue shopping.</span>
          </div>
          <form action="/login/login" method="post">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
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
          <form action="/login/register" method="post">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
