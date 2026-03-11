import React, { useContext, useState } from 'react';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';
import { User, Shield, CreditCard, History, Headphones, LogOut, ChevronRight, Settings, Banknote, ShieldCheck, Mail, MapPin, Activity, Wallet, Smartphone, Landmark, X } from 'lucide-react';
import api from '../api/axios';

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
            title: 'Financial Assets',
            items: [
                { name: 'Transaction History', icon: <History className="text-primary-indigo" />, path: '#' },
                { name: 'Withdrawal Hub', icon: <Banknote className="text-emerald-500" />, path: '#' },
                { name: 'Linked Bank Account', icon: <Landmark className="text-violet-500" />, action: () => setShowBankModal(true) },
            ]
        },
        {
            title: 'Member Support',
            items: [
                { name: 'Telegram Support', icon: <Headphones className="text-sky-500" />, path: 'https://t.me/growindia' },
                { name: 'Community Channel', icon: <Activity className="text-amber-500" />, path: '#' },
            ]
        }
    ];

    return (
        <Layout>
            <div className="mb-10">
                <div className="flex items-center gap-2 mb-4 opacity-60">
                    <User className="text-primary-indigo" size={14} />
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">Account Controls</p>
                </div>
                <h1 className="text-4xl font-extrabold text-text-bright tracking-tight">Profile Dashboard</h1>
            </div>

            {/* Profile Hero Card */}
            <div className="glass-card p-10 relative overflow-hidden mb-10 group border-black/5 !bg-white shadow-premium">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-indigo/5 rounded-full translate-x-1/4 -translate-y-1/4 blur-[100px]"></div>

                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-28 h-28 bg-black/5 rounded-3xl p-1 mb-6 relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary-indigo to-secondary-violet rounded-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                        <div className="relative w-full h-full bg-white rounded-[1.4rem] flex items-center justify-center border border-black/5">
                            <User size={48} className="text-text-muted opacity-30" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                            <ShieldCheck size={12} className="text-white" />
                        </div>
                    </div>

                    <h2 className="text-3xl font-extrabold text-text-bright tracking-tight mb-2">{user?.name}</h2>
                    <div className="flex items-center gap-2 px-3 py-1 bg-black/5 border border-black/5 rounded-full">
                        <Smartphone size={12} className="text-primary-indigo" />
                        <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase">{user?.mobile}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 mt-10 pt-10 border-t border-black/5 gap-6 relative z-10">
                    <div className="text-center">
                        <p className="text-[10px] font-bold uppercase text-text-muted mb-2 tracking-widest opacity-60">Wallet Balance</p>
                        <p className="text-2xl font-extrabold premium-gradient-text tracking-tight">₹{user?.walletBalance?.toLocaleString()}</p>
                    </div>
                    <div className="text-center border-l border-black/5">
                        <p className="text-[10px] font-bold uppercase text-text-muted mb-2 tracking-widest opacity-60">Account Status</p>
                        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-emerald-500/10 border border-emerald-500/10 rounded-full">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                            <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Active Member</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Sections */}
            {menuSections.map((section, idx) => (
                <div key={idx} className="mb-8">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted ml-6 mb-4 opacity-60">{section.title}</h4>
                    <div className="glass-card !rounded-3xl border-black/5 !bg-white overflow-hidden shadow-premium">
                        {section.items.map((item, i) => (
                            <button
                                key={i}
                                onClick={item.action}
                                className={`w-full flex items-center justify-between p-6 hover:bg-black/5 transition-all group ${i !== section.items.length - 1 ? 'border-b border-black/5' : ''}`}
                            >
                                <div className="flex items-center gap-5">
                                    <div className="bg-black/5 w-12 h-12 rounded-xl flex items-center justify-center border border-black/5 group-hover:border-primary-indigo/20 transition-all">
                                        {item.icon}
                                    </div>
                                    <div className="text-left">
                                        <span className="font-bold text-text-bright tracking-tight text-sm block">{item.name}</span>
                                        <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest mt-0.5 opacity-40">Secure Access Port</p>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-text-muted group-hover:text-primary-indigo transition-all group-hover:translate-x-1" />
                            </button>
                        ))}
                    </div>
                </div>
            ))}

            {/* Logout Action */}
            <button
                onClick={logout}
                className="w-full glass-card !rounded-2xl py-6 text-danger-rose font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 border-danger-rose/10 bg-danger-rose/5 hover:bg-danger-rose/10 transition-all mb-12 shadow-premium"
            >
                <LogOut size={20} /> Terminate Session
            </button>

            {/* Bank Repository Modal - Light Mode */}
            {showBankModal && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-xl z-[200] flex items-end sm:items-center justify-center p-6">
                    <div className="bg-white w-full max-w-md !rounded-[2.5rem] p-10 border-black/5 shadow-2xl animate-in fade-in slide-in-from-bottom-10 duration-500 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-violet-600/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[80px]"></div>

                        <div className="flex justify-between items-start mb-10 relative z-10">
                            <div>
                                <h2 className="text-2xl font-extrabold text-text-bright tracking-tight mb-1">Bank Credential</h2>
                                <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] opacity-60">Withdrawal Repository</p>
                            </div>
                            <button onClick={() => setShowBankModal(false)} className="w-10 h-10 flex items-center justify-center bg-black/5 rounded-xl text-text-muted hover:bg-black/10 transition-all">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleBankUpdate} className="space-y-6 relative z-10">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-text-muted ml-4 tracking-widest">Account Holder Name</label>
                                <input
                                    placeholder="Enter full name"
                                    className="w-full bg-black/5 border border-black/5 rounded-2xl py-4 px-6 focus:border-primary-indigo outline-none text-sm font-bold text-text-bright placeholder:text-text-muted/20"
                                    value={bankData.holderName}
                                    onChange={(e) => setBankData({ ...bankData, holderName: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-text-muted ml-4 tracking-widest">Account Number</label>
                                <input
                                    placeholder="Digit chain"
                                    className="w-full bg-black/5 border border-black/5 rounded-2xl py-4 px-6 focus:border-primary-indigo outline-none text-sm font-bold font-mono text-primary-indigo placeholder:text-primary-indigo/10"
                                    value={bankData.accountNumber}
                                    onChange={(e) => setBankData({ ...bankData, accountNumber: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-text-muted ml-4 tracking-widest">Network Routing (IFSC)</label>
                                <input
                                    placeholder="IFSC code"
                                    className="w-full bg-black/5 border border-black/5 rounded-2xl py-4 px-6 focus:border-primary-indigo outline-none text-sm font-bold font-mono text-violet-600 uppercase placeholder:text-violet-600/10"
                                    value={bankData.ifsc}
                                    onChange={(e) => setBankData({ ...bankData, ifsc: e.target.value })}
                                    required
                                />
                            </div>
                            <button className="btn-primary w-full py-5 text-sm uppercase tracking-widest font-extrabold shadow-indigo mt-4">
                                Update Registry
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Profile;
