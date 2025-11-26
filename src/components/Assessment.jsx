import { doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { db } from '../firebase/config';
import './Assessment.css';
import { processSkillsLocally, getRelevantCareers, skillsData } from '../data/skillsDatabase';
import { getAiSkillAnalysis } from '../Services/geminiService';
import * as icons from 'lucide-react';

// a helper to dynamically render an icon by its name string
const Icon = ({ name, ...props }) => {
    const LucideIcon = icons[name];
    if (!LucideIcon) {
        return <icons.HelpCircle {...props} />;
    }
    return <LucideIcon {...props} />;
};


const StrengthCard = ({ skill, context, icon }) => (
    <div className="strength-card">
        <div className="strength-card-header">
            <Icon name={icon} size={20} className="strength-icon" />
            <span className="strength-skill">{skill}</span>
        </div>
        <p className="strength-context">{context}</p>
    </div>
);

const GrowthOpportunityCard = ({ skill, context, icon }) => (
    <div className="growth-card">
        <div className="growth-card-header">
            <Icon name={icon} size={20} className="growth-icon" />
            <span className="growth-skill">{skill}</span>
        </div>
        <p className="growth-context">{context}</p>
    </div>
);

const EvidenceCard = ({ userTrait, jobRequirement, icon }) => (
    <div className="evidence-card">
        <Icon name={icon} size={24} className="evidence-icon" />
        <div className="evidence-text">
            <p><span>your skill/interest:</span> {userTrait}</p>
            <p><span>aligns with requirement:</span> {jobRequirement}</p>
        </div>
    </div>
);

const SkillToBuildCard = ({ skill, suggestedFirstStep, icon }) => (
    <div className="skill-to-build-card">
        <Icon name={icon} size={24} className="skill-build-icon" />
        <div className="skill-build-text">
            <h6>{skill}</h6>
            <p><span>suggested first step:</span> {suggestedFirstStep}</p>
        </div>
    </div>
);

const ProjectBriefCard = ({ title, objective, skillsUsed, difficulty, featureSuggestions }) => (
    <div className={`project-brief-card difficulty-${difficulty}`}>
        <div className="project-brief-header">
            <icons.FolderKanban size={20} />
            <h5>{title}</h5>
        </div>
        <p className="project-objective">{objective}</p>
        <div className="project-features-section">
            <h6 className="project-section-title">suggested features</h6>
            <ul className="project-features-list">
                {featureSuggestions.map((feature, i) => <li key={i}>{feature}</li>)}
            </ul>
        </div>
        <div className="project-skills-used">
            {skillsUsed.map((skill, i) => <span key={i} className="skill-tag">{skill}</span>)}
        </div>
        <span className="project-difficulty">{difficulty}</span>
    </div>
);

const ResourceCard = ({ name, issuer, platform, icon }) => (
    <div className="resource-card">
        <Icon name={icon} size={32} className="resource-icon" />
        <div className="resource-text">
            <span className="resource-name">{name}</span>
            <span className="resource-issuer">by {issuer || platform}</span>
        </div>
    </div>
);

const CareerAccordion = ({ career, isOpen, onClick }) => (
    <div className={`career-accordion-item ${isOpen ? 'open' : ''}`}>
        <button className="career-accordion-header" onClick={onClick}>
            <div className="accordion-header-content">
                <icons.Briefcase size={24} />
                <span className="accordion-title">{career.title}</span>
            </div>
            {isOpen ? <icons.ChevronUp size={20} /> : <icons.ChevronDown size={20} />}
        </button>
        {isOpen && (
            <div className="career-accordion-body">
                <div className="career-section">
                    <h4 className="career-section-title"><icons.Info size={16} /> why it's a match</h4>
                    <p className="career-reasoning">{career.reasoning}</p>
                    <div className="salary-outlook-grid">
                        <div className="info-card"><h5 className='info-card-title'><icons.IndianRupee size={16} /> salary (entry-level)</h5><p className='info-card-content highlight-text big-text'>{career.salaryRange}</p></div>
                        <div className="info-card"><h5 className='info-card-title'><icons.BarChartHorizontal size={16} /> job outlook</h5><p className='info-card-content'>{career.jobOutlook}</p></div>
                    </div>
                </div>
                <div className="career-section">
                    <h4 className="career-section-title"><icons.CheckCircle2 size={16} className="icon-green"/> key alignments</h4>
                    <div className="evidence-grid">{career.keyAlignments.map((item, i) => <EvidenceCard key={i} {...item} />)}</div>
                </div>
                 <div className="career-section">
                    <h4 className="career-section-title"><icons.XCircle size={16} className="icon-red"/> skills to build</h4>
                    <div className="evidence-grid">{career.skillsToBuild.map((item, i) => <SkillToBuildCard key={i} {...item} />)}</div>
                </div>
            </div>
        )}
    </div>
);

const AnalysisResults = ({ analysis, onRetry }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [openAccordion, setOpenAccordion] = useState(0);

  const topCareer = analysis?.careerAnalysis?.[0];

  const handleCreateResume = () => {
     const skillsToPass = [...(analysis.strengths?.map(s => s.skill) || []), ...(topCareer?.skillsToBuild.map(s => s.skill) || [])];
     navigate('/resume-builder', { state: { isNew: true, prefillSkills: skillsToPass.join(', ') } });
  };

  return (
    <div className="results-container">
        <div className="stepper-container">
            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}><icons.User size={20} /><div className="step-label">1. your profile</div></div>
            <div className="step-connector"></div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}><icons.Briefcase size={20} /><div className="step-label">2. career matches</div></div>
            <div className="step-connector"></div>
            <div className={`step ${currentStep >= 3 ? 'active' : ''}`}><icons.Rocket size={20} /><div className="step-label">3. action plan</div></div>
        </div>

        {currentStep === 1 && (
            <div className="results-step-content">
                <div className="results-header"><h2 className="success-title">your profile summary</h2><p className="results-subtitle">{analysis.summary}</p></div>
                <div className="key-insights-grid">
                    <div className="insights-column"><h3 className="insights-title"><icons.Target size={24}/> your top strengths</h3><div className="cards-container">{analysis.strengths?.map((s, i) => <StrengthCard key={i} {...s} />)}</div></div>
                    <div className="insights-column"><h3 className="insights-title"><icons.TrendingUp size={24}/> your top opportunities</h3><div className="cards-container">{analysis.growthAreas?.map((g, i) => <GrowthOpportunityCard key={i} {...g} />)}</div></div>
                </div>
                <button className="stepper-nav-btn" onClick={() => setCurrentStep(2)}>view career matches <icons.ArrowRight size={18} /></button>
            </div>
        )}

        {currentStep === 2 && (
             <div className="results-step-content">
                <div className="results-header"><h2 className="success-title">top career recommendations</h2><p className="results-subtitle">explore roles that align with your profile</p></div>
                <div className="career-accordion-container">{analysis.careerAnalysis.map((career, index) => (<CareerAccordion key={index} career={career} isOpen={index === openAccordion} onClick={() => setOpenAccordion(index === openAccordion ? null : index)} />))}</div>
                 <div className="stepper-nav-container">
                    <button className="stepper-nav-btn secondary" onClick={() => setCurrentStep(1)}>back to profile</button>
                    <button className="stepper-nav-btn" onClick={() => setCurrentStep(3)}>create your action plan <icons.ArrowRight size={18} /></button>
                </div>
            </div>
        )}
        
        {currentStep === 3 && topCareer && (
             <div className="results-step-content">
                <div className="results-header"><h2 className="success-title">your action plan</h2><p className="results-subtitle">take the next steps to launch your career as a {topCareer.title}</p></div>
                <div className="action-plan-section">
                    <h3 className="action-plan-title"><icons.Award size={22} /> recommended certifications</h3>
                    <div className="resource-grid">{topCareer.suggestedCertifications.map((cert, i) => <ResourceCard key={i} {...cert} />)}</div>
                </div>
                <div className="action-plan-section">
                    <h3 className="action-plan-title"><icons.BookOpen size={22} /> recommended courses</h3>
                    <div className="resource-grid">{topCareer.suggestedCourses.map((course, i) => <ResourceCard key={i} name={course.courseName} platform={course.platform} icon={course.icon} />)}</div>
                </div>
                <div className="action-plan-section">
                    <h3 className="action-plan-title"><icons.FolderKanban size={22} /> portfolio project briefs</h3>
                    <div className="project-brief-grid">{topCareer.suggestedProjects.map((proj, i) => <ProjectBriefCard key={i} {...proj} />)}</div>
                </div>
                <div className="cta-card">
                    <icons.Rocket size={32}/>
                    <h4>ready to get noticed?</h4>
                    <p>use these insights to build a professional resume that stands out to recruiters</p>
                    <button onClick={handleCreateResume} className="cta-button">build my resume now</button>
                </div>
                 <div className="stepper-nav-container">
                    <button className="stepper-nav-btn secondary" onClick={() => setCurrentStep(2)}>back to careers</button>
                    <button className="retry-btn" onClick={onRetry}>start a new assessment</button>
                </div>
            </div>
        )}
    </div>
  );
};

