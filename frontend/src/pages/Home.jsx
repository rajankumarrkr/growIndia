import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { 
    ArrowDownRight, ArrowUpRight, Target, CreditCard, CheckCircle, 
    Layers, X, TrendingUp, ShieldCheck, Users, Zap, ArrowRight, 
    History, Bell, Wallet, BarChart3, Globe2, Cpu, LineChart,
    Image as ImageIcon
} from 'lucide-react';
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

    const quickActions = React.useMemo(() => [
        { label: 'Deposit', icon: <ArrowDownRight size={22} />, color: '#2563eb', bg: '#eff6ff', onClick: () => setShowRecharge(true) },
        { label: 'Withdraw', icon: <ArrowUpRight size={22} />, color: '#7c3aed', bg: '#f5f3ff', onClick: () => navigate('/wallet') },
        { label: 'Invest', icon: <Target size={22} />, color: '#059669', bg: '#f0fdf4', onClick: () => navigate('/plan') },
        { label: 'History', icon: <History size={22} />, color: '#d97706', bg: '#fffbeb', onClick: () => navigate('/history') },
    ], [navigate]);

    const benefits = React.useMemo(() => [
        { title: 'Daily Returns', sub: 'Earn every 24 hours', icon: <BarChart3 size={24} />, color: '#2563eb', bg: '#eff6ff', img: '📊' },
        { title: 'Secure Vault', sub: 'Bank-grade security', icon: <ShieldCheck size={24} />, color: '#059669', bg: '#f0fdf4', img: '🛡️' },
        { title: 'Referral Bonus', sub: 'Invite & earn more', icon: <Users size={24} />, color: '#7c3aed', bg: '#f5f3ff', img: '👥' },
        { title: 'Instant Credit', sub: 'Auto ROI daily', icon: <Zap size={24} />, color: '#d97706', bg: '#fffbeb', img: '⚡' },
    ], []);

    const tradingBanners = React.useMemo(() => [
        { title: 'Global Markets', sub: '24/7 Monitoring', icon: <Globe2 size={24} />, color: '#3b82f6' },
        { title: 'AI Optimized', sub: 'Quantum Algorithms', icon: <Cpu size={24} />, color: '#8b5cf6' },
        { title: 'Market Trends', sub: 'Real-time Analytics', icon: <LineChart size={24} />, color: '#10b981' },
    ], []);

    return (
        <Layout title="Dashboard">
            {/* Greeting */}
            <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', lineHeight: 1.2 }}>
                    Welcome back, {user?.name?.split(' ')[0] || 'Investor'} 👋
                </h2>
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#94a3b8', marginTop: '2px' }}>
                    {getTimeGreeting()}
                </p>
            </div>

            {/* Balance Card Section */}
            <div style={{
                background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 60%, #3b82f6 100%)',
                borderRadius: '28px',
                padding: '24px',
                marginBottom: '24px',
                boxShadow: '0 20px 50px -10px rgba(37,99,235,0.4)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Subtle pattern overlay */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, pointerEvents: 'none' }}>
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <p style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>
                        TOTAL WALLET BALANCE
                    </p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '24px' }}>
                        <span style={{ fontSize: '20px', fontWeight: 400, color: 'rgba(255,255,255,0.7)' }}>₹</span>
                        <span style={{ fontSize: '42px', fontWeight: 900, color: 'white', lineHeight: 1, letterSpacing: '-1px' }}>
                            {user?.walletBalance?.toLocaleString('en-IN') || '0'}
                        </span>
                    </div>

                    <div style={{ 
                        display: 'flex', gap: '0', 
                        background: 'rgba(255,255,255,0.1)', 
                        backdropFilter: 'blur(10px)',
                        borderRadius: '16px',
                        padding: '16px 0'
                    }}>
                        <div style={{ flex: 1, borderRight: '1px solid rgba(255,255,255,0.15)', padding: '0 16px' }}>
                            <p style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>ACCOUNT</p>
                            <p style={{ fontSize: '13px', fontWeight: 800, color: 'white' }}>{user?.mobile || '—'}</p>
                        </div>
                        <div style={{ flex: 1, padding: '0 16px' }}>
                            <p style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>STATUS</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 10px rgba(74,222,128,0.5)' }} />
                                <span style={{ fontSize: '13px', fontWeight: 800, color: '#4ade80' }}>Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions - 4 Column Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '32px' }}>
                {quickActions.map((action, i) => (
                    <button
                        key={i}
                        onClick={action.onClick}
                        style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
                            background: 'white', border: '1.5px solid #f1f5f9',
                            borderRadius: '20px', padding: '16px 8px', cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                            transition: 'all 0.2s',
                        }}
                        onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
                        onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <div style={{
                            width: '48px', height: '48px', borderRadius: '14px',
                            background: action.bg, color: action.color,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: `0 8px 16px ${action.color}15`
                        }}>
                            {action.icon}
                        </div>
                        <span style={{ fontSize: '10px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {action.label}
                        </span>
                    </button>
                ))}
            </div>

            {/* Platform Benefits Header */}
            <div style={{ marginBottom: '16px', padding: '0 4px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>PLATFORM BENEFITS</h3>
            </div>

            {/* 2x2 Benefits Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
                {benefits.map((item, i) => (
                    <div key={i} style={{
                        background: 'white', borderRadius: '24px', padding: '20px',
                        border: '1.5px solid #f1f5f9',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                        display: 'flex', flexDirection: 'column', gap: '12px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '12px',
                                background: item.bg, color: item.color,
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                {item.icon}
                            </div>
                            <span style={{ fontSize: '20px' }}>{item.img}</span>
                        </div>
                        <div>
                            <p style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b', marginBottom: '4px' }}>{item.title}</p>
                            <p style={{ fontSize: '10px', fontWeight: 600, color: '#94a3b8' }}>{item.sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Featured Trading Banners - Company Related */}
            <div style={{ marginBottom: '16px', padding: '0 4px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>TRADING HUB</h3>
            </div>

            <div style={{ 
                display: 'flex', overflowX: 'auto', gap: '12px', paddingBottom: '16px',
                scrollbarWidth: 'none', msOverflowStyle: 'none' 
            }} className="hide-scrollbar">
                {tradingBanners.map((banner, i) => (
                    <div key={i} style={{
                        minWidth: '220px', background: '#f8fafc', 
                        borderRadius: '24px', padding: '24px',
                        border: '1.5px solid #f1f5f9',
                        display: 'flex', alignItems: 'center', gap: '16px',
                        position: 'relative', overflow: 'hidden'
                    }}>
                        <div style={{
                            width: '48px', height: '48px', borderRadius: '14px',
                            background: 'white', color: banner.color,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            zIndex: 1
                        }}>
                            {banner.icon}
                        </div>
                        <div style={{ zIndex: 1 }}>
                            <p style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b', marginBottom: '2px' }}>{banner.title}</p>
                            <p style={{ fontSize: '10px', fontWeight: 600, color: '#94a3b8' }}>{banner.sub}</p>
                        </div>
                        {/* Decorative background icon */}
                        <div style={{ position: 'absolute', right: '-10px', bottom: '-10px', opacity: 0.05, transform: 'rotate(-15deg)' }}>
                            {React.cloneElement(banner.icon, { size: 80 })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Start Investing Banner */}
            <div
                style={{
                    background: '#0f172a',
                    borderRadius: '24px', padding: '24px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginBottom: '20px', cursor: 'pointer',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                }}
                onClick={() => navigate('/plan')}
            >
                <div>
                    <p style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                        READY TO GROW?
                    </p>
                    <p style={{ fontSize: '20px', fontWeight: 900, color: 'white', lineHeight: 1.2 }}>
                        Start Investing<br />Today
                    </p>
                </div>
                <div style={{
                    width: '52px', height: '52px', borderRadius: '16px',
                    background: '#2563eb', color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 8px 20px rgba(37,99,235,0.4)',
                }}>
                    <ArrowRight size={26} />
                </div>
            </div>

            {/* Style for hiding scrollbar */}
            <style>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
            
            {/* ... keeping the Deposit Modal logic same as before ... */}
            {showRecharge && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.4)',
                    backdropFilter: 'blur(12px)', zIndex: 200,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '20px'
                }}>
                    <div style={{
                        background: 'white', width: '100%', maxWidth: '440px',
                        borderRadius: '32px', padding: '32px',
                        boxShadow: '0 30px 60px -12px rgba(15,23,42,0.3)',
                        maxHeight: '90vh', overflowY: 'auto',
                        position: 'relative'
                    }}>
                        <button
                            onClick={() => setShowRecharge(false)}
                            style={{
                                position: 'absolute', top: '24px', right: '24px',
                                width: '36px', height: '36px', borderRadius: '50%',
                                background: '#f8fafc', border: 'none', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b',
                                transition: 'all 0.2s'
                            }}
                        >
                            <X size={18} />
                        </button>

                        <div style={{ marginBottom: '32px' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.5px' }}>Deposit</h2>
                            <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '6px' }}>Secure Payment Gateway</p>
                        </div>

                        {/* Payment Card */}
                        <div style={{
                            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                            borderRadius: '24px', padding: '24px', marginBottom: '28px',
                            color: 'white', position: 'relative', overflow: 'hidden'
                        }}>
                            {/* Decorative elements */}
                            <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '100px', height: '100px', background: 'rgba(59,130,246,0.1)', borderRadius: '50%', blur: '40px' }} />
                            
                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                                    <div style={{ width: '44px', height: '32px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)' }} />
                                    <span style={{ fontSize: '12px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Grow India Pay</span>
                                </div>

                                <div style={{ marginBottom: '24px' }}>
                                    <p style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>OFFICIAL UPI ID</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <p style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '0.5px', fontFamily: 'monospace' }}>{depositInfo.upiId}</p>
                                        <button 
                                            onClick={handleCopyUpi}
                                            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', padding: '6px 12px', color: 'white', fontSize: '10px', fontWeight: 800, cursor: 'pointer' }}
                                        >
                                            COPY
                                        </button>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                    <div>
                                        <p style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>VALID FOR</p>
                                        <p style={{ fontSize: '13px', fontWeight: 700 }}>EVERYONE</p>
                                    </div>
                                    <div style={{ background: 'white', padding: '8px', borderRadius: '12px', width: '80px', height: '80px' }}>
                                        {depositInfo.qrCode ? (
                                            <img src={depositInfo.qrCode} alt="QR" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', background: '#f1f5f9', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Zap size={20} color="#cbd5e1" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleRecharge} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                            <div className="form-group">
                                <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '8px', marginLeft: '4px' }}>Amount to Deposit</label>
                                <div style={{ position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', fontSize: '20px', fontWeight: 900, color: '#94a3b8' }}>₹</span>
                                    <input
                                        type="number" placeholder="0.00"
                                        value={amount} onChange={e => setAmount(e.target.value)} required
                                        style={{
                                            width: '100%', height: '64px', background: '#f8fafc',
                                            border: '2px solid #f1f5f9', borderRadius: '18px',
                                            padding: '0 20px 0 45px', fontSize: '24px', fontWeight: 900,
                                            color: '#0f172a', outline: 'none', boxSizing: 'border-box',
                                            transition: 'all 0.2s'
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '8px', marginLeft: '4px' }}>Transaction ID (UTR)</label>
                                <input
                                    type="text" placeholder="Enter 12-digit UTR number"
                                    value={utr} onChange={e => setUtr(e.target.value)} required
                                    style={{
                                        width: '100%', height: '56px', background: '#f8fafc',
                                        border: '2px solid #f1f5f9', borderRadius: '18px',
                                        padding: '0 20px', fontSize: '15px', fontWeight: 700,
                                        color: '#0f172a', outline: 'none', boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '8px', marginLeft: '4px' }}>Proof of Payment</label>
                                <label style={{ 
                                    display: 'flex', alignItems: 'center', gap: '16px', 
                                    padding: '16px 20px', background: '#f8fafc', 
                                    border: '2px dashed #e2e8f0', borderRadius: '18px',
                                    cursor: 'pointer', transition: 'all 0.2s'
                                }}>
                                    <input type="file" accept="image/*" onChange={handleScreenshotUpload} required={!screenshot} style={{ display: 'none' }} />
                                    <div style={{ 
                                        width: '44px', height: '44px', borderRadius: '14px', 
                                        background: screenshot ? '#f0fdf4' : 'white', 
                                        color: screenshot ? '#22c55e' : '#94a3b8',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                                    }}>
                                        {screenshot ? <CheckCircle size={22} /> : <ImageIcon size={22} />}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontSize: '13px', fontWeight: 800, color: screenshot ? '#15803d' : '#475569' }}>
                                            {screenshot ? 'Screenshot Attached ✓' : 'Upload Receipt'}
                                        </p>
                                        <p style={{ fontSize: '10px', fontWeight: 600, color: '#94a3b8' }}>PNG, JPG or JPEG allowed</p>
                                    </div>
                                </label>
                            </div>

                            {msg && (
                                <div style={{
                                    padding: '14px', borderRadius: '16px', fontSize: '11px',
                                    fontWeight: 800, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.08em',
                                    background: msg.includes('Failed') || msg.includes('Please') ? '#fef2f2' : '#f0fdf4',
                                    color: msg.includes('Failed') || msg.includes('Please') ? '#dc2626' : '#15803d',
                                    border: `1px solid ${msg.includes('Failed') || msg.includes('Please') ? '#fecaca' : '#bbf7d0'}`,
                                    animation: 'slideUp 0.3s ease-out'
                                }}>
                                    {msg}
                                </div>
                            )}

                            <button type="submit" style={{
                                width: '100%', height: '60px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                                border: 'none', borderRadius: '20px', color: 'white', fontWeight: 900,
                                fontSize: '14px', letterSpacing: '0.12em', textTransform: 'uppercase',
                                cursor: 'pointer', boxShadow: '0 12px 24px rgba(37,99,235,0.3)',
                                marginTop: '10px', transition: 'transform 0.2s, box-shadow 0.2s'
                            }}>
                                Confirm & Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </Layout>
    );
};

export default Home;
