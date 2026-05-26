// lawyer/src/Components/Costume UI Components/ContactForm.jsx
import { useState } from "react";

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        content: ''
    });
    const [status, setStatus] = useState(null); // 'success' | 'error' | null
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const response = await fetch('http://localhost:5000/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', subject: '', content: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='bg-white rounded-xl p-8 shadow-md col-span-1'>
            <h2 className='text-2xl font-bold rtl'>فرم تماس</h2>
            <br/>

            {status === 'success' && (
                <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4 rtl">
                    پیام شما با موفقیت ارسال شد. در اسرع وقت پاسخگو خواهیم بود.
                </div>
            )}
            {status === 'error' && (
                <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 rtl">
                    خطا در ارسال پیام. لطفاً دوباره تلاش کنید.
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-2 gap-10'>
                    <div className="flex flex-col rtl">
                        <label className="font-medium text-gray-700 mb-2">ایمیل</label>
                        <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full placeholder:text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-blue-600 transition" placeholder="آدرس ایمیل خود را وارد نمایید" />
                    </div>
                    <div className="flex flex-col rtl">
                        <label className="font-medium text-gray-700 mb-2">نام و نام خانوادگی</label>
                        <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full placeholder:text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-blue-600 transition" placeholder="نام و نام خانوادگی" />
                    </div>
                </div>

                <br/>
                <div className="flex flex-col rtl">
                    <label className="font-medium text-gray-700 mb-2">شماره تماس</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full placeholder:text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-blue-600 transition" placeholder="شماره تماس خود را وارد نمایید" />
                </div>

                <br/>
                <div className="flex flex-col rtl">
                    <label className="font-medium text-gray-700 mb-2">موضوع</label>
                    <input required type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full placeholder:text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-blue-600 transition" placeholder="موضوع پیام خود را وارد نمایید" />
                </div>

                <br/>
                <h3 className='font-medium text-gray-700 mb-2 rtl'>پیام</h3>
                <textarea
                    required
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    className='resize-none w-full placeholder:text-sm border border-gray-300 rounded-md px-3 py-2 rtl h-28 focus:outline-blue-600 transform duration-200'
                    placeholder='متن پیام خود را وارد نمایید'
                />

                <br/>
                <br/>
                <button type="submit" disabled={loading} className='bg-[#4038C9] w-full text-white p-2 rounded-md hover:bg-indigo-800 transition disabled:opacity-50 cursor-pointer'>
                    {loading ? 'در حال ارسال...' : 'ارسال پیام'}
                </button>
            </form>
        </div>
    )
}

export default ContactForm;