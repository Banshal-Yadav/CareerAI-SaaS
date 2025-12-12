import React from 'react';
import './Pricing.css';
import { Sparkles, Zap, Check, X } from 'lucide-react';

const Pricing = ({ id }) => {
    const handleProClick = () => {
        alert("Payment Gateway coming soon!");
    };

    const features = [
        { name: 'Assessments per day', free: '3', pro: 'Unlimited' },
        { name: 'Assessments stored', free: '10', pro: 'Unlimited' },
        { name: 'Bookmarked assessments', free: '3', pro: 'Unlimited' },
        { name: 'Resumes stored', free: '3', pro: 'Unlimited' },
        { name: 'PDF export', free: true, pro: true },
        { name: 'AI career analysis', free: 'Basic', pro: 'Advanced' },
        { name: 'Priority support', free: false, pro: true },
    ];

    return (
        <div className="pricing-section" id={id}>
            <div className="pricing-container">
                <div className="pricing-header">
                    <h2 className="pricing-title">simple, transparent pricing</h2>
                    <p className="pricing-subtitle">start free, upgrade when you need more</p>
                </div>

                <div className="pricing-cards">
                    <div className="pricing-card">
                        <div className="card-badge free-badge">FREE</div>
                        <div className="card-header">
                            <Sparkles size={24} className="card-icon" />
                            <h3>Starter</h3>
                        </div>
                        <div className="card-price">
                            <span className="price">₹0</span>
                            <span className="period">/month</span>
                        </div>
                        <p className="card-description">Perfect for exploring career options</p>
                        <ul className="feature-list">
                            <li><Check size={16} /> 3 assessments per day</li>
                            <li><Check size={16} /> 10 assessments stored</li>
                            <li><Check size={16} /> 3 bookmarks</li>
                            <li><Check size={16} /> 3 resumes</li>
                            <li><Check size={16} /> Basic AI analysis</li>
                        </ul>
                        <button className="card-btn disabled" disabled>Current Plan</button>
                    </div>

                    <div className="pricing-card featured">
                        <div className="glow-effect"></div>
                        <div className="card-badge pro-badge">POPULAR</div>
                        <div className="card-header">
                            <Zap size={24} className="card-icon" />
                            <h3>Pro</h3>
                        </div>
                        <div className="card-price">
                            <span className="price">₹499</span>
                            <span className="period">/month</span>
                        </div>
                        <p className="card-description">For serious career builders</p>
                        <ul className="feature-list">
                            <li><Check size={16} /> Unlimited assessments</li>
                            <li><Check size={16} /> Unlimited storage</li>
                            <li><Check size={16} /> Unlimited bookmarks</li>
                            <li><Check size={16} /> Unlimited resumes</li>
                            <li><Check size={16} /> Advanced AI analysis</li>
                            <li><Check size={16} /> Priority support</li>
                        </ul>
                        <button className="card-btn primary" onClick={handleProClick}>Upgrade to Pro</button>
                    </div>
                </div>

                <div className="comparison-table">
                    <h3 className="table-title">Compare Plans</h3>
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Feature</th>
                                    <th>Starter</th>
                                    <th>Pro</th>
                                </tr>
                            </thead>
                            <tbody>
                                {features.map((feature, i) => (
                                    <tr key={i}>
                                        <td>{feature.name}</td>
                                        <td>
                                            {typeof feature.free === 'boolean'
                                                ? (feature.free ? <Check size={16} className="check" /> : <X size={16} className="cross" />)
                                                : feature.free
                                            }
                                        </td>
                                        <td className="pro-cell">
                                            {typeof feature.pro === 'boolean'
                                                ? (feature.pro ? <Check size={16} className="check" /> : <X size={16} className="cross" />)
                                                : feature.pro
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
