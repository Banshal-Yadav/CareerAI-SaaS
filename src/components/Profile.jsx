import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore'; 
import { db } from '../firebase/config';
import './Profile.css';
import * as icons from 'lucide-react'; // dynamically imports all icons
import { useNavigate } from 'react-router-dom';

// helper component to render any lucide-react icon by its string name
const Icon = ({ name, ...props }) => {
    const LucideIcon = icons[name];
    if (!LucideIcon) {
        return <icons.HelpCircle {...props} />; // fallback for any unknown icon name
    }
    return <LucideIcon {...props} />;
};

// card for displaying a course or certification
const ResourceCard = ({ name, issuer, platform, icon }) => (
    <div className="profile-resource-card">
        <Icon name={icon} size={28} className="profile-resource-icon" />
        <div className="profile-resource-text">
            <span className="profile-resource-name">{name}</span>
            <span className="profile-resource-issuer">by {issuer || platform}</span>
        </div>
    </div>
);

// card for displaying a suggested project
const ProjectBriefCard = ({ title, objective, skillsUsed, difficulty }) => (
    <div className={`profile-project-card difficulty-${difficulty}`}>
        <div className="profile-project-header">
            <icons.FolderKanban size={18} />
            <h5>{title}</h5>
        </div>
        <p className="profile-project-objective">{objective}</p>
        <div className="profile-project-skills">
            {skillsUsed.map((skill, i) => <span key={i} className="profile-skill-tag">{skill}</span>)}
        </div>
        <span className="profile-project-difficulty">{difficulty}</span>
    </div>
);

