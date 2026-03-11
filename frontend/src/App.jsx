import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Home from './pages/Home';
import Plan from './pages/Plan';
import Team from './pages/Team';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import Investments from './pages/Investments';
import Wallet from './pages/Wallet';
import History from './pages/History';

const PrivateRoute = ({ children, adminOnly = false }) => {
    const { user, loading } = useContext(AuthContext);
    if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-black text-royal-blue animate-pulse uppercase tracking-[0.2em] text-xs">Synchronizing...</div>;

    if (!user) return <Navigate to="/login" />;
    if (adminOnly && user.role !== 'admin') return <Navigate to="/" />;

    return children;
};

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                    <Route path="/plan" element={<PrivateRoute><Plan /></PrivateRoute>} />
                    <Route path="/investments" element={<PrivateRoute><Investments /></PrivateRoute>} />
                    <Route path="/wallet" element={<PrivateRoute><Wallet /></PrivateRoute>} />
                    <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
                    <Route path="/team" element={<PrivateRoute><Team /></PrivateRoute>} />
                    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                    <Route path="/admin" element={<PrivateRoute adminOnly={true}><AdminDashboard /></PrivateRoute>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
