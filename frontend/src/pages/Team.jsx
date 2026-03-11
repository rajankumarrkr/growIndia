import React, { useContext, useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';
import { Share2, Users, IndianRupee, Trophy, Copy, Check, Target, ChevronRight, Info, Zap, TrendingUp } from 'lucide-react';
import api from '../api/axios';

const Team = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({ teamSize: 0, commission: 0 });
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        fetchTeamStats();
    }, []);

    const fetchTeamStats = async () => {
        try {
            const res = await api.get('/team/data');
            setStats(res.data);
        } catch (err) { }
    };

    const copyLink = () => {
        const link = `${window.location.origin}/register?ref=${user?.referralCode}`;
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Layout title="Expansion Hub">
            <div className="mb-10 px-2 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Affiliate Hub</h1>
                    <p className="text-label mt-1">Scale your network & earn rewards</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-royal-blue shadow-sm">
                    <TrendingUp size={24} />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="fintech-card group">
                    <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-50 group-hover:text-royal-blue transition-all">
                        <Users size={20} />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Nodes</p>
                    <p className="text-2xl font-black text-slate-900">{stats.teamSize}</p>
                </div>
                <div className="fintech-card group">
                    <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-all">
                        <IndianRupee size={20} />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Bonus Pool</p>
                    <p className="text-2xl font-black text-emerald-500">₹{stats.commission}</p>
                </div>
            </div>

            {/* Invite Card */}
            <div className="fintech-card bg-slate-900 !p-10 relative overflow-hidden mb-10">
                <div className="absolute top-0 right-0 w-48 h-48 bg-royal-blue/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-amber-400 border border-white/10 mb-8">
                        <Trophy size={28} />
                    </div>
                    <h2 className="text-2xl font-black text-white mb-4 tracking-tight uppercase">Network Master</h2>
                    <p className="text-xs font-bold text-white/40 leading-relaxed max-w-[80%] mb-12 uppercase tracking-widest">
                        Expand the consortium and receive <span className="text-white">10.0% Royalties</span> on all verified injections.
                    </p>

                    <div className="bg-white/5 border border-white/5 rounded-3xl p-6 mb-8 flex flex-col items-center gap-4">
                        <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em]">Unique Invocator Key</p>
                        <div className="flex items-center gap-6">
                            <span className="text-4xl font-black text-white tracking-[0.2em] font-mono">{user?.referralCode}</span>
                            <button onClick={copyLink} className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                                {copied ? <Check size={20} /> : <Copy size={20} />}
                            </button>
                        </div>
                    </div>

                    <button onClick={copyLink} className="btn-fintech btn-fintech-primary w-full py-5 text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3">
                        <Share2 size={16} /> Broadcast Invite
                    </button>
                </div>
            </div>

            {/* Protocol Steps */}
            <div className="mb-12 px-2">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-6">Execution Protocol</h4>
                <div className="space-y-6">
                    {[
                        { text: "Broadcast your unique link to prospect nodes", icon: <Share2 /> },
                        { text: "Monitor integration status in real-time hub", icon: <Activity /> },
                        { text: "Receive automated 10% royalties on injections", icon: <TrendingUp /> }
                    ].map((step, idx) => (
                        <div key={idx} className="flex gap-5 items-start group">
                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-royal-blue transition-all shrink-0">
                                {React.cloneElement(step.icon, { size: 16 })}
                            </div>
                            <p className="text-xs font-bold text-slate-500 leading-relaxed pt-2.5">{step.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Team;
