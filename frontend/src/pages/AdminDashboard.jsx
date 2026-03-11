import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Users, CreditCard, CheckCircle, XCircle, Settings, ShieldCheck, ArrowRight, User as UserIcon, LogOut, Activity, Landmark, PieChart, ShieldAlert, Cpu, Zap, LayoutDashboard, Database, BarChart3, Search, Filter } from 'lucide-react';

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
        <div className="min-h-screen bg-bg-deep text-text-base p-6 relative overflow-hidden selection:bg-primary-indigo/10">
            {/* Atmospheric Background - Subtle for Light Mode */}
            <div className="fixed top-[-10%] right-[-10%] w-[70%] h-[70%] bg-primary-indigo/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
            <div className="fixed bottom-[-10%] left-[-10%] w-[70%] h-[70%] bg-secondary-violet/5 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>

            <header className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 relative z-10">
                <div className="flex items-center gap-5">
                    <div className="glass-card !rounded-2xl p-4 text-primary-indigo !bg-white border-black/5 shadow-premium">
                        <ShieldAlert size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-text-bright">Management Console</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-60">System Operational • v2.4.0</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="glass-card !rounded-xl px-5 py-2.5 !bg-white border-black/5 shadow-premium hidden md:flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest leading-none mb-1">Health Score</p>
                            <p className="text-sm font-extrabold text-emerald-600 leading-none">99.8%</p>
                        </div>
                    </div>
                    <button className="glass-card !rounded-xl p-3 text-danger-rose hover:bg-danger-rose/5 border-black/5 !bg-white shadow-premium transition-all ml-auto sm:ml-0">
                        <LogOut size={24} />
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto relative z-10">
                {/* Core Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {[
                        { label: 'Total Base Nodes', value: stats.totalUsers, icon: <Users size={24} />, color: 'primary-indigo', trend: '+12% This Week' },
                        { label: 'Cumulative Inflow', value: `₹${stats.totalDeposits.toLocaleString()}`, icon: <Landmark size={24} />, color: 'emerald-500', trend: '+5.4% vs Last Session' },
                        { label: 'Operation Drain', value: `₹${stats.totalWithdrawals.toLocaleString()}`, icon: <Activity size={24} />, color: 'danger-rose', trend: 'Regulated Activity' }
                    ].map((card, i) => (
                        <div key={i} className="glass-card p-8 group transition-all duration-300 hover:border-black/10 !bg-white shadow-premium">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-black/5 border border-black/5 text-${card.color} group-hover:scale-110 transition-transform`}>
                                    {card.icon}
                                </div>
                                <div className="text-[9px] font-bold text-text-muted bg-black/5 px-2 py-1 rounded-md uppercase tracking-wider">
                                    {card.trend}
                                </div>
                            </div>
                            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1.5 opacity-60">{card.label}</p>
                            <h2 className="text-3xl font-extrabold text-text-bright tracking-tight mb-4">{card.value}</h2>
                            <div className={`h-1 w-full bg-black/5 rounded-full overflow-hidden`}>
                                <div className="h-full bg-primary-indigo w-[70%]" style={{ backgroundColor: card.color === 'primary-indigo' ? 'var(--primary-indigo)' : card.color === 'emerald-500' ? '#059669' : '#e11d48' }}></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Operations Center */}
                <div className="glass-card !rounded-[2.5rem] border-black/5 !bg-white shadow-premium overflow-hidden mb-12">
                    <div className="flex flex-wrap items-center justify-between p-6 border-b border-black/5 gap-6">
                        <div className="flex flex-wrap gap-2">
                            {[
                                { id: 'users', label: 'User Registry', icon: <Database size={14} /> },
                                { id: 'recharges', label: 'Verification Queue', icon: <Cpu size={14} /> },
                                { id: 'withdrawals', label: 'Withdrawal Hub', icon: <Zap size={14} /> }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${activeTab === tab.id
                                        ? 'bg-primary-indigo text-white shadow-indigo'
                                        : 'text-text-muted hover:text-text-bright hover:bg-black/5'
                                        }`}
                                >
                                    {tab.icon} {tab.label}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-3 w-full lg:w-auto">
                            <div className="relative flex-1 lg:w-64">
                                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                                <input
                                    type="text"
                                    placeholder="Search nodes..."
                                    className="w-full bg-black/5 border border-black/5 rounded-xl py-2.5 pl-11 pr-4 text-xs font-bold text-text-bright outline-none focus:border-primary-indigo/30 transition-all placeholder:text-text-muted/20"
                                />
                            </div>
                            <button className="glass-card p-2.5 text-text-muted hover:text-text-bright border-black/5 !bg-white shadow-premium">
                                <Filter size={14} />
                            </button>
                        </div>
                    </div>

                    <div className="p-0">
                        {activeTab === 'users' ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-[10px] font-bold uppercase text-text-muted border-b border-black/5">
                                            <th className="py-6 px-8 tracking-widest">Node Alias</th>
                                            <th className="py-6 px-8 tracking-widest">Mobile Hash</th>
                                            <th className="py-6 px-8 tracking-widest">Asset Value</th>
                                            <th className="py-6 px-8 tracking-widest">Connectivity</th>
                                            <th className="py-6 px-8 text-right tracking-widest">Management</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-black/5">
                                        {users.map(u => (
                                            <tr key={u._id} className="hover:bg-black/[0.01] transition-colors group">
                                                <td className="py-8 px-8">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-primary-indigo/5 flex items-center justify-center text-primary-indigo text-xs font-extrabold border border-primary-indigo/10">
                                                            {u.name.substring(0, 2).toUpperCase()}
                                                        </div>
                                                        <span className="font-extrabold text-text-bright tracking-tight">{u.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-8 px-8 font-mono text-text-muted text-xs tracking-wider">{u.mobile}</td>
                                                <td className="py-8 px-8">
                                                    <span className="text-sm font-extrabold text-text-bright">₹{u.walletBalance.toLocaleString()}</span>
                                                </td>
                                                <td className="py-8 px-8">
                                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/5">
                                                        <div className={`w-1.5 h-1.5 rounded-full ${u.status === 'active' ? 'bg-emerald-500 shadow-sm' : 'bg-danger-rose'}`}></div>
                                                        <span className={`text-[9px] font-bold uppercase tracking-widest ${u.status === 'active' ? 'text-emerald-600' : 'text-danger-rose'}`}>
                                                            {u.status}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-8 px-8 text-right">
                                                    <button className="glass-card !rounded-xl px-4 py-2 text-[9px] font-bold uppercase tracking-widest hover:bg-primary-indigo hover:text-white transition-all border-black/5 !bg-white shadow-premium">
                                                        Inspect
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-40 px-8 text-center bg-black/[0.01]">
                                <div className="w-20 h-20 bg-black/5 border border-black/10 rounded-3xl flex items-center justify-center mb-8 text-text-muted/30">
                                    <Database size={40} className="animate-pulse" />
                                </div>
                                <h3 className="text-xl font-extrabold text-text-bright mb-2">Protocol Queue Vacant</h3>
                                <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] opacity-40 max-w-xs">No active {activeTab} sequences detected in the current buffer.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
