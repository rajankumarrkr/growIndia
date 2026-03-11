import React, { useEffect, useState, useContext } from 'react';
import Layout from '../components/Layout';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { TrendingUp, Timer, Zap, Shield, Crown, Check, Activity, ArrowRight } from 'lucide-react';

// Per-tier visual themes
const TIER_THEMES = [
    {
        gradient: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 60%, #3b82f6 100%)',
        accent: '#93c5fd',
        icon: <Zap size={22} />,
        label: 'Starter',
        shadow: 'rgba(37,99,235,0.45)',
    },
    {
        gradient: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 60%, #a855f7 100%)',
        accent: '#c4b5fd',
        icon: <Shield size={22} />,
        label: 'Growth',
        shadow: 'rgba(124,58,237,0.45)',
    },
    {
        gradient: 'linear-gradient(135deg, #78350f 0%, #d97706 55%, #fbbf24 100%)',
        accent: '#fde68a',
        icon: <Crown size={22} />,
        label: 'Elite',
        shadow: 'rgba(217,119,6,0.45)',
    },
    {
        gradient: 'linear-gradient(135deg, #064e3b 0%, #059669 55%, #34d399 100%)',
        accent: '#6ee7b7',
        icon: <TrendingUp size={22} />,
        label: 'Premium',
        shadow: 'rgba(5,150,105,0.45)',
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
            setMsg({ text: 'Investment Activated Successfully!', type: 'success' });
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
            {/* Header */}
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Investment Plans</h1>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Select a plan to earn daily returns</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Balance</p>
                    <p className="text-xl font-black text-royal-blue">&#8377;{user?.walletBalance?.toLocaleString() || '0'}</p>
                </div>
            </div>

            {/* Notification */}
            {msg.text && (
                <div className={`p-4 rounded-2xl mb-6 flex items-center gap-3 border text-sm font-bold
                    ${msg.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-red-50 border-red-100 text-red-600'}`}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white flex-shrink-0 ${msg.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}>
                        {msg.type === 'success' ? <Check size={16} /> : <Activity size={16} />}
                    </div>
                    {msg.text}
                </div>
            )}

            {/* Skeletons */}
            {loading && (
                <div className="space-y-5">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-72 bg-slate-100 rounded-[2rem] animate-pulse" />
                    ))}
                </div>
            )}

            {/* Plan Cards */}
            <div className="space-y-6 pb-6">
                {plans.map((plan, index) => {
                    const theme = TIER_THEMES[index % TIER_THEMES.length];
                    const roiPercent = ((plan.daily / plan.amount) * 100).toFixed(1);
                    const totalProfit = plan.daily * 99;
                    const profitPercent = (((totalProfit - plan.amount) / plan.amount) * 100).toFixed(0);

                    return (
                        <div
                            key={index}
                            style={{
                                background: theme.gradient,
                                borderRadius: '28px',
                                boxShadow: `0 20px 50px -10px ${theme.shadow}`,
                                overflow: 'hidden',
                                position: 'relative',
                            }}
                        >
                            {/* Decorative circles */}
                            <div style={{
                                position: 'absolute', top: '-50px', right: '-50px',
                                width: '200px', height: '200px', borderRadius: '50%',
                                background: 'rgba(255,255,255,0.06)', pointerEvents: 'none',
                            }} />
                            <div style={{
                                position: 'absolute', bottom: '-40px', left: '-20px',
                                width: '140px', height: '140px', borderRadius: '50%',
                                background: 'rgba(255,255,255,0.04)', pointerEvents: 'none',
                            }} />

                            <div style={{ padding: '24px', position: 'relative' }}>
                                {/* Top Row */}
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{
                                            width: '48px', height: '48px', borderRadius: '16px',
                                            background: 'rgba(255,255,255,0.15)',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: 'white',
                                        }}>
                                            {theme.icon}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '20px', fontWeight: 900, color: 'white', lineHeight: 1 }}>{plan.name}</div>
                                            <div style={{ fontSize: '10px', fontWeight: 700, color: theme.accent, marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                                                Tier {index + 1} &bull; {theme.label}
                                            </div>
                                        </div>
                                    </div>

                                    {/* ROI Badge */}
                                    <div style={{
                                        background: 'rgba(0,0,0,0.25)',
                                        border: '1px solid rgba(255,255,255,0.15)',
                                        borderRadius: '16px',
                                        padding: '8px 14px',
                                        textAlign: 'center',
                                    }}>
                                        <div style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Daily ROI</div>
                                        <div style={{ fontSize: '20px', fontWeight: 900, color: theme.accent, lineHeight: 1.2 }}>{roiPercent}%</div>
                                    </div>
                                </div>

                                {/* Stats Row */}
                                <div style={{
                                    display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                                    gap: '8px', marginBottom: '18px',
                                    background: 'rgba(0,0,0,0.2)',
                                    borderRadius: '18px', padding: '14px',
                                }}>
                                    <div>
                                        <div style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Invest</div>
                                        <div style={{ fontSize: '16px', fontWeight: 900, color: 'white' }}>&#8377;{plan.amount.toLocaleString()}</div>
                                    </div>
                                    <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '12px' }}>
                                        <div style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Daily</div>
                                        <div style={{ fontSize: '16px', fontWeight: 900, color: theme.accent }}>&#8377;{plan.daily.toLocaleString()}</div>
                                    </div>
                                    <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '12px' }}>
                                        <div style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Total</div>
                                        <div style={{ fontSize: '16px', fontWeight: 900, color: '#6ee7b7' }}>&#8377;{totalProfit.toLocaleString()}</div>
                                    </div>
                                </div>

                                {/* Duration & Profit */}
                                <div style={{ marginBottom: '18px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Timer size={11} color="rgba(255,255,255,0.4)" />
                                            <span style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>99 Days</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <TrendingUp size={11} color={theme.accent} />
                                            <span style={{ fontSize: '10px', fontWeight: 800, color: theme.accent, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                                {profitPercent}% Profit
                                            </span>
                                        </div>
                                    </div>
                                    {/* Glowing progress bar */}
                                    <div style={{ height: '4px', borderRadius: '99px', background: 'rgba(255,255,255,0.12)' }}>
                                        <div style={{ height: '100%', borderRadius: '99px', width: '100%', background: theme.accent, boxShadow: `0 0 10px ${theme.accent}` }} />
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <button
                                    onClick={() => handleBuy(index)}
                                    disabled={buying === index}
                                    style={{
                                        width: '100%', height: '54px', borderRadius: '16px',
                                        background: 'rgba(255,255,255,0.95)',
                                        border: 'none', cursor: buying === index ? 'not-allowed' : 'pointer',
                                        fontWeight: 900, fontSize: '13px',
                                        letterSpacing: '0.12em', textTransform: 'uppercase',
                                        color: '#1e293b',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                        boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                                        transition: 'transform 0.15s, opacity 0.15s',
                                        opacity: buying === index ? 0.7 : 1,
                                    }}
                                    onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
                                    onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                                    onTouchStart={e => e.currentTarget.style.transform = 'scale(0.97)'}
                                    onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    {buying === index
                                        ? <span style={{ opacity: 0.7 }}>Activating...</span>
                                        : <><span>Activate Plan</span><ArrowRight size={15} /></>
                                    }
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Layout>
    );
};

export default Plan;
