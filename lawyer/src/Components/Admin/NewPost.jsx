// lawyer/src/Components/Admin/NewPost.jsx
import React, { useState } from 'react';
import InputTag from "../Costume UI Components/InputTag.jsx";
import TextArea from "../Costume UI Components/TextArea.jsx";
import ImageInput from "../Costume UI Components/ImageInput.jsx";

function NewPost() {
    // Added 'image' to state
    const [formData, setFormData] = useState({ title: '', excerpt: '', content: '', author: '', image: '' });

    const handleAddPost = async () => {
        const token = localStorage.getItem("token");

        // Simple validation for image size (3MB limit = ~3,145,728 bytes)
        // Since base64 is larger than the raw file, this is an approximate check
        if (formData.image.length > 4000000) {
            alert("حجم تصویر بیش از حد مجاز است. لطفا تصویر کوچکتری انتخاب کنید.");
            return;
        }

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
                alert("دسترسی غیرمجاز. لطفا دوباره وارد شوید.");
                return;
            }

            if (response.ok) {
                alert("مقاله با موفقیت در دیتابیس ذخیره شد!");
                // Reset form including image
                setFormData({ title: '', excerpt: '', content: '', author: '', image: '' });
            } else {
                alert("خطا در ثبت مقاله.");
            }
        } catch (error) {
            console.error("Backend error:", error);
            alert("خطا در ارتباط با سرور.");
        }
    };

    return (
        <div className='bg-gray-50 min-h-screen p-20'>
            <div className='bg-white rounded-lg p-6 mx-auto w-[60%]'>
                <InputTag label='عنوان مقاله' name="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                <TextArea label='متن مقاله' name="content" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} />

                {/* Added ImageInput */}
                <ImageInput
                    label='تصویر شاخص'
                    onChange={(base64) => setFormData({...formData, image: base64})}
                />

                <button onClick={handleAddPost} className='bg-indigo-600 text-white p-3 rounded mt-4 w-full'>ثبت در دیتابیس</button>
            </div>
        </div>
    );
}

export default NewPost;