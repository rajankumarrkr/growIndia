import React, { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import {
    Users, CreditCard, TrendingDown, LogOut, Zap,
    Search, ShieldAlert, CheckCircle, XCircle,
    ImageIcon, Check, X, LayoutGrid, Settings,
    Star, Crown, Plus, Pencil, Trash2, ArrowUpCircle,
    ArrowDownCircle, RefreshCw, BarChart3, ShieldCheck,
    Bell, ChevronRight, Clock, IndianRupee, UserCheck,
    Wallet, FileText
} from 'lucide-react';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';

/* ─── tiny helpers ─────────────────────────────────────────────── */
const fmt = (n) => Number(n || 0).toLocaleString('en-IN');

const Badge = ({ color, label }) => {
    const map = {
        green: 'bg-green-100 text-green-700',
        red: 'bg-red-100 text-red-600',
        yellow: 'bg-yellow-100 text-yellow-700',
        blue: 'bg-blue-100 text-blue-700',
        purple: 'bg-purple-100 text-purple-700',
    };
    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${map[color] || map.blue}`}>
            {label}
        </span>
    );
};

const EmptyState = ({ icon: Icon, text }) => (
    <div className="flex flex-col items-center justify-center py-20 text-slate-300">
        <Icon size={40} className="mb-3" />
        <p className="text-sm font-semibold text-slate-400">{text}</p>
    </div>
);

/* ─── Stat Card ────────────────────────────────────────────────── */
const StatCard = ({ icon: Icon, label, value, prefix = '', color, sub }) => {
    const colors = {
        blue: { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-100' },
        green: { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-green-100' },
        rose: { bg: 'bg-rose-50', icon: 'text-rose-500', border: 'border-rose-100' },
        amber: { bg: 'bg-amber-50', icon: 'text-amber-600', border: 'border-amber-100' },
    };
    const c = colors[color] || colors.blue;
    return (
        <div className={`bg-white rounded-2xl border ${c.border} p-5 flex items-center gap-4 shadow-sm`}>
            <div className={`w-12 h-12 ${c.bg} ${c.icon} rounded-xl flex items-center justify-center shrink-0`}>
                <Icon size={22} />
            </div>
            <div>
                <p className="text-xs font-semibold text-slate-400 mb-0.5">{label}</p>
                <p className="text-2xl font-extrabold text-slate-800 leading-none">
                    {prefix}{fmt(value)}
                </p>
                {sub && <p className="text-[11px] text-slate-400 mt-0.5">{sub}</p>}
            </div>
        </div>
    );
};

/* ─── Main Component ───────────────────────────────────────────── */
const AdminDashboard = () => {
    const { logout } = useContext(AuthContext);
    const [stats, setStats] = useState({ totalUsers: 0, totalDeposits: 0, totalWithdrawals: 0 });
    const [users, setUsers] = useState([]);
    const [recharges, setRecharges] = useState([]);
    const [withdrawals, setWithdrawals] = useState([]);
    const [plans, setPlans] = useState([]);
    const [settings, setSettings] = useState({ upiId: '', qrCode: '' });
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const [newPlan, setNewPlan] = useState({ name: '', amount: '', daily: '', tier: 'standard' });
    const [editingPlan, setEditingPlan] = useState(null);
    const [planMsg, setPlanMsg] = useState('');
    const [isProcessingIncome, setIsProcessingIncome] = useState(false);
    const [incomeResult, setIncomeResult] = useState(null);

    useEffect(() => { fetchAdminData(); }, []);

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
        } catch { }
        setLoading(false);
    };

    const handleRechargeAction = async (id, status) => {
        try { await api.patch(`/admin/recharge/${id}`, { status }); fetchAdminData(); }
        catch { alert('Action failed'); }
    };

    const handleWithdrawAction = async (id, status) => {
        try { await api.patch(`/admin/withdraw/${id}`, { status }); fetchAdminData(); }
        catch { alert('Action failed'); }
    };

    const handleCreatePlan = async (e) => {
        e.preventDefault();
        try {
            await api.post('/admin/plans', { ...newPlan, amount: Number(newPlan.amount), daily: Number(newPlan.daily) });
            setPlanMsg('✅ Plan created!');
            setNewPlan({ name: '', amount: '', daily: '', tier: 'standard' });
            fetchAdminData();
        } catch (err) { setPlanMsg(err.response?.data?.message || 'Error'); }
        setTimeout(() => setPlanMsg(''), 3000);
    };

    const handleUpdatePlan = async (id) => {
        try { await api.patch(`/admin/plans/${id}`, { ...editingPlan, amount: Number(editingPlan.amount), daily: Number(editingPlan.daily) }); setEditingPlan(null); fetchAdminData(); }
        catch { alert('Update failed'); }
    };

    const handleDeletePlan = async (id) => {
        if (!window.confirm('Delete this plan?')) return;
        try { await api.delete(`/admin/plans/${id}`); fetchAdminData(); }
        catch { alert('Delete failed'); }
    };

    const handleUpdateSettings = async (e) => {
        e.preventDefault();
        try { await api.put('/admin/settings', settings); alert('Settings updated!'); }
        catch { alert('Failed to update'); }
    };

    const handleQrUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setSettings({ ...settings, qrCode: reader.result });
            reader.readAsDataURL(file);
        }
    };

    const handleGenerateIncome = async () => {
        if (!window.confirm('Distribute daily ROI to all active investments?')) return;
        setIsProcessingIncome(true); setIncomeResult(null);
        try {
            const res = await api.post('/admin/generate-income');
            setIncomeResult({ success: true, message: res.data.message });
            fetchAdminData();
        } catch (err) {
            setIncomeResult({ success: false, message: err.response?.data?.message || 'Failed' });
        } finally {
            setIsProcessingIncome(false);
            setTimeout(() => setIncomeResult(null), 5000);
        }
    };

    /* ── tabs config ── */
    const tabs = [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'users', label: 'Users', icon: Users, badge: users.length },
        { id: 'deposits', label: 'Deposits', icon: ArrowUpCircle, badge: recharges.length, alert: recharges.length > 0 },
        { id: 'withdrawals', label: 'Withdrawals', icon: ArrowDownCircle, badge: withdrawals.length, alert: withdrawals.length > 0 },
        { id: 'plans', label: 'Plans', icon: LayoutGrid },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    /* ── search filter ── */
    const filteredUsers = users.filter(u =>
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.mobile?.includes(search)
    );

    return (
        <Layout title="Admin Panel" hideNav={true}>
            <div className="min-h-screen pb-10">

                {/* ── Top Bar ── */}
                <div className="flex items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-800">Admin Panel</h1>
                        <p className="text-sm text-slate-400 mt-0.5">
                            {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleGenerateIncome}
                            disabled={isProcessingIncome}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${isProcessingIncome
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-green-500 text-white hover:bg-green-600 shadow-md shadow-green-200'}`}
                        >
                            <Zap size={16} />
                            {isProcessingIncome ? 'Processing...' : 'Give Daily ROI'}
                        </button>
                        <button
                            onClick={fetchAdminData}
                            className="p-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl hover:bg-slate-50 transition-all shadow-sm"
                            title="Refresh"
                        >
                            <RefreshCw size={16} />
                        </button>
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-500 rounded-xl text-sm font-bold hover:bg-red-500 hover:text-white transition-all"
                        >
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                </div>

                {/* ── Income Result Alert ── */}
                {incomeResult && (
                    <div className={`mb-6 p-4 rounded-xl border flex items-center gap-3 ${incomeResult.success ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-600'}`}>
                        {incomeResult.success ? <CheckCircle size={18} /> : <XCircle size={18} />}
                        <span className="font-semibold text-sm">{incomeResult.message}</span>
                    </div>
                )}

                {/* ── Stat Cards ── */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <StatCard icon={Users} label="Total Users" value={stats.totalUsers} color="blue" sub="Registered accounts" />
                    <StatCard icon={ArrowUpCircle} label="Total Deposits" value={stats.totalDeposits} prefix="₹" color="green" sub="All approved deposits" />
                    <StatCard icon={Wallet} label="Total Withdrawals" value={stats.totalWithdrawals} prefix="₹" color="rose" sub="All paid withdrawals" />
                </div>

                {/* ── Pending Alerts ── */}
                {(recharges.length > 0 || withdrawals.length > 0) && (
                    <div className="flex flex-wrap gap-3 mb-6">
                        {recharges.length > 0 && (
                            <button onClick={() => setActiveTab('deposits')} className="flex items-center gap-2 bg-orange-50 text-orange-600 border border-orange-200 px-4 py-2 rounded-xl text-sm font-bold hover:bg-orange-100 transition-all">
                                <Bell size={15} className="animate-pulse" />
                                {recharges.length} deposit{recharges.length > 1 ? 's' : ''} pending approval
                                <ChevronRight size={14} />
                            </button>
                        )}
                        {withdrawals.length > 0 && (
                            <button onClick={() => setActiveTab('withdrawals')} className="flex items-center gap-2 bg-purple-50 text-purple-600 border border-purple-200 px-4 py-2 rounded-xl text-sm font-bold hover:bg-purple-100 transition-all">
                                <Bell size={15} className="animate-pulse" />
                                {withdrawals.length} withdrawal{withdrawals.length > 1 ? 's' : ''} pending payment
                                <ChevronRight size={14} />
                            </button>
                        )}
                    </div>
                )}

                {/* ── Main Content Card ── */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

                    {/* Tab Navigation */}
                    <div className="border-b border-slate-100 px-4 pt-4 overflow-x-auto">
                        <div className="flex gap-1 min-w-max">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-sm font-semibold transition-all relative ${activeTab === tab.id
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                                    }`}
                                >
                                    <tab.icon size={15} />
                                    {tab.label}
                                    {tab.badge > 0 && (
                                        <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white text-blue-600' : tab.alert ? 'bg-orange-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                                            {tab.badge}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ════ OVERVIEW TAB ════ */}
                    {activeTab === 'overview' && (
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                                <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                                    <Clock size={16} className="text-blue-500" /> Quick Summary
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        { label: 'Total Users', value: fmt(stats.totalUsers), icon: Users, color: 'text-blue-500' },
                                        { label: 'Total Deposits', value: `₹${fmt(stats.totalDeposits)}`, icon: ArrowUpCircle, color: 'text-green-500' },
                                        { label: 'Total Withdrawals', value: `₹${fmt(stats.totalWithdrawals)}`, icon: ArrowDownCircle, color: 'text-rose-500' },
                                        { label: 'Active Plans', value: plans.filter(p => p.isActive).length, icon: LayoutGrid, color: 'text-purple-500' },
                                    ].map(item => (
                                        <div key={item.label} className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-100">
                                            <div className="flex items-center gap-2">
                                                <item.icon size={15} className={item.color} />
                                                <span className="text-sm text-slate-500">{item.label}</span>
                                            </div>
                                            <span className="font-bold text-slate-800">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                                <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                                    <Bell size={16} className="text-orange-500" /> Pending Actions
                                </h3>
                                <div className="space-y-3">
                                    <div className="bg-white p-4 rounded-lg border border-orange-100">
                                        <p className="text-sm text-slate-500 mb-1">Deposit Requests</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-extrabold text-orange-500">{recharges.length}</span>
                                            {recharges.length > 0 && (
                                                <button onClick={() => setActiveTab('deposits')} className="text-xs font-bold text-orange-500 bg-orange-50 px-3 py-1.5 rounded-lg hover:bg-orange-100">
                                                    Review →
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg border border-purple-100">
                                        <p className="text-sm text-slate-500 mb-1">Withdrawal Requests</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-extrabold text-purple-500">{withdrawals.length}</span>
                                            {withdrawals.length > 0 && (
                                                <button onClick={() => setActiveTab('withdrawals')} className="text-xs font-bold text-purple-500 bg-purple-50 px-3 py-1.5 rounded-lg hover:bg-purple-100">
                                                    Review →
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ════ USERS TAB ════ */}
                    {activeTab === 'users' && (
                        <div>
                            <div className="p-4 border-b border-slate-50">
                                <div className="relative max-w-sm">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Search by name or mobile..."
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none focus:border-blue-300 focus:bg-white transition-all"
                                    />
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[640px]">
                                    <thead>
                                        <tr className="bg-slate-50 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                                            <th className="py-3 px-5">User</th>
                                            <th className="py-3 px-5">Mobile</th>
                                            <th className="py-3 px-5">Wallet Balance</th>
                                            <th className="py-3 px-5">Role</th>
                                            <th className="py-3 px-5">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {filteredUsers.length === 0 ? (
                                            <tr><td colSpan={5}><EmptyState icon={Users} text="No users found" /></td></tr>
                                        ) : filteredUsers.map(u => (
                                            <tr key={u._id} className="hover:bg-slate-50/70 transition-colors">
                                                <td className="py-4 px-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center text-sm font-extrabold text-blue-600">
                                                            {u.name?.substring(0, 2).toUpperCase()}
                                                        </div>
                                                        <span className="font-semibold text-slate-800">{u.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-5 text-sm font-mono text-slate-500">{u.mobile}</td>
                                                <td className="py-4 px-5">
                                                    <span className="font-bold text-slate-800">₹{fmt(u.walletBalance)}</span>
                                                </td>
                                                <td className="py-4 px-5">
                                                    <Badge color={u.role === 'admin' ? 'purple' : 'blue'} label={u.role === 'admin' ? '👑 Admin' : 'User'} />
                                                </td>
                                                <td className="py-4 px-5">
                                                    <div className="flex items-center gap-1.5">
                                                        <div className={`w-2 h-2 rounded-full ${u.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
                                                        <Badge color={u.status === 'active' ? 'green' : 'red'} label={u.status === 'active' ? 'Active' : 'Blocked'} />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ════ DEPOSITS TAB ════ */}
                    {activeTab === 'deposits' && (
                        <div>
                            <div className="p-4 border-b border-slate-50 flex items-center justify-between">
                                <p className="text-sm font-semibold text-slate-500">
                                    {recharges.length > 0
                                        ? <span className="text-orange-600 font-bold">{recharges.length} pending deposit{recharges.length > 1 ? 's' : ''} need your approval</span>
                                        : 'No pending deposit requests'
                                    }
                                </p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[680px]">
                                    <thead>
                                        <tr className="bg-slate-50 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                                            <th className="py-3 px-5">User</th>
                                            <th className="py-3 px-5">Amount</th>
                                            <th className="py-3 px-5">UTR / Reference</th>
                                            <th className="py-3 px-5">Screenshot</th>
                                            <th className="py-3 px-5 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {recharges.length === 0 ? (
                                            <tr><td colSpan={5}><EmptyState icon={ArrowUpCircle} text="No pending deposit requests 🎉" /></td></tr>
                                        ) : recharges.map(r => (
                                            <tr key={r._id} className="hover:bg-slate-50/70 transition-colors">
                                                <td className="py-4 px-5">
                                                    <p className="font-semibold text-slate-800">{r.userId?.name}</p>
                                                    <p className="text-xs text-slate-400 font-mono">{r.userId?.mobile}</p>
                                                </td>
                                                <td className="py-4 px-5">
                                                    <span className="text-lg font-extrabold text-green-600">₹{fmt(r.amount)}</span>
                                                </td>
                                                <td className="py-4 px-5">
                                                    <span className="text-sm font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">{r.utr || 'N/A'}</span>
                                                </td>
                                                <td className="py-4 px-5">
                                                    {r.screenshot ? (
                                                        <button
                                                            onClick={() => window.open(r.screenshot, '_blank')}
                                                            className="w-12 h-12 rounded-xl border-2 border-slate-200 overflow-hidden hover:border-blue-400 transition-all"
                                                        >
                                                            <img src={r.screenshot} alt="Proof" className="w-full h-full object-cover" />
                                                        </button>
                                                    ) : (
                                                        <span className="text-xs text-red-400 font-semibold">No proof</span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-5 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => handleRechargeAction(r._id, 'approved')}
                                                            className="flex items-center gap-1.5 px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-bold hover:bg-green-600 transition-all shadow-sm"
                                                        >
                                                            <Check size={14} /> Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleRechargeAction(r._id, 'rejected')}
                                                            className="flex items-center gap-1.5 px-3 py-2 bg-red-50 text-red-500 rounded-xl text-sm font-bold hover:bg-red-500 hover:text-white transition-all"
                                                        >
                                                            <X size={14} /> Reject
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ════ WITHDRAWALS TAB ════ */}
                    {activeTab === 'withdrawals' && (
                        <div>
                            <div className="p-4 border-b border-slate-50">
                                <p className="text-sm font-semibold text-slate-500">
                                    {withdrawals.length > 0
                                        ? <span className="text-purple-600 font-bold">{withdrawals.length} withdrawal request{withdrawals.length > 1 ? 's' : ''} need payment</span>
                                        : 'No pending withdrawal requests'
                                    }
                                </p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[680px]">
                                    <thead>
                                        <tr className="bg-slate-50 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                                            <th className="py-3 px-5">User</th>
                                            <th className="py-3 px-5">Amount</th>
                                            <th className="py-3 px-5">Payment Details</th>
                                            <th className="py-3 px-5 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {withdrawals.length === 0 ? (
                                            <tr><td colSpan={4}><EmptyState icon={ArrowDownCircle} text="No pending withdrawal requests 🎉" /></td></tr>
                                        ) : withdrawals.map(w => (
                                            <tr key={w._id} className="hover:bg-slate-50/70 transition-colors">
                                                <td className="py-4 px-5">
                                                    <p className="font-semibold text-slate-800">{w.userId?.name}</p>
                                                    <p className="text-xs text-slate-400 font-mono">{w.userId?.mobile}</p>
                                                </td>
                                                <td className="py-4 px-5">
                                                    <span className="text-lg font-extrabold text-purple-600">₹{fmt(w.amount)}</span>
                                                </td>
                                                <td className="py-4 px-5">
                                                    {w.accountDetails?.method === 'upi' ? (
                                                        <div>
                                                            <Badge color="purple" label="UPI" />
                                                            <p className="mt-1.5 text-sm font-bold text-slate-700">{w.accountDetails.upiId}</p>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-0.5">
                                                            <Badge color="blue" label="Bank Transfer" />
                                                            <p className="text-sm font-bold text-slate-700 mt-1">{w.accountDetails?.name}</p>
                                                            <p className="text-xs font-mono text-slate-500">A/C: {w.accountDetails?.accountNumber}</p>
                                                            <p className="text-xs text-slate-400">IFSC: {w.accountDetails?.ifsc}</p>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="py-4 px-5 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => handleWithdrawAction(w._id, 'approved')}
                                                            className="flex items-center gap-1.5 px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-bold hover:bg-green-600 transition-all shadow-sm"
                                                        >
                                                            <Check size={14} /> Mark Paid
                                                        </button>
                                                        <button
                                                            onClick={() => handleWithdrawAction(w._id, 'rejected')}
                                                            className="flex items-center gap-1.5 px-3 py-2 bg-red-50 text-red-500 rounded-xl text-sm font-bold hover:bg-red-500 hover:text-white transition-all"
                                                        >
                                                            <X size={14} /> Reject
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ════ PLANS TAB ════ */}
                    {activeTab === 'plans' && (
                        <div className="p-6 space-y-8">

                            {/* Add Plan Form */}
                            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <Plus size={16} className="text-blue-600" /> Create New Plan
                                </h3>
                                <form onSubmit={handleCreatePlan} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                                    {[
                                        { label: 'Plan Name', key: 'name', placeholder: 'Plan 5000', type: 'text' },
                                        { label: 'Investment (₹)', key: 'amount', placeholder: '5000', type: 'number' },
                                        { label: 'Daily Return (₹)', key: 'daily', placeholder: '800', type: 'number' },
                                    ].map(f => (
                                        <div key={f.key}>
                                            <label className="block text-xs font-bold text-slate-500 mb-1.5">{f.label}</label>
                                            <input
                                                type={f.type} placeholder={f.placeholder} required
                                                value={newPlan[f.key]}
                                                onChange={e => setNewPlan({ ...newPlan, [f.key]: e.target.value })}
                                                className="w-full h-11 bg-white border border-slate-200 rounded-xl px-3 text-sm font-semibold text-slate-800 outline-none focus:border-blue-400 transition-all"
                                            />
                                        </div>
                                    ))}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1.5">Tier</label>
                                        <select
                                            value={newPlan.tier}
                                            onChange={e => setNewPlan({ ...newPlan, tier: e.target.value })}
                                            className="w-full h-11 bg-white border border-slate-200 rounded-xl px-3 text-sm font-semibold text-slate-800 outline-none"
                                        >
                                            <option value="standard">⭐ Standard</option>
                                            <option value="vip">👑 VIP</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col justify-end">
                                        <button type="submit" className="h-11 bg-blue-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-md shadow-blue-200">
                                            <Plus size={15} /> Add
                                        </button>
                                    </div>
                                </form>
                                {planMsg && <p className="mt-3 text-sm font-semibold text-green-600">{planMsg}</p>}
                            </div>

                            {/* Plans List */}
                            {['standard', 'vip'].map(tier => (
                                <div key={tier}>
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-base">{tier === 'vip' ? '👑' : '⭐'}</span>
                                        <h4 className="font-bold text-slate-700">{tier === 'vip' ? 'VIP Plans' : 'Standard Plans'}</h4>
                                        <div className="flex-1 h-px bg-slate-100" />
                                        <Badge color={tier === 'vip' ? 'purple' : 'blue'} label={`${plans.filter(p => p.tier === tier).length} plans`} />
                                    </div>
                                    <div className="space-y-3">
                                        {plans.filter(p => p.tier === tier).map(plan => (
                                            <div key={plan._id} className={`rounded-xl border p-4 transition-all ${plan.isActive ? 'bg-white border-slate-200' : 'bg-slate-50 border-dashed border-slate-200 opacity-60'}`}>
                                                {editingPlan?._id === plan._id ? (
                                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 items-end">
                                                        {[
                                                            { label: 'Name', key: 'name', type: 'text' },
                                                            { label: 'Investment (₹)', key: 'amount', type: 'number' },
                                                            { label: 'Daily Return (₹)', key: 'daily', type: 'number' },
                                                        ].map(f => (
                                                            <div key={f.key}>
                                                                <label className="block text-xs font-bold text-slate-400 mb-1">{f.label}</label>
                                                                <input
                                                                    type={f.type} value={editingPlan[f.key]}
                                                                    onChange={e => setEditingPlan({ ...editingPlan, [f.key]: e.target.value })}
                                                                    className="w-full h-10 bg-white border border-slate-200 rounded-xl px-3 text-sm font-semibold outline-none focus:border-blue-400"
                                                                />
                                                            </div>
                                                        ))}
                                                        <div>
                                                            <label className="block text-xs font-bold text-slate-400 mb-1">Tier</label>
                                                            <select value={editingPlan.tier} onChange={e => setEditingPlan({ ...editingPlan, tier: e.target.value })} className="w-full h-10 bg-white border border-slate-200 rounded-xl px-3 text-sm font-semibold outline-none">
                                                                <option value="standard">⭐ Standard</option>
                                                                <option value="vip">👑 VIP</option>
                                                            </select>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button onClick={() => handleUpdatePlan(plan._id)} className="flex-1 h-10 bg-green-500 text-white rounded-xl text-sm font-bold flex items-center justify-center hover:bg-green-600"><Check size={14} /></button>
                                                            <button onClick={() => setEditingPlan(null)} className="h-10 w-10 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center hover:bg-slate-200"><X size={14} /></button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-between flex-wrap gap-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tier === 'vip' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                                                                {tier === 'vip' ? <Crown size={18} /> : <Star size={18} />}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-slate-800">{plan.name}</p>
                                                                <p className="text-xs text-slate-400">
                                                                    Invest <span className="font-bold text-slate-600">₹{fmt(plan.amount)}</span> · Get <span className="font-bold text-green-600">₹{fmt(plan.daily)}/day</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Badge color={plan.isActive ? 'green' : 'red'} label={plan.isActive ? 'Active' : 'Hidden'} />
                                                            <button onClick={() => api.patch(`/admin/plans/${plan._id}`, { isActive: !plan.isActive }).then(fetchAdminData)} className="px-3 py-1.5 bg-slate-100 text-slate-500 rounded-lg text-xs font-bold hover:bg-slate-200 transition-all">
                                                                {plan.isActive ? 'Hide' : 'Show'}
                                                            </button>
                                                            <button onClick={() => setEditingPlan({ ...plan })} className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><Pencil size={13} /></button>
                                                            <button onClick={() => handleDeletePlan(plan._id)} className="w-8 h-8 bg-red-50 text-red-400 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"><Trash2 size={13} /></button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                        {plans.filter(p => p.tier === tier).length === 0 && (
                                            <p className="text-center text-sm text-slate-300 py-6">No {tier} plans yet</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ════ SETTINGS TAB ════ */}
                    {activeTab === 'settings' && (
                        <div className="p-6 max-w-2xl mx-auto">
                            <div className="mb-6">
                                <h3 className="font-bold text-slate-800 text-lg">Payment Settings</h3>
                                <p className="text-sm text-slate-400 mt-0.5">Configure UPI ID and QR code for deposits</p>
                            </div>
                            <form onSubmit={handleUpdateSettings} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-600 mb-2 flex items-center gap-2">
                                        <CreditCard size={15} className="text-blue-500" /> UPI ID
                                    </label>
                                    <input
                                        type="text" value={settings.upiId} required
                                        onChange={e => setSettings({ ...settings, upiId: e.target.value })}
                                        placeholder="example@upi"
                                        className="w-full h-13 bg-slate-50 border border-slate-200 rounded-xl px-4 text-base font-semibold text-slate-800 outline-none focus:border-blue-400 focus:bg-white transition-all"
                                    />
                                    <p className="text-xs text-slate-400 mt-1.5">Users will see this UPI ID when depositing money</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-600 mb-2 flex items-center gap-2">
                                        <ImageIcon size={15} className="text-blue-500" /> QR Code Image
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="file" accept="image/*" onChange={handleQrUpload}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        <div className="h-13 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl px-4 flex items-center justify-between text-sm font-semibold text-slate-400 hover:border-blue-400 hover:bg-blue-50 transition-all">
                                            <span>{settings.qrCode ? '✅ QR image loaded — click to change' : '📷 Click to upload QR code image'}</span>
                                        </div>
                                    </div>
                                </div>

                                {settings.qrCode && (
                                    <div className="flex items-center gap-5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                                        <div className="w-32 h-32 bg-white border border-slate-200 rounded-xl p-2 shadow-sm">
                                            <img src={settings.qrCode} alt="QR Preview" className="w-full h-full object-contain" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-700">QR Code Preview</p>
                                            <p className="text-xs text-slate-400 mt-1">This QR will be shown to users during deposit</p>
                                            <button type="button" onClick={() => setSettings({ ...settings, qrCode: '' })} className="mt-3 text-xs text-red-500 font-bold hover:underline">Remove QR</button>
                                        </div>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full h-13 bg-blue-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                                >
                                    <ShieldCheck size={16} /> Save Settings
                                </button>
                            </form>
                        </div>
                    )}

                </div>

                {/* ── Footer ── */}
                <div className="mt-6 text-center text-xs text-slate-300 font-semibold">
                    Grow India Admin · {new Date().getFullYear()} · Secure Panel
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
