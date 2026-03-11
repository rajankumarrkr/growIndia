import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Wallet, ArrowDownRight, ArrowUpRight, TrendingUp, ShieldCheck, ChevronRight, Zap, Target, Globe, CreditCard, Activity } from 'lucide-react';
import api from '../api/axios';
import Layout from '../components/Layout';

const Home = () => {
    const { user, setUser } = useContext(AuthContext);
    const [showRecharge, setShowRecharge] = useState(false);
    const [amount, setAmount] = useState('');
    const [utr, setUtr] = useState('');
    const [msg, setMsg] = useState('');

    const handleRecharge = async (e) => {
        e.preventDefault();
        try {
            await api.post('/wallet/recharge', { amount, utr });
            setMsg('Transaction Initiated');
            setTimeout(() => { setShowRecharge(false); setMsg(''); }, 2000);
        } catch (err) {
            setMsg(err.response?.data?.message || 'Transaction Failed');
        }
    };

    return (
        <Layout>
            {/* Main Portfolio Header */}
            <div className="mb-10 relative">
                <div className="flex items-center gap-2 mb-6 opacity-60">
                    <Activity className="text-primary-indigo animate-pulse" size={14} />
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">Live Portfolio Status</p>
                </div>

                <div className="glass-card p-8 relative overflow-hidden group border-black/5 bg-white shadow-premium">
                    {/* Interior Glow - Subtle for light mode */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary-indigo/5 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary-indigo/10 transition-all duration-700"></div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <p className="text-xs font-semibold text-text-muted mb-2 flex items-center gap-2">
                                    <CreditCard size={14} className="text-primary-indigo" /> Total Balance
                                </p>
                                <h2 className="text-5xl font-extrabold tracking-tight text-text-bright flex items-baseline gap-1">
                                    <span className="text-3xl font-medium text-text-muted/50">₹</span>
                                    {user?.walletBalance?.toLocaleString() || '0'}
                                </h2>
                            </div>
                            <div className="px-3 py-1 bg-primary-indigo/5 border border-primary-indigo/10 rounded-full">
                                <span className="text-[10px] font-bold text-primary-indigo uppercase tracking-wider">Verified Account</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setShowRecharge(true)}
                                className="btn-primary"
                            >
                                <ArrowDownRight size={20} /> Deposit
                            </button>
                            <button className="btn-secondary !bg-black/5 !border-black/5 hover:!bg-black/10">
                                Withdraw <ArrowUpRight size={20} className="opacity-50" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-4 mb-10">
                {[
                    { label: 'Today\'s Yield', value: '+₹0', color: 'text-emerald-500', sub: 'Calculated at 00:00' },
                    { label: 'Active Nodes', value: '0', color: 'text-primary-indigo', sub: 'Syncing...' },
                    { label: 'Tier Level', value: 'Alpha-1', color: 'text-secondary-violet', sub: 'Next: Alpha-2' }
                ].map((stat, i) => (
                    <div key={i} className="glass-card !rounded-2xl p-5 flex flex-col items-center group cursor-default hover:border-primary-indigo/20 transition-all border-black/5 bg-white shadow-premium">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2 text-center">{stat.label}</p>
                        <p className={`text-xl font-extrabold ${stat.color} mb-1 tracking-tight`}>{stat.value}</p>
                        <p className="text-[8px] font-medium text-text-muted/60 text-center uppercase tracking-tight">{stat.sub}</p>
                    </div>
                ))}
            </div>

            {/* Strategic Access */}
            <div className="flex items-center justify-between mb-6 px-2">
                <h3 className="text-sm font-bold text-text-bright flex items-center gap-2">
                    <Target size={16} className="text-primary-indigo" /> Operations Center
                </h3>
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-50">v4.0.2 Stable</span>
            </div>

            <div className="space-y-4 mb-8">
                {[
                    { title: 'Neural Yield Bot', desc: 'Automated 24h ROI Credit cycles', icon: <Zap size={22} />, color: 'from-indigo-600 to-violet-700' },
                    { title: 'Obsidian Lock', desc: 'Institutional grade security vault', icon: <ShieldCheck size={22} />, color: 'from-slate-700 to-slate-800' }
                ].map((item, i) => (
                    <div key={i} className="glass-card !p-5 flex items-center gap-5 group cursor-pointer hover:bg-black/5 transition-all active:scale-[0.98] border-black/5 bg-white shadow-premium">
                        <div className={`bg-gradient-to-br ${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110`}>
                            {item.icon}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-base text-text-bright leading-none mb-1">{item.title}</h3>
                            <p className="text-[10px] text-text-muted font-medium tracking-wide">{item.desc}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-text-muted group-hover:text-primary-indigo transition-colors">
                            <ChevronRight size={18} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Recharge Flow - Glass Modal - Light Mode */}
            {showRecharge && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-xl z-[200] flex items-end sm:items-center justify-center p-4">
                    <div className="bg-white w-full max-w-lg rounded-t-[3rem] sm:rounded-[3rem] p-10 border border-black/5 shadow-premium relative overflow-hidden animate-in slide-in-from-bottom duration-500">
                        {/* Modal Ambient Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-indigo/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px]"></div>

                        <div className="flex justify-between items-center mb-10 relative z-10">
                            <div>
                                <h2 className="text-3xl font-extrabold tracking-tight text-text-bright">Wallet Injection</h2>
                                <p className="text-[10px] font-bold text-primary-indigo tracking-[0.2em] mt-1 uppercase">Secure Transfer Protocol</p>
                            </div>
                            <button
                                onClick={() => setShowRecharge(false)}
                                className="w-10 h-10 flex items-center justify-center bg-black/5 rounded-full hover:bg-black/10 transition-colors text-text-bright"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="mb-10 p-6 bg-black/5 rounded-2xl border border-black/5 text-center group">
                            <p className="text-[10px] text-text-muted font-bold uppercase mb-2 tracking-widest">Gateway UPI ID</p>
                            <p className="text-2xl font-mono font-bold text-primary-indigo tracking-widest select-all group-hover:scale-105 transition-transform">growindia@upi</p>
                        </div>

                        <form onSubmit={handleRecharge} className="space-y-6 relative z-10">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase text-text-muted ml-4 tracking-widest">Deposit Amount</label>
                                <div className="relative">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-text-muted/40">₹</span>
                                    <input
                                        type="number"
                                        placeholder="Min 300"
                                        className="w-full bg-black/5 border border-black/5 rounded-2xl py-5 pl-12 pr-6 focus:border-primary-indigo outline-none text-2xl font-bold text-text-bright transition-all placeholder:text-text-muted/20"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase text-text-muted ml-4 tracking-widest">Verification UTR</label>
                                <input
                                    type="text"
                                    placeholder="12-digit transaction number"
                                    className="w-full bg-black/5 border border-black/5 rounded-2xl py-5 px-6 focus:border-primary-indigo outline-none text-lg font-mono font-bold text-primary-indigo uppercase tracking-widest transition-all placeholder:text-primary-indigo/20"
                                    value={utr}
                                    onChange={(e) => setUtr(e.target.value)}
                                    required
                                />
                            </div>
                            {msg && (
                                <div className={`p-4 rounded-xl text-center font-bold text-xs tracking-wide animate-pulse ${msg.includes('Failed') ? 'bg-danger-rose/10 text-danger-rose border border-danger-rose/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'}`}>
                                    {msg}
                                </div>
                            )}
                            <button className="btn-primary w-full py-5 text-base uppercase tracking-widest font-extrabold shadow-indigo mt-4">Confirm Deposit</button>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Home;
