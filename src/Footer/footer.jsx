import "./footer.css"

const Footer = () => {
    return(
       <footer className="footer-container">
         <div className="footer-infographic">
            <div className="info-block">
                <h2 className="big-text">50+</h2>
                <p className="label-text">CAREER PATHS</p>
            </div>
            <div className="info-divider"></div>
            <div className="info-block">
                <h2 className="big-text">AI</h2>
                <p className="label-text">POWERED INSIGHTS</p>
            </div>
         </div>

         <div className="footer-content">
            <div className="ftr-div">
                <h3 className="info">Explore</h3>
                <p>Skill Assessment</p>
                <p>Career Advice</p>
                <p>Learning Resources</p>
            </div>
            <div className="ftr-div">
                <h3 className="info">Resources</h3>
                <p>Roadmaps & Guides</p>
                <p>Interview Tips</p>
                <p>FAQs</p>
            </div>
            <div className="ftr-div">
                <h3 className="info">Connect</h3>
                <p>support@aicareerguide.com</p>
                <div className="social-links">
                    <span>LinkedIn</span>
                    <span>Twitter (X)</span>
                </div>
            </div>
        </div>
        
        <div className="footer-bottom">
            <p>&copy; 2025 AI Career Guide. Decoding the future of work.</p>
        </div>
    </footer>
    );    
}
export default Footer;