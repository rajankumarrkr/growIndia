import React, { useEffect, useState, useContext } from 'react';
import Layout from '../components/Layout';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { ShoppingBag, Timer, TrendingUp, Gem, ChevronRight, Check, Award, Layers, Wallet } from 'lucide-react';

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
        <Layout>
            <div className="mb-10">
                <div className="flex items-center gap-2 mb-4 opacity-60">
                    <Layers className="text-primary-indigo" size={14} />
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">Portfolio Expansion</p>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h1 className="text-4xl font-extrabold text-text-bright tracking-tight">Investment Tiers</h1>
                    <div className="glass-card !rounded-2xl px-6 py-3 flex items-center gap-4 !bg-white border-black/5 shadow-premium">
                        <div className="w-10 h-10 rounded-xl bg-primary-indigo/10 flex items-center justify-center text-primary-indigo border border-primary-indigo/20">
                            <Wallet size={20} />
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest leading-none mb-1">Available Credits</p>
                            <p className="text-xl font-extrabold text-text-bright leading-none">₹{user?.walletBalance?.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            {msg.text && (
                <div className={`p-5 rounded-2xl mb-8 flex items-center gap-4 animate-in fade-in zoom-in duration-300 border ${msg.type === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                    : 'bg-danger-rose/10 border-danger-rose/20 text-danger-rose'
                    }`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${msg.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-danger-rose text-white'
                        }`}>
                        {msg.type === 'success' ? <Check size={20} /> : <TrendingUp size={20} />}
                    </div>
                    <span className="text-sm font-bold uppercase tracking-wider">{msg.text}</span>
                </div>
            )}

            {loading && (
                <div className="space-y-8">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-64 glass-card animate-pulse shadow-premium border-black/5"></div>
                    ))}
                </div>
            )}

            <div className="space-y-8 mb-12">
                {plans.map((plan, index) => (
                    <div key={index} className="glass-card p-1 relative group transition-all duration-500 hover:border-primary-indigo/30 hover:shadow-indigo !bg-white border-black/5 shadow-premium">
                        <div className="p-7 relative z-10">
                            <div className="flex justify-between items-start mb-10">
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 bg-black/5 border border-black/5 rounded-2xl flex items-center justify-center text-primary-indigo relative group-hover:bg-primary-indigo/5 group-hover:border-primary-indigo/20 transition-all">
                                        <Gem size={32} />
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></div>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-extrabold text-text-bright tracking-tight mb-1">{plan.name}</h3>
                                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-primary-indigo/5 border border-primary-indigo/10 rounded-md inline-flex">
                                            <div className="w-1 h-1 bg-primary-indigo rounded-full"></div>
                                            <span className="text-[9px] font-bold text-primary-indigo uppercase tracking-wider">Tier {index + 1} Asset</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest mb-1">STAKE AMOUNT</p>
                                    <p className="text-3xl font-extrabold premium-gradient-text tracking-tight">₹{plan.amount.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-black/5 border border-black/5 p-5 rounded-2xl group-hover:border-emerald-500/10 transition-all">
                                    <p className="text-[10px] font-bold text-text-muted uppercase mb-2 flex items-center gap-2">
                                        <TrendingUp size={12} className="text-emerald-500" /> Daily Yield
                                    </p>
                                    <p className="text-2xl font-extrabold text-emerald-500 tracking-tight">₹{plan.daily.toLocaleString()}</p>
                                </div>
                                <div className="bg-black/5 border border-black/5 p-5 rounded-2xl group-hover:border-primary-indigo/10 transition-all">
                                    <p className="text-[10px] font-bold text-text-muted uppercase mb-2 flex items-center gap-2">
                                        <ShoppingBag size={12} className="text-primary-indigo" /> Total Profit
                                    </p>
                                    <p className="text-2xl font-extrabold text-text-bright tracking-tight">₹{(plan.daily * 99).toLocaleString()}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => handleBuy(index)}
                                className="w-full btn-primary !rounded-2xl py-5 shadow-indigo"
                            >
                                Activate Asset <ChevronRight size={20} />
                            </button>

                            <div className="mt-6 pt-4 border-t border-black/5 flex justify-between items-center opacity-40">
                                <span className="text-[9px] font-bold tracking-widest uppercase flex items-center gap-1.5 text-text-muted"><Timer size={12} /> 99 Cycle Lock</span>
                                <span className="text-[9px] font-bold tracking-widest uppercase text-text-muted">Node: {index + 1}-Stable</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Plan;
