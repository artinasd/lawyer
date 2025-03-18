import courtIcon from '../../assets/courtIcon.png'

function NavigationBar() {
    return (
        <div className='sticky top-0 z-50 max-w-screen h-16 bg-[#3C3A86] flex flex-row py-3 px-20'>
            <div className='mr-auto'>
                <ul className='flex flex-row space-x-6 items-center mr-auto'>
                    <li>
                        <button className='bg-[#4038C9] rounded-lg text-white px-4 py-2'>مشاوره رایگان</button>
                    </li>
                    <li>تماس با من</li>
                    <li>نظرات موکلین</li>
                    <li>خدمات</li>
                    <li>درباره من</li>
                    <li>خانه</li>
                </ul>
            </div>

            <div className='ml-auto flex flex-row items-center space-x-2'>
                <h2 className='font-bold text-lg'>آرتین اسعدی</h2>
                <img className='w-10' src={courtIcon} />
            </div>
        </div>
    )
}

export default NavigationBar;