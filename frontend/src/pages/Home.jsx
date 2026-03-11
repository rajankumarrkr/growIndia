import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ArrowDownRight, ArrowUpRight, Target, CreditCard, CheckCircle, Layers, X, TrendingUp, ShieldCheck, Users, Zap, ArrowRight, History } from 'lucide-react';
import api from '../api/axios';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showRecharge, setShowRecharge] = useState(false);
    const [amount, setAmount] = useState('');
    const [utr, setUtr] = useState('');
    const [screenshot, setScreenshot] = useState('');
    const [msg, setMsg] = useState('');
    const [depositInfo, setDepositInfo] = useState({ upiId: 'Loading...', qrCode: '' });

    useEffect(() => {
        if (showRecharge) {
            api.get('/wallet/deposit-info').then(res => setDepositInfo(res.data)).catch(() => {});
        }
    }, [showRecharge]);

    const handleScreenshotUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setScreenshot(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleCopyUpi = () => {
        navigator.clipboard.writeText(depositInfo.upiId);
        setMsg('UPI ID Copied!');
        setTimeout(() => setMsg(''), 2000);
    };

    const handleRecharge = async (e) => {
        e.preventDefault();
        if (!screenshot) { setMsg('Please upload payment screenshot'); setTimeout(() => setMsg(''), 2000); return; }
        try {
            await api.post('/wallet/recharge', { amount, utr, screenshot });
            setMsg('Deposit Request Submitted!');
            setTimeout(() => { setShowRecharge(false); setMsg(''); setAmount(''); setUtr(''); setScreenshot(''); }, 2500);
        } catch (err) {
            setMsg(err.response?.data?.message || 'Submission Failed');
        }
    };

    const getTimeGreeting = () => {
        const h = new Date().getHours();
        if (h < 12) return 'Good Morning';
        if (h < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    const quickActions = [
        { label: 'Deposit', icon: <ArrowDownRight size={22} />, color: '#2563eb', bg: '#eff6ff', onClick: () => setShowRecharge(true) },
        { label: 'Withdraw', icon: <ArrowUpRight size={22} />, color: '#7c3aed', bg: '#f5f3ff', onClick: () => navigate('/wallet') },
        { label: 'Invest', icon: <Target size={22} />, color: '#059669', bg: '#f0fdf4', onClick: () => navigate('/plan') },
        { label: 'History', icon: <History size={22} />, color: '#d97706', bg: '#fffbeb', onClick: () => navigate('/history') },
    ];

    const featureCards = [
        { title: 'Daily Returns', sub: 'Earn every 24 hours', icon: <TrendingUp size={18} />, color: '#2563eb', bg: '#eff6ff' },
        { title: 'Secure Vault', sub: 'Bank-grade security', icon: <ShieldCheck size={18} />, color: '#059669', bg: '#f0fdf4' },
        { title: 'Referral Bonus', sub: 'Invite & earn more', icon: <Users size={18} />, color: '#7c3aed', bg: '#f5f3ff' },
        { title: 'Instant Credit', sub: 'Auto ROI daily', icon: <Zap size={18} />, color: '#d97706', bg: '#fffbeb' },
    ];

    return (
        <Layout title="Dashboard">
            {/* Greeting */}
            <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                    {getTimeGreeting()}
                </p>
                <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', lineHeight: 1.2, marginTop: '4px' }}>
                    {user?.name?.split(' ')[0] || 'Investor'} 👋
                </h1>
            </div>

            {/* Balance Card */}
            <div style={{
                background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 60%, #3b82f6 100%)',
                borderRadius: '24px',
                padding: '24px',
                marginBottom: '20px',
                boxShadow: '0 20px 50px -10px rgba(37,99,235,0.45)',
            }}>
                <p style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>
                    Total Wallet Balance
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '20px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 400, color: 'rgba(255,255,255,0.5)' }}>&#8377;</span>
                    <span style={{ fontSize: '38px', fontWeight: 900, color: 'white', lineHeight: 1, letterSpacing: '-1px' }}>
                        {user?.walletBalance?.toLocaleString('en-IN') || '0'}
                    </span>
                </div>
                <div style={{ display: 'flex', gap: '0', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '18px' }}>
                    <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Account</p>
                        <p style={{ fontSize: '13px', fontWeight: 800, color: 'white', wordBreak: 'break-all' }}>{user?.mobile || '—'}</p>
                    </div>
                    <div style={{ flex: 1, paddingLeft: '16px', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
                        <p style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Status</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80' }} />
                            <span style={{ fontSize: '13px', fontWeight: 800, color: '#4ade80' }}>Active</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '24px' }}>
                {quickActions.map((action, i) => (
                    <button
                        key={i}
                        onClick={action.onClick}
                        style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                            background: 'white', border: '1px solid #f1f5f9',
                            borderRadius: '18px', padding: '14px 8px', cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                            transition: 'transform 0.15s',
                        }}
                        onTouchStart={e => e.currentTarget.style.transform = 'scale(0.95)'}
                        onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <div style={{
                            width: '44px', height: '44px', borderRadius: '14px',
                            background: action.bg, color: action.color,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            {action.icon}
                        </div>
                        <span style={{ fontSize: '10px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            {action.label}
                        </span>
                    </button>
                ))}
            </div>

            {/* Feature Cards */}
            <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <p style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Platform Benefits</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {featureCards.map((card, i) => (
                        <div key={i} style={{
                            background: 'white', borderRadius: '20px', padding: '16px',
                            border: '1px solid #f1f5f9',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                        }}>
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '12px',
                                background: card.bg, color: card.color,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginBottom: '10px',
                            }}>
                                {card.icon}
                            </div>
                            <p style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '3px' }}>{card.title}</p>
                            <p style={{ fontSize: '10px', fontWeight: 600, color: '#94a3b8' }}>{card.sub}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Start Investing Banner */}
            <div
                style={{
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                    borderRadius: '22px', padding: '20px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginBottom: '8px', cursor: 'pointer',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                }}
                onClick={() => navigate('/plan')}
            >
                <div>
                    <p style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
                        Ready to Grow?
                    </p>
                    <p style={{ fontSize: '18px', fontWeight: 900, color: 'white', lineHeight: 1.2 }}>
                        Start Investing<br />Today
                    </p>
                </div>
                <div style={{
                    width: '48px', height: '48px', borderRadius: '16px',
                    background: '#2563eb', color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 8px 20px rgba(37,99,235,0.5)',
                }}>
                    <ArrowRight size={22} />
                </div>
            </div>

            {/* Deposit Modal */}
            {showRecharge && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)',
                    backdropFilter: 'blur(8px)', zIndex: 200,
                    display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                }}>
                    <div style={{
                        background: 'white', width: '100%', maxWidth: '520px',
                        borderRadius: '32px 32px 0 0', padding: '28px 24px 40px',
                        maxHeight: '90vh', overflowY: 'auto',
                    }}>
                        {/* Handle */}
                        <div style={{ width: '48px', height: '5px', background: '#e2e8f0', borderRadius: '99px', margin: '0 auto 24px' }} />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <div>
                                <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a' }}>Add Funds</h2>
                                <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>UPI Deposit Gateway</p>
                            </div>
                            <button
                                onClick={() => setShowRecharge(false)}
                                style={{
                                    width: '38px', height: '38px', borderRadius: '50%',
                                    background: '#f1f5f9', border: 'none', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b',
                                }}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* UPI Info */}
                        <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '14px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
                                    <CreditCard size={18} />
                                </div>
                                <div>
                                    <p style={{ fontSize: '9px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Pay to UPI</p>
                                    <p style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b', fontFamily: 'monospace' }}>{depositInfo.upiId}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleCopyUpi}
                                style={{ padding: '8px 14px', background: '#eff6ff', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 800, color: '#2563eb' }}
                            >
                                COPY
                            </button>
                        </div>

                        {depositInfo.qrCode && (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#f8fafc', borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
                                <p style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Scan to Pay</p>
                                <div style={{ width: '130px', height: '130px', background: 'white', borderRadius: '12px', padding: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                                    <img src={depositInfo.qrCode} alt="QR Code" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleRecharge} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div>
                                <label style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '8px', marginLeft: '4px' }}>Amount (&#8377;)</label>
                                <input
                                    type="number" placeholder="Min ₹300"
                                    value={amount} onChange={e => setAmount(e.target.value)} required
                                    style={{
                                        width: '100%', height: '56px', background: '#f8fafc',
                                        border: '1px solid #e2e8f0', borderRadius: '16px',
                                        padding: '0 20px', fontSize: '22px', fontWeight: 900,
                                        color: '#0f172a', outline: 'none', boxSizing: 'border-box',
                                    }}
                                    onFocus={e => e.target.style.borderColor = '#2563eb'}
                                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                                />
                            </div>
                            <div>
                                <label style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '8px', marginLeft: '4px' }}>UTR / Transaction ID</label>
                                <input
                                    type="text" placeholder="12-digit transaction ID"
                                    value={utr} onChange={e => setUtr(e.target.value)} required
                                    style={{
                                        width: '100%', height: '52px', background: '#f8fafc',
                                        border: '1px solid #e2e8f0', borderRadius: '16px',
                                        padding: '0 20px', fontSize: '15px', fontWeight: 700,
                                        color: '#0f172a', outline: 'none', boxSizing: 'border-box',
                                    }}
                                    onFocus={e => e.target.style.borderColor = '#2563eb'}
                                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                                />
                            </div>
                            <div>
                                <label style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '8px', marginLeft: '4px' }}>Payment Screenshot</label>
                                <div style={{ position: 'relative', height: '56px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', display: 'flex', alignItems: 'center', padding: '0 16px', overflow: 'hidden' }}>
                                    <input type="file" accept="image/*" onChange={handleScreenshotUpload} required={!screenshot}
                                        style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', zIndex: 1 }} />
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', pointerEvents: 'none' }}>
                                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'white', boxShadow: '0 2px 6px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: screenshot ? '#22c55e' : '#94a3b8' }}>
                                            {screenshot ? <CheckCircle size={18} /> : <Layers size={18} />}
                                        </div>
                                        <p style={{ fontSize: '13px', fontWeight: 700, color: screenshot ? '#15803d' : '#64748b' }}>
                                            {screenshot ? 'Screenshot Attached ✓' : 'Upload Payment Proof'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {msg && (
                                <div style={{
                                    padding: '12px 16px', borderRadius: '12px', fontSize: '12px',
                                    fontWeight: 800, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.08em',
                                    background: msg.includes('Failed') || msg.includes('Please') ? '#fef2f2' : '#f0fdf4',
                                    color: msg.includes('Failed') || msg.includes('Please') ? '#dc2626' : '#15803d',
                                }}>
                                    {msg}
                                </div>
                            )}

                            <button type="submit" style={{
                                width: '100%', height: '54px', background: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
                                border: 'none', borderRadius: '16px', color: 'white', fontWeight: 900,
                                fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase',
                                cursor: 'pointer', boxShadow: '0 8px 24px rgba(37,99,235,0.4)',
                            }}>
                                Confirm Deposit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Home;
