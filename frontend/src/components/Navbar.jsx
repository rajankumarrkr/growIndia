import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LayoutGrid, Users, User, ShieldAlert } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user } = useContext(AuthContext);

    const navItems = [
        { name: 'Home', path: '/', icon: <Home size={22} /> },
        { name: 'Plan', path: '/plan', icon: <LayoutGrid size={22} /> },
        { name: 'Team', path: '/team', icon: <Users size={22} /> },
        { name: 'Profile', path: '/profile', icon: <User size={22} /> },
    ];

    if (user?.role === 'admin') {
        navItems.splice(3, 0, { name: 'Admin', path: '/admin', icon: <ShieldAlert size={22} /> });
    }

    return (
        <div className="fixed bottom-0 left-0 w-full z-[100] px-4 pb-8">
            <nav className="bg-white/90 backdrop-blur-3xl border border-blue-50/50 px-6 pt-3 pb-3 flex justify-between items-center shadow-[0_20px_50px_rgba(37,99,235,0.15)] rounded-[2.5rem]">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `relative flex-1 flex flex-col items-center justify-center py-2 transition-all duration-500 ${isActive ? 'text-royal-blue' : 'text-royal-blue/30 hover:text-royal-blue'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <div className="flex flex-col items-center justify-center relative">
                                <div className={`transition-all duration-500 ease-out ${isActive ? '-translate-y-1 scale-110' : 'hover:-translate-y-1'}`}>
                                    {item.icon}
                                </div>
                                <span className={`text-[9px] font-black mt-2 tracking-[0.1em] uppercase transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                                    {item.name}
                                </span>
                                {isActive && (
                                    <div className="absolute -top-3 w-8 h-1 bg-royal-blue rounded-full shadow-[0_0_10px_#2563eb]"></div>
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
