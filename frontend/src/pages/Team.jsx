import React, { useContext, useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';
import { Share2, Users, IndianRupee, Trophy, Copy, Check, Star, HelpCircle, ArrowRight } from 'lucide-react';
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
                <h2 className="text-sm font-bold text-text-muted uppercase tracking-widest mb-1 ml-1">Affiliate Network</h2>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Referral Rewards</h1>
            </div>

            {/* Rewards Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="card-premium border-b-4 border-b-indigo-600 group">
                    <div className="bg-indigo-50 w-12 h-12 rounded-[1rem] flex items-center justify-center text-indigo-600 mb-6 border border-indigo-100 group-hover:scale-110 transition-transform">
                        <Users size={24} />
                    </div>
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Active Referrals</p>
                    <p className="text-3xl font-black text-slate-900">{stats.teamSize}</p>
                </div>
                <div className="card-premium border-b-4 border-b-emerald-600 group">
                    <div className="bg-emerald-50 w-12 h-12 rounded-[1rem] flex items-center justify-center text-emerald-600 mb-6 border border-emerald-100 group-hover:scale-110 transition-transform">
                        <IndianRupee size={24} />
                    </div>
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Payout Earned</p>
                    <p className="text-3xl font-black text-emerald-600">₹{stats.commission}</p>
                </div>
            </div>

            {/* Referral Hub */}
            <div className="bg-gradient-indigo rounded-[2.5rem] p-10 text-white shadow-2xl shadow-indigo-100 relative overflow-hidden mb-10 text-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl"></div>

                <div className="relative z-10">
                    <div className="inline-block bg-white/20 p-8 rounded-full border border-white/20 mb-8 animate-float">
                        <Trophy size={64} className="text-white drop-shadow-xl" />
                    </div>
                    <h2 className="text-3xl font-black mb-4 tracking-tighter uppercase italic">Ambassador Key</h2>
                    <p className="text-indigo-100 text-sm font-medium mb-10 px-6 leading-relaxed">
                        Unlock <span className="text-white font-black underline decoration-white/40 decoration-4">10% DIRECT COMMISSIONS</span> on every deposit made via your network.
                    </p>

                    <div className="bg-white rounded-[2rem] p-6 flex flex-col items-center gap-4 mb-8 shadow-inner border border-slate-100">
                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Share Your Secret Code</p>
                        <div className="flex items-center gap-4">
                            <span className="text-4xl font-black text-slate-900 tracking-[0.3em] font-mono">{user?.referralCode}</span>
                            <button onClick={copyLink} className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-indigo-600 active:scale-90 transition-all">
                                {copied ? <Check size={24} /> : <Copy size={24} />}
                            </button>
                        </div>
                    </div>

                    <button onClick={copyLink} className="w-full bg-white text-indigo-600 font-bold py-5 rounded-[1.8rem] text-sm uppercase tracking-widest shadow-xl hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2">
                        <Share2 size={20} /> Copy Link Invite
                    </button>
                </div>
            </div>

            {/* Rules Card */}
            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-premium">
                <div className="flex items-center gap-4 mb-8">
                    <div className="bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center text-slate-400">
                        <HelpCircle size={24} />
                    </div>
                    <h4 className="text-xl font-black text-slate-900 tracking-tight">Earning Protocol</h4>
                </div>
                <div className="space-y-6">
                    {[
                        "Deploy your ambassador link to your community.",
                        "Track your growing network in real-time above.",
                        "Receive 10% instant credits on approved recharges.",
                        "Withdraw referal earnings directly to your bank."
                    ].map((text, idx) => (
                        <div key={idx} className="flex gap-5 items-start">
                            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100 font-black text-lg">
                                {idx + 1}
                            </div>
                            <p className="text-sm font-semibold text-slate-500 leading-relaxed pt-2">{text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Team;
