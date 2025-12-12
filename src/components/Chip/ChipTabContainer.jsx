import React, { useState } from "react";
import "./ChipTabContainer.css";
import { careersData, skillsData, findCareerByTitle } from "../../data/skillsDatabase.js";
import { Briefcase, IndianRupee, BarChartHorizontal, X, Wrench } from 'lucide-react';

const chipToCareerTitleMap = {
    "Machine Learning": "Data Scientist",
    "Java Developer": "Backend Developer",
    "Researcher": "Research Scientist",
    "Cloud": "DevOps Engineer",
    "Bigdata": "Data Scientist",
    "AI Engineer": "Data Scientist",
    "UX Designer": "UI/UX Designer",
    "Creative Director": "Content Creator",
    "Brand Strategist": "Digital Marketing Specialist",
    "Motion Graphics": "UI/UX Designer",
    "Digital Marketing": "Digital Marketing Specialist",
    "Content Creator": "Content Creator",
    "Product Manager": "Product Manager",
    "Business Analyst": "Business Analyst",
    "Financial Advisor": "Financial Analyst",
    "Operations": "Operations Manager",
    "Strategy": "Management Consultant",
    "Team Lead": "Project Manager"
};

const getSkillName = (skillId) => {
    const allSkills = [...skillsData.technical, ...skillsData.soft, ...skillsData.industry];
    const foundSkill = allSkills.find(s => s.id === skillId);
    return foundSkill ? foundSkill.name : skillId;
};

const ChipTabContainer = () => {
    const [selectedCareer, setSelectedCareer] = useState(null);
    const [activeChip, setActiveChip] = useState(null);

    const chipRows = [
        ["Machine Learning", "Java Developer", "Researcher", "Cloud", "Bigdata", "AI Engineer"],
        ["UX Designer", "Creative Director", "Brand Strategist", "Motion Graphics", "Digital Marketing", "Content Creator"],
        ["Product Manager", "Business Analyst", "Financial Advisor", "Operations", "Strategy", "Team Lead"]
    ];

    const handleChipClick = (chipText) => {
        const targetTitle = chipToCareerTitleMap[chipText];
        if (!targetTitle) return;

        if (activeChip === chipText) {
            setSelectedCareer(null);
            setActiveChip(null);
            return;
        }

        const foundCareer = findCareerByTitle(targetTitle);
        if (foundCareer) {
            setSelectedCareer(foundCareer);
            setActiveChip(chipText);
        }
    };

    return (
        <div className='cardtab-container'>
            <h1 className='cardtab-container-title'>From Traditional to Emerging - Discover All Possibilities</h1>
            <div className="marquee-wrapper">
                {chipRows.map((row, rowIndex) => (
                    <div key={rowIndex} className={`marquee-track ${rowIndex % 2 === 1 ? 'reverse' : ''}`}>
                        <div className="marquee-content">
                            {[...row, ...row, ...row].map((chipText, chipIndex) => (
                                <button
                                    key={chipIndex}
                                    className={`marquee-chip ${activeChip === chipText ? 'active' : ''}`}
                                    onClick={() => handleChipClick(chipText)}
                                >
                                    {chipText}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {selectedCareer && (
                <div className="career-tooltip">
                    <button className="tooltip-close" onClick={() => setSelectedCareer(null)}>
                        <X size={18} />
                    </button>
                    <div className="tooltip-header">
                        <Briefcase size={20} />
                        <h3>{selectedCareer.title}</h3>
                    </div>
                    <p className="tooltip-desc">{selectedCareer.description}</p>
                    <div className="tooltip-stats">
                        <div className="tooltip-stat">
                            <IndianRupee size={16} />
                            <span>{selectedCareer.averageSalary}</span>
                        </div>
                        <div className="tooltip-stat">
                            <BarChartHorizontal size={16} />
                            <span>{selectedCareer.growthProspect}</span>
                        </div>
                    </div>
                    <div className="tooltip-skills">
                        <Wrench size={14} />
                        {selectedCareer.skillRequirements?.slice(0, 4).map(req => (
                            <span key={req.skillId} className="tooltip-skill-chip">{getSkillName(req.skillId)}</span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChipTabContainer;