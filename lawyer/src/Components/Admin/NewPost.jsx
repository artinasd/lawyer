// lawyer/src/Components/Admin/NewPost.jsx
import React, { useState } from 'react';
import InputTag from "../Costume UI Components/InputTag.jsx";
import TextArea from "../Costume UI Components/TextArea.jsx";
import ImageInput from "../Costume UI Components/ImageInput.jsx";

function NewPost() {
    const [formData, setFormData] = useState({ title: '', excerpt: '', content: '', author: '', image: '' });
    const [loading, setLoading] = useState(false);

    const handleAddPost = async () => {
        // 1. Validate required fields
        if (!formData.title.trim() || !formData.content.trim()) {
            alert("لطفا عنوان و متن مقاله را وارد کنید. (Title and Content are required)");
            return;
        }

        // 2. Safe image length check (Optional chaining prevents crashes if null)
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
            const response = await fetch('http://localhost:5000/api/posts', {
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
                // Reset form completely
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
        <div className='bg-gray-50 min-h-screen p-20'>
            <div className='bg-white rounded-lg p-6 mx-auto w-[60%] flex flex-col gap-4'>
                <InputTag label='عنوان مقاله *' name="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />

                {/* Fixed: Added missing Author and Excerpt fields */}
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
                    className={`text-white p-3 rounded mt-4 w-full transition-colors ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                    {loading ? 'در حال ثبت...' : 'ثبت در دیتابیس'}
                </button>
            </div>
        </div>
    );
}

export default NewPost;