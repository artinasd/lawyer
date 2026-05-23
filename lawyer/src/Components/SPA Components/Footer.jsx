import React from "react";
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { Link } from "react-router-dom"; // Ensure react-router-dom is used if you have blog links

function Footer() {
    return (
        <footer className='bg-[#111026] text-gray-300 pt-16 pb-8 border-t-4 border-[#FFCA0C] rtl'>
            <div className='max-w-7xl mx-auto px-6 lg:px-8'>

                {/* Top Grid Area */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-12 mb-12'>

                    {/* Brand / Bio */}
                    <div className="flex flex-col">
                        <h2 className='text-white text-2xl font-bold mb-4 flex items-center gap-2'>
                            <div className="w-2 h-8 bg-[#FFCA0C] rounded-full"></div>
                            محمد حقوقی
                        </h2>
                        <p className="text-gray-400 leading-relaxed text-sm text-justify">
                            ارائه خدمات تخصصی وکالت و مشاوره حقوقی با تکیه بر سال‌ها تجربه موفق در محاکم دادگستری. تعهد، صداقت و پیگیری مستمر، اصول اساسی کار ماست.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col md:pr-10">
                        <h3 className="text-white text-lg font-bold mb-4">دسترسی سریع</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><a href="/#home" className="hover:text-[#FFCA0C] transition-colors">صفحه اصلی</a></li>
                            <li><a href="/#about" className="hover:text-[#FFCA0C] transition-colors">درباره وکیل</a></li>
                            <li><a href="/#services" className="hover:text-[#FFCA0C] transition-colors">خدمات حقوقی</a></li>
                            <li><Link to="/blog" className="hover:text-[#FFCA0C] transition-colors">مقالات و آموزش‌ها</Link></li>
                        </ul>
                    </div>

                    {/* Socials / Contact */}
                    <div className="flex flex-col">
                        <h3 className="text-white text-lg font-bold mb-4">ارتباط با ما</h3>
                        <p className="text-gray-400 text-sm mb-6">
                            برای اطلاع از آخرین قوانین و مقالات، ما را در شبکه‌های اجتماعی دنبال کنید.
                        </p>
                        <div className='flex flex-row items-center gap-4'>
                            <button className='w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FFCA0C] hover:-translate-y-1 transition-all duration-300 group'>
                                <LocalPhoneOutlinedIcon className="text-gray-400 group-hover:text-gray-900" fontSize="small" />
                            </button>
                            <button className='w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FFCA0C] hover:-translate-y-1 transition-all duration-300 group'>
                                <EmailOutlinedIcon className="text-gray-400 group-hover:text-gray-900" fontSize="small" />
                            </button>
                            <button className='w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FFCA0C] hover:-translate-y-1 transition-all duration-300 group'>
                                <LanguageOutlinedIcon className="text-gray-400 group-hover:text-gray-900" fontSize="small" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className='pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4'>
                    <p className='text-gray-500 text-sm'>
                        تمامی حقوق مادی و معنوی این وب‌سایت محفوظ می‌باشد. © {new Date().getFullYear()}
                    </p>
                    <p className='text-gray-500 text-xs'>
                        طراحی و توسعه با <span className="text-red-500">♥</span>
                    </p>
                </div>

            </div>
        </footer>
    );
}

export default Footer;