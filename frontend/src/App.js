import React, { useMemo, useState } from 'react';
import './App.css';

const initialLoginState = { email: '', password: '' };
const initialSignupState = { name: '', email: '', password: '', confirmPassword: '' };
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function App() {
  const [mode, setMode] = useState('login');
  const [loginForm, setLoginForm] = useState(initialLoginState);
  const [signupForm, setSignupForm] = useState(initialSignupState);
  const [status, setStatus] = useState({ type: '', message: '' });

  const loginIsValid = useMemo(() => {
    return (
      emailRegex.test(loginForm.email.trim()) &&
      loginForm.password.trim().length >= 6
    );
  }, [loginForm]);

  const signupIsValid = useMemo(() => {
    return (
      signupForm.name.trim().length > 0 &&
      emailRegex.test(signupForm.email.trim()) &&
      signupForm.password.trim().length >= 6 &&
      signupForm.password === signupForm.confirmPassword
    );
  }, [signupForm]);

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    setStatus({
      type: 'success',
      message: `Welcome back, ${loginForm.email.trim()}!`
    });
    setLoginForm(initialLoginState);
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    setStatus({
      type: 'success',
      message: `Account ready for ${signupForm.email.trim()}!`
    });
    setSignupForm(initialSignupState);
  };

  const handleChange = (setter) => (event) => {
    const { name, value } = event.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handleTabChange = (nextMode) => {
    setMode(nextMode);
    setStatus({ type: '', message: '' });
  };

  const activeTabSubtitle =
    mode === 'login'
      ? 'Use your verified email and password to access the workspace.'
      : 'Create a brand-new account in seconds with simple validation.';

  return (
    <div className="app-shell">
      <div className="card">
        <div className="top-copy">
          <p className="eyebrow">Simple Auth</p>
          <h1>{mode === 'login' ? 'Sign in' : 'Create account'}</h1>
          <p className="subtitle">{activeTabSubtitle}</p>
        </div>

        <div className="action-tabs" role="tablist">
          <button
            type="button"
            className={mode === 'login' ? 'tab-button active' : 'tab-button'}
            role="tab"
            aria-selected={mode === 'login'}
            onClick={() => handleTabChange('login')}
          >
            Login
          </button>
          <button
            type="button"
            className={mode === 'signup' ? 'tab-button active' : 'tab-button'}
            role="tab"
            aria-selected={mode === 'signup'}
            onClick={() => handleTabChange('signup')}
          >
            Sign Up
          </button>
        </div>

        {status.message && (
          <div className={`status-message ${status.type}`.trim()} role="status">
            {status.message}
          </div>
        )}

        {mode === 'login' ? (
          <form className="form-grid" onSubmit={handleLoginSubmit} noValidate>
            <label>
              Email
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={loginForm.email}
                onChange={handleChange(setLoginForm)}
                required
                autoComplete="email"
              />
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={loginForm.password}
                onChange={handleChange(setLoginForm)}
                required
                minLength={6}
                autoComplete="current-password"
              />
            </label>
            {loginForm.email && !emailRegex.test(loginForm.email.trim()) && (
              <small className="input-hint">That doesn’t look like a valid email.</small>
            )}
            <button type="submit" disabled={!loginIsValid} className="primary-button">
              Continue
            </button>
          </form>
        ) : (
          <form className="form-grid" onSubmit={handleSignupSubmit} noValidate>
            <label>
              Full name
              <input
                type="text"
                name="name"
                placeholder="Alex Johnson"
                value={signupForm.name}
                onChange={handleChange(setSignupForm)}
                required
                autoComplete="name"
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={signupForm.email}
                onChange={handleChange(setSignupForm)}
                required
                autoComplete="email"
              />
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={signupForm.password}
                onChange={handleChange(setSignupForm)}
                required
                minLength={6}
                autoComplete="new-password"
              />
            </label>
            <label>
              Confirm password
              <input
                type="password"
                name="confirmPassword"
                placeholder="Repeat password"
                value={signupForm.confirmPassword}
                onChange={handleChange(setSignupForm)}
                required
                minLength={6}
                autoComplete="new-password"
              />
            </label>
            {signupForm.confirmPassword &&
              signupForm.password !== signupForm.confirmPassword && (
                <small className="input-hint error">
                  Passwords must match to continue.
                </small>
              )}
            <button type="submit" disabled={!signupIsValid} className="primary-button">
              Create account
            </button>
          </form>
        )}

        <p className="helper-copy">
          Mock validation only — the form doesn’t submit to a server. Refresh to start over.
        </p>
      </div>
    </div>
  );
}

export default App;
