import lawyerHand from '../assets/lawyerHand.png'
import TwoElementCard from "./Costume UI Components/TwoElementCard.jsx";
import medalIcon from '../assets/medal.png'
import caseIcon from '../assets/caseIcon.png'
import bookIcon from '../assets/bookIcon.png'

function AboutPage() {

    return (
        <div className='grid grid-cols-2 mt-10'>
            <div className='relative col-span-1 order-2'>
                <div className='absolute top-[16px] mx-auto border-2 rounded-lg right-[32px] h-[380px] w-[570px] border-[#4038C9]' />
                <img className='z-50 scale-[85%] mx-auto rounded-xl' src={lawyerHand} />
            </div>

            <div className='col-span-1 order-1 text-right pl-16 mt-8'>
                <h2 className='text-4xl font-bold'>درباره <span className='text-[#4038C9]'>من</span></h2>

                <p className='text-gray-700 mt-6'>
                    من محمد حقوقی، وکیل پایه یک دادگستری با بیش از ۱۵ سال تجربه در زمینه‌های مختلف حقوقی هستم. تخصص من در دعاوی مدنی، کیفری، خانواده و قراردادهای تجاری است.
                    <br/>
                    <br/>
                    هدف من ارائه خدمات حقوقی با بالاترین استانداردهای حرفه‌ای و اخلاقی است. من به هر پرونده با دقت و تعهد کامل رسیدگی می‌کنم و همواره منافع موکلین خود را در اولویت قرار می‌دهم.
                </p>

                <div className='grid grid-cols-3 gap-6 mt-6'>
                    <TwoElementCard icon={bookIcon} text="تخصص چندگانه" />
                    <TwoElementCard icon={caseIcon} text="۵۰۰+ پرونده موفق" />
                    <TwoElementCard icon={medalIcon} text="۱۵+ سال تجربه" />
                </div>

                <button className='bg-[#4038C9] px-4 py-3 text-white rounded mt-4'>
                    تماس با من
                </button>
            </div>
        </div>
    )
}

export default AboutPage;