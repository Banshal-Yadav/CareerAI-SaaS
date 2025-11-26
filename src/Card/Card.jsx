import './Card.css'

function Card({icon: Icon, title, info, className="", iconColor="#3b82f6"}) {
    return (
        <div className={`card ${className}`}>
            <Icon
                size={40}
                color={iconColor}
                strokeWidth={1.5}
            />
            <h3 className='card-title'>{title}</h3>
            <p className='card-info'>{info}</p>
        </div>
    );
}
export default Card;