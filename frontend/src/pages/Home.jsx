import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Wallet, ArrowDownCircle, ArrowUpCircle, TrendingUp, ShieldCheck, ChevronRight, Zap, Target, Globe } from 'lucide-react';
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
            setMsg('TRANS-INIT: Request Buffered');
            setTimeout(() => { setShowRecharge(false); setMsg(''); }, 2000);
        } catch (err) {
            setMsg(err.response?.data?.message || 'TRANS-ERR: Rejected');
        }
    };

    return (
        <Layout>
            {/* Wallet Dashboard */}
            <div className="mb-12 relative">
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary-neon/5 rounded-full blur-[80px] animate-pulse"></div>

                <div className="flex items-center gap-2 mb-4 opacity-50">
                    <Globe className="text-primary-neon animate-spin-slow" size={14} />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text-dim">Global Liquidity Index</p>
                </div>

                <div className="bg-bg-card rounded-[3rem] p-10 border border-white/5 relative overflow-hidden group shadow-2xl">
                    {/* Animated Background Lines */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-primary-neon to-transparent animate-infinite-scroll"></div>
                        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-secondary-neon to-transparent animate-infinite-scroll [animation-delay:2s]"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-text-dim mb-1">Available Credits</p>
                                <h2 className="text-6xl font-black tracking-tight text-white drop-shadow-2xl">
                                    ₹{user?.walletBalance?.toLocaleString() || '0'}
                                </h2>
                            </div>
                            <div className="w-14 h-14 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-primary-neon">
                                <Target size={28} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setShowRecharge(true)}
                                className="btn-vibrant py-5"
                            >
                                <ArrowDownCircle size={22} className="group-hover:rotate-90 transition-transform" /> INJECT
                            </button>
                            <button className="bg-white/5 backdrop-blur-md text-white font-black py-4 rounded-2xl hover:bg-white/10 transition-all border border-white/10 flex items-center justify-center gap-2 tracking-widest text-sm shadow-xl">
                                OUTLET <ArrowUpCircle size={20} className="opacity-50" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Realtime Stats */}
            <div className="grid grid-cols-3 gap-3 mb-10">
                {[
                    { label: 'Yield', value: '+₹0', color: 'text-success-neon' },
                    { label: 'Nodes', value: '0', color: 'text-primary-neon' },
                    { label: 'Rank', value: 'α-1', color: 'text-secondary-neon' }
                ].map((stat, i) => (
                    <div key={i} className="bg-bg-card border border-white/5 rounded-[1.8rem] p-5 flex flex-col items-center shadow-lg relative overflow-hidden group">
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-text-dim mb-1 relative z-10">{stat.label}</p>
                        <p className={`text-xl font-black ${stat.color} relative z-10 tracking-tighter`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Premium Operations */}
            <h3 className="text-[10px] font-black text-text-dim uppercase tracking-[0.3em] mb-6 ml-2">Operational Nexus</h3>
            <div className="space-y-4 mb-4">
                {[
                    { title: 'Neural Yield Bot', desc: 'Quantum ROI Credits @ 00:00', icon: <Zap />, color: 'from-cyan-500 to-blue-600' },
                    { title: 'Obsidian Plan', desc: 'Secure 99-Cycle Locked Growth', icon: <ShieldCheck />, color: 'from-purple-500 to-indigo-600' }
                ].map((item, i) => (
                    <div key={i} className="bg-bg-card border border-white/5 rounded-[2.2rem] p-6 flex items-center gap-6 group cursor-pointer hover:border-primary-neon/20 transition-all shadow-xl hover:-translate-y-1">
                        <div className={`bg-gradient-to-br ${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-2xl transition-transform group-hover:rotate-12`}>
                            {item.icon}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-black text-lg text-white leading-tight tracking-tight uppercase italic">{item.title}</h3>
                            <p className="text-[10px] text-text-dim font-bold tracking-widest uppercase mt-1 opacity-60">{item.desc}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-text-dim group-hover:text-primary-neon transition-colors">
                            <ChevronRight size={20} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Recharge Modal */}
            {showRecharge && (
                <div className="fixed inset-0 bg-bg-deep/90 backdrop-blur-xl z-[200] flex items-end sm:items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-bg-card w-full max-w-md rounded-t-[4rem] sm:rounded-[4rem] p-12 border border-white/10 shadow-[0_-20px_100px_rgba(6,182,212,0.1)] relative overflow-hidden animate-in slide-in-from-bottom duration-700">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-neon/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px]"></div>

                        <div className="flex justify-between items-center mb-12 relative z-10">
                            <div>
                                <h2 className="text-4xl font-black tracking-tighter text-white italic uppercase">Injection</h2>
                                <p className="text-[10px] font-black text-primary-neon tracking-[0.3em] mt-1">WALLET_RECHARGE_v4.0</p>
                            </div>
                            <button
                                onClick={() => setShowRecharge(false)}
                                className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-full hover:bg-white/10 transition-colors text-white border border-white/10"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="mb-12 p-8 bg-white/5 rounded-[2.5rem] border border-white/10 relative group">
                            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-primary-neon to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <p className="text-[11px] text-text-dim font-black uppercase mb-3 tracking-widest text-center">SYSTEM_GATEWAY_UPI</p>
                            <p className="text-3xl font-mono font-black text-white text-center tracking-[0.1em] select-all italic drop-shadow-neon">growindia@upi</p>
                        </div>

                        <form onSubmit={handleRecharge} className="space-y-8 relative z-10">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase text-text-dim ml-6 tracking-[0.3em]">Quantum Value</label>
                                <input
                                    type="number"
                                    placeholder="Min ₹300"
                                    className="w-full bg-white/5 border border-white/10 rounded-[1.8rem] py-6 px-10 focus:border-primary-neon outline-none text-3xl font-black text-white transition-all shadow-inner placeholder:text-white/10"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase text-text-dim ml-6 tracking-[0.3em]">Verification Key (UTR)</label>
                                <input
                                    type="text"
                                    placeholder="12-DIGIT HASH"
                                    className="w-full bg-white/5 border border-white/10 rounded-[1.8rem] py-6 px-10 focus:border-primary-neon outline-none text-2xl font-mono font-black text-primary-neon uppercase tracking-widest transition-all shadow-inner placeholder:text-primary-neon/10"
                                    value={utr}
                                    onChange={(e) => setUtr(e.target.value)}
                                    required
                                />
                            </div>
                            {msg && (
                                <div className="bg-primary-neon/10 border border-primary-neon/20 text-primary-neon p-6 rounded-2xl text-center font-black text-xs tracking-[0.2em] animate-pulse">
                                    {msg}
                                </div>
                            )}
                            <button className="btn-vibrant w-full py-6 text-lg uppercase tracking-[0.3em] font-black shadow-neon">INIT_INJECT</button>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Home;
