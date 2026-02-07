import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '../../components/common/UI';
import { CheckCheck, MapPin, Truck } from 'lucide-react';
import RealMap from '../../components/features/RealMap';

const RouteDeliveries = () => {
    const { user } = useAuth();
    const { getProviderRequests, markDelivered, startGpsSimulation, stopGpsSimulation, updateGpsProgress, getProviderStatus } = useData();
    const [deliveringId, setDeliveringId] = useState(null);

    const providerStatus = getProviderStatus(user.providerId);
    const isLive = providerStatus?.isLive;

    // Handle Simulation Interval
    React.useEffect(() => {
        let interval;
        if (isLive) {
            interval = setInterval(() => {
                updateGpsProgress(user.providerId);
            }, 2000); // Move every 2 seconds
        }
        return () => clearInterval(interval);
    }, [isLive, user.providerId]);

    const toggleSimulation = () => {
        if (isLive) {
            stopGpsSimulation(user.providerId);
        } else {
            startGpsSimulation(user.providerId);
        }
    };

    // Prepare Map Data
    const mapMarkers = [
        // Provider is the Truck
        {
            id: 'provider',
            lat: providerStatus.lat || 12.9716,
            lng: providerStatus.lng || 77.5946,
            type: 'provider',
            title: 'Your Live Location'
        }
    ];

    // Add Customers as markers
    const requests = getProviderRequests(user.providerId);
    // For demo, we scatter them around the start point
    const customerMarkers = requests.map((req, i) => ({
        id: req.id,
        lat: 12.9716 + (Math.random() * 0.01 - 0.005),
        lng: 77.5946 + (Math.random() * 0.01 - 0.005),
        type: 'customer',
        title: req.customerName
    }));

    const allMarkers = [...mapMarkers, ...customerMarkers];

    const sortedRequests = requests.sort((a, b) => {
        // Sort: Pending first, then Delivered
        if (a.status === b.status) return 0;
        return a.status === 'pending' ? -1 : 1;
    });

    const handleDeliver = (id) => {
        setDeliveringId(id);
        // Simulate a small delay for "Processing" mock
        setTimeout(() => {
            markDelivered(id);
            setDeliveringId(null);
        }, 800);
    };

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Today's Route</h1>
                <Button
                    variant={isLive ? "danger" : "primary"}
                    onClick={toggleSimulation}
                >
                    <Truck className="h-4 w-4 mr-2" />
                    {isLive ? "Stop GPS Simulation" : "Start GPS Simulation"}
                </Button>
            </header>

            <div className="grid gap-4">
                {/* Map Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-gray-900 flex items-center gap-2">
                            <MapPin className="h-5 w-5" /> Live Map Route
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <RealMap
                            isLive={isLive}
                            markers={allMarkers}
                            center={[providerStatus.lat || 12.9716, providerStatus.lng || 77.5946]}
                        />
                    </CardContent>
                </Card>

                {sortedRequests.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500">No deliveries scheduled for today yet.</p>
                    </div>
                ) : (
                    sortedRequests.map((req) => (
                        <Card key={req.id} className={`transition-opacity ${req.status === 'delivered' ? 'opacity-75 bg-gray-50' : ''}`}>
                            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 bg-gray-100 p-2 rounded-full">
                                        <MapPin className="h-5 w-5 text-gray-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{req.customerName}</h3>
                                        <p className="text-sm text-gray-500">{req.address}</p>
                                        <div className="mt-2 flex items-center gap-2">
                                            <span className="text-sm font-medium bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                                                {req.quantity} Liters
                                            </span>
                                            {req.isExtra && (
                                                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                                                    Extra Request
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 self-end sm:self-center">
                                    {req.status === 'delivered' ? (
                                        <div className="flex items-center text-green-600 font-medium px-4 py-2 bg-green-50 rounded-lg">
                                            <CheckCheck className="h-5 w-5 mr-2" /> Delivered
                                        </div>
                                    ) : (
                                        <Button
                                            size="sm"
                                            onClick={() => handleDeliver(req.id)}
                                            disabled={deliveringId === req.id}
                                            className={deliveringId === req.id ? 'opacity-70 cursor-wait' : ''}
                                        >
                                            {deliveringId === req.id ? 'Processing...' : 'Mark Delivered'}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default RouteDeliveries;
