import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from '../../components/common/UI';
import { useNavigate } from 'react-router-dom';
import { Droplet, PlusCircle } from 'lucide-react';

const RequestMilk = () => {
    const { submitRequest, requestExtraMilk } = useData();
    const navigate = useNavigate();

    // States
    const [quantity, setQuantity] = useState(1.0);
    const [extraQuantity, setExtraQuantity] = useState(0.5);
    const [tab, setTab] = useState('daily'); // daily | extra
    const [successMsg, setSuccessMsg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (tab === 'daily') {
            submitRequest(quantity);
            setSuccessMsg('Daily request updated successfully!');
        } else {
            requestExtraMilk(extraQuantity);
            setSuccessMsg('Extra request sent to provider!');
        }

        setTimeout(() => {
            navigate('/customer/dashboard');
        }, 1500);
    };

    const quantities = [0.5, 1.0, 1.5, 2.0, 3.0];

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Request Milk</h1>

            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <button
                    onClick={() => setTab('daily')}
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${tab === 'daily' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'
                        }`}
                >
                    Daily Quantity
                </button>
                <button
                    onClick={() => setTab('extra')}
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${tab === 'extra' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'
                        }`}
                >
                    Request Extra
                </button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        {tab === 'daily' ? <Droplet className="h-5 w-5 text-blue-500" /> : <PlusCircle className="h-5 w-5 text-purple-500" />}
                        {tab === 'daily' ? 'Set Today\'s Quantity' : 'One-time Extra Request'}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Quantity Selector */}
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                            {quantities.map(q => (
                                <button
                                    key={q}
                                    type="button"
                                    onClick={() => tab === 'daily' ? setQuantity(q) : setExtraQuantity(q)}
                                    className={`py-3 px-2 rounded-lg border-2 text-center transition-all ${(tab === 'daily' ? quantity : extraQuantity) === q
                                            ? 'border-primary-500 bg-primary-50 text-primary-700 font-bold'
                                            : 'border-gray-100 bg-white hover:border-gray-200'
                                        }`}
                                >
                                    {q} L
                                </button>
                            ))}
                        </div>

                        {/* Custom Input */}
                        <div className="pt-4 border-t border-gray-100">
                            <Input
                                label="Custom Amount (Liters)"
                                type="number"
                                step="0.1"
                                min="0.1"
                                max="10"
                                value={tab === 'daily' ? quantity : extraQuantity}
                                onChange={(e) => tab === 'daily' ? setQuantity(e.target.value) : setExtraQuantity(e.target.value)}
                            />
                        </div>

                        {successMsg && (
                            <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm font-medium text-center">
                                {successMsg}
                            </div>
                        )}

                        <Button type="submit" size="lg" className="w-full">
                            {tab === 'daily' ? 'Update Daily Request' : 'Send Extra Request'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default RequestMilk;
