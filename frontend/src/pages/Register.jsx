import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Phone, Lock, User, Hash, Sparkles, ShieldCheck } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', mobile: '', password: '', confirmPassword: '', referralCode: '' });
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (formData.password !== formData.confirmPassword) return setError('Passwords do not match');
        if (formData.mobile.length !== 10) return setError('Mobile number must be 10 digits');
        
        try {
            await register(formData);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 20px', position: 'relative', overflow: 'hidden' }}>
            {/* Ambient glow blobs */}
            <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '380px', height: '380px', borderRadius: '50%', background: 'rgba(37,99,235,0.06)', filter: 'blur(100px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '380px', height: '380px', borderRadius: '50%', background: 'rgba(37,99,235,0.06)', filter: 'blur(100px)', pointerEvents: 'none' }} />

            <div style={{ width: '100%', maxWidth: '380px', position: 'relative', zIndex: 10 }}>
                {/* Logo & Title */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        width: '76px', height: '76px', background: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
                        borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 18px', boxShadow: '0 16px 40px rgba(37,99,235,0.3)',
                    }}>
                        <UserPlus size={36} color="white" />
                    </div>
                    <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.5px', margin: 0 }}>
                        Create Account
                    </h1>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.2em', marginTop: '6px' }}>
                        Join the Grow India Network
                    </p>
                </div>

                {/* Card */}
                <div style={{
                    background: 'white', borderRadius: '28px', padding: '24px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9',
                }}>
                    {error && (
                        <div style={{
                            background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626',
                            padding: '12px 14px', borderRadius: '12px', marginBottom: '16px',
                            fontSize: '11px', fontWeight: 800, textAlign: 'center',
                            textTransform: 'uppercase', letterSpacing: '0.06em',
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {/* Name */}
                        <div>
                            <label style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '6px', marginLeft: '4px' }}>
                                Full Name
                            </label>
                            <div style={{ position: 'relative' }}>
                                <User size={15} color="#cbd5e1" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="text" placeholder="John Doe"
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} required
                                    style={{
                                        width: '100%', height: '50px', background: '#f8fafc',
                                        border: '1px solid #e2e8f0', borderRadius: '14px',
                                        paddingLeft: '44px', paddingRight: '16px',
                                        fontSize: '14px', fontWeight: 700, color: '#0f172a',
                                        outline: 'none', boxSizing: 'border-box',
                                        transition: 'border-color 0.2s',
                                    }}
                                    onFocus={e => e.target.style.borderColor = '#2563eb'}
                                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                                />
                            </div>
                        </div>

                        {/* Mobile */}
                        <div>
                            <label style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '6px', marginLeft: '4px' }}>
                                Mobile Connection
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Phone size={15} color="#cbd5e1" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="text" placeholder="10-digit number"
                                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} required
                                    style={{
                                        width: '100%', height: '50px', background: '#f8fafc',
                                        border: '1px solid #e2e8f0', borderRadius: '14px',
                                        paddingLeft: '44px', paddingRight: '16px',
                                        fontSize: '14px', fontWeight: 700, color: '#0f172a',
                                        outline: 'none', boxSizing: 'border-box',
                                        transition: 'border-color 0.2s',
                                    }}
                                    onFocus={e => e.target.style.borderColor = '#2563eb'}
                                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                                />
                            </div>
                        </div>

                        {/* Passwords Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <div>
                                <label style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '6px', marginLeft: '4px' }}>
                                    Password
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={15} color="#cbd5e1" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                                    <input
                                        type="password" placeholder="••••"
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })} required
                                        style={{
                                            width: '100%', height: '50px', background: '#f8fafc',
                                            border: '1px solid #e2e8f0', borderRadius: '14px',
                                            paddingLeft: '44px', paddingRight: '12px',
                                            fontSize: '14px', fontWeight: 700, color: '#0f172a',
                                            outline: 'none', boxSizing: 'border-box',
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <label style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '6px', marginLeft: '4px' }}>
                                    Confirm
                                </label>
                                <input
                                    type="password" placeholder="••••"
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} required
                                    style={{
                                        width: '100%', height: '50px', background: '#f8fafc',
                                        border: '1px solid #e2e8f0', borderRadius: '14px',
                                        paddingLeft: '16px', paddingRight: '16px',
                                        fontSize: '14px', fontWeight: 700, color: '#0f172a',
                                        outline: 'none', boxSizing: 'border-box',
                                    }}
                                />
                            </div>
                        </div>

                        {/* Referral */}
                        <div>
                            <label style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '6px', marginLeft: '4px' }}>
                                Referral Code (Optional)
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Hash size={15} color="#cbd5e1" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="text" placeholder="GRI-XXXX"
                                    onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
                                    style={{
                                        width: '100%', height: '50px', background: '#f8fafc',
                                        border: '1px solid #e2e8f0', borderRadius: '14px',
                                        paddingLeft: '44px', paddingRight: '16px',
                                        fontSize: '14px', fontWeight: 700, color: '#2563eb',
                                        outline: 'none', boxSizing: 'border-box',
                                        fontFamily: 'monospace', letterSpacing: '0.05em',
                                    }}
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
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                boxShadow: '0 8px 24px rgba(37,99,235,0.4)',
                                transition: 'transform 0.15s',
                            }}
                            onTouchStart={e => e.currentTarget.style.transform = 'scale(0.97)'}
                            onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            Sign Up Now <Sparkles size={16} />
                        </button>
                    </form>

                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <p style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8' }}>
                            Already registered?{' '}
                            <Link to="/login" style={{ color: '#2563eb', fontWeight: 800, textDecoration: 'none' }}>
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div style={{ marginTop: '24px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', opacity: 0.35 }}>
                        <ShieldCheck size={14} color="#1e293b" />
                        <p style={{ fontSize: '10px', fontWeight: 800, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.2em', margin: 0 }}>
                            Secure Registration
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
