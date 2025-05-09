function BlogPostCard(props) {

    function textSplitter(text, limit) {
        return text.slice(0, limit) + '...'
    }

    return (
        <div className='bg-white rounded-md w-fit h-fit col-span-1 shadow-md text-right hover:scale-[101%] transition'>
            <img src={props.pic} className='h-52 w-full overflow-hidden rounded-t-md' />
            <div className='p-4'>
                <br />
                <h2 className='line-clamp-1 font-bold text-lg rtl'>
                    {textSplitter(props.title, 70)}
                </h2>
                <br />
                <p className='line-clamp-4 relative'>
                    {props.description}
                    <span aria-hidden={true} className='pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent' />
                </p>
                <br />
                <button
                    className='border-2 border-indigo-500 px-2 py-1 rounded-md font-bold
                    text-sm w-full hover:bg-indigo-600 hover:border-indigo-600 hover:text-white transition text-gray-700'>
                    مشاهده مطلب
                </button>
            </div>
        </div>
    )
}

export default BlogPostCard