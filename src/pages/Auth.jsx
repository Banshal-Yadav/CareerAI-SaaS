import React, { useState, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import './Auth.css';
import { useNavigate } from 'react-router-dom';

const validatePassword = (pw) => {
  const checks = {
    length: pw.length >= 8,
    uppercase: /[A-Z]/.test(pw),
    lowercase: /[a-z]/.test(pw),
    number: /[0-9]/.test(pw),
  };
  checks.valid = checks.length && checks.uppercase && checks.lowercase && checks.number;
  return checks;
};

const Auth = () => {
  const { user, login, register, loginWithGoogle, logout, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const pwChecks = useMemo(() => validatePassword(password), [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isLogin && !pwChecks.valid) {
      setError('Password does not meet the requirements below.');
      return;
    }

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading && !user) return <div className="auth-container">Loading...</div>;

  return (
    <div className="auth-container">
      <h2 className="auth-title">{isLogin ? 'Login' : 'Sign Up'}</h2>
      {error && <p className="auth-error">{error}</p>}

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={isLogin ? undefined : 8}
        />
        {!isLogin && password.length > 0 && (
          <ul style={{ listStyle: 'none', padding: 0, margin: '0.4rem 0 0.8rem', fontSize: '0.8rem' }}>
            <li style={{ color: pwChecks.length ? '#4ade80' : '#f87171' }}>{pwChecks.length ? '✓' : '✗'} At least 8 characters</li>
            <li style={{ color: pwChecks.uppercase ? '#4ade80' : '#f87171' }}>{pwChecks.uppercase ? '✓' : '✗'} One uppercase letter</li>
            <li style={{ color: pwChecks.lowercase ? '#4ade80' : '#f87171' }}>{pwChecks.lowercase ? '✓' : '✗'} One lowercase letter</li>
            <li style={{ color: pwChecks.number ? '#4ade80' : '#f87171' }}>{pwChecks.number ? '✓' : '✗'} One number</li>
          </ul>
        )}
        <button type="submit" className="auth-btn" disabled={!isLogin && password.length > 0 && !pwChecks.valid}>
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>

      <button onClick={handleGoogleLogin} className="google-btn">
        Sign in with Google
      </button>

      <div className="toggle-container">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default Auth;