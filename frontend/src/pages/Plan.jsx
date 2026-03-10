import React, { useEffect, useState, useContext } from 'react';
import Layout from '../components/Layout';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { ShoppingBag, Timer, TrendingUp, Gem, ChevronRight, Check, Award, Layers } from 'lucide-react';

const Plan = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState({ text: '', type: '' });
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        try {
            const res = await api.get('/invest/plans');
            setPlans(res.data);
        } finally {
            setLoading(false);
        }
    };

    const handleBuy = async (index) => {
        try {
            const res = await api.post('/invest/purchase', { planIndex: index });
            setMsg({ text: 'VAULT-LOCK: Activated', type: 'success' });
            const profile = await api.get('/user/profile');
            setUser(profile.data);
        } catch (err) {
            setMsg({ text: err.response?.data?.message || 'VAULT-ERR: Sig-Fail', type: 'error' });
        }
        setTimeout(() => setMsg({ text: '', type: '' }), 3000);
    };

    return (
        <Layout>
            <div className="mb-12">
                <div className="flex items-center gap-2 mb-2 opacity-50">
                    <Layers className="text-primary-neon" size={14} />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text-dim">Investment Clusters</p>
                </div>
                <div className="flex justify-between items-end">
                    <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase underline decoration-primary-neon/20 decoration-8 underline-offset-8">Vaults</h1>
                    <div className="bg-bg-card border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-3 shadow-2xl">
                        <span className="text-xs font-black text-text-dim uppercase tracking-widest">CRED:</span>
                        <span className="text-lg font-black text-primary-neon">₹{user?.walletBalance}</span>
                    </div>
                </div>
            </div>

            {msg.text && (
                <div className={`p-6 rounded-3xl mb-8 text-center font-black flex items-center justify-center gap-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] border ${msg.type === 'success' ? 'bg-success-neon/10 border-success-neon/40 text-success-neon' : 'bg-red-500/10 border-red-500/40 text-red-500'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${msg.type === 'success' ? 'bg-success-neon text-bg-deep' : 'bg-red-500 text-white'}`}>
                        {msg.type === 'success' ? <Check size={20} /> : <TrendingUp size={20} />}
                    </div>
                    <span className="text-sm uppercase tracking-[0.2em]">{msg.text}</span>
                </div>
            )}

            {loading && (
                <div className="space-y-8">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-72 bg-bg-card rounded-[3rem] border border-white/5 animate-pulse relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
                        </div>
                    ))}
                </div>
            )}

            <div className="space-y-10">
                {plans.map((plan, index) => (
                    <div key={index} className="bg-bg-card rounded-[3.5rem] p-10 border border-white/5 relative group transition-all duration-500 hover:border-primary-neon/20 hover:-translate-y-2 shadow-2xl overflow-hidden active:scale-95">
                        {/* Dynamic Background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-neon/5 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute -bottom-10 -left-10 text-white/5 rotate-12 transition-all group-hover:rotate-0">
                            <Award size={180} />
                        </div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-10">
                                <div className="flex items-center gap-5">
                                    <div className="w-20 h-20 bg-primary-neon/5 border border-primary-neon/20 rounded-[2rem] flex items-center justify-center text-primary-neon shadow-neon transform group-hover:rotate-6 transition-transform">
                                        <Gem size={42} />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black text-white tracking-tighter uppercase italic">{plan.name}</h3>
                                        <p className="text-[10px] font-black text-primary-neon tracking-[0.3em] mt-1 uppercase">Unit-v0{index + 1}_active</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-text-dim uppercase tracking-widest mb-1">STAKE</p>
                                    <p className="text-4xl font-black text-white tracking-tighter">₹{plan.amount.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-5 mb-10">
                                <div className="bg-white/5 border border-white/5 p-6 rounded-[2rem] group-hover:bg-primary-neon/5 transition-colors">
                                    <p className="text-[10px] font-black text-text-dim uppercase mb-2 flex items-center gap-2">
                                        <TrendingUp size={12} className="text-success-neon" /> DAILY_ROI
                                    </p>
                                    <p className="text-3xl font-black text-success-neon">₹{plan.daily.toLocaleString()}</p>
                                </div>
                                <div className="bg-white/5 border border-white/5 p-6 rounded-[2rem] group-hover:bg-secondary-neon/5 transition-colors">
                                    <p className="text-[10px] font-black text-text-dim uppercase mb-2 flex items-center gap-2">
                                        <ShoppingBag size={12} className="text-secondary-neon" /> TOTAL_NET
                                    </p>
                                    <p className="text-3xl font-black text-secondary-neon">₹{(plan.daily * 99).toLocaleString()}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => handleBuy(index)}
                                className="w-full bg-white/5 border border-white/10 text-white py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all hover:bg-white hover:text-bg-deep active:scale-95 shadow-2xl"
                            >
                                INITIALIZE_VAULT <ChevronRight size={20} />
                            </button>

                            <div className="mt-6 flex justify-center items-center gap-4 opacity-30 text-[9px] font-black tracking-widest uppercase">
                                <span className="flex items-center gap-1"><Timer size={10} /> 99_CYCLES</span>
                                <span className="w-1 h-1 bg-text-dim rounded-full"></span>
                                <span>SECURE_NODE_0{index + 1}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Plan;
