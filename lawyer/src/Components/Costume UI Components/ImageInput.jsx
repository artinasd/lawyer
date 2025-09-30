import {useRef, useState} from "react";

function ImageInput(props) {
    const inputRef = useRef(null);
    const [base64Image, setBase64Image] = useState(null);

    function handleButtonClick() {
        inputRef.current.click()
    }

    function toBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
    }

    function handleChange(e) {
        const file = e.target.files[0];
        async function handleImageUpload() {
            try {
                const base64Image = await toBase64(file)
                console.log(base64Image)
                setBase64Image(base64Image)
            }
            catch (error) {
                alert(error)
            }
        }
        handleImageUpload()
    }

    return (
        <div className='rtl flex flex-row items-start'>
            <div className='w-[50%]'>
                <h3 className='font-medium mb-2'>{props.label}</h3>
                <input ref={inputRef} onChange={handleChange} className='hidden' type='file' />
                <button
                    disabled={base64Image}
                    className={`border rounded py-2 px-6 ${base64Image ? 'border-gray-300 text-gray-300 cursor-not-allowed' : ''}`}
                    onClick={handleButtonClick}>
                    بارگذاری تصویر جدید
                </button>
            </div>
            <img className='rounded-md w-[50%]' src={!base64Image ? props.image : base64Image} />
        </div>
    )
}

export default ImageInput;