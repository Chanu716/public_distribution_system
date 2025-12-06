import { useState, useEffect } from 'react';
import api from '../api/api';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const BookingForm = ({ onBookingSuccess }) => {
    const { user } = useAuth();
    const [slotWindows, setSlotWindows] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedWindow, setSelectedWindow] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchWindows = async () => {
            try {
                const response = await api.get('/slotWindows');
                setSlotWindows(response.data);
            } catch (error) {
                toast.error('Failed to load slot windows');
            }
        };
        fetchWindows();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const month = selectedDate.substring(0, 7); // YYYY-MM
        const day = parseInt(selectedDate.substring(8, 10), 10);

        if (day > 5) {
            toast.error('Bookings are only allowed from the 1st to the 5th of the month.');
            setLoading(false);
            return;
        }

        try {
            // Check if user already has a booking for this month (active)
            const existingBookings = await api.get(`/bookings?userId=${user.id}&month=${month}`);
            const hasActiveBooking = existingBookings.data.some(b => b.status !== 'cancelled');

            if (hasActiveBooking) {
                toast.error('You already have a booking for this month.');
                setLoading(false);
                return;
            }

            // Create booking
            const newBooking = {
                userId: user.id,
                userName: user.name,
                rationCardId: user.rationCardId,
                slotDate: selectedDate,
                slotWindow: selectedWindow,
                month: month,
                status: 'booked',
                createdAt: new Date().toISOString(),
                notes: ''
            };
            console.log('Sending booking:', newBooking);

            const response = await api.post('/bookings', newBooking);
            console.log('Booking response:', response);
            toast.success('Slot booked successfully!');
            setSelectedDate('');
            setSelectedWindow('');
            onBookingSuccess();
        } catch (error) {
            toast.error('Booking failed');
        } finally {
            setLoading(false);
        }
    };

    // Get current date in YYYY-MM-DD format for min date
    const today = new Date().toISOString().split('T')[0];
    return (
        <div className="glass-card p-8 mb-6 relative overflow-hidden">
            {/* Subtle internal glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <h3 className="text-2xl font-bold mb-8 text-white border-b border-gray-800/60 pb-4 flex items-center gap-2">
                <span className="text-orange-500">●</span> Book a Ration Slot
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-orange-500 transition-colors">Select Date</label>
                    <input
                        type="date"
                        min={today}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full glass-input p-4 rounded-xl outline-none text-lg"
                        required
                    />
                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                        <span className="text-orange-500">ℹ</span> Available only from 1st to 5th of each month.
                    </p>
                </div>
                <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-orange-500 transition-colors">Select Time Slot</label>
                    <select
                        value={selectedWindow}
                        onChange={(e) => setSelectedWindow(e.target.value)}
                        className="w-full glass-input p-4 rounded-xl outline-none appearance-none text-lg"
                        required
                    >
                        <option value="" className="bg-gray-900 text-gray-400">Choose a time...</option>
                        {slotWindows.map((window) => (
                            <option key={window.id} value={window.time} className="bg-gray-900 text-white">{window.time}</option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full glass-button p-4 rounded-xl font-bold tracking-wide mt-2 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                    {loading ? 'Processing...' : 'Confirm Booking'}
                </button>
            </form>
        </div>
    );
};

export default BookingForm;
