import Stats from './Stats';
import './StatsContainer.css';

const StatsContainer = () => {
    return (
        <div className='Stats-Container'>
            <h1 className='stats-title'>The Hidden Crisis </h1>
            <p className='stats-info' >While India produces millions of graduates annually, the reality is sobering</p>
            <Stats />
        </div>
    );
}

export default StatsContainer;