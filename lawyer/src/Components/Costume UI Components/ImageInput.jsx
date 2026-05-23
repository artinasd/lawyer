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
                setBase64Image(base64Image)
                // Pass the image data to the parent component
                if (props.onChange) {
                    props.onChange(base64Image);
                }
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
            { (base64Image || props.image) && (
                <img className='rounded-md w-[50%]' src={base64Image || props.image} alt="Preview" />
            )}
        </div>
    )
}

export default ImageInput;