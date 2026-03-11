import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Phone, Lock, Fingerprint, ShieldCheck, Download, X } from 'lucide-react';

// Custom hook to capture the PWA install prompt event
const usePwaInstall = () => {
    const [prompt, setPrompt] = useState(null);
    const [canInstall, setCanInstall] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setPrompt(e);
            setCanInstall(true);
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const install = async () => {
        if (!prompt) return;
        prompt.prompt();
        const { outcome } = await prompt.userChoice;
        if (outcome === 'accepted') setCanInstall(false);
        setPrompt(null);
    };

    return { canInstall, install };
};

const Login = () => {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [dismissed, setDismissed] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const { canInstall, install } = usePwaInstall();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(mobile, password);
            navigate(res.user.role === 'admin' ? '/admin' : '/');
        } catch (err) {
            setError(err.response?.data?.message || 'Access Denied: Invalid Credentials');
        }
    };

    const showBanner = canInstall && !dismissed;

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative', overflow: 'hidden' }}>
            {/* Ambient glow blobs */}
            <div style={{ position: 'absolute', top: '-8%', right: '-8%', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(37,99,235,0.06)', filter: 'blur(80px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-8%', left: '-8%', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(37,99,235,0.06)', filter: 'blur(80px)', pointerEvents: 'none' }} />

            {/* PWA Install Banner */}
            {showBanner && (
                <div style={{
                    position: 'fixed', top: '16px', left: '16px', right: '16px',
                    zIndex: 999, maxWidth: '480px', margin: '0 auto',
                    background: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
                    borderRadius: '20px', padding: '16px 16px 16px 20px',
                    boxShadow: '0 20px 50px rgba(37,99,235,0.4)',
                    display: 'flex', alignItems: 'center', gap: '14px',
                    animation: 'slideDown 0.4s cubic-bezier(0.16,1,0.3,1)',
                }}>
                    {/* App Icon */}
                    <div style={{
                        width: '48px', height: '48px', borderRadius: '14px', flexShrink: 0,
                        background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '22px', fontWeight: 900, color: 'white',
                    }}>
                        G
                    </div>

                    {/* Text */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '14px', fontWeight: 800, color: 'white', lineHeight: 1, marginBottom: '4px' }}>
                            Add to Home Screen
                        </p>
                        <p style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.65)', lineHeight: 1.3 }}>
                            Install Grow India for a faster app experience
                        </p>
                    </div>

                    {/* Install Button */}
                    <button
                        onClick={install}
                        style={{
                            flexShrink: 0, height: '36px', padding: '0 14px',
                            background: 'rgba(255,255,255,0.95)', border: 'none',
                            borderRadius: '10px', cursor: 'pointer',
                            fontSize: '11px', fontWeight: 900, color: '#1e3a8a',
                            display: 'flex', alignItems: 'center', gap: '5px',
                            transition: 'transform 0.15s',
                        }}
                        onTouchStart={e => e.currentTarget.style.transform = 'scale(0.95)'}
                        onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <Download size={13} />
                        Install
                    </button>

                    {/* Dismiss */}
                    <button
                        onClick={() => setDismissed(true)}
                        style={{
                            flexShrink: 0, width: '28px', height: '28px', borderRadius: '50%',
                            background: 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                        }}
                    >
                        <X size={14} />
                    </button>
                </div>
            )}

            <div style={{ width: '100%', maxWidth: '360px', position: 'relative', zIndex: 10 }}>
                {/* Logo & Title */}
                <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                    <div style={{
                        width: '80px', height: '80px', background: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
                        borderRadius: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 20px', boxShadow: '0 16px 40px rgba(37,99,235,0.35)',
                    }}>
                        <Fingerprint size={38} color="white" />
                    </div>
                    <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.5px', margin: 0 }}>
                        Welcome Back
                    </h1>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.25em', marginTop: '8px' }}>
                        Grow India — Secure Login
                    </p>
                </div>

                {/* Card */}
                <div style={{
                    background: 'white', borderRadius: '28px', padding: '28px',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9',
                }}>
                    {error && (
                        <div style={{
                            background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626',
                            padding: '12px 16px', borderRadius: '12px', marginBottom: '20px',
                            fontSize: '11px', fontWeight: 800, textAlign: 'center',
                            textTransform: 'uppercase', letterSpacing: '0.08em',
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Mobile */}
                        <div>
                            <label style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: '8px', marginLeft: '4px' }}>
                                Mobile Number
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Phone size={16} color="#cbd5e1" style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="text" placeholder="Enter your mobile"
                                    value={mobile} onChange={e => setMobile(e.target.value)} required
                                    style={{
                                        width: '100%', height: '52px', background: '#f8fafc',
                                        border: '1px solid #e2e8f0', borderRadius: '16px',
                                        paddingLeft: '46px', paddingRight: '16px',
                                        fontSize: '15px', fontWeight: 700, color: '#0f172a',
                                        outline: 'none', boxSizing: 'border-box',
                                        transition: 'border-color 0.2s',
                                    }}
                                    onFocus={e => e.target.style.borderColor = '#2563eb'}
                                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: '8px', marginLeft: '4px' }}>
                                Password
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={16} color="#cbd5e1" style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="password" placeholder="Enter your password"
                                    value={password} onChange={e => setPassword(e.target.value)} required
                                    style={{
                                        width: '100%', height: '52px', background: '#f8fafc',
                                        border: '1px solid #e2e8f0', borderRadius: '16px',
                                        paddingLeft: '46px', paddingRight: '16px',
                                        fontSize: '15px', fontWeight: 700, color: '#0f172a',
                                        outline: 'none', boxSizing: 'border-box',
                                        transition: 'border-color 0.2s',
                                    }}
                                    onFocus={e => e.target.style.borderColor = '#2563eb'}
                                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            style={{
                                width: '100%', height: '54px', marginTop: '6px',
                                background: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
                                border: 'none', borderRadius: '16px', cursor: 'pointer',
                                color: 'white', fontWeight: 900, fontSize: '13px',
                                letterSpacing: '0.1em', textTransform: 'uppercase',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                boxShadow: '0 8px 24px rgba(37,99,235,0.4)',
                                transition: 'transform 0.15s, box-shadow 0.15s',
                            }}
                            onTouchStart={e => e.currentTarget.style.transform = 'scale(0.97)'}
                            onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            Sign In <LogIn size={16} />
                        </button>
                    </form>

                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <p style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8' }}>
                            New user?{' '}
                            <Link to="/register" style={{ color: '#2563eb', fontWeight: 800, textDecoration: 'none' }}>
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div style={{ marginTop: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: 0.35 }}>
                    <ShieldCheck size={14} color="#1e293b" />
                    <p style={{ fontSize: '10px', fontWeight: 800, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.2em', margin: 0 }}>
                        End-to-End Encrypted
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default Login;
