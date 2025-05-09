import BlogHeader from "./BlogHeader.jsx";
import BlogPostCard from "../Costume UI Components/BlogPostCard.jsx";
import {useEffect, useState} from "react";
import supabase from '../../supabase.js'
import loadingGif from '../../assets/loadingGif.gif'

function BlogHome() {
    const [posts, setPosts] = useState(null);
    const [isExtended, setIsExtended] = useState(null);
    function handleExtend() {
        setIsExtended(true);
    }

    useEffect(() => {
        async function fetchPosts() {
            let { data: posts, error } = await supabase
                .from('posts')
                .select('*')
            setPosts(posts)
        }
        fetchPosts()
    }, []);

    return (
        <div className=''>
            <BlogHeader />

            {posts ? (
                <div className='flex items-center justify-center'>
                    <ul className='grid grid-cols-3 gap-6 px-30 mt-30'>
                        {posts.slice(0, !isExtended ? 3 : posts.length).map((post, index) => (
                            <li key={index}>
                                <BlogPostCard title={post.title} description={post.text} pic={post.image} />
                            </li>
                        ))}
                    </ul>
                </div>
            ): (
                <img className='mx-auto mt-30 w-20' src={loadingGif} />
            )}

            {!isExtended ?
                <div className='border border-black p-3 mx-auto mt-20 w-fit hover:bg-white transition hover:scale-[101%]'>
                    <button onClick={handleExtend}>
                        <p>مشاهده بیشتر</p>
                    </button>
                </div> :

                <></>
            }
        </div>
    )
}

export default BlogHome