import React, { useContext, useState } from 'react';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';
import { User, Shield, CreditCard, History, Headphones, LogOut, ChevronRight, Settings, Banknote, ShieldCheck, Mail, MapPin, Activity } from 'lucide-react';
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
            alert('VAULT-SYNC: Success');
            setShowBankModal(false);
            const res = await api.get('/user/profile');
            setUser(res.data);
        } catch (err) {
            alert('VAULT-SYNC: Failed');
        }
    };

    const menuSections = [
        {
            title: 'Finance Hub',
            items: [
                { name: 'Operation Logs', icon: <History className="text-primary-neon" />, path: '#' },
                { name: 'Asset Outlets', icon: <Banknote className="text-success-neon" />, path: '#' },
                { name: 'Bank Registry', icon: <ShieldCheck className="text-secondary-neon" />, action: () => setShowBankModal(true) },
            ]
        },
        {
            title: 'Support Nexus',
            items: [
                { name: 'Priority Uplink', icon: <Headphones className="text-sky-500" />, path: 'https://t.me/growindia' },
                { name: 'Node Locations', icon: <MapPin className="text-slate-500" />, path: '#' },
            ]
        }
    ];

    return (
        <Layout>
            {/* Profile Identity Card */}
            <div className="bg-bg-card rounded-[4rem] p-12 border border-white/5 relative overflow-hidden group shadow-[0_30px_100px_rgba(0,0,0,0.5)] mb-12">
                <div className="absolute top-0 left-0 w-64 h-64 bg-primary-neon/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[100px] group-hover:bg-primary-neon/10 transition-colors"></div>

                <div className="relative z-10 flex flex-col items-center mb-10">
                    <div className="w-32 h-32 bg-white/5 rounded-[3rem] p-[2px] mb-8 relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary-neon via-transparent to-secondary-neon rounded-[3rem] opacity-40 animate-spin-slow"></div>
                        <div className="relative w-full h-full bg-bg-card rounded-[2.9rem] flex items-center justify-center border border-white/5">
                            <User size={64} className="text-white/20" />
                        </div>
                        <div className="absolute bottom-1 right-2 w-8 h-8 bg-success-neon rounded-full border-4 border-bg-card shadow-lg flex items-center justify-center">
                            <Activity size={12} className="text-white" />
                        </div>
                    </div>

                    <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">{user?.name}</h2>
                    <div className="flex items-center gap-2 mt-3 text-primary-neon font-black text-[10px] uppercase tracking-[0.4em] opacity-80">
                        <Shield size={12} /> Unit_Verified_Auth
                    </div>
                </div>

                <div className="grid grid-cols-2 bg-white/5 rounded-[2.5rem] p-8 gap-8 relative z-10 border border-white/5 shadow-inner">
                    <div className="text-center border-r border-white/5">
                        <p className="text-[10px] font-black uppercase text-text-dim mb-2 tracking-widest">Net Assets</p>
                        <p className="text-3xl font-black text-white italic tracking-tighter">₹{user?.walletBalance}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] font-black uppercase text-text-dim mb-2 tracking-widest">Rank Class</p>
                        <p className="text-3xl font-black text-accent-gold italic tracking-tighter drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">Gold</p>
                    </div>
                </div>
            </div>

            {/* Dynamic Interaction Menu */}
            {menuSections.map((section, idx) => (
                <div key={idx} className="mb-10">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-text-dim ml-8 mb-6 italic">{section.title}</h4>
                    <div className="bg-bg-card rounded-[3.5rem] border border-white/5 shadow-2xl overflow-hidden">
                        {section.items.map((item, i) => (
                            <button
                                key={i}
                                onClick={item.action}
                                className={`w-full flex items-center justify-between p-8 hover:bg-white/5 transition-all group ${i !== section.items.length - 1 ? 'border-b border-white/5' : ''}`}
                            >
                                <div className="flex items-center gap-6">
                                    <div className="bg-white/5 w-14 h-14 rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-primary-neon/20 transition-all">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <span className="font-black text-white tracking-widest uppercase text-sm group-hover:text-primary-neon transition-colors">{item.name}</span>
                                        <p className="text-[9px] font-bold text-text-dim uppercase tracking-[0.2em] mt-1 opacity-50 group-hover:opacity-100 transition-opacity">Access_Port_0{i + 1}</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="text-text-dim group-hover:text-primary-neon transition-all group-hover:translate-x-1" />
                            </button>
                        ))}
                    </div>
                </div>
            ))}

            {/* Danger Zone */}
            <button
                onClick={logout}
                className="w-full bg-white/5 rounded-[2.5rem] py-8 text-red-500 font-black text-sm uppercase tracking-[0.3em] flex items-center justify-center gap-4 border border-red-500/10 hover:bg-red-500/10 active:scale-95 transition-all mb-12 shadow-xl"
            >
                <LogOut size={24} /> Terminate_Access
            </button>

            {/* Registry Modal */}
            {showBankModal && (
                <div className="fixed inset-0 bg-bg-deep/95 backdrop-blur-2xl z-[200] flex items-end sm:items-center justify-center p-4">
                    <div className="bg-bg-card w-full max-w-md rounded-t-[4rem] sm:rounded-[4rem] p-12 border border-white/10 shadow-2xl animate-in slide-in-from-bottom duration-700 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-secondary-neon/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[80px]"></div>

                        <div className="flex justify-between items-center mb-12 relative z-10">
                            <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase whitespace-nowrap">Bank Registry</h2>
                            <button onClick={() => setShowBankModal(false)} className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-full text-white border border-white/5">&times;</button>
                        </div>

                        <form onSubmit={handleBankUpdate} className="space-y-8 relative z-10">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black text-text-dim ml-6 tracking-[0.3em]">Signature Identifier</label>
                                <input
                                    placeholder="Full Legal Token"
                                    className="w-full bg-white/5 border border-white/10 rounded-[1.8rem] py-6 px-10 focus:border-primary-neon outline-none font-black text-white tracking-widest placeholder:text-white/10"
                                    value={bankData.holderName}
                                    onChange={(e) => setBankData({ ...bankData, holderName: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black text-text-dim ml-6 tracking-[0.3em]">Secure Account Chain</label>
                                <input
                                    placeholder="Digit String"
                                    className="w-full bg-white/5 border border-white/10 rounded-[1.8rem] py-6 px-10 focus:border-primary-neon outline-none font-black font-mono text-primary-neon tracking-widest placeholder:text-primary-neon/10"
                                    value={bankData.accountNumber}
                                    onChange={(e) => setBankData({ ...bankData, accountNumber: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black text-text-dim ml-6 tracking-[0.3em]">Network Routing Key</label>
                                <input
                                    placeholder="IFSC Hash"
                                    className="w-full bg-white/5 border border-white/10 rounded-[1.8rem] py-6 px-10 focus:border-primary-neon outline-none font-black font-mono text-secondary-neon uppercase tracking-widest placeholder:text-secondary-neon/10"
                                    value={bankData.ifsc}
                                    onChange={(e) => setBankData({ ...bankData, ifsc: e.target.value })}
                                    required
                                />
                            </div>
                            <button className="btn-vibrant w-full py-6 text-lg tracking-[0.4em] mt-8 shadow-neon">CONFIRM_LINK</button>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Profile;
