// lawyer/src/Components/SPA Components/Header.jsx
import React, { useState, useEffect } from 'react';
import courtStuff from '../../assets/courtStuff.png';
import emblem from '../../assets/classic.png';

function Header() {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        // Fetch CMS Settings
        fetch(`${import.meta.env.VITE_API_URL}/api/settings`)
            .then(res => res.json())
            .then(data => setSettings(data))
            .catch(err => console.error("Error fetching settings:", err));
    }, []);

    // Dynamic Variables with Fallbacks
    const lawyerName = settings?.lawyer_name || "تیم متخصص ما";

    // CHANGED: Now reading from header_bio!
    const headerDescription = settings?.header_bio || "با بیش از ۱۵ سال تجربه در زمینه‌های مختلف حقوقی، به شما کمک می‌کنیم تا به بهترین نتیجه ممکن در پرونده‌های حقوقی خود دست یابید. تلاش ما بر ارائه مشاوره‌های جامع و به‌روز، همراه با ارائه راهکارهای متناسب است.";

    return (
        <header className='relative w-full min-h-[90vh] md:min-h-[600px] flex items-center justify-center overflow-hidden bg-[#3C3A86] rtl'>
            {/* Background Image with Modern Gradient Overlay */}
            <div className='absolute inset-0 z-0'>
                <img
                    className='w-full h-full object-cover opacity-30 mix-blend-overlay'
                    src={courtStuff}
                    alt="Background"
                />
                <div className='absolute inset-0 bg-gradient-to-b from-[#3C3A86]/80 via-[#3C3A86]/50 to-[#1F1D47]/90'></div>
            </div>

            {/* Main Content Container */}
            <div className='relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12 mt-16 md:mt-0'>

                {/* Right Side (Text) */}
                <div className='flex flex-col items-center md:items-start text-center md:text-right w-full md:w-3/5 space-y-6'>
                    <h1 className='text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight drop-shadow-lg'>
                        وکالت حرفه‌ای با<br/>
                        <span className='text-[#FFCA0C] relative inline-block mt-2'>
                            {lawyerName}
                            {/* Decorative underline */}
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#FFCA0C]/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/>
                            </svg>
                        </span>
                    </h1>

                    {/* line-clamp-3 keeps it clean and stops it from overflowing the hero area */}
                    <p className='text-gray-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed opacity-90 line-clamp-3 whitespace-pre-wrap'>
                        {headerDescription}
                    </p>

                    {/* Action Buttons - Anchor tags for SPA scrolling */}
                    <div className='flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center md:justify-start'>
                        <a
                            href="#contact"
                            className='inline-block text-center bg-[#FFCA0C] hover:bg-[#E5B50A] text-gray-900 font-bold px-8 py-4 rounded-xl shadow-[0_4px_14px_0_rgba(255,202,12,0.39)] hover:shadow-[0_6px_20px_rgba(255,202,12,0.23)] hover:-translate-y-1 transition-all duration-300'
                        >
                            مشاوره رایگان
                        </a>
                        <a
                            href="#services"
                            className='inline-block text-center bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium px-8 py-4 rounded-xl hover:-translate-y-1 transition-all duration-300'
                        >
                            خدمات حقوقی
                        </a>
                    </div>
                </div>

                {/* Left Side (Optional Graphic/Space for balance) */}
                <div className='hidden md:flex w-full md:w-2/5 justify-end'>
                    <div className='w-full aspect-square max-w-[400px] border-4 border-white/10 rounded-full flex items-center justify-center p-4 relative backdrop-blur-sm'>
                        <div className='w-full h-full border border-[#FFCA0C]/50 rounded-full animate-[spin_20s_linear_infinite] absolute'></div>
                        <img src={emblem} alt="Court Logo" className="scale-200 w-2/3 object-contain opacity-80 mix-blend-screen drop-shadow-2xl"/>
                    </div>
                </div>

            </div>

            {/* Bottom Wave Divider */}
            <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
                <svg className="relative block w-full h-[50px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C-1.81,95.8,7.91,95.6,18.15,95.27c52.2-1.74,103.54-15.65,153.2-31.54C216.77,48.8,269.45,66.6,321.39,56.44Z" fill="#ffffff"></path>
                </svg>
            </div>
        </header>
    );
}

export default Header;