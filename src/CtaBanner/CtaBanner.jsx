import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CtaBanner.css';
import bannerVisual from '../assets/cta-banner-visual.png';

const CtaBanner = () => {
    const navigate = useNavigate();

    const handleCreateResume = () => {
        // passing state to the resume builder to signal a new resume
        navigate("/resume-builder", { state: { isNew: true } });
    };

    return (
        <section className="cta-banner-section">
            <div className="cta-banner-wrapper">
                <div className="cta-text-column">
                    <h2 className="cta-title">
                        Build a Resume That <span>Gets Noticed</span>
                    </h2>
                    <p className="cta-subtitle">
                        Create a professional, ATS-friendly resume in minutes. Our tool helps you highlight your skills and experience effectively.
                    </p>
                    {/* the button triggers the new handler */}
                    <button onClick={handleCreateResume} className="cta-button">
                        Create My Resume
                    </button>
                </div>
                <div className="cta-image-column">
                    <img src={bannerVisual} alt="AI-Powered Resume Builder Visual" />
                </div>
            </div>
        </section>
    );
};

export default CtaBanner;