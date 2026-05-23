// lawyer/src/Components/Admin/NewPost.jsx
import React, { useState } from 'react';
import InputTag from "../Costume UI Components/InputTag.jsx";
import TextArea from "../Costume UI Components/TextArea.jsx";

function NewPost() {
    const [formData, setFormData] = useState({ title: '', excerpt: '', content: '', author: '' });

    const handleAddPost = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch('http://localhost:3000/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // The 'Bearer ' prefix is mandatory for your backend logic
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
                setFormData({ title: '', excerpt: '', content: '', author: '' });
            } else {
                alert("خطا در ثبت مقاله.");
            }
        } catch (error) {
            console.error("Backend error:", error);
        }
    };

    return (
        <div className='bg-gray-50 min-h-screen p-20'>
            <div className='bg-white rounded-lg p-6 mx-auto w-[40%]'>
                <InputTag label='عنوان مقاله' name="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                <TextArea label='متن مقاله' name="content" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} />
                <button onClick={handleAddPost} className='bg-indigo-600 text-white p-2 rounded'>ثبت در دیتابیس</button>
            </div>
        </div>
    );
}

export default NewPost;