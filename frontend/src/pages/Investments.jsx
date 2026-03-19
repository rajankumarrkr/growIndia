import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../api/axios';
import { Activity, Zap, Timer, TrendingUp, Layers, ArrowRight } from 'lucide-react';

const Investments = () => {
    const [investments, setInvestments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInvestments();
    }, []);

    const fetchInvestments = async () => {
        try {
            const res = await api.get('/invest/my-investments');
            setInvestments(res.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout title="Active Plan">
            <div className="mb-10 px-2">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Active Portfolio</h1>
                <p className="text-label mt-1">Real-time status of your staked assets</p>
            </div>

            {loading ? (
                <div className="space-y-6">
                    {[1, 2].map(i => (
                        <div key={i} className="h-48 bg-slate-50 border border-slate-100 rounded-[2.5rem] animate-pulse"></div>
                    ))}
                </div>
            ) : investments.length === 0 ? (
                <div className="fintech-card flex flex-col items-center justify-center p-12 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-6">
                        <Layers size={32} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">No Active Plan</h3>
                    <p className="text-label mb-8">You haven't activated any investment protocols yet.</p>
                    <a href="/plan" className="btn-fintech btn-fintech-primary px-8 py-3 text-xs uppercase tracking-widest inline-flex items-center gap-2">
                        Get Started <ArrowRight size={14} />
                    </a>
                </div>
            ) : (
                <div className="space-y-6">
                    {investments.map((inv, i) => (
                        <div key={i} className="fintech-card group overflow-hidden">
                            <div className="flex justify-between items-start mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-50 text-royal-blue rounded-xl flex items-center justify-center group-hover:bg-royal-blue group-hover:text-white transition-all duration-500">
                                        <Zap size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-slate-900 leading-tight">{inv.planName}</h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                            Activated: {new Date(inv.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-label mb-1">Return Today</p>
                                    <p className="text-xl font-black text-emerald-500">+₹{inv.dailyReturn}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6 border-t border-slate-50 pt-6">
                                <div>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Asset Staked</p>
                                    <p className="text-base font-black text-slate-900">₹{inv.amountInvested.toLocaleString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Cycle Contract</p>
                                    <p className="text-base font-black text-slate-900">{inv.daysRemaining} / 99 Days</p>
                                </div>
                            </div>

                            <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-royal-blue"
                                    style={{ width: `${((99 - inv.daysRemaining) / 99) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Layout>
    );
};

export default Investments;
