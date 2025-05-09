import FourElementCard from "../Costume UI Components/FourElementCard.jsx";
import {useEffect, useState} from "react";
import {CommentsData} from "../HardCodedData/CommentsData.js";

function Comments() {
    const [menuState, setMenuState] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            if (menuState < 2 && menuState >= 0) {
                setMenuState(prevState => prevState + 1)
            }
            else if (menuState === 2) {
                setMenuState(0)
            }
        }, 2500)

        return () => clearTimeout(timer)
    }, [menuState]);

    return (
        <div className='bg-white w-full px-10 py-20 flex flex-col items-center'>
            <h2 className='text-4xl font-bold'>نظرات <span className='text-[#4038C9]'>موکلین</span></h2>
            <br/>
            <p className='text-gray-700 rtl'>آنچه موکلین من درباره خدمات حقوقی ارائه شده می‌گویند.</p>

            <br/>
            <br/>

            <FourElementCard
                comment={CommentsData[menuState].comment}
                name={CommentsData[menuState].name}
                position={CommentsData[menuState].position}
                picture={CommentsData[menuState].image}
            />

            <menu className='flex flex-row items-center space-x-2 mt-6'>
                <li>
                    <button onClick={() => setMenuState(0)}>
                        <div className={`w-3 h-3 rounded-full ${menuState === 0 ? 'bg-[#4038C9]' : 'bg-[#D0D5DB]'}`} />
                    </button>
                </li>

                <li>
                    <button onClick={() => setMenuState(1)}>
                        <div className={`w-3 h-3 rounded-full ${menuState === 1 ? 'bg-[#4038C9]' : 'bg-[#D0D5DB]'}`} />
                    </button>
                </li>

                <li>
                    <button onClick={() => setMenuState(2)}>
                        <div className={`w-3 h-3 rounded-full ${menuState === 2 ? 'bg-[#4038C9]' : 'bg-[#D0D5DB]'}`} />
                    </button>
                </li>
            </menu>
        </div>
    )
}

export default Comments