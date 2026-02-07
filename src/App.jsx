import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Layout } from './components/layout/Layout';

// Auth Pages (Placeholders)
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Landing from './pages/Landing';

// Customer Pages (Placeholders)
import CustomerDashboard from './pages/customer/Dashboard';
import RequestMilk from './pages/customer/RequestMilk';
import CustomerHistory from './pages/customer/History';
import CustomerProfile from './pages/customer/Profile';
import ProviderPublicProfile from './pages/customer/ProviderPublicProfile';

// Provider Pages (Placeholders)
import ProviderDashboard from './pages/provider/Dashboard';
import RouteDeliveries from './pages/provider/RouteDeliveries';
import ExtraRequests from './pages/provider/ExtraRequests';
import ProviderHistory from './pages/provider/History';
import ProviderProfile from './pages/provider/Profile';

const ProtectedRoute = ({ children, allowedRole }) => {
    const { user, loading } = useAuth();

    if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
    if (!user) return <Navigate to="/login" replace />;
    if (allowedRole && user.role !== allowedRole) {
        return <Navigate to="/" replace />; // Redirect to home/dashboard if wrong role
    }

    return <Layout>{children}</Layout>;
};

function App() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Customer Routes */}
            <Route path="/customer/dashboard" element={
                <ProtectedRoute allowedRole="customer">
                    <CustomerDashboard />
                </ProtectedRoute>
            } />
            <Route path="/customer/request" element={
                <ProtectedRoute allowedRole="customer">
                    <RequestMilk />
                </ProtectedRoute>
            } />
            <Route path="/customer/history" element={
                <ProtectedRoute allowedRole="customer">
                    <CustomerHistory />
                </ProtectedRoute>
            } />
            <Route path="/customer/profile" element={
                <ProtectedRoute allowedRole="customer">
                    <CustomerProfile />
                </ProtectedRoute>
            } />
            <Route path="/customer/provider-profile/:id" element={
                <ProtectedRoute allowedRole="customer">
                    <ProviderPublicProfile />
                </ProtectedRoute>
            } />

            {/* Provider Routes */}
            <Route path="/provider/dashboard" element={
                <ProtectedRoute allowedRole="provider">
                    <ProviderDashboard />
                </ProtectedRoute>
            } />
            <Route path="/provider/route" element={
                <ProtectedRoute allowedRole="provider">
                    <RouteDeliveries />
                </ProtectedRoute>
            } />
            <Route path="/provider/requests" element={
                <ProtectedRoute allowedRole="provider">
                    <ExtraRequests />
                </ProtectedRoute>
            } />
            <Route path="/provider/history" element={
                <ProtectedRoute allowedRole="provider">
                    <ProviderHistory />
                </ProtectedRoute>
            } />
            <Route path="/provider/profile" element={
                <ProtectedRoute allowedRole="provider">
                    <ProviderProfile />
                </ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;
