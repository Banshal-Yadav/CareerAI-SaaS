import React, { useState } from "react";
import "./ChipTabContainer.css";
import Chiptab from "./Chiptab";
import CareerInfoModal from "../Modal/CareerInfoModal.jsx";
import { careersData, skillsData, findCareerByTitle } from "../../data/skillsDatabase.js";

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


const ChipTabContainer = () => {
    const [selectedCareer, setSelectedCareer] = useState(null);

    const chipRows = [
        ["Machine Learning", "Java Developer", "Researcher", "Cloud", "Bigdata", "AI Engineer"],
        ["UX Designer", "Creative Director", "Brand Strategist", "Motion Graphics", "Digital Marketing", "Content Creator"],
        ["Product Manager", "Business Analyst", "Financial Advisor", "Operations", "Strategy", "Team Lead"]
    ];

    const handleChipClick = (chipText) => {
        const targetTitle = chipToCareerTitleMap[chipText];
        if (!targetTitle) {
            console.warn(`No mapping found for chip: "${chipText}"`);
            return;
        }

        const foundCareer = findCareerByTitle(targetTitle);

        if (foundCareer) {
            foundCareer.skillsData = skillsData;
            setSelectedCareer(foundCareer);
        } else {
            console.warn(`Career "${targetTitle}" not found in database.`);
        }
    };

    const handleCloseModal = () => {
        setSelectedCareer(null);
    };

    return (
        <div className='cardtab-container'>
            <h1 className='cardtab-container-title'>From Traditional to Emerging - Discover All Possibilities</h1>
            <div className="marquee-wrapper">
                {chipRows.map((row, rowIndex) => (
                    <div key={rowIndex} className={`marquee-track ${rowIndex % 2 === 1 ? 'reverse' : ''}`}>
                        <div className="marquee-content">
                            {/* Triple chips for seamless loop */}
                            {[...row, ...row, ...row].map((chipText, chipIndex) => (
                                <button
                                    key={chipIndex}
                                    className="marquee-chip"
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
                <CareerInfoModal
                    career={selectedCareer}
                    onClose={handleCloseModal}
                    careersData={careersData}
                />
            )}
        </div>
    );
}

export default ChipTabContainer;