import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/UI';
import { Truck, MapPin, Bell, ChevronRight, Check } from 'lucide-react';

const Landing = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="fixed w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary-500 p-2 rounded-lg">
                                <Truck className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900">MilkTrack</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link to="/login">
                                <Button variant="ghost">Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button>Get Started</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-6">
                    <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2"></span>
                    Now live in your city
                </div>
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
                    Modern Milk Delivery <br className="hidden md:block" />
                    <span className="text-primary-600">Simplified.</span>
                </h1>
                <p className="text-xl text-gray-500 max-w-2xl mb-10">
                    Track your daily milk delivery in real-time. Manage quantities, request extra milk, and handle payments seamlessly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Link to="/register" className="w-full sm:w-auto">
                        <Button size="lg" className="w-full">Start for Free <ChevronRight className="ml-2 h-5 w-5" /></Button>
                    </Link>
                    <Link to="/login" className="w-full sm:w-auto">
                        <Button variant="secondary" size="lg" className="w-full">Provider Login</Button>
                    </Link>
                </div>
            </div>

            {/* Features */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={MapPin}
                            title="Live Tracking"
                            description="See exactly where your milk delivery is on the map in real-time."
                        />
                        <FeatureCard
                            icon={Check}
                            title="Easy Management"
                            description="Change your daily quantity or pause delivery with just one tap."
                        />
                        <FeatureCard
                            icon={Bell}
                            title="Instant Updates"
                            description="Get notified when your delivery is nearby and when it arrives."
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white py-12 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
                    &copy; 2026 MilkTrack. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="bg-primary-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
            <Icon className="h-6 w-6 text-primary-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500">{description}</p>
    </div>
);

export default Landing;
