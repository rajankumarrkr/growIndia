import React, { useContext, useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';
import { Share2, Users, IndianRupee, Trophy, Copy, Check, Zap, TrendingUp, Activity, PhoneCall, UserCheck, UserX, Gift } from 'lucide-react';
import api from '../api/axios';

const Team = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({ teamSize: 0, commission: 0, members: [] });
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTeamStats();
    }, []);

    const fetchTeamStats = async () => {
        try {
            setLoading(true);
            const res = await api.get('/team/data');
            setStats(res.data);
        } catch (err) { }
        finally { setLoading(false); }
    };

    const handleShare = async () => {
        const shareData = {
            title: 'Join Grow India',
            text: `Join me on Grow India! Use my referral code: ${user?.referralCode}`,
            url: `${window.location.origin}/register?ref=${user?.referralCode}`
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(shareData.url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch (err) { }
    };

    const activeMembers = stats.members.filter(m => m.hasRecharged).length;
    const inactiveMembers = stats.members.filter(m => !m.hasRecharged).length;

    return (
        <Layout title="Team">
            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.5px' }}>Affiliate Hub</h1>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginTop: '2px' }}>Refer friends & earn 10% on every recharge</p>
            </div>

            {/* Stats Grid — 3 cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '24px' }}>
                {/* Total Members */}
                <div style={{
                    background: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
                    borderRadius: '20px', padding: '16px 12px',
                    position: 'relative', overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', top: '-15px', right: '-15px', width: '60px', height: '60px', background: 'rgba(255,255,255,0.08)', borderRadius: '50%' }} />
                    <div style={{ width: '32px', height: '32px', background: 'rgba(255,255,255,0.12)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                        <Users size={16} color="white" />
                    </div>
                    <p style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>Total</p>
                    <p style={{ fontSize: '26px', fontWeight: 900, color: 'white', lineHeight: 1 }}>{stats.teamSize}</p>
                </div>

                {/* Active Members */}
                <div style={{
                    background: 'linear-gradient(135deg, #065f46, #059669)',
                    borderRadius: '20px', padding: '16px 12px',
                    position: 'relative', overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', top: '-15px', right: '-15px', width: '60px', height: '60px', background: 'rgba(255,255,255,0.08)', borderRadius: '50%' }} />
                    <div style={{ width: '32px', height: '32px', background: 'rgba(255,255,255,0.12)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                        <UserCheck size={16} color="white" />
                    </div>
                    <p style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>Active</p>
                    <p style={{ fontSize: '26px', fontWeight: 900, color: 'white', lineHeight: 1 }}>{activeMembers}</p>
                </div>

                {/* Inactive Members */}
                <div style={{
                    background: 'linear-gradient(135deg, #7f1d1d, #dc2626)',
                    borderRadius: '20px', padding: '16px 12px',
                    position: 'relative', overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', top: '-15px', right: '-15px', width: '60px', height: '60px', background: 'rgba(255,255,255,0.08)', borderRadius: '50%' }} />
                    <div style={{ width: '32px', height: '32px', background: 'rgba(255,255,255,0.12)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                        <UserX size={16} color="white" />
                    </div>
                    <p style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>Inactive</p>
                    <p style={{ fontSize: '26px', fontWeight: 900, color: 'white', lineHeight: 1 }}>{inactiveMembers}</p>
                </div>
            </div>

            {/* Total Referral Income Banner */}
            <div style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                borderRadius: '24px', padding: '20px 24px',
                marginBottom: '24px',
                display: 'flex', alignItems: 'center', gap: '16px',
                boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
                position: 'relative', overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'rgba(37,99,235,0.1)', borderRadius: '50%' }} />
                <div style={{
                    width: '52px', height: '52px', minWidth: '52px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #059669, #10b981)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 8px 20px rgba(5,150,105,0.35)'
                }}>
                    <Gift size={26} color="white" />
                </div>
                <div style={{ flex: 1, zIndex: 1 }}>
                    <p style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '4px' }}>
                        Total Referral Income
                    </p>
                    <p style={{ fontSize: '30px', fontWeight: 900, color: 'white', lineHeight: 1, letterSpacing: '-1px' }}>
                        ₹{stats.commission.toLocaleString('en-IN')}
                    </p>
                    <p style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>
                        10% of all referred users' approved deposits
                    </p>
                </div>
            </div>

            {/* Referral Code Card */}
            <div style={{
                background: 'linear-gradient(135deg, #4338ca, #2563eb, #1e3a8a)',
                borderRadius: '24px', padding: '24px',
                marginBottom: '24px',
                position: 'relative', overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, pointerEvents: 'none' }}>
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="white"/></pattern></defs>
                        <rect width="100%" height="100%" fill="url(#dots)" />
                    </svg>
                </div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                        <div style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.12)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Trophy size={20} color="#fbbf24" />
                        </div>
                        <div>
                            <p style={{ fontSize: '14px', fontWeight: 900, color: 'white' }}>Your Referral Code</p>
                            <p style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.55)' }}>Earn 10% on every recharge</p>
                        </div>
                    </div>

                    <div style={{
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '16px', padding: '16px 20px',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        border: '1px solid rgba(255,255,255,0.2)',
                        marginBottom: '16px'
                    }}>
                        <span style={{ fontSize: '28px', fontWeight: 900, color: 'white', letterSpacing: '0.3em', fontFamily: 'monospace' }}>
                            {user?.referralCode}
                        </span>
                        <button onClick={handleShare} style={{
                            width: '44px', height: '44px', borderRadius: '12px',
                            background: copied ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.12)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', color: 'white', transition: 'all 0.2s'
                        }}>
                            {copied ? <Check size={20} /> : <Share2 size={20} />}
                        </button>
                    </div>

                    <button onClick={handleShare} style={{
                        width: '100%', height: '52px', borderRadius: '16px',
                        background: 'white', color: '#2563eb',
                        border: 'none', cursor: 'pointer',
                        fontSize: '12px', fontWeight: 900,
                        letterSpacing: '0.15em', textTransform: 'uppercase',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        transition: 'all 0.2s'
                    }}>
                        <Share2 size={16} /> Share Invite
                    </button>
                </div>
            </div>

            {/* How It Works */}
            <div style={{ marginBottom: '24px' }}>
                <p style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px' }}>How It Works</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                        { icon: <Share2 size={16} />, text: 'Share your referral link with friends', color: '#2563eb', bg: '#eff6ff' },
                        { icon: <Activity size={16} />, text: 'Friend registers and makes a recharge', color: '#7c3aed', bg: '#f5f3ff' },
                        { icon: <TrendingUp size={16} />, text: 'You earn 10% on every approved deposit', color: '#059669', bg: '#f0fdf4' },
                    ].map((step, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: '14px',
                            background: 'white', borderRadius: '16px', padding: '14px 16px',
                            border: '1.5px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                        }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: step.bg, color: step.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                {step.icon}
                            </div>
                            <p style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>{step.text}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Member List */}
            <div style={{ marginBottom: '80px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <p style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                        Referred Members
                    </p>
                    <span style={{
                        fontSize: '9px', fontWeight: 900, color: '#2563eb',
                        background: '#eff6ff', padding: '4px 10px', borderRadius: '20px',
                        border: '1px solid #bfdbfe', textTransform: 'uppercase', letterSpacing: '0.08em'
                    }}>
                        {stats.members.length} Members
                    </span>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                        <p style={{ fontSize: '12px', fontWeight: 700 }}>Loading...</p>
                    </div>
                ) : stats.members.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {stats.members.map((member) => (
                            <div key={member.id} style={{
                                background: 'white', borderRadius: '20px', padding: '16px 18px',
                                border: '1.5px solid #f1f5f9',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                                display: 'flex', alignItems: 'center', gap: '14px'
                            }}>
                                {/* Avatar */}
                                <div style={{
                                    width: '46px', height: '46px', flexShrink: 0,
                                    borderRadius: '14px',
                                    background: member.hasRecharged ? '#f0fdf4' : '#fef2f2',
                                    color: member.hasRecharged ? '#059669' : '#dc2626',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '18px', fontWeight: 900
                                }}>
                                    {member.name?.charAt(0)?.toUpperCase() || '?'}
                                </div>

                                {/* Info */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {member.name}
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <PhoneCall size={11} color="#94a3b8" />
                                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', letterSpacing: '0.05em' }}>
                                            {member.mobile || 'N/A'}
                                        </span>
                                    </div>
                                </div>

                                {/* Status Badge */}
                                <div style={{ flexShrink: 0, textAlign: 'right' }}>
                                    {member.hasRecharged ? (
                                        <div style={{
                                            display: 'flex', alignItems: 'center', gap: '5px',
                                            background: '#f0fdf4', border: '1px solid #bbf7d0',
                                            borderRadius: '10px', padding: '5px 10px'
                                        }}>
                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px rgba(34,197,94,0.6)' }} />
                                            <span style={{ fontSize: '10px', fontWeight: 900, color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Active</span>
                                        </div>
                                    ) : (
                                        <div style={{
                                            display: 'flex', alignItems: 'center', gap: '5px',
                                            background: '#fef2f2', border: '1px solid #fecaca',
                                            borderRadius: '10px', padding: '5px 10px'
                                        }}>
                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444' }} />
                                            <span style={{ fontSize: '10px', fontWeight: 900, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Inactive</span>
                                        </div>
                                    )}
                                    <p style={{ fontSize: '9px', fontWeight: 600, color: '#cbd5e1', marginTop: '4px', textAlign: 'right' }}>
                                        {member.createdAt ? new Date(member.createdAt).toLocaleDateString('en-IN') : ''}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{
                        background: 'white', borderRadius: '24px', padding: '40px 20px',
                        textAlign: 'center', border: '2px dashed #e2e8f0'
                    }}>
                        <div style={{ width: '56px', height: '56px', background: '#f8fafc', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                            <Users size={24} color="#cbd5e1" />
                        </div>
                        <p style={{ fontSize: '13px', fontWeight: 800, color: '#94a3b8' }}>No members yet</p>
                        <p style={{ fontSize: '11px', fontWeight: 600, color: '#cbd5e1', marginTop: '6px' }}>Share your referral code to get started</p>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Team;
