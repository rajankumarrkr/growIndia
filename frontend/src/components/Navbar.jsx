import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LayoutGrid, Users, User, ArrowLeftRight } from 'lucide-react';

const Navbar = () => {
    const navItems = [
        { name: 'Core', path: '/', icon: <Home size={22} /> },
        { name: 'Plan', path: '/plan', icon: <LayoutGrid size={22} /> },
        { name: 'Team', path: '/team', icon: <Users size={22} /> },
        { name: 'Units', path: '/profile', icon: <User size={22} /> },
    ];

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[400px] z-[100] px-6">
            <nav className="bg-white/70 backdrop-blur-2xl border border-black/5 rounded-[2.5rem] p-2 flex justify-between items-center shadow-premium relative">
                {/* Visual Accent for active items */}
                <div className="absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-primary-indigo/20 to-transparent"></div>

                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `relative flex-1 flex flex-col items-center justify-center py-3 rounded-2xl transition-all duration-500 ${isActive ? 'text-primary-indigo' : 'text-text-muted hover:text-primary-indigo'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <div className="flex flex-col items-center justify-center relative z-10">
                                <div className={`transition-all duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                                    {item.icon}
                                </div>
                                <span className={`text-[10px] font-bold mt-1 tracking-tight transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 h-0 w-0'}`}>
                                    {item.name}
                                </span>
                                {isActive && (
                                    <div className="absolute -bottom-1.5 w-1 h-1 bg-primary-indigo rounded-full shadow-indigo"></div>
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
