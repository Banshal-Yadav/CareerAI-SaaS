import React from 'react';
import * as icons from 'lucide-react';

const ComparisonTable = () => {
    const features = [
        { name: 'Career Assessments', starter: '3 / day', pro: 'Unlimited' },
        { name: 'AI Career Analysis', starter: 'Basic', pro: 'Advanced' },
        { name: 'Resume Builder', starter: '1 Template', pro: 'All Templates' },
        { name: 'PDF Downloads', starter: <icons.X size={18} color="#ef4444" />, pro: <icons.Check size={18} color="#22c55e" /> },
        { name: 'Priority Support', starter: <icons.X size={18} color="#ef4444" />, pro: <icons.Check size={18} color="#22c55e" /> },
        { name: 'Skill Roadmap', starter: 'Standard', pro: 'Personalized' },
    ];

    return (
        <div style={{
            marginTop: '4rem',
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 24px -1px rgba(0, 0, 0, 0.2)'
        }}>
            <h3 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>compare plans</h3>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                            <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--text-secondary)' }}>feature</th>
                            <th style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-primary)', fontSize: '1.2rem' }}>starter</th>
                            <th style={{ textAlign: 'center', padding: '1rem', color: 'var(--accent-primary)', fontSize: '1.2rem' }}>pro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {features.map((feature, index) => (
                            <tr key={index} style={{ borderBottom: index !== features.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none' }}>
                                <td style={{ padding: '1rem', color: 'var(--text-primary)' }}>{feature.name}</td>
                                <td style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-secondary)' }}>{feature.starter}</td>
                                <td style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-primary)', fontWeight: '500' }}>{feature.pro}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ComparisonTable;
