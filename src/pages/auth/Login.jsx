import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from '../../components/common/UI';
import { Truck, Milk } from 'lucide-react';

const Login = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = login(phone, password);
        if (result.success) {
            // Determine where to redirect based on role
            // We need to fetch the user again or rely on the fact that login sets the state
            // Since login is synchronous in our mock, we can just check the storage or user state
            // However, the context state update might be async in React.
            // Ideally login returns the user object.
            // Start simple:
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
                    <CardTitle className="text-2xl font-bold text-gray-900">Welcome Back</CardTitle>
                    <p className="text-gray-500">Login to your MilkTrack account</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Phone Number"
                            type="tel"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <div className="text-red-500 text-sm">{error}</div>}

                        <Button type="submit" className="w-full" size="lg">Sign In</Button>

                        <div className="text-center text-sm text-gray-600 mt-4">
                            Don't have an account? <Link to="/register" className="text-primary-600 font-medium hover:underline">Register</Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
