import React, { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
    ArrowDownRight, ArrowUpRight, Target, CreditCard, CheckCircle,
    Layers, X, TrendingUp, ShieldCheck, Users, Zap, ArrowRight,
    History, Bell, Wallet, BarChart3, Globe2, Cpu, LineChart,
    Image as ImageIcon, Download, Smartphone
} from 'lucide-react';
import api from '../api/axios';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [msg, setMsg] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // PWA Install Banner
    const [showInstallBanner, setShowInstallBanner] = useState(false);
    const [installing, setInstalling] = useState(false);
    const deferredPrompt = useRef(null);

    useEffect(() => {
        // Check if already dismissed
        const dismissed = localStorage.getItem('pwa_install_dismissed');
        if (dismissed) return;

        const handler = (e) => {
            e.preventDefault();
            deferredPrompt.current = e;
            setShowInstallBanner(true);
        };

        window.addEventListener('beforeinstallprompt', handler);
        window.addEventListener('appinstalled', () => {
            setShowInstallBanner(false);
            deferredPrompt.current = null;
        });

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (installing) return;
        if (!deferredPrompt.current) return;
        setInstalling(true);
        deferredPrompt.current.prompt();
        const { outcome } = await deferredPrompt.current.userChoice;
        if (outcome === 'accepted') {
            localStorage.setItem('pwa_install_dismissed', 'true');
            setShowInstallBanner(false);
        }
        deferredPrompt.current = null;
        setInstalling(false);
    };

    const handleDismissInstall = () => {
        localStorage.setItem('pwa_install_dismissed', 'true');
        setShowInstallBanner(false);
    };

    const getTimeGreeting = () => {
        const h = new Date().getHours();
        if (h < 12) return 'Good Morning';
        if (h < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    const quickActions = React.useMemo(() => [
        { label: 'Deposit', icon: <ArrowDownRight size={22} />, color: '#2563eb', bg: '#eff6ff', onClick: () => navigate('/deposit') },
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
            <div style={{ marginBottom: showInstallBanner ? '16px' : '24px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', lineHeight: 1.2 }}>
                    Welcome back, {user?.name?.split(' ')[0] || 'Investor'} 👋
                </h2>
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#94a3b8', marginTop: '2px' }}>
                    {getTimeGreeting()}
                </p>
            </div>

            {/* PWA Install Banner */}
            {showInstallBanner && (
                <div style={{
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #7c3aed 100%)',
                    borderRadius: '24px',
                    padding: '20px',
                    marginBottom: '24px',
                    boxShadow: '0 16px 40px -8px rgba(37,99,235,0.45)',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                }}>
                    {/* Background shimmer */}
                    <div style={{
                        position: 'absolute', top: '-20px', right: '-20px',
                        width: '120px', height: '120px',
                        background: 'rgba(255,255,255,0.07)',
                        borderRadius: '50%'
                    }} />
                    <div style={{
                        position: 'absolute', bottom: '-30px', left: '30%',
                        width: '80px', height: '80px',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '50%'
                    }} />

                    {/* App Logo Icon */}
                    <div style={{
                        width: '56px', height: '56px', minWidth: '56px',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        border: '2px solid rgba(255,255,255,0.25)',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                        zIndex: 1
                    }}>
                        <img src="/icons/icon-192.svg" alt="Grow India" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    {/* Text */}
                    <div style={{ flex: 1, zIndex: 1 }}>
                        <p style={{
                            fontSize: '14px', fontWeight: 900, color: 'white',
                            marginBottom: '2px', letterSpacing: '-0.2px'
                        }}>
                            Install Grow India App
                        </p>
                        <p style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.65)' }}>
                            Faster access • Works offline • Home screen
                        </p>
                    </div>

                    {/* Buttons */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 1 }}>
                        <button
                            onClick={handleInstall}
                            disabled={installing}
                            style={{
                                background: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                padding: '8px 14px',
                                fontSize: '11px',
                                fontWeight: 900,
                                color: '#2563eb',
                                cursor: installing ? 'not-allowed' : 'pointer',
                                display: 'flex', alignItems: 'center', gap: '5px',
                                whiteSpace: 'nowrap',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                transition: 'all 0.2s'
                            }}
                        >
                            <Download size={13} />
                            {installing ? 'Installing...' : 'Install'}
                        </button>
                        <button
                            onClick={handleDismissInstall}
                            style={{
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.3)',
                                borderRadius: '12px',
                                padding: '6px 14px',
                                fontSize: '10px',
                                fontWeight: 700,
                                color: 'rgba(255,255,255,0.75)',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.2s'
                            }}
                        >
                            Later
                        </button>
                    </div>
                </div>
            )}

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
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
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
                onClick={() => navigate('/plan')}
                style={{
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #2563eb 100%)',
                    borderRadius: '28px',
                    padding: '28px 24px',
                    marginBottom: '20px',
                    cursor: 'pointer',
                    boxShadow: '0 24px 50px -10px rgba(37,99,235,0.45)',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Decorative blobs */}
                <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '140px', height: '140px', background: 'rgba(99,179,237,0.12)', borderRadius: '50%', filter: 'blur(30px)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-20px', left: '20%', width: '100px', height: '100px', background: 'rgba(124,58,237,0.12)', borderRadius: '50%', filter: 'blur(24px)', pointerEvents: 'none' }} />
                {/* Grid pattern */}
                <div style={{ position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none' }}>
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs><pattern id="inv-grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M 28 0 L 0 0 0 28" fill="none" stroke="white" strokeWidth="0.8" /></pattern></defs>
                        <rect width="100%" height="100%" fill="url(#inv-grid)" />
                    </svg>
                </div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* Top row — label + icon */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <div>
                            <p style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '8px' }}>
                                🚀 Ready to Grow?
                            </p>
                            <p style={{ fontSize: '26px', fontWeight: 900, color: 'white', lineHeight: 1.15, letterSpacing: '-0.5px' }}>
                                Start Investing<br />Today
                            </p>
                        </div>
                        {/* Animated arrow button */}
                        <div style={{
                            width: '56px', height: '56px', borderRadius: '18px',
                            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 10px 28px rgba(37,99,235,0.55)',
                            flexShrink: 0
                        }}>
                            <TrendingUp size={24} color="white" />
                        </div>
                    </div>

                    {/* Divider */}
                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '16px' }} />

                    {/* Bottom row — tags + arrow */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', padding: '5px 12px', borderRadius: '20px' }}>
                                Min ₹500
                            </span>
                            <span style={{ fontSize: '10px', fontWeight: 800, color: '#4ade80', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', padding: '5px 12px', borderRadius: '20px' }}>
                                Daily ROI ⚡
                            </span>
                            <span style={{ fontSize: '10px', fontWeight: 800, color: '#c4b5fd', background: 'rgba(196,181,253,0.08)', border: '1px solid rgba(196,181,253,0.15)', padding: '5px 12px', borderRadius: '20px' }}>
                                10% Referral 🎁
                            </span>
                        </div>
                        <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <ArrowRight size={18} color="white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Style for hiding scrollbar */}
            <style>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* Removed Deposit Modal - Logic moved to /deposit route */}

        </Layout>
    );
};

export default Home;
