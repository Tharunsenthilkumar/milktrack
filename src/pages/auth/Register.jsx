import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from '../../components/common/UI';
import { Truck } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        password: '',
        address: '',
        role: 'customer',
        selectedProviderId: '' // For customer only
    });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.role === 'customer' && !formData.selectedProviderId) {
            setError('Please enter a Provider ID to link with.');
            return;
        }

        const result = register(formData);
        if (result.success) {
            // Get user to redirect
            const user = JSON.parse(localStorage.getItem('milktrack_user'));
            if (user.role === 'customer') {
                navigate('/customer/dashboard');
            } else {
                navigate('/provider/dashboard');
            }
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen bg-primary-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="bg-primary-100 p-3 rounded-full">
                            <Truck className="h-8 w-8 text-primary-600" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">Create Account</CardTitle>
                    <p className="text-gray-500">Join MilkTrack today</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'customer' })}
                                className={`p-3 text-center border rounded-lg transition-all ${formData.role === 'customer'
                                        ? 'border-primary-500 bg-primary-50 text-primary-700 font-medium'
                                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                Customer
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'provider' })}
                                className={`p-3 text-center border rounded-lg transition-all ${formData.role === 'provider'
                                        ? 'border-primary-500 bg-primary-50 text-primary-700 font-medium'
                                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                Provider
                            </button>
                        </div>

                        <Input
                            label="Full Name"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="Phone Number"
                            name="phone"
                            type="tel"
                            placeholder="1234567890"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="Address"
                            name="address"
                            placeholder="Full delivery address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        {formData.role === 'customer' && (
                            <div className="space-y-1">
                                <Input
                                    label="Provider ID"
                                    name="selectedProviderId"
                                    placeholder="e.g. PROV-2026-1234"
                                    value={formData.selectedProviderId}
                                    onChange={handleChange}
                                    required
                                />
                                <p className="text-xs text-gray-500">Ask your Milk Provider for their ID.</p>
                            </div>
                        )}

                        {error && <div className="text-red-500 text-sm">{error}</div>}

                        <Button type="submit" className="w-full" size="lg">Create Account</Button>

                        <div className="text-center text-sm text-gray-600 mt-4">
                            Already have an account? <Link to="/login" className="text-primary-600 font-medium hover:underline">Login</Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Register;
