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
            {/* Atmospheric Background - subtle for light mode */}
            <div className="fixed top-[-10%] left-[-10%] w-[70%] h-[70%] bg-secondary-violet/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-primary-indigo/5 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-12">
                    <div className="inline-flex relative group mb-8">
                        <div className="absolute inset-0 bg-secondary-violet blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                        <div className="glass-card !rounded-[2.5rem] p-6 relative z-10 transition-transform duration-700 hover:scale-110 !bg-white border-black/5 shadow-premium">
                            <Cpu className="text-secondary-violet" size={48} />
                        </div>
                    </div>
                    <h2 className="text-4xl font-extrabold text-text-bright tracking-tight mb-2">Join the Network</h2>
                    <p className="text-sm font-medium text-text-base tracking-wide uppercase opacity-70">Initialize Your Account</p>
                </div>

                <div className="glass-card p-10 relative !bg-white border-black/5 shadow-premium">
                    {error && (
                        <div className="bg-danger-rose/5 border border-danger-rose/10 text-danger-rose p-4 rounded-xl mb-8 text-center font-bold text-xs tracking-wide">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase text-text-muted ml-4 tracking-widest">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary-indigo transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full bg-black/5 border border-black/5 rounded-2xl py-4 pl-14 pr-6 focus:border-primary-indigo/30 outline-none text-base font-semibold text-text-bright transition-all placeholder:text-text-muted/20"
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase text-text-muted ml-4 tracking-widest">Mobile ID</label>
                            <div className="relative">
                                <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary-indigo transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="10-digit number"
                                    className="w-full bg-black/5 border border-black/5 rounded-2xl py-4 pl-14 pr-6 focus:border-primary-indigo/30 outline-none text-base font-semibold text-text-bright transition-all placeholder:text-text-muted/20"
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
                                    className="w-full bg-black/5 border border-black/5 rounded-2xl py-4 px-6 focus:border-primary-indigo/30 outline-none text-base font-semibold text-primary-indigo transition-all placeholder:text-text-muted/10"
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase text-text-muted ml-4 tracking-widest">Confirm</label>
                                <input
                                    type="password"
                                    placeholder="••••"
                                    className="w-full bg-black/5 border border-black/5 rounded-2xl py-4 px-6 focus:border-primary-indigo/30 outline-none text-base font-semibold text-primary-indigo transition-all placeholder:text-text-muted/10"
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
                                    placeholder="Enter referral hash"
                                    className="w-full bg-black/5 border border-black/5 rounded-2xl py-4 pl-14 pr-6 focus:border-secondary-violet/30 outline-none text-base font-mono font-bold text-secondary-violet uppercase tracking-widest transition-all placeholder:text-secondary-violet/20"
                                    onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn-primary !bg-secondary-violet w-full py-5 text-sm font-extrabold uppercase tracking-widest mt-6 shadow-indigo !shadow-secondary-violet/20 hover:brightness-110"
                        >
                            Create Node <Sparkles size={18} />
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-text-muted text-xs font-medium">
                            Already a member? <Link to="/login" className="text-secondary-violet hover:text-secondary-violet-light transition-colors font-bold ml-1">Log In</Link>
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
