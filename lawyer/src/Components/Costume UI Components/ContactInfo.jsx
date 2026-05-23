import {ContactInfoData} from "../HardCodedData/ContactInfoData.jsx";

function ContactInfo() {

    return (
        <div className='w-full flex flex-col items-start h-fit' dir="rtl">
            <ul className='w-full space-y-8'>
                {ContactInfoData.map((item, index) => (
                    <li className='w-full flex' key={index}>
                        <>{item}</>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ContactInfo