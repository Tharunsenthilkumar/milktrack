import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Card, Button, Badge } from '../../components/common/UI';
import { Check, X, User } from 'lucide-react';

const ExtraRequests = () => {
    const { user } = useAuth();
    const { getProviderExtraRequests, handleExtraRequest, stock } = useData();

    const requests = getProviderExtraRequests(user.providerId);

    const handleAction = (id, action) => {
        handleExtraRequest(id, action);
    };

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Extra Requests</h1>
                <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium">
                    Current Stock: {stock} L
                </div>
            </header>

            <div className="grid gap-4">
                {requests.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500">No pending extra requests.</p>
                    </div>
                ) : (
                    requests.map((req) => (
                        <Card key={req.id} className="p-4 border-l-4 border-l-purple-500">
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="flex gap-4">
                                    <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                                        <User className="h-5 w-5 text-gray-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{req.customerName}</h3>
                                        <p className="text-sm text-gray-500">Requested: <span className="font-bold text-gray-900">{req.quantity} L</span></p>
                                        <p className="text-xs text-gray-400 mt-1">{new Date(req.timestamp).toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleAction(req.id, 'rejected')}
                                    >
                                        <X className="h-4 w-4 mr-1" /> Reject
                                    </Button>
                                    <Button
                                        variant="primary" // Should represent success/accept
                                        className="bg-green-600 hover:bg-green-700"
                                        size="sm"
                                        onClick={() => handleAction(req.id, 'accepted')}
                                        disabled={stock < req.quantity}
                                    >
                                        <Check className="h-4 w-4 mr-1" /> Accept
                                    </Button>
                                </div>
                            </div>
                            {stock < req.quantity && (
                                <p className="text-xs text-red-500 mt-2 text-right">Insufficient stock to accept.</p>
                            )}
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default ExtraRequests;
