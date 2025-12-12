import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { doc, getDoc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase/config';
import './Profile.css';
import { User, FileText, Edit, Download, Trash2, Plus, X, Zap, Target, TrendingUp, Briefcase, Award, BookOpen, FolderKanban, FileX, BrainCircuit, Calendar, Sparkles, ArrowRight, Bookmark, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

const QuickActionCard = ({ icon: Icon, title, subtitle, onClick, accent }) => (
  <button className={`quick-action-card ${accent ? 'accent' : ''}`} onClick={onClick}>
    <div className="quick-action-icon"><Icon size={20} /></div>
    <div className="quick-action-text">
      <span className="quick-action-title">{title}</span>
      <span className="quick-action-subtitle">{subtitle}</span>
    </div>
    <ArrowUpRight size={16} className="quick-action-arrow" />
  </button>
);

const UsageMeter = ({ label, current, limit }) => {
  const percentage = typeof limit === 'number' ? Math.min((current / limit) * 100, 100) : 100;
  const status = typeof limit === 'number' ? (current >= limit ? 'full' : current >= limit - 1 ? 'warning' : 'ok') : 'ok';
  return (
    <div className="usage-meter">
      <div className="usage-meter-header">
        <span>{label}</span>
        <span className={`usage-count ${status}`}>{current}/{limit}</span>
      </div>
      <div className="usage-meter-bar">
        <div className="usage-meter-fill" style={{ width: `${percentage}%` }} data-status={status} />
      </div>
    </div>
  );
};

const ResumeCard = ({ resume, onDelete, onEdit, onView }) => (
  <div className="resume-card">
    <div className="resume-card-header">
      <div className="resume-icon-wrapper"><FileText size={24} /></div>
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

const AssessmentPreviewCard = ({ assessment, isBookmarked, onToggleBookmark, onOpen, onDelete, bookmarkCount, bookmarkLimit }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown";
    const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const topCareer = assessment.aiCareerAnalysis?.[0];
  const canBookmark = isBookmarked || bookmarkCount < bookmarkLimit;

  return (
    <div className={`assessment-preview-card ${isBookmarked ? 'bookmarked' : ''}`}>
      <div className="preview-card-header">
        <span className="preview-date"><Calendar size={12} /> {formatDate(assessment.createdAt)}</span>
        <div className="preview-actions">
          <button
            className={`preview-action-btn ${isBookmarked ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); onToggleBookmark(); }}
            disabled={!canBookmark && !isBookmarked}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
          >
            <Bookmark size={14} />
          </button>
          <button
            className="preview-action-btn danger"
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      <h3 className="preview-card-title">{topCareer?.title || 'Career Assessment'}</h3>
      <p className="preview-card-salary">{topCareer?.salaryRange || '—'}</p>
      <p className="preview-card-summary">{assessment.aiSummary?.slice(0, 100)}...</p>
      <button className="preview-view-btn" onClick={onOpen}>
        View Details <ArrowRight size={14} />
      </button>
    </div>
  );
};

const AssessmentModal = ({ assessment, onClose }) => {
  if (!assessment) return null;

  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown";
    const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={24} /></button>

        <div className="modal-header">
          <span className="modal-date">{formatDate(assessment.createdAt)} • {assessment.persona}</span>
          <h2 className="modal-title">{assessment.aiCareerAnalysis?.[0]?.title || 'Career Assessment'}</h2>
        </div>

        <div className="modal-section">
          <h4><Zap size={16} /> Summary</h4>
          <p>{assessment.aiSummary || 'No summary available'}</p>
        </div>

        <div className="modal-section">
          <h4><Target size={16} /> Skills Analyzed</h4>
          <div className="modal-skills">{assessment.rawSkills || 'No skills recorded'}</div>
        </div>

        <div className="modal-grid">
          <div className="modal-section">
            <h4><TrendingUp size={16} /> Strengths</h4>
            <div className="modal-items">
              {assessment.aiStrengths?.map((s, i) => (
                <div key={i} className="modal-item strength">
                  <strong>{s.skill}</strong>
                  <span>{s.context}</span>
                </div>
              )) || <span className="no-data">None recorded</span>}
            </div>
          </div>
          <div className="modal-section">
            <h4><Sparkles size={16} /> Growth Areas</h4>
            <div className="modal-items">
              {assessment.aiGrowthAreas?.map((g, i) => (
                <div key={i} className="modal-item growth">
                  <strong>{g.skill}</strong>
                  <span>{g.context}</span>
                </div>
              )) || <span className="no-data">None recorded</span>}
            </div>
          </div>
        </div>

        {assessment.aiCareerAnalysis?.length > 0 && (
          <div className="modal-section">
            <h4><Briefcase size={16} /> Career Matches</h4>
            <div className="modal-careers">
              {assessment.aiCareerAnalysis.map((career, i) => (
                <div key={i} className="modal-career">
                  <div className="career-header-row">
                    <span className="career-rank">#{i + 1}</span>
                    <h5>{career.title}</h5>
                    <span className="career-pay">{career.salaryRange}</span>
                  </div>
                  <p className="career-desc">{career.reasoning}</p>

                  {career.skillsToBuild?.length > 0 && (
                    <div className="career-subsection">
                      <span className="subsection-label">Skills to Build:</span>
                      <div className="tag-list">
                        {career.skillsToBuild.map((s, j) => (
                          <span key={j} className="tag skill">{s.skill}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {career.suggestedCertifications?.length > 0 && (
                    <div className="career-subsection">
                      <span className="subsection-label"><Award size={12} /> Certifications:</span>
                      <div className="tag-list">
                        {career.suggestedCertifications.map((c, j) => (
                          <span key={j} className="tag cert">{c.name}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {career.suggestedProjects?.length > 0 && (
                    <div className="career-subsection">
                      <span className="subsection-label"><FolderKanban size={12} /> Projects:</span>
                      <div className="projects-modal">
                        {career.suggestedProjects.map((p, j) => (
                          <div key={j} className={`project-modal ${p.difficulty?.toLowerCase()}`}>
                            <strong>{p.title}</strong>
                            <span className="difficulty">{p.difficulty}</span>
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
    </div>
  );
};

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
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
    if (!window.confirm("Delete this assessment?")) return;
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
      <div className="profile-page">
        <div className="profile-container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  const totalAssessments = profileData?.assessments?.length || 0;
  const totalResumes = profileData?.resumes?.length || 0;
  const latestAssessment = profileData?.assessments?.[0];
  const topCareer = latestAssessment?.aiCareerAnalysis?.[0];

  const resumesToday = profileData?.resumes?.filter(r => {
    const created = r.createdAt ? new Date(r.createdAt) : new Date(r.lastUpdated);
    return created > new Date(Date.now() - 24 * 60 * 60 * 1000);
  }).length || 0;

  const assessmentsToday = (profileData?.dailyCreations)
    ? profileData.dailyCreations.filter(ts => {
      const date = ts.toDate ? ts.toDate() : new Date(ts);
      return date > new Date(Date.now() - 24 * 60 * 60 * 1000);
    }).length
    : (profileData?.assessments?.filter(a => {
      const created = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
      return created > new Date(Date.now() - 24 * 60 * 60 * 1000);
    }).length || 0);

  const bookmarkCount = profileData?.bookmarks?.length || 0;
  const isPro = profileData?.isPro === true;
  const isBookmarked = (assessmentId) => profileData?.bookmarks?.some(b => b.assessmentId === assessmentId);

  const sortedAssessments = [...(profileData?.assessments || [])].sort((a, b) => {
    const aBookmarked = isBookmarked(a.assessmentId);
    const bBookmarked = isBookmarked(b.assessmentId);
    if (aBookmarked && !bBookmarked) return -1;
    if (!aBookmarked && bBookmarked) return 1;
    return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
  });

  const displayedAssessments = showAllAssessments ? sortedAssessments : sortedAssessments.slice(0, 6);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="dashboard-hero">
          <div className="hero-left">
            <span className="greeting">{getGreeting()}</span>
            <h1 className="hero-title">
              {user.isAnonymous ? 'Welcome, Guest' : user.displayName || user.email?.split('@')[0] || 'Welcome back'}
            </h1>

            <div className="quick-actions">
              <QuickActionCard
                icon={BrainCircuit}
                title="New Assessment"
                subtitle={`${3 - assessmentsToday} left today`}
                onClick={() => navigate('/AssessmentPg')}
                accent
              />
              <QuickActionCard
                icon={FileText}
                title="Create Resume"
                subtitle={`${totalResumes} created`}
                onClick={() => navigate('/resume-builder', { state: { isNew: true } })}
              />
            </div>

            <div className="usage-section">
              <UsageMeter label="Assessments today" current={assessmentsToday} limit={3} />
              <UsageMeter label="Stored assessments" current={totalAssessments} limit={isPro ? '∞' : FREE_LIMITS.assessments} />
              <UsageMeter label="Bookmarks" current={bookmarkCount} limit={isPro ? '∞' : FREE_LIMITS.bookmarks} />
            </div>
          </div>

          <div className="hero-right">
            {topCareer ? (
              <div className="top-career-card">
                <div className="career-card-header">
                  <Briefcase size={20} />
                  <span>Your Top Career Match</span>
                </div>
                <h3 className="career-card-title">{topCareer.title}</h3>
                <p className="career-card-salary">{topCareer.salaryRange}</p>
                <p className="career-card-reasoning">{topCareer.reasoning?.slice(0, 150)}...</p>
                {topCareer.skillsToBuild?.length > 0 && (
                  <div className="career-card-skills">
                    <span className="skills-label">Skills to build:</span>
                    <div className="skills-tags">
                      {topCareer.skillsToBuild.slice(0, 3).map((s, i) => (
                        <span key={i} className="skill-tag-mini">{s.skill}</span>
                      ))}
                    </div>
                  </div>
                )}
                <button className="career-view-btn" onClick={() => setSelectedAssessment(latestAssessment)}>
                  View Full Analysis <ArrowRight size={14} />
                </button>
              </div>
            ) : (
              <div className="no-career-card">
                <BrainCircuit size={32} />
                <h3>No assessments yet</h3>
                <p>Take your first career assessment to discover your ideal path</p>
                <button className="start-btn" onClick={() => navigate('/AssessmentPg')}>
                  Start Assessment
                </button>
              </div>
            )}
          </div>
        </div>

        <section className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Your Resumes</h2>
            <button
              onClick={() => navigate('/resume-builder', { state: { isNew: true } })}
              className="primary-btn"
              disabled={resumesToday >= 3}
            >
              <Plus size={16} /> New Resume
            </button>
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
              Your Assessments
              {totalAssessments > 6 && !showAllAssessments && (
                <span className="assessment-count">showing 6 of {totalAssessments}</span>
              )}
            </h2>
            <button onClick={() => navigate('/AssessmentPg')} className="secondary-btn">
              <Plus size={16} /> New Assessment
            </button>
          </div>

          {!isPro && <StorageBanner count={totalAssessments} limit={FREE_LIMITS.assessments} type="Assessment" />}

          {profileData?.assessments?.length > 0 ? (
            <>
              <div className="assessments-grid">
                {displayedAssessments.map((assessment, index) => (
                  <AssessmentPreviewCard
                    key={assessment.assessmentId || index}
                    assessment={assessment}
                    isBookmarked={isBookmarked(assessment.assessmentId)}
                    onToggleBookmark={() => handleToggleBookmark(assessment)}
                    onOpen={() => setSelectedAssessment(assessment)}
                    onDelete={() => handleDeleteAssessment(assessment)}
                    bookmarkCount={bookmarkCount}
                    bookmarkLimit={isPro ? Infinity : FREE_LIMITS.bookmarks}
                  />
                ))}
              </div>
              {totalAssessments > 6 && (
                <button className="view-all-btn" onClick={() => setShowAllAssessments(!showAllAssessments)}>
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

      {selectedAssessment && (
        <AssessmentModal
          assessment={selectedAssessment}
          onClose={() => setSelectedAssessment(null)}
        />
      )}
    </div>
  );
};

export default Profile;