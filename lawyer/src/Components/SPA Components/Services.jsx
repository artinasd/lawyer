import React from 'react';
import ThreeElementCard from "../Costume UI Components/ThreeElementCard.jsx";
import {ServicesData} from "../HardCodedData/ServicesData.js";
import {ServicesIcons} from "../HardCodedData/ServicesIcons.jsx";

function Services() {
    return (
        <section className='relative bg-[#F9FAFB] w-full py-24 overflow-hidden rtl'>
            {/* Modern subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#3C3A86 2px, transparent 2px)', backgroundSize: '30px 30px'}}></div>

            <div className='max-w-7xl mx-auto px-6 lg:px-8 relative z-10'>

                {/* Header Titles */}
                <div className='text-center max-w-3xl mx-auto mb-16'>
                    <div className="inline-block px-4 py-1.5 rounded-full bg-[#FFCA0C]/20 text-[#B8860B] font-bold text-sm mb-4 border border-[#FFCA0C]/50">
                        حوزه‌های تخصصی
                    </div>
                    <h2 className='text-4xl md:text-5xl font-black text-gray-900 mb-6'>
                        خدمات <span className='text-[#4038C9]'>حقوقی</span>
                    </h2>
                    <p className='text-gray-600 text-lg leading-relaxed'>
                        من در زمینه‌های مختلف حقوقی خدمات تخصصی ارائه می‌دهم. با تکیه بر دانش و تجربه سالیان متمادی، به دنبال کشف بهترین راه‌حل برای مشکلات و پرونده‌های حقوقی شما هستم.
                    </p>
                </div>

                {/* Services Grid */}
                <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {ServicesData.map((each, index) => (
                        <li
                            key={index}
                            className="group hover:-translate-y-2 transition-transform duration-300 ease-out h-full"
                        >
                            {/* Assumes ThreeElementCard has been updated to fit the modern look,
                                but even with the old one, this wrapper makes it pop */}
                            <div className="h-full bg-white rounded-2xl shadow-sm hover:shadow-2xl border border-gray-100 transition-shadow duration-300 overflow-hidden">
                                <ThreeElementCard title={each.title} description={each.description}>
                                    <div className="text-[#4038C9] group-hover:scale-110 transition-transform duration-300">
                                        {ServicesIcons[index]}
                                    </div>
                                </ThreeElementCard>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
        </section>
    );
}

export default Services;