import NavigationBar from "./Permanent Components/NavigationBar.jsx";
import Header from "./SPA Components/Header.jsx";
import AboutPage from "./SPA Components/AboutPage.jsx";
import Services from "./SPA Components/Services.jsx";
import Comments from "./SPA Components/Comments.jsx";
import ContactUs from "./SPA Components/ContactUs.jsx";
import Footer from "./SPA Components/Footer.jsx";
import {useRef} from "react";

function Homepage() {
    const homeRef = useRef(null);
    const aboutRef = useRef(null);
    const serviceRef = useRef(null);
    const commentRef = useRef(null);
    const contactRef = useRef(null);

    return (
        <div className='relative'>
            <NavigationBar
                scrollToSection={section => {
                    section.current.scrollIntoView({behavior: "smooth"});
                }}
                sections={{homeRef, aboutRef, serviceRef, commentRef, contactRef}}
            />

            <div ref={homeRef}><Header /></div>
            <div ref={aboutRef}><AboutPage /></div>
            <div ref={serviceRef}><Services /></div>
            <div ref={commentRef}><Comments /></div>
            <div ref={contactRef}><ContactUs /></div>
            <div><Footer /></div>
        </div>
    )
}

export default Homepage