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
                <div className="flex items-center gap-2 mb-4 opacity-80">
                    <Layers className="text-royal-blue" size={14} />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-royal-blue/60">Portfolio Expansion Nexus</p>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <h1 className="text-4xl font-black text-text-bright tracking-tight">Investment <span className="premium-gradient-text text-[0.9em]">Tiers</span></h1>
                    <div className="glass-card-blue px-8 py-5 flex items-center gap-6 !bg-white border-blue-50/50 shadow-xl group">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-royal-blue via-electric-azure to-primary-indigo flex items-center justify-center text-white border-4 border-white shadow-royal-blue transition-transform group-hover:rotate-12 group-hover:scale-110">
                            <Wallet size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] leading-none mb-1.5 opacity-40">Active Credit Shield</p>
                            <p className="text-3xl font-black text-text-bright leading-none tracking-tight">₹{user?.walletBalance?.toLocaleString()}</p>
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
                {plans.map((plan, index) => {
                    const colors = [
                        { card: 'glass-card-blue', text: 'text-electric-azure', bg: 'bg-electric-azure/10', border: 'border-electric-azure/20', icon: 'text-electric-azure', btn: 'bg-gradient-to-r from-electric-azure to-royal-blue shadow-blue' },
                        { card: 'glass-card-blue', text: 'text-royal-blue', bg: 'bg-royal-blue/10', border: 'border-royal-blue/20', icon: 'text-royal-blue', btn: 'bg-gradient-to-r from-royal-blue to-primary-indigo shadow-royal-blue' },
                        { card: 'glass-card-sapphire', text: 'text-royal-blue', bg: 'bg-deep-sapphire/10', border: 'border-deep-sapphire/20', icon: 'text-deep-sapphire', btn: 'bg-gradient-to-r from-deep-sapphire via-royal-blue to-deep-sapphire shadow-royal-blue' },
                        { card: 'glass-card-sapphire', text: 'text-royal-blue', bg: 'bg-midnight-cobalt/10', border: 'border-midnight-cobalt/20', icon: 'text-midnight-cobalt', btn: 'bg-gradient-to-r from-midnight-cobalt via-deep-sapphire to-midnight-cobalt shadow-royal-blue' },
                    ][index % 4];

                    return (
                        <div key={index} className={`${colors.card} p-1 relative group transition-all duration-700 hover:-translate-y-2 !bg-white/60 border-black/5 shadow-premium`}>
                            {/* Accent Glow */}
                            <div className={`absolute top-0 right-0 w-32 h-32 ${colors.bg} rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000`}></div>

                            <div className="p-8 relative z-10">
                                <div className="flex justify-between items-start mb-12">
                                    <div className="flex items-center gap-6">
                                        <div className={`w-20 h-20 bg-white shadow-lg border border-blue-50/50 rounded-[2rem] flex items-center justify-center ${colors.text} relative group-hover:scale-110 group-hover:-rotate-3 transition-all duration-700`}>
                                            <Gem size={36} className={`${colors.text}`} />
                                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-royal-blue rounded-full border-4 border-white shadow-[0_0_12px_#2563eb] animate-pulse"></div>
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-black text-text-bright tracking-tight mb-2 uppercase">{plan.name}</h3>
                                            <div className={`flex items-center gap-2.5 px-4 py-1.5 ${colors.bg} ${colors.border} border rounded-full inline-flex`}>
                                                <div className="w-2 h-2 bg-royal-blue rounded-full animate-ping"></div>
                                                <span className={`text-[10px] font-black ${colors.text} uppercase tracking-[0.3em]`}>Tier Port-{index + 1}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.4em] mb-2 opacity-30">STAKE TARGET</p>
                                        <p className="text-4xl font-black text-text-bright tracking-tighter">₹{plan.amount.toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-5 mb-10">
                                    <div className="bg-white border border-blue-50 p-6 rounded-[2.5rem] shadow-sm group-hover:border-royal-blue/10 transition-all duration-700">
                                        <p className="text-[10px] font-black text-text-muted uppercase mb-3 flex items-center gap-2 tracking-[0.2em] opacity-40">
                                            <TrendingUp size={14} className="text-royal-blue" /> Daily ROI Stream
                                        </p>
                                        <p className="text-3xl font-black text-royal-blue tracking-tight">₹{plan.daily.toLocaleString()}</p>
                                    </div>
                                    <div className="bg-white border border-blue-50 p-6 rounded-[2.5rem] shadow-sm group-hover:border-royal-blue/10 transition-all duration-700">
                                        <p className="text-[10px] font-black text-text-muted uppercase mb-3 flex items-center gap-2 tracking-[0.2em] opacity-40">
                                            <ShoppingBag size={14} className="text-royal-blue" /> Total Yield
                                        </p>
                                        <p className="text-3xl font-black text-text-bright tracking-tight">₹{(plan.daily * 99).toLocaleString()}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleBuy(index)}
                                    className={`w-full !rounded-[2rem] py-6 text-base font-black uppercase tracking-[0.3em] border-none shadow-premium group-hover:scale-[1.01] transition-all duration-500 text-white ${colors.btn}`}
                                >
                                    ACTIVATE PROTOCOL <ChevronRight size={22} className="ml-2 group-hover:translate-x-2 transition-transform duration-500" />
                                </button>

                                <div className="mt-8 pt-6 border-t border-black/5 flex justify-between items-center opacity-60">
                                    <span className="text-[10px] font-black tracking-widest uppercase flex items-center gap-2 text-text-muted"><Timer size={14} /> 99 Cycle Contract</span>
                                    <span className="text-[10px] font-black tracking-widest uppercase text-text-muted">Stability: Crystal-7</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Layout>
    );
};

export default Plan;
