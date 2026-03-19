import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Phone, ArrowRight, ShieldCheck, Zap, Activity } from 'lucide-react';

const AdminLogin = () => {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setError('');
        setIsSubmitting(true);

        try {
            const res = await login(mobile, password);
            if (res.user.role !== 'admin') {
                setError('Access Denied: Administrative Clearance Required');
                setIsSubmitting(false);
                return;
            }
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Access Denied: Invalid Credentials');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden font-jakarta">
            {/* Command Center Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-royal-blue/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
            </div>

            <div className="w-full max-w-[420px] relative z-10">
                {/* Security Badge */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-royal-blue to-blue-700 rounded-[28px] flex items-center justify-center shadow-2xl shadow-blue-500/40 border border-white/10 relative group">
                        <Shield size={38} className="text-white relative z-10" />
                        <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="mt-6 text-center">
                        <h1 className="text-3xl font-black text-white tracking-tight">Admin Terminal</h1>
                        <div className="flex items-center gap-2 mt-2 justify-center">
                            <Activity size={12} className="text-emerald-500 animate-pulse" />
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Governance Protocol 4.0</p>
                        </div>
                    </div>
                </div>

                {/* Glassmorphism Card */}
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl relative overflow-hidden">
                    {/* Interior glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-royal-blue/10 rounded-full blur-3xl -mr-16 -mt-16" />

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-2xl mb-6 flex items-center gap-3 animate-shake">
                            <Zap size={16} className="shrink-0" />
                            <p className="text-[10px] font-black uppercase tracking-wider">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Admin Identifier</label>
                            <div className="relative group">
                                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-royal-blue transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Access Code / ID"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    required
                                    className="w-full h-14 bg-slate-900/50 border border-white/5 rounded-2xl pl-12 pr-4 text-white font-bold outline-none focus:border-royal-blue/50 focus:bg-slate-900/80 transition-all placeholder:text-slate-700"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Security Key</label>
                            <div className="relative group">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-royal-blue transition-colors" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full h-14 bg-slate-900/50 border border-white/5 rounded-2xl pl-12 pr-4 text-white font-bold outline-none focus:border-royal-blue/50 focus:bg-slate-900/80 transition-all placeholder:text-slate-700"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-15 bg-royal-blue text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-blue-600 active:scale-[0.98] transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {isSubmitting ? (
                                <Activity size={20} className="animate-spin" />
                            ) : (
                                <>
                                    Establish Link <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer Status */}
                <div className="mt-8 flex items-center justify-center gap-6 text-slate-600">
                    <div className="flex items-center gap-2">
                        <ShieldCheck size={14} className="text-emerald-500/50" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Encrypted Port</span>
                    </div>
                    <div className="w-px h-3 bg-slate-800" />
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50 animate-pulse" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Network Live</span>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-4px); }
                    75% { transform: translateX(4px); }
                }
                .animate-shake {
                    animation: shake 0.2s cubic-bezier(.36,.07,.19,.97) both;
                }
            `}</style>
        </div>
    );
};

export default AdminLogin;
