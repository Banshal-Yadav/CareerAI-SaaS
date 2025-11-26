import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import './Auth.css'; 
import { useNavigate } from 'react-router-dom'; 

const Auth = () => {
  const { user, login, register, loginWithGoogle, logout, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
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
      navigate('/'); // 
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
        />
        <button type="submit" className="auth-btn">
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