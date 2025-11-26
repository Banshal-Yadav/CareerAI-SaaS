import './SolutionCard.css';
import React from 'react'; 

const solutionSteps = [
    {
        number: "01",
        title: "ANALYZE",
        description: "We map your unique skills DNA beyond just grades.",
        highlight: "Assessment"
    },
    {
        number: "02",
        title: "MATCH",
        description: "AI scans 250+ career paths to find your perfect fit.",
        highlight: "Discovery"
    },
    {
        number: "03",
        title: "GUIDE",
        description: "Get a personalized roadmap to your dream job.",
        highlight: "Action"
    }
];

const SolutionCard = () => {
    return (
       <div className='solution-infographic-container'>
        {solutionSteps.map((step, index) => (
            <React.Fragment key={index}>
                <div className="infographic-step">
                    <div className="step-header">
                        <span className="step-number">{step.number}</span>
                        <span className="step-highlight">{step.highlight}</span>
                    </div>
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-description">{step.description}</p>
                </div>
                {index < solutionSteps.length - 1 && <div className="infographic-divider" />}
            </React.Fragment>
        ))}
       </div>
    );
}

export default SolutionCard;