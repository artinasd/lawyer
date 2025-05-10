import NavigationBar from "../Permanent Components/NavigationBar.jsx";
import supabase from "../../supabase.js";
import {useEffect, useState} from "react";
import lawyerPic from '../../assets/lawyer.jpg'
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';

function BlogPost() {
    const [post, setPost] = useState(null);
    const [restOfPosts, setRestOfPosts] = useState(null);

    useEffect(() => {
        async function fetchPost() {
            let { data: posts, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', 1)
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

                    <div className='col-span-2 bg-white p-2 my-20 shadow-md'>
                        <div className='relative h-[500px] overflow-hidden'>
                            <img className='object-center w-full h-full' src={post.image} />
                            <div className='absolute bottom-0 bg-black/50 backdrop-blur-sm w-full text-center text-white drop-shadow font-medium text-2xl py-3'>
                                <h2>{post.title}</h2>
                            </div>
                        </div>

                        <p className='p-6'>{post.text}</p>
                    </div>

                    <div className='col-span-1 my-20 space-y-6'>
                        <div className='bg-white p-2 shadow-md'>
                            <div className='flex flex-row items-end space-x-6 justify-start'>
                                <img className='w-20 rounded-md border-[2px] border-indigo-600' src={lawyerPic} />
                                <button>
                                    <div className='flex flex-row items-center justify-center space-x-1'>
                                        <QuestionAnswerOutlinedIcon style={{color: '#4f46e5', fontSize: '32px'}} />
                                        <p className='text-indigo-600 text-lg'>ارتباط با من</p>
                                    </div>
                                </button>
                            </div>
                            <h2 className='font-medium text-xl mt-5'>محمد حقوقی | کارشناس حقوقی</h2>
                            <p className='mt-5 font-light'>وکیل پایه یک دادگستری با +12 سال تجربه موفق در انواع پرونده های حقوقی</p>
                        </div>

                        <div className='bg-white p-2 shadow-md'>
                            <h2 className='font-bold text-xl mt-2'>سایر مقالات</h2>
                            <br />
                            <ul>
                                {restOfPosts.map((post, index) => (
                                    <li key={index}>
                                        <div className='flex flex-row items-center justify-start my-4 space-x-3'>
                                            <img className='w-16 h-10 overflow-y-clip' src={post.image} />
                                            <h2 className='line-clamp-1'>{post.title.slice(0, 30) + '...'}</h2>
                                        </div>
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