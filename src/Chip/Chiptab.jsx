import Chip from './Chip.jsx';
import './Chiptab.css';

// accept an array of chips and the click handler
const Chiptab = ({ chips, onChipClick }) => {
    return (
        <div className='chip-tab'>
            {/* map over the array to create chips dynamically */}
            {chips.map((chipText, index) => (
                <Chip key={index} text={chipText} onClick={onChipClick} />
            ))}
        </div>
    );
}

export default Chiptab;