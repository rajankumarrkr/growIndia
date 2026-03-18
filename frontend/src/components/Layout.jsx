import React from 'react';
import Navbar from './Navbar';
import TopNavbar from './TopNavbar';

const Layout = ({ children, title = "Grow India", hideHeader = false, hideNav = false }) => {
    return (
        <div
            className="min-h-screen bg-bg-deep text-slate-800 relative font-sans overflow-x-hidden"
            style={hideNav ? {} : { paddingBottom: 'calc(64px + env(safe-area-inset-bottom, 0px) + 20px)' }}
        >
            {/* Minimalist Header */}
            {!hideHeader && <TopNavbar title={title} />}

            <main className={`w-full md:max-w-3xl md:mx-auto px-4 sm:px-6 ${hideHeader ? 'pt-6' : 'pt-6'} page-enter`}>
                {children}
            </main>

            {!hideNav && <Navbar />}
        </div>
    );
};

export default Layout;
