import './App.css'
import Navbar from './Navbar/Navbar.jsx';
import Pgtitle from './PgTitle/pgTitle.jsx';
import GetStartBtn from './GetStartedBtn/GetStartBtn.jsx';
import Feature from './Card/Feature.jsx';
import Footer from './Footer/footer.jsx';
import StatsContainer from './Stats/StatsContainer.jsx';
import ChipTabContainer from './Chip/ChipTabContainer.jsx';
import SolutionSec from './Solution/SolutionSec.jsx';
import Auth from './components/Auth.jsx';
import { useAuth } from './hooks/useAuth.js';
import { Routes, Route } from "react-router-dom";
import AssessmentPg from './components/AssessmentPg.jsx';
import Faq from "./Card/Faq.jsx";
import Profile from './components/Profile.jsx';
import ResumeBuilder from './components/Resume/ResumeBuilder.jsx';
import { useEffect } from 'react';

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
          element={
            <>
              <Navbar />
              <Pgtitle />
              <GetStartBtn />
              <ChipTabContainer />
              <StatsContainer />
              <SolutionSec />
              <Feature />
              <Faq />
              <Footer />
            </>
          }
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
      </Routes>
    </div>
  );
}

export default App;