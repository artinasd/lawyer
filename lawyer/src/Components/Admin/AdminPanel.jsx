// lawyer/src/Components/Admin/AdminPanel.jsx
import { useNavigate } from "react-router-dom";

function AdminPanel() {
    const navigate = useNavigate();

    return (
        <div className='p-10 rtl min-h-[60vh] bg-gray-50'>
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h1 className='text-3xl font-bold mb-8 text-gray-800 border-b pb-4'>پنل مدیریت</h1>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <button
                        onClick={() => navigate('/admin/new-post')}
                        className='bg-blue-600 hover:bg-blue-700 text-white font-bold p-6 rounded-xl transition-colors shadow-sm text-lg'>
                        ثبت پست جدید
                    </button>
                    <button
                        onClick={() => navigate('/admin/all-posts')}
                        className='bg-green-600 hover:bg-green-700 text-white font-bold p-6 rounded-xl transition-colors shadow-sm text-lg'>
                        مشاهده همه پست‌ها
                    </button>
                    {/* NEW BUTTON FOR COMMENTS */}
                    <button
                        onClick={() => navigate('/admin/comments')}
                        className='bg-purple-600 hover:bg-purple-700 text-white font-bold p-6 rounded-xl transition-colors shadow-sm text-lg'>
                        مدیریت پرسش‌ها و نظرات
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;