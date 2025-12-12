import React from 'react';
import '../components/Assessment.css';
import { Sparkles, Zap, Check } from 'lucide-react';

const Pricing = ({ id }) => {
    const handleProClick = () => {
        alert("Payment Gateway coming soon!");
    };

    return (
        <div className="assessment-container" id={id} style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(124, 58, 237, 0.08) 0%, rgba(0, 0, 0, 0) 50%)',
            paddingTop: '3rem',
            paddingBottom: '3rem'
        }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h2 className="assessment-title" style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>
                    simple, transparent pricing
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                    start free, upgrade when you need more
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
                maxWidth: '700px',
                margin: '0 auto'
            }}>
                {/* Starter Plan */}
                <div style={{
                    padding: '1.5rem',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <Sparkles size={20} style={{ color: 'var(--text-secondary)' }} />
                        <span style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)' }}>starter</span>
                        <span style={{
                            marginLeft: 'auto',
                            fontSize: '0.75rem',
                            padding: '0.2rem 0.5rem',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '4px',
                            color: 'var(--text-secondary)'
                        }}>FREE</span>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <span style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)' }}>₹0</span>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>/month</span>
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: '1.5rem' }}>
                        {['3 assessments/day', 'basic skill analysis', '1 resume template'].map((item, i) => (
                            <li key={i} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: 'var(--text-secondary)',
                                fontSize: '0.9rem',
                                marginBottom: '0.5rem'
                            }}>
                                <Check size={14} /> {item}
                            </li>
                        ))}
                    </ul>

                    <button disabled style={{
                        width: '100%',
                        padding: '0.7rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'transparent',
                        color: 'var(--text-secondary)',
                        cursor: 'not-allowed',
                        fontSize: '0.9rem'
                    }}>current plan</button>
                </div>

                {/* Pro Plan */}
                <div style={{
                    padding: '1.5rem',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.1))',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    position: 'relative'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '12px',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        color: 'white'
                    }}>POPULAR</div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <Zap size={20} style={{ color: '#8b5cf6' }} />
                        <span style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)' }}>pro</span>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <span style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)' }}>₹499</span>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>/month</span>
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: '1.5rem' }}>
                        {['unlimited assessments', 'advanced ai analysis', 'all resume templates', 'pdf export & sharing', 'priority support'].map((item, i) => (
                            <li key={i} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: 'var(--text-primary)',
                                fontSize: '0.9rem',
                                marginBottom: '0.5rem'
                            }}>
                                <Check size={14} style={{ color: '#8b5cf6' }} /> {item}
                            </li>
                        ))}
                    </ul>

                    <button onClick={handleProClick} style={{
                        width: '100%',
                        padding: '0.7rem',
                        borderRadius: '8px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        transition: 'opacity 0.2s'
                    }}>upgrade to pro</button>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
