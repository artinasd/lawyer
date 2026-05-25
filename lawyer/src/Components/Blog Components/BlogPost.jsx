// lawyer/src/Components/Blog Components/BlogPost.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import loadingGif from '../../assets/loadingGif.gif';
import fallbackAuthorPic from '../../assets/person1.jpg';

export default function BlogPost() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [recentPosts, setRecentPosts] = useState([]);
    const [siteSettings, setSiteSettings] = useState(null);

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ name: '', content: '' });
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);

        const fetchPostData = async () => {
            try {
                // Fetch Global Settings
                const settingsRes = await fetch('http://localhost:5000/api/settings');
                if (settingsRes.ok) {
                    setSiteSettings(await settingsRes.json());
                }

                // Fetch Posts
                const response = await fetch('http://localhost:5000/api/posts');
                if (response.ok) {
                    const allPosts = await response.json();
                    const currentPost = allPosts.find(p => p.id.toString() === postId);
                    setPost(currentPost || null);

                    const otherPosts = allPosts
                        .filter(p => p.id.toString() !== postId)
                        .slice(0, 5);
                    setRecentPosts(otherPosts);
                }

                // Fetch APPROVED comments
                const commentsResponse = await fetch(`http://localhost:5000/api/posts/${postId}/comments`);
                if (commentsResponse.ok) {
                    const commentsData = await commentsResponse.json();
                    setComments(commentsData);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPostData();
    }, [postId]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.name.trim() || !newComment.content.trim()) return alert("لطفا نام و پرسش خود را وارد کنید.");

        setIsSubmittingComment(true);
        try {
            const response = await fetch(`http://localhost:5000/api/posts/${postId}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newComment)
            });

            if (response.ok) {
                setNewComment({ name: '', content: '' });
                alert("پرسش شما با موفقیت ثبت شد و پس از بررسی در سایت نمایش داده خواهد شد.");
            } else {
                alert("خطا در ثبت نظر.");
            }
        } catch (error) {
            alert("خطا در ارتباط با سرور.");
        } finally {
            setIsSubmittingComment(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <img src={loadingGif} alt="در حال بارگذاری..." className="w-16 h-16" />
            </div>
        );
    }

    if (!post) {
        return <div className="flex justify-center items-center min-h-screen rtl"><h2 className="text-2xl font-bold text-gray-700">مقاله مورد نظر یافت نشد.</h2></div>;
    }

    // CHANGED: Now using author_name, author_image, and author_bio!
    const displayAuthorName = siteSettings?.author_name || post.author || 'تیم حقوقی';
    const displayAuthorPic = siteSettings?.author_image || fallbackAuthorPic;
    const displayAuthorBio = siteSettings?.author_bio || 'وکیل پایه یک دادگستری و مشاور حقوقی با سال‌ها تجربه در ارائه راهکارهای تخصصی در پرونده‌های کیفری، حقوقی و خانواده.';

    return (
        <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row gap-8 mt-10 mb-24" dir="rtl">
            <main className="md:w-3/4 flex flex-col gap-8">

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    {post.image && <img src={post.image} alt={post.title} className="w-full h-auto max-h-[500px] object-cover rounded-xl mb-8 shadow-sm" />}
                    <h1 className="text-4xl font-bold mb-6 text-gray-900 leading-tight">{post.title}</h1>
                    {post.author && (
                        <div className="flex gap-4 text-gray-500 text-sm mb-8 border-b border-gray-100 pb-6">
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span> نویسنده: {post.author}
                            </span>
                        </div>
                    )}
                    <div className="text-gray-700 leading-loose text-lg whitespace-pre-wrap">{post.content}</div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-2xl font-bold mb-8 text-gray-900 border-b-2 border-[#D4AF37] pb-3 inline-block">پرسش و پاسخ حقوقی</h3>

                    <form onSubmit={handleCommentSubmit} className="bg-[#F9FAFB] p-6 rounded-xl mb-10 border border-gray-200">
                        <h4 className="font-bold text-gray-800 mb-5">سوال حقوقی یا نظر خود را درباره این مقاله بپرسید:</h4>
                        <div className="flex flex-col gap-4">
                            <input type="text" placeholder="نام شما" value={newComment.name} onChange={(e) => setNewComment({...newComment, name: e.target.value})} className="p-3 w-full md:w-1/2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4038C9] outline-none" />
                            <textarea placeholder="متن پرسش یا پیام شما..." rows="4" value={newComment.content} onChange={(e) => setNewComment({...newComment, content: e.target.value})} className="p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4038C9] outline-none resize-y" />
                            <div className="flex justify-end">
                                <button type="submit" disabled={isSubmittingComment} className={`text-white px-8 py-3 rounded-lg font-bold transition-colors shadow-sm ${isSubmittingComment ? 'bg-indigo-400' : 'bg-[#4038C9] hover:bg-indigo-800'}`}>
                                    {isSubmittingComment ? 'در حال ارسال...' : 'ثبت پرسش'}
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="flex flex-col gap-5">
                        <h4 className="font-bold text-gray-800 mb-2">نظرات و پاسخ‌ها ({comments.length})</h4>
                        {comments.length > 0 ? comments.map((comment) => (
                            <div key={comment.id} className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm flex flex-col gap-3">
                                <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-[#4038C9] flex items-center justify-center font-bold text-sm">{comment.name.charAt(0)}</div>
                                        <span className="font-bold text-gray-900">{comment.name}</span>
                                    </div>
                                    <span className="text-xs text-gray-400" dir="ltr">{new Date(comment.created_at + 'Z').toLocaleDateString('fa-IR')}</span>
                                </div>
                                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm md:text-base">{comment.content}</p>

                                {comment.reply && (
                                    <div className="mt-3 bg-[#f8f9fe] p-4 rounded-lg border border-[#e5e7fa] flex flex-col gap-2 relative">
                                        <div className="absolute -top-2 right-6 w-4 h-4 bg-[#f8f9fe] border-t border-r border-[#e5e7fa] transform -rotate-45"></div>
                                        <div className="flex items-center gap-2 relative z-10">
                                            <div className="w-6 h-6 rounded-full bg-[#D4AF37] text-white flex items-center justify-center text-xs font-bold">و</div>
                                            <span className="font-bold text-sm text-[#4038C9]">پاسخ وکیل:</span>
                                        </div>
                                        <p className="text-gray-800 text-sm md:text-base whitespace-pre-wrap leading-relaxed relative z-10">{comment.reply}</p>
                                    </div>
                                )}
                            </div>
                        )) : <p className="text-gray-500 text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">هنوز پرسش تایید شده‌ای وجود ندارد.</p>}
                    </div>
                </div>
            </main>

            <aside className="md:w-1/4 flex flex-col gap-6">
                {/* --- DYNAMIC AUTHOR PROFILE --- */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all hover:shadow-md">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-gray-50 shadow-sm">
                        <img src={displayAuthorPic} alt={displayAuthorName} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{displayAuthorName}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-wrap">{displayAuthorBio}</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                    <h3 className="text-lg font-bold mb-5 border-b-2 border-[#D4AF37] pb-3 text-gray-900">سایر مقالات</h3>
                    {recentPosts.length > 0 ? (
                        <ul className="flex flex-col gap-4">
                            {recentPosts.map((recentPost) => (
                                <li key={recentPost.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                                    <Link to={`/blog/${recentPost.id}`} className="text-gray-600 hover:text-[#4038C9] font-medium transition-colors line-clamp-2 leading-snug">{recentPost.title}</Link>
                                </li>
                            ))}
                        </ul>
                    ) : <p className="text-gray-500 text-sm text-center py-4">مقاله دیگری یافت نشد.</p>}
                </div>
            </aside>
        </div>
    );
}