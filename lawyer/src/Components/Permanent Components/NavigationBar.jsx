import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavigationBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50" dir="rtl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo / Brand */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold text-[#D4AF37]">
                            دفتر وکالت
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 space-x-reverse items-center">
                        <Link to="/" className="text-gray-700 hover:text-[#D4AF37] font-medium transition-colors">
                            صفحه اصلی
                        </Link>
                        <a href="/#about" className="text-gray-700 hover:text-[#D4AF37] font-medium transition-colors">
                            درباره من
                        </a>
                        <a href="/#services" className="text-gray-700 hover:text-[#D4AF37] font-medium transition-colors">
                            خدمات
                        </a>
                        <Link to="/blog" className="text-gray-700 hover:text-[#D4AF37] font-medium transition-colors">
                            مقالات حقوقی
                        </Link>
                        <a href="/#contact" className="text-gray-700 hover:text-[#D4AF37] font-medium transition-colors">
                            تماس با ما
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-700 hover:text-[#D4AF37] focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white border-t shadow-inner">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
                        <Link
                            to="/"
                            onClick={() => setIsOpen(false)}
                            className="text-gray-700 hover:text-[#D4AF37] hover:bg-gray-50 block px-3 py-2 rounded-md font-medium text-right"
                        >
                            صفحه اصلی
                        </Link>
                        <a
                            href="/#about"
                            onClick={() => setIsOpen(false)}
                            className="text-gray-700 hover:text-[#D4AF37] hover:bg-gray-50 block px-3 py-2 rounded-md font-medium text-right"
                        >
                            درباره من
                        </a>
                        <a
                            href="/#services"
                            onClick={() => setIsOpen(false)}
                            className="text-gray-700 hover:text-[#D4AF37] hover:bg-gray-50 block px-3 py-2 rounded-md font-medium text-right"
                        >
                            خدمات
                        </a>
                        <Link
                            to="/blog"
                            onClick={() => setIsOpen(false)}
                            className="text-gray-700 hover:text-[#D4AF37] hover:bg-gray-50 block px-3 py-2 rounded-md font-medium text-right"
                        >
                            مقالات حقوقی
                        </Link>
                        <a
                            href="/#contact"
                            onClick={() => setIsOpen(false)}
                            className="text-gray-700 hover:text-[#D4AF37] hover:bg-gray-50 block px-3 py-2 rounded-md font-medium text-right"
                        >
                            تماس با ما
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}