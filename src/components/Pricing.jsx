import React from 'react';
import './Assessment.css';
import * as icons from 'lucide-react';

const Pricing = () => {
    const handleProClick = () => {
        alert("Payment Gateway coming soon!");
    };

    return (
        <div className="assessment-container">
            <h2 className="assessment-title">upgrade your career journey</h2>
            <p className="assessment-subtitle">choose the plan that fits your needs.</p>

            <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {/* Starter Plan */}
                <div className="strength-card" style={{ flex: 1, minWidth: '280px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="strength-card-header">
                        <icons.Sparkles size={24} className="strength-icon" />
                        <span className="strength-skill" style={{ fontSize: '1.5rem' }}>starter</span>
                    </div>
                    <h3 style={{ fontSize: '2.5rem', margin: '0', color: 'var(--text-primary)' }}>$0<span style={{ fontSize: '1rem', color: '#888' }}>/mo</span></h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0', flex: 1 }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}><icons.Check size={16} /> 3 career assessments</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}><icons.Check size={16} /> basic support</li>
                    </ul>
                    <button className="submit-btn" disabled style={{ opacity: 0.6, cursor: 'not-allowed', width: '100%' }}>current plan</button>
                </div>

                {/* Pro Plan */}
                <div className="strength-card" style={{ flex: 1, minWidth: '280px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: '2px solid var(--accent-primary)' }}>
                    <div className="strength-card-header">
                        <icons.Zap size={24} className="strength-icon" style={{ color: 'var(--accent-primary)' }} />
                        <span className="strength-skill" style={{ fontSize: '1.5rem', color: 'var(--accent-primary)' }}>pro</span>
                    </div>
                    <h3 style={{ fontSize: '2.5rem', margin: '0', color: 'var(--text-primary)' }}>$19<span style={{ fontSize: '1rem', color: '#888' }}>/mo</span></h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0', flex: 1 }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}><icons.Check size={16} /> unlimited assessments</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}><icons.Check size={16} /> pdf export</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}><icons.Check size={16} /> priority support</li>
                    </ul>
                    <button className="submit-btn" onClick={handleProClick} style={{ width: '100%' }}>upgrade to pro</button>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
