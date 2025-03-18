import ThreeElementCard from "./Costume UI Components/ThreeElementCard.jsx";
import {ServicesData} from "./HardCodedData/ServicesData.js";
import {ServicesIcons} from "./HardCodedData/ServicesIcons.jsx";

function Services() {

    return (
        <div className='bg-[#F9FAFB] w-full px-10 py-20 flex flex-col items-center'>
            <h2 className='text-4xl font-bold'>خدمات <span className='text-[#4038C9]'>حقوقی</span></h2>

            <br/>
            <p className='text-gray-700 text-center'>من در زمینه‌های مختلف حقوقی خدمات تخصصی ارائه می‌دهم.<br/>با تکیه بر دانش و تجربه، به دنبال بهترین راه‌حل برای مشکلات حقوقی شما هستم.</p>

            <br/>
            <br/>

            <ul className='grid grid-cols-3 gap-6'>
                {ServicesData.map((each, index) => (
                    <li key={index}>
                        <ThreeElementCard title={each.title} description={each.description}>
                            <>{ServicesIcons[index]}</>
                        </ThreeElementCard>
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default Services;