import React, { useContext, useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';
import { Share2, Users, IndianRupee, Trophy, Copy, Check, Target, ChevronRight, Info, Zap, TrendingUp, Activity } from 'lucide-react';
import api from '../api/axios';

const Team = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({ teamSize: 0, commission: 0, members: [] });
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

    const handleShare = async () => {
        const shareData = {
            title: 'Join Grow India',
            text: `Join me on Grow India! Use my referral code: ${user?.referralCode}`,
            url: `${window.location.origin}/register?ref=${user?.referralCode}`
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(shareData.url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch (err) {
            console.error('Error sharing:', err);
        }
    };

    return (
        <Layout title="Expansion Hub">
            <div className="mb-8 px-4 pt-4 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Affiliate Hub</h1>
                    <p className="text-label mt-1">Scale your network & earn rewards</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-tr from-royal-blue to-electric-azure border-2 border-blue-200 rounded-2xl flex items-center justify-center text-white shadow-glow transition-all hover:scale-105">
                    <TrendingUp size={20} className="text-white" />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8 px-4">
                <div className="fintech-card bg-gradient-to-br from-royal-blue to-primary-indigo border-none !rounded-[2rem] group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500" />
                    <div className="relative z-10">
                        <div className="w-10 h-10 bg-white/10 border border-white/20 text-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Users size={18} />
                        </div>
                        <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1">Total Nodes</p>
                        <p className="text-3xl font-black text-white">{stats.teamSize}</p>
                    </div>
                </div>
                <div className="fintech-card bg-gradient-to-br from-emerald-500 to-emerald-700 border-none !rounded-[2rem] group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500" />
                    <div className="relative z-10">
                        <div className="w-10 h-10 bg-white/10 border border-white/20 text-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <IndianRupee size={18} />
                        </div>
                        <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1">Bonus Pool</p>
                        <p className="text-3xl font-black text-white">₹{stats.commission}</p>
                    </div>
                </div>
            </div>

            {/* Invite Card */}
            <div className="px-4 mb-10">
                <div className="fintech-card bg-gradient-to-br from-indigo-600 via-royal-blue to-indigo-900 !p-10 pb-8 relative overflow-hidden border-none !rounded-[2.5rem] shadow-elevated">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-60" />
                    
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-amber-300 border border-white/20 mb-8 shadow-sm">
                            <Trophy size={28} />
                        </div>
                        <h2 className="text-2xl font-black text-white mb-4 tracking-tight uppercase">Network Master</h2>
                        <p className="text-xs font-bold text-white/70 leading-relaxed max-w-[85%] mb-10 uppercase tracking-widest">
                            Expand the consortium and receive <span className="text-white">10.0% Royalties</span> on all verified deposits.
                        </p>

                        <div className="bg-white/10 border border-white/20 rounded-3xl p-6 mb-8 flex flex-col items-center gap-5 backdrop-blur-xl group">
                            <p className="text-[9px] font-bold text-white/60 uppercase tracking-[0.4em] flex items-center gap-2">
                                <Zap size={10} className="text-amber-300" />
                                Unique Invocator Key
                            </p>
                            <div className="flex items-center gap-4">
                                <span className="text-3xl sm:text-4xl font-black text-white tracking-[0.2em] font-mono group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-colors">
                                    {user?.referralCode}
                                </span>
                                <button onClick={handleShare} className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${copied ? 'bg-emerald-500/80 text-white' : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'}`}>
                                    {copied ? <Check size={20} /> : <Share2 size={20} />}
                                </button>
                            </div>
                        </div>

                        <button onClick={handleShare} className="btn-fintech btn-fintech-primary bg-white text-royal-blue shadow-none hover:bg-slate-50 w-full py-5 text-[11px] font-black uppercase tracking-[0.25em] flex items-center justify-center gap-3">
                            <Share2 size={16} /> Broadcast Invite
                        </button>
                    </div>
                </div>
            </div>

            {/* Protocol Steps */}
            <div className="mb-12 px-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8 flex items-center gap-2">
                    <div className="w-1 h-3 bg-royal-blue rounded-full"></div> Protocol Steps
                </h4>
                <div className="space-y-6">
                    {React.useMemo(() => [
                        { text: "Broadcast unique link to prospect nodes", icon: <Share2 /> },
                        { text: "Monitor integration status in real-time hub", icon: <Activity /> },
                        { text: "Receive automated 10% deposit royalties", icon: <TrendingUp /> }
                    ], []).map((step, idx) => (
                        <div key={idx} className="flex gap-5 items-center group">
                            <div className="w-12 h-12 bg-white rounded-[1.25rem] border border-slate-100 shadow-sm flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-800 transition-all shrink-0">
                                {React.cloneElement(step.icon, { size: 18 })}
                            </div>
                            <p className="text-[12px] font-bold text-slate-600 leading-relaxed pr-4">{step.text}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Registered Network (Referral List) */}
            <div className="mb-24 px-4 overflow-hidden">
                <div className="flex items-center justify-between mb-6 px-2">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Registry
                    </h4>
                    <span className="text-[9px] font-black text-royal-blue uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                        {stats.members?.length || 0} Nodes
                    </span>
                </div>
                
                <div className="space-y-3">
                    {stats.members && stats.members.length > 0 ? (
                        stats.members.map((member) => (
                            <div key={member.id} className="fintech-card !p-5 flex items-center justify-between group bg-white/80 backdrop-blur-xl border-slate-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-50 rounded-[1.25rem] flex items-center justify-center text-slate-400 border border-slate-100/50 group-hover:bg-blue-50 group-hover:text-royal-blue transition-colors">
                                        <Users size={18} />
                                    </div>
                                    <div>
                                        <h5 className="text-[13px] font-black text-slate-900 tracking-wide">{member.name}</h5>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-1.5">
                                            <div className={`w-1 h-1 rounded-full ${member.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                            {member.mobile ? member.mobile.substring(0, 4) + 'XXXX' + member.mobile.substring(8) : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1.5">
                                    {member.status === 'active' ? (
                                        <div className="px-2.5 py-1 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-lg flex items-center gap-1">
                                            <Check size={10} />
                                            <span className="text-[9px] font-black uppercase tracking-widest">Active</span>
                                        </div>
                                    ) : (
                                        <div className="px-2.5 py-1 bg-red-50 border border-red-100 text-red-600 rounded-lg">
                                            <span className="text-[9px] font-black uppercase tracking-widest">Blocked</span>
                                        </div>
                                    )}
                                    <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest pr-1">
                                        {member.createdAt ? new Date(member.createdAt).toLocaleDateString() : 'N/A'}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="fintech-card flex flex-col items-center justify-center py-12 border border-dashed border-slate-200 bg-slate-50/50">
                            <div className="w-14 h-14 bg-white shadow-sm rounded-2xl flex items-center justify-center text-slate-300 mb-4 border border-slate-100">
                                <Users size={24} />
                            </div>
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Database Empty</p>
                            <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-2">No nodes registered via your key</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Team;
