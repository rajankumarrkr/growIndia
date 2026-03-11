import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Target, Wallet as WalletIcon, User, ShieldAlert, Layers, Activity } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user } = useContext(AuthContext);

    const navItems = [
        { name: 'Home', path: '/', icon: <LayoutDashboard size={20} /> },
        { name: 'Staking', path: '/plan', icon: <Target size={20} /> },
        { name: 'Active', path: '/investments', icon: <Activity size={20} /> },
        { name: 'Wallet', path: '/wallet', icon: <WalletIcon size={20} /> },
        { name: 'Profile', path: '/profile', icon: <User size={20} /> },
    ];

    if (user?.role === 'admin') {
        navItems[4] = { name: 'Admin', path: '/admin', icon: <ShieldAlert size={20} /> };
    }

    return (
        <div className="mobile-nav-shell">
            <nav className="mobile-nav-core !px-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center gap-1 transition-all duration-300 flex-1 ${isActive ? 'text-royal-blue' : 'text-slate-300 hover:text-slate-400'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <div className={`relative transition-all duration-500 ${isActive ? 'scale-110 -translate-y-0.5' : ''}`}>
                                    {item.icon}
                                    {isActive && (
                                        <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-royal-blue rounded-full border border-white shadow-sm" />
                                    )}
                                </div>
                                <span className={`text-[8px] font-black uppercase tracking-widest ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                                    {isActive ? item.name : ''}
                                </span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default Navbar;
