// lawyer/src/Components/Admin/NewPost.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputTag from "../Costume UI Components/InputTag.jsx";
import TextArea from "../Costume UI Components/TextArea.jsx";
import ImageInput from "../Costume UI Components/ImageInput.jsx";

function NewPost() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ title: '', excerpt: '', content: '', author: '', image: '' });
    const [loading, setLoading] = useState(false);

    const handleAddPost = async () => {
        if (!formData.title.trim() || !formData.content.trim()) {
            alert("لطفا عنوان و متن مقاله را وارد کنید. (Title and Content are required)");
            return;
        }

        if ((formData.image?.length || 0) > 4000000) {
            alert("حجم تصویر بیش از حد مجاز است. لطفا تصویر کوچکتری انتخاب کنید.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            alert("شما وارد نشده‌اید. لطفا ابتدا وارد شوید.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.status === 401 || response.status === 403) {
                alert("دسترسی غیرمجاز یا توکن منقضی شده است. لطفا دوباره وارد شوید.");
                return;
            }

            if (response.ok) {
                alert("مقاله با موفقیت در دیتابیس ذخیره شد!");
                setFormData({ title: '', excerpt: '', content: '', author: '', image: '' });
            } else {
                const errorData = await response.json();
                alert(`خطا در ثبت مقاله: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Backend error:", error);
            alert("خطا در ارتباط با سرور.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='bg-gray-50 min-h-screen p-20 rtl'>
            <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-8 mx-auto w-full md:w-[60%] flex flex-col gap-4'>

                {/* Header with Back Button */}
                <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
                    <h2 className="text-2xl font-bold text-gray-800">ثبت مقاله جدید</h2>
                    <button
                        onClick={() => navigate('/admin')}
                        className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors text-sm border border-gray-200">
                        بازگشت به پنل
                    </button>
                </div>

                <InputTag label='عنوان مقاله *' name="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />

                <InputTag label='نام نویسنده' name="author" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} />
                <TextArea label='خلاصه مقاله (Excerpt)' name="excerpt" value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} />

                <TextArea label='متن مقاله *' name="content" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} />

                <ImageInput
                    label='تصویر شاخص'
                    onChange={(base64) => setFormData({...formData, image: base64})}
                />

                <button
                    onClick={handleAddPost}
                    disabled={loading}
                    className={`text-white p-4 rounded-lg mt-6 w-full font-bold transition-colors ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                    {loading ? 'در حال ثبت...' : 'ثبت در دیتابیس'}
                </button>
            </div>
        </div>
    );
}

export default NewPost;