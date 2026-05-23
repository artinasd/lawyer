import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputTag from '../Costume UI Components/InputTag';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate an API login call
        setTimeout(() => {
            setIsLoading(false);
            // In a real app, you'd check credentials. Here we just let them in.
            alert("ورود موفقیت‌آمیز (Frontend Simulation)");
            navigate('/admin'); // Redirect to admin panel
        }, 1000);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100" dir="rtl">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">ورود به پنل مدیریت</h2>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <InputTag
                        label="ایمیل"
                        type="email"
                        placeholder="admin@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <InputTag
                        label="رمز عبور"
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-4 bg-gray-800 hover:bg-black text-white font-bold py-3 px-4 rounded transition-colors disabled:opacity-50"
                    >
                        {isLoading ? 'در حال بررسی...' : 'ورود'}
                    </button>
                </form>
            </div>
        </div>
    );
}