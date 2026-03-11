import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Phone, Lock, Sparkles, Fingerprint, ShieldCheck } from 'lucide-react';

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
            setError(err.response?.data?.message || 'Access Denied: Invalid Credentials');
        }
    };

    return (
        <div className="min-h-screen bg-bg-deep flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-primary-indigo/10">
            {/* Soft Ambient Background - subtle for light mode */}
            <div className="fixed top-[-10%] right-[-10%] w-[70%] h-[70%] bg-primary-indigo/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
            <div className="fixed bottom-[-10%] left-[-10%] w-[70%] h-[70%] bg-secondary-violet/5 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-12">
                    <div className="inline-flex relative group mb-8">
                        <div className="absolute inset-0 bg-primary-indigo blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                        <div className="glass-card !rounded-[2.5rem] p-6 relative z-10 transition-transform duration-700 hover:scale-110 !bg-white border-black/5 shadow-premium">
                            <Fingerprint size={48} className="text-primary-indigo" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-extrabold text-text-bright tracking-tight mb-2">Welcome Back</h1>
                    <p className="text-sm font-medium text-text-base tracking-wide uppercase opacity-70">Secure Portal Access</p>
                </div>

                <div className="glass-card p-10 relative group !bg-white border-black/5 shadow-premium">
                    <div className="relative z-10">
                        {error && (
                            <div className="bg-danger-rose/5 border border-danger-rose/10 text-danger-rose p-4 rounded-xl mb-8 text-center font-bold text-xs tracking-wide">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase text-text-muted ml-4 tracking-widest">Mobile Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary-indigo transition-colors" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Enter registered mobile"
                                        className="w-full bg-black/5 border border-black/5 rounded-2xl py-5 pl-14 pr-6 focus:border-primary-indigo/30 outline-none text-base font-semibold text-text-bright transition-all placeholder:text-text-muted/20"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase text-text-muted ml-4 tracking-widest">Security Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary-indigo transition-colors" size={18} />
                                    <input
                                        type="password"
                                        placeholder="Enter your password"
                                        className="w-full bg-black/5 border border-black/5 rounded-2xl py-5 pl-14 pr-6 focus:border-primary-indigo/30 outline-none text-base font-semibold text-text-bright transition-all placeholder:text-text-muted/20"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn-primary w-full py-5 text-sm font-extrabold uppercase tracking-widest mt-4 shadow-indigo"
                            >
                                Sign In <LogIn size={18} />
                            </button>
                        </form>

                        <div className="mt-10 text-center">
                            <p className="text-text-muted text-xs font-medium">
                                No account yet? <Link to="/register" className="text-primary-indigo hover:text-primary-indigo-light transition-colors font-bold ml-1">Create Account</Link>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex items-center justify-center gap-3 opacity-30">
                    <ShieldCheck size={16} />
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">End-to-End Encryption Enabled</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
