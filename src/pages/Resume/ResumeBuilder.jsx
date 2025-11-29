import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Share2, Download, Edit, ArrowLeft } from 'lucide-react';
import './ResumeBuilder.css';
import { useAuth } from '../../hooks/useAuth';
import { doc, getDoc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { dummyResumes } from '../../data/dummyResumeData';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';

const ResumeBuilder = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const resumeIdToEdit = location.state?.resumeId;
  const isNewResume = location.state?.isNew;
  const isPreviewMode = location.state?.isPreview;

  const [formData, setFormData] = useState({
    fullName: '', email: '', phoneNumber: '', linkedin: '', github: '', summary: '',
    experience: [{ jobTitle: '', company: '', startDate: '', endDate: '', description: '' }],
    education: [{ degree: '', university: '', gradYear: '' }],
    projects: [{ title: '', description: '', link: '' }],
    skills: ''
  });

  const [resumeData, setResumeData] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    if (user && resumeIdToEdit) {
      const fetchResumeData = async () => {
        const profileRef = doc(db, 'profiles', user.uid);
        const docSnap = await getDoc(profileRef);
        if (docSnap.exists() && docSnap.data().resumes) {
          const existingResume = docSnap.data().resumes.find(r => r.id === resumeIdToEdit);
          if (existingResume) {
            if (isPreviewMode) {
              setResumeData(existingResume);
            } else {
              setFormData(existingResume);
            }
          }
        }
      };
      fetchResumeData();
    }
  }, [user, resumeIdToEdit, isPreviewMode]);

  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    const script2 = document.createElement('script');
    script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';

    let loadedCount = 0;
    const checkAllLoaded = () => { if (++loadedCount === 2) setScriptsLoaded(true); };

    script1.onload = checkAllLoaded;
    script2.onload = checkAllLoaded;

    document.head.appendChild(script1);
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  const handleDownloadPDF = () => {
    if (!scriptsLoaded) {
      setFeedbackMessage("PDF generator is loading, please wait...");
      setTimeout(() => setFeedbackMessage(''), 3000);
      return;
    }

    const input = document.getElementById('resume-to-download');
    if (!input) {
      setFeedbackMessage("Error: Could not find resume preview to capture.");
      return;
    }

    window.html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const { jsPDF } = window.jspdf;

      const pdf = new jsPDF('p', 'pt', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(`Resume-${formData.fullName || 'Generated'}.pdf`);
    }).catch(err => {
      console.error("PDF generation failed:", err);
      setFeedbackMessage("Failed to generate PDF. Please try again.");
    });
  };

  const handleShare = () => {
    const textArea = document.createElement("textarea");
    textArea.value = window.location.href;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setFeedbackMessage('resume link copied to clipboard');
    } catch (err) {
      setFeedbackMessage('failed to copy link');
    }
    document.body.removeChild(textArea);
    setTimeout(() => setFeedbackMessage(''), 3000);
  };

  const handleChange = (e, section, index) => {
    const { name, value } = e.target;
    const newData = { ...formData };
    if (section) {
      newData[section][index][name] = value;
    } else {
      newData[name] = value;
    }
    setFormData(newData);
  };

  const addSection = (section) => {
    const newData = { ...formData };
    if (section === 'experience') {
      newData.experience.push({ jobTitle: '', company: '', startDate: '', endDate: '', description: '' });
    } else if (section === 'education') {
      newData.education.push({ degree: '', university: '', gradYear: '' });
    } else if (section === 'projects') {
      newData.projects.push({ title: '', description: '', link: '' });
    }
    setFormData(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const profileRef = doc(db, 'profiles', user.uid);
    const newResumeData = {
      ...formData,
      lastUpdated: new Date().toISOString(),
    };

    try {
      const docSnap = await getDoc(profileRef);
      if (!docSnap.exists() || !docSnap.data().resumes) {
        await setDoc(profileRef, { resumes: [] }, { merge: true });
      }

      if (isNewResume) {
        const currentResumes = docSnap.exists() ? (docSnap.data().resumes || []) : [];
        const now = new Date();
        const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const recentResumes = currentResumes.filter(r => {
          const created = r.createdAt ? new Date(r.createdAt) : new Date(r.lastUpdated);
          return created > twentyFourHoursAgo;
        });

        if (recentResumes.length >= 3) {
          setFeedbackMessage("Limit Reached: You can create 3 resumes in a 24-hour period. Your limit resets 24 hours after your first resume.");

          setTimeout(() => setFeedbackMessage(''), 5000);
          return;
        }

        newResumeData.id = `resume_${new Date().getTime()}`;
        newResumeData.createdAt = new Date().toISOString();
        await updateDoc(profileRef, {
          resumes: arrayUnion(newResumeData)
        });
      } else if (resumeIdToEdit) {
        const currentResumes = docSnap.data()?.resumes || [];
        const updatedResumes = currentResumes.map(r =>
          r.id === resumeIdToEdit ? { ...newResumeData, createdAt: r.createdAt || r.lastUpdated, id: resumeIdToEdit } : r
        );
        await updateDoc(profileRef, { resumes: updatedResumes });
      }
      setResumeData(newResumeData);
    } catch (error) {
      console.error("error saving resume to firestore:", error);
    }
  };

  const handleFillDummyData = (e) => {
    const selectedIndex = e.target.value;
    if (selectedIndex === "") return;

    const selectedResume = dummyResumes[selectedIndex];
    const { id, lastUpdated, ...formDataToSet } = selectedResume;
    setFormData(formDataToSet);
    setFeedbackMessage(`${selectedResume.fullName}'s data has been loaded`);
    setTimeout(() => setFeedbackMessage(''), 3000);
    e.target.value = "";
  };

  if (resumeData) {
    return (
      <div className="resume-builder-container">
        <div className="resume-header-actions no-print">
          <button onClick={() => navigate('/profile')} className="back-btn">
            <ArrowLeft size={16} /> Back to Profile
          </button>
          <h2 className="resume-builder-title">Your Resume Preview</h2>
        </div>
        <div className="resume-preview-wrapper">
          <ResumePreview data={resumeData} />
        </div>
        <div className="resume-actions no-print">
          {!isPreviewMode && (
            <button onClick={() => setResumeData(null)} className="edit-btn"><Edit size={16} /> Go Back & Edit</button>
          )}
          <button onClick={handleDownloadPDF} className="download-btn" disabled={!scriptsLoaded}><Download size={16} /> {scriptsLoaded ? 'Download PDF' : 'Loading'}</button>
          <button onClick={handleShare} className="share-btn"><Share2 size={16} /> Share Resume</button>
        </div>
        {feedbackMessage && <p className="feedback-message">{feedbackMessage}</p>}
      </div>
    )
  }

  return (
    <div className="resume-builder-container">
      <div className="resume-header-actions">
        <button onClick={() => navigate('/profile')} className="back-btn">
          <ArrowLeft size={16} /> Back to Profile
        </button>
        <h2 className="resume-builder-title">{isNewResume ? "Create a New Resume" : "Edit Your Resume"}</h2>
      </div>

      <ResumeForm
        formData={formData}
        handleChange={handleChange}
        addSection={addSection}
        handleSubmit={handleSubmit}
        handleFillDummyData={handleFillDummyData}
        feedbackMessage={feedbackMessage}
      />
    </div>
  );
};

export default ResumeBuilder;