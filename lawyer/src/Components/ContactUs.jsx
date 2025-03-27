import ContactForm from "./Costume UI Components/ContactForm.jsx";
import ContactInfo from "./Costume UI Components/ContactInfo.jsx";
import MapView from "./MapView.jsx";

function ContactUs() {

    return (
        <div className='bg-[#F9FAFB] w-full px-10 py-20 flex flex-col items-center'>
            <h2 className='text-4xl font-bold'>تماس <span className='text-[#3C38C8]'>با من</span></h2>
            <br/>
            <p className='text-gray-700 rtl'>برای مشاوره حقوقی و یا تعیین وقت ملاقات، از طریق راه‌های ارتباطی زیر با من در تماس باشید.</p>

            <br/>
            <br/>

            <div className='grid grid-cols-2 w-[95%] gap-8'>
                <div className='flex flex-col gap-8'>
                    <ContactInfo />
                    <MapView />
                </div>

                <ContactForm />
            </div>
        </div>
    )
}

export default ContactUs