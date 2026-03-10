import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-bg-deep text-text-bright pb-28 relative overflow-hidden">
            {/* Background Ambient Glows */}
            <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-neon/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary-neon/10 rounded-full blur-[120px] pointer-events-none"></div>

            <header className="max-w-md mx-auto pt-10 px-8 flex justify-between items-center mb-10 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 relative group">
                        <div className="absolute inset-0 bg-primary-neon rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative w-full h-full bg-bg-card border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl">
                            <span className="font-black text-2xl text-primary-neon">G</span>
                        </div>
                    </div>
                    <div>
                        <h1 className="font-black text-xl tracking-tighter leading-none">GROW INDIA</h1>
                        <p className="text-[9px] font-black text-primary-neon tracking-[0.3em] mt-1 opacity-70">QUANTUM CORE</p>
                    </div>
                </div>

                <button className="w-12 h-12 rounded-2xl bg-bg-card border border-white/5 flex items-center justify-center shadow-xl hover:border-primary-neon/30 transition-all active:scale-90">
                    <div className="relative">
                        <div className="w-2 h-2 bg-primary-neon rounded-full animate-ping absolute"></div>
                        <div className="w-2 h-2 bg-primary-neon rounded-full"></div>
                    </div>
                </button>
            </header>

            <main className="max-w-md mx-auto px-8 relative z-10">
                {children}
            </main>
            <Navbar />
        </div>
    );
};

export default Layout;
