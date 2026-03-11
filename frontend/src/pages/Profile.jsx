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
                { name: 'Transaction History', icon: <History className="text-royal-blue" />, path: '#' },
                { name: 'Withdrawal Repository', icon: <Banknote className="text-electric-azure" />, path: '#' },
                { name: 'Linked Bank Account', icon: <Landmark className="text-royal-blue" />, action: () => setShowBankModal(true) },
            ]
        },
        {
            title: 'Member Support',
            items: [
                { name: 'Consortium Hotline', icon: <Headphones className="text-deep-sapphire" />, path: 'https://t.me/growindia' },
                { name: 'Protocol Updates', icon: <Activity className="text-midnight-cobalt" />, path: '#' },
            ]
        }
    ];

    return (
        <Layout>
            <div className="mb-10">
                <div className="flex items-center gap-2 mb-4 opacity-80">
                    <User className="text-royal-blue" size={14} />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-royal-blue/60">Console Access Layer</p>
                </div>
                <h1 className="text-4xl font-extrabold text-text-bright tracking-tight">Profile Dashboard</h1>
            </div>

            {/* Profile Hero Card */}
            <div className="glass-card-blue !rounded-[3rem] p-10 relative overflow-hidden mb-12 group border-blue-50/50 !bg-white/80 shadow-2xl">
                {/* Dynamic Background Glows */}
                <div className="absolute top-[-20%] right-[-10%] w-80 h-80 bg-royal-blue/15 rounded-full blur-[100px] group-hover:bg-royal-blue/25 transition-all duration-1000"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-72 h-72 bg-electric-azure/10 rounded-full blur-[100px] group-hover:bg-electric-azure/20 transition-all duration-1000" style={{ animationDelay: '1.2s' }}></div>

                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-32 h-32 bg-white shadow-2xl rounded-[2.5rem] p-1.5 mb-8 relative group-hover:scale-105 transition-all duration-700">
                        <div className="absolute inset-0 bg-gradient-to-tr from-royal-blue via-primary-indigo to-deep-sapphire rounded-[2.5rem] opacity-30 group-hover:opacity-50 transition-opacity"></div>
                        <div className="relative w-full h-full bg-white rounded-[2rem] flex items-center justify-center border border-blue-50/50 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent"></div>
                            <User size={64} className="text-text-muted opacity-40 relative z-10" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-royal-blue rounded-2xl border-4 border-white shadow-[0_4px_15px_rgba(37,99,235,0.4)] flex items-center justify-center">
                            <ShieldCheck size={22} className="text-white" />
                        </div>
                    </div>

                    <h2 className="text-4xl font-black text-text-bright tracking-tight mb-4 uppercase">{user?.name}</h2>
                    <div className="flex items-center gap-3 px-5 py-2 bg-white border border-blue-50/50 rounded-full shadow-md">
                        <Smartphone size={16} className="text-royal-blue" />
                        <span className="text-xs font-black text-text-bright tracking-[0.2em] uppercase opacity-60">{user?.mobile}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 mt-12 pt-10 border-t border-blue-50/50 gap-8 relative z-10">
                    <div className="text-center group/bal">
                        <p className="text-[10px] font-black uppercase text-text-muted mb-3 tracking-[0.3em] opacity-40 group-hover/bal:text-royal-blue transition-all">Available Liquidity</p>
                        <p className="text-3xl font-black text-royal-blue tracking-tighter">₹{user?.walletBalance?.toLocaleString()}</p>
                    </div>
                    <div className="text-center border-l border-blue-50/50 group/stat">
                        <p className="text-[10px] font-black uppercase text-text-muted mb-3 tracking-[0.3em] opacity-40 group-hover/stat:text-royal-blue transition-all">Node Integrity</p>
                        <div className="inline-flex items-center gap-2 px-5 py-1.5 bg-blue-50 border border-blue-100/50 rounded-full">
                            <div className="w-2 h-2 bg-royal-blue rounded-full shadow-[0_0_12px_#2563eb] animate-pulse"></div>
                            <span className="text-[10px] font-black text-royal-blue uppercase tracking-[0.2em]">Active Protocol</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Sections */}
            {menuSections.map((section, idx) => (
                <div key={idx} className="mb-10">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-text-muted ml-8 mb-4 opacity-40">{section.title}</h4>
                    <div className="glass-card-blue !rounded-[2.5rem] border-blue-50/50 !bg-white/80 overflow-hidden shadow-xl">
                        {section.items.map((item, i) => (
                            <button
                                key={i}
                                onClick={item.action}
                                className={`w-full flex items-center justify-between p-7 hover:bg-white transition-all group ${i !== section.items.length - 1 ? 'border-b border-blue-50/50' : ''}`}
                            >
                                <div className="flex items-center gap-6">
                                    <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center border border-blue-50/50 shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                                        {React.cloneElement(item.icon, { size: 24, strokeWidth: 2.5 })}
                                    </div>
                                    <div className="text-left">
                                        <span className="font-black text-text-bright tracking-tight text-base mb-0.5 block">{item.name}</span>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1 h-1 bg-royal-blue/20 rounded-full"></div>
                                            <p className="text-[9px] font-black text-text-muted uppercase tracking-[0.2em] opacity-30">Protocol v{4.2 + i}.0-Prime</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-blue-50/50 flex items-center justify-center text-royal-blue group-hover:text-white group-hover:bg-royal-blue transition-all group-hover:translate-x-1 shadow-sm">
                                    <ChevronRight size={20} />
                                </div>
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
                        <div className="absolute top-0 left-0 w-64 h-64 bg-royal-blue/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[80px]"></div>

                        <div className="flex justify-between items-start mb-10 relative z-10">
                            <div>
                                <h2 className="text-2xl font-black text-text-bright tracking-tight mb-2 uppercase">Bank <span className="text-royal-blue">Registry</span></h2>
                                <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] opacity-40">Settlement Portal</p>
                            </div>
                            <button onClick={() => setShowBankModal(false)} className="w-10 h-10 flex items-center justify-center bg-blue-50/50 rounded-xl text-text-muted hover:bg-blue-100/50 transition-all">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleBankUpdate} className="space-y-6 relative z-10">
                            <div className="space-y-2">
                                <input
                                    placeholder="Enter full name"
                                    className="w-full bg-blue-50/30 border border-blue-50/50 rounded-2xl py-5 px-6 focus:border-royal-blue/30 outline-none text-sm font-black text-text-bright placeholder:text-text-muted/10 transition-all font-sans"
                                    value={bankData.holderName}
                                    onChange={(e) => setBankData({ ...bankData, holderName: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-text-muted ml-4 tracking-[0.2em] opacity-40">Numerical Chain (Account)</label>
                                <input
                                    placeholder="Digit chain"
                                    className="w-full bg-blue-50/30 border border-blue-50/50 rounded-2xl py-5 px-6 focus:border-royal-blue/30 outline-none text-sm font-black font-mono text-royal-blue placeholder:text-royal-blue/10 transition-all"
                                    value={bankData.accountNumber}
                                    onChange={(e) => setBankData({ ...bankData, accountNumber: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-text-muted ml-4 tracking-[0.2em] opacity-40">Network Routing (IFSC)</label>
                                <input
                                    placeholder="IFSC code"
                                    className="w-full bg-blue-50/30 border border-blue-50/50 rounded-2xl py-5 px-6 focus:border-royal-blue/30 outline-none text-sm font-black font-mono text-royal-blue uppercase placeholder:text-royal-blue/10 transition-all"
                                    value={bankData.ifsc}
                                    onChange={(e) => setBankData({ ...bankData, ifsc: e.target.value })}
                                    required
                                />
                            </div>
                            <button className="btn-primary w-full py-6 text-sm uppercase tracking-[0.3em] font-black shadow-indigo mt-4 !rounded-2xl !bg-gradient-to-r from-royal-blue to-deep-sapphire border-none">
                                UPDATE CONSORTIUM REGISTRY
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Profile;
