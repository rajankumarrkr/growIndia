import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../api/axios';
import { History as HistoryIcon, ArrowDownRight, ArrowUpRight, Clock, CheckCircle, XCircle, Filter, Calendar, TrendingUp } from 'lucide-react';

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const res = await api.get('/wallet/history');
            if (res.data && Array.isArray(res.data)) {
                setHistory(res.data);
            } else {
                setHistory([]);
            }
        } catch (error) {
            console.error("Failed to fetch history:", error);
            setHistory([]);
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

    const getTypeIcon = (type) => {
        switch (type) {
            case 'recharge': return <ArrowDownRight size={20} />;
            case 'withdrawal': return <ArrowUpRight size={20} />;
            case 'roi': return <TrendingUp size={20} />;
            default: return <HistoryIcon size={20} />;
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'recharge': return 'bg-blue-50 text-royal-blue';
            case 'withdrawal': return 'bg-slate-50 text-slate-400';
            case 'roi': return 'bg-emerald-50 text-emerald-500';
            default: return 'bg-slate-50 text-slate-400';
        }
    };

    const safeFormatDate = (dateVal) => {
        if (!dateVal) return 'Unknown Date';
        try {
            const d = new Date(dateVal);
            if (isNaN(d.getTime())) return 'Unknown Date';
            return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
        } catch { return 'Unknown Date'; }
    };

    const safeFormatTime = (dateVal) => {
        if (!dateVal) return '';
        try {
            const d = new Date(dateVal);
            if (isNaN(d.getTime())) return '';
            return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        } catch { return ''; }
    };

    const filteredHistory = history.filter(tx => {
        if (activeTab === 'all') return true;
        if (activeTab === 'deposit') return tx.type === 'recharge';
        if (activeTab === 'withdrawal') return tx.type === 'withdrawal';
        if (activeTab === 'roi') return tx.type === 'roi';
        return true;
    });

    return (
        <Layout title="Operational Lore">
            <div className="mb-8 px-4">
                <div className="flex bg-slate-100/50 p-1.5 rounded-2xl border border-slate-100 overflow-x-auto hide-scrollbar">
                    {[
                        { id: 'all', label: 'All' },
                        { id: 'deposit', label: 'Deposits' },
                        { id: 'withdrawal', label: 'Withdrawals' },
                        { id: 'roi', label: 'ROI Income' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-2.5 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-white text-royal-blue shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="space-y-4 px-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-24 bg-slate-50 border border-slate-100 rounded-2xl animate-pulse"></div>
                    ))}
                </div>
            ) : filteredHistory.length === 0 ? (
                <div className="px-4">
                    <div className="fintech-card flex flex-col items-center justify-center p-12 text-center border-dashed border-2 border-slate-100 bg-slate-50/30">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 mb-6 shadow-sm border border-slate-50">
                            <Calendar size={32} />
                        </div>
                        <h3 className="text-xl font-black text-slate-400 mb-2 uppercase tracking-tighter">Empty Buffer</h3>
                        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-relaxed">No synchronization events recorded for this parameter.</p>
                    </div>
                </div>
            ) : (
                <div className="space-y-4 mb-24 px-4">
                    {filteredHistory.map((tx, i) => (
                        <div key={i} className="fintech-card !p-5 flex items-center justify-between group hover:bg-slate-50/50 transition-all border-slate-50 active:scale-[0.98]">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm border border-slate-100/50 ${getTypeColor(tx.type)}`}>
                                    {getTypeIcon(tx.type)}
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">
                                        {tx.type === 'recharge' ? 'Deposit' : tx.type === 'withdrawal' ? 'Withdrawal' : 'ROI Credit'}
                                    </h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 flex items-center gap-1.5">
                                        {safeFormatDate(tx.timestamp)}
                                        <span className="opacity-30">•</span>
                                        {safeFormatTime(tx.timestamp)}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right flex flex-col items-end gap-2">
                                <p className={`text-base font-black tracking-tight ${tx.type === 'recharge' || tx.type === 'roi' ? 'text-emerald-500' : 'text-slate-900'}`}>
                                    {tx.type === 'recharge' || tx.type === 'roi' ? '+' : '-'}₹{(tx.amount || 0).toLocaleString('en-IN')}
                                </p>
                                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest shadow-sm ${getStatusStyle(tx.status)}`}>
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
