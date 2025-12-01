import { useState } from 'react';
import api from '../api/api';
import { toast } from 'react-toastify';

const AdminBookingsTable = ({ bookings, onStatusUpdate }) => {
    const [updating, setUpdating] = useState(null);

    const handleMarkDelivered = async (bookingId) => {
        setUpdating(bookingId);
        try {
            await api.patch(`/bookings/${bookingId}`, { status: 'delivered' });
            toast.success('Marked as delivered');
            onStatusUpdate();
        } catch (error) {
            toast.error('Failed to update status');
        } finally {
            setUpdating(null);
        }
    };

    return (
        <div className="glass-card overflow-hidden neon-border">
            <div className="overflow-x-auto">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr className="bg-white/5">
                            <th className="px-5 py-4 border-b border-white/10 text-left text-xs font-bold text-react-blue uppercase tracking-wider">
                                User
                            </th>
                            <th className="px-5 py-4 border-b border-white/10 text-left text-xs font-bold text-react-blue uppercase tracking-wider">
                                Ration Card
                            </th>
                            <th className="px-5 py-4 border-b border-white/10 text-left text-xs font-bold text-react-blue uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-5 py-4 border-b border-white/10 text-left text-xs font-bold text-react-blue uppercase tracking-wider">
                                Slot
                            </th>
                            <th className="px-5 py-4 border-b border-white/10 text-left text-xs font-bold text-react-blue uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-5 py-4 border-b border-white/10 text-left text-xs font-bold text-react-blue uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {bookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-white/5 transition-colors duration-200 group">
                                <td className="px-5 py-4 text-sm">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-xs font-bold text-white border border-white/10">
                                            {booking.userName.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-white font-medium whitespace-no-wrap group-hover:text-react-blue transition-colors">{booking.userName}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-4 text-sm">
                                    <p className="text-gray-300 whitespace-no-wrap font-mono bg-black/20 px-2 py-1 rounded text-xs inline-block border border-white/5">{booking.rationCardId}</p>
                                </td>
                                <td className="px-5 py-4 text-sm">
                                    <p className="text-white whitespace-no-wrap">{booking.slotDate}</p>
                                </td>
                                <td className="px-5 py-4 text-sm">
                                    <p className="text-gray-300 whitespace-no-wrap">{booking.slotWindow}</p>
                                </td>
                                <td className="px-5 py-4 text-sm">
                                    <span className={`relative inline-block px-3 py-1 font-bold leading-tight rounded-full text-xs border shadow-sm ${booking.status === 'booked' ? 'bg-blue-500/10 text-blue-300 border-blue-500/30 shadow-blue-500/10' :
                                        booking.status === 'delivered' ? 'bg-green-500/10 text-green-300 border-green-500/30 shadow-green-500/10' :
                                            'bg-red-500/10 text-red-300 border-red-500/30 shadow-red-500/10'
                                        }`}>
                                        <span className="relative">{booking.status.toUpperCase()}</span>
                                    </span>
                                </td>
                                <td className="px-5 py-4 text-sm">
                                    {booking.status === 'booked' && (
                                        <button
                                            onClick={() => handleMarkDelivered(booking.id)}
                                            disabled={updating === booking.id}
                                            className="bg-green-500/10 text-green-400 border border-green-500/30 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-green-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {updating === booking.id ? 'Updating...' : 'Mark Delivered'}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {bookings.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-600 text-4xl mb-3">📭</div>
                    <p className="text-gray-400 text-sm">No bookings found for the selected criteria.</p>
                </div>
            )}
        </div>
    );
};

export default AdminBookingsTable;
