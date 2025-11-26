import './SolutionSec.css';
import SolutionCard from './SolutionCard.jsx';

const SolutionSec = () => {
    return (
        <div className='solution-sec-container'>
            <h2 className='solution-title'>How Our AI Solves This Crisis</h2>
            <p className='solution-subtitle'>
                Our AI coach provides a clear, three-step process to cut through the confusion and guide you to a career you'll love.
            </p>
            <SolutionCard />
        </div>
    );
}

export default SolutionSec;