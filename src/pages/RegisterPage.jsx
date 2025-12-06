import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';
import { toast } from 'react-toastify';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        rationCardId: '',
    });
    const { login, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/user/dashboard');
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const checkUser = await api.get(`/users?email=${formData.email}`);
            if (checkUser.data.length > 0) {
                toast.error('User already exists with this email');
                return;
            }

            const newUser = {
                ...formData,
                role: 'user',
            };

            const response = await api.post('/users', newUser);
            if (response.status === 201) {
                login(response.data);
                toast.success('Registration successful!');
            }
        } catch (error) {
            console.error('Registration error:', error);
            toast.error('Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-[120px]"></div>

            <div className="glass-card p-10 w-full max-w-2xl transform transition-all hover:scale-[1.005] relative z-10">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                        <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                </div>

                <h2 className="text-3xl font-bold mb-2 text-center text-white">Create Account</h2>
                <p className="text-gray-400 text-center mb-6 text-sm">Join us to manage your ration bookings</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="group">
                        <label className="block text-sm font-medium text-gray-300 mb-1 group-focus-within:text-orange-500 transition-colors">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full glass-input p-4 rounded-xl outline-none text-lg"
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <div className="group">
                        <label className="block text-sm font-medium text-gray-300 mb-1 group-focus-within:text-orange-500 transition-colors">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full glass-input p-4 rounded-xl outline-none text-lg"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div className="group">
                        <label className="block text-sm font-medium text-gray-300 mb-1 group-focus-within:text-orange-500 transition-colors">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full glass-input p-3 rounded-xl outline-none"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <div className="group">
                        <label className="block text-sm font-medium text-gray-300 mb-1 group-focus-within:text-orange-500 transition-colors">Ration Card ID</label>
                        <input
                            type="text"
                            name="rationCardId"
                            value={formData.rationCardId}
                            onChange={handleChange}
                            className="w-full glass-input p-3 rounded-xl outline-none"
                            placeholder="RC123456"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full glass-button p-3 rounded-xl font-bold tracking-wide mt-2"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-400">
                    Already have an account? <Link to="/login" className="text-orange-500 font-medium hover:text-orange-400 transition underline-offset-4 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
