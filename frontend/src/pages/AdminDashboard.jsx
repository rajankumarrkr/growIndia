import React, { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { Users, CreditCard, CheckCircle, XCircle, LogOut, Activity, Landmark, Database, Zap, Search, Filter, ShieldAlert, TrendingUp, ShieldCheck, Settings, ImageIcon, Check, X } from 'lucide-react';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
    const { logout } = useContext(AuthContext);
    const [stats, setStats] = useState({ totalUsers: 0, totalDeposits: 0, totalWithdrawals: 0 });
    const [users, setUsers] = useState([]);
    const [recharges, setRecharges] = useState([]);
    const [settings, setSettings] = useState({ upiId: '', qrCode: '' });
    const [activeTab, setActiveTab] = useState('users');

    useEffect(() => {
        fetchAdminData();
    }, []);

    const fetchAdminData = async () => {
        try {
            const [s, u, r, set] = await Promise.all([
                api.get('/admin/stats'),
                api.get('/admin/users'),
                api.get('/admin/recharges/pending'),
                api.get('/admin/settings'),
            ]);
            setStats(s.data);
            setUsers(u.data);
            setRecharges(r.data);
            setSettings(set.data);
        } catch (err) { }
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
                            { id: 'withdrawals', label: 'Settlement', icon: <Zap /> },
                            { id: 'settings', label: 'Settings', icon: <Settings /> }
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
                    ) : activeTab === 'recharges' ? (
                        <table className="w-full">
                            <thead>
                                <tr className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 border-b border-slate-50">
                                    <th className="py-6 px-8 text-left">Identity / Mobile</th>
                                    <th className="py-6 px-8 text-left">Amount & UTR</th>
                                    <th className="py-6 px-8 text-left">Proof</th>
                                    <th className="py-6 px-8 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {recharges.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center py-12 text-slate-400 text-xs font-black uppercase tracking-widest">No pending recharges</td>
                                    </tr>
                                ) : recharges.map(r => (
                                    <tr key={r._id} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="py-6 px-8">
                                            <span className="text-sm font-black text-slate-900 block">{r.userId?.name}</span>
                                            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">{r.userId?.mobile}</span>
                                        </td>
                                        <td className="py-6 px-8">
                                            <span className="text-sm font-black text-slate-900 block">₹{r.amount.toLocaleString()}</span>
                                            <span className="text-[10px] font-mono text-slate-400 tracking-wider">UTR: {r.utr}</span>
                                        </td>
                                        <td className="py-6 px-8">
                                            {r.screenshot ? (
                                                <div className="relative group/img cursor-pointer w-12 h-12 rounded-lg border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center">
                                                    <img src={r.screenshot} alt="Proof" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/50 flex opacity-0 group-hover/img:opacity-100 items-center justify-center text-white backdrop-blur-sm z-10 transition-all rounded-lg" onClick={() => window.open(r.screenshot, '_blank')}>
                                                        <ImageIcon size={16} />
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-[10px] font-bold text-slate-400">No Proof</span>
                                            )}
                                        </td>
                                        <td className="py-6 px-8 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <button onClick={() => handleRechargeAction(r._id, 'approved')} className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-all">
                                                    <Check size={16} />
                                                </button>
                                                <button onClick={() => handleRechargeAction(r._id, 'rejected')} className="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all">
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : activeTab === 'settings' ? (
                        <div className="p-8 max-w-2xl mx-auto">
                            <h3 className="text-lg font-black text-slate-900 mb-6">Gateway Protocol Configuration</h3>
                            <form onSubmit={handleUpdateSettings} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Official UPI ID</label>
                                    <input type="text" value={settings.upiId} onChange={(e) => setSettings({...settings, upiId: e.target.value})} className="w-full h-14 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-bold text-slate-900 focus:bg-white focus:border-royal-blue/30 outline-none transition-all" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Payment QR Code</label>
                                    <div className="flex items-center gap-6 p-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 hover:bg-slate-50 hover:border-royal-blue/30 transition-all">
                                        {settings.qrCode && (
                                            <div className="w-24 h-24 rounded-lg overflow-hidden border border-slate-200 bg-white flex-shrink-0">
                                                <img src={settings.qrCode} alt="QR Code" className="w-full h-full object-contain" />
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <input type="file" accept="image/*" onChange={handleQrUpload} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-blue-50 file:text-royal-blue hover:file:bg-blue-100 transition-all cursor-pointer" />
                                            <p className="text-[10px] font-bold text-slate-400 mt-2">Upload a high-quality QR image (Base64 encoded)</p>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn-fintech btn-fintech-primary w-full shadow-lg">Save Configuration</button>
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
        </Layout>
    );
};

export default AdminDashboard;
