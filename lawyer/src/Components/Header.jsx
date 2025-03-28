import courtStuff from '../assets/courtStuff.png'

function Header() {

    return (
        <div className='w-full flex flex-row items-center justify-end h-[510px] overflow-hidden bg-[#3C3A86]'>
            <img className='mx-auto scale-90 mt-[200px] opacity-20' src={courtStuff} />

            <div className='absolute left-1/2 transform -translate-x-1/2 flex flex-row space-x-36'>
                <p className='fade-in text-white max-w-[450px] text-lg text-right'>
                    با بیش از ۱۵ سال تجربه در زمینه‌های مختلف حقوقی، به شما کمک می‌کنیم تا به بهترین نتیجه ممکن در پرونده‌های حقوقی خود دست یابید<br/>
    تلاش ما بر ارائه مشاوره‌های جامع و به‌روز، همراه با ارائه راهکارهای حقوقی متناسب با هر پرونده است تا با دقت و شفافیت کامل، به بررسی و تحلیل مسائل حقوقی شما پرداخته و بهترین راه‌حل‌های ممکن را ارائه دهیم                </p>
                <h2 className='text-[64px] font-bold text-white w-[852px]'>
                    وکالت حرفه‌ای برای<br/><span className='text-[#FFCA0C]'>دفاع از حقوق شما</span>
                </h2>
            </div>

            <div className='absolute z-40 top-[420px] left-1/2 transform -translate-x-1/2 space-x-4'>
                <button className='bg-white/25 transition hover:bg-white/35 px-4 py-3 text-white rounded-md'>خدمات حقوقی</button>
                <button className='bg-yellow-500 transition hover:bg-yellow-600 px-4 py-3 rounded-md'>مشاوره رایگان</button>
            </div>
        </div>
    )
}

export default Header;