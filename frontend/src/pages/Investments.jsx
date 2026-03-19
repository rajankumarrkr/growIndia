import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../api/axios';
import { Activity, Zap, Timer, TrendingUp, Layers, ArrowRight } from 'lucide-react';

const Investments = () => {
    const [investments, setInvestments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInvestments();
    }, []);

    const fetchInvestments = async () => {
        try {
            const res = await api.get('/invest/my-investments');
            setInvestments(res.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout title="Active Plan">
            <div className="mb-10 px-2">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Active Portfolio</h1>
                <p className="text-label mt-1">Real-time status of your staked assets</p>
            </div>

            {loading ? (
                <div className="space-y-6">
                    {[1, 2].map(i => (
                        <div key={i} className="h-48 bg-slate-50 border border-slate-100 rounded-[2.5rem] animate-pulse"></div>
                    ))}
                </div>
            ) : investments.length === 0 ? (
                <div className="fintech-card flex flex-col items-center justify-center p-12 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-6">
                        <Layers size={32} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">No Active Plan</h3>
                    <p className="text-label mb-8">You haven't activated any investment protocols yet.</p>
                    <a href="/plan" className="btn-fintech btn-fintech-primary px-8 py-3 text-xs uppercase tracking-widest inline-flex items-center gap-2">
                        Get Started <ArrowRight size={14} />
                    </a>
                </div>
            ) : (
                <div className="space-y-6">
                    {investments.map((inv, i) => {
                        const progress = ((99 - inv.daysRemaining) / 99) * 100;
                        const isCompleted = inv.status === 'completed';
                        
                        return (
                            <div key={i} style={{
                                background: isCompleted 
                                    ? 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
                                    : 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 60%, #3b82f6 100%)',
                                borderRadius: '28px',
                                padding: '24px',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: isCompleted ? '0 10px 30px rgba(0,0,0,0.02)' : '0 20px 50px -10px rgba(37,99,235,0.4)',
                                border: `1px solid ${isCompleted ? '#e2e8f0' : 'rgba(255,255,255,0.1)'}`,
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                cursor: 'default'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = isCompleted ? '0 10px 30px rgba(0,0,0,0.05)' : '0 24px 60px -10px rgba(37,99,235,0.5)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = isCompleted ? '0 10px 30px rgba(0,0,0,0.02)' : '0 20px 50px -10px rgba(37,99,235,0.4)'; }}
                            >
                                {/* Background design grid overlay for active plans */}
                                {!isCompleted && (
                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, pointerEvents: 'none' }}>
                                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                            <defs>
                                                <pattern id={`grid-${i}`} width="40" height="40" patternUnits="userSpaceOnUse">
                                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                                                </pattern>
                                            </defs>
                                            <rect width="100%" height="100%" fill={`url(#grid-${i})`} />
                                        </svg>
                                    </div>
                                )}

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
                                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                                        <div style={{
                                            width: '52px', height: '52px', borderRadius: '16px',
                                            background: isCompleted ? '#f1f5f9' : 'rgba(255,255,255,0.15)',
                                            color: isCompleted ? '#94a3b8' : 'white',
                                            border: `1px solid ${isCompleted ? '#e2e8f0' : 'rgba(255,255,255,0.2)'}`,
                                            display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center',
                                            boxShadow: isCompleted ? 'none' : '0 8px 16px rgba(0,0,0,0.1)'
                                        }}>
                                            {isCompleted ? <Layers size={24} /> : <Zap size={24} />}
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: '18px', fontWeight: 900, color: isCompleted ? '#475569' : 'white', letterSpacing: '-0.3px', lineHeight: 1 }}>
                                                {inv.planName}
                                            </h3>
                                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '6px', background: isCompleted ? 'transparent' : 'rgba(255,255,255,0.1)', padding: isCompleted ? '0' : '3px 8px', borderRadius: '10px' }}>
                                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: isCompleted ? '#cbd5e1' : '#4ade80', boxShadow: isCompleted ? 'none' : '0 0 10px rgba(74,222,128,0.5)' }} />
                                                <span style={{ fontSize: '10px', fontWeight: 800, color: isCompleted ? '#94a3b8' : '#4ade80', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                                    {isCompleted ? 'Completed' : 'Active'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontSize: '10px', fontWeight: 800, color: isCompleted ? '#94a3b8' : 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>Daily ROI</p>
                                        <p style={{ fontSize: '20px', fontWeight: 900, color: isCompleted ? '#cbd5e1' : '#fff', letterSpacing: '-0.5px' }}>+₹{inv.dailyReturn}</p>
                                    </div>
                                </div>

                                <div style={{ 
                                    background: isCompleted ? 'white' : 'rgba(255,255,255,0.1)', 
                                    border: `1px solid ${isCompleted ? '#f1f5f9' : 'rgba(255,255,255,0.15)'}`,
                                    borderRadius: '20px', padding: '16px 20px', marginBottom: '20px',
                                    display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center',
                                    position: 'relative', zIndex: 1, backdropFilter: isCompleted ? 'none' : 'blur(10px)'
                                }}>
                                    <div>
                                        <p style={{ fontSize: '10px', fontWeight: 800, color: isCompleted ? '#94a3b8' : 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Deposit</p>
                                        <p style={{ fontSize: '18px', fontWeight: 900, color: isCompleted ? '#64748b' : 'white' }}>₹{inv.amountInvested.toLocaleString()}</p>
                                    </div>
                                    <div style={{ width: '1px', height: '30px', background: isCompleted ? '#f1f5f9' : 'rgba(255,255,255,0.2)' }} />
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontSize: '10px', fontWeight: 800, color: isCompleted ? '#94a3b8' : 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Total Earned</p>
                                        <p style={{ fontSize: '18px', fontWeight: 900, color: isCompleted ? '#64748b' : 'white' }}>₹{(inv.dailyReturn * (99 - inv.daysRemaining)).toLocaleString()}</p>
                                    </div>
                                </div>

                                <div style={{ position: 'relative', zIndex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Timer size={12} color={isCompleted ? '#94a3b8' : 'rgba(255,255,255,0.7)'} />
                                            <span style={{ fontSize: '11px', fontWeight: 800, color: isCompleted ? '#94a3b8' : 'white' }}>
                                                {inv.daysRemaining} Days Left
                                            </span>
                                        </div>
                                        <span style={{ fontSize: '12px', fontWeight: 900, color: isCompleted ? '#64748b' : 'white' }}>{Math.round(progress)}%</span>
                                    </div>
                                    <div style={{ width: '100%', height: '8px', background: isCompleted ? '#f1f5f9' : 'rgba(0,0,0,0.2)', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div
                                            style={{
                                                height: '100%',
                                                background: isCompleted ? '#cbd5e1' : 'white',
                                                width: `${progress}%`,
                                                borderRadius: '4px',
                                            }}
                                        />
                                    </div>
                                    
                                    <div style={{ marginTop: '16px', borderTop: `1px dashed ${isCompleted ? '#e2e8f0' : 'rgba(255,255,255,0.2)'}`, paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <p style={{ fontSize: '10px', fontWeight: 700, color: isCompleted ? '#94a3b8' : 'rgba(255,255,255,0.7)' }}>
                                            Started: {new Date(inv.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Activity size={12} color={isCompleted ? '#94a3b8' : 'white'} />
                                            <span style={{ fontSize: '10px', fontWeight: 800, color: isCompleted ? '#94a3b8' : 'white', textTransform: 'uppercase' }}>Tracking Info</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </Layout>
    );
};

export default Investments;
