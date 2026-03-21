import React from 'react';
import { X, Smartphone, Download, Share, PlusSquare } from 'lucide-react';
import usePWAInstall from '../hooks/usePWAInstall';

const InstallBanner = () => {
    const { showBanner, isIOS, handleInstall, handleDismiss } = usePWAInstall();

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-20 left-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-10 duration-500">
            {/* Main Container with Glassmorphism */}
            <div className="relative overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-800/50 rounded-3xl shadow-2xl p-5 shadow-blue-500/10 transition-all active:scale-[0.98]">
                
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-start gap-4">
                    {/* App Icon / Logo Placeholder */}
                    <div className="relative flex-shrink-0">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20 ring-4 ring-white/10">
                           <Smartphone className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center">
                            <Download className="w-3 h-3 text-white" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white text-lg tracking-tight">
                                    Grow India App
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-snug mt-0.5">
                                    Install our official app for a faster & premium investment experience.
                                </p>
                            </div>
                            <button 
                                onClick={() => handleDismiss(7)}
                                className="p-1 -mr-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                                aria-label="Dismiss"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Actions */}
                        <div className="mt-4 flex flex-col gap-2">
                            {!isIOS ? (
                                <button 
                                    onClick={handleInstall}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 group transition-all"
                                >
                                    <Download className="w-5 h-5 group-hover:bounce" />
                                    Install Now
                                </button>
                            ) : (
                                <div className="bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-3 border border-slate-200 dark:border-slate-700/50">
                                    <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                        Instructions for iOS
                                    </h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 font-medium">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center text-xs font-bold">1</span>
                                            Tap the <Share className="w-4 h-4 inline-block text-blue-600" /> button in Safari.
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 font-medium">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center text-xs font-bold">2</span>
                                            Select <span className="font-bold px-1.5 py-0.5 rounded-md bg-white border border-slate-200 shadow-sm flex items-center gap-1 inline-flex ml-1"><PlusSquare className="w-3.5 h-3.5" /> Add to Home Screen</span>
                                        </li>
                                    </ul>
                                </div>
                            )}
                            
                            <button 
                                onClick={() => handleDismiss(7)}
                                className="w-full py-2.5 text-slate-500 dark:text-slate-400 font-bold text-sm hover:text-blue-600 transition-colors"
                            >
                                Maybe Later
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Injected style for animations */}
            <style>{`
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-3px); }
                }
                .group:hover .group-hover\\:bounce {
                    animation: bounce 1s infinite;
                }
            `}</style>
        </div>
    );
};

export default InstallBanner;
