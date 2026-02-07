import React, { useEffect, useState } from 'react';
import { MapPin, Truck } from 'lucide-react';

const LiveMap = ({ status }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Reset progress when component mounts
        setProgress(0);

        // Simulate movement
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 0; // Loop for demo
                return prev + 0.5;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-[300px] bg-gray-100 rounded-xl overflow-hidden border border-gray-200 shadow-inner">
            {/* Map Background Pattern */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(#cbd5e1 2px, transparent 2px)',
                    backgroundSize: '20px 20px'
                }}>
            </div>

            {/* Road */}
            <div className="absolute top-1/2 left-10 right-10 h-3 bg-gray-200 rounded-full transform -translate-y-1/2">
                <div className="w-full h-full border-b-2 border-dashed border-gray-400 opacity-50"></div>
            </div>

            {/* Home Marker (Destination) */}
            <div className="absolute top-1/2 right-10 transform -translate-y-1/2 translate-x-1/2 flex flex-col items-center">
                <div className="bg-primary-100 p-2 rounded-full border-2 border-primary-500 z-10">
                    <MapPin className="h-6 w-6 text-primary-600 fill-current" />
                </div>
                <span className="text-xs font-bold text-gray-600 mt-1">You</span>
            </div>

            {/* Provider Marker (Moving) */}
            <div
                className="absolute top-1/2 left-10 transform -translate-y-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-100 ease-linear z-20"
                style={{ left: `calc(2.5rem + ${progress} * (100% - 5rem) / 100)` }}
            >
                <div className="bg-white p-2 rounded-full shadow-lg border border-gray-200">
                    <Truck className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="bg-indigo-600 text-white text-[10px] px-1.5 py-0.5 rounded-full mt-1 shadow-sm whitespace-nowrap">
                    {status || 'On Route'}
                </div>
            </div>

            {/* Overlay Info */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-gray-100 text-sm">
                <p className="text-gray-500">Distance</p>
                <p className="font-semibold text-gray-900">{Math.max(0, (2.5 - (progress / 100) * 2.5)).toFixed(1)} km away</p>
            </div>
        </div>
    );
};

export default LiveMap;
