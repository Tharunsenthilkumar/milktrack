import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    Menu, X, Home, History, User, MapPin, Truck, Milk, LogOut, Bell
} from 'lucide-react';
import { cn } from '../common/UI';

export const Layout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    if (!user) return <>{children}</>;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = user.role === 'customer' ? [
        { name: 'Dashboard', path: '/customer/dashboard', icon: Home },
        { name: 'Request Milk', path: '/customer/request', icon: Milk },
        { name: 'History', path: '/customer/history', icon: History },
        { name: 'Profile', path: '/customer/profile', icon: User },
    ] : [
        { name: 'Dashboard', path: '/provider/dashboard', icon: Home },
        { name: 'Route & Deliveries', path: '/provider/route', icon: MapPin },
        { name: 'Extra Requests', path: '/provider/requests', icon: Bell },
        { name: 'History', path: '/provider/history', icon: History },
        { name: 'Profile', path: '/provider/profile', icon: User },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar for Desktop */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-full z-10">
                <div className="p-6 border-b border-gray-200 flex items-center justify-center">
                    <h1 className="text-2xl font-bold text-primary-600 flex items-center gap-2">
                        <Truck className="h-8 w-8" /> MilkTrack
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) => cn(
                                "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                                isActive
                                    ? "bg-primary-50 text-primary-700"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            )}
                        >
                            <item.icon className="mr-3 h-5 w-5" />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-20 px-4 py-3 flex items-center justify-between">
                <h1 className="text-xl font-bold text-primary-600 flex items-center gap-2">
                    <Truck className="h-6 w-6" /> MilkTrack
                </h1>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-600">
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-10 bg-gray-800 bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="absolute top-[60px] left-0 right-0 bg-white border-b border-gray-200 p-4 shadow-lg" onClick={e => e.stopPropagation()}>
                        <nav className="space-y-2">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) => cn(
                                        "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                                        isActive
                                            ? "bg-primary-50 text-primary-700"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    )}
                                >
                                    <item.icon className="mr-3 h-5 w-5" />
                                    {item.name}
                                </NavLink>
                            ))}
                            <button
                                onClick={handleLogout}
                                className="flex w-full items-center px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                            >
                                <LogOut className="mr-3 h-5 w-5" />
                                Sign Out
                            </button>
                        </nav>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className={cn(
                "flex-1 transition-all duration-300 min-h-screen",
                "md:ml-64", // Push content when sidebar is visible
                "pt-[60px] md:pt-0" // Mobile header spacing
            )}>
                <div className="p-4 md:p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};
