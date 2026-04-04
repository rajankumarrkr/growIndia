import React, { useContext, useState } from 'react';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { 
    ArrowUpRight, History, ShieldCheck, ChevronRight, 
    Landmark, CreditCard, Building2, Smartphone, Check, AlertCircle
} from 'lucide-react';

const Wallet = () => {
    const { user, setUser } = useContext(AuthContext);
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('bank'); // 'bank' or 'upi'
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [ifsc, setIfsc] = useState('');
    const [upiId, setUpiId] = useState('');
    const [msg, setMsg] = useState({ text: '', type: '' });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleWithdraw = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (loading) return;
        setLoading(true);
        try {
            const payload = { amount: Number(amount), method };
            if (method === 'bank') {
                payload.name = bankName;
                payload.accountNumber = accountNumber;
                payload.ifsc = ifsc;
            } else {
                payload.upiId = upiId;
            }
            const res = await api.post('/wallet/withdraw', payload);
            setMsg({ text: res.data.message, type: 'success' });
            const profile = await api.get('/user/profile');
            setUser(profile.data);
            setSubmitted(true);
            setAmount('');
        } catch (err) {
            setMsg({ text: err.response?.data?.message || 'Withdrawal Failed', type: 'error' });
        } finally {
            setLoading(false);
            setTimeout(() => setMsg({ text: '', type: '' }), 5000);
        }
    };

    return (
        <Layout title="Wallet Hub">

            {/* Balance Card */}
            <div style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #2563eb 100%)',
                borderRadius: '28px', padding: '28px 24px', marginBottom: '24px',
                position: 'relative', overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '130px', height: '130px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <p style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '8px' }}>Available Balance</p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '24px' }}>
                        <span style={{ fontSize: '20px', fontWeight: 400, color: 'rgba(255,255,255,0.5)' }}>₹</span>
                        <span style={{ fontSize: '44px', fontWeight: 900, color: 'white', letterSpacing: '-1px', lineHeight: 1 }}>
                            {user?.walletBalance?.toLocaleString('en-IN') || '0'}
                        </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.08)', borderRadius: '16px', padding: '14px 16px' }}>
                        <div style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ShieldCheck size={18} color="rgba(255,255,255,0.7)" />
                        </div>
                        <div>
                            <p style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '2px' }}>Security Status</p>
                            <p style={{ fontSize: '13px', fontWeight: 800, color: 'white' }}>Bank-Grade Encryption Active</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Withdrawal Form */}
            <div style={{ background: 'white', borderRadius: '24px', border: '1.5px solid #f1f5f9', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', marginBottom: '20px', overflow: 'hidden' }}>
                {/* Header */}
                <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a' }}>Withdraw Funds</h3>
                        <p style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '2px' }}>Min ₹300 • Processed within 24hrs</p>
                    </div>
                    <div style={{ width: '42px', height: '42px', background: '#eff6ff', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowUpRight size={20} color="#2563eb" />
                    </div>
                </div>

                <div style={{ padding: '24px' }}>
                    {submitted ? (
                        <div style={{ textAlign: 'center', padding: '24px 0' }}>
                            <div style={{ width: '64px', height: '64px', background: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                                <Check size={32} color="#22c55e" />
                            </div>
                            <h4 style={{ fontSize: '17px', fontWeight: 900, color: '#0f172a', marginBottom: '6px' }}>Request Submitted!</h4>
                            <p style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '20px' }}>Admin will review and process your withdrawal within 24 hours</p>
                            <button
                                onClick={() => { setSubmitted(false); setMsg({ text: '', type: '' }); }}
                                style={{ background: '#eff6ff', color: '#2563eb', border: 'none', borderRadius: '14px', padding: '12px 24px', fontSize: '11px', fontWeight: 900, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                            >
                                New Withdrawal
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleWithdraw}>
                            {/* Amount */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>Amount to Withdraw</label>
                                <div style={{ position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px', fontWeight: 900, color: '#94a3b8' }}>₹</span>
                                    <input
                                        type="number" placeholder="0.00" value={amount}
                                        onChange={e => setAmount(e.target.value)} required min="300"
                                        style={{ width: '100%', height: '60px', background: '#f8fafc', border: '2px solid #f1f5f9', borderRadius: '16px', padding: '0 18px 0 42px', fontSize: '22px', fontWeight: 900, color: '#0f172a', outline: 'none', boxSizing: 'border-box' }}
                                    />
                                </div>
                            </div>

                            {/* Method Toggle */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>Payment Method</label>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                    {[
                                        { id: 'bank', label: 'Bank Transfer', icon: <Building2 size={18} /> },
                                        { id: 'upi', label: 'UPI', icon: <Smartphone size={18} /> },
                                    ].map(m => (
                                        <button
                                            key={m.id} type="button"
                                            onClick={() => setMethod(m.id)}
                                            style={{
                                                padding: '14px', borderRadius: '16px', border: `2px solid ${method === m.id ? '#2563eb' : '#f1f5f9'}`,
                                                background: method === m.id ? '#eff6ff' : 'white', cursor: 'pointer',
                                                display: 'flex', alignItems: 'center', gap: '10px',
                                                color: method === m.id ? '#2563eb' : '#94a3b8', transition: 'all 0.2s',
                                            }}
                                        >
                                            {m.icon}
                                            <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{m.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Bank Fields */}
                            {method === 'bank' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                                    {[
                                        { label: 'Account Holder Name', val: bankName, set: setBankName, placeholder: 'Full name as per bank' },
                                        { label: 'Account Number', val: accountNumber, set: setAccountNumber, placeholder: '12-digit account number' },
                                        { label: 'IFSC Code', val: ifsc, set: setIfsc, placeholder: 'e.g. SBIN0001234' },
                                    ].map(field => (
                                        <div key={field.label}>
                                            <label style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>{field.label}</label>
                                            <input
                                                type="text" placeholder={field.placeholder} value={field.val}
                                                onChange={e => field.set(e.target.value)} required
                                                style={{ width: '100%', height: '52px', background: '#f8fafc', border: '2px solid #f1f5f9', borderRadius: '14px', padding: '0 16px', fontSize: '14px', fontWeight: 700, color: '#0f172a', outline: 'none', boxSizing: 'border-box' }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* UPI Field */}
                            {method === 'upi' && (
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>Your UPI ID</label>
                                    <input
                                        type="text" placeholder="yourname@upi" value={upiId}
                                        onChange={e => setUpiId(e.target.value)} required
                                        style={{ width: '100%', height: '52px', background: '#f8fafc', border: '2px solid #f1f5f9', borderRadius: '14px', padding: '0 16px', fontSize: '14px', fontWeight: 700, color: '#0f172a', outline: 'none', boxSizing: 'border-box' }}
                                    />
                                </div>
                            )}

                            {/* Notice */}
                            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '14px', padding: '12px 16px', marginBottom: '20px', display: 'flex', gap: '10px' }}>
                                <AlertCircle size={16} color="#d97706" style={{ flexShrink: 0, marginTop: '1px' }} />
                                <p style={{ fontSize: '11px', fontWeight: 700, color: '#92400e', lineHeight: 1.5 }}>
                                    Amount will be deducted immediately. Withdrawals are processed manually by admin within 24 hours. If rejected, the amount will be refunded.
                                </p>
                            </div>

                            {msg.text && (
                                <div style={{
                                    padding: '12px 16px', borderRadius: '14px', marginBottom: '16px', fontSize: '11px', fontWeight: 800,
                                    textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'center',
                                    background: msg.type === 'success' ? '#f0fdf4' : '#fef2f2',
                                    color: msg.type === 'success' ? '#15803d' : '#dc2626',
                                    border: `1px solid ${msg.type === 'success' ? '#bbf7d0' : '#fecaca'}`,
                                }}>
                                    {msg.text}
                                </div>
                            )}

                            <button
                                type="submit" disabled={loading}
                                style={{
                                    width: '100%', height: '56px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                                    border: 'none', borderRadius: '18px', color: 'white', fontWeight: 900,
                                    fontSize: '13px', letterSpacing: '0.12em', textTransform: 'uppercase',
                                    cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
                                    boxShadow: '0 12px 24px rgba(37,99,235,0.3)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                }}
                            >
                                {loading ? 'Submitting...' : <><span>Submit Withdrawal</span><ArrowUpRight size={16} /></>}
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* Quick Links */}
            <a href="/history" style={{
                background: 'white', borderRadius: '20px', border: '1.5px solid #f1f5f9',
                padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                textDecoration: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '44px', height: '44px', background: '#f8fafc', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <History size={20} color="#64748b" />
                    </div>
                    <div>
                        <p style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>Transaction History</p>
                        <p style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>View all deposits & withdrawals</p>
                    </div>
                </div>
                <ChevronRight size={18} color="#94a3b8" />
            </a>

        </Layout>
    );
};

export default Wallet;
