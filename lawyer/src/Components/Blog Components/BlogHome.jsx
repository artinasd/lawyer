import React, { useState, useEffect } from 'react';
import BlogHeader from "./BlogHeader.jsx";
import BlogPostCard from "../Costume UI Components/BlogPostCard.jsx";
import loadingGif from '../../assets/loadingGif.gif';
import { tempData } from "../tempData.js";

function BlogHome() {
    const [posts, setPosts] = useState(null);
    const [isExtended, setIsExtended] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const postsPerPage = 6;

    useEffect(() => {
        // Simulate fetching from backend using tempData
        setTimeout(() => {
            // Add unique IDs to tempData for routing
            const postsWithIds = tempData.map((post, index) => ({
                ...post,
                id: index + 1
            }));
            setPosts(postsWithIds);
        }, 500);
    }, []);

    function handleExtend() {
        setIsExtended(true);
    }

    // Calculate pagination
    const indexOfLastPost = pageNumber * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts?.slice(
        isExtended ? indexOfFirstPost : 0,
        isExtended ? indexOfLastPost : 3
    );

    const totalPages = posts ? Math.ceil(posts.length / postsPerPage) : 0;

    return (
        <div className='bg-[#F9FAFB] min-h-screen'>
            <BlogHeader />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
                {posts ? (
                    <>
                        {/* Blog Grid */}
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20 rtl'>
                            {currentPosts.map((post) => (
                                <BlogPostCard
                                    key={post.id}
                                    id={post.id}
                                    title={post.title}
                                    description={post.body}
                                    pic={post.image}
                                />
                            ))}
                        </div>

                        {/* Load More Button */}
                        {!isExtended && posts.length > 3 && (
                            <div className='flex justify-center mt-16'>
                                <button
                                    onClick={handleExtend}
                                    className='bg-white border-2 border-gray-200 text-gray-700 px-8 py-3 rounded-full font-bold hover:border-[#4038C9] hover:text-[#4038C9] transition-colors shadow-sm'>
                                    مشاهده مقالات بیشتر
                                </button>
                            </div>
                        )}

                        {/* Pagination */}
                        {isExtended && totalPages > 1 && (
                            <div className='flex justify-center items-center mt-16 gap-2' dir="ltr">
                                {Array.from({length: totalPages}).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setPageNumber(index + 1)}
                                        className={`w-10 h-10 rounded-lg font-bold transition-colors duration-300
                                            ${index + 1 === pageNumber
                                            ? 'bg-[#4038C9] text-white shadow-md'
                                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                        }`}>
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex justify-center items-center py-32">
                        <img className='w-16 h-16' src={loadingGif} alt="Loading..." />
                    </div>
                )}
            </div>
        </div>
    );
}

export default BlogHome;