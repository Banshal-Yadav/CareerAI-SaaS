import './Stats.css';
import Card from '../Card/Card.jsx';
import {Target, TrendingDown, Eye, Users} from 'lucide-react';

const Stats = () => {
    return (
        <div className='stats-tab'>
            <Card className='stats-card' icon={Target} title="Career Confusion Crisis" info="70% of students don't know what career to pursue after Class 12." iconColor='tomato'  /> 
            <Card className='stats-card' icon={TrendingDown} title="Employability Gap"  info="Only 42.6% of graduates are actually employable " iconColor='orange'/> 
            <Card className='stats-card' icon={Eye} title="Limited Awareness"  info=" 93% of students know just 7 career options out of 250+ available" iconColor='yellow'/>
        </div>
    );
}
export default Stats;