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
                <div className="flex items-center gap-2 mb-6 opacity-80">
                    <Activity className="text-royal-blue animate-pulse" size={14} />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-royal-blue/60">Live Portfolio Flux</p>
                </div>

                <div className="glass-card !rounded-[3rem] p-10 relative overflow-hidden group border-black/5 bg-white/40 shadow-premium">
                    {/* Dynamic Ambient Background for Card - Ultra Blue Focus */}
                    <div className="absolute top-[-20%] right-[-10%] w-80 h-80 bg-royal-blue/20 rounded-full blur-[90px] group-hover:bg-royal-blue/30 transition-all duration-1000"></div>
                    <div className="absolute bottom-[-20%] left-[-10%] w-72 h-72 bg-electric-azure/20 rounded-full blur-[90px] group-hover:bg-electric-azure/30 transition-all duration-1000" style={{ animationDelay: '1.2s' }}></div>
                    <div className="absolute top-[20%] left-[20%] w-40 h-40 bg-deep-sapphire/20 rounded-full blur-[60px] group-hover:opacity-100 opacity-50 transition-all duration-1000"></div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-16">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-8 h-8 rounded-lg bg-royal-blue/10 flex items-center justify-center text-royal-blue">
                                        <Wallet size={16} />
                                    </div>
                                    <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.25em]">Vault Reserve</p>
                                </div>
                                <h2 className="text-5xl font-black tracking-tight text-text-bright flex items-baseline gap-2">
                                    <span className="text-2xl font-light text-text-muted/30 tracking-normal">₹</span>
                                    <span className="premium-gradient-text">{user?.walletBalance?.toLocaleString() || '0'}</span>
                                    <span className="text-sm font-black text-royal-blue bg-royal-blue/5 px-3 py-1 rounded-full ml-3 border border-royal-blue/10 shadow-sm">+0.00%</span>
                                </h2>
                            </div>
                            <div className="flex flex-col items-end gap-3">
                                <div className="px-5 py-2 bg-white border border-blue-50/50 rounded-2xl shadow-xl flex items-center gap-2.5">
                                    <div className="w-2 h-2 bg-royal-blue rounded-full animate-ping shadow-[0_0_12px_#2563eb]"></div>
                                    <span className="text-[10px] font-black text-text-bright uppercase tracking-[0.1em]">Secure Interface</span>
                                </div>
                                <p className="text-[10px] font-black text-royal-blue/40 uppercase tracking-[0.4em] mr-2">Core v4.2</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <button
                                onClick={() => setShowRecharge(true)}
                                className="btn-primary group/btn !bg-gradient-to-r from-royal-blue via-primary-indigo to-deep-sapphire border-none shadow-indigo !rounded-2xl py-6"
                            >
                                <ArrowDownRight size={22} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                <span className="relative z-10 text-base font-black tracking-widest">DEPOSIT HUB</span>
                            </button>
                            <button className="btn-secondary group/btn !bg-white border-blue-50/50 hover:!bg-blue-50 shadow-sm !rounded-2xl py-6">
                                <span className="relative z-10 text-base font-black tracking-widest text-text-bright uppercase">Outflow</span>
                                <ArrowUpRight size={22} className="text-royal-blue/30 group-hover/btn:text-royal-blue group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-all" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-4 mb-10">
                {[
                    { label: 'Today\'s Delta', value: '₹0.00', color: 'text-royal-blue', icon: <TrendingUp size={16} />, trend: '+0.0%', card: 'glass-card-blue' },
                    { label: 'Active Streams', value: '1', color: 'text-electric-azure', icon: <Globe size={16} />, trend: 'Stable', card: 'glass-card-blue' },
                    { label: 'Neural Rank', value: 'Prime', color: 'text-primary-indigo', icon: <Zap size={16} />, trend: 'Level 1', card: 'glass-card-sapphire' }
                ].map((stat, i) => (
                    <div key={i} className={`${stat.card} !rounded-[2.5rem] p-8 flex flex-col items-center group cursor-default hover:-translate-y-2 transition-all duration-700 bg-white/80 active:scale-[0.98]`}>
                        <div className={`p-4 rounded-2xl bg-white shadow-lg ${stat.color} mb-5 group-hover:rotate-6 transition-transform duration-500 border border-blue-50/50`}>
                            {stat.icon}
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-text-muted mb-2 text-center opacity-40">{stat.label}</p>
                        <p className={`text-2xl font-black ${stat.color} tracking-tight mb-4`}>{stat.value}</p>
                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-50 shadow-md">
                            <div className="w-2 h-2 rounded-full bg-royal-blue/30 shadow-inner"></div>
                            <span className="text-[10px] font-black text-text-bright uppercase tracking-tighter">{stat.trend}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Strategic Access */}
            <div className="flex items-center justify-between mb-8 px-4">
                <h3 className="text-base font-black text-text-bright flex items-center gap-3">
                    <Target size={18} className="text-royal-blue" /> Nexus Operations
                </h3>
                <span className="text-[10px] font-black text-royal-blue/40 uppercase tracking-[0.3em]">Stable Port 4.2</span>
            </div>

            <div className="space-y-4 mb-8">
                {[
                    { title: 'Neural Quantum Bot', desc: 'Syncing multi-protocol ROI cycles', icon: <Zap size={22} />, color: 'from-royal-blue to-primary-indigo', shadow: 'shadow-royal-blue/20' },
                    { title: 'Obsidian Lock', desc: 'Sovereign-grade asset repository', icon: <ShieldCheck size={22} />, color: 'from-deep-sapphire to-royal-blue', shadow: 'shadow-blue/20' }
                ].map((item, i) => (
                    <div key={i} className="glass-card !p-6 flex items-center gap-6 group cursor-pointer hover:bg-white/80 transition-all active:scale-[0.98] border-black/5 bg-white/40 shadow-premium">
                        <div className={`bg-gradient-to-br ${item.color} w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl ${item.shadow} transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                            {item.icon}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-lg text-text-bright leading-none mb-1.5">{item.title}</h3>
                            <p className="text-xs text-text-muted font-medium tracking-wide opacity-80">{item.desc}</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-text-muted group-hover:text-royal-blue group-hover:translate-x-1 transition-all">
                            <ChevronRight size={20} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Recharge Flow - Glass Modal - Light Mode */}
            {showRecharge && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-xl z-[200] flex items-end sm:items-center justify-center p-4">
                    <div className="bg-white w-full max-w-lg rounded-t-[3rem] sm:rounded-[3rem] p-10 border border-black/5 shadow-premium relative overflow-hidden animate-in slide-in-from-bottom duration-500">
                        {/* Modal Ambient Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-royal-blue/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px]"></div>

                        <div className="flex justify-between items-center mb-10 relative z-10">
                            <div>
                                <h2 className="text-3xl font-black tracking-tight text-text-bright uppercase">Injection <span className="text-royal-blue">Portal</span></h2>
                                <p className="text-[10px] font-black text-royal-blue/40 tracking-[0.4em] mt-2 uppercase">Unified Access Layer</p>
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
                            <p className="text-2xl font-mono font-black text-royal-blue tracking-widest select-all group-hover:scale-105 transition-transform">growindia@upi</p>
                        </div>

                        <form onSubmit={handleRecharge} className="space-y-6 relative z-10">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase text-text-muted ml-4 tracking-widest">Deposit Amount</label>
                                <div className="relative">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-royal-blue/20">₹</span>
                                    <input
                                        type="number"
                                        placeholder="Min 300"
                                        className="w-full bg-blue-50/50 border border-blue-100/50 rounded-2xl py-6 pl-14 pr-6 focus:border-royal-blue/30 outline-none text-3xl font-black text-text-bright transition-all placeholder:text-text-muted/10"
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
                                    className="w-full bg-blue-50/30 border border-blue-50/50 rounded-2xl py-6 px-6 focus:border-royal-blue/30 outline-none text-lg font-mono font-black text-royal-blue uppercase tracking-widest transition-all placeholder:text-royal-blue/20"
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
                            <button className="btn-primary w-full py-6 text-base uppercase tracking-[0.3em] font-black shadow-royal-blue mt-4 !bg-gradient-to-r from-royal-blue to-deep-sapphire border-none">CONFIRM DEPOSIT</button>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Home;
