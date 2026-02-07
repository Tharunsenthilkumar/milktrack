import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Card, CardHeader, CardTitle, CardContent, Button } from '../../components/common/UI';
import RealMap from '../../components/features/RealMap';
import { Plus, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();
    const { todaysRequests, getProviderStatus, refreshData } = useData();

    // Poll for updates
    React.useEffect(() => {
        const interval = setInterval(() => {
            refreshData();
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const providerStatus = user.selectedProviderId ? getProviderStatus(user.selectedProviderId) : { isLive: false, lat: 12.9716, lng: 77.5946 };

    // Find today's request
    const todayStr = new Date().toISOString().split('T')[0];
    const myRequest = todaysRequests.find(r => r.customerId === user.id && r.date === todayStr);

    // Map Markers
    const markers = [];
    // 1. User Location (Fixed for demo)
    markers.push({ id: 'me', lat: 12.9750, lng: 77.5980, type: 'customer', title: 'My Home' });

    // 2. Provider Location
    if (providerStatus && providerStatus.lat) {
        markers.push({
            id: 'provider',
            lat: providerStatus.lat,
            lng: providerStatus.lng,
            type: 'provider',
            title: 'Milk Provider'
        });
    }

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Good Morning, {user.name.split(' ')[0]}!</h1>
                    <p className="text-gray-500">Here is your milk delivery status for today.</p>
                </div>
                <Link to="/customer/request">
                    <Button>
                        <Plus className="h-4 w-4 mr-2" /> Request Milk
                    </Button>
                </Link>
            </header>

            {/* Live Tracking Section */}
            <Card className="overflow-hidden border-indigo-100">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-white border-b border-indigo-50">
                    <CardTitle className="text-indigo-900 flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${providerStatus.isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                        Live Delivery Tracking
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <RealMap
                        isLive={providerStatus.isLive}
                        markers={markers}
                        center={[12.9730, 77.5960]} // Center between them
                    />
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Today's Order Status */}
                <Card>
                    <CardHeader>
                        <CardTitle>Today's Order</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {myRequest ? (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-full border border-gray-200">
                                            <Coffee className="h-6 w-6 text-brown-500" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Standard Milk</p>
                                            <p className="text-sm text-gray-500">{myRequest.quantity} Liters</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${myRequest.status === 'delivered'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {myRequest.status === 'delivered' ? 'Delivered' : 'Pending'}
                                    </span>
                                </div>
                                {myRequest.status === 'delivered' && (
                                    <p className="text-sm text-center text-green-600 mt-2">
                                        Delivered at {new Date().toLocaleTimeString()}
                                    </p>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500 mb-4">You haven't requested milk for today yet.</p>
                                <Link to="/customer/request">
                                    <Button variant="secondary">Place Request</Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Provider Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>Your Provider</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-lg">
                                P
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Provider ID: {user.selectedProviderId}</p>
                                <p className="text-sm text-gray-500">Contact your provider for support</p>
                            </div>
                        </div>
                        <Link to={`/customer/provider-profile/${user.selectedProviderId}`}>
                            <Button variant="ghost" className="w-full justify-start text-xs text-gray-500">
                                View Full Profile
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
