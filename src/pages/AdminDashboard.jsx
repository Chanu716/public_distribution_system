import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';
import AdminBookingsTable from '../components/AdminBookingsTable';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [filterDate, setFilterDate] = useState('');
    const navigate = useNavigate();

    const fetchBookings = async () => {
        try {
            let url = '/bookings?_sort=slotDate&_order=desc';
            if (filterDate) {
                url += `&slotDate=${filterDate}`;
            }
            const response = await api.get(url);
            setBookings(response.data);
        } catch (error) {
            toast.error('Failed to fetch bookings');
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [filterDate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-orange-500/3 rounded-full blur-[140px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-orange-600/3 rounded-full blur-[140px] pointer-events-none"></div>

            <nav className="glass sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-white drop-shadow-md tracking-wide">
                                Admin<span className="text-orange-500">Portal</span>
                            </h1>
                        </div>
                        <div className="flex items-center space-x-6">
                            <span className="text-gray-300 font-medium hidden sm:block">Administrator</span>
                            <button
                                onClick={handleLogout}
                                className="glass-button px-4 py-2 rounded-xl text-sm"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                        <span className="text-orange-500">●</span> All Bookings
                    </h2>

                    <div className="flex items-center glass-card p-3 px-5">
                        <label className="mr-3 font-medium text-gray-300 text-base">Filter by Date:</label>
                        <input
                            type="date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className="glass-input p-2 rounded-lg text-sm outline-none"
                        />
                        {filterDate && (
                            <button
                                onClick={() => setFilterDate('')}
                                className="ml-3 text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                <AdminBookingsTable bookings={bookings} onStatusUpdate={fetchBookings} />
            </main>
        </div>
    );
};

export default AdminDashboard;
