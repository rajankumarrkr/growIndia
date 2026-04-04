import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { UserPlus, Phone, Lock, User, Hash, Sparkles, ShieldCheck, Cpu, Eye, EyeOff, ArrowRight } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', mobile: '', password: '', confirmPassword: '', referralCode: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const ref = params.get('ref');
        if (ref) {
            setFormData(prev => ({ ...prev, referralCode: ref }));
        }
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return; // Prevent double registration

        setError('');
        if (formData.password !== formData.confirmPassword) return setError('Passwords do not match');
        if (formData.mobile.length !== 10) return setError('Mobile number must be 10 digits');
        if (formData.name.trim().length < 2) return setError('Please enter a valid name');
        
        setIsSubmitting(true);
        try {
            await register(formData);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
            setIsSubmitting(false); // Re-enable on failure
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', position: 'relative', overflow: 'hidden' }}>
            {/* Ambient glow blobs for a premium look */}
            <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(37,130,246,0.06)', filter: 'blur(100px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(59,130,246,0.06)', filter: 'blur(100px)', pointerEvents: 'none' }} />

            <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 10 }}>
                {/* Friendly Header */}
                <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                    <div style={{
                        width: '80px', height: '80px', 
                        background: 'linear-gradient(135deg, #2563eb, #1e40af)',
                        borderRadius: '24px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 24px', 
                        boxShadow: '0 12px 30px rgba(37,99,235,0.2)',
                        color: 'white'
                    }}>
                        <UserPlus size={36} strokeWidth={2.5} />
                    </div>
                    <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a', letterSpacing: '-1px', margin: 0 }}>
                        Join Grow India
                    </h1>
                    <p style={{ fontSize: '15px', fontWeight: 600, color: '#64748b', marginTop: '8px', lineHeight: 1.5 }}>
                        Start your earning journey with us <br /> easily in just a few steps!
                    </p>
                </div>

                {/* Main Registration Card */}
                <div style={{
                    background: 'white', borderRadius: '32px', padding: '36px 28px',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.08)', border: '1px solid rgba(241,245,249,1)',
                }}>
                    {error && (
                        <div style={{
                            background: '#fff1f2', border: '1px solid #fecaca', color: '#e11d48',
                            padding: '14px', borderRadius: '16px', marginBottom: '24px',
                            fontSize: '13px', fontWeight: 700, textAlign: 'center',
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                        {/* Name Input */}
                        <div>
                            <label style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', display: 'block', marginBottom: '8px', marginLeft: '4px' }}>
                                Your Full Name
                            </label>
                            <div style={{ position: 'relative' }}>
                                <User size={20} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="text" placeholder="e.g. Rahul Kumar"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} required
                                    disabled={isSubmitting}
                                    style={{
                                        width: '100%', height: '58px', background: isSubmitting ? '#f8fafc' : '#f8fafc',
                                        border: '2px solid #f1f5f9', borderRadius: '16px',
                                        paddingLeft: '50px', paddingRight: '16px',
                                        fontSize: '15px', fontWeight: 600, color: '#0f172a',
                                        outline: 'none', boxSizing: 'border-box',
                                        transition: 'all 0.25s',
                                        opacity: isSubmitting ? 0.7 : 1,
                                    }}
                                    onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.background = 'white'; }}
                                    onBlur={e => { e.target.style.borderColor = '#f1f5f9'; e.target.style.background = '#f8fafc'; }}
                                />
                            </div>
                        </div>

                        {/* Mobile Number Input */}
                        <div>
                            <label style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', display: 'block', marginBottom: '8px', marginLeft: '4px' }}>
                                Mobile Number
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Phone size={20} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="text" placeholder="10-digit number"
                                    value={formData.mobile}
                                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} required
                                    disabled={isSubmitting}
                                    style={{
                                        width: '100%', height: '58px', background: '#f8fafc',
                                        border: '2px solid #f1f5f9', borderRadius: '16px',
                                        paddingLeft: '50px', paddingRight: '16px',
                                        fontSize: '15px', fontWeight: 600, color: '#0f172a',
                                        outline: 'none', boxSizing: 'border-box',
                                        transition: 'all 0.25s',
                                    }}
                                    onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.background = 'white'; }}
                                    onBlur={e => { e.target.style.borderColor = '#f1f5f9'; e.target.style.background = '#f8fafc'; }}
                                />
                            </div>
                            <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px', marginLeft: '4px', fontWeight: 600 }}>We will keep this safe & secure.</p>
                        </div>

                        {/* Password Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                            <div>
                                <label style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', display: 'block', marginBottom: '8px', marginLeft: '4px' }}>
                                    Password
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                                    <input
                                        type={showPassword ? "text" : "password"} placeholder="Min 6 characters"
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })} required
                                        style={{
                                            width: '100%', height: '54px', background: '#f8fafc',
                                            border: '2px solid #f1f5f9', borderRadius: '16px',
                                            paddingLeft: '42px', paddingRight: '40px',
                                            fontSize: '14px', fontWeight: 600, color: '#0f172a',
                                            outline: 'none', boxSizing: 'border-box',
                                            transition: 'all 0.2s',
                                        }}
                                        onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.background = 'white'; }}
                                        onBlur={e => { e.target.style.borderColor = '#f1f5f9'; e.target.style.background = '#f8fafc'; }}
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5 }}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', display: 'block', marginBottom: '8px', marginLeft: '4px' }}>
                                    Confirm
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"} placeholder="Repeat it"
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} required
                                        style={{
                                            width: '100%', height: '54px', background: '#f8fafc',
                                            border: '2px solid #f1f5f9', borderRadius: '16px',
                                            paddingLeft: '16px', paddingRight: '40px',
                                            fontSize: '14px', fontWeight: 600, color: '#0f172a',
                                            outline: 'none', boxSizing: 'border-box',
                                            transition: 'all 0.2s',
                                        }}
                                        onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.background = 'white'; }}
                                        onBlur={e => { e.target.style.borderColor = '#f1f5f9'; e.target.style.background = '#f8fafc'; }}
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5 }}
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Referral Code (Optional) */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '0 4px' }}>
                                <label style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b' }}>Referral Code</label>
                                <span style={{ fontSize: '11px', fontWeight: 800, color: '#3b82f6', background: '#eff6ff', padding: '2px 8px', borderRadius: '6px' }}>Optional</span>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <Hash size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="text" placeholder="Enter if you have one"
                                    value={formData.referralCode}
                                    onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
                                    style={{
                                        width: '100%', height: '58px', background: '#f8fafc',
                                        border: '2px solid #f1f5f9', borderRadius: '16px',
                                        paddingLeft: '50px', paddingRight: '16px',
                                        fontSize: '15px', fontWeight: 600, color: '#0f172a',
                                        outline: 'none', boxSizing: 'border-box',
                                        transition: 'all 0.2s',
                                    }}
                                    onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.background = 'white'; }}
                                    onBlur={e => { e.target.style.borderColor = '#f1f5f9'; e.target.style.background = '#f8fafc'; }}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                width: '100%', height: '64px', marginTop: '12px',
                                background: isSubmitting ? '#94a3b8' : 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                                border: 'none', borderRadius: '20px', cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                color: 'white', fontWeight: 900, fontSize: '17px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                boxShadow: isSubmitting ? 'none' : '0 15px 35px rgba(37,99,235,0.3)',
                                transition: 'all 0.2s',
                                opacity: isSubmitting ? 0.9 : 1,
                            }}
                        >
                            {isSubmitting ? (
                                <>Please wait...</>
                            ) : (
                                <>Create My Account <ArrowRight size={20} /></>
                            )}
                        </button>
                    </form>

                    <div style={{ marginTop: '32px', textAlign: 'center' }}>
                        <p style={{ fontSize: '14px', fontWeight: 600, color: '#64748b' }}>
                            Already have an account?{' '}
                            <Link to="/login" style={{ 
                                color: '#2563eb', fontWeight: 800, textDecoration: 'none',
                                borderBottom: '2px solid #dbeafe', paddingBottom: '2px'
                            }}>
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Secure Trust Footer */}
                <div style={{ marginTop: '40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', background: '#ecfdf5', padding: '6px 14px', borderRadius: '12px' }}>
                        <ShieldCheck size={14} />
                        <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Secure Identity verification</span>
                    </div>
                    <p style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', lineHeight: 1.8, maxWidth: '280px' }}>
                        Join thousands of people earning daily income with Grow India Pay.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
