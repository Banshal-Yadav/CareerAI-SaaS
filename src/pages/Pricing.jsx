import React from 'react';
import '../components/Assessment.css';
import * as icons from 'lucide-react';
import ComparisonTable from '../components/Pricing/ComparisonTable';

const Pricing = ({ id }) => {
    const handleProClick = () => {
        alert("Payment Gateway coming soon!");
    };

    return (
        <div className="assessment-container" id={id} style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(124, 58, 237, 0.1) 0%, rgba(0, 0, 0, 0) 50%)',
            paddingTop: '4rem'
        }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 className="assessment-title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>upgrade your career journey</h2>
                <p className="assessment-subtitle" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)' }}>
                    unlock the full potential of AI-powered career guidance. choose the plan that fits your ambition.
                </p>
            </div>

            <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '1000px', margin: '0 auto' }}>
                {/* Starter Plan */}
                <div className="strength-card" style={{
                    flex: 1,
                    minWidth: '300px',
                    padding: '2.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                    <div className="strength-card-header">
                        <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '0.5rem', borderRadius: '8px' }}>
                            <icons.Sparkles size={24} className="strength-icon" />
                        </div>
                        <span className="strength-skill" style={{ fontSize: '1.5rem' }}>starter</span>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '3rem', margin: '0', color: 'var(--text-primary)', display: 'flex', alignItems: 'baseline' }}>
                            $0<span style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>/mo</span>
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 0 0' }}>perfect for getting started</p>
                    </div>
                    <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.1)', margin: '1rem 0' }} />
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                            <icons.Check size={18} color="var(--text-primary)" /> 3 career assessments / day
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                            <icons.Check size={18} color="var(--text-primary)" /> basic skill analysis
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                            <icons.Check size={18} color="var(--text-primary)" /> 1 resume template
                        </li>
                    </ul>
                    <button className="submit-btn" disabled style={{
                        opacity: 0.5,
                        cursor: 'not-allowed',
                        width: '100%',
                        background: 'transparent',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>current plan</button>
                </div>

                {/* Pro Plan */}
                <div className="strength-card" style={{
                    flex: 1,
                    minWidth: '300px',
                    padding: '2.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    border: '1px solid var(--accent-primary)',
                    background: 'rgba(124, 58, 237, 0.05)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'var(--accent-primary)',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                    }}>
                        MOST POPULAR
                    </div>
                    <div className="strength-card-header">
                        <div style={{ background: 'rgba(124, 58, 237, 0.2)', padding: '0.5rem', borderRadius: '8px' }}>
                            <icons.Zap size={24} className="strength-icon" style={{ color: 'var(--accent-primary)' }} />
                        </div>
                        <span className="strength-skill" style={{ fontSize: '1.5rem', color: 'var(--accent-primary)' }}>pro</span>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '3rem', margin: '0', color: 'var(--text-primary)', display: 'flex', alignItems: 'baseline' }}>
                            $19<span style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>/mo</span>
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 0 0' }}>for serious career builders</p>
                    </div>
                    <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.1)', margin: '1rem 0' }} />
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)' }}>
                            <icons.Check size={18} color="var(--accent-primary)" /> unlimited assessments
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)' }}>
                            <icons.Check size={18} color="var(--accent-primary)" /> advanced ai analysis
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)' }}>
                            <icons.Check size={18} color="var(--accent-primary)" /> all resume templates
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)' }}>
                            <icons.Check size={18} color="var(--accent-primary)" /> pdf export & sharing
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)' }}>
                            <icons.Check size={18} color="var(--accent-primary)" /> priority support
                        </li>
                    </ul>
                    <button className="submit-btn" onClick={handleProClick} style={{ width: '100%', boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)' }}>upgrade to pro</button>
                </div>
            </div>

            <ComparisonTable />

            {/* Social Proof */}
            <div style={{ marginTop: '6rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>trusted by career builders from</p>
                <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', opacity: 0.5 }}>
                    <icons.Building2 size={32} />
                    <icons.Globe size={32} />
                    <icons.Cpu size={32} />
                    <icons.Code2 size={32} />
                    <icons.Rocket size={32} />
                </div>
            </div>
        </div>
    );
};

export default Pricing;
