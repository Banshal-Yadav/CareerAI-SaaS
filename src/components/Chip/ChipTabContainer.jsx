import React, { useState, useEffect, useRef } from "react";
import "./ChipTabContainer.css";
import { careersData, skillsData, findCareerByTitle } from "../../data/skillsDatabase.js";
import { Briefcase, IndianRupee, BarChartHorizontal, Wrench } from 'lucide-react';

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
    const [currentCareer, setCurrentCareer] = useState(null);
    const [activeChip, setActiveChip] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const careerIndexRef = useRef(0);

    const chipRows = [
        ["Machine Learning", "Java Developer", "Researcher", "Cloud", "Bigdata", "AI Engineer"],
        ["UX Designer", "Creative Director", "Brand Strategist", "Motion Graphics", "Digital Marketing", "Content Creator"],
        ["Product Manager", "Business Analyst", "Financial Advisor", "Operations", "Strategy", "Team Lead"]
    ];

    const uniqueCareerTitles = [...new Set(Object.values(chipToCareerTitleMap))];

    useEffect(() => {
        const firstCareer = findCareerByTitle(uniqueCareerTitles[0]);
        if (firstCareer) setCurrentCareer(firstCareer);
    }, []);

    useEffect(() => {
        if (isPaused || isLocked) return;

        const interval = setInterval(() => {
            careerIndexRef.current = (careerIndexRef.current + 1) % uniqueCareerTitles.length;
            const nextCareer = findCareerByTitle(uniqueCareerTitles[careerIndexRef.current]);
            if (nextCareer) setCurrentCareer(nextCareer);
        }, 4000);

        return () => clearInterval(interval);
    }, [isPaused, isLocked, uniqueCareerTitles]);

    const handleChipClick = (chipText) => {
        const targetTitle = chipToCareerTitleMap[chipText];
        if (!targetTitle) return;

        if (activeChip === chipText) {
            setIsLocked(false);
            setActiveChip(null);
            return;
        }

        const foundCareer = findCareerByTitle(targetTitle);
        if (foundCareer) {
            setCurrentCareer(foundCareer);
            setActiveChip(chipText);
            setIsLocked(true);
        }
    };

    return (
        <div className='cardtab-container'>
            <h1 className='cardtab-container-title'>From Traditional to Emerging - Discover All Possibilities</h1>

            {currentCareer && (
                <div
                    className="career-showcase"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="showcase-header">
                        <Briefcase size={20} />
                        <h3>{currentCareer.title}</h3>
                    </div>
                    <p className="showcase-desc">{currentCareer.description}</p>
                    <div className="showcase-stats">
                        <div className="showcase-stat">
                            <IndianRupee size={16} />
                            <span>{currentCareer.averageSalary}</span>
                        </div>
                        <div className="showcase-stat">
                            <BarChartHorizontal size={16} />
                            <span>{currentCareer.growthProspect}</span>
                        </div>
                    </div>
                    <div className="showcase-skills">
                        <Wrench size={14} />
                        {currentCareer.skillRequirements?.slice(0, 4).map(req => (
                            <span key={req.skillId} className="showcase-skill-chip">{getSkillName(req.skillId)}</span>
                        ))}
                    </div>
                </div>
            )}

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
        </div>
    );
}

export default ChipTabContainer;