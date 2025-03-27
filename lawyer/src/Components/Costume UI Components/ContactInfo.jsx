import {ContactInfoData} from "../HardCodedData/ContactInfoData.jsx";

function ContactInfo() {

    return (
        <div className='bg-white rounded-xl p-8 shadow-md col-span-1 h-fit'>
            <h2 className='rtl text-2xl font-bold'>اطلاعات تماس</h2>
            <br/>
            <ul className='w-full space-y-6'>
                {ContactInfoData.map((item, index) => (
                    <li className='w-full' key={index}>
                        <>{item}</>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ContactInfo