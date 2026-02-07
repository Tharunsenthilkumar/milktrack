import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '../../components/common/UI';
import { User, Phone, MapPin, Award, Truck } from 'lucide-react';

const ProviderPublicProfile = () => {
    const { id } = useParams();
    const [provider, setProvider] = useState(null);

    useEffect(() => {
        // In a real app, fetch from API. 
        // Here we mock by checking local users (if we had a central user store)
        // For now, let's just create a mock profile based on the ID
        setProvider({
            id: id,
            name: 'Rajesh Milk Services',
            phone: '+91 98765 43210',
            address: '123, Milk Colony, Bangalore',
            rating: 4.8,
            totalDeliveries: 1250,
            experience: '5 Years',
            milkType: 'Organic Cow Milk'
        });
    }, [id]);

    if (!provider) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Provider Profile</h1>

            <Card className="border-t-4 border-t-primary-500">
                <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 text-3xl font-bold mb-4">
                            {provider.name.charAt(0)}
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">{provider.name}</h2>
                        <Badge className="mt-2 bg-green-100 text-green-700">Verified Provider</Badge>

                        <div className="grid grid-cols-2 gap-8 w-full mt-8 border-t border-b border-gray-100 py-6">
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{provider.rating} ⭐</p>
                                <p className="text-sm text-gray-500">Rating</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{provider.experience}</p>
                                <p className="text-sm text-gray-500">Experience</p>
                            </div>
                        </div>

                        <div className="w-full space-y-4 mt-6 text-left">
                            <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-gray-400" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Phone</p>
                                    <p className="text-gray-900">{provider.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5 text-gray-400" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Service Area / Depot</p>
                                    <p className="text-gray-900">{provider.address}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Truck className="h-5 w-5 text-gray-400" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Milk Type</p>
                                    <p className="text-gray-900">{provider.milkType}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProviderPublicProfile;
