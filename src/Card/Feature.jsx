import Cardtab from './Cardtab.jsx'
import CtaBanner from '../CtaBanner/CtaBanner.jsx';
import './Feature.css';

function Feature() {
    return (
        // using a section for better semantics
        <section className='feature-section'>
            <h2 className='feature-title'>Your All-In-One Career Toolkit</h2>
            <p className='feature-subtitle'>
                From self-discovery to landing the job, we've got you covered at every step.
            </p>
            <Cardtab />
            <CtaBanner />
        </section>
    );
}

export default Feature;