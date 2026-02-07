import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Card, CardHeader, CardTitle, CardContent, Button, Input } from '../../components/common/UI';
import { Milk, Users, Truck, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();
    const { stock, updateStock, getProviderRequests, getProviderExtraRequests } = useData();
    const [newStock, setNewStock] = useState('');

    const todaysRequests = getProviderRequests(user.providerId);
    const pendingExtras = getProviderExtraRequests(user.providerId);

    const totalNeeded = todaysRequests.reduce((sum, req) => sum + req.quantity, 0);
    const pendingDeliveries = todaysRequests.filter(r => r.status === 'pending').length;

    const handleUpdateStock = (e) => {
        e.preventDefault();
        if (newStock) {
            updateStock(parseFloat(newStock));
            setNewStock('');
        }
    }

    return (
        <div className="space-y-6">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Provider Dashboard</h1>
                    <p className="text-gray-500">Manage your daily distribution.</p>
                </div>
                <div className="flex items-center gap-4 bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
                    <span className="text-sm font-medium text-gray-500 ml-2">Your ID:</span>
                    <code className="bg-primary-50 text-primary-700 font-bold px-2 py-1 rounded">{user.providerId}</code>
                </div>
            </header>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Stock"
                    value={`${stock} L`}
                    icon={Milk}
                    color="text-blue-500"
                    bgColor="bg-blue-50"
                />
                <StatCard
                    title="Today's Demand"
                    value={`${totalNeeded} L`}
                    icon={Users}
                    color="text-green-500"
                    bgColor="bg-green-50"
                />
                <StatCard
                    title="Pending Deliveries"
                    value={pendingDeliveries}
                    icon={Truck}
                    color="text-orange-500"
                    bgColor="bg-orange-50"
                />
                <StatCard
                    title="Extra Requests"
                    value={pendingExtras.length}
                    icon={AlertCircle}
                    color="text-purple-500"
                    bgColor="bg-purple-50"
                />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Stock Management */}
                <Card className="md:col-span-1">
                    <CardHeader>
                        <CardTitle>Update Stock</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleUpdateStock} className="space-y-4">
                            <Input
                                label="Add Available Milk (Liters)"
                                type="number"
                                placeholder="Enter quantity"
                                value={newStock}
                                onChange={(e) => setNewStock(e.target.value)}
                            />
                            <Button type="submit" className="w-full">Update Stock</Button>
                        </form>
                        <div className="mt-4 p-4 bg-yellow-50 rounded-lg text-sm text-yellow-800">
                            <strong>Note:</strong> Updating stock will overwrite the current available amount.
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="md:col-span-2 grid gap-4">
                    <Card className="flex flex-col justify-center items-center p-6 text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/provider/route'}>
                        <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                            <Truck className="h-8 w-8 text-primary-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Start Delivery Route</h3>
                        <p className="text-gray-500">View customer list and mark deliveries</p>
                    </Card>

                    {pendingExtras.length > 0 && (
                        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <AlertCircle className="h-5 w-5 text-purple-600" />
                                <span className="text-purple-900 font-medium">You have {pendingExtras.length} pending extra request(s)</span>
                            </div>
                            <Link to="/provider/requests">
                                <Button size="sm" variant="secondary">View</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon: Icon, color, bgColor }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
        <div className={`p-3 rounded-full ${bgColor}`}>
            <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
    </div>
);

export default Dashboard;
