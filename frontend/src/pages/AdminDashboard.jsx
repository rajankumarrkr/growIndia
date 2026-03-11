import React, { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { Users, CreditCard, CheckCircle, XCircle, LogOut, Activity, Landmark, Database, Zap, Search, Filter, ShieldAlert, TrendingUp, ShieldCheck } from 'lucide-react';
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
        <Layout title="Admin Console">
            <div className="mb-10 px-2 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Governance</h1>
                    <p className="text-label mt-1">Operational protocol management</p>
                </div>
                <button onClick={logout} className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 shadow-sm hover:bg-red-500 hover:text-white transition-all group">
                    <LogOut size={20} className="group-hover:-translate-x-0.5 transition-transform" />
                </button>
            </div>

            {/* Admin Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                <div className="fintech-card group">
                    <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-50 group-hover:text-royal-blue transition-all">
                        <Users size={20} />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Network Density</p>
                    <div className="flex items-end gap-3">
                        <p className="text-3xl font-black text-slate-900">{stats.totalUsers}</p>
                        <p className="text-[10px] font-black text-emerald-500 mb-1.5">+12%</p>
                    </div>
                </div>
                <div className="fintech-card group">
                    <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-all">
                        <Landmark size={20} />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Inflow</p>
                    <p className="text-3xl font-black text-slate-900">₹{stats.totalDeposits.toLocaleString()}</p>
                </div>
                <div className="fintech-card group">
                    <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-50 group-hover:text-amber-500 transition-all">
                        <Activity size={20} />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Settlement Void</p>
                    <p className="text-3xl font-black text-slate-900">₹{stats.totalWithdrawals.toLocaleString()}</p>
                </div>
            </div>

            {/* Management Hub */}
            <div className="fintech-card !p-0 overflow-hidden mb-20 min-h-[500px]">
                <div className="p-6 border-b border-slate-50 flex flex-wrap items-center justify-between gap-6">
                    <div className="flex gap-2">
                        {[
                            { id: 'users', label: 'Nodes', icon: <Database /> },
                            { id: 'recharges', label: 'Verify', icon: <ShieldCheck /> },
                            { id: 'withdrawals', label: 'Settlement', icon: <Zap /> }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2.5 transition-all ${activeTab === tab.id ? 'bg-royal-blue text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'}`}
                            >
                                {React.cloneElement(tab.icon, { size: 14 })}
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    <div className="relative flex-1 max-w-xs">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                        <input
                            type="text"
                            placeholder="Search Hash..."
                            className="w-full bg-slate-50 border border-slate-50 rounded-xl py-2.5 pl-12 pr-4 text-[10px] font-black text-slate-900 outline-none focus:bg-white focus:border-royal-blue/20 transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {activeTab === 'users' ? (
                        <table className="w-full">
                            <thead>
                                <tr className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 border-b border-slate-50">
                                    <th className="py-6 px-8 text-left">Identity Node</th>
                                    <th className="py-6 px-8 text-left">Mobile Hash</th>
                                    <th className="py-6 px-8 text-left">Liquidity</th>
                                    <th className="py-6 px-8 text-left">Status</th>
                                    <th className="py-6 px-8 text-right">Integrity</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {users.map(u => (
                                    <tr key={u._id} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="py-6 px-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-white border border-slate-100 rounded-xl shadow-sm flex items-center justify-center text-[10px] font-black text-royal-blue">
                                                    {u.name.substring(0, 2).toUpperCase()}
                                                </div>
                                                <span className="text-sm font-black text-slate-900">{u.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-6 px-8 text-xs font-mono text-slate-400 uppercase tracking-widest">{u.mobile}</td>
                                        <td className="py-6 px-8 text-sm font-black text-slate-900">₹{u.walletBalance.toLocaleString()}</td>
                                        <td className="py-6 px-8">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${u.status === 'active' ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'}`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${u.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                                                {u.status}
                                            </div>
                                        </td>
                                        <td className="py-6 px-8 text-right">
                                            <button className="text-[9px] font-black uppercase tracking-widest text-royal-blue hover:text-royal-blue/70 transition-colors">Configure</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-32 opacity-20">
                            <ShieldAlert size={48} className="mb-4" />
                            <p className="text-[10px] font-black uppercase tracking-[0.3em]">No Active Sequences Detected</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
