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
                <div className="flex items-center gap-2 mb-4 opacity-80">
                    <Users className="text-royal-blue" size={14} />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-royal-blue/60">Network Expansion Hub</p>
                </div>
                <h1 className="text-4xl font-extrabold text-text-bright tracking-tight">Affiliate Hub</h1>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-5 mb-10">
                <div className="glass-card-blue !rounded-[2.5rem] p-8 group cursor-default !bg-white/80 border-blue-50/50 shadow-xl">
                    <div className="bg-royal-blue/10 w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-royal-blue border border-royal-blue/20 mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-sm">
                        <Users size={32} />
                    </div>
                    <p className="text-[10px] text-text-muted uppercase font-black tracking-[0.3em] mb-2 opacity-40">Verified Nodes</p>
                    <p className="text-4xl font-black text-text-bright tracking-tight">{stats.teamSize}</p>
                </div>
                <div className="glass-card-blue !rounded-[2.5rem] p-8 group cursor-default !bg-white/80 border-blue-50/50 shadow-xl">
                    <div className="bg-electric-azure/10 w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-electric-azure border border-electric-azure/20 mb-8 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700 shadow-sm">
                        <IndianRupee size={32} />
                    </div>
                    <p className="text-[10px] text-text-muted uppercase font-black tracking-[0.3em] mb-2 opacity-40">Credit Pool</p>
                    <p className="text-4xl font-black text-royal-blue tracking-tight">₹{stats.commission}</p>
                </div>
            </div>

            {/* Referral Nexus */}
            <div className="glass-card-blue !rounded-[3rem] p-10 bg-gradient-to-br from-blue-50/50 via-white to-white relative overflow-hidden mb-12 border-blue-100/30 shadow-2xl group">
                {/* Vibrant Background Elements */}
                <div className="absolute top-[-20%] right-[-10%] w-80 h-80 bg-royal-blue/10 rounded-full blur-[100px] group-hover:bg-royal-blue/20 transition-all duration-1000"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-72 h-72 bg-electric-azure/5 rounded-full blur-[100px] group-hover:bg-electric-azure/15 transition-all duration-1000"></div>

                <div className="relative z-10 text-center">
                    <div className="inline-flex p-6 bg-white shadow-xl rounded-[2.5rem] border border-black/5 mb-10 animate-soft-float">
                        <Trophy size={56} className="text-warning-amber drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]" />
                    </div>
                    <h2 className="text-3xl font-black text-text-bright mb-4 tracking-tight uppercase">Ambassador <span className="premium-gradient-text">Consortium</span></h2>
                    <p className="text-sm font-bold text-text-muted mb-12 px-6 leading-relaxed opacity-60">
                        Authorize new secondary nodes into the network and earn <span className="text-royal-blue font-black tracking-tight">10.0% UNIFIED COMMISSIONS</span> on all verified injections.
                    </p>

                    <div className="bg-white border border-blue-50/50 rounded-[2.5rem] p-8 flex flex-col items-center gap-5 mb-10 shadow-sm group/key hover:shadow-lg transition-all duration-500">
                        <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.4em] opacity-30 group-hover/key:text-royal-blue transition-colors">Unified Invocator Key</p>
                        <div className="flex items-center gap-8">
                            <span className="text-5xl font-mono font-black text-text-bright tracking-[0.3em] drop-shadow-sm">{user?.referralCode}</span>
                            <button onClick={copyLink} className={`w-16 h-16 flex items-center justify-center rounded-2xl border transition-all active:scale-90 ${copied ? 'bg-royal-blue text-white border-royal-blue shadow-indigo' : 'bg-blue-50/50 text-royal-blue border-blue-100/50 hover:bg-white hover:shadow-xl'}`}>
                                {copied ? <Check size={32} strokeWidth={3} /> : <Copy size={32} />}
                            </button>
                        </div>
                    </div>
                    <button onClick={copyLink} className="btn-primary w-full py-6 text-base uppercase tracking-[0.3em] font-black shadow-royal-blue !bg-gradient-to-r from-royal-blue via-primary-indigo to-deep-sapphire bg-[length:200%_auto] hover:bg-right transition-all duration-[1.5s] !rounded-[2rem]">
                        <Share2 size={24} className="mr-3" /> BROADCAST INVITE LINK
                    </button>
                </div>
            </div>

            {/* Execution Steps */}
            <div className="glass-card-blue !rounded-[3rem] p-10 mb-12 !bg-white/80 border-blue-50/50 shadow-xl">
                <div className="flex items-center gap-4 mb-10">
                    <div className="bg-royal-blue/10 w-12 h-12 rounded-2xl flex items-center justify-center text-royal-blue shadow-sm border border-blue-50">
                        <Info size={24} />
                    </div>
                    <h4 className="text-xl font-black text-text-bright tracking-tight uppercase">Protocol Execution Log</h4>
                </div>
                <div className="space-y-8">
                    {[
                        { text: "Broadcast your unique ambassador link to prospect nodes.", color: "text-royal-blue", bg: "bg-royal-blue/10" },
                        { text: "Monitor network integration via the real-time hub above.", color: "text-electric-azure", bg: "bg-electric-azure/10" },
                        { text: "Receive automated 10% credits on verified node injections.", color: "text-royal-blue", bg: "bg-royal-blue/10" },
                        { text: "Access rewards instantly via the withdrawal portal.", color: "text-deep-sapphire", bg: "bg-deep-sapphire/10" }
                    ].map((step, idx) => (
                        <div key={idx} className="flex gap-6 items-start group">
                            <div className={`w-12 h-12 rounded-[1rem] ${step.bg} ${step.color} flex items-center justify-center shrink-0 border border-blue-50/50 font-black text-xs group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-sm`}>
                                0{idx + 1}
                            </div>
                            <p className="text-sm font-bold text-text-muted leading-relaxed pt-3.5 opacity-60 group-hover:opacity-100 transition-opacity">{step.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Team;
