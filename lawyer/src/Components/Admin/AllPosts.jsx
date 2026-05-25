// lawyer/src/Components/Admin/AllPosts.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputTag from "../Costume UI Components/InputTag.jsx";
import TextArea from "../Costume UI Components/TextArea.jsx";
import ImageInput from "../Costume UI Components/ImageInput.jsx";

function AllPosts() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [editingPostId, setEditingPostId] = useState(null);
    const [editFormData, setEditFormData] = useState({ title: '', excerpt: '', content: '', author: '', image: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchPosts = () => {
        setLoading(true);
        fetch('http://localhost:5000/api/posts')
            .then(res => res.json())
            .then(data => {
                setPosts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching posts:", err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id, title) => {
        if (!window.confirm(`آیا از حذف مقاله "${title}" اطمینان دارید؟ این عمل غیرقابل بازگشت است و تمام پرسش‌های مربوط به آن نیز حذف خواهند شد.`)) {
            return;
        }

        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                alert("مقاله با موفقیت حذف شد.");
                fetchPosts();
            } else {
                alert("خطا در حذف مقاله.");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("خطا در ارتباط با سرور.");
        }
    };

    const handleEditClick = (post) => {
        setEditingPostId(post.id);
        setEditFormData({
            title: post.title || '',
            excerpt: post.excerpt || '',
            content: post.content || '',
            author: post.author || '',
            image: post.image || ''
        });
    };

    const handleCancelEdit = () => {
        setEditingPostId(null);
        setEditFormData({ title: '', excerpt: '', content: '', author: '', image: '' });
    };

    const handleUpdateSubmit = async () => {
        if (!editFormData.title.trim() || !editFormData.content.trim()) {
            alert("لطفا عنوان و متن مقاله را وارد کنید.");
            return;
        }

        setIsSubmitting(true);
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`http://localhost:5000/api/posts/${editingPostId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editFormData)
            });

            if (response.ok) {
                alert("مقاله با موفقیت بروزرسانی شد!");
                setEditingPostId(null);
                fetchPosts();
            } else {
                const errData = await response.json();
                alert(`خطا در بروزرسانی: ${errData.message}`);
            }
        } catch (error) {
            console.error("Backend error:", error);
            alert("خطا در ارتباط با سرور.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const getTruncatedText = (text, maxLength = 150) => {
        if (!text) return "";
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    if (loading) return <div className="p-10 rtl text-center font-bold text-gray-600 min-h-screen bg-gray-50">در حال دریافت اطلاعات...</div>;

    return (
        <div className='p-10 rtl min-h-screen bg-gray-50 overflow-x-hidden'>
            <div className="max-w-5xl mx-auto">

                {/* Header with Back Button */}
                <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
                    <h2 className='text-3xl font-bold text-gray-800'>لیست تمام پست‌ها</h2>
                    <button
                        onClick={() => navigate('/admin')}
                        className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg font-bold hover:bg-gray-300 transition-colors text-sm border border-gray-300">
                        بازگشت به پنل
                    </button>
                </div>

                <div className="grid gap-6">
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <div key={post.id} className='border border-gray-200 p-6 rounded-xl shadow-sm bg-white transition-all hover:shadow-md max-w-full'>

                                {editingPostId === post.id ? (
                                    <div className="flex flex-col gap-4">
                                        <h3 className="font-bold text-xl text-[#4038C9] mb-4 border-b pb-2">ویرایش مقاله</h3>

                                        <InputTag label='عنوان مقاله *' name="title" value={editFormData.title} onChange={(e) => setEditFormData({...editFormData, title: e.target.value})} />
                                        <InputTag label='نام نویسنده' name="author" value={editFormData.author} onChange={(e) => setEditFormData({...editFormData, author: e.target.value})} />
                                        <TextArea label='خلاصه مقاله (Excerpt)' name="excerpt" value={editFormData.excerpt} onChange={(e) => setEditFormData({...editFormData, excerpt: e.target.value})} />
                                        <TextArea label='متن مقاله *' name="content" value={editFormData.content} onChange={(e) => setEditFormData({...editFormData, content: e.target.value})} />

                                        <div className="my-4">
                                            <ImageInput
                                                label='بروزرسانی تصویر شاخص'
                                                onChange={(base64) => setEditFormData({...editFormData, image: base64})}
                                            />
                                            {editFormData.image && (
                                                <div className="mt-4">
                                                    <p className="text-sm text-gray-500 mb-2">تصویر فعلی:</p>
                                                    <img src={editFormData.image} alt="Preview" className="h-32 object-cover rounded-lg border shadow-sm" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex gap-4 mt-4">
                                            <button
                                                onClick={handleUpdateSubmit}
                                                disabled={isSubmitting}
                                                className={`flex-1 text-white p-3 rounded-lg font-bold transition-colors ${isSubmitting ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'}`}>
                                                {isSubmitting ? 'در حال ثبت...' : 'ذخیره تغییرات'}
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                className='flex-1 bg-gray-200 text-gray-700 p-3 rounded-lg font-bold hover:bg-gray-300 transition-colors'>
                                                لغو
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col md:flex-row gap-6 w-full">
                                        <div className="w-full md:w-48 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                                            {post.image ? (
                                                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">بدون تصویر</div>
                                            )}
                                        </div>

                                        <div className="flex-grow flex flex-col justify-between min-w-0">
                                            <div>
                                                <h3 className='font-bold text-xl text-gray-900 mb-2 truncate'>{post.title}</h3>
                                                <p className='text-gray-600 text-sm mb-2'>نویسنده: {post.author || 'ثبت نشده'}</p>

                                                <p className='text-gray-700 text-sm leading-relaxed break-words'>
                                                    {getTruncatedText(post.excerpt || post.content, 150)}
                                                </p>
                                            </div>

                                            <div className="flex gap-3 mt-4 justify-end border-t pt-4">
                                                <button
                                                    onClick={() => handleEditClick(post)}
                                                    className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-200 px-6 py-2 rounded-lg font-bold transition-colors text-sm">
                                                    ویرایش
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(post.id, post.title)}
                                                    className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-200 px-6 py-2 rounded-lg font-bold transition-colors text-sm">
                                                    حذف مقاله
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-xl border border-gray-200 shadow-sm">
                            <p className="text-gray-500 text-lg font-bold">پستی برای نمایش وجود ندارد.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AllPosts;