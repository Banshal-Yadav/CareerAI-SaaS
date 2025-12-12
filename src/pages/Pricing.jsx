import React from 'react';
import './Pricing.css';
import { Check, X, ArrowRight } from 'lucide-react';

const Pricing = ({ id }) => {
    const handleProClick = () => {
        alert("Payment Gateway coming soon!");
    };

    return (
        <div className="pricing-page" id={id}>
            <div className="pricing-hero">
                <span className="pricing-label">PRICING</span>
                <h1 className="pricing-headline">
                    Choose<br />
                    <span className="highlight">Your Plan</span>
                </h1>
            </div>

            <div className="pricing-cards-wrapper">
                <div className="plan-card free">
                    <div className="plan-number">01</div>
                    <h2 className="plan-name">Starter</h2>
                    <div className="plan-price">
                        <span className="amount">₹0</span>
                        <span className="period">/month</span>
                    </div>
                    <p className="plan-desc">Perfect for exploring career paths</p>
                    <ul className="plan-features">
                        <li><Check size={18} /> 3 assessments per day</li>
                        <li><Check size={18} /> 10 assessments stored</li>
                        <li><Check size={18} /> 3 bookmarks</li>
                        <li><Check size={18} /> 3 resumes</li>
                        <li><Check size={18} /> Basic AI analysis</li>
                        <li className="disabled"><X size={18} /> Priority support</li>
                    </ul>
                    <button className="plan-btn outline" disabled>Current Plan</button>
                </div>

                <div className="plan-card pro">
                    <div className="plan-badge">POPULAR</div>
                    <div className="plan-number">02</div>
                    <h2 className="plan-name">Pro</h2>
                    <div className="plan-price">
                        <span className="amount">₹499</span>
                        <span className="period">/month</span>
                    </div>
                    <p className="plan-desc">For serious career builders</p>
                    <ul className="plan-features">
                        <li><Check size={18} /> Unlimited assessments</li>
                        <li><Check size={18} /> Unlimited storage</li>
                        <li><Check size={18} /> Unlimited bookmarks</li>
                        <li><Check size={18} /> Unlimited resumes</li>
                        <li><Check size={18} /> Advanced AI analysis</li>
                        <li><Check size={18} /> Priority support</li>
                    </ul>
                    <button className="plan-btn solid" onClick={handleProClick}>
                        Get Pro <ArrowRight size={18} />
                    </button>
                </div>
            </div>

            <div className="compare-section">
                <h3 className="compare-title">Compare</h3>
                <div className="compare-grid">
                    <div className="compare-row header">
                        <span>Feature</span>
                        <span>Starter</span>
                        <span>Pro</span>
                    </div>
                    <div className="compare-row">
                        <span>Assessments/day</span>
                        <span>3</span>
                        <span className="pro-value">Unlimited</span>
                    </div>
                    <div className="compare-row">
                        <span>Storage</span>
                        <span>10</span>
                        <span className="pro-value">Unlimited</span>
                    </div>
                    <div className="compare-row">
                        <span>Bookmarks</span>
                        <span>3</span>
                        <span className="pro-value">Unlimited</span>
                    </div>
                    <div className="compare-row">
                        <span>AI Analysis</span>
                        <span>Basic</span>
                        <span className="pro-value">Advanced</span>
                    </div>
                    <div className="compare-row">
                        <span>Priority Support</span>
                        <span><X size={16} className="no" /></span>
                        <span><Check size={16} className="yes" /></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
