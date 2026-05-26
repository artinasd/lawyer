// lawyer/src/Components/SPA Components/Services.jsx
import React, { useEffect, useState } from 'react';
import ThreeElementCard from "../Costume UI Components/ThreeElementCard.jsx";

function Services() {
    const [settingsServices, setSettingsServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/settings')
            .then(res => res.json())
            .then(data => {
                const parsed = JSON.parse(data?.services_json || '[]');
                setSettingsServices(parsed);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching services:", err);
                setLoading(false);
            });
    }, []);

    const defaultLegalIcon = (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
        </svg>
    );

    if (loading) return null;

    // If the database is empty, hide the section until the admin adds services
    if (settingsServices.length === 0) return null;

    return (
        <section className='relative bg-[#F9FAFB] w-full py-24 overflow-hidden rtl'>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#3C3A86 2px, transparent 2px)', backgroundSize: '30px 30px'}}></div>

            <div className='max-w-7xl mx-auto px-6 lg:px-8 relative z-10'>

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

                <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {settingsServices.map((each, index) => (
                        <li key={index} className="group hover:-translate-y-2 transition-transform duration-300 ease-out h-full">
                            <div className="h-full bg-white rounded-2xl shadow-sm hover:shadow-2xl border border-gray-100 transition-shadow duration-300 overflow-hidden">
                                <ThreeElementCard title={each.title} description={each.desc || each.description || ''}>
                                    <div className="text-[#4038C9] group-hover:scale-110 transition-transform duration-300">
                                        {defaultLegalIcon}
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