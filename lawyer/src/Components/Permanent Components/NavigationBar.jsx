import courtIcon from '../../assets/courtIcon.png'
import {useEffect, useState} from "react";

function NavigationBar(props) {
    const [isScrolling, setIsScrolling] = useState(false);

    function handleScroll() {
        setIsScrolling(window.scrollY > 0)
    }

    useEffect(function () {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return function cleanup() {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`transform duration-300 fixed w-full top-0 z-50 max-w-screen h-16 flex flex-row py-3 px-20
        ${isScrolling ? 'bg-white drop-shadow-lg' : 'bg-transparent'}`}>
            <div className='mr-auto'>
                <ul className='flex flex-row space-x-6 items-center mr-auto'>
                    <li>
                        <button className='bg-[#4038C9] rounded-lg text-white px-4 py-2'>مشاوره رایگان</button>
                    </li>

                    <li>
                        <button onClick={() => props.scrollToSection(props.sections.contactRef)}>تماس با من</button>
                    </li>

                    <li>
                        <button onClick={() => props.scrollToSection(props.sections.commentRef)}>نظرات موکلین</button>
                    </li>

                    <li>
                        <button onClick={() => props.scrollToSection(props.sections.serviceRef)}>خدمات</button>
                    </li>

                    <li>
                        <button onClick={() => props.scrollToSection(props.sections.aboutRef)}>درباره من</button>
                    </li>

                    <li>
                        <button onClick={() => props.scrollToSection(props.sections.homeRef)}>خانه</button>
                    </li>
                </ul>
            </div>

            <div className='ml-auto flex flex-row items-center space-x-2'>
                <h2 className='font-bold text-lg'>محمد حقوقی</h2>
                <img className='w-10' src={courtIcon} />
            </div>
        </div>
    )
}

export default NavigationBar;