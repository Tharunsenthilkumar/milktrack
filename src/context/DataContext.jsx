import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const { user } = useAuth();

    // Data States
    const [todaysRequests, setTodaysRequests] = useState([]);
    const [deliveryHistory, setDeliveryHistory] = useState([]);
    const [extraRequests, setExtraRequests] = useState([]);
    const [stock, setStock] = useState(0);

    // Load initial data
    useEffect(() => {
        if (!user) return;

        // Load from LocalStorage
        // In a real app, we would filter by user ID or Provider ID here
        // For mock, we'll load everything and filter in memory for simplicity or load specific keys

        refreshData();
    }, [user]);

    const refreshData = () => {
        const allRequests = JSON.parse(localStorage.getItem('milktrack_requests') || '[]');
        const allHistory = JSON.parse(localStorage.getItem('milktrack_history') || '[]');
        const allExtra = JSON.parse(localStorage.getItem('milktrack_extra_requests') || '[]');
        const stocks = JSON.parse(localStorage.getItem('milktrack_stocks') || '{}');

        setTodaysRequests(allRequests);
        setDeliveryHistory(allHistory);
        setExtraRequests(allExtra);

        if (user?.role === 'provider') {
            setStock(stocks[user.id] || 0);
        }
    };

    // Provider: Update Stock
    const updateStock = (newStock) => {
        if (user?.role !== 'provider') return;

        const stocks = JSON.parse(localStorage.getItem('milktrack_stocks') || '{}');
        stocks[user.id] = newStock;
        localStorage.setItem('milktrack_stocks', JSON.stringify(stocks));
        setStock(newStock);
    };

    // Customer: Request Milk (Normal Daily Request)
    const submitRequest = (quantity) => {
        if (user?.role !== 'customer') return;

        const requests = JSON.parse(localStorage.getItem('milktrack_requests') || '[]');

        // Remove existing request for today if any
        const today = new Date().toISOString().split('T')[0];
        const filtered = requests.filter(r => !(r.customerId === user.id && r.date === today));

        const newRequest = {
            id: Date.now().toString(),
            customerId: user.id,
            customerName: user.name,
            address: user.address,
            providerId: user.selectedProviderId, // Assumes user has this linked
            quantity: parseFloat(quantity),
            date: today,
            status: 'pending', // pending, delivered
            type: 'regular'
        };

        filtered.push(newRequest);
        localStorage.setItem('milktrack_requests', JSON.stringify(filtered));
        setTodaysRequests(filtered);
        return newRequest;
    };

    // Customer: Request Extra Milk
    const requestExtraMilk = (quantity) => {
        if (user?.role !== 'customer') return;

        const extras = JSON.parse(localStorage.getItem('milktrack_extra_requests') || '[]');

        const newExtra = {
            id: `EXT-${Date.now()}`,
            customerId: user.id,
            customerName: user.name,
            address: user.address,
            providerId: user.selectedProviderId,
            quantity: parseFloat(quantity),
            status: 'pending', // pending, accepted, rejected
            timestamp: new Date().toISOString()
        };

        extras.push(newExtra);
        localStorage.setItem('milktrack_extra_requests', JSON.stringify(extras));
        setExtraRequests(extras);
        return newExtra;
    };

    // Provider: Accept/Reject Extra Request
    const handleExtraRequest = (requestId, action) => { // action: 'accepted' | 'rejected'
        const extras = JSON.parse(localStorage.getItem('milktrack_extra_requests') || '[]');
        const updatedExtras = extras.map(req => {
            if (req.id === requestId) {
                return { ...req, status: action };
            }
            return req;
        });

        localStorage.setItem('milktrack_extra_requests', JSON.stringify(updatedExtras));
        setExtraRequests(updatedExtras);

        // If accepted, reduce stock
        if (action === 'accepted') {
            const req = extras.find(r => r.id === requestId);
            if (req) {
                const currentStock = stock - req.quantity;
                updateStock(currentStock);
            }
        }
    };

    // Provider: Mark Delivered
    const markDelivered = (requestId) => {
        const requests = JSON.parse(localStorage.getItem('milktrack_requests') || '[]');
        const updatedRequests = requests.map(req => {
            if (req.id === requestId) {
                return { ...req, status: 'delivered' };
            }
            return req;
        });
        localStorage.setItem('milktrack_requests', JSON.stringify(updatedRequests));
        setTodaysRequests(updatedRequests);

        // Add to history
        const history = JSON.parse(localStorage.getItem('milktrack_history') || '[]');
        const req = requests.find(r => r.id === requestId);
        if (req) {
            history.push({ ...req, status: 'delivered', completionTime: new Date().toISOString() });
            localStorage.setItem('milktrack_history', JSON.stringify(history));
            setDeliveryHistory(history);

            // Reduce stock for regular orders if not already accounted for (assuming stock is for TODAY)
            // Simplification: We assume stock reduces as we deliver
            if (user.role === 'provider') {
                updateStock(stock - req.quantity);
            }
        }
    };

    // Get functions for UI to filter
    const getCustomerRequests = (customerId) => {
        return todaysRequests.filter(r => r.customerId === customerId);
    };

    const getProviderRequests = (providerId) => { // Today's regular requests
        const today = new Date().toISOString().split('T')[0];
        return todaysRequests.filter(r => r.providerId === providerId && r.date === today);
    };

    const getProviderExtraRequests = (providerId) => {
        return extraRequests.filter(r => r.providerId === providerId && r.status === 'pending');
    };

    return (
        <DataContext.Provider value={{
            todaysRequests,
            deliveryHistory,
            extraRequests,
            stock,
            updateStock,
            submitRequest,
            requestExtraMilk,
            handleExtraRequest,
            markDelivered,
            getCustomerRequests,
            getProviderRequests,
            getProviderExtraRequests,
            refreshData
        }}>
            {children}
        </DataContext.Provider>
    );
};
