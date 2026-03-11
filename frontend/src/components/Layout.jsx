import React from 'react';
import Navbar from './Navbar';
import { Bell } from 'lucide-react';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-bg-deep text-text-base pb-32 relative overflow-hidden selection:bg-royal-blue/10">
            {/* Premium Atmospheric Background - Blue Focus */}
            <div className="fixed top-[-10%] right-[-10%] w-[80%] h-[80%] bg-glow-blue rounded-full blur-[140px] pointer-events-none animate-pulse"></div>
            <div className="fixed bottom-[-10%] left-[-10%] w-[80%] h-[80%] bg-glow-azure rounded-full blur-[140px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="fixed top-[40%] left-[20%] w-[50%] h-[50%] bg-glow-azure rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '4s' }}></div>
            <div className="fixed bottom-[20%] right-[10%] w-[40%] h-[40%] bg-glow-blue rounded-full blur-[100px] pointer-events-none animate-pulse opacity-30" style={{ animationDelay: '1s' }}></div>

            <header className="max-w-4xl mx-auto pt-8 px-6 flex justify-between items-center mb-8 relative z-20">
                <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 relative">
                        <div className="absolute inset-0 bg-royal-blue rounded-2xl blur-lg opacity-10 group-hover:opacity-25 transition-opacity"></div>
                        <div className="relative w-full h-full bg-white border border-black/5 rounded-2xl flex items-center justify-center shadow-premium group-hover:border-royal-blue/20 transition-all">
                            <span className="font-extrabold text-2xl premium-gradient-text">G</span>
                        </div>
                    </div>
                    <div>
                        <h1 className="font-extrabold text-xl tracking-tight leading-none text-text-bright">Grow India</h1>
                        <p className="text-[10px] font-bold text-royal-blue tracking-[0.2em] mt-1.5 uppercase opacity-70">Premium Network</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="w-12 h-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center shadow-premium hover:border-royal-blue/20 transition-all active:scale-95 text-text-muted hover:text-royal-blue">
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
