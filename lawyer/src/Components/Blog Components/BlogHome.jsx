import BlogHeader from "./BlogHeader.jsx";
import BlogPostCard from "../Costume UI Components/BlogPostCard.jsx";
import {useEffect, useState} from "react";
import supabase from '../../supabase.js'
import loadingGif from '../../assets/loadingGif.gif'

function BlogHome() {
    const [posts, setPosts] = useState(null);
    const [isExtended, setIsExtended] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    const [postPointer, setPostPointer] = useState(0)

    useEffect(() => {
        async function fetchPosts() {
            let { data: posts, error } = await supabase
                .from('posts')
                .select('*')
            setPosts(posts)
        }
        fetchPosts()
    }, []);

    function handleExtend() {
        setIsExtended(true);
        setPageNumber(1)
    }

    return (
        <div className=''>
            <BlogHeader />

            {posts ? (
                <div className='flex items-center justify-center'>
                    <ul className='grid grid-cols-3 gap-6 px-30 mt-30'>
                        {posts.slice(postPointer, !isExtended ? 3 : postPointer+6).map((post, index) => (
                            <li key={index}>
                                <BlogPostCard title={post.title} description={post.text} pic={post.image} id={post.id} />
                            </li>
                        ))}
                    </ul>
                </div>
            ): (
                <img className='mx-auto mt-30 w-20' src={loadingGif} />
            )}

            {!isExtended && posts ?
                <div className='border border-black p-3 mx-auto mt-20 w-fit hover:bg-white transition hover:scale-[101%]'>
                    <button onClick={handleExtend}>
                        <p>مشاهده بیشتر</p>
                    </button>
                </div> :

                <></>
            }

            {/* PAGINATION */}
            {isExtended && posts ? (
                <div className='flex items-center justify-center mt-30'>
                    <ul className='flex flex-row items-center space-x-2'>
                        {Array.from({length: Math.floor(posts.length/6)}).map((_, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => {
                                        setPageNumber(index + 1)
                                        setPostPointer(index * 6)
                                    }}
                                    className={`border p-2 w-10 h-10 rounded-md
                                            hover:bg-indigo-600 hover:text-white
                                            transition duration-500
                                            ${index + 1 === pageNumber ? 'bg-indigo-600 text-white' : 'bg-white'}`}>
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) :
                <></>
            }
        </div>
    )
}

export default BlogHome