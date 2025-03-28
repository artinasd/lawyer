import InputTag from "./InputTag.jsx";

function ContactForm() {

    return (
        <div className='bg-white rounded-xl p-8 shadow-md col-span-1'>
            <h2 className='text-2xl font-bold rtl'>فرم تماس</h2>
            <br/>
            <div className='grid grid-cols-2 gap-10'>
                <InputTag label='ایمیل' placeholder='آدرس ایمیل خود را وارد نمایید' />
                <InputTag label='نام و نام خانوادگی' placeholder='نام و نام خانوادگی' />
            </div>

            <br/>
            <InputTag label='شماره تماس' placeholder='شماره تماس خود را وارد نمایید' />

            <br/>
            <InputTag label='موضوع' placeholder='موضوع پیام خود را وارد نمایید' />

            <br/>
            <h3 className='font-medium text-gray-700 mb-2 rtl'>پیام</h3>
            <textarea
                className='resize-none w-full placeholder:text-sm border border-gray-300 rounded-md px-2 py-2 rtl h-28 focus:outline-blue-600 transform duration-200'
                placeholder='متن پیام خود را وارد نمایید'
            />

            <br/>
            <br/>
            <button className='bg-[#4038C9] w-full text-white p-2 rounded-md hover:bg-indigo-800 transition'>ارسال پیام</button>
        </div>
    )
}

export default ContactForm