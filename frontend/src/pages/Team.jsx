import React, { useContext, useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';
import { Share2, Users, IndianRupee, Trophy, Copy, Check, Target, ChevronRight, Info } from 'lucide-react';
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
        <Layout>
            <div className="mb-10">
                <div className="flex items-center gap-2 mb-4 opacity-60">
                    <Users className="text-primary-indigo" size={14} />
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">Network Expansion</p>
                </div>
                <h1 className="text-4xl font-extrabold text-text-bright tracking-tight">Affiliate Hub</h1>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="glass-card p-6 group cursor-default !bg-white border-black/5 shadow-premium">
                    <div className="bg-primary-indigo/10 w-12 h-12 rounded-2xl flex items-center justify-center text-primary-indigo border border-primary-indigo/20 mb-6 group-hover:scale-110 transition-transform">
                        <Users size={24} />
                    </div>
                    <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest mb-1">Active Network</p>
                    <p className="text-3xl font-extrabold text-text-bright tracking-tight">{stats.teamSize}</p>
                </div>
                <div className="glass-card p-6 group cursor-default !bg-white border-black/5 shadow-premium">
                    <div className="bg-emerald-500/10 w-12 h-12 rounded-2xl flex items-center justify-center text-emerald-500 border border-emerald-500/20 mb-6 group-hover:scale-110 transition-transform">
                        <IndianRupee size={24} />
                    </div>
                    <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest mb-1">Total Rewards</p>
                    <p className="text-3xl font-extrabold text-emerald-500 tracking-tight">₹{stats.commission}</p>
                </div>
            </div>

            {/* Referral Nexus */}
            <div className="glass-card p-8 bg-gradient-to-br from-primary-indigo/5 via-white to-white relative overflow-hidden mb-10 border-primary-indigo/20 shadow-premium">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-indigo/5 rounded-full translate-x-1/3 -translate-y-1/3 blur-[100px]"></div>

                <div className="relative z-10 text-center">
                    <div className="inline-flex p-4 bg-primary-indigo/10 rounded-3xl border border-primary-indigo/20 mb-8 animate-soft-float shadow-indigo">
                        <Trophy size={48} className="text-primary-indigo" />
                    </div>
                    <h2 className="text-2xl font-extrabold text-text-bright mb-3 tracking-tight">Ambassador Protocol</h2>
                    <p className="text-sm font-medium text-text-muted mb-10 px-4 leading-relaxed">
                        Authorize new nodes and earn <span className="text-primary-indigo font-bold">10% DIRECT COMMISSIONS</span> on all verified injections.
                    </p>

                    <div className="bg-black/5 rounded-3xl p-6 flex flex-col items-center gap-4 mb-8 border border-black/5 backdrop-blur-md">
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-60">Personal Invocation Key</p>
                        <div className="flex items-center gap-6">
                            <span className="text-4xl font-mono font-extrabold text-text-bright tracking-[0.2em]">{user?.referralCode}</span>
                            <button onClick={copyLink} className="w-12 h-12 flex items-center justify-center bg-black/5 rounded-xl border border-black/5 text-primary-indigo hover:bg-primary-indigo/5 transition-all active:scale-90">
                                {copied ? <Check size={20} /> : <Copy size={20} />}
                            </button>
                        </div>
                    </div>

                    <button onClick={copyLink} className="btn-primary w-full py-5 text-sm uppercase tracking-widest font-extrabold shadow-indigo">
                        Generate Invite Link <Share2 size={18} />
                    </button>
                </div>
            </div>

            {/* Execution Steps */}
            <div className="glass-card p-8 mb-12 !bg-white border-black/5 shadow-premium">
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-black/5 w-10 h-10 rounded-xl flex items-center justify-center text-text-muted">
                        <Info size={20} />
                    </div>
                    <h4 className="text-lg font-extrabold text-text-bright tracking-tight">Earning Execution</h4>
                </div>
                <div className="space-y-6">
                    {[
                        "Share your unique ambassador link with potential nodes.",
                        "Monitor network growth via the real-time tracker above.",
                        "Receive automated 10% credits on verified node deposits.",
                        "Withdraw commission rewards instantly to your wallet."
                    ].map((text, idx) => (
                        <div key={idx} className="flex gap-5 items-start">
                            <div className="w-8 h-8 rounded-lg bg-primary-indigo/10 text-primary-indigo flex items-center justify-center shrink-0 border border-primary-indigo/20 font-extrabold text-xs">
                                0{idx + 1}
                            </div>
                            <p className="text-sm font-medium text-text-muted leading-relaxed pt-1.5">{text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Team;
