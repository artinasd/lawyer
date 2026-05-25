// lawyer/src/Components/Admin/AdminPanel.jsx
import { useNavigate } from "react-router-dom";

function AdminPanel() {
    const navigate = useNavigate();

    return (
        <div className='p-10 rtl'>
            <h1 className='text-2xl font-bold mb-6'>پنل مدیریت</h1>
            <div className='grid grid-cols-2 gap-4'>
                <button
                    onClick={() => navigate('/admin/new-post')}
                    className='bg-blue-600 text-white p-4 rounded'>
                    ثبت پست جدید
                </button>
                <button
                    onClick={() => navigate('/admin/all-posts')} // مسیر جدید برای مشاهده پست‌ها
                    className='bg-green-600 text-white p-4 rounded'>
                    مشاهده همه پست‌ها
                </button>
            </div>
        </div>
    );
}

export default AdminPanel;