import api from '../api/api';
import { toast } from 'react-toastify';

const BookingCard = ({ booking, onCancel }) => {
    const handleCancel = async () => {
        console.log('Attempting to cancel booking:', booking.id);
        try {
            await api.delete(`/bookings/${booking.id}`);
            toast.success('Booking cancelled');
            onCancel();
        } catch (error) {
            console.error('Cancel error:', error);
            toast.error('Failed to cancel booking');
        }
    };

    const isPast = new Date(booking.slotDate) < new Date();
    const canCancel = !isPast && booking.status !== 'cancelled' && booking.status !== 'delivered';


    return (
        <div className="glass-card p-6 mb-4 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg group">
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-orange-500 text-lg">📅</span>
                        <p className="font-bold text-xl text-white group-hover:text-orange-500 transition-colors">{booking.slotDate}</p>
                    </div>
                    <p className="text-gray-300 flex items-center gap-2 text-base">
                        <span className="text-gray-500">⏰</span> {booking.slotWindow}
                    </p>
                    <p className="text-xs text-gray-500 mt-2 ml-6">Month: {booking.month}</p>
                    <div className="mt-3 ml-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide border shadow-sm ${booking.status === 'booked' ? 'bg-orange-500/10 text-orange-400 border-orange-500/30' :
                            booking.status === 'delivered' ? 'bg-green-500/10 text-green-300 border-green-500/30 shadow-green-500/10' :
                                'bg-red-500/10 text-red-300 border-red-500/30 shadow-red-500/10'
                            }`}>
                            {booking.status.toUpperCase()}
                        </span>
                    </div>
                </div>
                {canCancel && (
                    <button
                        onClick={handleCancel}
                        className="bg-red-500/10 text-red-400 border border-red-500/30 px-4 py-2 rounded-xl text-sm hover:bg-red-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-red-500/30"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </div>
    );
};

export default BookingCard;
