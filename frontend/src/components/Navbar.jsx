import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Target, Activity, Wallet as WalletIcon, User, ShieldAlert } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user } = useContext(AuthContext);

    const navItems = [
        { name: 'Home',     path: '/',            icon: LayoutDashboard },
        { name: 'Plans',    path: '/plan',         icon: Target          },
        { name: 'Active',   path: '/investments',  icon: Activity        },
        { name: 'Wallet',   path: '/wallet',       icon: WalletIcon      },
        { name: 'Profile',  path: '/profile',      icon: User            },
    ];

    if (user?.role === 'admin') {
        navItems[4] = { name: 'Admin', path: '/admin', icon: ShieldAlert };
    }

    return (
        /* Outer safe-area wrapper — sticks to the very bottom of the screen */
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            /* iOS safe-area inset so the bar isn't covered by the home indicator */
            paddingBottom: 'env(safe-area-inset-bottom, 0px)',
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderTop: '1px solid rgba(226,232,240,0.8)',
            boxShadow: '0 -4px 30px rgba(0,0,0,0.06)',
        }}>
            <nav style={{
                display: 'flex',
                alignItems: 'stretch',
                height: '64px',
                maxWidth: '520px',
                margin: '0 auto',
            }}>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/'}
                            style={{ flex: 1, textDecoration: 'none', display: 'flex' }}
                        >
                            {({ isActive }) => (
                                <div style={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '4px',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    transition: 'all 0.2s',
                                    paddingTop: '2px',
                                }}>
                                    {/* Active top indicator line */}
                                    {isActive && (
                                        <div style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            width: '24px',
                                            height: '3px',
                                            borderRadius: '0 0 4px 4px',
                                            background: '#2563eb',
                                        }} />
                                    )}

                                    {/* Icon container */}
                                    <div style={{
                                        width: '40px',
                                        height: '32px',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: isActive ? '#eff6ff' : 'transparent',
                                        transition: 'background 0.25s, transform 0.2s',
                                        transform: isActive ? 'translateY(-1px)' : 'translateY(0)',
                                        color: isActive ? '#2563eb' : '#94a3b8',
                                    }}>
                                        <Icon size={isActive ? 20 : 19} strokeWidth={isActive ? 2.5 : 1.8} />
                                    </div>

                                    {/* Label — always visible */}
                                    <span style={{
                                        fontSize: '9px',
                                        fontWeight: 800,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.06em',
                                        color: isActive ? '#2563eb' : '#94a3b8',
                                        lineHeight: 1,
                                        transition: 'color 0.2s',
                                    }}>
                                        {item.name}
                                    </span>
                                </div>
                            )}
                        </NavLink>
                    );
                })}
            </nav>
        </div>
    );
};

export default Navbar;
