import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputTag from '../Costume UI Components/InputTag';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: email, password })
        });

        if (res.ok) {
            const { token } = await res.json();
            localStorage.setItem('adminToken', token); // Save for later requests
            navigate('/admin');
        } else {
            alert("نام کاربری یا رمز عبور اشتباه است");
        }
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