import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { doc, getDoc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase/config';
import './Profile.css';
import { User, FileText, Edit, Download, Trash2, Plus, ChevronDown, ChevronUp, Zap, Target, TrendingUp, Briefcase, Award, BookOpen, FolderKanban, FileX, BrainCircuit, Calendar, BarChart3, Sparkles, ArrowRight, Bookmark, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ icon: Icon, label, value, accent }) => (
  <div className={`stat-card ${accent ? 'stat-accent' : ''}`}>
    <div className="stat-icon">
      <Icon size={20} />
    </div>
    <div className="stat-content">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
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

const FREE_LIMITS = { assessments: 10, bookmarks: 3, resumes: 3 };

const StorageBanner = ({ count, limit, type }) => {
  if (count < limit - 2) return null;
  const isFull = count >= limit;
  return (
    <div className={`storage-banner ${isFull ? 'full' : 'warning'}`}>
      <AlertTriangle size={16} />
      <span>
        {isFull
          ? `${type} limit reached (${count}/${limit}). New ${type.toLowerCase()} will replace oldest.`
          : `Approaching ${type.toLowerCase()} limit (${count}/${limit})`
        }
      </span>
      <button className="upgrade-link" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
        Upgrade to Pro
      </button>
    </div>
  );
};

const AssessmentCard = ({ assessment, isExpanded, onToggle, onDelete, isBookmarked, onToggleBookmark, bookmarkCount, bookmarkLimit }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown";
    const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const topCareer = assessment.aiCareerAnalysis?.[0];
  const skillCount = assessment.rawSkills?.split(',').length || 0;
  const canBookmark = isBookmarked || bookmarkCount < bookmarkLimit;

  return (
    <div className={`assessment-card ${isExpanded ? 'expanded' : ''} ${isBookmarked ? 'bookmarked' : ''}`}>
      <div className="assessment-header" onClick={onToggle}>
        <div className="assessment-meta">
          <span className="assessment-date"><Calendar size={14} /> {formatDate(assessment.createdAt)}</span>
          <span className="assessment-persona">{assessment.persona}</span>
        </div>
        <div className="assessment-preview">
          <h4 className="assessment-title-text">
            {isBookmarked && <Bookmark size={14} className="bookmark-indicator" />}
            {topCareer?.title || 'Career Assessment'}
          </h4>
          <p className="assessment-summary-preview">{skillCount} skills • {assessment.aiCareerAnalysis?.length || 0} career matches</p>
        </div>
        <div className="assessment-header-actions">
          <button
            className={`bookmark-btn ${isBookmarked ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); onToggleBookmark(); }}
            title={isBookmarked ? 'Remove bookmark' : (canBookmark ? 'Bookmark this assessment' : `Bookmark limit reached (${bookmarkLimit})`)}
            disabled={!canBookmark && !isBookmarked}
          >
            <Bookmark size={16} />
          </button>
          <button
            className="delete-assessment-btn"
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            title="Delete assessment"
          >
            <Trash2 size={16} />
          </button>
          <button className="expand-toggle">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="assessment-body">
          <div className="assessment-section">
            <h5><Zap size={16} /> Summary</h5>
            <p className="summary-text">{assessment.aiSummary || 'No summary available'}</p>
          </div>

          <div className="assessment-section">
            <h5><Target size={16} /> Your Analyzed Skills</h5>
            <p className="skills-raw">{assessment.rawSkills || 'No skills recorded'}</p>
          </div>

          <div className="assessment-grid">
            <div className="assessment-section">
              <h5><TrendingUp size={16} /> Strengths</h5>
              <div className="insight-list">
                {assessment.aiStrengths?.map((s, i) => (
                  <div key={i} className="insight-item strength">
                    <strong>{s.skill}</strong>
                    <span>{s.context}</span>
                  </div>
                )) || <span className="no-data">None recorded</span>}
              </div>
            </div>
            <div className="assessment-section">
              <h5><Sparkles size={16} /> Growth Areas</h5>
              <div className="insight-list">
                {assessment.aiGrowthAreas?.map((g, i) => (
                  <div key={i} className="insight-item growth">
                    <strong>{g.skill}</strong>
                    <span>{g.context}</span>
                  </div>
                )) || <span className="no-data">None recorded</span>}
              </div>
            </div>
          </div>

          {assessment.aiCareerAnalysis?.length > 0 && (
            <div className="assessment-section">
              <h5><Briefcase size={16} /> All Career Matches</h5>
              <div className="career-matches-full">
                {assessment.aiCareerAnalysis.map((career, i) => (
                  <div key={i} className="career-full-card">
                    <div className="career-full-header">
                      <span className="career-number">#{i + 1}</span>
                      <div className="career-title-row">
                        <h4>{career.title}</h4>
                        <span className="career-salary">{career.salaryRange}</span>
                      </div>
                    </div>
                    <p className="career-reasoning">{career.reasoning}</p>

                    {career.keyAlignments?.length > 0 && (
                      <div className="career-detail-section">
                        <span className="detail-label">Key Alignments:</span>
                        <div className="detail-tags">
                          {career.keyAlignments.map((a, j) => (
                            <span key={j} className="detail-tag">{a.userTrait} → {a.jobRequirement}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {career.skillsToBuild?.length > 0 && (
                      <div className="career-detail-section">
                        <span className="detail-label">Skills to Build:</span>
                        <div className="detail-tags">
                          {career.skillsToBuild.map((s, j) => (
                            <span key={j} className="detail-tag skill-tag">{s.skill}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {career.suggestedCertifications?.length > 0 && (
                      <div className="career-detail-section">
                        <span className="detail-label"><Award size={12} /> Certifications:</span>
                        <div className="detail-tags">
                          {career.suggestedCertifications.map((c, j) => (
                            <span key={j} className="detail-tag cert-tag">{c.name} ({c.issuer})</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {career.suggestedCourses?.length > 0 && (
                      <div className="career-detail-section">
                        <span className="detail-label"><BookOpen size={12} /> Courses:</span>
                        <div className="detail-tags">
                          {career.suggestedCourses.map((c, j) => (
                            <span key={j} className="detail-tag course-tag">{c.courseName} - {c.platform}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {career.suggestedProjects?.length > 0 && (
                      <div className="career-detail-section">
                        <span className="detail-label"><FolderKanban size={12} /> Projects:</span>
                        <div className="projects-list">
                          {career.suggestedProjects.map((p, j) => (
                            <div key={j} className={`project-item ${p.difficulty?.toLowerCase()}`}>
                              <strong>{p.title}</strong>
                              <span className="project-difficulty">{p.difficulty}</span>
                              <p>{p.objective}</p>
                            </div>
                          ))}
                        </div>
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
  const [showAllAssessments, setShowAllAssessments] = useState(false);

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
          if (!data.bookmarks) data.bookmarks = [];
          setProfileData(data);
        } else {
          setProfileData({ assessments: [], resumes: [], bookmarks: [] });
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

  const handleDeleteAssessment = async (assessmentToDelete) => {
    if (!window.confirm("Delete this assessment? This cannot be undone.")) return;
    const profileRef = doc(db, 'profiles', user.uid);
    try {
      await updateDoc(profileRef, { assessments: arrayRemove(assessmentToDelete) });
      const bookmarkToRemove = profileData.bookmarks?.find(b => b.assessmentId === assessmentToDelete.assessmentId);
      if (bookmarkToRemove) {
        await updateDoc(profileRef, { bookmarks: arrayRemove(bookmarkToRemove) });
      }
      setProfileData(prev => ({
        ...prev,
        assessments: prev.assessments.filter(a => a.assessmentId !== assessmentToDelete.assessmentId),
        bookmarks: (prev.bookmarks || []).filter(b => b.assessmentId !== assessmentToDelete.assessmentId)
      }));
      setExpandedAssessment(null);
    } catch (error) {
      console.error("Error deleting assessment:", error);
    }
  };

  const handleToggleBookmark = async (assessment) => {
    const profileRef = doc(db, 'profiles', user.uid);
    const existingBookmark = profileData.bookmarks?.find(b => b.assessmentId === assessment.assessmentId);

    try {
      if (existingBookmark) {
        await updateDoc(profileRef, { bookmarks: arrayRemove(existingBookmark) });
        setProfileData(prev => ({
          ...prev,
          bookmarks: prev.bookmarks.filter(b => b.assessmentId !== assessment.assessmentId)
        }));
      } else {
        if ((profileData.bookmarks?.length || 0) >= FREE_LIMITS.bookmarks && !profileData.isPro) {
          alert('Bookmark limit reached (3). Upgrade to Pro for unlimited bookmarks!');
          return;
        }
        const bookmark = { assessmentId: assessment.assessmentId, createdAt: new Date() };
        await updateDoc(profileRef, { bookmarks: arrayUnion(bookmark) });
        setProfileData(prev => ({
          ...prev,
          bookmarks: [...(prev.bookmarks || []), bookmark]
        }));
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
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

  const displayedAssessments = showAllAssessments
    ? profileData?.assessments
    : profileData?.assessments?.slice(0, 3);

  const bookmarkCount = profileData?.bookmarks?.length || 0;
  const isPro = profileData?.isPro === true;
  const isBookmarked = (assessmentId) => profileData?.bookmarks?.some(b => b.assessmentId === assessmentId);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="profile-container">
      <div className="profile-hero">
        <div className="hero-welcome">
          <span className="greeting">{getGreeting()}</span>
          <h1 className="hero-title">
            {user.isAnonymous ? 'Welcome, Guest' : user.displayName || user.email?.split('@')[0] || 'Welcome back'}
          </h1>
          <p className="hero-subtitle">
            {user.isAnonymous
              ? 'Sign up to save your career progress permanently'
              : 'Here\'s your career journey at a glance'}
          </p>
        </div>

        <div className="stats-row">
          <StatCard icon={BarChart3} label="Total Assessments" value={totalAssessments} />
          <StatCard icon={FileText} label="Resumes Created" value={totalResumes} />
          <StatCard
            icon={Briefcase}
            label="Top Career Match"
            value={profileData?.assessments?.[0]?.aiCareerAnalysis?.[0]?.title || '—'}
            accent
          />
        </div>
      </div>

      <section className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">Your Resumes</h2>
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
            <p>No resumes yet. Create your first one!</p>
            <button onClick={() => navigate('/resume-builder', { state: { isNew: true } })} className="primary-btn">
              Create Resume
            </button>
          </div>
        )}
      </section>

      <section className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">
            Recent Assessments
            {totalAssessments > 3 && !showAllAssessments && (
              <span className="assessment-count">showing 3 of {totalAssessments}</span>
            )}
          </h2>
          <div className="section-actions">
            <UsageBar current={assessmentsToday} limit={3} label="Today" />
            <button onClick={() => navigate('/AssessmentPg')} className="secondary-btn">
              <Plus size={16} /> New Assessment
            </button>
          </div>
        </div>

        {!isPro && <StorageBanner count={totalAssessments} limit={FREE_LIMITS.assessments} type="Assessment" />}

        {profileData?.assessments?.length > 0 ? (
          <>
            <div className="assessments-list">
              {displayedAssessments.map((assessment, index) => (
                <AssessmentCard
                  key={assessment.assessmentId || index}
                  assessment={assessment}
                  isExpanded={expandedAssessment === index}
                  onToggle={() => setExpandedAssessment(expandedAssessment === index ? null : index)}
                  onDelete={() => handleDeleteAssessment(assessment)}
                  isBookmarked={isBookmarked(assessment.assessmentId)}
                  onToggleBookmark={() => handleToggleBookmark(assessment)}
                  bookmarkCount={bookmarkCount}
                  bookmarkLimit={isPro ? Infinity : FREE_LIMITS.bookmarks}
                />
              ))}
            </div>
            {totalAssessments > 3 && (
              <button
                className="view-all-btn"
                onClick={() => setShowAllAssessments(!showAllAssessments)}
              >
                {showAllAssessments ? 'Show Less' : `View All ${totalAssessments} Assessments`}
                <ArrowRight size={16} />
              </button>
            )}
          </>
        ) : (
          <div className="empty-state">
            <BrainCircuit size={40} />
            <p>No assessments yet. Discover your ideal career path!</p>
            <button onClick={() => navigate('/AssessmentPg')} className="primary-btn">
              Start Assessment
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;