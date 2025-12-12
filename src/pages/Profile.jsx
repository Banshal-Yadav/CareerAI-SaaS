import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase/config';
import './Profile.css';
import { User, FileText, Edit, Download, Trash2, Plus, ChevronDown, ChevronUp, Zap, Target, TrendingUp, Briefcase, Award, BookOpen, FolderKanban, FileX, BrainCircuit, Calendar, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ icon: Icon, label, value, subtext }) => (
  <div className="stat-card">
    <div className="stat-icon">
      <Icon size={20} />
    </div>
    <div className="stat-content">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
      {subtext && <span className="stat-subtext">{subtext}</span>}
    </div>
  </div>
);

const UsageBar = ({ current, limit, label }) => {
  const percentage = Math.min((current / limit) * 100, 100);
  return (
    <div className="usage-bar-wrapper">
      <div className="usage-bar-header">
        <span className="usage-bar-label">{label}</span>
        <span className="usage-bar-count">{current}/{limit}</span>
      </div>
      <div className="usage-bar-track">
        <div
          className="usage-bar-fill"
          style={{ width: `${percentage}%` }}
          data-status={current >= limit ? 'full' : current >= limit - 1 ? 'warning' : 'ok'}
        />
      </div>
    </div>
  );
};

const ResumeCard = ({ resume, onDelete, onEdit, onView }) => (
  <div className="resume-card">
    <div className="resume-card-header">
      <div className="resume-icon-wrapper">
        <FileText size={24} />
      </div>
      <div className="resume-info">
        <h4 className="resume-name">{resume.fullName || 'Untitled Resume'}</h4>
        <span className="resume-date">Updated {new Date(resume.lastUpdated).toLocaleDateString()}</span>
      </div>
    </div>
    <div className="resume-actions">
      <button onClick={() => onEdit(resume.id)} className="action-btn"><Edit size={14} /> Edit</button>
      <button onClick={() => onView(resume.id)} className="action-btn"><Download size={14} /> View</button>
      <button onClick={() => onDelete(resume.id)} className="action-btn action-btn-danger"><Trash2 size={14} /></button>
    </div>
  </div>
);

