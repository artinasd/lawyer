import lawyerHand from '../assets/lawyerHand.png'
import TwoElementCard from "./Costume UI Components/TwoElementCard.jsx";
import medalIcon from '../assets/medal.png'
import caseIcon from '../assets/caseIcon.png'
import bookIcon from '../assets/bookIcon.png'

function AboutPage() {

    return (
        <div className='flex md:flex-row flex-col py-20 rtl'>

            <div className="mx-auto px-4 md:px-6 w-full md:pr-16 md:pt-5 mb-4">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-[95%]">
                        <div className="relative">
                            <div
                                className="absolute -top-4 -right-4 w-full h-full border-2 border-indigo-700 rounded-lg">
                            </div>

                            <img
                                src={lawyerHand}
                                alt="Professional lawyer portrait"
                                className="rounded-lg shadow-lg relative z-10 w-full"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className='text-right md:pl-16 px-4'>
                <h2 className='text-4xl font-bold'>درباره <span className='text-[#4038C9]'>من</span></h2>

                <p className='text-gray-700 mt-6 rtl'>
                    من محمد حقوقی، وکیل پایه یک دادگستری با بیش از ۱۵ سال تجربه در زمینه‌های مختلف حقوقی هستم.
                    تخصص من در دعاوی مدنی، کیفری، خانواده و قراردادهای تجاری است.
                    <br/>
                    <br/>
                    هدف من ارائه خدمات حقوقی با بالاترین استانداردهای حرفه‌ای و اخلاقی است. من به هر پرونده با
                    دقت و تعهد کامل رسیدگی می‌کنم و همواره منافع موکلین خود را در اولویت قرار می‌دهم.
                </p>

                <div className='grid md:grid-cols-3 gap-6 mt-6 grid-cols-1'>
                    <TwoElementCard icon={bookIcon} text="تخصص چندگانه"/>
                    <TwoElementCard icon={caseIcon} text="۵۰۰+ پرونده موفق"/>
                    <TwoElementCard icon={medalIcon} text="۱۵+ سال تجربه"/>
                </div>

                <button
                    className='bg-[#4038C9] px-4 py-3 text-white rounded-md hover:bg-indigo-800 transition mt-4'>
                    تماس با من
                </button>
            </div>
        </div>
        )
        }

export default AboutPage;