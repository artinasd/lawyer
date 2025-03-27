function InputTag(props) {

    return (
        <div className='rtl'>
            <h3 className='font-medium text-gray-700 mb-2'>{props.label}</h3>
            <input className='focus:outline-blue-600 transform duration-200 w-full placeholder:text-sm border border-gray-300 rounded-md px-2 py-2'
                   type='text'
                   placeholder={props.placeholder} />
        </div>
    )
}

export default InputTag;