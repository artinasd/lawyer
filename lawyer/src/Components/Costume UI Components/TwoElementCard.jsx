function TwoElementCard(props) {

    return (
        <div className='bg-gray-50 p-4 rounded-lg flex flex-col items-center space-y-3 font-bold'>
            <img className='w-10' src={props.icon} />
            <h3>{props.text}</h3>
        </div>
    )
}

export default TwoElementCard;