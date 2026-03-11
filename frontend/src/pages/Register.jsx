import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Phone, Lock, User, Hash, Sparkles, ShieldCheck, Cpu, Eye, EyeOff } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', mobile: '', password: '', confirmPassword: '', referralCode: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
        <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', position: 'relative', overflow: 'hidden' }}>
            {/* Ambient glow blobs */}
            <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(37,99,235,0.05)', filter: 'blur(100px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(37,99,235,0.05)', filter: 'blur(100px)', pointerEvents: 'none' }} />

            <div style={{ width: '100%', maxWidth: '400px', position: 'relative', zIndex: 10 }}>
                {/* Logo & Title */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        width: '84px', height: '84px', 
                        background: 'white',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 24px', 
                        boxShadow: '0 0 0 8px rgba(37,99,235,0.05), 0 0 0 1px rgba(37,99,235,0.1)',
                        position: 'relative'
                    }}>
                        <div style={{
                            width: '56px', height: '56px',
                            background: '#eff6ff',
                            borderRadius: '16px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#2563eb',
                            border: '1px solid #dbeafe'
                        }}>
                            <Cpu size={32} />
                        </div>
                    </div>
                    <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#1e293b', letterSpacing: '-0.5px', margin: 0 }}>
                        Initialize Node
                    </h1>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', marginTop: '4px' }}>
                        Unified Member Directory Access
                    </p>
                </div>

                {/* Card */}
                <div style={{
                    background: 'white', borderRadius: '32px', padding: '32px 24px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9',
                }}>
                    {error && (
                        <div style={{
                            background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626',
                            padding: '12px 14px', borderRadius: '12px', marginBottom: '20px',
                            fontSize: '11px', fontWeight: 800, textAlign: 'center',
                            textTransform: 'uppercase', letterSpacing: '0.06em',
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {/* Name */}
                        <div>
                            <label style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', display: 'block', marginBottom: '8px', marginLeft: '2px' }}>
                                Identity Info
                            </label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="text" placeholder="Enter full name"
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} required
                                    style={{
                                        width: '100%', height: '54px', background: 'white',
                                        border: '1.5px solid #f1f5f9', borderRadius: '14px',
                                        paddingLeft: '48px', paddingRight: '16px',
                                        fontSize: '14px', fontWeight: 600, color: '#0f172a',
                                        outline: 'none', boxSizing: 'border-box',
                                        boxShadow: '0 2px 8px rgba(37,99,235,0.03)',
                                        transition: 'all 0.2s',
                                    }}
                                    onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 4px rgba(37,99,235,0.1)'; }}
                                    onBlur={e => { e.target.style.borderColor = '#f1f5f9'; e.target.style.boxShadow = '0 2px 8px rgba(37,99,235,0.03)'; }}
                                />
                            </div>
                        </div>

                        {/* Mobile */}
                        <div>
                            <label style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', display: 'block', marginBottom: '8px', marginLeft: '2px' }}>
                                Mobile ID
                            </label>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <div style={{ 
                                    position: 'absolute', left: '16px', display: 'flex', alignItems: 'center', gap: '4px',
                                    paddingRight: '10px', borderRight: '1px solid #f1f5f9'
                                }}>
                                    <span style={{ fontSize: '16px' }}>🇮🇳</span>
                                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 6L0 0H8L4 6Z" fill="#94A3B8"/>
                                    </svg>
                                </div>
                                <input
                                    type="text" placeholder="Enter 10-digit mobile number"
                                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} required
                                    style={{
                                        width: '100%', height: '54px', background: 'white',
                                        border: '1.5px solid #f1f5f9', borderRadius: '14px',
                                        paddingLeft: '68px', paddingRight: '16px',
                                        fontSize: '14px', fontWeight: 600, color: '#0f172a',
                                        outline: 'none', boxSizing: 'border-box',
                                        boxShadow: '0 2px 8px rgba(37,99,235,0.03)',
                                        transition: 'all 0.2s',
                                    }}
                                    onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 4px rgba(37,99,235,0.1)'; }}
                                    onBlur={e => { e.target.style.borderColor = '#f1f5f9'; e.target.style.boxShadow = '0 2px 8px rgba(37,99,235,0.03)'; }}
                                />
                            </div>
                        </div>

                        {/* Passwords Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div>
                                <label style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', display: 'block', marginBottom: '8px', marginLeft: '2px' }}>
                                    Secure Key
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={16} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                                    <input
                                        type={showPassword ? "text" : "password"} placeholder="****"
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })} required
                                        style={{
                                            width: '100%', height: '52px', background: 'white',
                                            border: '1.5px solid #f1f5f9', borderRadius: '14px',
                                            paddingLeft: '40px', paddingRight: '40px',
                                            fontSize: '14px', fontWeight: 600, color: '#0f172a',
                                            outline: 'none', boxSizing: 'border-box',
                                            transition: 'all 0.2s',
                                        }}
                                        onFocus={e => { e.target.style.borderColor = '#2563eb'; }}
                                        onBlur={e => { e.target.style.borderColor = '#f1f5f9'; }}
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                    >
                                        {showPassword ? <EyeOff size={16} color="#94a3b8" /> : <Eye size={16} color="#94a3b8" />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', display: 'block', marginBottom: '8px', marginLeft: '2px' }}>
                                    Confirm Key
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"} placeholder="****"
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} required
                                        style={{
                                            width: '100%', height: '52px', background: 'white',
                                            border: '1.5px solid #f1f5f9', borderRadius: '14px',
                                            paddingLeft: '16px', paddingRight: '40px',
                                            fontSize: '14px', fontWeight: 600, color: '#0f172a',
                                            outline: 'none', boxSizing: 'border-box',
                                            transition: 'all 0.2s',
                                        }}
                                        onFocus={e => { e.target.style.borderColor = '#2563eb'; }}
                                        onBlur={e => { e.target.style.borderColor = '#f1f5f9'; }}
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                    >
                                        {showConfirmPassword ? <EyeOff size={16} color="#94a3b8" /> : <Eye size={16} color="#94a3b8" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Referral */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '0 2px' }}>
                                <label style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>Neterrrk Referral</label>
                                <span style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8' }}>Optional</span>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <Hash size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="text" placeholder="Enter optional hash/code"
                                    onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
                                    style={{
                                        width: '100%', height: '54px', background: 'white',
                                        border: '1.5px solid #f1f5f9', borderRadius: '14px',
                                        paddingLeft: '48px', paddingRight: '16px',
                                        fontSize: '14px', fontWeight: 600, color: '#0f172a',
                                        outline: 'none', boxSizing: 'border-box',
                                        transition: 'all 0.2s',
                                    }}
                                    onFocus={e => { e.target.style.borderColor = '#2563eb'; }}
                                    onBlur={e => { e.target.style.borderColor = '#f1f5f9'; }}
                                />
                            </div>
                        </div>

                        {/* Progress Stepper */}
                        <div style={{ padding: '0 10px', marginTop: '4px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', position: 'relative', marginBottom: '8px' }}>
                                <div style={{ height: '3px', background: '#dbeafe', width: '100%', position: 'absolute', zIndex: 0 }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', position: 'relative', zIndex: 1 }}>
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} style={{ 
                                            width: '16px', height: '16px', borderRadius: '50%', 
                                            background: i === 1 ? '#2563eb' : '#dbeafe',
                                            border: '3px solid white',
                                            boxShadow: i === 1 ? '0 0 0 2px #2563eb' : 'none'
                                        }} />
                                    ))}
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 700, color: '#94a3b8' }}>
                                <span>Identify</span>
                                <span>Secure</span>
                                <span>Confirm</span>
                                <span>Initialize</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            style={{
                                width: '100%', height: '56px', marginTop: '10px',
                                background: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
                                border: 'none', borderRadius: '99px', cursor: 'pointer',
                                color: 'white', fontWeight: 900, fontSize: '15px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                boxShadow: '0 12px 30px rgba(37,99,235,0.3)',
                                transition: 'all 0.2s',
                            }}
                            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
                            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            Initialize Node <Sparkles size={18} />
                        </button>
                    </form>

                    <div style={{ marginTop: '24px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
                            <div style={{ flex: 1, height: '1px', background: '#f1f5f9' }} />
                            <span style={{ fontSize: '11px', fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase' }}>or</span>
                            <div style={{ flex: 1, height: '1px', background: '#f1f5f9' }} />
                        </div>
                        <Link to="/login" style={{ 
                            display: 'block', marginTop: '16px',
                            color: '#1e3a8a', fontWeight: 800, textDecoration: 'none',
                            fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em'
                        }}>
                            AUTHORIZE ENTRY
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <div style={{ marginTop: '32px', textAlign: 'center' }}>
                    <p style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', lineHeight: 1.6 }}>
                        By initializing, you agree to the <br />
                        <span style={{ borderBottom: '1px solid #94a3b8', paddingBottom: '1px' }}>NETWORK PROTOCOLS & TERMS</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
