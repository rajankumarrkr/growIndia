import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Users, CreditCard, CheckCircle, XCircle, Settings, ShieldCheck, ArrowRight, User as UserIcon, LogOut, Activity, Landmark, PieChart, ShieldAlert, Cpu, Zap } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ totalUsers: 0, totalDeposits: 0, totalWithdrawals: 0 });
    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState('users');

    useEffect(() => {
        fetchAdminData();
    }, []);

    const fetchAdminData = async () => {
        try {
            const [s, u] = await Promise.all([
                api.get('/admin/stats'),
                api.get('/admin/users'),
            ]);
            setStats(s.data);
            setUsers(u.data);
        } catch (err) { }
    };

    return (
        <div className="min-h-screen bg-bg-deep text-text-bright p-8 pb-32 overflow-x-hidden relative">
            {/* Background Matrix */}
            <div className="fixed inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-primary-neon animate-infinite-scroll"></div>
                <div className="absolute top-0 left-0 w-[1px] h-full bg-secondary-neon animate-infinite-scroll [animation-delay:3s]"></div>
            </div>

            <header className="max-w-6xl mx-auto flex justify-between items-center mb-20 relative z-10">
                <div className="flex items-center gap-6">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-primary-neon blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <div className="bg-bg-card p-6 rounded-[2.5rem] border border-white/10 text-primary-neon shadow-2xl relative z-10 animate-liquid">
                            <ShieldAlert size={40} />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-5xl font-black tracking-tighter text-white italic uppercase underline decoration-primary-neon/20 decoration-8 underline-offset-8">Terminal</h1>
                        <p className="text-[11px] font-black text-primary-neon tracking-[0.5em] mt-3 uppercase italic opacity-70">Privileged_Control_v6.4</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex flex-col items-end mr-6">
                        <p className="text-[10px] font-black text-text-dim uppercase tracking-widest">Sys_Health</p>
                        <div className="flex gap-1 mt-1">
                            <div className="w-4 h-1 bg-success-neon"></div>
                            <div className="w-4 h-1 bg-success-neon"></div>
                            <div className="w-1 h-1 bg-white/10"></div>
                        </div>
                    </div>
                    <button className="bg-bg-card border border-white/10 p-5 rounded-[1.8rem] hover:bg-red-500/10 hover:border-red-500/30 transition-all text-red-500 shadow-2xl active:scale-95 group">
                        <LogOut size={28} className="group-hover:rotate-12 transition-transform" />
                    </button>
                </div>
            </header>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Intelligence Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {[
                        { label: 'Network_Nodes', value: stats.totalUsers, icon: <Users />, color: 'primary-neon' },
                        { label: 'Asset_Inflow', value: `₹${stats.totalDeposits.toLocaleString()}`, icon: <Landmark />, color: 'success-neon' },
                        { label: 'Outflow_Drain', value: `₹${stats.totalWithdrawals.toLocaleString()}`, icon: <Activity />, color: 'secondary-neon' }
                    ].map((card, i) => (
                        <div key={i} className="bg-bg-card rounded-[3.5rem] p-10 border border-white/5 shadow-2xl group hover:-translate-y-2 transition-all relative overflow-hidden">
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-${card.color}/5 rounded-full blur-3xl`}></div>
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-white/5 text-${card.color} shadow-2xl group-hover:rotate-12 transition-transform`}>
                                {card.icon}
                            </div>
                            <p className="text-[11px] font-black text-text-dim uppercase tracking-[0.3em] mb-2">{card.label}</p>
                            <h2 className={`text-4xl font-black text-white tracking-tighter italic`}>{card.value}</h2>
                            <div className={`h-1 w-12 bg-${card.color} mt-6 opacity-30`}></div>
                        </div>
                    ))}
                </div>

                {/* Central Ops Unit */}
                <div className="bg-bg-card rounded-[4rem] p-1 p-md-10 border border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.6)] overflow-hidden">
                    <div className="flex flex-wrap gap-4 p-8 border-b border-white/5">
                        {[
                            { id: 'users', label: 'Unit_Directory', icon: <Users size={14} /> },
                            { id: 'recharges', label: 'Inflow_Verification', icon: <Cpu size={14} /> },
                            { id: 'withdrawals', label: 'Drain_Requests', icon: <Zap size={14} /> }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-8 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all relative overflow-hidden ${activeTab === tab.id
                                        ? 'bg-white text-bg-deep shadow-2xl shadow-white/5'
                                        : 'text-text-dim hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {tab.icon} {tab.label}
                                {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary-neon"></div>}
                            </button>
                        ))}
                    </div>

                    <div className="p-8">
                        {activeTab === 'users' ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-[11px] font-black uppercase text-text-dim border-b border-white/5">
                                            <th className="pb-8 px-8 tracking-[0.2em]">Partner_Alias</th>
                                            <th className="pb-8 px-8 tracking-[0.2em]">Node_Mobile</th>
                                            <th className="pb-8 px-8 tracking-[0.2em]">Asset_Value</th>
                                            <th className="pb-8 px-8 tracking-[0.2em]">Status</th>
                                            <th className="pb-8 px-8 text-right tracking-[0.2em]">Action_Port</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {users.map(u => (
                                            <tr key={u._id} className="hover:bg-white/5 transition-all group">
                                                <td className="py-10 px-8 font-black text-white italic tracking-tight">{u.name}</td>
                                                <td className="py-10 px-8 font-mono text-text-dim tracking-widest">{u.mobile}</td>
                                                <td className="py-10 px-8 font-black text-primary-neon text-lg tracking-tighter">₹{u.walletBalance.toLocaleString()}</td>
                                                <td className="py-10 px-8">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-2 h-2 rounded-full animate-pulse ${u.status === 'active' ? 'bg-success-neon shadow-[0_0_8px_#10b981]' : 'bg-red-500'}`}></div>
                                                        <span className={`text-[10px] font-black uppercase tracking-widest ${u.status === 'active' ? 'text-success-neon' : 'text-red-500'}`}>
                                                            {u.status}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-10 px-8 text-right">
                                                    <button className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-bg-deep transition-all shadow-2xl active:scale-95">
                                                        Inspect_Unit
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-32 bg-white/[0.02] rounded-[3.5rem] border border-dashed border-white/10 relative group">
                                <div className="absolute inset-0 bg-primary-neon/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[3.5rem]"></div>
                                <div className="w-24 h-24 bg-bg-card border border-white/10 rounded-full flex items-center justify-center mx-auto mb-10 text-white shadow-2xl animate-spin-slow">
                                    <Cpu size={40} />
                                </div>
                                <h3 className="text-3xl font-black text-white tracking-tighter uppercase italic">Data_Sink_Void</h3>
                                <p className="text-[11px] font-black text-text-dim uppercase tracking-[0.5em] mt-4 opacity-70 italic">Buffer empty: No active packets for {activeTab}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
