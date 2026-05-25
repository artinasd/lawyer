// lawyer/src/Components/Admin/AdminSettings.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputTag from "../Costume UI Components/InputTag.jsx";
import TextArea from "../Costume UI Components/TextArea.jsx";
import ImageInput from "../Costume UI Components/ImageInput.jsx";

function AdminSettings() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Form States (added headerBio)
    const [lawyerProfile, setLawyerProfile] = useState({ name: '', headerBio: '', bio: '', image: '' });
    const [authorProfile, setAuthorProfile] = useState({ name: '', bio: '', image: '' });
    const [services, setServices] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [credentials, setCredentials] = useState({ currentPassword: '', newUsername: '', newPassword: '' });

    const [newService, setNewService] = useState({ title: '', desc: '' });
    const [newTestimonial, setNewTestimonial] = useState({ name: '', text: '', avatar: 'male', image: '' });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/settings');
                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        setLawyerProfile({
                            name: data.lawyer_name || '',
                            headerBio: data.header_bio || '',
                            bio: data.lawyer_bio || '',
                            image: data.lawyer_image || ''
                        });
                        setAuthorProfile({
                            name: data.author_name || '',
                            bio: data.author_bio || '',
                            image: data.author_image || ''
                        });
                        setServices(JSON.parse(data.services_json || '[]'));
                        setTestimonials(JSON.parse(data.testimonials_json || '[]'));
                        setCredentials(prev => ({ ...prev, newUsername: data.admin_username || 'admin' }));
                    }
                }
            } catch (error) {
                console.error("Error fetching settings:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSaveAll = async () => {
        setIsSaving(true);
        const token = localStorage.getItem("token");

        const payload = {
            lawyer_name: lawyerProfile.name,
            header_bio: lawyerProfile.headerBio, // sending header bio
            lawyer_bio: lawyerProfile.bio,
            lawyer_image: lawyerProfile.image,
            author_name: authorProfile.name,
            author_bio: authorProfile.bio,
            author_image: authorProfile.image,
            services_json: JSON.stringify(services),
            testimonials_json: JSON.stringify(testimonials)
        };

        try {
            const response = await fetch('http://localhost:5000/api/settings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.status === 401 || response.status === 403) {
                alert("نشست شما منقضی شده است (توکن نامعتبر). لطفا دوباره وارد شوید.");
                localStorage.removeItem("token");
                localStorage.removeItem("isAdmin");
                navigate('/login');
                return;
            }

            if (response.ok) {
                alert("تنظیمات با موفقیت ذخیره شد.");
            } else {
                alert("خطا در ذخیره تنظیمات.");
            }
        } catch (error) {
            alert("خطا در ارتباط با سرور.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleUpdateCredentials = async () => {
        if (!credentials.currentPassword || !credentials.newUsername || !credentials.newPassword) return alert("تمامی فیلدهای اطلاعات ورود الزامی است.");
        if (credentials.newPassword.length < 6) return alert("رمز عبور جدید باید حداقل ۶ کاراکتر باشد.");

        setIsSaving(true);
        const token = localStorage.getItem("token");

        try {
            const response = await fetch('http://localhost:5000/api/settings/credentials', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(credentials)
            });

            if (response.status === 401) {
                const errorData = await response.json();
                alert(errorData.message || "رمز عبور فعلی نامعتبر است.");
                setIsSaving(false);
                return;
            }

            if (response.ok) {
                alert("اطلاعات ورود تغییر کرد. لطفا با اطلاعات جدید وارد شوید.");
                localStorage.removeItem("token");
                localStorage.removeItem("isAdmin");
                navigate('/login');
            } else {
                alert("خطا در تغییر اطلاعات.");
            }
        } catch (error) {
            alert("خطا در ارتباط با سرور.");
        } finally {
            setIsSaving(false);
        }
    };

    const addService = () => {
        if (!newService.title.trim() || !newService.desc.trim()) return alert("عنوان و توضیحات الزامی است.");
        setServices([...services, newService]);
        setNewService({ title: '', desc: '' });
    };
    const removeService = (index) => setServices(services.filter((_, i) => i !== index));

    const addTestimonial = () => {
        if (!newTestimonial.name.trim() || !newTestimonial.text.trim()) return alert("نام و متن نظر الزامی است.");
        if (newTestimonial.image && newTestimonial.image.length > 3000000) return alert("حجم عکس موکل بسیار بزرگ است. لطفا عکس کوچکتری انتخاب کنید.");
        setTestimonials([...testimonials, newTestimonial]);
        setNewTestimonial({ name: '', text: '', avatar: 'male', image: '' });
    };
    const removeTestimonial = (index) => setTestimonials(testimonials.filter((_, i) => i !== index));

    if (loading) return <div className="p-10 rtl text-center font-bold text-gray-600 bg-gray-50 min-h-screen">در حال دریافت اطلاعات...</div>;

    return (
        <div className='p-10 rtl bg-gray-50 min-h-screen'>
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
                    <h1 className='text-3xl font-bold text-gray-800'>تنظیمات کلان وب‌سایت</h1>
                    <div className="flex gap-3">
                        <button onClick={handleSaveAll} disabled={isSaving} className={`px-6 py-2 rounded-lg font-bold text-white transition-colors shadow-sm ${isSaving ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'}`}>
                            {isSaving ? 'در حال ذخیره...' : 'ذخیره کل تنظیمات'}
                        </button>
                        <button onClick={() => navigate('/admin')} className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg font-bold hover:bg-gray-300 transition-colors border border-gray-300">
                            بازگشت
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-8">

                    {/* SECTION 1A: Lawyer Profile (Homepage) */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold text-[#4038C9] mb-6 border-b pb-2">پروفایل اصلی (نمایش در صفحه اصلی - هدر و درباره من)</h2>
                        <div className="flex flex-col gap-4">
                            <InputTag label='نام وکیل / تیم حقوقی' value={lawyerProfile.name} onChange={(e) => setLawyerProfile({...lawyerProfile, name: e.target.value})} />

                            {/* NEW: Dedicated Header Bio Input */}
                            <TextArea label='متن معرفی کوتاه هدر (زیر عنوان اصلی صفحه)' value={lawyerProfile.headerBio} onChange={(e) => setLawyerProfile({...lawyerProfile, headerBio: e.target.value})} />

                            <TextArea label='متن کامل معرفی (بخش درباره من)' value={lawyerProfile.bio} onChange={(e) => setLawyerProfile({...lawyerProfile, bio: e.target.value})} />

                            <div className="my-2">
                                <ImageInput label='عکس پروفایل اصلی' onChange={(base64) => setLawyerProfile({...lawyerProfile, image: base64})} />
                                {lawyerProfile.image && (
                                    <div className="mt-4 flex items-center gap-4">
                                        <p className="text-sm text-gray-500">تصویر فعلی:</p>
                                        <img src={lawyerProfile.image} alt="Profile" className="w-24 h-24 object-cover rounded-xl border-2 border-gray-100 shadow-sm" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* SECTION 1B: Author Profile (Blog Sidebar) */}
                    <div className="bg-indigo-50 p-8 rounded-xl shadow-sm border border-indigo-100">
                        <h2 className="text-xl font-bold text-[#4038C9] mb-6 border-b border-indigo-200 pb-2">پروفایل نویسنده (نمایش در سایدبار مقالات)</h2>
                        <div className="flex flex-col gap-4">
                            <InputTag label='نام نویسنده' value={authorProfile.name} onChange={(e) => setAuthorProfile({...authorProfile, name: e.target.value})} />
                            <TextArea label='بیوگرافی کوتاه نویسنده (رزومه)' value={authorProfile.bio} onChange={(e) => setAuthorProfile({...authorProfile, bio: e.target.value})} />

                            <div className="my-2">
                                <ImageInput label='عکس نویسنده' onChange={(base64) => setAuthorProfile({...authorProfile, image: base64})} />
                                {authorProfile.image && (
                                    <div className="mt-4 flex items-center gap-4">
                                        <p className="text-sm text-gray-500">تصویر فعلی:</p>
                                        <img src={authorProfile.image} alt="Author" className="w-20 h-20 object-cover rounded-full border-4 border-white shadow-sm" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: Homepage Services */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold text-[#4038C9] mb-6 border-b pb-2">خدمات حقوقی (نمایش در صفحه اصلی)</h2>

                        <div className="grid gap-3 mb-6">
                            {services.length > 0 ? services.map((srv, idx) => (
                                <div key={idx} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <div>
                                        <h3 className="font-bold text-gray-800">{srv.title}</h3>
                                        <p className="text-sm text-gray-600 mt-1">{srv.desc}</p>
                                    </div>
                                    <button onClick={() => removeService(idx)} className="text-red-500 hover:text-red-700 font-bold px-3">حذف</button>
                                </div>
                            )) : <p className="text-gray-500 text-sm">هیچ خدمتی ثبت نشده است.</p>}
                        </div>

                        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 flex flex-col gap-3">
                            <h4 className="font-bold text-blue-800 mb-2">افزودن خدمت جدید</h4>
                            <input type="text" placeholder="عنوان خدمت (مثال: مشاوره خانواده)" value={newService.title} onChange={(e) => setNewService({...newService, title: e.target.value})} className="p-3 rounded border w-full" />
                            <textarea placeholder="توضیحات خدمت..." value={newService.desc} onChange={(e) => setNewService({...newService, desc: e.target.value})} className="p-3 rounded border w-full" rows="2" />
                            <button onClick={addService} className="bg-blue-600 text-white py-2 px-4 rounded font-bold w-fit mt-2 hover:bg-blue-700">اضافه کردن به لیست</button>
                        </div>
                    </div>

                    {/* SECTION 3: Homepage Testimonials */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold text-[#4038C9] mb-6 border-b pb-2">نظرات موکلین (نمایش در صفحه اصلی)</h2>

                        <div className="grid gap-3 mb-6">
                            {testimonials.length > 0 ? testimonials.map((t, idx) => (
                                <div key={idx} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <div className="flex items-center gap-4">
                                        {t.image ? (
                                            <img src={t.image} alt={t.name} className="w-12 h-12 object-cover rounded-full border border-gray-300 shadow-sm" />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-bold border border-gray-300">آواتار</div>
                                        )}
                                        <div>
                                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                                {t.name}
                                                <span className="text-xs font-normal text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                                                    {t.avatar === 'female' ? 'خانم' : 'آقا'}
                                                </span>
                                            </h3>
                                            <p className="text-sm text-gray-600 mt-1">"{t.text}"</p>
                                        </div>
                                    </div>
                                    <button onClick={() => removeTestimonial(idx)} className="text-red-500 hover:text-red-700 font-bold px-3">حذف</button>
                                </div>
                            )) : <p className="text-gray-500 text-sm">هیچ نظری ثبت نشده است.</p>}
                        </div>

                        <div className="bg-green-50 p-6 rounded-lg border border-green-100 flex flex-col gap-3">
                            <h4 className="font-bold text-green-800 mb-2">افزودن نظر جدید</h4>

                            <div className="flex gap-4">
                                <input type="text" placeholder="نام موکل" value={newTestimonial.name} onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})} className="p-3 rounded border w-2/3" />
                                <select
                                    value={newTestimonial.avatar}
                                    onChange={(e) => setNewTestimonial({...newTestimonial, avatar: e.target.value})}
                                    className="p-3 rounded border w-1/3 bg-white focus:ring-2 focus:ring-green-500 outline-none cursor-pointer"
                                >
                                    <option value="male">آواتار مرد</option>
                                    <option value="female">آواتار زن</option>
                                </select>
                            </div>

                            <div className="my-2 p-3 bg-white border border-gray-200 rounded-lg">
                                <ImageInput label='آپلود عکس واقعی موکل (اختیاری)' onChange={(base64) => setNewTestimonial({...newTestimonial, image: base64})} />
                                {newTestimonial.image && (
                                    <div className="mt-3 flex items-center gap-3">
                                        <p className="text-sm text-gray-500">پیش‌نمایش:</p>
                                        <img src={newTestimonial.image} alt="Preview" className="w-16 h-16 object-cover rounded-full border-2 border-green-500 shadow-sm" />
                                    </div>
                                )}
                            </div>

                            <textarea placeholder="متن نظر..." value={newTestimonial.text} onChange={(e) => setNewTestimonial({...newTestimonial, text: e.target.value})} className="p-3 rounded border w-full" rows="2" />
                            <button onClick={addTestimonial} className="bg-green-600 text-white py-2 px-4 rounded font-bold w-fit mt-2 hover:bg-green-700">اضافه کردن به لیست</button>
                        </div>
                    </div>

                    {/* SECTION 4: Admin Credentials */}
                    <div className="bg-red-50 p-8 rounded-xl shadow-sm border border-red-200">
                        <h2 className="text-xl font-bold text-red-700 mb-6 border-b border-red-200 pb-2">تغییر اطلاعات ورود مدیر سایت</h2>

                        <div className="flex flex-col gap-4 max-w-lg">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-bold text-gray-700">رمز عبور فعلی (برای تایید هویت) *</label>
                                <input type="password" placeholder="رمز فعلی خود را وارد کنید" value={credentials.currentPassword} onChange={(e) => setCredentials({...credentials, currentPassword: e.target.value})} className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none w-full" />
                            </div>
                            <div className="flex flex-col gap-1 mt-4">
                                <label className="text-sm font-bold text-gray-700">نام کاربری جدید *</label>
                                <input type="text" placeholder="نام کاربری جدید" value={credentials.newUsername} onChange={(e) => setCredentials({...credentials, newUsername: e.target.value})} className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none w-full" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-bold text-gray-700">رمز عبور جدید *</label>
                                <input type="password" placeholder="حداقل ۶ کاراکتر" value={credentials.newPassword} onChange={(e) => setCredentials({...credentials, newPassword: e.target.value})} className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none w-full" />
                            </div>
                            <button onClick={handleUpdateCredentials} disabled={isSaving} className={`mt-4 py-3 px-6 rounded-lg font-bold text-white transition-colors shadow-sm w-fit ${isSaving ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700'}`}>
                                {isSaving ? 'در حال بررسی...' : 'بروزرسانی اطلاعات ورود'}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AdminSettings;