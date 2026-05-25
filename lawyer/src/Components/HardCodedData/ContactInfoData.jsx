import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

export const ContactInfoData = [

    // Item 1: Location
    <div className='flex flex-row items-center gap-4 w-full'>
        <div className='rounded-full w-12 h-12 flex-shrink-0 bg-white/10 flex items-center justify-center'>
            <LocationOnOutlinedIcon style={{color: '#FFCA0C'}} fontSize="medium" />
        </div>
        <div className='flex flex-col items-start text-right'>
            <h3 className='text-lg font-bold text-white mb-1'>محل سکونت</h3>
            <p className='text-gray-200 text-sm'>تهران</p>
        </div>
    </div>,

    // Item 2: Phone
    <div className='flex flex-row items-center gap-4 w-full'>
        <div className='rounded-full w-12 h-12 flex-shrink-0 bg-white/10 flex items-center justify-center'>
            <LocalPhoneOutlinedIcon style={{color: '#FFCA0C'}} fontSize="medium" />
        </div>
        <div className='flex flex-col items-start text-right'>
            <h3 className='text-lg font-bold text-white mb-1'>شماره تماس</h3>
            <p className='text-gray-200 text-sm' dir="ltr">09124201285</p>
        </div>
    </div>,

    // Item 3: Email
    <div className='flex flex-row items-center gap-4 w-full'>
        <div className='rounded-full w-12 h-12 flex-shrink-0 bg-white/10 flex items-center justify-center'>
            <EmailOutlinedIcon style={{color: '#FFCA0C'}} fontSize="medium" />
        </div>
        <div className='flex flex-col items-start text-right'>
            <h3 className='text-lg font-bold text-white mb-1'>آدرس ایمیل</h3>
            <p className='text-gray-200 text-sm'>chalaki.ebrahim@gmail.com</p>
        </div>
    </div>,

    // Item 4: Working Hours
    <div className='flex flex-row items-center gap-4 w-full'>
        <div className='rounded-full w-12 h-12 flex-shrink-0 bg-white/10 flex items-center justify-center'>
            <AccessTimeOutlinedIcon style={{color: '#FFCA0C'}} fontSize="medium" />
        </div>
        <div className='flex flex-col items-start text-right'>
            <h3 className='text-lg font-bold text-white mb-1'>ساعات کاری</h3>
            <p className='text-gray-200 text-sm leading-relaxed'>
                شنبه تا چهارشنبه: ۹ صبح تا ۵ عصر
                <br/>
                پنجشنبه: ۹ صبح تا ۱ بعدازظهر
            </p>
        </div>
    </div>,
];