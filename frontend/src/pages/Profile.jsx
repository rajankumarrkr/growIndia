import React, { useContext, useState } from 'react';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';
import { User, Shield, CreditCard, History, Headphones, LogOut, ChevronRight, Settings, Banknote, ShieldCheck, Mail, MapPin, Activity, Wallet, Smartphone, Landmark, X, Zap } from 'lucide-react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { user, logout, setUser } = useContext(AuthContext);
    const [showBankModal, setShowBankModal] = useState(false);
    const [bankData, setBankData] = useState({
        holderName: user?.bankDetails?.holderName || '',
        accountNumber: user?.bankDetails?.accountNumber || '',
        ifsc: user?.bankDetails?.ifsc || ''
    });

    const handleBankUpdate = async (e) => {
        e.preventDefault();
        try {
            await api.post('/user/bank-details', bankData);
            setShowBankModal(false);
            const res = await api.get('/user/profile');
            setUser(res.data);
        } catch (err) { }
    };

    const menuSections = [
        {
            title: 'Financial Modules',
            items: [
                { name: 'Active Nodes', icon: <Activity className="text-royal-blue" />, path: '/investments' },
                { name: 'Wallet Hub', icon: <Wallet className="text-slate-600" />, path: '/wallet' },
                { name: 'Activity Log', icon: <History className="text-slate-400" />, path: '/history' },
                { name: 'Bank Registry', icon: <Landmark className="text-royal-blue" />, action: () => setShowBankModal(true) },
            ]
        },
        {
            title: 'Ecosystem',
            items: [
                { name: 'Affiliate Hub', icon: <Zap className="text-amber-500" />, path: '/team' },
                { name: 'Support Proxy', icon: <Headphones className="text-slate-400" />, path: 'https://t.me/growindia', external: true },
            ]
        }
    ];

    return (
        <Layout title="Account Command">
            <div className="mb-10 px-2">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-[2rem] flex items-center justify-center text-slate-300 relative">
                            <User size={32} />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-royal-blue rounded-xl border-4 border-white shadow-sm flex items-center justify-center">
                                <ShieldCheck size={10} className="text-white" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 tracking-tight">{user?.name}</h1>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user?.mobile}</p>
                        </div>
                    </div>
                </div>

                <div className="fintech-card bg-slate-900 !p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-royal-blue/20 rounded-full blur-3xl" />
                    <div className="relative z-10 flex flex-col gap-6">
                        <div>
                            <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.3em] mb-1">Liquid Balance</p>
                            <h2 className="text-3xl font-black text-white tracking-tight">₹{user?.walletBalance?.toLocaleString()}</h2>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg w-fit border border-white/5">
                            <Activity size={10} className="text-royal-blue" />
                            <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Protocol Version 4.2.1 Stable</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Sections */}
            {menuSections.map((section, idx) => (
                <div key={idx} className="mb-8 overflow-hidden">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 ml-4 mb-4">{section.title}</h4>
                    <div className="fintech-card !p-0 overflow-hidden divide-y divide-slate-50">
                        {section.items.map((item, i) => {
                            const Content = () => (
                                <div className="flex items-center justify-between p-5 group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-blue-50 group-hover:text-royal-blue transition-all">
                                            {item.icon}
                                        </div>
                                        <span className="text-sm font-black text-slate-700">{item.name}</span>
                                    </div>
                                    <ChevronRight size={16} className="text-slate-200 group-hover:text-royal-blue group-hover:translate-x-1 transition-all" />
                                </div>
                            );

                            return item.action ? (
                                <button key={i} onClick={item.action} className="w-full text-left">
                                    <Content />
                                </button>
                            ) : item.external ? (
                                <a key={i} href={item.path} target="_blank" rel="noopener noreferrer">
                                    <Content />
                                </a>
                            ) : (
                                <Link key={i} to={item.path}>
                                    <Content />
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ))}

            <button
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 p-6 text-[10px] font-black uppercase tracking-[0.25em] text-red-400 hover:text-red-500 transition-colors mb-12"
            >
                <LogOut size={16} /> Terminate Current Session
            </button>

            {/* Bank Repository Modal */}
            {showBankModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] flex items-end justify-center">
                    <div className="bg-white w-full max-w-xl rounded-t-[3rem] p-8 pb-12 shadow-2xl animate-in slide-in-from-bottom duration-500">
                        <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-8" />

                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">Bank Registry</h2>
                                <p className="text-label mt-1">Settlement node configuration</p>
                            </div>
                            <button onClick={() => setShowBankModal(false)} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleBankUpdate} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-label ml-2">Holder Name</label>
                                <input
                                    placeholder="Enter full name"
                                    className="w-full h-15 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-sm font-black text-slate-900 focus:bg-white focus:border-royal-blue/30 transition-all outline-none"
                                    value={bankData.holderName}
                                    onChange={(e) => setBankData({ ...bankData, holderName: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-label ml-2">Account Number</label>
                                <input
                                    placeholder="Numerical chain"
                                    className="w-full h-15 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-sm font-black text-royal-blue font-mono tracking-widest focus:bg-white focus:border-royal-blue/30 transition-all outline-none"
                                    value={bankData.accountNumber}
                                    onChange={(e) => setBankData({ ...bankData, accountNumber: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-label ml-2">IFSC Routing</label>
                                <input
                                    placeholder="Network code"
                                    className="w-full h-15 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-sm font-black text-royal-blue font-mono tracking-widest uppercase focus:bg-white focus:border-royal-blue/30 transition-all outline-none"
                                    value={bankData.ifsc}
                                    onChange={(e) => setBankData({ ...bankData, ifsc: e.target.value })}
                                    required
                                />
                            </div>

                            <button className="btn-fintech btn-fintech-primary w-full mt-4 uppercase tracking-[0.2em] text-xs">
                                Update Settlement Node
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Profile;
