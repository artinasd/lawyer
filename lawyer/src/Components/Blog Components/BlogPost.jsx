import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import loadingGif from '../../assets/loadingGif.gif'; // Ensure path is correct

export default function BlogPost() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Scroll to top when post changes
        window.scrollTo(0, 0);
        setLoading(true);

        // Mock backend fetch
        setTimeout(() => {
            setPost({
                id: postId,
                title: `عنوان تستی برای مقاله شماره ${postId}`,
                content: `این یک متن تستی است که نشان می‌دهد روتینگ به درستی کار می‌کند. شما در حال مشاهده مقاله ${postId} هستید. وقتی روی مقالات دیگر در سایدبار کلیک کنید، صفحه رفرش نمی‌شود بلکه فقط این متن تغییر می‌کند.`,
                date: '۱۴۰۲/۰۸/۱۵',
                author: 'ارتین'
            });
            setLoading(false);
        }, 600); // 600ms mock network delay

    }, [postId]); // <--- CRITICAL FIX: React watches this variable to trigger re-renders

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <img src={loadingGif} alt="در حال بارگذاری..." className="w-16 h-16" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4 flex flex-col md:flex-row gap-8 mt-10" dir="rtl">
            {/* Main Content */}
            <main className="md:w-3/4 bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-4xl font-bold mb-4 text-[#D4AF37]">{post.title}</h1>
                <div className="flex gap-4 text-gray-500 text-sm mb-8 border-b pb-4">
                    <span>نویسنده: {post.author}</span>
                    <span>تاریخ: {post.date}</span>
                </div>
                <div className="text-gray-800 leading-loose text-lg">
                    {post.content}
                </div>
            </main>

            {/* Sidebar / Other Posts */}
            <aside className="md:w-1/4">
                <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                    <h3 className="text-xl font-bold mb-4 border-b-2 border-[#D4AF37] pb-2">سایر مقالات</h3>
                    <ul className="flex flex-col gap-3">
                        {/* Mock sidebar links - clicking these will NOT reload the page anymore */}
                        <li><Link to="/blog/1" className="text-blue-600 hover:text-blue-800 transition">مقاله حقوقی شماره ۱</Link></li>
                        <li><Link to="/blog/2" className="text-blue-600 hover:text-blue-800 transition">قوانین جدید مالیات</Link></li>
                        <li><Link to="/blog/3" className="text-blue-600 hover:text-blue-800 transition">راهنمای ثبت شرکت</Link></li>
                    </ul>
                </div>
            </aside>
        </div>
    );
}