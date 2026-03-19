import React, { useContext, lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { PageSkeleton, HomeSkeleton } from './components/SkeletonLoader';
const Home = lazy(() => import('./pages/Home'));
const Plan = lazy(() => import('./pages/Plan'));
const Team = lazy(() => import('./pages/Team'));
const Profile = lazy(() => import('./pages/Profile'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const Investments = lazy(() => import('./pages/Investments'));
const Wallet = lazy(() => import('./pages/Wallet'));
const History = lazy(() => import('./pages/History'));

const SyncScreen = () => (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <div style={{ textAlign: 'center' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTop: '3px solid #2563eb', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
            <span style={{ fontWeight: 900, color: '#2563eb', letterSpacing: '0.2em', fontSize: '10px', textTransform: 'uppercase' }}>
                Initializing...
            </span>
        </div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
);

const PublicRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    if (loading) return <SyncScreen />;
    if (user) return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} />;
    return children;
};

const PrivateRoute = ({ children, adminOnly = false }) => {
    const { user, loading } = useContext(AuthContext);
    if (loading) return <SyncScreen />;
    if (!user) return <Navigate to={adminOnly ? "/admin/login" : "/login"} />;
    if (adminOnly && user.role !== 'admin') return <Navigate to="/dashboard" />;
    if (!adminOnly && user.role === 'admin') return <Navigate to="/admin/dashboard" />;
    return children;
};

function App() {
    // Proactively prefetch auth routes on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            import('./pages/Login');
            import('./pages/Register');
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="/login" element={
                        <PublicRoute>
                            <Suspense fallback={<PageSkeleton />}><Login /></Suspense>
                        </PublicRoute>
                    } />
                    <Route path="/register" element={
                        <PublicRoute>
                            <Suspense fallback={<PageSkeleton />}><Register /></Suspense>
                        </PublicRoute>
                    } />
                    <Route path="/admin/login" element={
                        <PublicRoute>
                            <Suspense fallback={<SyncScreen />}><AdminLogin /></Suspense>
                        </PublicRoute>
                    } />

                    {/* All other routes wrapped in PrivateRoute and granular Suspense */}
                    <Route path="/dashboard" element={<PrivateRoute><Suspense fallback={<SyncScreen />}><Home /></Suspense></PrivateRoute>} />
                    <Route path="/plan" element={<PrivateRoute><Suspense fallback={<SyncScreen />}><Plan /></Suspense></PrivateRoute>} />
                    <Route path="/investments" element={<PrivateRoute><Suspense fallback={<SyncScreen />}><Investments /></Suspense></PrivateRoute>} />
                    <Route path="/wallet" element={<PrivateRoute><Suspense fallback={<SyncScreen />}><Wallet /></Suspense></PrivateRoute>} />
                    <Route path="/history" element={<PrivateRoute><Suspense fallback={<SyncScreen />}><History /></Suspense></PrivateRoute>} />
                    <Route path="/team" element={<PrivateRoute><Suspense fallback={<SyncScreen />}><Team /></Suspense></PrivateRoute>} />
                    <Route path="/profile" element={<PrivateRoute><Suspense fallback={<SyncScreen />}><Profile /></Suspense></PrivateRoute>} />
                    <Route path="/admin/dashboard" element={<PrivateRoute adminOnly={true}><Suspense fallback={<SyncScreen />}><AdminDashboard /></Suspense></PrivateRoute>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
