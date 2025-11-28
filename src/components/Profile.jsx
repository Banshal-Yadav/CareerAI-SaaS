import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase/config';
import './Profile.css';
import * as icons from 'lucide-react'; // dynamically imports all icons
import { useNavigate } from 'react-router-dom';

const Icon = ({ name, ...props }) => {
  const LucideIcon = icons[name];
  if (!LucideIcon) {
    return <icons.HelpCircle {...props} />;
  }
  return <LucideIcon {...props} />;
};

const ResourceCard = ({ name, issuer, platform, icon }) => (
  <div className="profile-resource-card">
    <Icon name={icon} size={28} className="profile-resource-icon" />
    <div className="profile-resource-text">
      <span className="profile-resource-name">{name}</span>
      <span className="profile-resource-issuer">by {issuer || platform}</span>
    </div>
  </div>
);

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

const UsageProgressBar = ({ current, limit, label }) => {
  const percentage = Math.min((current / limit) * 100, 100);
  let colorClass = 'progress-green';
  if (current >= limit) colorClass = 'progress-red';
  else if (current >= limit - 1) colorClass = 'progress-yellow';

  return (
    <div className="usage-tracker">
      <span className="usage-label">{label}: {current}/{limit}</span>
      <div className="progress-bar-container">
        <div className={`progress-bar-fill ${colorClass}`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

const AssessmentCard = ({ assessment }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const formatDate = (timestamp) => {
    if (!timestamp || !timestamp.seconds) return "Invalid Date";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const InsightChipCard = ({ skill, context, type }) => (
    <div className={`insight-chip-card insight-type-${type}`}>
      <strong>{skill}</strong>
      <span>{context}</span>
    </div>
  );

  // Parse raw skills for preview tags
  const skillTags = assessment.rawSkills ? assessment.rawSkills.split(',').slice(0, 4) : [];

  return (
    <div className="assessment-card">
      <div className="assessment-card-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div>
          <span className="assessment-date">{formatDate(assessment.createdAt)}</span>
          <h4 className="assessment-skills">
            {skillTags.map((skill, i) => (
              <span key={i} className="skill-tag-preview">{skill.trim()}</span>
            ))}
            {assessment.rawSkills.split(',').length > 4 && <span className="skill-tag-preview">+{assessment.rawSkills.split(',').length - 4} more</span>}
          </h4>
        </div>
        <button className="expand-btn">{isExpanded ? <icons.ChevronUp /> : <icons.ChevronDown />}</button>
      </div>
      {isExpanded && (
        <div className="assessment-card-body">
          <div className="card-section">
            <h5 className="section-title"><icons.Zap size={18} /> Executive Summary</h5>
            <p>{assessment.aiSummary || 'No summary available'}</p>
          </div>

          <div className="card-section">
            <h5 className="section-title"><icons.Target size={18} /> Top Strengths</h5>
            <div className="insights-grid-compact">
              {assessment.aiStrengths?.length > 0
                ? assessment.aiStrengths.map((s, i) => <InsightChipCard key={i} {...s} type="strength" />)
                : <p>No strengths analysis available</p>}
            </div>
          </div>

          <div className="card-section">
            <h5 className="section-title"><icons.TrendingUp size={18} /> Growth Areas</h5>
            <div className="insights-grid-compact">
              {assessment.aiGrowthAreas?.length > 0
                ? assessment.aiGrowthAreas.map((area, i) => <InsightChipCard key={i} {...area} type="growth" />)
                : <p>No growth area analysis available</p>}
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
                      <h6 className="details-title"><icons.Award size={16} /> Certifications</h6>
                      <div className="details-grid">
                        {career.suggestedCertifications.map((cert, j) => <ResourceCard key={j} {...cert} />)}
                      </div>
                    </div>
                  )}
                  {career.suggestedCourses?.length > 0 && (
                    <div className="details-section">
                      <h6 className="details-title"><icons.BookOpen size={16} /> Courses</h6>
                      <div className="details-grid">
                        {career.suggestedCourses.map((course, j) => <ResourceCard key={j} name={course.courseName} platform={course.platform} icon={course.icon} />)}
                      </div>
                    </div>
                  )}
                  {career.suggestedProjects?.length > 0 && (
                    <div className="details-section">
                      <h6 className="details-title"><icons.FolderKanban size={16} /> Projects</h6>
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

const ResumeCard = ({ resume, onDelete }) => {
  const navigate = useNavigate();
  return (
    <div className="resume-card">
      <div className="resume-card-header">
        <div className="resume-icon-wrapper">
          <icons.FileText size={32} />
        </div>
        <div>
          <h3 className="resume-card-title">{resume.fullName}'s Resume</h3>
          <p className="resume-card-subtitle">Last updated: {new Date(resume.lastUpdated).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="resume-card-actions">
        <button onClick={() => navigate('/resume-builder', { state: { resumeId: resume.id } })} className="dashboard-btn primary-action-btn">
          <icons.Edit size={16} /> Edit
        </button>
        <button onClick={() => navigate('/resume-builder', { state: { resumeId: resume.id, isPreview: true } })} className="dashboard-btn">
          <icons.Download size={16} /> View
        </button>
        <button onClick={() => onDelete(resume.id)} className="dashboard-btn delete-resume-btn">
          <icons.Trash2 size={16} /> Delete
        </button>
      </div>
    </div>
  );
};

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

  // Calculate daily usage
  const resumesToday = profileData?.resumes?.filter(r => {
    const created = r.createdAt ? new Date(r.createdAt) : new Date(r.lastUpdated);
    return created > new Date(Date.now() - 24 * 60 * 60 * 1000);
  }).length || 0;

  const assessmentsToday = profileData?.assessments?.filter(a => {
    const created = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
    return created > new Date(Date.now() - 24 * 60 * 60 * 1000);
  }).length || 0;

  const canCreateResume = resumesToday < 3;

  return (
    <div className="profile-container">
      <div className="profile-dashboard">
        <div className="dashboard-header">
          <div className="resume-icon-wrapper" style={{ borderRadius: '50%', padding: '1.5rem' }}>
            <icons.User size={48} />
          </div>
          <div>
            <h2 className="dashboard-name">
              {user.isAnonymous ? 'Guest Account' : user.email}
            </h2>
            <p className="dashboard-subtitle">welcome to your personal career dashboard</p>
          </div>
        </div>
      </div>

      <div className="section-header">
        <h3 className="section-heading">Your Resumes</h3>
        <div className="usage-stats">
          <UsageProgressBar current={resumesToday} limit={3} label="Daily Limit" />
          <button
            onClick={() => navigate('/resume-builder', { state: { isNew: true } })}
            className="dashboard-btn primary-action-btn"
            disabled={!canCreateResume}
            title={canCreateResume ? "create a new resume" : "you have reached the daily limit of 3 resumes"}
          >
            <icons.Plus size={16} /> Create New
          </button>
        </div>
      </div>

      {hasResumes ? (
        <div className="resumes-list">
          {profileData.resumes.map(resume => (
            <ResumeCard key={resume.id} resume={resume} onDelete={handleDeleteResume} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <icons.FileX size={48} className="empty-icon" />
          <p>You haven't created any resumes yet.</p>
          <button onClick={() => navigate('/resume-builder', { state: { isNew: true } })} className="dashboard-btn primary-action-btn" style={{ marginTop: '1rem' }}>
            Create Your First Resume
          </button>
        </div>
      )}

      <div className="section-header">
        <h3 className="section-heading">Recent Assessments</h3>
        <UsageProgressBar current={assessmentsToday} limit={3} label="Daily Limit" />
      </div>

      {!hasAssessments ? (
        <div className="empty-state">
          <icons.BrainCircuit size={48} className="empty-icon" />
          <p>No assessments found. Discover your career path today.</p>
          <button onClick={() => navigate('/')} className="dashboard-btn primary-action-btn" style={{ marginTop: '1rem' }}>
            Start Career Assessment
          </button>
        </div>
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