const AssessmentCard = ({ assessment, isExpanded, onToggle }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown";
    const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const topCareer = assessment.aiCareerAnalysis?.[0];
  const skillCount = assessment.rawSkills?.split(',').length || 0;

  return (
    <div className={`assessment-card ${isExpanded ? 'expanded' : ''}`}>
      <div className="assessment-header" onClick={onToggle}>
        <div className="assessment-meta">
          <span className="assessment-date"><Calendar size={14} /> {formatDate(assessment.createdAt)}</span>
          <span className="assessment-persona">{assessment.persona}</span>
        </div>
        <div className="assessment-preview">
          <h4 className="assessment-title-text">{topCareer?.title || 'Career Assessment'}</h4>
          <p className="assessment-summary-preview">{skillCount} skills analyzed</p>
        </div>
        <button className="expand-toggle">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {isExpanded && (
        <div className="assessment-body">
          <div className="assessment-section">
            <h5><Zap size={16} /> Summary</h5>
            <p>{assessment.aiSummary || 'No summary available'}</p>
          </div>

          <div className="assessment-grid">
            <div className="assessment-section">
              <h5><Target size={16} /> Strengths</h5>
              <div className="insight-tags">
                {assessment.aiStrengths?.slice(0, 4).map((s, i) => (
                  <span key={i} className="insight-tag strength">{s.skill}</span>
                )) || <span className="no-data">None recorded</span>}
              </div>
            </div>
            <div className="assessment-section">
              <h5><TrendingUp size={16} /> Growth Areas</h5>
              <div className="insight-tags">
                {assessment.aiGrowthAreas?.slice(0, 4).map((g, i) => (
                  <span key={i} className="insight-tag growth">{g.skill}</span>
                )) || <span className="no-data">None recorded</span>}
              </div>
            </div>
          </div>

          {assessment.aiCareerAnalysis?.length > 0 && (
            <div className="assessment-section">
              <h5><Briefcase size={16} /> Career Matches</h5>
              <div className="career-matches">
                {assessment.aiCareerAnalysis.slice(0, 3).map((career, i) => (
                  <div key={i} className="career-match-card">
                    <div className="career-match-header">
                      <span className="career-title">{career.title}</span>
                      <span className="career-salary">{career.salaryRange}</span>
                    </div>
                    <p className="career-reasoning">{career.reasoning}</p>
                    {career.suggestedCertifications?.length > 0 && (
                      <div className="career-extras">
                        <Award size={12} />
                        <span>{career.suggestedCertifications.slice(0, 2).map(c => c.name).join(', ')}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedAssessment, setExpandedAssessment] = useState(null);

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
          if (!data.resumes) data.resumes = [];
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
    if (!window.confirm("Delete this resume permanently?")) return;
    const profileRef = doc(db, 'profiles', user.uid);
    const resumeToDelete = profileData.resumes.find(r => r.id === resumeId);
    try {
      await updateDoc(profileRef, { resumes: arrayRemove(resumeToDelete) });
      setProfileData(prev => ({ ...prev, resumes: prev.resumes.filter(r => r.id !== resumeId) }));
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const totalAssessments = profileData?.assessments?.length || 0;
  const totalResumes = profileData?.resumes?.length || 0;

  const resumesToday = profileData?.resumes?.filter(r => {
    const created = r.createdAt ? new Date(r.createdAt) : new Date(r.lastUpdated);
    return created > new Date(Date.now() - 24 * 60 * 60 * 1000);
  }).length || 0;

  const assessmentsToday = profileData?.assessments?.filter(a => {
    const created = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
    return created > new Date(Date.now() - 24 * 60 * 60 * 1000);
  }).length || 0;

  return (
    <div className="profile-container">
      <div className="profile-hero">
        <div className="hero-content">
          <div className="hero-avatar">
            <User size={32} />
          </div>
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="title-accent"></span>
              {user.isAnonymous ? 'Guest Dashboard' : 'Your Dashboard'}
            </h1>
            <p className="hero-subtitle">{user.isAnonymous ? 'Sign up to save your progress' : user.email}</p>
          </div>
        </div>

        <div className="stats-row">
          <StatCard icon={BarChart3} label="Assessments" value={totalAssessments} />
          <StatCard icon={FileText} label="Resumes" value={totalResumes} />
          <StatCard icon={Briefcase} label="Top Match" value={profileData?.assessments?.[0]?.aiCareerAnalysis?.[0]?.title?.split(' ')[0] || '—'} />
        </div>
      </div>

      <section className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">Resumes</h2>
          <div className="section-actions">
            <UsageBar current={resumesToday} limit={3} label="Today" />
            <button
              onClick={() => navigate('/resume-builder', { state: { isNew: true } })}
              className="primary-btn"
              disabled={resumesToday >= 3}
            >
              <Plus size={16} /> New Resume
            </button>
          </div>
        </div>

        {profileData?.resumes?.length > 0 ? (
          <div className="resumes-grid">
            {profileData.resumes.map(resume => (
              <ResumeCard
                key={resume.id}
                resume={resume}
                onDelete={handleDeleteResume}
                onEdit={(id) => navigate('/resume-builder', { state: { resumeId: id } })}
                onView={(id) => navigate('/resume-builder', { state: { resumeId: id, isPreview: true } })}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <FileX size={40} />
            <p>No resumes yet</p>
            <button onClick={() => navigate('/resume-builder', { state: { isNew: true } })} className="primary-btn">
              Create Your First Resume
            </button>
          </div>
        )}
      </section>

      <section className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">Assessments</h2>
          <UsageBar current={assessmentsToday} limit={3} label="Today" />
        </div>

        {profileData?.assessments?.length > 0 ? (
          <div className="assessments-list">
            {profileData.assessments.map((assessment, index) => (
              <AssessmentCard
                key={assessment.assessmentId || index}
                assessment={assessment}
                isExpanded={expandedAssessment === index}
                onToggle={() => setExpandedAssessment(expandedAssessment === index ? null : index)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <BrainCircuit size={40} />
            <p>No assessments yet</p>
            <button onClick={() => navigate('/AssessmentPg')} className="primary-btn">
              Start Career Assessment
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;