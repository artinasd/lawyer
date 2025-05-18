import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';

function AdminPanel() {

    return (
        <div className='h-screen flex flex-col bg-gray-50'>
            <div className='rtl flex justify-center space-x-10 my-auto'>

                <button className='bg-white p-2 aspect-square rounded-lg w-32 shadow-lg hover:shadow transition transition active:bg-gray-100'>
                    <div>
                        <AddOutlinedIcon />
                        <p>ثبت پست جدید</p>
                    </div>
                </button>

                <button className='bg-white p-2 aspect-square rounded-lg w-32 shadow-lg hover:shadow transition transition active:bg-gray-100'>
                    <div>
                        <MapsUgcOutlinedIcon />
                        <p>ثبت نظر جدید</p>
                    </div>
                </button>

                <button className='bg-white p-2 aspect-square rounded-lg w-32 shadow-lg hover:shadow transition transition active:bg-gray-100'>
                    <div>
                        <RemoveRedEyeOutlinedIcon />
                        <p>همه پست ها</p>
                    </div>
                </button>

                <button className='bg-white p-2 aspect-square rounded-lg w-32 shadow-lg hover:shadow transition active:bg-gray-100'>
                    <div>
                        <SummarizeOutlinedIcon />
                        <p>همه نظرات</p>
                    </div>
                </button>

            </div>
        </div>
    )
}

export default AdminPanel