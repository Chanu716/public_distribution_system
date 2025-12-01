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
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>

            <div className="glass-card p-8 w-full max-w-md transform transition-all hover:scale-[1.01] relative z-10 neon-border">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center shadow-react-glow-lg animate-float">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                </div>

                <h2 className="text-3xl font-bold mb-2 text-center text-white drop-shadow-lg">Welcome Back</h2>
                <p className="text-gray-400 text-center mb-8 text-sm">Enter your credentials to access your account</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="group">
                        <label className="block text-sm font-medium text-gray-300 mb-1 group-focus-within:text-react-blue transition-colors">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full glass-input p-3 rounded-xl outline-none"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div className="group">
                        <label className="block text-sm font-medium text-gray-300 mb-1 group-focus-within:text-react-blue transition-colors">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full glass-input p-3 rounded-xl outline-none"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full glass-button p-3 rounded-xl font-bold tracking-wide mt-2"
                    >
                        Sign In
                    </button>
                </form>
                <p className="mt-8 text-center text-sm text-gray-400">
                    Don't have an account? <Link to="/register" className="text-react-blue font-medium hover:text-cyan-300 transition underline-offset-4 hover:underline decoration-react-blue/50">Register now</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
