import React from 'react';
import { Bell, Wallet } from 'lucide-react';

const TopNavbar = ({ title = "Dashboard" }) => {
    return (
        <header className="sticky top-0 w-full bg-white border-b border-slate-100/50 shadow-sm z-[1000]">
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
    );
};

export default TopNavbar;
