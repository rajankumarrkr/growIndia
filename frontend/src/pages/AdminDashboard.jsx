import React, { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { 
    Users, CreditCard, CheckCircle, XCircle, LogOut, Activity, 
    Landmark, Database, Zap, Search, Filter, ShieldAlert, 
    TrendingUp, ShieldCheck, Settings, ImageIcon, Check, X, 
    LayoutGrid, UserPlus, ArrowRightLeft, Shield, Globe, 
    Server, Cpu, Wallet, Bell, BarChart2, Plus, Pencil, Trash2, Star, Crown
} from 'lucide-react';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
    const { logout } = useContext(AuthContext);
    const [stats, setStats] = useState({ totalUsers: 0, totalDeposits: 0, totalWithdrawals: 0 });
    const [users, setUsers] = useState([]);
    const [recharges, setRecharges] = useState([]);
    const [withdrawals, setWithdrawals] = useState([]);
    const [plans, setPlans] = useState([]);
    const [settings, setSettings] = useState({ upiId: '', qrCode: '' });
    const [activeTab, setActiveTab] = useState('users');
    const [loading, setLoading] = useState(true);
    const [newPlan, setNewPlan] = useState({ name: '', amount: '', daily: '', tier: 'standard' });
    const [editingPlan, setEditingPlan] = useState(null);
    const [planMsg, setPlanMsg] = useState('');

    useEffect(() => {
        fetchAdminData();
    }, []);

    const fetchAdminData = async () => {
        setLoading(true);
        try {
            const [s, u, r, w, set, pl] = await Promise.all([
                api.get('/admin/stats'),
                api.get('/admin/users'),
                api.get('/admin/recharges/pending'),
                api.get('/admin/withdrawals/pending'),
                api.get('/admin/settings'),
                api.get('/admin/plans'),
            ]);
            setStats(s.data);
            setUsers(u.data);
            setRecharges(r.data);
            setWithdrawals(w.data);
            setSettings(set.data);
            setPlans(pl.data);
        } catch (err) { }
        setLoading(false);
    };

    const handleCreatePlan = async (e) => {
        e.preventDefault();
        try {
            await api.post('/admin/plans', { ...newPlan, amount: Number(newPlan.amount), daily: Number(newPlan.daily) });
            setPlanMsg('Plan created!');
            setNewPlan({ name: '', amount: '', daily: '', tier: 'standard' });
            fetchAdminData();
        } catch (err) { setPlanMsg(err.response?.data?.message || 'Error'); }
        setTimeout(() => setPlanMsg(''), 3000);
    };

    const handleUpdatePlan = async (id) => {
        try {
            await api.patch(`/admin/plans/${id}`, { ...editingPlan, amount: Number(editingPlan.amount), daily: Number(editingPlan.daily) });
            setEditingPlan(null);
            fetchAdminData();
        } catch (err) { alert('Update failed'); }
    };

    const handleDeletePlan = async (id) => {
        if (!window.confirm('Delete this plan?')) return;
        try {
            await api.delete(`/admin/plans/${id}`);
            fetchAdminData();
        } catch (err) { alert('Delete failed'); }
    };

    const handleUpdateSettings = async (e) => {
        e.preventDefault();
        try {
            await api.put('/admin/settings', settings);
            alert('Settings updated successfully!');
        } catch(err) {
            alert('Failed to update settings');
        }
    };

    const handleQrUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSettings({ ...settings, qrCode: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRechargeAction = async (id, status) => {
        try {
            await api.patch(`/admin/recharge/${id}`, { status });
            fetchAdminData();
        } catch (err) {
            alert('Action failed');
        }
    };

    const handleWithdrawAction = async (id, status) => {
        try {
            await api.patch(`/admin/withdraw/${id}`, { status });
            fetchAdminData();
        } catch (err) {
            alert('Action failed');
        }
    };

    return (
        <Layout title="Governance Center">
            {/* Header Section */}
            <div className="mb-10 px-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-royal-blue rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 shrink-0">
                        <Shield size={24} className="sm:hidden" />
                        <Shield size={28} className="hidden sm:block" />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">Command Center</h1>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                             System Latency: <span className="text-emerald-500">Normal</span> <span className="hidden sm:inline">•</span> <span>{new Date().toLocaleDateString()}</span>
                        </p>
                    </div>
                </div>
                <button 
                    onClick={logout} 
                    className="flex items-center gap-3 px-5 py-3 bg-red-50 text-red-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all group w-full sm:w-auto justify-center"
                >
                    Termination <LogOut size={16} />
                </button>
            </div>

            {/* Admin Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-10 px-2 sm:px-0">
                <div className="fintech-card relative overflow-hidden group !p-5 sm:!p-6">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Users size={80} />
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 text-royal-blue rounded-xl flex items-center justify-center mb-6">
                        <UserPlus size={20} className="sm:hidden" />
                        <UserPlus size={22} className="hidden sm:block" />
                    </div>
                    <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Neural Nodes</p>
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">{stats.totalUsers.toLocaleString()}</h2>
                        <span className="text-[9px] sm:text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">+4.2%</span>
                    </div>
                </div>

                <div className="fintech-card relative overflow-hidden group !p-5 sm:!p-6">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <ArrowRightLeft size={80} />
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center mb-6">
                        <BarChart2 size={20} className="sm:hidden" />
                        <BarChart2 size={22} className="hidden sm:block" />
                    </div>
                    <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Cumulative Inflow</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-base sm:text-lg font-black text-slate-400">₹</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">{stats.totalDeposits.toLocaleString()}</h2>
                    </div>
                </div>

                <div className="fintech-card relative overflow-hidden group !p-5 sm:!p-6">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Zap size={80} />
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-6">
                        <Wallet size={20} className="sm:hidden" />
                        <Wallet size={22} className="hidden sm:block" />
                    </div>
                    <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Withdrawal Volume</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-base sm:text-lg font-black text-slate-400">₹</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">{stats.totalWithdrawals.toLocaleString()}</h2>
                    </div>
                </div>
            </div>

            {/* Management Hub */}
            <div className="fintech-card !p-0 overflow-hidden border border-slate-100 shadow-xl mb-20">
                {/* Navigation Menu */}
                <div className="bg-slate-50/50 p-4 sm:p-6 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
                    <div className="flex bg-white p-1 sm:p-1.5 rounded-2xl shadow-sm border border-slate-100 gap-1 overflow-x-auto hide-scrollbar w-full lg:w-auto">
                        {[
                            { id: 'users', label: 'Identity', icon: <Globe /> },
                            { id: 'recharges', label: 'Verify', icon: <ShieldCheck /> },
                            { id: 'withdrawals', label: 'Settle', icon: <Cpu /> },
                            { id: 'plans', label: 'Plans', icon: <LayoutGrid /> },
                            { id: 'settings', label: 'Protocols', icon: <Settings /> }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-royal-blue text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}
                            >
                                {React.cloneElement(tab.icon, { size: 14 })}
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full lg:max-w-xs">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                        <input
                            type="text"
                            placeholder="Universal Search..."
                            className="w-full bg-white border border-slate-100 rounded-xl py-2.5 sm:py-3 pl-12 pr-4 text-[10px] font-black text-slate-900 outline-none focus:border-royal-blue/30 transition-all shadow-sm"
                        />
                    </div>
                </div>

                <div className="min-h-[400px]">
                    {activeTab === 'users' ? (
                        <div className="overflow-x-auto w-full">
                            <table className="w-full border-collapse min-w-[800px]">
                                <thead>
                                    <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-50">
                                        <th className="py-6 px-8 text-left">Identity Profile</th>
                                        <th className="py-6 px-8 text-left">Access Token</th>
                                        <th className="py-6 px-8 text-left">Liquidity</th>
                                        <th className="py-6 px-8 text-left">Status</th>
                                        <th className="py-6 px-8 text-right">Ops</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {users.map(u => (
                                        <tr key={u._id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="py-6 px-8">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-11 h-11 bg-gradient-to-br from-slate-50 to-white border border-slate-100 rounded-xl shadow-sm flex items-center justify-center text-sm font-black text-royal-blue">
                                                        {u.name.substring(0, 2).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <span className="text-sm font-black text-slate-900 block">{u.name}</span>
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{u.role} NODE</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-6 px-8">
                                                <span className="text-xs font-mono text-slate-400 font-bold">{u.mobile}</span>
                                            </td>
                                            <td className="py-6 px-8">
                                                <span className="text-sm font-black text-royal-blue">₹{u.walletBalance.toLocaleString()}</span>
                                            </td>
                                            <td className="py-6 px-8">
                                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${u.status === 'active' ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'}`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${u.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                                                    {u.status}
                                                </div>
                                            </td>
                                            <td className="py-6 px-8 text-right">
                                                <button className="px-4 py-2 bg-slate-50 text-slate-400 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-royal-blue hover:text-white transition-all">Configure</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : activeTab === 'recharges' ? (
                        <div className="overflow-x-auto w-full">
                            <table className="w-full border-collapse min-w-[800px]">
                                <thead>
                                    <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-50">
                                        <th className="py-6 px-8 text-left">Source Node</th>
                                        <th className="py-6 px-8 text-left">Quantum Value</th>
                                        <th className="py-6 px-8 text-left">Evidence</th>
                                        <th className="py-6 px-8 text-right">Authorization</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {recharges.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="text-center py-24">
                                                <Zap size={32} className="mx-auto text-slate-200 mb-4" />
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Buffer Empty • No Pending Streams</p>
                                            </td>
                                        </tr>
                                    ) : recharges.map(r => (
                                        <tr key={r._id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="py-6 px-8">
                                                <span className="text-sm font-black text-slate-900 block">{r.userId?.name}</span>
                                                <span className="text-[10px] font-bold text-slate-400 font-mono italic">REF: {r.userId?.mobile}</span>
                                            </td>
                                            <td className="py-6 px-8">
                                                <span className="text-sm font-black text-emerald-500 block">₹{r.amount.toLocaleString()}</span>
                                                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">UTR: {r.utr}</span>
                                            </td>
                                            <td className="py-6 px-8">
                                                {r.screenshot ? (
                                                    <div className="relative group/img cursor-pointer w-14 h-14 rounded-xl border border-slate-100 overflow-hidden bg-slate-50 flex items-center justify-center shadow-sm">
                                                        <img src={r.screenshot} alt="Proof" className="w-full h-full object-cover" />
                                                        <div className="absolute inset-0 bg-black/60 flex opacity-0 group-hover/img:opacity-100 items-center justify-center text-white backdrop-blur-sm z-10 transition-all rounded-xl" onClick={() => window.open(r.screenshot, '_blank')}>
                                                            <ImageIcon size={18} />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="text-[10px] font-black text-red-300 uppercase tracking-widest">Missing Proof</span>
                                                )}
                                            </td>
                                            <td className="py-6 px-8 text-right">
                                                <div className="flex items-center justify-end gap-3">
                                                    <button 
                                                        onClick={() => handleRechargeAction(r._id, 'approved')} 
                                                        className="h-10 px-5 rounded-xl bg-emerald-50 text-emerald-500 hover:bg-emerald-500 hover:text-white flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all"
                                                    >
                                                        <Check size={16} /> Approve
                                                    </button>
                                                    <button 
                                                        onClick={() => handleRechargeAction(r._id, 'rejected')} 
                                                        className="h-10 w-10 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all shadow-sm"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : activeTab === 'plans' ? (
                        <div className="p-8 space-y-10">
                            {/* Add New Plan Form */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-blue-50 text-royal-blue rounded-xl flex items-center justify-center"><Plus size={18} /></div>
                                    <div>
                                        <h3 className="text-sm font-black text-slate-900">Add New Plan</h3>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Standard or VIP</p>
                                    </div>
                                </div>
                                <form onSubmit={handleCreatePlan} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                                    {[
                                        { label: 'Plan Name', key: 'name', placeholder: 'e.g. Plan 5000', type: 'text' },
                                        { label: 'Investment (₹)', key: 'amount', placeholder: '5000', type: 'number' },
                                        { label: 'Daily Return (₹)', key: 'daily', placeholder: '800', type: 'number' },
                                    ].map(f => (
                                        <div key={f.key} className="flex flex-col gap-2">
                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{f.label}</label>
                                            <input
                                                type={f.type} placeholder={f.placeholder} required
                                                value={newPlan[f.key]}
                                                onChange={e => setNewPlan({ ...newPlan, [f.key]: e.target.value })}
                                                className="h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-black text-slate-900 outline-none focus:border-royal-blue/30 transition-all"
                                            />
                                        </div>
                                    ))}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tier</label>
                                        <select
                                            value={newPlan.tier}
                                            onChange={e => setNewPlan({ ...newPlan, tier: e.target.value })}
                                            className="h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-black text-slate-900 outline-none"
                                        >
                                            <option value="standard">⭐ Standard</option>
                                            <option value="vip">👑 VIP</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest sm:block hidden">&nbsp;</label>
                                        <button type="submit" className="h-12 bg-royal-blue text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-md shadow-blue-500/20">
                                            <Plus size={14} /> Create
                                        </button>
                                    </div>
                                </form>
                                {planMsg && (
                                    <p className="mt-3 text-[10px] font-black text-emerald-500 uppercase tracking-widest">{planMsg}</p>
                                )}
                            </div>

                            {/* Standard Plans */}
                            {['standard', 'vip'].map(tier => (
                                <div key={tier}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-lg">{tier === 'vip' ? '👑' : '⭐'}</span>
                                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">{tier === 'vip' ? 'VIP Plans' : 'Standard Plans'}</h4>
                                        <div className="flex-1 h-px bg-slate-100" />
                                    </div>
                                    <div className="space-y-3">
                                        {plans.filter(p => p.tier === tier).map(plan => (
                                            <div key={plan._id} className={`rounded-2xl border ${plan.isActive ? 'border-slate-100 bg-slate-50/50' : 'border-dashed border-slate-200 bg-white opacity-60'} p-5`}>
                                                {editingPlan?._id === plan._id ? (
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                                                        {[
                                                            { label: 'Name', key: 'name', type: 'text' },
                                                            { label: 'Investment (₹)', key: 'amount', type: 'number' },
                                                            { label: 'Daily Return (₹)', key: 'daily', type: 'number' },
                                                        ].map(f => (
                                                            <div key={f.key}>
                                                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">{f.label}</label>
                                                                <input
                                                                    type={f.type}
                                                                    value={editingPlan[f.key]}
                                                                    onChange={e => setEditingPlan({ ...editingPlan, [f.key]: e.target.value })}
                                                                    className="w-full h-11 bg-white border border-slate-200 rounded-xl px-3 text-sm font-black text-slate-900 outline-none focus:border-royal-blue/40 transition-all"
                                                                />
                                                            </div>
                                                        ))}
                                                        <div>
                                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Tier</label>
                                                            <select
                                                                value={editingPlan.tier}
                                                                onChange={e => setEditingPlan({ ...editingPlan, tier: e.target.value })}
                                                                className="w-full h-11 bg-white border border-slate-200 rounded-xl px-3 text-sm font-black text-slate-900 outline-none transition-all"
                                                            >
                                                                <option value="standard">⭐ Standard</option>
                                                                <option value="vip">👑 VIP</option>
                                                            </select>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button onClick={() => handleUpdatePlan(plan._id)} className="flex-1 h-11 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center transition-all"><Check size={14} /></button>
                                                            <button onClick={() => setEditingPlan(null)} className="h-11 w-11 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center transition-all shrink-0"><X size={14} /></button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-4">
                                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tier === 'vip' ? 'bg-purple-50 text-purple-500' : 'bg-blue-50 text-royal-blue'}`}>
                                                                {tier === 'vip' ? <Crown size={18} /> : <Star size={18} />}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-black text-slate-900">{plan.name}</p>
                                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">₹{plan.amount?.toLocaleString()} invest • ₹{plan.daily?.toLocaleString()}/day</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${plan.isActive ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-400'}`}>
                                                                {plan.isActive ? 'Active' : 'Hidden'}
                                                            </span>
                                                            <button
                                                                onClick={() => api.patch(`/admin/plans/${plan._id}`, { isActive: !plan.isActive }).then(fetchAdminData)}
                                                                className="h-9 px-3 bg-slate-100 text-slate-500 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                                                            >
                                                                {plan.isActive ? 'Hide' : 'Show'}
                                                            </button>
                                                            <button onClick={() => setEditingPlan({ ...plan })} className="h-9 w-9 bg-blue-50 text-royal-blue rounded-lg flex items-center justify-center hover:bg-royal-blue hover:text-white transition-all">
                                                                <Pencil size={14} />
                                                            </button>
                                                            <button onClick={() => handleDeletePlan(plan._id)} className="h-9 w-9 bg-red-50 text-red-400 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                        {plans.filter(p => p.tier === tier).length === 0 && (
                                            <div className="text-center py-8 text-[10px] font-black text-slate-300 uppercase tracking-widest">No {tier} plans yet</div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : activeTab === 'withdrawals' ? (
                        <div className="overflow-x-auto w-full">
                            <table className="w-full border-collapse min-w-[800px]">
                                <thead>
                                    <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-50">
                                        <th className="py-6 px-8 text-left">User</th>
                                        <th className="py-6 px-8 text-left">Amount</th>
                                        <th className="py-6 px-8 text-left">Account Details</th>
                                        <th className="py-6 px-8 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {withdrawals.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="text-center py-24">
                                                <ArrowRightLeft size={32} className="mx-auto text-slate-200 mb-4" />
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No Pending Withdrawal Requests</p>
                                            </td>
                                        </tr>
                                    ) : withdrawals.map(w => (
                                        <tr key={w._id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="py-6 px-8">
                                                <span className="text-sm font-black text-slate-900 block">{w.userId?.name}</span>
                                                <span className="text-[10px] font-bold text-slate-400 font-mono">{w.userId?.mobile}</span>
                                            </td>
                                            <td className="py-6 px-8">
                                                <span className="text-lg font-black text-rose-500">₹{w.amount?.toLocaleString()}</span>
                                            </td>
                                            <td className="py-6 px-8">
                                                {w.accountDetails?.method === 'upi' ? (
                                                    <div>
                                                        <span className="text-[9px] font-black text-purple-400 uppercase tracking-widest bg-purple-50 px-2 py-0.5 rounded-full">UPI</span>
                                                        <p className="text-sm font-black text-slate-900 mt-1">{w.accountDetails.upiId}</p>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-1">
                                                        <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-full">BANK</span>
                                                        <p className="text-sm font-black text-slate-900">{w.accountDetails?.name}</p>
                                                        <p className="text-[10px] font-mono text-slate-500">{w.accountDetails?.accountNumber}</p>
                                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">IFSC: {w.accountDetails?.ifsc}</p>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="py-6 px-8 text-right">
                                                <div className="flex items-center justify-end gap-3">
                                                    <button
                                                        onClick={() => handleWithdrawAction(w._id, 'approved')}
                                                        className="h-10 px-5 rounded-xl bg-emerald-50 text-emerald-500 hover:bg-emerald-500 hover:text-white flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all"
                                                    >
                                                        <Check size={16} /> Pay
                                                    </button>
                                                    <button
                                                        onClick={() => handleWithdrawAction(w._id, 'rejected')}
                                                        className="h-10 w-10 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : activeTab === 'settings' ? (
                        <div className="p-4 sm:p-10 max-w-3xl mx-auto">
                            <div className="mb-8 sm:mb-10 text-center">
                                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Financial Protocols</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Configure global deposit parameters</p>
                            </div>

                            <form onSubmit={handleUpdateSettings} className="space-y-8 sm:space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <CreditCard size={14} className="text-royal-blue" /> Merchant UPI ID
                                        </label>
                                        <input 
                                            type="text" 
                                            value={settings.upiId} 
                                            onChange={(e) => setSettings({...settings, upiId: e.target.value})} 
                                            className="w-full h-14 sm:h-15 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-sm font-black text-slate-900 focus:bg-white focus:border-royal-blue/30 outline-none transition-all shadow-inner" 
                                            placeholder="Enter Gateway UPI ID"
                                            required 
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <ImageIcon size={14} className="text-royal-blue" /> Visual QR Code
                                        </label>
                                        <div className="relative">
                                            <input 
                                                type="file" 
                                                accept="image/*" 
                                                onChange={handleQrUpload} 
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                                            />
                                            <div className="w-full h-14 sm:h-15 bg-slate-50 border border-slate-100 rounded-2xl px-6 flex items-center justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest shadow-inner">
                                                <span>{settings.qrCode ? 'Change QR Image' : 'Upload QR Image'}</span>
                                                <ArrowRightLeft size={16} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {settings.qrCode && (
                                    <div className="flex flex-col items-center">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Preview Configuration</p>
                                        <div className="w-40 h-40 sm:w-48 sm:h-48 bg-white border-4 border-slate-50 rounded-3xl p-4 shadow-xl mb-4 group relative overflow-hidden">
                                            <img src={settings.qrCode} alt="QR Code" className="w-full h-full object-contain" />
                                            <div className="absolute inset-0 bg-royal-blue/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Zap size={32} className="text-royal-blue" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="pt-6 border-t border-slate-50">
                                    <button 
                                        type="submit" 
                                        className="w-full h-14 sm:h-16 bg-royal-blue text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3"
                                    >
                                        Deploy Protocol Changes <ShieldCheck size={18} />
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-32 opacity-20">
                            <ShieldAlert size={48} className="mb-4" />
                            <p className="text-[10px] font-black uppercase tracking-[0.3em]">No Active Sequences Detected</p>
                        </div>
                    )}
                </div>
            </div>

            {/* System Status Banner */}
            <div className="bg-slate-900 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:justify-between gap-8 sm:gap-6 overflow-hidden relative text-center sm:text-left">
                <div className="absolute top-0 right-0 w-32 h-32 bg-royal-blue/20 rounded-full blur-3xl -mr-16 -mt-16" />
                <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10 w-full sm:w-auto">
                    <div className="flex -space-x-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className={`w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-black text-royal-blue overflow-hidden`}>
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="Avatar" />
                            </div>
                        ))}
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Live Observers</p>
                        <p className="text-xs font-bold text-white max-w-[200px] sm:max-w-none">3 Administrators active on network</p>
                    </div>
                </div>
                <div className="flex items-center justify-around sm:justify-end gap-6 sm:gap-8 relative z-10 w-full sm:w-auto border-t border-slate-800 pt-6 sm:pt-0 sm:border-0">
                    <div className="text-center sm:text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Up-time</p>
                        <p className="text-xs font-bold text-white">99.9%</p>
                    </div>
                    <div className="w-px h-10 bg-slate-800 hidden sm:block" />
                    <div className="text-center sm:text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Security</p>
                        <p className="text-xs font-bold text-emerald-500 uppercase">Max</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;

