import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Phone, Lock, Sparkles, Fingerprint, Cpu, ShieldCheck } from 'lucide-react';

const Login = () => {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(mobile, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'SEQ-ERR: Access_Denied');
        }
    };

    return (
        <div className="min-h-screen bg-bg-deep flex flex-col items-center justify-center p-8 pb-32 overflow-hidden relative">
            {/* Background Matrix/Fiber elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-neon to-transparent animate-infinite-scroll"></div>
                <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-transparent via-secondary-neon to-transparent animate-infinite-scroll"></div>
            </div>

            <div className="fixed top-[-20%] right-[-20%] w-[80%] h-[80%] bg-primary-neon/5 rounded-full blur-[150px] pointer-events-none animate-pulse"></div>

            <div className="w-full max-w-sm relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex relative group">
                        <div className="absolute inset-0 bg-primary-neon blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <div className="bg-bg-card border-2 border-white/10 p-6 rounded-[2.5rem] text-white shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-700 animate-liquid">
                            <Fingerprint size={48} className="text-primary-neon" />
                        </div>
                    </div>
                    <h1 className="text-5xl font-black text-white tracking-tighter mt-12 italic uppercase underline decoration-primary-neon/30 decoration-8 underline-offset-8">Auth</h1>
                    <p className="text-[10px] font-black text-primary-neon tracking-[0.5em] mt-6 uppercase italic opacity-70">Quantum_Security_Layer</p>
                </div>

                <div className="bg-bg-card rounded-[4rem] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/5 relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[4rem]"></div>

                    <div className="relative z-10">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-5 rounded-[1.5rem] mb-10 text-center font-black text-[10px] tracking-widest uppercase animate-pulse">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-text-dim ml-6 tracking-[0.3em]">Unit_ID (Mobile)</label>
                                <div className="relative group/input">
                                    <Phone className="absolute left-8 top-1/2 -translate-y-1/2 text-text-dim group-focus-within/input:text-primary-neon transition-colors" size={20} />
                                    <input
                                        type="text"
                                        placeholder="ENTER_IDENTIFIER"
                                        className="w-full bg-white/5 border border-white/5 rounded-[1.8rem] py-6 pl-18 pr-8 focus:border-primary-neon outline-none text-lg font-black text-white transition-all shadow-inner placeholder:text-white/5"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-text-dim ml-6 tracking-[0.3em]">Access_Key (Pass)</label>
                                <div className="relative group/input">
                                    <Lock className="absolute left-8 top-1/2 -translate-y-1/2 text-text-dim group-focus-within/input:text-primary-neon transition-colors" size={20} />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full bg-white/5 border border-white/5 rounded-[1.8rem] py-6 pl-18 pr-8 focus:border-primary-neon outline-none text-lg font-black text-primary-neon transition-all placeholder:text-primary-neon/10"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn-vibrant w-full py-6 text-sm font-black uppercase tracking-[0.4em] mt-10 shadow-neon"
                            >
                                INIT_LOGIN <LogIn size={20} />
                            </button>
                        </form>

                        <div className="mt-12 text-center">
                            <p className="text-text-dim text-[10px] font-black uppercase tracking-[0.2em]">
                                New Unit? <Link to="/register" className="text-primary-neon hover:text-white transition-colors underline underline-offset-4 decoration-primary-neon/30 ml-2">Establish_Node</Link>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-center opacity-30">
                    <div className="w-[2px] h-16 bg-gradient-to-b from-primary-neon to-transparent rounded-full mb-6 relative">
                        <div className="absolute top-0 w-2 h-2 bg-primary-neon rounded-full -left-[3px] animate-ping"></div>
                    </div>
                    <div className="flex items-center gap-3">
                        <ShieldCheck size={16} />
                        <p className="text-[9px] font-black uppercase tracking-[0.5em]">Quantum_Encryption_Active</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
