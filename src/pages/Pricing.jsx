import React from 'react';
import '../components/Assessment.css';
import { Sparkles, Zap, Check } from 'lucide-react';

const Pricing = ({ id }) => {
    const handleProClick = () => {
        alert("Payment Gateway coming soon!");
    };

    return (
        <div className="assessment-container" id={id} style={{
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
                <div style={{
                    padding: '1.5rem',
                    borderRadius: '12px',
                    background: '#1a1a1a',
                    border: '1px solid #2a2a2a'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <Sparkles size={20} style={{ color: '#888' }} />
                        <span style={{ fontSize: '1.1rem', fontWeight: '600', color: '#fff' }}>starter</span>
                        <span style={{
                            marginLeft: 'auto',
                            fontSize: '0.75rem',
                            padding: '0.2rem 0.5rem',
                            background: '#2a2a2a',
                            borderRadius: '4px',
                            color: '#888'
                        }}>FREE</span>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <span style={{ fontSize: '2rem', fontWeight: '700', color: '#fff' }}>₹0</span>
                        <span style={{ color: '#888', fontSize: '0.9rem' }}>/month</span>
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: '1.5rem' }}>
                        {['3 assessments/day', 'basic skill analysis', '1 resume template'].map((item, i) => (
                            <li key={i} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: '#888',
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
                        border: '1px solid #333',
                        background: 'transparent',
                        color: '#666',
                        cursor: 'not-allowed',
                        fontSize: '0.9rem'
                    }}>current plan</button>
                </div>

                <div style={{
                    padding: '1.5rem',
                    borderRadius: '12px',
                    background: '#1a1a1a',
                    border: '1px solid #444',
                    position: 'relative'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '12px',
                        background: '#fff',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        color: '#000'
                    }}>POPULAR</div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <Zap size={20} style={{ color: '#fff' }} />
                        <span style={{ fontSize: '1.1rem', fontWeight: '600', color: '#fff' }}>pro</span>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <span style={{ fontSize: '2rem', fontWeight: '700', color: '#fff' }}>₹499</span>
                        <span style={{ color: '#888', fontSize: '0.9rem' }}>/month</span>
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: '1.5rem' }}>
                        {['unlimited assessments', 'advanced ai analysis', 'all resume templates', 'pdf export & sharing', 'priority support'].map((item, i) => (
                            <li key={i} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: '#ccc',
                                fontSize: '0.9rem',
                                marginBottom: '0.5rem'
                            }}>
                                <Check size={14} style={{ color: '#fff' }} /> {item}
                            </li>
                        ))}
                    </ul>

                    <button onClick={handleProClick} style={{
                        width: '100%',
                        padding: '0.7rem',
                        borderRadius: '8px',
                        border: 'none',
                        background: '#fff',
                        color: '#000',
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
