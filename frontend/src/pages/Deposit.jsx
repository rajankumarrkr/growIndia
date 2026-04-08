import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { 
    X, Zap, CheckCircle, Image as ImageIcon, 
    ArrowDownRight, ShieldCheck, Check, 
    QrCode, ExternalLink, Copy
} from 'lucide-react';
import api from '../api/axios';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';

const Deposit = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [amount, setAmount] = useState('');
    const [utr, setUtr] = useState('');
    const [screenshot, setScreenshot] = useState('');
    const [screenshotFile, setScreenshotFile] = useState(null);
    const [msg, setMsg] = useState({ text: '', type: '' });
    const [depositInfo, setDepositInfo] = useState({ upiId: 'Loading...', qrCode: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        api.get('/wallet/deposit-info')
            .then(res => setDepositInfo(res.data))
            .catch(() => { });
    }, []);

    const handleScreenshotUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setScreenshotFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setScreenshot(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleCopyUpi = () => {
        navigator.clipboard.writeText(depositInfo.upiId);
        setMsg({ text: 'UPI ID Copied!', type: 'success' });
        setTimeout(() => setMsg({ text: '', type: '' }), 2500);
    };

    const handleRecharge = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (isSubmitting) return;
        
        if (!amount || amount < 300) {
            setMsg({ text: 'Minimum recharge is ₹300', type: 'error' });
            return;
        }
        if (!utr || utr.length < 10) {
            setMsg({ text: 'Please enter a valid Transaction ID', type: 'error' });
            return;
        }
        if (!screenshotFile) {
            setMsg({ text: 'Please upload payment screenshot', type: 'error' });
            return;
        }

        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('amount', amount);
            formData.append('utr', utr);
            formData.append('screenshot', screenshotFile);

            await api.post('/wallet/recharge', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            setMsg({ text: 'Deposit Request Submitted! Waiting for approval.', type: 'success' });
            
            setTimeout(() => {
                navigate('/history');
            }, 3000);
        } catch (err) {
            setMsg({ text: err.response?.data?.message || 'Submission Failed', type: 'error' });
            setIsSubmitting(false);
        }
    };

    return (
        <Layout title="Deposit Funds">
            <div style={{ maxWidth: '600px', margin: '0 auto', paddingBottom: '40px' }}>
                
                {/* Header Section */}
                <div style={{
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #2563eb 100%)',
                    borderRadius: '28px', padding: '28px 24px', marginBottom: '24px',
                    position: 'relative', overflow: 'hidden',
                }}>
                    <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '130px', height: '130px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <ArrowDownRight size={22} color="white" />
                            </div>
                            <div>
                                <h2 style={{ fontSize: '20px', fontWeight: 900, color: 'white', lineHeight: 1.2 }}>Fast Recharge</h2>
                                <p style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Secure UPI Gateway</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.08)', borderRadius: '16px', padding: '14px 16px' }}>
                            <div style={{ width: '36px', height: '36px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <ShieldCheck size={18} color="#4ade80" />
                            </div>
                            <div>
                                <p style={{ fontSize: '12px', fontWeight: 800, color: 'white' }}>Anti-Fraud Protection Active</p>
                                <p style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.4)' }}>Every transaction is verified manually for safety</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Card */}
                <div style={{ background: 'white', borderRadius: '24px', border: '1.5px solid #f1f5f9', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
                    
                    {/* Step 1: Payment Details */}
                    <div style={{ padding: '24px', borderBottom: '1px solid #f1f5f9' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900 }}>1</div>
                            <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a' }}>Make Payment</h3>
                        </div>

                        <div style={{
                            background: '#0f172a', borderRadius: '20px', padding: '20px',
                            color: 'white', marginBottom: '20px', position: 'relative'
                        }}>
                            <div style={{ marginBottom: '20px' }}>
                                <p style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Official Merchant UPI</p>
                                <div style={{ 
                                    display: 'flex', alignItems: 'center', gap: '12px',
                                    background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '12px 14px',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}>
                                    <p style={{ fontSize: '15px', fontWeight: 700, fontFamily: 'monospace', flex: 1, wordBreak: 'break-all' }}>{depositInfo.upiId}</p>
                                    <button onClick={handleCopyUpi} style={{ background: '#2563eb', border: 'none', borderRadius: '8px', padding: '8px 12px', color: 'white', fontSize: '10px', fontWeight: 900, cursor: 'pointer' }}>
                                        COPY
                                    </button>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ background: 'white', borderRadius: '16px', padding: '12px', width: '160px', height: '160px', boxShadow: '0 12px 30px rgba(0,0,0,0.3)' }}>
                                    {depositInfo.qrCode ? (
                                        <img src={depositInfo.qrCode} alt="QR" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <QrCode size={40} color="#cbd5e1" />
                                        </div>
                                    )}
                                </div>
                                <p style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginTop: '16px', textTransform: 'uppercase' }}>Scan to pay with any UPI App</p>
                            </div>
                        </div>
                    </div>

                    {/* Step 2: Submit Proof */}
                    <div style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900 }}>2</div>
                            <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a' }}>Submit Proof</h3>
                        </div>

                        <form onSubmit={handleRecharge} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>Amount Paid (₹)</label>
                                <div style={{ position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px', fontWeight: 900, color: '#94a3b8' }}>₹</span>
                                    <input 
                                        type="number" placeholder="Enter amount" value={amount}
                                        onChange={e => setAmount(e.target.value)}
                                        style={{ width: '100%', height: '56px', background: '#f8fafc', border: '2px solid #f1f5f9', borderRadius: '16px', padding: '0 16px 0 38px', fontSize: '18px', fontWeight: 900, color: '#0f172a', outline: 'none', boxSizing: 'border-box' }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>Transaction ID (UTR)</label>
                                <input 
                                    type="text" placeholder="12-digit UTR number" value={utr}
                                    onChange={e => setUtr(e.target.value)}
                                    style={{ width: '100%', height: '56px', background: '#f8fafc', border: '2px solid #f1f5f9', borderRadius: '16px', padding: '0 16px', fontSize: '15px', fontWeight: 700, color: '#0f172a', outline: 'none', boxSizing: 'border-box' }}
                                />
                            </div>

                            <div>
                                <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>Payment Screenshot</label>
                                <label style={{ 
                                    display: 'flex', alignItems: 'center', gap: '16px', 
                                    padding: '16px 20px', background: '#f8fafc', 
                                    border: '2px dashed #e2e8f0', borderRadius: '16px',
                                    cursor: 'pointer', transition: 'all 0.2s'
                                }}>
                                    <input type="file" accept="image/*" onChange={handleScreenshotUpload} style={{ display: 'none' }} />
                                    <div style={{ 
                                        width: '44px', height: '44px', borderRadius: '12px', 
                                        background: screenshot ? '#f0fdf4' : 'white',
                                        color: screenshot ? '#22c55e' : '#94a3b8',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                                    }}>
                                        {screenshot ? <Check size={20} /> : <ImageIcon size={20} />}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontSize: '13px', fontWeight: 800, color: screenshot ? '#15803d' : '#475569' }}>
                                            {screenshot ? 'Screenshot Attached ✓' : 'Upload Payment Receipt'}
                                        </p>
                                        <p style={{ fontSize: '10px', fontWeight: 600, color: '#94a3b8' }}>High quality JPEG/PNG required</p>
                                    </div>
                                </label>
                            </div>

                            {msg.text && (
                                <div style={{ 
                                    padding: '14px', borderRadius: '14px', fontSize: '11px', fontWeight: 800,
                                    textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center',
                                    background: msg.type === 'success' ? '#f0fdf4' : '#fef2f2',
                                    color: msg.type === 'success' ? '#15803d' : '#dc2626',
                                    border: `1px solid ${msg.type === 'success' ? '#bbf7d0' : '#fecaca'}`,
                                }}>
                                    {msg.text}
                                </div>
                            )}

                            <button 
                                type="submit" disabled={isSubmitting}
                                style={{
                                    width: '100%', height: '56px', borderRadius: '16px',
                                    background: isSubmitting ? '#94a3b8' : 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                                    color: 'white', fontWeight: 900, fontSize: '13px',
                                    letterSpacing: '0.12em', textTransform: 'uppercase', border: 'none',
                                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                    boxShadow: '0 12px 24px rgba(37,99,235,0.3)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                    marginTop: '10px'
                                }}
                            >
                                {isSubmitting ? 'Processing...' : 'Submit Deposit Request'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Notice Footer */}
                <div style={{ marginTop: '24px', padding: '16px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Zap size={16} color="#eab308" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <p style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', lineHeight: 1.5 }}>
                            <strong style={{ color: '#0f172a' }}>Notice:</strong> Deposits are manually processed by our team. Please allow 15-60 minutes for the balance to reflect in your wallet after submission. Do not submit multiple requests for the same payment.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Deposit;
