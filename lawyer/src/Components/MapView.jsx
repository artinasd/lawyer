function MapView() {

    return (
        <div className='bg-white rounded-xl p-6 shadow-md col-span-1 h-fit overflow-c'>
            <>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8968.111361140782!2d46.04688157387684!3d37.3731286604971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x401b22e82dcf35c7%3A0x83c84a0115b6b578!2z2K_Yp9mG2LTar9in2Ycg2KjZhtin2Kg!5e0!3m2!1sen!2s!4v1742911374162!5m2!1sen!2s"
                    className='w-[100%] rounded-xl' allowFullScreen="" loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"></iframe>
            </>
        </div>
    )
}

export default MapView