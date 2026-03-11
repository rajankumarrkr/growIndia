import React, { useContext, useState } from 'react';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownRight, History, Landmark, ShieldCheck, ChevronRight, Activity, AlertCircle } from 'lucide-react';

const Wallet = () => {
    const { user, setUser } = useContext(AuthContext);
    const [amount, setAmount] = useState('');
    const [msg, setMsg] = useState({ text: '', type: '' });
    const [loading, setLoading] = useState(false);

    const handleWithdraw = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/wallet/withdraw', { amount });
            setMsg({ text: res.data.message, type: 'success' });
            // Refresh profile to get updated balance
            const profile = await api.get('/user/profile');
            setUser(profile.data);
            setAmount('');
        } catch (err) {
            setMsg({ text: err.response?.data?.message || 'Withdrawal Failed', type: 'error' });
        } finally {
            setLoading(false);
            setTimeout(() => setMsg({ text: '', type: '' }), 4000);
        }
    };

    return (
        <Layout title="Wallet Hub">
            {/* Balance Card */}
            <section className="mb-10">
                <div className="fintech-card bg-royal-blue !p-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <div className="relative z-10 flex flex-col gap-10">
                        <div>
                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] mb-2">Total Liquid Assets</p>
                            <h2 className="text-5xl font-black text-white tracking-tight flex items-baseline gap-2">
                                <span className="text-2xl font-light opacity-40">₹</span>
                                {user?.walletBalance?.toLocaleString() || '0.00'}
                            </h2>
                        </div>

                        <div className="flex items-center justify-between pt-8 border-t border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                                    <Landmark size={20} />
                                </div>
                                <div>
                                    <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-0.5">Linked Channel</p>
                                    <p className="text-xs font-black text-white">{user?.bankDetails?.accountNumber ? `**** ${user.bankDetails.accountNumber.slice(-4)}` : 'Not Linked'}</p>
                                </div>
                            </div>
                            <div className="p-2.5 bg-emerald-500/20 rounded-xl text-emerald-400">
                                <ShieldCheck size={18} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Withdraw Section */}
            <section className="mb-10 px-2 text-center">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Asset Withdrawal</h3>
                    <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest leading-none">Min: ₹300</p>
                </div>

                <form onSubmit={handleWithdraw} className="fintech-card !p-8">
                    {!user?.bankDetails?.accountNumber ? (
                        <div className="flex flex-col items-center gap-4 py-4">
                            <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center">
                                <AlertCircle size={24} />
                            </div>
                            <p className="text-xs font-bold text-slate-500 leading-relaxed px-4">
                                Bank registry required for liquid settlement.
                            </p>
                            <a href="/profile" className="text-[11px] font-black text-royal-blue uppercase tracking-widest border-b border-royal-blue/20 pb-0.5">
                                Configure Bank Details
                            </a>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="Enter amount"
                                    className="w-full h-18 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-2xl font-black text-slate-900 focus:bg-white focus:border-royal-blue/30 transition-all outline-none"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                />
                                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-black text-royal-blue uppercase">INR</span>
                            </div>

                            {msg.text && (
                                <div className={`p-4 rounded-xl text-center text-[10px] font-black uppercase tracking-widest animate-pulse ${msg.type === 'success' ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'}`}>
                                    {msg.text}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-fintech btn-fintech-primary w-full py-5 text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                            >
                                {loading ? 'Processing...' : (
                                    <>
                                        Withdraw Assets <ArrowUpRight size={16} />
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </form>
            </section>

            {/* Quick Actions / Activity */}
            <section className="px-2">
                <div className="grid grid-cols-1 gap-4">
                    <a href="/history" className="fintech-card fintech-card-hover !p-6 flex items-center justify-between group">
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-royal-blue transition-all duration-500">
                                <History size={20} />
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-slate-800">Operational History</h4>
                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Transaction Logs</p>
                            </div>
                        </div>
                        <ChevronRight size={18} className="text-slate-300 group-hover:text-royal-blue transition-all" />
                    </a>
                </div>
            </section>
        </Layout>
    );
};

export default Wallet;
