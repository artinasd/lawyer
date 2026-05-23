import React from "react";
import ContactForm from "../Costume UI Components/ContactForm.jsx";
import ContactInfo from "../Costume UI Components/ContactInfo.jsx";
import MapView from "./MapView.jsx";

function ContactUs() {
    return (
        <section className='bg-[#F9FAFB] w-full py-24 relative rtl'>

            <div className='max-w-7xl mx-auto px-6 lg:px-8 relative z-10'>
                {/* Header Titles */}
                <div className='text-center max-w-3xl mx-auto mb-16'>
                    <h2 className='text-4xl md:text-5xl font-black text-black mb-6'>
                        تماس <span className='text-[#3C3A86] relative'>
                            با من
                            <span className="absolute bottom-1 left-0 w-full h-3 bg-[#FFCA0C]/60 -z-10 rounded"></span>
                        </span>
                    </h2>
                    <p className='text-gray-800 text-lg leading-relaxed font-medium'>
                        برای دریافت مشاوره حقوقی تخصصی، بررسی پرونده و یا تعیین وقت ملاقات حضوری، از طریق فرم زیر و یا راه‌های ارتباطی با دفتر وکالت در تماس باشید.
                    </p>
                </div>

                {/* Main Content Grid (Responsive!) */}
                <div className='bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 flex flex-col lg:flex-row'>

                    {/* Right Side: Information & Map (Dark Theme Container) */}
                    <div className='w-full lg:w-5/12 bg-[#3C3A86] p-8 md:p-12 flex flex-col justify-between text-white relative overflow-hidden'>
                        {/* Decorative Circle in BG */}
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white opacity-10 rounded-full blur-2xl"></div>

                        <div className="relative z-10">
                            {/* Changed to Pure White for maximum contrast */}
                            <h3 className="text-3xl font-black mb-8 text-white flex items-center gap-3">
                                <div className="w-2 h-8 bg-[#FFCA0C] rounded-full"></div>
                                اطلاعات تماس
                            </h3>

                            {/* Assumes ContactInfo handles its own layout, but we ensure it inherits high-contrast text */}
                            <div className="text-gray-50 space-y-6 font-medium">
                                <ContactInfo />
                            </div>
                        </div>

                        <div className="mt-12 relative z-10 rounded-xl overflow-hidden shadow-2xl border border-white/20 h-64 w-full bg-gray-200">
                            {/* The MapView should ideally have w-full h-full classes inside it */}
                            <MapView />
                        </div>
                    </div>

                    {/* Left Side: Contact Form */}
                    <div className='w-full lg:w-7/12 p-8 md:p-12 lg:p-16'>
                        {/* Changed to Pure Black for maximum contrast */}
                        <h3 className="text-3xl font-black mb-6 text-black border-b-2 border-gray-100 pb-4">
                            ارسال پیام مستقیم
                        </h3>
                        <p className="text-gray-800 mb-8 text-base font-medium">
                            لطفاً اطلاعات خود را به دقت وارد کنید. همکاران ما در سریع‌ترین زمان ممکن با شما تماس خواهند گرفت.
                        </p>
                        <ContactForm />
                    </div>

                </div>
            </div>
        </section>
    );
}

export default ContactUs;