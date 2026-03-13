import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../api/axios';
import { History as HistoryIcon, ArrowDownRight, ArrowUpRight, Clock, CheckCircle, XCircle, Filter, Calendar } from 'lucide-react';

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const res = await api.get('/wallet/history');
            setHistory(res.data);
        } finally {
            setLoading(false);
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'approved': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'rejected': return 'bg-red-50 text-red-600 border-red-100';
            default: return 'bg-slate-50 text-slate-500 border-slate-100';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'approved': return <CheckCircle size={10} />;
            case 'pending': return <Clock size={10} />;
            case 'rejected': return <XCircle size={10} />;
            default: return null;
        }
    };

    return (
        <Layout title="Operational Lore">
            <div className="mb-6 px-2 flex justify-end items-center">
                <button className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                    <Filter size={18} />
                </button>
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-24 bg-slate-50 border border-slate-100 rounded-2xl animate-pulse"></div>
                    ))}
                </div>
            ) : history.length === 0 ? (
                <div className="fintech-card flex flex-col items-center justify-center p-12 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-6">
                        <Calendar size={32} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">No History Found</h3>
                    <p className="text-label">Your transaction log is currently empty.</p>
                </div>
            ) : (
                <div className="space-y-4 mb-12">
                    {history.map((tx, i) => (
                        <div key={i} className="fintech-card !p-5 flex items-center justify-between group hover:bg-slate-50/50 transition-all">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tx.type === 'recharge' ? 'bg-blue-50 text-royal-blue' : 'bg-slate-50 text-slate-400'}`}>
                                    {tx.type === 'recharge' ? <ArrowDownRight size={20} /> : <ArrowUpRight size={20} />}
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">
                                        {tx.type === 'recharge' ? 'Deposit' : 'Withdrawal'}
                                    </h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                                        {new Date(tx.timestamp).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} • {new Date(tx.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right flex flex-col items-end gap-2">
                                <p className={`text-base font-black ${tx.type === 'recharge' ? 'text-emerald-500' : 'text-slate-900'}`}>
                                    {tx.type === 'recharge' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                                </p>
                                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest ${getStatusStyle(tx.status)}`}>
                                    {getStatusIcon(tx.status)}
                                    {tx.status}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Layout>
    );
};

export default History;
