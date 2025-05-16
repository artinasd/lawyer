import NavigationBar from "../Permanent Components/NavigationBar.jsx";
import supabase from "../../supabase.js";
import {useEffect, useState} from "react";
import lawyerPic from '../../assets/lawyer.jpg'
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";

function BlogPost() {
    const [post, setPost] = useState(null);
    const [restOfPosts, setRestOfPosts] = useState(null);
    const {postId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchPost() {
            let { data: posts, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', postId)
                .single()
            setPost(posts)
        }
        fetchPost();
    }, []);

    useEffect(() => {
        if (post) {
            async function fetchAllPosts() {
                let { data: posts, error } = await supabase
                    .from('posts')
                    .select('*')
                setRestOfPosts(posts.filter(eachPost => eachPost.id !== post.id))
            }
            fetchAllPosts()
        }
    }, [post]);

    return (
        <div className='bg-[#F9FAFB]'>
            <NavigationBar fixed={true} />

            {post && restOfPosts ? (
                <div className='h-max max-w-screen mt-16 grid grid-cols-3 gap-6 rtl px-36'>

                    <div className='col-span-2 bg-white shadow-md  transition-all duration-300 my-20 overflow-hidden'>
                        <div className='relative h-[500px] overflow-hidden group'>
                            <img
                                className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-700'
                                src={post.image}
                                alt={post.title}
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent'></div>
                            <div className='absolute bottom-0 w-full p-6'>
                                <h2 className='text-white text-3xl font-bold mb-2 drop-shadow-lg'>{post.title}</h2>
                                <div className='h-1 w-20 bg-indigo-500 rounded-full'></div>
                            </div>
                        </div>

                        <div className='p-8'>
                            <p className='text-gray-700 leading-loose text-lg'>{post.text}</p>
                        </div>
                    </div>

                    <div className='col-span-1 my-20 space-y-6'>
                        <div className='bg-white p-6 shadow-md  transition-all duration-300 max-w-md'>
                            <div className='flex flex-col items-center text-center mb-4'>
                                <img
                                    className='w-28 h-28 rounded-full border-4 border-indigo-100 object-cover mb-4 hover:scale-105 transition-transform duration-300'
                                    src={lawyerPic}
                                    alt="Lawyer profile"
                                />
                                <h2 className='font-bold text-2xl text-gray-900 mb-2'>محمد حقوقی</h2>
                                <p className='text-indigo-600 font-medium'>کارشناس حقوقی</p>
                            </div>

                            <div className='bg-gray-50 rounded-lg p-4 mb-4'>
                                <p className='text-gray-700 leading-relaxed text-base'>وکیل پایه یک دادگستری با +12 سال تجربه موفق در انواع پرونده های حقوقی</p>
                            </div>

                            <button className='w-full hover:scale-[1.02] transition-transform duration-300'>
                                <div className='flex items-center justify-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300'>
                                    <QuestionAnswerOutlinedIcon style={{fontSize: '24px'}} />
                                    <p className='text-lg font-medium'>ارتباط با من</p>
                                </div>
                            </button>
                        </div>

                        <div className='bg-white p-6 shadow-md transition-all duration-300'>
                            <h2 className='font-bold text-2xl text-gray-900 mb-6 pb-2 border-b border-gray-100'>سایر مقالات</h2>

                            <ul className='space-y-4 h-72 overflow-y-scroll'>
                                {restOfPosts.map((post, index) => (
                                    <li key={index} className='group hover:bg-gray-50 rounded-lg transition-colors duration-200'>
                                        <button className='flex items-center space-x-4 p-2 text-right'
                                             onClick={() => {
                                                 navigate(`/blog/${post.id}`)
                                                 window.location.reload()
                                             }}>
                                            <div className='relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0'>
                                                <img
                                                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                                                    src={post.image}
                                                    alt={post.title}
                                                />
                                            </div>
                                            <h3 className='text-gray-800 font-medium line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200'>
                                                {post.title}
                                            </h3>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <></> //LOADING GIF
            )}
        </div>
    )
}

export default BlogPost