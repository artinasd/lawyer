// lawyer/src/Components/Admin/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputTag from "../Costume UI Components/InputTag.jsx";

function AdminLogin() {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: user, password: pass })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                localStorage.setItem("isAdmin", "true");
                navigate("/admin");
            } else {
                alert("نام کاربری یا رمز عبور اشتباه است!");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("خطایی در ارتباط با سرور رخ داد. مطمئن شوید بک‌اندران است.");
        }
    };

    return (
        <div className='bg-gray-50 w-screen h-screen flex rtl'>
            <div className='w-[45%] bg-white shadow-md rounded-lg mx-auto my-auto h-fit p-6'>
                <InputTag
                    placeholder={'نام کاربری خود را وارد کنید'}
                    label={'نام کاربری'}
                    onChange={(e) => setUser(e.target.value)}
                />
                <br/>
                <InputTag
                    placeholder={'رمز عبور خود را وارد کنید'}
                    label={'رمز عبور'}
                    type="password"
                    onChange={(e) => setPass(e.target.value)}
                />
                <br/>
                <button
                    onClick={handleLogin}
                    className='text-white bg-indigo-600 py-2 px-4 rounded-md'>
                    ورود
                </button>
            </div>
        </div>
    )
}

export default AdminLogin;