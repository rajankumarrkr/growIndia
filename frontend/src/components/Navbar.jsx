import React from 'react';
import { NavLink } from 'react-router-dom';
import { Compass, Landmark, Users, User, LayoutGrid } from 'lucide-react';

const Navbar = () => {
    const navItems = [
        { name: 'Core', path: '/', icon: <Compass size={24} /> },
        { name: 'Vault', path: '/plan', icon: <Landmark size={24} /> },
        { name: 'Nexus', path: '/team', icon: <Users size={24} /> },
        { name: 'Unit', path: '/profile', icon: <User size={24} /> },
    ];

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[340px] z-[100] px-4">
            <nav className="bg-bg-card/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-2 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `relative group p-4 rounded-3xl transition-all duration-500 overflow-hidden ${isActive ? 'text-primary-neon' : 'text-text-dim hover:text-text-bright'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <div className="flex flex-col items-center justify-center relative z-10">
                                <div className={`transition-all duration-500 ${isActive ? 'scale-110 -translate-y-1' : ''}`}>
                                    {item.icon}
                                </div>
                                {isActive && (
                                    <div className="absolute -bottom-1 w-1 h-1 bg-primary-neon rounded-full shadow-[0_0_8px_#06b6d4]"></div>
                                )}
                                {/* Active Backdrop */}
                                {isActive && (
                                    <div className="absolute inset-0 bg-primary-neon/5 blur-xl"></div>
                                )}
                            </div>
                        )}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default Navbar;
