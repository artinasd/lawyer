import React, { useState, useEffect } from 'react';
import lawyerHand from '../../assets/lawyerHand.png';
import TwoElementCard from "../Costume UI Components/TwoElementCard.jsx";
import medalIcon from '../../assets/medal.png';
import caseIcon from '../../assets/caseIcon.png';
import bookIcon from '../../assets/bookIcon.png';

function AboutPage() {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        // Fetch CMS Settings
        fetch('http://localhost:5000/api/settings')
            .then(res => res.json())
            .then(data => setSettings(data))
            .catch(err => console.error("Error fetching settings:", err));
    }, []);

    // Dynamic Variables with Fallbacks
    const lawyerName = settings?.lawyer_name || "محمد حقوقی";
    const lawyerBio = settings?.lawyer_bio || "من محمد حقوقی، وکیل پایه یک دادگستری با بیش از ۱۵ سال تجربه در زمینه‌های مختلف حقوقی هستم. تخصص من در دعاوی مدنی، کیفری، خانواده و قراردادهای تجاری است.\n\nهدف من ارائه خدمات حقوقی با بالاترین استانداردهای حرفه‌ای و اخلاقی است. من به هر پرونده با دقت و تعهد کامل رسیدگی می‌کنم و همواره منافع موکلین خود را در اولویت قرار می‌دهم.";
    const lawyerImage = settings?.lawyer_image || lawyerHand;

    return (
        <section className='bg-white py-24 rtl overflow-hidden'>
            <div className='max-w-7xl mx-auto px-6 lg:px-8'>
                <div className='flex flex-col lg:flex-row items-center gap-16'>

                    {/* Image Section */}
                    <div className="w-full lg:w-1/2 relative">
                        {/* Modern Decorative Backgrounds */}
                        <div className="absolute -top-6 -right-6 w-full h-full border-4 border-[#FFCA0C] rounded-2xl z-0 hidden md:block transition-transform hover:translate-x-2 hover:-translate-y-2 duration-500"></div>
                        <div className="absolute -bottom-6 -left-6 w-3/4 h-3/4 bg-[#3C3A86]/10 rounded-3xl z-0 blur-2xl"></div>

                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl group">
                            <div className="absolute inset-0 bg-[#3C3A86]/20 mix-blend-multiply group-hover:bg-transparent transition-colors duration-500"></div>
                            <img
                                src={lawyerImage}
                                alt={lawyerName}
                                className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                        </div>
                    </div>

                    {/* Text Section */}
                    <div className='w-full lg:w-1/2 flex flex-col items-start'>
                        <div className="inline-block px-4 py-1.5 rounded-full bg-[#3C3A86]/10 text-[#3C3A86] font-semibold text-sm mb-4 border border-[#3C3A86]/20">
                            آشنایی با {lawyerName}
                        </div>

                        <h2 className='text-4xl md:text-5xl font-black text-gray-900 mb-6'>
                            درباره <span className='text-[#4038C9] relative'>
                                من
                                <span className="absolute bottom-1 left-0 w-full h-2 bg-[#FFCA0C]/40 -z-10 rounded"></span>
                            </span>
                        </h2>

                        {/* whitespace-pre-wrap ensures that line breaks added in the CMS are respected here! */}
                        <p className='text-gray-600 text-lg leading-loose mb-8 text-justify whitespace-pre-wrap'>
                            {lawyerBio}
                        </p>

                        {/* Stats Grid */}
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-8'>
                            <TwoElementCard icon={bookIcon} text="تخصص چندگانه"/>
                            <TwoElementCard icon={caseIcon} text="۵۰۰+ پرونده موفق"/>
                            <TwoElementCard icon={medalIcon} text="۱۵+ سال تجربه"/>
                        </div>

                        <button className='group flex items-center gap-2 bg-[#4038C9] hover:bg-[#2C2699] text-white font-medium px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
                            <span>ارتباط مستقیم با من</span>
                            <svg className="w-5 h-5 transform rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default AboutPage;