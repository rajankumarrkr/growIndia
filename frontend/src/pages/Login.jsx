import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Phone, Lock, Fingerprint, ShieldCheck } from 'lucide-react';

const Login = () => {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(mobile, password);
            navigate(res.user.role === 'admin' ? '/admin' : '/');
        } catch (err) {
            setError(err.response?.data?.message || 'Access Denied: Invalid Credentials');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-royal-blue/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-royal-blue/5 rounded-full blur-[100px]" />

            <div className="w-full max-w-sm relative z-10">
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-white border border-slate-100 rounded-[2rem] flex items-center justify-center text-royal-blue shadow-sm mx-auto mb-8">
                        <Fingerprint size={40} />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Welcome Back</h1>
                    <p className="text-[10px] font-black text-slate-400 tracking-[0.4em] uppercase mt-2">Secure Identity Protocol</p>
                </div>

                <div className="fintech-card !p-8">
                    {error && (
                        <div className="bg-red-50 border border-red-100 text-red-500 p-4 rounded-xl mb-6 text-center text-[10px] font-black uppercase tracking-widest animate-pulse">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase text-slate-400 ml-4 tracking-[0.2em]">Mobile Connection</label>
                            <div className="relative">
                                <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                <input
                                    type="text"
                                    placeholder="Enter mobile"
                                    className="w-full h-15 bg-slate-50 border border-slate-100 rounded-2xl pl-14 pr-6 text-sm font-black text-slate-900 focus:bg-white focus:border-royal-blue/30 transition-all outline-none"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase text-slate-400 ml-4 tracking-[0.2em]">Security Key</label>
                            <div className="relative">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    className="w-full h-15 bg-slate-50 border border-slate-100 rounded-2xl pl-14 pr-6 text-sm font-black text-slate-900 focus:bg-white focus:border-royal-blue/30 transition-all outline-none"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn-fintech btn-fintech-primary w-full py-5 text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 mt-4"
                        >
                            Authorize Entry <LogIn size={16} />
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                            New Invocator? <Link to="/register" className="text-royal-blue font-black border-b border-royal-blue/20 pb-0.5 ml-1">Establish Node</Link>
                        </p>
                    </div>
                </div>

                <div className="mt-10 flex items-center justify-center gap-3 opacity-20">
                    <ShieldCheck size={14} />
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-900">End-to-End Encryption</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
