import NavigationBar from "./Permanent Components/NavigationBar.jsx";
import BlogHome from "./Blog Components/BlogHome.jsx";
import {useState} from "react";

function BlogLanding() {

    return (
        <div className='pb-30 bg-[#F9FAFB]'>
            <NavigationBar fixed={true} />
            <BlogHome />
        </div>
    )
}

export default BlogLanding;