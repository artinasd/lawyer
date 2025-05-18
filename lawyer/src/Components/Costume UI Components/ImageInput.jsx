import {useRef} from "react";

function ImageInput(props) {
    const inputRef = useRef(null);

    function handleButtonClick() {
        inputRef.current.click()
    }

    function handleChange(e) {
        const file = e.target.files[0];
    }

    return (
        <div className='rtl'>
            <h3 className='font-medium text-gray-700 mb-2'>{props.label}</h3>
            <input ref={inputRef} onChange={handleChange} className='hidden' type='file' />
            <button onClick={handleButtonClick}>بارگذاری تصویر جدید</button>
            <img className='rounded-md' src={props.image} />
        </div>
    )
}

export default ImageInput;