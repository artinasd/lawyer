// lawyer/src/Components/SPA Components/Comments.jsx
import React, { useEffect, useState } from "react";
import FourElementCard from "../Costume UI Components/FourElementCard.jsx";
import fallbackPic from '../../assets/person1.jpg';

function Comments() {
    const [menuState, setMenuState] = useState(0);
    const [isFading, setIsFading] = useState(false);
    const [settingsComments, setSettingsComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/settings')
            .then(res => res.json())
            .then(data => {
                const parsed = JSON.parse(data?.testimonials_json || '[]');
                setSettingsComments(parsed);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching comments:", err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (settingsComments.length === 0) return;
        if (menuState >= settingsComments.length) {
            setMenuState(0);
        }
    }, [settingsComments, menuState]);

    useEffect(() => {
        if (settingsComments.length <= 1) return;

        const timer = setInterval(() => {
            handleSlideChange((prev) => (prev < settingsComments.length - 1 ? prev + 1 : 0));
        }, 5000);

        return () => clearInterval(timer);
    }, [settingsComments.length]);

    const handleSlideChange = (newIndex) => {
        setIsFading(true);
        setTimeout(() => {
            setMenuState(prev => {
                const nextVal = typeof newIndex === 'function' ? newIndex(prev) : newIndex;
                return nextVal < settingsComments.length ? nextVal : 0;
            });
            setIsFading(false);
        }, 300);
    };

    if (loading) return null;

    // Hide component if there are no comments saved in the database
    if (settingsComments.length === 0) return null;

    const safeMenuState = menuState < settingsComments.length ? menuState : 0;
    const currentComment = settingsComments[safeMenuState] || {};

    // SMART AVATAR SELECTOR
    const getAvatarPic = (comment) => {
        // 1. If the admin uploaded a real photo, prioritize that!
        if (comment.image && comment.image.length > 100) {
            return comment.image;
        }

        // 2. Otherwise, use the gendered SVGs
        const maleAvatar = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234038C9'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
        const femaleAvatar = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23C9388B'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";

        if (comment.avatar === 'female') return femaleAvatar;
        if (comment.avatar === 'male') return maleAvatar;

        // 3. Absolute fallback
        return fallbackPic;
    };

    return (
        <section className='bg-white w-full py-24 relative overflow-hidden rtl'>
            <div className="absolute top-10 right-10 md:top-20 md:right-32 text-[#F9FAFB] z-0 opacity-80" style={{ fontSize: '20rem', lineHeight: '1', fontFamily: 'serif' }}>
                &rdquo;
            </div>

            <div className='max-w-5xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col items-center'>

                <div className='text-center mb-12'>
                    <div className="inline-block px-4 py-1.5 rounded-full bg-[#3C3A86]/10 text-[#3C3A86] font-semibold text-sm mb-4">
                        تجربیات موفق
                    </div>
                    <h2 className='text-4xl md:text-5xl font-black text-gray-900 mb-6'>
                        نظرات <span className='text-[#4038C9]'>موکلین</span>
                    </h2>
                    <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
                        بزرگترین افتخار ما، رضایت و اعتماد موکلینی است که در مسیر احقاق حقوقشان همراه آنها بوده‌ایم.
                    </p>
                </div>

                <div className={`w-full transition-opacity duration-300 ease-in-out ${isFading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
                        <FourElementCard
                            comment={currentComment.text || currentComment.comment || ''}
                            name={currentComment.name || 'موکل ناشناس'}
                            position={currentComment.position || "موکل"}
                            picture={getAvatarPic(currentComment)}
                        />
                    </div>
                </div>

                {settingsComments.length > 1 && (
                    <div className='flex flex-row items-center gap-3 mt-10'>
                        {settingsComments.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleSlideChange(index)}
                                aria-label={`View comment ${index + 1}`}
                                className="focus:outline-none p-2"
                            >
                                <div className={`transition-all duration-300 rounded-full ${
                                    safeMenuState === index
                                        ? 'w-8 h-2.5 bg-[#FFCA0C] shadow-[0_0_10px_rgba(255,202,12,0.5)]'
                                        : 'w-2.5 h-2.5 bg-gray-200 hover:bg-gray-300'
                                }`} />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default Comments;