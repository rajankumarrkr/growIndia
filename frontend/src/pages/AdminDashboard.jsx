import React, { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { Users, CreditCard, CheckCircle, XCircle, Settings, ShieldCheck, ArrowRight, User as UserIcon, LogOut, Activity, Landmark, PieChart, ShieldAlert, Cpu, Zap, LayoutDashboard, Database, BarChart3, Search, Filter } from 'lucide-react';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
    const { logout } = useContext(AuthContext);
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
        <Layout>
            <header className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 mb-12 relative z-10">
                <div className="flex items-center gap-6">
                    <div className="glass-card-blue !rounded-[1.5rem] p-5 text-royal-blue !bg-white/80 border-blue-50 shadow-xl group">
                        <ShieldAlert size={36} className="group-hover:rotate-6 transition-transform duration-500" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black tracking-tight text-text-bright">Management <span className="premium-gradient-text">Console</span></h1>
                        <div className="flex items-center gap-2.5 mt-2">
                            <span className="w-2.5 h-2.5 bg-royal-blue rounded-full animate-ping shadow-[0_0_10px_#2563eb]"></span>
                            <p className="text-[11px] font-black text-royal-blue/40 uppercase tracking-[0.3em]">Protocol Nominal • Build v4.2.0-Prime</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-5 w-full sm:w-auto">
                    <div className="glass-card-blue !rounded-2xl px-6 py-4 !bg-white border-blue-50 shadow-xl hidden md:flex items-center gap-5 group">
                        <div className="w-12 h-12 rounded-xl bg-royal-blue/5 flex items-center justify-center text-royal-blue border border-royal-blue/10">
                            <Activity size={24} />
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] leading-none mb-2 opacity-30">Operational Pulse</p>
                            <p className="text-xl font-black text-royal-blue leading-none tracking-tight">99.99%</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="glass-card-blue !rounded-2xl p-5 text-danger-rose hover:bg-danger-rose/5 border-danger-rose/10 !bg-white shadow-xl transition-all ml-auto sm:ml-0 group"
                    >
                        <LogOut size={26} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto relative z-10">
                {/* Core Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {[
                        { label: 'Network Node Density', value: stats.totalUsers, icon: <Users size={28} />, color: 'royal-blue', trend: 'Flux: +12%', glass: 'glass-card-blue' },
                        { label: 'Cumulative Inflow', value: `₹${stats.totalDeposits.toLocaleString()}`, icon: <Landmark size={28} />, color: 'electric-azure', trend: 'Delta: +5.4%', glass: 'glass-card-blue' },
                        { label: 'Operational Void', value: `₹${stats.totalWithdrawals.toLocaleString()}`, icon: <Activity size={28} />, color: 'deep-sapphire', trend: 'Buffer: Stable', glass: 'glass-card-sapphire' }
                    ].map((card, i) => (
                        <div key={i} className={`${card.glass} !rounded-[2.5rem] p-10 group transition-all duration-700 hover:-translate-y-2 !bg-white/80 border-blue-50 shadow-xl relative overflow-hidden`}>
                            <div className="absolute top-0 right-0 w-24 h-24 bg-black/[0.02] rounded-full translate-x-1/2 -translate-y-1/2"></div>

                            <div className="flex justify-between items-start mb-8 relative z-10">
                                <div className={`w-16 h-16 rounded-[1.25rem] flex items-center justify-center bg-white shadow-lg border border-blue-50/50 text-${card.color} group-hover:scale-110 group-hover:-rotate-3 transition-all duration-700`}>
                                    {card.icon}
                                </div>
                                <div className={`text-[10px] font-black text-${card.color} bg-white border border-blue-50 px-4 py-2 rounded-full uppercase tracking-[0.2em] shadow-sm`}>
                                    {card.trend}
                                </div>
                            </div>
                            <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mb-3 opacity-30 relative z-10">{card.label}</p>
                            <h2 className="text-4xl font-black text-text-bright tracking-tight mb-8 relative z-10 uppercase">{card.value}</h2>
                            <div className="h-2.5 w-full bg-blue-50/50 rounded-full overflow-hidden relative z-10">
                                <div
                                    className="h-full rounded-full transition-all duration-1000 delay-300"
                                    style={{
                                        width: '74%',
                                        backgroundColor: card.color === 'royal-blue' ? 'var(--royal-blue)' : card.color === 'electric-azure' ? 'var(--electric-azure)' : 'var(--deep-sapphire)',
                                        boxShadow: `0 0 15px ${card.color === 'royal-blue' ? 'rgba(37,99,235,0.4)' : card.color === 'electric-azure' ? 'rgba(6,182,212,0.4)' : 'rgba(30,58,138,0.4)'}`
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Operations Center */}
                <div className="glass-card !rounded-[2.5rem] border-black/5 !bg-white shadow-premium overflow-hidden mb-12">
                    <div className="flex flex-wrap items-center justify-between p-6 border-b border-black/5 gap-6">
                        <div className="flex flex-wrap gap-3">
                            {[
                                { id: 'users', label: 'Nodes Registry', icon: <Database size={16} />, color: 'from-royal-blue to-primary-indigo' },
                                { id: 'recharges', label: 'Verification Buffer', icon: <Cpu size={16} />, color: 'from-electric-azure to-royal-blue' },
                                { id: 'withdrawals', label: 'Settlement Port', icon: <Zap size={16} />, color: 'from-deep-sapphire via-royal-blue to-deep-sapphire' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-3 px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 group ${activeTab === tab.id
                                        ? `bg-gradient-to-r ${tab.color} text-white shadow-2xl scale-105 -translate-y-1`
                                        : 'text-text-muted hover:text-royal-blue hover:bg-blue-50/50 border border-transparent'
                                        }`}
                                >
                                    {React.cloneElement(tab.icon, { className: activeTab === tab.id ? 'animate-pulse' : 'opacity-40' })}
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-3 w-full lg:w-auto">
                            <div className="relative flex-1 lg:w-64">
                                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                                <input
                                    type="text"
                                    placeholder="Search node hash..."
                                    className="w-full bg-blue-50 border border-blue-100/50 rounded-2xl py-3 pl-12 pr-6 text-xs font-black text-royal-blue outline-none focus:border-royal-blue/30 transition-all placeholder:text-royal-blue/20"
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
                                        <tr className="text-[10px] font-black uppercase text-text-muted border-b border-blue-50/50">
                                            <th className="py-8 px-10 tracking-[0.3em]">Node Protocol</th>
                                            <th className="py-8 px-10 tracking-[0.3em]">Mobile Hash</th>
                                            <th className="py-8 px-10 tracking-[0.3em]">Asset Value</th>
                                            <th className="py-6 px-8 tracking-widest">Connectivity</th>
                                            <th className="py-6 px-8 text-right tracking-widest">Management</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-black/5">
                                        {users.map(u => (
                                            <tr key={u._id} className="hover:bg-royal-blue/[0.03] transition-all duration-300 group">
                                                <td className="py-8 px-10">
                                                    <div className="flex items-center gap-5">
                                                        <div className="w-14 h-14 rounded-[1.25rem] bg-white shadow-lg border border-blue-50/50 flex items-center justify-center text-royal-blue text-sm font-black group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                                                            {u.name.substring(0, 2).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <span className="font-black text-text-bright tracking-tight text-base block">{u.name}</span>
                                                            <p className="text-[9px] font-black text-text-muted uppercase tracking-widest opacity-40 mt-0.5">Unified Auth Node</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-8 px-8 font-mono text-text-muted text-xs tracking-[0.2em] font-black opacity-50">{u.mobile}</td>
                                                <td className="py-8 px-8">
                                                    <span className="text-base font-black text-text-bright tracking-tight">₹{u.walletBalance.toLocaleString()}</span>
                                                </td>
                                                <td className="py-8 px-8">
                                                    <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border shadow-sm ${u.status === 'active' ? 'bg-success-emerald/5 border-success-emerald/10' : 'bg-danger-rose/5 border-danger-rose/10'}`}>
                                                        <div className={`w-2 h-2 rounded-full ${u.status === 'active' ? 'bg-success-emerald shadow-[0_0_8px_#10b981] animate-pulse' : 'bg-danger-rose'}`}></div>
                                                        <span className={`text-[10px] font-black uppercase tracking-widest ${u.status === 'active' ? 'text-success-emerald' : 'text-danger-rose'}`}>
                                                            {u.status}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-8 px-8 text-right">
                                                    <button className="glass-card !rounded-2xl px-6 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-primary-indigo hover:text-white transition-all border-black/5 !bg-white shadow-sm hover:shadow-indigo group-hover:scale-105">
                                                        Access Port
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
        </Layout>
    );
};

export default AdminDashboard;
