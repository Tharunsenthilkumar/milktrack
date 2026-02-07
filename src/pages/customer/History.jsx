import React from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '../../components/common/UI';

const History = () => {
    const { deliveryHistory, extraRequests, getCustomerRequests } = useData();
    const { user } = useAuth();

    // Get my delivery history
    const myHistory = deliveryHistory.filter(h => h.customerId === user.id).sort((a, b) => new Date(b.date) - new Date(a.date));

    // Get my extra requests
    const myExtras = extraRequests.filter(h => h.customerId === user.id).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-gray-900">Delivery History</h1>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Regular Deliveries - Takes up 2 cols */}
                <div className="md:col-span-2 space-y-4">
                    <h2 className="text-lg font-semibold text-gray-700">Daily Deliveries</h2>
                    {myHistory.length === 0 ? (
                        <div className="bg-white p-6 rounded-lg border border-gray-200 text-center text-gray-500">
                            No delivery history yet.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {myHistory.map((item, idx) => (
                                <Card key={idx} className="flex items-center justify-between p-4">
                                    <div>
                                        <p className="font-medium text-gray-900">{new Date(item.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                        <p className="text-sm text-gray-500">{item.quantity} Liters</p>
                                    </div>
                                    <Badge variant="success">Delivered</Badge>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* Extra Requests - Takes up 1 col */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-700">Extra Requests</h2>
                    {myExtras.length === 0 ? (
                        <div className="bg-white p-6 rounded-lg border border-gray-200 text-center text-gray-500">
                            No extra requests.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {myExtras.map((item, idx) => (
                                <Card key={idx} className="p-4 space-y-2">
                                    <div className="flex justify-between items-start">
                                        <span className="font-medium">{item.quantity} L</span>
                                        <Badge variant={
                                            item.status === 'accepted' ? 'success' :
                                                item.status === 'rejected' ? 'danger' : 'warning'
                                        }>
                                            {item.status}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-gray-400">
                                        {new Date(item.timestamp).toLocaleDateString()}
                                    </p>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default History;