// component for a single, expandable assessment record
const AssessmentCard = ({ assessment }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const formatDate = (timestamp) => {
    if (!timestamp || !timestamp.seconds) return "Invalid Date";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString('en-GB'); 
  };

  const ContextualChipDisplay = ({ skill, context, type }) => (
    <li className={`custom-list-item-${type}`}>
      <strong>{skill}:</strong> {context}
    </li>
  );

  return (
    <div className="assessment-card">
      <div className="assessment-card-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div>
          <p className="assessment-date">{formatDate(assessment.createdAt)}</p>
          <h4 className="assessment-skills">{assessment.rawSkills}</h4>
        </div>
        <button className="expand-btn">{isExpanded ? <icons.ChevronUp /> : <icons.ChevronDown />}</button>
      </div>
      {isExpanded && (
        <div className="assessment-card-body">
          <div className="card-section">
            <h5 className="section-title"><icons.Zap size={18} /> Executive Summary</h5>
            <p>{assessment.aiSummary || 'No summary available'}</p>
          </div>
          <div className="strengths-growth-grid-profile">
            <div className="card-section">
              <h5 className="section-title"><icons.Target size={18} /> Strengths</h5>
              <ul className="custom-list">
                  {assessment.aiStrengths?.length > 0 
                    ? assessment.aiStrengths.map((s, i) => <ContextualChipDisplay key={i} {...s} type="strength" />) 
                    : <li>No strengths analysis available</li>}
              </ul>
            </div>
            <div className="card-section">
              <h5 className="section-title"><icons.TrendingUp size={18} /> Growth Areas</h5>
               <ul className="custom-list">
                  {assessment.aiGrowthAreas?.length > 0 
                    ? assessment.aiGrowthAreas.map((area, i) => <ContextualChipDisplay key={i} {...area} type="growth" />) 
                    : <li>No growth area analysis available</li>}
              </ul>
            </div>
          </div>
          <div className="card-section">
             <h5 className="section-title"><icons.Briefcase size={18} /> Career Recommendations</h5>
             <div className="careers-list">
                {assessment.aiCareerAnalysis?.length > 0 ? assessment.aiCareerAnalysis.map((career, i) => (
                  <div key={i} className="career-item-detailed">
                    <div className="career-item-header"><h6>{career.title}</h6></div>
                    <p className="career-fit salary-info"><icons.IndianRupee size={14} /> {career.salaryRange || 'Not available'}</p>
                    
                    {career.suggestedCertifications?.length > 0 && (
                        <div className="details-section">
                            <h6 className="details-title"><icons.Award size={16}/> Certifications</h6>
                            <div className="details-grid">
                                {career.suggestedCertifications.map((cert, j) => <ResourceCard key={j} {...cert} />)}
                            </div>
                        </div>
                    )}
                    {career.suggestedCourses?.length > 0 && (
                        <div className="details-section">
                            <h6 className="details-title"><icons.BookOpen size={16}/> Courses</h6>
                            <div className="details-grid">
                                {career.suggestedCourses.map((course, j) => <ResourceCard key={j} name={course.courseName} platform={course.platform} icon={course.icon} />)}
                            </div>
                        </div>
                    )}
                    {career.suggestedProjects?.length > 0 && (
                         <div className="details-section">
                            <h6 className="details-title"><icons.FolderKanban size={16}/> Projects</h6>
                            <div className="details-grid projects">
                                {career.suggestedProjects.map((proj, j) => <ProjectBriefCard key={j} {...proj} />)}
                            </div>
                        </div>
                    )}
                  </div>
                )) : <p>No career recommendations available</p>}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

// component for a single resume record
const ResumeCard = ({ resume, onDelete }) => {
    const navigate = useNavigate();
    return (
        <div className="resume-card">
            <div className="resume-card-header">
                <icons.FileText size={40} />
                <div>
                    <h3 className="resume-card-title">{resume.fullName}'s Resume</h3>
                    <p className="resume-card-subtitle">Last updated: {new Date(resume.lastUpdated).toLocaleDateString()}</p>
                </div>
            </div>
            <div className="resume-card-actions">
                <button onClick={() => navigate('/resume-builder', { state: { resumeId: resume.id } })} className="dashboard-btn primary-action-btn">
                    <icons.Edit size={16}/> Edit
                </button>
                <button onClick={() => navigate('/resume-builder', { state: { resumeId: resume.id, isPreview: true } })} className="dashboard-btn">
                    <icons.Download size={16}/> View & Download
                </button>
                <button onClick={() => onDelete(resume.id)} className="dashboard-btn delete-resume-btn">
                    <icons.Trash2 size={16}/> Delete
                </button>
            </div>
        </div>
    );
};

// main profile page component
const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        setLoading(true);
        const profileRef = doc(db, 'profiles', user.uid);
        const docSnap = await getDoc(profileRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.assessments && Array.isArray(data.assessments)) {
            data.assessments.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
          }
           if (!data.resumes) {
            data.resumes = [];
          }
          setProfileData(data);
        } else {
          setProfileData({ assessments: [], resumes: [] });
        }
        setLoading(false);
      };
      fetchProfile();
    }
  }, [user]);

  const handleDeleteResume = async (resumeId) => {
    if (!window.confirm("are you sure you want to permanently delete this resume?")) {
        return;
    }
    const profileRef = doc(db, 'profiles', user.uid);
    const resumeToDelete = profileData.resumes.find(r => r.id === resumeId);

    try {
        await updateDoc(profileRef, {
            resumes: arrayRemove(resumeToDelete)
        });
        setProfileData(prevData => ({
            ...prevData,
            resumes: prevData.resumes.filter(r => r.id !== resumeId)
        }));
    } catch (error) {
        console.error("error deleting resume:", error);
        alert("failed to delete resume, please try again");
    }
  };

  if (loading) return <div className="profile-container"><p>loading profile...</p></div>;

  const hasAssessments = profileData?.assessments?.length > 0;
  const hasResumes = profileData?.resumes?.length > 0;
  const canCreateResume = (profileData?.resumes?.length || 0) < 3;

  return (
    <div className="profile-container">
      <div className="profile-dashboard">
        <div className="dashboard-header">
          <icons.User size={40} />
          <div>
            <h2 className="dashboard-name">
              {user.isAnonymous ? 'Guest Account' : user.email}
            </h2>
            <p className="dashboard-subtitle">welcome to your personal dashboard</p>
          </div>
        </div>
      </div>
      
      <div className="section-header">
        <h3 className="section-heading">Your Resumes</h3>
        <button 
            onClick={() => navigate('/resume-builder', { state: { isNew: true } })} 
            className="dashboard-btn primary-action-btn"
            disabled={!canCreateResume}
            title={canCreateResume ? "create a new resume" : "you have reached the maximum of 3 resumes"}
        >
            <icons.Edit size={16}/> Create New Resume
        </button>
      </div>
      
      {hasResumes ? (
        <div className="resumes-list">
          {profileData.resumes.map(resume => (
            <ResumeCard key={resume.id} resume={resume} onDelete={handleDeleteResume} />
          ))}
        </div>
      ) : (
        <p>you haven't created any resumes yet, get started by clicking the button above</p>
      )}

      <div className="section-header">
        <h3 className="section-heading">Your Recent Assessments</h3>
      </div>
      
      {!hasAssessments ? (
        <p>no assessments found, complete one to get started</p>
      ) : (
        <div className="assessments-list">
          {profileData.assessments.slice(0, 3).map((assessment, index) => (
            <AssessmentCard key={assessment.assessmentId || index} assessment={assessment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;