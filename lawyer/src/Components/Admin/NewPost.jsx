import React, { useState } from 'react';
import InputTag from '../Costume UI Components/InputTag';
import TextArea from '../Costume UI Components/TextArea';

export default function NewPost() {
    // 1. Unified state for the form
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        author: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 2. Universal change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 3. Mock Submit Form
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Mocking a backend delay
        setTimeout(() => {
            console.log("Data ready for backend API:", formData);
            alert("مقاله با موفقیت ثبت شد! (Frontend Simulation)");

            // Reset form
            setFormData({ title: '', excerpt: '', content: '', author: '' });
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10" dir="rtl">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">افزودن مقاله جدید</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <InputTag
                    label="عنوان مقاله"
                    name="title"
                    placeholder="مثال: قوانین جدید چک..."
                    value={formData.title}
                    onChange={handleChange}
                />

                <InputTag
                    label="نویسنده"
                    name="author"
                    placeholder="نام نویسنده"
                    value={formData.author}
                    onChange={handleChange}
                />

                <TextArea
                    label="خلاصه مقاله (برای نمایش در لیست)"
                    name="excerpt"
                    placeholder="یک پاراگراف کوتاه..."
                    value={formData.excerpt}
                    onChange={handleChange}
                    rows={3}
                />

                <TextArea
                    label="متن اصلی مقاله"
                    name="content"
                    placeholder="متن کامل مقاله خود را اینجا بنویسید..."
                    value={formData.content}
                    onChange={handleChange}
                    rows={10}
                />

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-6 bg-[#D4AF37] hover:bg-[#B5952F] text-white font-bold py-3 px-6 rounded transition-colors disabled:opacity-50"
                >
                    {isSubmitting ? 'در حال ثبت...' : 'ثبت مقاله'}
                </button>
            </form>
        </div>
    );
}