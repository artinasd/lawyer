import InputTag from "../Costume UI Components/InputTag.jsx";

function AdminLogin() {

    return (
        <div className='bg-gray-50 w-screen h-screen flex rtl'>
            <div className='w-[45%] bg-white shadow-md rounded-lg mx-auto my-auto h-fit p-6'>
                <InputTag placeholder={'نام کاربری خود را وارد کنید'} label={'نام کاربری'} />
                <br/>
                <InputTag placeholder={'رمز عبور خود را وارد کنید'} label={'رمز عبور'} />
                <br/>
                <button className='text-white bg-indigo-600 py-2 px-4 rounded-md'>ورود</button>
            </div>
        </div>
    )
}

export default AdminLogin;