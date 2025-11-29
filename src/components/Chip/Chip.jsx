import "./Chip.css";

const Chip = ({text, onClick}) => {
    return (
        <div >
          <button className="chip-btn" onClick={() => onClick(text)}> 
            {text}
          </button>
        </div>
    );
}
export default Chip;