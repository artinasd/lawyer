import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';

function Footer() {

    return (
        <div className='bg-gray-900 w-full pt-12 pb-6 flex flex-col items-center'>
            <h2 className='text-white text-lg font-bold mb-2'>محمد حقوقی</h2>

            <div className='flex flex-row items-center gap-6'>
                <LocalPhoneOutlinedIcon style={{color: '#6F82E3'}} />
                <EmailOutlinedIcon style={{color: '#6F82E3'}} />
                <LanguageOutlinedIcon style={{color: '#6F82E3'}} />
            </div>

            <hr className='w-[90%] my-4 border border-gray-800' />

            <p className='text-gray-500'>تمامی حقوق محفوظ است</p>
        </div>
    )
}

export default Footer