const Assessment = () => {
  const { user } = useAuth();
  const [persona, setPersona] = useState(null);
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');
  const [experience, setExperience] = useState('0-1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const suggestedSkills = useMemo(() => {
    const allSkills = {
      technical: skillsData.technical.map(s => s.name),
      soft: skillsData.soft.map(s => s.name),
      industry: skillsData.industry.map(s => s.name),
    };

    switch (persona) {
      case 'highSchool':
        return [ ...allSkills.technical.slice(3, 6), 'python', 'javascript', ...allSkills.soft.slice(0, 5), ...allSkills.industry.slice(3, 5) ];
      case 'college':
        return [ 'react', 'node.js', 'git', 'java', 'mongodb', ...allSkills.soft.slice(0, 2), 'problem solving', 'teamwork', ...allSkills.industry.slice(0, 4) ];
      case 'jobSeeker':
        return [ 'aws', 'docker', 'python', 'react', 'sql', 'leadership', 'time management', 'project management', 'data analysis' ];
      default:
        return [];
    }
  }, [persona]);


  const handleSkillChipClick = (skillToAdd) => {
    const currentSkills = skills.split(',').map(s => s.trim()).filter(Boolean);
    if (!currentSkills.includes(skillToAdd)) {
      setSkills(currentSkills.length > 0 ? `${skills}, ${skillToAdd}` : skillToAdd);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!skills || !interests) {
      setError("please fill out all fields before analyzing.");
      return;
    }
    setLoading(true);
    setError('');
    setAnalysis(null);

    try {
      const matchedSkills = processSkillsLocally(skills);
      if (matchedSkills.length === 0) {
        setError("couldn't identify any valid skills. please check for typos or try different terms.");
        setLoading(false);
        return;
      }
      const relevantCareers = getRelevantCareers(matchedSkills.map(s => s.id));
      if (relevantCareers.length === 0) {
        setError("we couldn't find any relevant career matches for the skills provided. please try adding more skills.");
        setLoading(false);
        return;
      }

      const analysisResult = await getAiSkillAnalysis({
        persona,
        matchedSkills,
        relevantCareers,
        interests,
        experience: persona === 'jobSeeker' ? experience : null,
      });
      
      if (analysisResult.error) {
        setError(analysisResult.message || "the analysis failed. please try again.");
        setLoading(false);
        return;
      }
      
      setAnalysis(analysisResult);

      if (user) {
        const profileRef = doc(db, 'profiles', user.uid);
        const newAssessment = {
          assessmentId: new Date().toISOString(),
          createdAt: new Date(),
          persona,
          rawSkills: skills,
          interests,
          experience: persona === 'jobSeeker' ? experience : null,
          aiSummary: analysisResult.summary,
          aiStrengths: analysisResult.strengths,
          aiGrowthAreas: analysisResult.growthAreas,
          aiCareerAnalysis: analysisResult.careerAnalysis,
        };

        try {
          const docSnap = await getDoc(profileRef);
          if (docSnap.exists()) {
            await updateDoc(profileRef, {
              assessments: arrayUnion(newAssessment)
            });
          } else {
            await setDoc(profileRef, {
              userEmail: user.email,
              assessments: [newAssessment]
            });
          }
        } catch (dbError) {
          console.error("error saving assessment to firebase:", dbError);
        }
      }
    } catch (err) {
      setError('an unexpected error occurred. please check your connection and try again.');
      console.error('error during assessment process:', err);
    }
    setLoading(false);
  };

  const resetAssessment = () => {
    setAnalysis(null);
    setPersona(null);
    setSkills('');
    setInterests('');
    setExperience('0-1');
    setError('');
  };

  if (analysis) {
    return <AnalysisResults analysis={analysis} onRetry={resetAssessment} />;
  }

  if (!persona) {
    return (
      <div className="assessment-container">
        <h2 className="assessment-title">who are you?</h2>
        <p className="assessment-subtitle">select your current status to get personalized advice.</p>
        <div className="persona-selection">
          <button className="persona-btn" onClick={() => setPersona('highSchool')}><icons.School size={24} /> high school student</button>
          <button className="persona-btn" onClick={() => setPersona('college')}><icons.GraduationCap size={24} /> college student</button>
          <button className="persona-btn" onClick={() => setPersona('jobSeeker')}><icons.Search size={24} /> job seeker / professional</button>
        </div>
      </div>
    );
  }

  return (
    <div className="assessment-container">
      <h2 className="assessment-title">your career assessment</h2>
      <p className="assessment-subtitle">tell us about yourself to get a personalized career roadmap.</p>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="assessment-form">
        <div className="form-group"><label className="form-label">your skills</label><input type="text" className="form-input" placeholder="e.g., python, communication, graphic design" value={skills} onChange={(e) => setSkills(e.target.value)} /><div className="skill-chips-container">{suggestedSkills.map(skill => (<button type="button" key={skill} className="skill-chip" onClick={() => handleSkillChipClick(skill)}>{skill}</button>))}</div></div>
        <div className="form-group"><label className="form-label">your interests & hobbies</label><input type="text" className="form-input" placeholder="e.g., building web apps, solving puzzles, creative writing" value={interests} onChange={(e) => setInterests(e.target.value)} /></div>
        {persona === 'jobSeeker' && (<div className="form-group"><label className="form-label">years of professional experience</label><select value={experience} onChange={(e) => setExperience(e.target.value)} className="form-select"><option value="0-1 years (beginner)">0 - 1 years (beginner)</option><option value="2-4 years (intermediate)">2 - 4 years (intermediate)</option><option value="5+ years (advanced)">5+ years (advanced)</option></select></div>)}
        <div className="form-actions">
          <button type="button" className="back-btn" onClick={() => setPersona(null)}>back</button>
          <button type="submit" disabled={loading} className={`submit-btn ${loading ? 'loading' : ''}`}>{loading ? 'analyzing...' : 'generate my roadmap'}</button>
        </div>
      </form>
    </div>
  );
};

export default Assessment;