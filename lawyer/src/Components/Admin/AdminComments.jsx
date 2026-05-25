// lawyer/src/Components/Admin/AdminComments.jsx
import React, { useState, useEffect } from 'react';

function AdminComments() {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchComments = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch('http://localhost:5000/api/admin/comments', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setComments(data);
            }
        } catch (error) {
            console.error("Error fetching admin comments:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const handleUpdateComment = async (id, newStatus, currentReply) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:5000/api/admin/comments/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus, reply: currentReply })
            });

            if (response.ok) {
                alert("وضعیت نظر با موفقیت بروزرسانی شد.");
                fetchComments(); // Refresh list
            } else {
                alert("خطا در بروزرسانی.");
            }
        } catch (error) {
            alert("خطا در ارتباط با سرور.");
        }
    };

    const handleReplyChange = (id, text) => {
        setComments(comments.map(c => c.id === id ? { ...c, reply: text } : c));
    };

    if (loading) return <div className="p-10 rtl text-center font-bold">در حال دریافت اطلاعات...</div>;

    return (
        <div className='p-10 rtl bg-gray-50 min-h-screen'>
            <div className="max-w-6xl mx-auto">
                <h1 className='text-3xl font-bold mb-8 text-gray-800 border-b pb-4'>مدیریت پرسش‌ها و نظرات</h1>

                {comments.length === 0 ? (
                    <p className="text-gray-500">نظری برای بررسی وجود ندارد.</p>
                ) : (
                    <div className="flex flex-col gap-6">
                        {comments.map((comment) => (
                            <div key={comment.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-4">
                                <div className="flex justify-between items-start border-b pb-4">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">فرستنده: {comment.name}</h3>
                                        <p className="text-sm text-gray-500 mt-1">مقاله: {comment.post_title}</p>
                                    </div>
                                    <div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                                            comment.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                comment.status === 'declined' ? 'bg-red-100 text-red-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {comment.status === 'approved' ? 'تایید شده' :
                                                comment.status === 'declined' ? 'رد شده' : 'در انتظار تایید'}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-gray-800 text-lg whitespace-pre-wrap">{comment.content}</p>

                                {/* Lawyer's Reply Section */}
                                <div className="mt-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <label className="block font-bold text-sm text-gray-700 mb-2">پاسخ شما (به عنوان وکیل):</label>
                                    <textarea
                                        rows="3"
                                        value={comment.reply || ''}
                                        onChange={(e) => handleReplyChange(comment.id, e.target.value)}
                                        className="w-full p-3 border rounded focus:ring-2 focus:ring-purple-500 outline-none"
                                        placeholder="پاسخ حقوقی خود را اینجا بنویسید..."
                                    />
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 justify-end mt-2">
                                    {comment.status !== 'approved' && (
                                        <button
                                            onClick={() => handleUpdateComment(comment.id, 'approved', comment.reply)}
                                            className="bg-green-600 text-white px-6 py-2 rounded font-bold hover:bg-green-700">
                                            تایید و انتشار
                                        </button>
                                    )}
                                    {comment.status !== 'declined' && (
                                        <button
                                            onClick={() => handleUpdateComment(comment.id, 'declined', comment.reply)}
                                            className="bg-red-600 text-white px-6 py-2 rounded font-bold hover:bg-red-700">
                                            رد کردن (عدم نمایش)
                                        </button>
                                    )}
                                    {/* Button to just save reply without changing status */}
                                    <button
                                        onClick={() => handleUpdateComment(comment.id, comment.status, comment.reply)}
                                        className="bg-gray-200 text-gray-800 px-6 py-2 rounded font-bold hover:bg-gray-300 border border-gray-300">
                                        ذخیره تغییرات
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminComments;