import React, { useEffect, useState, useContext } from 'react';
import Layout from '../components/Layout';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { TrendingUp, Timer, Zap, Shield, Crown, Check, Activity, ArrowRight } from 'lucide-react';

const TIER_THEMES = [
    {
        gradient: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
        accent: '#93c5fd',
        icon: <Zap size={20} />,
        label: 'Starter',
        shadow: 'rgba(37,99,235,0.4)',
    },
    {
        gradient: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)',
        accent: '#c4b5fd',
        icon: <Shield size={20} />,
        label: 'Growth',
        shadow: 'rgba(124,58,237,0.4)',
    },
    {
        gradient: 'linear-gradient(135deg, #78350f 0%, #d97706 100%)',
        accent: '#fde68a',
        icon: <Crown size={20} />,
        label: 'Elite',
        shadow: 'rgba(217,119,6,0.4)',
    },
    {
        gradient: 'linear-gradient(135deg, #064e3b 0%, #059669 100%)',
        accent: '#6ee7b7',
        icon: <TrendingUp size={20} />,
        label: 'Premium',
        shadow: 'rgba(5,150,105,0.4)',
    },
];

const Plan = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState({ text: '', type: '' });
    const [buying, setBuying] = useState(null);
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => { fetchPlans(); }, []);

    const fetchPlans = async () => {
        try {
            const res = await api.get('/invest/plans');
            setPlans(res.data);
        } finally {
            setLoading(false);
        }
    };

    const handleBuy = async (index) => {
        setBuying(index);
        try {
            await api.post('/invest/purchase', { planIndex: index });
            setMsg({ text: 'Investment Activated!', type: 'success' });
            const profile = await api.get('/user/profile');
            setUser(profile.data);
        } catch (err) {
            setMsg({ text: err.response?.data?.message || 'Activation Failed', type: 'error' });
        }
        setBuying(null);
        setTimeout(() => setMsg({ text: '', type: '' }), 3000);
    };

    return (
        <Layout title="Investment Plans">
            {/* Balance and Info bar */}
            <div className="mb-6 flex justify-between items-end">
                <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                    Select a plan to earn daily
                </p>
                <div className="text-right">
                    <p style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>Balance</p>
                    <p className="text-xl font-black text-royal-blue">&#8377;{user?.walletBalance?.toLocaleString() || '0'}</p>
                </div>
            </div>

            {/* Notification */}
            {msg.text && (
                <div style={{
                    padding: '14px 16px', borderRadius: '16px', marginBottom: '20px',
                    display: 'flex', alignItems: 'center', gap: '12px',
                    background: msg.type === 'success' ? '#f0fdf4' : '#fef2f2',
                    border: `1px solid ${msg.type === 'success' ? '#bbf7d0' : '#fecaca'}`,
                    color: msg.type === 'success' ? '#15803d' : '#dc2626',
                    fontSize: '13px', fontWeight: 700,
                }}>
                    <div style={{
                        width: '32px', height: '32px', borderRadius: '10px', flexShrink: 0,
                        background: msg.type === 'success' ? '#22c55e' : '#ef4444',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                    }}>
                        {msg.type === 'success' ? <Check size={16} /> : <Activity size={16} />}
                    </div>
                    {msg.text}
                </div>
            )}

            {/* Skeletons */}
            {loading && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[1, 2, 3].map(i => (
                        <div key={i} style={{ height: '240px', background: '#f1f5f9', borderRadius: '24px', animation: 'pulse 1.5s infinite' }} />
                    ))}
                </div>
            )}

            {/* Plan Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '24px' }}>
                {plans.map((plan, index) => {
                    const theme = TIER_THEMES[index % TIER_THEMES.length];
                    const roiPercent = ((plan.daily / plan.amount) * 100).toFixed(1);
                    const totalProfit = plan.daily * 99;

                    return (
                        <div
                            key={index}
                            style={{
                                background: theme.gradient,
                                borderRadius: '24px',
                                boxShadow: `0 16px 40px -8px ${theme.shadow}`,
                                padding: '20px',
                            }}
                        >
                            {/* Top Row: Icon + Name + ROI Badge */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{
                                        width: '44px', height: '44px', borderRadius: '14px', flexShrink: 0,
                                        background: 'rgba(255,255,255,0.18)',
                                        border: '1px solid rgba(255,255,255,0.25)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                                    }}>
                                        {theme.icon}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '18px', fontWeight: 900, color: 'white', lineHeight: 1 }}>{plan.name}</div>
                                        <div style={{ fontSize: '10px', fontWeight: 700, color: theme.accent, marginTop: '5px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                            Tier {index + 1} &bull; {theme.label}
                                        </div>
                                    </div>
                                </div>
                                {/* ROI Badge */}
                                <div style={{
                                    background: 'rgba(0,0,0,0.22)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    borderRadius: '14px', padding: '8px 12px', textAlign: 'center',
                                }}>
                                    <div style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Daily ROI</div>
                                    <div style={{ fontSize: '18px', fontWeight: 900, color: theme.accent, lineHeight: 1.2 }}>{roiPercent}%</div>
                                </div>
                            </div>

                            {/* Stats Row */}
                            <div style={{
                                display: 'grid', gridTemplateColumns: '1fr 1px 1fr 1px 1fr',
                                background: 'rgba(0,0,0,0.18)',
                                borderRadius: '16px', padding: '12px 14px',
                                marginBottom: '14px', alignItems: 'center',
                            }}>
                                <div>
                                    <div style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '3px' }}>Invest</div>
                                    <div style={{ fontSize: '15px', fontWeight: 900, color: 'white' }}>&#8377;{plan.amount.toLocaleString()}</div>
                                </div>
                                <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)', alignSelf: 'stretch', margin: '0 4px' }} />
                                <div style={{ paddingLeft: '8px' }}>
                                    <div style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '3px' }}>Daily</div>
                                    <div style={{ fontSize: '15px', fontWeight: 900, color: theme.accent }}>&#8377;{plan.daily.toLocaleString()}</div>
                                </div>
                                <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)', alignSelf: 'stretch', margin: '0 4px' }} />
                                <div style={{ paddingLeft: '8px' }}>
                                    <div style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '3px' }}>Total</div>
                                    <div style={{ fontSize: '15px', fontWeight: 900, color: '#6ee7b7' }}>&#8377;{totalProfit.toLocaleString()}</div>
                                </div>
                            </div>

                            {/* Duration Row */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <Timer size={11} color="rgba(255,255,255,0.4)" />
                                    <span style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>99 Days</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <TrendingUp size={11} color={theme.accent} />
                                    <span style={{ fontSize: '10px', fontWeight: 800, color: theme.accent, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                        &#8377;{(totalProfit - plan.amount).toLocaleString()} Profit
                                    </span>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <button
                                onClick={() => handleBuy(index)}
                                disabled={buying === index}
                                style={{
                                    width: '100%', height: '50px', borderRadius: '14px',
                                    background: 'rgba(255,255,255,0.96)', border: 'none',
                                    cursor: buying === index ? 'not-allowed' : 'pointer',
                                    fontWeight: 900, fontSize: '12px',
                                    letterSpacing: '0.1em', textTransform: 'uppercase',
                                    color: '#1e293b',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                    boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                                    transition: 'transform 0.15s, opacity 0.15s',
                                    opacity: buying === index ? 0.65 : 1,
                                }}
                                onTouchStart={e => e.currentTarget.style.transform = 'scale(0.97)'}
                                onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                {buying === index
                                    ? 'Activating...'
                                    : <><span>Activate Plan</span><ArrowRight size={14} /></>
                                }
                            </button>
                        </div>
                    );
                })}
            </div>
        </Layout>
    );
};

export default Plan;
