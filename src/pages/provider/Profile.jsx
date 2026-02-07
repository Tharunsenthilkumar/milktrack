import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent, Input, Button } from '../../components/common/UI';
import { Copy } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();

    const copyId = () => {
        navigator.clipboard.writeText(user.providerId);
        alert('Provider ID copied!');
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>

            {/* Provider ID Card - Prominent */}
            <Card className="bg-indigo-50 border-indigo-200">
                <CardHeader>
                    <CardTitle className="text-indigo-900">Your Provider ID</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <code className="flex-1 bg-white p-4 rounded-lg border border-indigo-100 text-2xl font-mono text-center tracking-wider font-bold text-indigo-700">
                            {user.providerId}
                        </code>
                        <Button variant="secondary" onClick={copyId} title="Copy ID">
                            <Copy className="h-5 w-5" />
                        </Button>
                    </div>
                    <p className="text-sm text-indigo-600 mt-2 text-center">Share this ID with your customers so they can link to you.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Account Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input label="Name" value={user.name} readOnly className="bg-gray-50" />
                    <Input label="Phone Number" value={user.phone} readOnly className="bg-gray-50" />
                    <Input label="Role" value="Milk Provider" readOnly className="bg-gray-50" />
                    <Input label="Address / Region" value={user.address} readOnly className="bg-gray-50" />
                </CardContent>
            </Card>
        </div>
    );
};

export default Profile;
