function ThreeElementCard(props) {

    return (
        <div className='bg-white p-6 drop-shadow-lg rounded-lg'>
            <div className='bg-[#DEE7FF] rounded-full w-12 h-12 flex items-center justify-center'>
                {props.children}
            </div>

            <div className='flex flex-col items-end'>
                <h3 className='font-bold text-xl mt-2'>{props.title}</h3>

                <p className='text-right mt-2 text-gray-700'>{props.description}</p>
            </div>
        </div>
    )
}

export default ThreeElementCard