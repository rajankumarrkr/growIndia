import React, { useContext, useState } from 'react';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';
import { User, Shield, CreditCard, History, Headphones, LogOut, ChevronRight, Settings, Banknote, ShieldCheck, Mail, MapPin, Activity, Wallet, Smartphone, Landmark, X, Zap, Download } from 'lucide-react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import usePWAInstall from '../hooks/usePWAInstall';

const Profile = () => {
    const { user, logout, setUser } = useContext(AuthContext);
    const { isInstalled, handleInstall } = usePWAInstall();
    const [showBankModal, setShowBankModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [bankData, setBankData] = useState({
        holderName: user?.bankDetails?.holderName || '',
        accountNumber: user?.bankDetails?.accountNumber || '',
        ifsc: user?.bankDetails?.ifsc || ''
    });
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');

    const handleBankUpdate = async (e) => {
        e.preventDefault();
        try {
            await api.post('/user/bank-details', bankData);
            setShowBankModal(false);
            const res = await api.get('/user/profile');
            setUser(res.data);
        } catch (err) { }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess('');
        
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordError('New passwords do not match');
            return;
        }

        try {
            const res = await api.post('/user/change-password', {
                oldPassword: passwordData.oldPassword,
                newPassword: passwordData.newPassword
            });
            setPasswordSuccess(res.data.message);
            setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
            setTimeout(() => {
                setShowPasswordModal(false);
                setPasswordSuccess('');
            }, 2000);
        } catch (err) {
            setPasswordError(err.response?.data?.message || 'Failed to update password');
        }
    };

    const menuSections = [
        {
            title: 'Financial Modules',
            items: [
                { name: 'Active Plan', icon: <Activity className="text-royal-blue" />, path: '/investments' },
                { name: 'Wallet Hub', icon: <Wallet className="text-slate-600" />, path: '/wallet' },
                { name: 'History', icon: <History className="text-slate-400" />, path: '/history' },
                { name: 'Bank Registry', icon: <Landmark className="text-royal-blue" />, action: () => setShowBankModal(true) },
                { name: 'Security Protocol', icon: <Shield className="text-emerald-500" />, action: () => setShowPasswordModal(true) },
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
            <div className="mb-8">
                {/* Header Identity Core */}
                <div className="px-4 flex items-center justify-between mb-8">
                    <div className="flex items-center gap-5 group">
                        <div className="w-16 h-16 bg-gradient-to-tr from-royal-blue to-electric-azure border-2 border-blue-200 rounded-3xl flex items-center justify-center text-white relative shadow-glow transition-all group-hover:scale-105">
                            <User size={30} className="text-white shadow-sm" />
                            <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-white rounded-xl border-4 border-slate-50 shadow-sm flex items-center justify-center text-royal-blue">
                                <ShieldCheck size={12} />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 tracking-tight">{user?.name}</h1>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mt-1">
                                <Smartphone size={10} /> {user?.mobile}
                            </p>
                        </div>
                    </div>
                    <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                        <Settings size={18} />
                    </div>
                </div>

                {/* Liquid Balance Card */}
                <div className="mx-4 fintech-card bg-gradient-to-br from-royal-blue to-primary-indigo !p-8 relative overflow-hidden group border-none !rounded-[2.5rem] shadow-primary">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full blur-[3rem] -translate-y-1/2 translate-x-1/2 transition-all duration-700 group-hover:bg-white/30 group-hover:scale-110" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-300/20 rounded-full blur-[2.5rem] translate-y-1/2 -translate-x-1/2" />
                    
                    <div className="relative z-10 flex flex-col gap-8">
                        <div className="px-2">
                            <p className="text-[9px] font-bold text-white/70 uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                                <Activity size={12} className="text-white/80" />
                                Liquid Balance
                            </p>
                            <h2 className="text-4xl font-black text-white tracking-tight">₹{user?.walletBalance?.toLocaleString()}</h2>
                        </div>
                        <div className="flex items-center gap-3 px-2">
                            <div className="px-3 py-1.5 bg-white/10 rounded-lg border border-white/20 backdrop-blur-md">
                                <span className="text-[9px] font-bold text-white/90 uppercase tracking-widest">Protocol 4.2.1 Stable</span>
                            </div>
                            <div className="px-3 py-1.5 bg-black/10 rounded-lg border border-black/20 backdrop-blur-md flex items-center gap-1.5">
                                <Shield size={10} className="text-white/90" />
                                <span className="text-[9px] font-bold text-white/90 uppercase tracking-widest">Secured Node</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Sections */}
            <div className="px-4 space-y-8 pb-8">
                {menuSections.map((section, idx) => (
                    <div key={idx} className="overflow-hidden">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4 mb-4 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-royal-blue"></div>
                            {section.title}
                        </h4>
                        <div className="fintech-card !p-0 overflow-hidden divide-y divide-slate-50 border-slate-100 shadow-sm bg-white/80 backdrop-blur-xl">
                            {section.items.map((item, i) => {
                                const Content = () => (
                                    <div className="flex items-center justify-between p-5 px-6 group transition-colors hover:bg-slate-50/50">
                                        <div className="flex items-center gap-5">
                                            <div className="w-11 h-11 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 group-hover:text-royal-blue transition-all group-hover:scale-110">
                                                {item.icon}
                                            </div>
                                            <span className="text-[13px] font-black text-slate-700 tracking-wide">{item.name}</span>
                                        </div>
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                                            <ChevronRight size={16} className="text-slate-300 group-hover:text-royal-blue group-hover:translate-x-0.5 transition-all" />
                                        </div>
                                    </div>
                                );

                                return item.action ? (
                                    <button key={i} onClick={item.action} className="w-full text-left outline-none focus:bg-slate-50">
                                        <Content />
                                    </button>
                                ) : item.external ? (
                                    <a key={i} href={item.path} target="_blank" rel="noopener noreferrer" className="block outline-none focus:bg-slate-50">
                                        <Content />
                                    </a>
                                ) : (
                                    <Link key={i} to={item.path} className="block outline-none focus:bg-slate-50">
                                        <Content />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="px-4 mt-8 mb-24">
                <button
                    onClick={logout}
                    className="w-full fintech-card !p-5 flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-red-500 bg-red-50/50 border-red-100/50 hover:bg-red-50 hover:border-red-200 transition-all active:scale-[0.98]"
                >
                    <LogOut size={16} /> Logout
                </button>
            </div>

            {!isInstalled && (
                <div className="px-4 mb-24">
                    <button
                        onClick={handleInstall}
                        className="w-full fintech-card !p-5 flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-royal-blue bg-blue-50/50 border-blue-100/50 hover:bg-blue-50 hover:border-blue-200 transition-all active:scale-[0.98]"
                    >
                        <Download size={16} /> Install Grow India App
                    </button>
                </div>
            )}

            {/* Bank Repository Modal */}
            <div className={`fixed inset-0 z-[200] flex items-end justify-center transition-all duration-500 ${showBankModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                {/* Backdrop overlay */}
                <div 
                    className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-500 ${showBankModal ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setShowBankModal(false)}
                />
                
                {/* Modal Content */}
                <div className={`relative w-full max-w-xl bg-white rounded-t-[2.5rem] p-8 pb-12 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${showBankModal ? 'translate-y-0' : 'translate-y-full'}`}>
                    <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8" />

                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-royal-blue mb-4">
                                <Landmark size={24} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Bank Registry</h2>
                            <p className="text-label mt-2">Withdrawal configuration</p>
                        </div>
                        <button onClick={() => setShowBankModal(false)} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleBankUpdate} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Holder Name</label>
                            <input
                                placeholder="Enter full name"
                                className="w-full h-14 bg-slate-50/50 border border-slate-200/60 rounded-2xl px-5 text-sm font-black text-slate-900 focus:bg-white focus:border-royal-blue/50 focus:ring-4 focus:ring-royal-blue/10 transition-all outline-none"
                                value={bankData.holderName}
                                onChange={(e) => setBankData({ ...bankData, holderName: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Account Number</label>
                            <input
                                placeholder="Numerical chain"
                                className="w-full h-14 bg-slate-50/50 border border-slate-200/60 rounded-2xl px-5 text-sm font-black text-royal-blue font-mono tracking-widest focus:bg-white focus:border-royal-blue/50 focus:ring-4 focus:ring-royal-blue/10 transition-all outline-none"
                                value={bankData.accountNumber}
                                onChange={(e) => setBankData({ ...bankData, accountNumber: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">IFSC Routing</label>
                            <input
                                placeholder="Network code"
                                className="w-full h-14 bg-slate-50/50 border border-slate-200/60 rounded-2xl px-5 text-sm font-black text-royal-blue font-mono tracking-widest uppercase focus:bg-white focus:border-royal-blue/50 focus:ring-4 focus:ring-royal-blue/10 transition-all outline-none"
                                value={bankData.ifsc}
                                onChange={(e) => setBankData({ ...bankData, ifsc: e.target.value })}
                                required
                            />
                        </div>

                        <button className="btn-fintech btn-fintech-primary w-full mt-8 uppercase tracking-[0.2em] text-[11px] font-black h-14 rounded-2xl">
                            Update Withdrawal Info
                        </button>
                    </form>
                </div>
            </div>

            {/* Security Protocol Modal */}
            <div className={`fixed inset-0 z-[200] flex items-end justify-center transition-all duration-500 ${showPasswordModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                {/* Backdrop overlay */}
                <div 
                    className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-500 ${showPasswordModal ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setShowPasswordModal(false)}
                />
                
                {/* Modal Content */}
                <div className={`relative w-full max-w-xl bg-white rounded-t-[2.5rem] p-8 pb-12 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${showPasswordModal ? 'translate-y-0' : 'translate-y-full'}`}>
                    <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8" />

                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 mb-4">
                                <Shield size={24} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Security Protocol</h2>
                            <p className="text-label mt-2">Update authentication credentials</p>
                        </div>
                        <button onClick={() => setShowPasswordModal(false)} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handlePasswordChange} className="space-y-5">
                        {passwordError && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-500 text-[10px] font-black uppercase tracking-widest text-center">
                                {passwordError}
                            </div>
                        )}
                        {passwordSuccess && (
                            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-500 text-[10px] font-black uppercase tracking-widest text-center">
                                {passwordSuccess}
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Current Password</label>
                            <input
                                type="password"
                                placeholder="Verify old credentials"
                                className="w-full h-14 bg-slate-50/50 border border-slate-200/60 rounded-2xl px-5 text-sm font-black text-slate-900 focus:bg-white focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none"
                                value={passwordData.oldPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                            <input
                                type="password"
                                placeholder="Minimum 6 characters"
                                className="w-full h-14 bg-slate-50/50 border border-slate-200/60 rounded-2xl px-5 text-sm font-black text-slate-900 focus:bg-white focus:border-royal-blue/50 focus:ring-4 focus:ring-royal-blue/10 transition-all outline-none"
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                            <input
                                type="password"
                                placeholder="Repeat for precision"
                                className="w-full h-14 bg-slate-50/50 border border-slate-200/60 rounded-2xl px-5 text-sm font-black text-slate-900 focus:bg-white focus:border-royal-blue/50 focus:ring-4 focus:ring-royal-blue/10 transition-all outline-none"
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                required
                            />
                        </div>

                        <button className="btn-fintech bg-emerald-500 hover:bg-emerald-600 text-white w-full mt-8 uppercase tracking-[0.2em] text-[11px] font-black h-14 rounded-2xl shadow-lg shadow-emerald-200">
                            Update Credentials
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
