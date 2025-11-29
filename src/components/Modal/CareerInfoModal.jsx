import React from 'react';
import './CareerInfoModal.css';
import { Briefcase, IndianRupee, BarChartHorizontal, X, Wrench, Link as LinkIcon } from 'lucide-react';

const CareerInfoModal = ({ career, onClose, careersData }) => {
  if (!career) return null;

  const getSkillName = (skillId) => {
    const allSkills = [
        ...career.skillsData.technical,
        ...career.skillsData.soft,
        ...career.skillsData.industry
    ];
    const foundSkill = allSkills.find(s => s.id === skillId);
    return foundSkill ? foundSkill.name : skillId;
  };
  
  const getCareerTitleById = (careerId) => {
      const foundCareer = careersData.find(c => c.id === careerId);
      if (foundCareer) return foundCareer.title;
      
      // Fallback: format the ID (e.g., "supply_chain_manager" -> "Supply Chain Manager")
      return careerId
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="modal-header">
          <Briefcase size={28} className="modal-header-icon" />
          <h2 className="modal-title">{career.title}</h2>
        </div>
        
        <p className="modal-description">{career.description}</p>
        
        <div className="modal-info-grid">
          <div className="modal-info-item">
            <IndianRupee size={20} />
            <div>
              <p className="info-label">Average Salary</p>
              <p className="info-value">{career.averageSalary}</p>
            </div>
          </div>
          <div className="modal-info-item">
            <BarChartHorizontal size={20} />
            <div>
              <p className="info-label">Growth Prospect</p>
              <p className="info-value">{career.growthProspect}</p>
            </div>
          </div>
        </div>

        <div className="modal-skills-section">
            <h4 className="skills-title">
                <Wrench size={18} /> Required Skills
            </h4>
            <div className="skills-chip-container">
                {career.skillRequirements.map(req => (
                    <span key={req.skillId} className="skill-chip-modal">
                        {getSkillName(req.skillId)}
                    </span>
                ))}
            </div>
        </div>

        {career.relatedCareers && career.relatedCareers.length > 0 && (
            <div className="related-careers-section">
                <h4 className="related-careers-title">
                    <LinkIcon size={18} /> Related Careers
                </h4>
                <div className="related-careers-container">
                    {career.relatedCareers.map(careerId => (
                        <span key={careerId} className="related-career-chip">
                            {getCareerTitleById(careerId)}
                        </span>
                    ))}
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default CareerInfoModal;