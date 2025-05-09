import HeaderPic from '../../assets/LawyerHands.jpg'

function BlogHeader() {

    return (
        <div className='relative mt-16'>
            <div className='w-full max-h-96 overflow-y-clip'>
                <img className='w-full' src={HeaderPic} />
                <div className="absolute bottom-0 w-full h-64 bg-gradient-to-b from-transparent to-gray-50 pointer-events-none" />
            </div>
            <div className='absolute flex flex-col items-center justify-end pb-10 inset-0'>
                <h2 className='bg-black/70 p-5 rounded-md text-white w-fit h-fit text-4xl rtl font-bold'>
                    آگاهی حقوقی، اولین گام به سوی عدالت
                </h2>

                <br/>
                <br/>
                <p className='w-[35%] text-center rtl font-extrabold'>با بهره‌گیری از دانش حقوقی، تجربه‌ی عملی و نگرشی مسئولانه، در کنار شما هستم تا با زبانی ساده و قابل فهم، مفاهیم پیچیده‌ی حقوقی را روشن کنم و در مسیر شناخت بهتر قوانین و مقررات همراهی‌تان کنم.</p>
            </div>

        </div>
    )
}

export default BlogHeader