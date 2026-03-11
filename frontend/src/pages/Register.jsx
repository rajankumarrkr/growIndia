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
        <div className="min-h-screen bg-bg-deep flex flex-col items-center justify-center p-6 py-20 relative overflow-hidden selection:bg-primary-indigo/10">
            {/* Soft Ambient Background - Ultra Blue Registration */}
            <div className="fixed top-[-10%] right-[-10%] w-[80%] h-[80%] bg-glow-blue rounded-full blur-[140px] pointer-events-none animate-pulse"></div>
            <div className="fixed bottom-[-10%] left-[-10%] w-[80%] h-[80%] bg-glow-azure rounded-full blur-[140px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="fixed top-[40%] left-[-10%] w-[50%] h-[50%] bg-glow-indigo rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '4s' }}></div>

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-12">
                    <div className="inline-flex relative group mb-10">
                        <div className="absolute inset-[-10%] bg-gradient-to-tr from-royal-blue via-primary-indigo to-deep-sapphire blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-1000"></div>
                        <div className="glass-card-blue !rounded-[3rem] p-8 relative z-10 transition-all duration-700 hover:scale-110 !bg-white border-blue-50 shadow-2xl group-hover:-rotate-6">
                            <div className="absolute inset-0 bg-gradient-to-br from-royal-blue/5 to-transparent rounded-[3rem]"></div>
                            <Cpu className="text-royal-blue relative z-10" size={56} />
                        </div>
                        <div className="absolute -top-2 -right-2 w-10 h-10 bg-primary-indigo rounded-2xl border-4 border-white shadow-lg flex items-center justify-center animate-bounce">
                            <Sparkles size={20} className="text-white" />
                        </div>
                    </div>
                    <h2 className="text-5xl font-black text-text-bright tracking-tight mb-3 uppercase">Join the <span className="premium-gradient-text">Registry</span></h2>
                    <p className="text-[11px] font-black text-royal-blue/40 tracking-[0.4em] uppercase">Initialize Unified Member Node</p>
                </div>

                <div className="glass-card-blue p-10 relative !bg-white border-blue-50 shadow-2xl !rounded-[2.5rem]">
                    {error && (
                        <div className="bg-danger-rose/5 border border-danger-rose/10 text-danger-rose p-4 rounded-xl mb-8 text-center font-bold text-xs tracking-wide">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase text-text-muted ml-4 tracking-widest">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-royal-blue/40 group-focus-within:text-royal-blue transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    className="w-full bg-blue-50/30 border border-blue-50/50 rounded-2xl py-4 pl-14 pr-6 focus:border-royal-blue/30 outline-none text-base font-black text-text-bright transition-all placeholder:text-royal-blue/20"
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase text-text-muted ml-4 tracking-widest">Mobile ID</label>
                            <div className="relative">
                                <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-royal-blue/40 group-focus-within:text-royal-blue transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="10-digit mobile ID"
                                    className="w-full bg-blue-50/30 border border-blue-50/50 rounded-2xl py-4 pl-14 pr-6 focus:border-royal-blue/30 outline-none text-base font-black text-text-bright transition-all placeholder:text-royal-blue/20"
                                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase text-text-muted ml-4 tracking-widest">Password</label>
                                <input
                                    type="password"
                                    placeholder="••••"
                                    className="w-full bg-blue-50/30 border border-blue-50/50 rounded-2xl py-4 px-6 focus:border-royal-blue/30 outline-none text-base font-black text-royal-blue transition-all placeholder:text-royal-blue/10"
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase text-text-muted ml-4 tracking-widest">Confirm</label>
                                <input
                                    type="password"
                                    placeholder="••••"
                                    className="w-full bg-blue-50/30 border border-blue-50/50 rounded-2xl py-4 px-6 focus:border-royal-blue/30 outline-none text-base font-black text-royal-blue transition-all placeholder:text-royal-blue/10"
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase text-text-muted ml-4 tracking-widest">Referral Code (Optional)</label>
                            <div className="relative">
                                <Hash className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                                <input
                                    type="text"
                                    placeholder="Optional referral hash"
                                    className="w-full bg-blue-50/30 border border-blue-50/50 rounded-2xl py-4 pl-14 pr-6 focus:border-royal-blue/30 outline-none text-base font-mono font-black text-royal-blue uppercase tracking-widest transition-all placeholder:text-royal-blue/10"
                                    onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn-primary w-full py-6 text-base font-black uppercase tracking-[0.3em] mt-8 shadow-2xl !bg-gradient-to-r from-royal-blue via-primary-indigo to-deep-sapphire bg-[length:200%_auto] hover:bg-right transition-all duration-[1s] hover:scale-[1.02] border-none"
                        >
                            AUTHORIZE HUB CREATION <Sparkles size={20} className="ml-2" />
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-text-muted text-xs font-medium">
                            Already a member? <Link to="/login" className="text-royal-blue hover:text-deep-sapphire transition-colors font-black ml-1 uppercase underline decoration-2 underline-offset-4">Log In</Link>
                        </p>
                    </div>
                </div>

                <p className="mt-8 text-[9px] text-text-muted text-center font-medium uppercase tracking-widest opacity-40 leading-relaxed">
                    By joining, you agree to the <br /> Grow India Network Protocols & Terms
                </p>
            </div>
        </div>
    );
};

export default Register;
