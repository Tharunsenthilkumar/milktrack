import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent, Button, Input } from '../../components/common/UI';

const Profile = () => {
    const { user, getProviderById } = useAuth();

    const provider = user.selectedProviderId ? getProviderById(user.selectedProviderId) : null;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="h-20 w-20 bg-primary-200 rounded-full flex items-center justify-center text-2xl font-bold text-primary-700">
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">{user.name}</h3>
                            <p className="text-gray-500">{user.role}</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <Input label="Phone Number" value={user.phone} readOnly className="bg-gray-50" />
                        <Input label="Address" value={user.address} readOnly className="bg-gray-50" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>My Milk Provider</CardTitle>
                </CardHeader>
                <CardContent>
                    {provider ? (
                        <div className="space-y-4">
                            <div className="flex justify-between border-b border-gray-100 pb-4">
                                <span className="text-gray-500">Provider Name</span>
                                <span className="font-medium">{provider.name}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 pb-4">
                                <span className="text-gray-500">Provider Phone</span>
                                <span className="font-medium">{provider.phone}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Provider ID</span>
                                <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">{provider.providerId}</span>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500">No provider information found. Please ensure you have a valid Provider ID linked.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Profile;
