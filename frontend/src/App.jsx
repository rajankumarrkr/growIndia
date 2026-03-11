import React, { useContext, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';

// Lazy-loaded pages — only downloaded when the user navigates to them
const Home = lazy(() => import('./pages/Home'));
const Plan = lazy(() => import('./pages/Plan'));
const Team = lazy(() => import('./pages/Team'));
const Profile = lazy(() => import('./pages/Profile'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Investments = lazy(() => import('./pages/Investments'));
const Wallet = lazy(() => import('./pages/Wallet'));
const History = lazy(() => import('./pages/History'));

const SyncScreen = () => (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <span style={{ fontWeight: 900, color: '#2563eb', letterSpacing: '0.2em', fontSize: '10px', textTransform: 'uppercase', animation: 'pulse 1.5s ease-in-out infinite' }}>
            Synchronizing...
        </span>
    </div>
);

const PrivateRoute = ({ children, adminOnly = false }) => {
    const { user, loading } = useContext(AuthContext);
    if (loading) return <SyncScreen />;
    if (!user) return <Navigate to="/login" />;
    if (adminOnly && user.role !== 'admin') return <Navigate to="/" />;
    return children;
};

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Suspense fallback={<SyncScreen />}>
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
                </Suspense>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
