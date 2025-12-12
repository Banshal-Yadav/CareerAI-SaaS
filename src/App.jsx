import './App.css'
import { useAuth } from './hooks/useAuth.js';
import { Routes, Route, Link } from "react-router-dom";
import { useEffect } from 'react';

import Home from './pages/Home.jsx';
import AssessmentPg from './pages/AssessmentPg.jsx';
import Profile from './pages/Profile.jsx';
import Auth from './pages/Auth.jsx';
import Pricing from './pages/Pricing.jsx';
import ResumeBuilder from './pages/Resume/ResumeBuilder.jsx';

import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/footer.jsx';

const NotFoundPage = () => (
  <div style={{
    padding: '4rem',
    textAlign: 'center',
    color: '#fff',
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
    <p style={{ fontSize: '1.2rem', color: '#aaa', marginBottom: '2rem' }}>Page not found</p>
    <Link to="/" style={{
      padding: '0.8rem 2rem',
      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      color: '#fff',
      borderRadius: '8px',
      textDecoration: 'none'
    }}>Go Home</Link>
  </div>
);

const GuestBanner = () => (
  <div style={{
    background: 'linear-gradient(90deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))',
    padding: '0.6rem 1rem',
    textAlign: 'center',
    borderBottom: '1px solid rgba(99,102,241,0.3)',
    fontSize: '0.85rem',
    color: '#c4b5fd'
  }}>
    👋 You're using a guest account. <Link to="/login" style={{ color: '#a78bfa', fontWeight: '600' }}>Sign up</Link> to save your data permanently.
  </div>
);

function App() {
  const { user, loading, loginAsGuest } = useAuth();

  // handle guest login on initial app load
  useEffect(() => {
    if (!loading && !user) {
      loginAsGuest().catch(error => {
        console.error("Guest sign-in failed:", error);
      });
    }
  }, [user, loading, loginAsGuest]);

  if (loading) return <div>loading...</div>;

  const showGuestBanner = user && user.isAnonymous;

  return (
    <div className="grid-background">
      {showGuestBanner && <GuestBanner />}
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route path="/resume-builder" element={
          <>
            <Navbar />
            <ResumeBuilder />
            <Footer />
          </>
        } />
        <Route path="/AssessmentPg" element={
          <>
            <div className="glow-overlay"></div>
            <Navbar />
            <AssessmentPg />
            <Footer />
          </>
        } />
        <Route path="/profile" element={
          <>
            <Navbar />
            <Profile />
            <Footer />
          </>
        } />
        <Route path="/login" element={
          <>
            <Navbar />
            <Auth />
            <Footer />
          </>
        } />
        <Route path="/pricing" element={
          <>
            <Navbar />
            <Pricing />
            <Footer />
          </>
        } />
        <Route path="/privacy" element={
          <>
            <Navbar />
            <div style={{ padding: '4rem', textAlign: 'center', color: '#fff' }}><h1>Privacy Policy</h1><p>Coming Soon</p></div>
            <Footer />
          </>
        } />
        <Route path="/terms" element={
          <>
            <Navbar />
            <div style={{ padding: '4rem', textAlign: 'center', color: '#fff' }}><h1>Terms of Service</h1><p>Coming Soon</p></div>
            <Footer />
          </>
        } />
        <Route path="*" element={
          <>
            <Navbar />
            <NotFoundPage />
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;