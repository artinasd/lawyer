import React from 'react';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';

function FourElementCard(props) {
    return (
        <div className='w-full flex flex-col md:flex-row items-center gap-8 md:gap-12 relative' dir="rtl">

            {/* Profile Image Section */}
            <div className='flex-shrink-0 relative'>
                {/* Decorative outer ring */}
                <div className="absolute inset-0 rounded-full border-4 border-[#FFCA0C] opacity-30 scale-110 transition-transform duration-500 hover:scale-125"></div>

                <div className='rounded-full w-32 h-32 md:w-44 md:h-44 bg-white shadow-xl relative z-10 p-1.5'>
                    <img
                        className='rounded-full w-full h-full object-cover'
                        src={props.picture}
                        alt={props.name}
                    />
                </div>

                {/* Floating Quotation Icon overlaying the image */}
                <div className="absolute -bottom-2 -right-2 bg-[#3C3A86] rounded-full p-2.5 shadow-lg z-20">
                    <FormatQuoteRoundedIcon style={{color: "white", fontSize: 28}} />
                </div>
            </div>

            {/* Text Content Section */}
            <div className='flex flex-col items-center md:items-start text-center md:text-right w-full'>
                <p className='text-gray-700 text-lg md:text-2xl leading-loose font-medium mb-8 italic'>
                    "{props.comment}"
                </p>

                <div>
                    <h2 className='text-2xl font-black text-gray-900 mb-2'>{props.name}</h2>
                    <h3 className='text-[#3C3A86] font-bold text-lg'>{props.position}</h3>
                </div>
            </div>

        </div>
    );
}

export default FourElementCard;