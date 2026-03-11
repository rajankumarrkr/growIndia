import React from 'react';
import Navbar from './Navbar';
import { Bell } from 'lucide-react';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-bg-deep text-text-base pb-32 relative overflow-hidden selection:bg-primary-indigo/10">
            {/* Ambient Background Elements - Optimized for Light Mode */}
            <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary-indigo/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-secondary-violet/5 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>

            <header className="max-w-4xl mx-auto pt-8 px-6 flex justify-between items-center mb-8 relative z-20">
                <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 relative">
                        <div className="absolute inset-0 bg-primary-indigo rounded-2xl blur-lg opacity-10 group-hover:opacity-25 transition-opacity"></div>
                        <div className="relative w-full h-full bg-white border border-black/5 rounded-2xl flex items-center justify-center shadow-premium group-hover:border-primary-indigo/20 transition-all">
                            <span className="font-extrabold text-2xl premium-gradient-text">G</span>
                        </div>
                    </div>
                    <div>
                        <h1 className="font-extrabold text-xl tracking-tight leading-none text-text-bright">Grow India</h1>
                        <p className="text-[10px] font-bold text-primary-indigo tracking-[0.2em] mt-1.5 uppercase opacity-70">Premium Network</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="w-12 h-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center shadow-premium hover:border-primary-indigo/20 transition-all active:scale-95 text-text-muted hover:text-primary-indigo">
                        <Bell size={20} />
                    </button>
                    <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border border-black/5 rounded-xl shadow-premium">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-xs font-bold text-text-muted">Live System</span>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 relative z-10">
                {children}
            </main>

            <Navbar />
        </div>
    );
};

export default Layout;
