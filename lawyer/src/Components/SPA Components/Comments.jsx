import React, { useEffect, useState } from "react";
import FourElementCard from "../Costume UI Components/FourElementCard.jsx";
import { CommentsData } from "../HardCodedData/CommentsData.js";

function Comments() {
    const [menuState, setMenuState] = useState(0);
    const [isFading, setIsFading] = useState(false);

    // Smooth transition logic
    useEffect(() => {
        const timer = setInterval(() => {
            handleSlideChange((prev) => (prev < CommentsData.length - 1 ? prev + 1 : 0));
        }, 5000); // Increased to 5s for better readability

        return () => clearInterval(timer);
    }, []);

    const handleSlideChange = (newIndex) => {
        setIsFading(true);
        setTimeout(() => {
            setMenuState(newIndex);
            setIsFading(false);
        }, 300); // 300ms fade out before changing content
    };

    return (
        <section className='bg-white w-full py-24 relative overflow-hidden rtl'>
            {/* Decorative Background Elements */}
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

                {/* Comment Card Container */}
                <div className={`w-full transition-opacity duration-300 ease-in-out ${isFading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
                        <FourElementCard
                            comment={CommentsData[menuState].comment}
                            name={CommentsData[menuState].name}
                            position={CommentsData[menuState].position}
                            picture={CommentsData[menuState].image}
                        />
                    </div>
                </div>

                {/* Modern Navigation Dots */}
                <div className='flex flex-row items-center gap-3 mt-10'>
                    {CommentsData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => typeof handleSlideChange === 'function' && handleSlideChange(index)}
                            aria-label={`View comment ${index + 1}`}
                            className="focus:outline-none p-2"
                        >
                            <div className={`transition-all duration-300 rounded-full ${
                                menuState === index
                                    ? 'w-8 h-2.5 bg-[#FFCA0C] shadow-[0_0_10px_rgba(255,202,12,0.5)]'
                                    : 'w-2.5 h-2.5 bg-gray-200 hover:bg-gray-300'
                            }`} />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Comments;