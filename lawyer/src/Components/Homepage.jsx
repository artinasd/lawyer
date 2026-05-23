import Header from "./SPA Components/Header.jsx";
import AboutPage from "./SPA Components/AboutPage.jsx";
import Services from "./SPA Components/Services.jsx";
import Comments from "./SPA Components/Comments.jsx";
import ContactUs from "./SPA Components/ContactUs.jsx";

function Homepage() {
    return (
        <div className='relative'>
            {/* Added IDs so the NavigationBar scroll links work smoothly */}
            <div id="home"><Header /></div>
            <div id="about" className="scroll-mt-20"><AboutPage /></div>
            <div id="services" className="scroll-mt-20"><Services /></div>
            <div id="comments" className="scroll-mt-20"><Comments /></div>
            <div id="contact" className="scroll-mt-20"><ContactUs /></div>
        </div>
    )
}

export default Homepage;