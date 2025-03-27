import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

export const ContactInfoData = [

    <div className='flex flex-row'>
        <div className='rounded-full w-12 h-12 bg-[#DEE7FF] flex items-center justify-center mr-auto'>
            <LocationOnOutlinedIcon style={{color: '#4038C9'}} />
        </div>
        <div className='flex flex-col items-start rtl'>
            <h3 className='text-lg font-medium'>آدرس دفتر</h3>
            <p className='text-gray-700'>بناب، بزرگراه ولایت، جنب پلیس راه</p>
        </div>
    </div>,

    <div className='flex flex-row justify-around'>
        <div className='rounded-full w-12 h-12 bg-[#DEE7FF] flex items-center justify-center mr-auto'>
            <LocalPhoneOutlinedIcon style={{color: '#4038C9'}} />
        </div>
        <div className='flex flex-col items-start rtl'>
            <h3 className='text-lg font-medium'>شماره تماس</h3>
            <p className='text-gray-700'>09901153548</p>
        </div>
    </div>,

    <div className='flex flex-row justify-around'>
        <div className='rounded-full w-12 h-12 bg-[#DEE7FF] flex items-center justify-center mr-auto'>
            <EmailOutlinedIcon style={{color: '#4038C9'}} />
        </div>
        <div className='flex flex-col items-start rtl'>
            <h3 className='text-lg font-medium'>آدرس ایمیل</h3>
            <p className='text-gray-700'>artinasd.dev@gmail.com</p>
        </div>
    </div>,

    <div className='flex flex-row justify-around'>
        <div className='rounded-full w-12 h-12 bg-[#DEE7FF] flex items-center justify-center mr-auto'>
            <AccessTimeOutlinedIcon style={{color: '#4038C9'}} />
        </div>
        <div className='flex flex-col items-start rtl'>
            <h3 className='text-lg font-medium'>ساعات کاری</h3>
            <p className='text-gray-700 text-right'>شنبه تا چهارشنبه: ۹ صبح تا ۵ عصر
            <br/>
            پنجشنبه: ۹ صبح تا ۱ بعدازظهر</p>
        </div>
    </div>,
]