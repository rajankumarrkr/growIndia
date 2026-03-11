import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Wallet, ArrowDownRight, ArrowUpRight, TrendingUp, ShieldCheck, ChevronRight, Zap, Target, Globe, CreditCard, Activity, ArrowRight, PieChart, Layers, CheckCircle } from 'lucide-react';
import api from '../api/axios';
import Layout from '../components/Layout';

const Home = () => {
    const { user, setUser } = useContext(AuthContext);
    const [showRecharge, setShowRecharge] = useState(false);
    const [amount, setAmount] = useState('');
    const [utr, setUtr] = useState('');
    const [screenshot, setScreenshot] = useState('');
    const [msg, setMsg] = useState('');
    const [depositInfo, setDepositInfo] = useState({ upiId: 'Loading...', qrCode: '' });

    React.useEffect(() => {
        if (showRecharge) {
            const fetchDepositInfo = async () => {
                try {
                    const res = await api.get('/wallet/deposit-info');
                    setDepositInfo(res.data);
                } catch (err) { }
            };
            fetchDepositInfo();
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
        if (!screenshot) {
            setMsg('Please upload payment screenshot');
            setTimeout(() => setMsg(''), 2000);
            return;
        }
        try {
            await api.post('/wallet/recharge', { amount, utr, screenshot });
            setMsg('Transaction Initiated');
            setTimeout(() => { 
                setShowRecharge(false); 
                setMsg(''); 
                setAmount('');
                setUtr('');
                setScreenshot('');
            }, 2000);
        } catch (err) {
            setMsg(err.response?.data?.message || 'Transaction Failed');
        }
    };

    // Hypothetical chart data for visual polish
    const chartPath = "M 0 80 Q 50 70, 100 75 T 200 45 T 300 50 T 400 20";

    return (
        <Layout title="Dashboard">
            {/* Portfolio Overview Section */}
            <section className="mb-8">
                <div className="flex items-center justify-between mb-4 px-2">
                    <p className="text-label">Portfolio Overview</p>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                        <TrendingUp size={10} className="text-emerald-500" />
                        <span className="text-[10px] font-bold text-emerald-600">+12.4%</span>
                    </div>
                </div>

                <div className="fintech-card bg-royal-blue !p-8 relative overflow-hidden group">
                    {/* Atmospheric Glows */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 flex flex-col gap-8">
                        <div>
                            <p className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mb-1.5">Total Available Balance</p>
                            <h2 className="text-4xl font-black text-white tracking-tight flex items-baseline gap-2">
                                <span className="text-xl font-light opacity-50">₹</span>
                                {user?.walletBalance?.toLocaleString() || '0.00'}
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
                            <div>
                                <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">Total Invested</p>
                                <p className="text-lg font-black text-white">₹12,450</p>
                            </div>
                            <div>
                                <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">Gross Earnings</p>
                                <p className="text-lg font-black text-emerald-300">₹3,210</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Actions */}
            <section className="grid grid-cols-3 gap-4 mb-8">
                <button
                    onClick={() => setShowRecharge(true)}
                    className="flex flex-col items-center gap-3 group"
                >
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-fintech border border-slate-100 flex items-center justify-center text-royal-blue group-active:scale-95 transition-all">
                        <ArrowDownRight size={24} />
                    </div>
                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Deposit</span>
                </button>
                <button className="flex flex-col items-center gap-3 group">
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-fintech border border-slate-100 flex items-center justify-center text-slate-400 group-active:scale-95 transition-all">
                        <ArrowUpRight size={24} />
                    </div>
                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Withdraw</span>
                </button>
                <button className="flex flex-col items-center gap-3 group">
                    <div className="w-16 h-16 rounded-2xl bg-royal-blue shadow-lg shadow-blue-500/30 flex items-center justify-center text-white group-active:scale-95 transition-all">
                        <Target size={24} />
                    </div>
                    <span className="text-[11px] font-bold text-royal-blue uppercase tracking-wider">Invest</span>
                </button>
            </section>

            {/* Earnings Growth Visualization */}
            <section className="mb-8">
                <div className="fintech-card !p-0 overflow-hidden">
                    <div className="p-6 flex justify-between items-center border-b border-slate-50">
                        <div>
                            <p className="text-label">Earnings Growth</p>
                            <p className="text-xl font-black text-slate-900 mt-1">Growth Index</p>
                        </div>
                        <div className="flex gap-2">
                            {['1W', '1M', '3M'].map((t, i) => (
                                <button key={t} className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${i === 1 ? 'bg-royal-blue text-white' : 'bg-slate-50 text-slate-400 hover:text-slate-600'}`}>
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="h-40 relative px-2 pt-4">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="var(--color-royal-blue)" />
                                    <stop offset="100%" stopColor="white" />
                                </linearGradient>
                            </defs>
                            <path d={`${chartPath} L 400 100 L 0 100 Z`} className="chart-area" />
                            <path d={chartPath} className="chart-path" />
                        </svg>
                    </div>
                </div>
            </section>

            {/* Strategic Access Points */}
            <section className="mb-8 px-2">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Nexus Operations</h3>
                    <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest leading-none">Protocol Active</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {[
                        { title: 'Neural Quantum Bot', status: 'Syncing', icon: <Zap size={20} />, color: 'text-royal-blue', bg: 'bg-blue-50' },
                        { title: 'Sovereign Vault', status: 'Secured', icon: <ShieldCheck size={20} />, color: 'text-emerald-500', bg: 'bg-emerald-50' }
                    ].map((item, i) => (
                        <div key={i} className="fintech-card fintech-card-hover !p-5 flex items-center justify-between group">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center`}>
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-slate-800">{item.title}</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.status} Node</p>
                                </div>
                            </div>
                            <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-royal-blue group-hover:bg-blue-50 transition-all">
                                <ArrowRight size={14} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Recharge Portal Redesign */}
            {showRecharge && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] flex items-end justify-center">
                    <div className="bg-white w-full max-w-xl rounded-t-[3rem] p-8 pb-12 shadow-2xl animate-in slide-in-from-bottom duration-500">
                        <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-8" />

                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">Add Assets</h2>
                                <p className="text-label mt-1">Unified Gateway Protocol</p>
                            </div>
                            <button onClick={() => setShowRecharge(false)} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                <Globe size={20} />
                            </button>
                        </div>

                        <div className="mb-10 space-y-4">
                            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-royal-blue shadow-sm">
                                        <CreditCard size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gateway UPI</p>
                                        <p className="text-sm font-black text-slate-800 font-mono tracking-wider">{depositInfo.upiId}</p>
                                    </div>
                                </div>
                                <button type="button" onClick={handleCopyUpi} className="px-4 py-2 bg-white rounded-xl text-[10px] font-black text-royal-blue border border-slate-100 shadow-sm active:scale-95">COPY</button>
                            </div>
                            {depositInfo.qrCode && (
                                <div className="flex flex-col items-center justify-center p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Scan to Pay</p>
                                    <div className="w-32 h-32 bg-white rounded-xl p-2 shadow-sm border border-slate-200">
                                        <img src={depositInfo.qrCode} alt="QR Code" className="w-full h-full object-contain" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <form onSubmit={handleRecharge} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-label ml-2">Amount (₹)</label>
                                <input
                                    type="number"
                                    placeholder="Min 300"
                                    className="w-full h-18 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-2xl font-black text-slate-900 focus:bg-white focus:border-royal-blue/30 transition-all outline-none"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-label ml-2">UTR / Reference</label>
                                <input
                                    type="text"
                                    placeholder="12 digit transaction ID"
                                    className="w-full h-18 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-base font-black text-slate-900 focus:bg-white focus:border-royal-blue/30 transition-all outline-none"
                                    value={utr}
                                    onChange={(e) => setUtr(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-label ml-2">Payment Screenshot</label>
                                <div className="relative w-full h-18 bg-slate-50 border border-slate-100 rounded-2xl flex items-center px-4 hover:border-royal-blue/30 transition-all overflow-hidden">
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleScreenshotUpload}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                                        required={!screenshot} 
                                    />
                                    <div className="flex items-center gap-3 pointer-events-none">
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                                            {screenshot ? <CheckCircle size={18} className="text-emerald-500" /> : <Layers size={18} />}
                                        </div>
                                        <div>
                                            {screenshot ? (
                                                <p className="text-xs font-black text-emerald-600 uppercase tracking-widest">Image Attached</p>
                                            ) : (
                                                <>
                                                    <p className="text-xs font-black text-slate-600">Select Proof Image</p>
                                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">JPEG/PNG/HEIC</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {msg && (
                                <div className={`p-4 rounded-xl text-center text-xs font-black uppercase tracking-widest ${msg.includes('Failed') ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'}`}>
                                    {msg}
                                </div>
                            )}

                            <button className="btn-fintech btn-fintech-primary w-full mt-4 uppercase tracking-[0.2em] text-xs">
                                Confirm Asset Injection
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Home;
