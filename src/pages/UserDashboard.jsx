import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';
import BookingForm from '../components/BookingForm';
import BookingCard from '../components/BookingCard';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const { user, logout } = useAuth();
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    const fetchBookings = async () => {
        try {
            const response = await api.get(`/bookings?userId=${user.id}&_sort=slotDate&_order=desc`);
            // Filter out cancelled bookings from the display
            const activeBookings = response.data.filter(b => b.status !== 'cancelled');
            setBookings(activeBookings);
        } catch (error) {
            console.error('Fetch bookings error:', error);
            toast.error('Failed to fetch bookings');
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [user.id]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-500/3 rounded-full blur-[140px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-600/3 rounded-full blur-[140px] pointer-events-none"></div>

            {/* Navbar */}
            <nav className="glass sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-white drop-shadow-md tracking-wide">
                                Ration<span className="text-orange-500">Booking</span>
                            </h1>
                        </div>
                        <div className="flex items-center space-x-6">
                            <span className="text-gray-300 font-medium hidden sm:block">Welcome, <span className="text-orange-500">{user.name}</span></span>
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
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Left Column: Booking Form */}
                    <div className="lg:col-span-2">
                        <BookingForm onBookingSuccess={fetchBookings} />
                    </div>

                    {/* Right Column: Bookings List */}
                    <div className="lg:col-span-3">
                        <div className="glass-card p-8 min-h-[600px]">
                            <h2 className="text-2xl font-bold mb-8 text-white border-b border-gray-800/60 pb-4 flex items-center gap-2">
                                <span className="text-orange-500">●</span> My Bookings
                            </h2>
                            {bookings.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="text-gray-600 text-6xl mb-4 animate-pulse">📅</div>
                                    <p className="text-gray-300 text-lg font-medium">No active bookings found.</p>
                                    <p className="text-gray-500 text-sm mt-2">Book a slot to get started.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {bookings.map((booking) => (
                                        <BookingCard
                                            key={booking.id}
                                            booking={booking}
                                            onCancel={fetchBookings}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;
