import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (user.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/user/dashboard');
            }
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.get(`/users?email=${email.trim()}&password=${password.trim()}`);
            if (response.data.length > 0) {
                const loggedInUser = response.data[0];
                login(loggedInUser);
                toast.success('Login successful!');
            } else {
                toast.error('Invalid credentials');
            }
        } catch (error) {
            toast.error('Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-[120px]"></div>

            <div className="glass-card p-12 w-full max-w-2xl transform transition-all hover:scale-[1.005] relative z-10">
                <div className="flex justify-center mb-8">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                        <svg className="w-11 h-11 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                </div>

                <h2 className="text-3xl font-bold mb-3 text-center text-white">Welcome Back</h2>
                <p className="text-gray-400 text-center mb-10 text-base">Enter your credentials to access your account</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="group">
                        <label className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-orange-500 transition-colors">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full glass-input p-4 rounded-xl outline-none text-lg"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div className="group">
                        <label className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-orange-500 transition-colors">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full glass-input p-4 rounded-xl outline-none text-lg"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full glass-button p-4 rounded-xl font-bold tracking-wide mt-2 text-lg"
                    >
                        Sign In
                    </button>
                </form>
                <p className="mt-8 text-center text-sm text-gray-400">
                    Don't have an account? <Link to="/register" className="text-orange-500 font-medium hover:text-orange-400 transition underline-offset-4 hover:underline">Register now</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
