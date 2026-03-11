import React from 'react';
import Navbar from './Navbar';
import { Bell, Wallet } from 'lucide-react';

const Layout = ({ children, title = "Grow India", hideHeader = false }) => {
    return (
        <div className="min-h-screen bg-bg-deep text-slate-800 relative font-sans overflow-x-hidden" style={{ paddingBottom: 'calc(64px + env(safe-area-inset-bottom, 0px) + 20px)' }}>
            {/* Minimalist Header */}
            {!hideHeader && (
                <header className="fixed top-0 left-0 w-full bg-white border-b border-slate-100 z-[1000]">
                    <div className="w-full md:max-w-xl md:mx-auto px-4 sm:px-6 h-16 sm:h-20 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-royal-blue rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <Wallet size={20} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg font-extrabold leading-none">{title}</h1>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Official Hub</p>
                            </div>
                        </div>

                        <button className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-white hover:shadow-sm transition-all active:scale-95">
                            <Bell size={20} />
                        </button>
                    </div>
                </header>
            )}

            <main className={`w-full md:max-w-xl md:mx-auto px-4 sm:px-6 ${hideHeader ? 'pt-6' : 'pt-20 sm:pt-28'} page-enter`}>
                {children}
            </main>

            <Navbar />
        </div>
    );
};

export default Layout;
