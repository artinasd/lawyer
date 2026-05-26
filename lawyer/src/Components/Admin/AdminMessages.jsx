// lawyer/src/Components/Admin/AdminMessages.jsx
import { useState, useEffect } from "react";

function AdminMessages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMessages = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/messages`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            if (res.ok) {
                const data = await res.json();
                setMessages(data);
            }
        } catch (error) {
            console.error("Failed to fetch messages");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("آیا از حذف این پیام مطمئن هستید؟")) return;
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/messages/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            if (res.ok) fetchMessages();
        } catch (error) {
            alert("خطا در حذف پیام");
        }
    };

    const toggleRead = async (id, currentStatus) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/messages/${id}/read`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ is_read: !currentStatus })
            });
            if (res.ok) fetchMessages();
        } catch (error) {
            alert("خطا در بروزرسانی وضعیت");
        }
    };

    if (loading) return <div className="p-10 text-center rtl">در حال بارگذاری...</div>;

    return (
        <div className="p-10 rtl min-h-[60vh] bg-gray-50">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">پیام‌های دریافتی</h1>

                {messages.length === 0 ? (
                    <div className="bg-white p-8 rounded-xl shadow-sm text-center text-gray-500">
                        پیامی یافت نشد.
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {messages.map(msg => (
                            <div key={msg.id} className={`bg-white p-6 rounded-xl shadow-sm border transition-colors ${msg.is_read ? 'border-gray-200' : 'border-blue-400 border-r-4'}`}>
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-1">{msg.subject || 'بدون موضوع'}</h3>
                                        <p className="text-sm text-gray-500">
                                            ارسال شده توسط: {msg.name} | {new Date(msg.created_at).toLocaleDateString('fa-IR')}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => toggleRead(msg.id, msg.is_read)}
                                            className={`px-3 py-1 text-sm rounded cursor-pointer transition ${msg.is_read ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}>
                                            {msg.is_read ? 'علامت به عنوان خوانده نشده' : 'علامت به عنوان خوانده شده'}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(msg.id)}
                                            className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 cursor-pointer transition">
                                            حذف
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg mb-4 text-gray-700 whitespace-pre-wrap leading-relaxed">
                                    {msg.content}
                                </div>

                                <div className="flex flex-wrap gap-6 text-sm text-gray-600 mt-2">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">ایمیل:</span>
                                        <a href={`mailto:${msg.email}`} className="text-blue-600 hover:underline" dir="ltr">{msg.email}</a>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">شماره تماس:</span>
                                        <a href={`tel:${msg.phone}`} className="text-blue-600 hover:underline" dir="ltr">{msg.phone || 'ندارد'}</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminMessages;