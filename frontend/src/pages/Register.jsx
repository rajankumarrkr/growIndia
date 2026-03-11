import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Phone, Lock, User, Hash, Sparkles, ShieldCheck, Cpu } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', mobile: '', password: '', confirmPassword: '', referralCode: '' });
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) return setError('Passwords do not match');
        try {
            await register(formData);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 py-20 relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-royal-blue/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-royal-blue/5 rounded-full blur-[100px]" />

            <div className="w-full max-w-sm relative z-10">
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-white border border-slate-100 rounded-[2rem] flex items-center justify-center text-royal-blue shadow-sm mx-auto mb-8">
                        <Cpu size={40} />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Create Node</h1>
                    <p className="text-[10px] font-black text-slate-400 tracking-[0.4em] uppercase mt-2">Unified Member Directory</p>
                </div>

                <div className="fintech-card !p-8">
                    {error && (
                        <div className="bg-red-50 border border-red-100 text-red-500 p-4 rounded-xl mb-6 text-center text-[10px] font-black uppercase tracking-widest animate-pulse">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase text-slate-400 ml-4 tracking-[0.2em]">Identity Name</label>
                            <div className="relative">
                                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                <input
                                    type="text"
                                    placeholder="Full name"
                                    className="w-full h-15 bg-slate-50 border border-slate-100 rounded-2xl pl-14 pr-6 text-sm font-black text-slate-900 focus:bg-white focus:border-royal-blue/30 transition-all outline-none"
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase text-slate-400 ml-4 tracking-[0.2em]">Mobile ID</label>
                            <div className="relative">
                                <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                <input
                                    type="text"
                                    placeholder="10-digit mobile"
                                    className="w-full h-15 bg-slate-50 border border-slate-100 rounded-2xl pl-14 pr-6 text-sm font-black text-slate-900 focus:bg-white focus:border-royal-blue/30 transition-all outline-none"
                                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase text-slate-400 ml-4 tracking-[0.2em]">Key</label>
                                <input
                                    type="password"
                                    placeholder="••••"
                                    className="w-full h-15 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-sm font-black text-royal-blue focus:bg-white focus:border-royal-blue/30 transition-all outline-none"
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase text-slate-400 ml-4 tracking-[0.2em]">Confirm</label>
                                <input
                                    type="password"
                                    placeholder="••••"
                                    className="w-full h-15 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-sm font-black text-royal-blue focus:bg-white focus:border-royal-blue/30 transition-all outline-none"
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase text-slate-400 ml-4 tracking-[0.2em]">Referral Hash (Optional)</label>
                            <div className="relative">
                                <Hash className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                <input
                                    type="text"
                                    placeholder="Optional code"
                                    className="w-full h-15 bg-slate-50 border border-slate-100 rounded-2xl pl-14 pr-6 text-sm font-black text-royal-blue font-mono tracking-widest focus:bg-white focus:border-royal-blue/30 transition-all outline-none"
                                    onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn-fintech btn-fintech-primary w-full py-5 text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 mt-4"
                        >
                            Establish Node <Sparkles size={16} />
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                            Already a Member? <Link to="/login" className="text-royal-blue font-black border-b border-royal-blue/20 pb-0.5 ml-1">Authorize Entry</Link>
                        </p>
                    </div>
                </div>

                <p className="mt-8 text-[9px] text-slate-300 text-center font-black uppercase tracking-widest leading-relaxed">
                    By initializing, you agree to the <br />
                    <span className="text-slate-400">Network Protocols & Terms</span>
                </p>
            </div>
        </div>
    );
};

export default Register;
