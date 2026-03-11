import React, { useEffect, useState, useContext } from 'react';
import Layout from '../components/Layout';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { ShoppingBag, Timer, TrendingUp, Gem, ChevronRight, Check, Award, Layers, Wallet, ArrowRight, Activity, Zap } from 'lucide-react';

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
            setMsg({ text: 'Investment Activated', type: 'success' });
            const profile = await api.get('/user/profile');
            setUser(profile.data);
        } catch (err) {
            setMsg({ text: err.response?.data?.message || 'Activation Failed', type: 'error' });
        }
        setTimeout(() => setMsg({ text: '', type: '' }), 3000);
    };

    return (
        <Layout title="Investment Tiers">
            {/* Header Section */}
            <div className="mb-10 px-2 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Investment Plans</h1>
                    <p className="text-label mt-1">Select a protocol to begin earning</p>
                </div>
                <div className="flex flex-col items-end">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Available Liquidity</p>
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-black text-royal-blue">₹{user?.walletBalance?.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            {msg.text && (
                <div className={`mx-2 p-4 rounded-2xl mb-8 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 border ${msg.type === 'success'
                    ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                    : 'bg-red-50 border-red-100 text-red-600'
                    }`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${msg.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                        }`}>
                        {msg.type === 'success' ? <Check size={16} /> : <Activity size={16} />}
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider">{msg.text}</span>
                </div>
            )}

            {/* Loading Skeletal State */}
            {loading && (
                <div className="space-y-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-64 bg-slate-50 border border-slate-100 rounded-[2.5rem] animate-pulse"></div>
                    ))}
                </div>
            )}

            {/* Investment Grid */}
            <div className="space-y-6 mb-12">
                {plans.map((plan, index) => (
                    <div key={index} className="fintech-card !p-8 group relative overflow-hidden">
                        {/* Status Badge */}
                        <div className="absolute top-8 right-8 flex items-center gap-1.5 px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
                            <div className="w-1.5 h-1.5 bg-royal-blue rounded-full animate-pulse" />
                            <span className="text-[10px] font-black text-royal-blue uppercase tracking-widest">Active Pool</span>
                        </div>

                        <div className="flex items-start gap-5 mb-10">
                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-royal-blue group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                                <Zap size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-2">{plan.name}</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tier {index + 1} Investment Protocol</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-10 pb-10 border-b border-slate-50">
                            <div>
                                <p className="text-label mb-1.5">Stake Amount</p>
                                <p className="text-2xl font-black text-slate-900">₹{plan.amount.toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-label mb-1.5">Daily Return</p>
                                <p className="text-2xl font-black text-royal-blue">₹{plan.daily.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-8 text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1">
                            <div className="flex items-center gap-2">
                                <Timer size={14} className="text-slate-300" />
                                <span>99 Cycles</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <TrendingUp size={14} className="text-emerald-500" />
                                <span>Total: ₹{(plan.daily * 99).toLocaleString()}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => handleBuy(index)}
                            className="btn-fintech btn-fintech-primary w-full py-5 text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2"
                        >
                            Stake Assets <ArrowRight size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Plan;
