import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Phone, Lock, User, Hash, Sparkles, ShieldCheck, Globe, Zap, Cpu } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', mobile: '', password: '', confirmPassword: '', referralCode: '' });
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) return setError('SIG-ERR: Mismatch');
        try {
            await register(formData);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'NODE-ERR: Reject');
        }
    };

    return (
        <div className="min-h-screen bg-bg-deep flex flex-col items-center justify-center p-8 py-20 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)]"></div>
            <div className="absolute top-0 left-[-10%] w-[60%] h-[60%] bg-secondary-neon/5 rounded-full blur-[120px]"></div>

            <div className="w-full max-w-sm relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex p-1 bg-gradient-to-tr from-primary-neon to-secondary-neon rounded-[2.5rem] shadow-neon">
                        <div className="bg-bg-card p-6 rounded-[2.4rem] text-white flex items-center justify-center border border-white/5">
                            <Cpu className="animate-spin-slow text-primary-neon" size={48} />
                        </div>
                    </div>
                    <h2 className="text-5xl font-black text-white tracking-tighter italic uppercase mt-12 underline decoration-secondary-neon/30 decoration-8 underline-offset-8">Nexus</h2>
                    <p className="text-[10px] font-black text-secondary-neon tracking-[0.5em] mt-6 uppercase italic opacity-70">Initialize_Network_Link</p>
                </div>

                <div className="bg-bg-card rounded-[4rem] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/5">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-5 rounded-[1.5rem] mb-10 text-center font-black text-[10px] tracking-widest uppercase">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-text-dim ml-6 tracking-[0.3em]">Entity_Name</label>
                            <div className="relative group/input">
                                <User className="absolute left-8 top-1/2 -translate-y-1/2 text-text-dim group-focus-within/input:text-primary-neon transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="LEGAL_ALIAS"
                                    className="w-full bg-white/5 border border-white/5 rounded-[1.8rem] py-5 pl-18 pr-8 focus:border-primary-neon outline-none font-black text-white transition-all placeholder:text-white/5"
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-text-dim ml-6 tracking-[0.3em]">U-Mobile_ID</label>
                            <div className="relative group/input">
                                <Phone className="absolute left-8 top-1/2 -translate-y-1/2 text-text-dim group-focus-within/input:text-primary-neon transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="10_DIGIT_DATA"
                                    className="w-full bg-white/5 border border-white/5 rounded-[1.8rem] py-5 pl-18 pr-8 focus:border-primary-neon outline-none font-black text-white transition-all placeholder:text-white/5"
                                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-text-dim ml-6 tracking-[0.2em]">Alpha_Key</label>
                                <div className="relative group/input">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-text-dim group-focus-within/input:text-primary-neon transition-colors" size={16} />
                                    <input
                                        type="password"
                                        placeholder="••••"
                                        className="w-full bg-white/5 border border-white/5 rounded-[1.5rem] py-5 pl-14 pr-4 focus:border-primary-neon outline-none font-black text-primary-neon transition-all"
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-text-dim ml-6 tracking-[0.2em]">Verify_Key</label>
                                <div className="relative group/input">
                                    <ShieldCheck className="absolute left-6 top-1/2 -translate-y-1/2 text-text-dim group-focus-within/input:text-primary-neon transition-colors" size={16} />
                                    <input
                                        type="password"
                                        placeholder="••••"
                                        className="w-full bg-white/5 border border-white/5 rounded-[1.5rem] py-5 pl-14 pr-4 focus:border-primary-neon outline-none font-black text-primary-neon transition-all"
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-text-dim ml-6 tracking-[0.3em]">Referral_Handshake</label>
                            <div className="relative group/input">
                                <Hash className="absolute left-8 top-1/2 -translate-y-1/2 text-secondary-neon group-focus-within/input:text-white transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="OPTIONAL_HASH"
                                    className="w-full bg-secondary-neon/10 border border-secondary-neon/20 rounded-[1.8rem] py-5 pl-18 pr-8 focus:border-secondary-neon outline-none font-black text-secondary-neon placeholder:text-secondary-neon/20 tracking-[0.3em] uppercase transition-all"
                                    onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn-vibrant w-full py-6 text-sm font-black uppercase tracking-[0.4em] mt-10 shadow-neon bg-secondary-neon"
                            style={{ boxShadow: '0 0 30px rgba(168,85,247,0.3)' }}
                        >
                            INIT_LINK <Sparkles size={20} />
                        </button>
                    </form>

                    <div className="mt-12 text-center">
                        <p className="text-text-dim text-[10px] font-black uppercase tracking-[0.2em]">
                            Already Sequenced? <Link to="/login" className="text-secondary-neon underline underline-offset-4 decoration-secondary-neon/30 ml-2">Authenticate</Link>
                        </p>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-[8px] text-text-dim font-black uppercase tracking-[0.3em] leading-relaxed opacity-40">
                        By engaging you accept the <br /> Grow India Decentralized Liquid Protocol
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
