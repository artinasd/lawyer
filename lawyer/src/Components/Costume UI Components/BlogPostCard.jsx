import React from 'react';
import { useNavigate } from "react-router-dom";

function BlogPostCard(props) {
    const navigate = useNavigate();

    return (
        <div className='bg-white rounded-2xl w-full h-full flex flex-col shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-right overflow-hidden'>

            {/* Image Section with Fallback */}
            <div className='h-48 w-full bg-gray-200 relative overflow-hidden flex-shrink-0'>
                {props.pic ? (
                    <img
                        src={props.pic}
                        alt={props.title}
                        className='w-full h-full object-cover'
                    />
                ) : (
                    /* Fallback when no image is provided */
                    <div className="w-full h-full bg-gradient-to-br from-[#3C3A86]/20 to-[#4038C9]/40 flex items-center justify-center">
                        <span className="text-[#3C3A86] opacity-50 font-bold text-xl">بدون تصویر</span>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className='p-6 flex flex-col flex-grow'>
                <div className='flex-grow'>
                    <h2 className='font-bold text-xl text-gray-900 mb-3 rtl leading-tight line-clamp-2'>
                        {props.title}
                    </h2>

                    <p className='text-gray-600 text-sm leading-relaxed rtl line-clamp-3 mb-4'>
                        {props.description || "توضیحاتی برای این مقاله ثبت نشده است..."}
                    </p>
                </div>

                {/* Button Section (Always pushed to bottom) */}
                <button
                    onClick={() => navigate(`/blog/${props.id}`)}
                    className='w-full mt-auto border-2 border-[#4038C9] text-[#4038C9] px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-[#4038C9] hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#4038C9] focus:ring-opacity-50'>
                    مشاهده مطلب
                </button>
            </div>
        </div>
    );
}

export default BlogPostCard;