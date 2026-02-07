import React from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Card, Badge } from '../../components/common/UI';

const History = () => {
    const { deliveryHistory } = useData();
    const { user } = useAuth();

    // Filter history for this provider
    // In a real app the backend filters, here we assume deliveryHistory contains sufficient info or we filter by providerId
    // But our deliveryHistory items have 'providerId' if they were created correctly in DataContext.
    // Let's check DataContext.submitRequest -- yes it adds providerId.

    const myHistory = deliveryHistory.filter(h => h.providerId === user.providerId).sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Delivery History</h1>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-medium text-gray-500">Date</th>
                            <th className="p-4 font-medium text-gray-500">Customer</th>
                            <th className="p-4 font-medium text-gray-500">Quantity</th>
                            <th className="p-4 font-medium text-gray-500">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {myHistory.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-8 text-center text-gray-500">No delivery history records found.</td>
                            </tr>
                        ) : (
                            myHistory.map((item, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="p-4 text-gray-900">
                                        {new Date(item.date).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 text-gray-900">{item.customerName}</td>
                                    <td className="p-4 text-gray-600">{item.quantity} L</td>
                                    <td className="p-4">
                                        <Badge variant="success">Delivered</Badge>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default History;
