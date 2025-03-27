import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';

function FourElementCard(props) {

    return (
        <div className='w-4/6 bg-[#F9FAFB] grid grid-cols-3 p-6 rounded-xl shadow-md'>

            <div className='col-span-2 flex flex-col items-end'>
                <p className='text-right text-gray-700 rtl'>{props.comment}</p>
                <br/>
                <h2 className='text-xl font-bold'>{props.name}</h2>
                <h3 className='text-[#4038C9]'>{props.position}</h3>
            </div>

            <div className='col-span-1 flex flex-row items-center ml-auto'>
                <div className='rounded-full w-32 h-32 shadow bg-white flex items-center justify-center'>
                    <img className='rounded-full w-[120px] h-[120px]' src={props.picture} />
                </div>

                <FormatQuoteRoundedIcon className='-mt-20' style={{fontSize: 90, color: "#D4D3F1"}} />
            </div>

        </div>
    )
}

export default FourElementCard;