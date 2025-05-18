import InputTag from "../Costume UI Components/InputTag.jsx";
import TextArea from "../Costume UI Components/TextArea.jsx";
import ImageInput from "../Costume UI Components/ImageInput.jsx";

function NewPost() {

    return (
        <div className='bg-gray-50 max-w-screen min-h-screen flex rtl py-20'>
            <div className='bg-white rounded-lg p-6 my-auto mx-auto w-[40%] h-fit'>

                <div className='w-[50%]'>
                    <InputTag label='عنوان مقاله' placeholder='عنوان مقاله جدید را وارد کنید' />
                </div>
                <br/>

                <div className='w-full'>
                    <TextArea label='متن مقاله را وارد کنید' placeholder='متن مقاله' />
                </div>
                <br/>

                <div className='w-full'>
                    <ImageInput image='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' label={'تصویر مطلب را بارگذاری کنید'} />
                </div>
                <br/>

                <button className='rounded-md bg-indigo-600 text-white p-2'>ثبت</button>

            </div>
        </div>
    )
}

export default NewPost