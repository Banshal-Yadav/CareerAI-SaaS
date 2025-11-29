import React from 'react';
import Navbar from '../components/Navbar/Navbar.jsx';
import Pgtitle from '../components/PgTitle/pgTitle.jsx';
import GetStartBtn from '../components/GetStartedBtn/GetStartBtn.jsx';
import Feature from '../components/Card/Feature.jsx';
import Footer from '../components/Footer/footer.jsx';
import StatsContainer from '../components/Stats/StatsContainer.jsx';
import ChipTabContainer from '../components/Chip/ChipTabContainer.jsx';
import SolutionSec from '../components/Solution/SolutionSec.jsx';
import Pricing from './Pricing.jsx';
import Faq from "../components/Card/Faq.jsx";

const Home = () => {
    return (
        <>
            <div className="glow-overlay"></div>
            <Navbar />
            <Pgtitle />
            <GetStartBtn />
            <ChipTabContainer />
            <StatsContainer />
            <SolutionSec />
            <Feature />
            <Pricing id="pricing" />
            <Faq />
            <Footer />
        </>
    );
};

export default Home;
