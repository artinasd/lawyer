// lawyer/src/Components/Admin/AllPosts.jsx
import { useEffect, useState } from "react";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetching from the backend running on port 5000
        fetch('http://localhost:5000/api/posts')
            .then(res => res.json())
            .then(data => {
                setPosts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching posts:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-10">در حال بارگذاری...</div>;

    return (
        <div className='p-10 rtl'>
            <h2 className='text-2xl font-bold mb-6'>لیست تمام پست‌ها</h2>
            <div className="grid gap-4">
                {posts.length > 0 ? (
                    posts.map(post => (
                        <div key={post.id} className='border p-4 rounded shadow-sm bg-white'>
                            <h3 className='font-bold text-lg'>{post.title}</h3>
                            <p className='text-gray-600'>{post.excerpt}</p>
                        </div>
                    ))
                ) : (
                    <p>پستی برای نمایش وجود ندارد.</p>
                )}
            </div>
        </div>
    );
}

export default AllPosts;