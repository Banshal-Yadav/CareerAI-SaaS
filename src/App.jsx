import './App.css'
import { useAuth } from './hooks/useAuth.js';
import { Routes, Route } from "react-router-dom";
import { useEffect } from 'react';

// Pages
import Home from './pages/Home.jsx';
import AssessmentPg from './pages/AssessmentPg.jsx';
import Profile from './pages/Profile.jsx';
import Auth from './pages/Auth.jsx';
import Pricing from './pages/Pricing.jsx';
import ResumeBuilder from './pages/Resume/ResumeBuilder.jsx';

import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/footer.jsx';

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

  // show a loading indicator while firebase is initializing
  if (loading) return <div>loading...</div>;

  // main app router
  return (
    <div className="grid-background">
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
      </Routes>
    </div>
  );
}

export default App;