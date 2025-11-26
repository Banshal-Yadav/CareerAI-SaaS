import React from 'react';
import './ResumeBuilder.css';

const ResumeForm = ({ 
    formData, 
    handleChange, 
    addSection, 
    handleSubmit, 
    handleFillDummyData, 
    feedbackMessage 
}) => {
  return (
    <>
      <div className="dummy-data-controls">
        <label htmlFor="dummy-data-select">for testing, load a profile:</label>
        <select id="dummy-data-select" onChange={handleFillDummyData} className="dummy-data-select">
            <option value="">-- select a profile --</option>
            <option value="0">cs student (priya sharma)</option>
            <option value="1">commerce student (rohan mehta)</option>
            <option value="2">arts student (ananya iyer)</option>
        </select>
      </div>
      {feedbackMessage && <p className="feedback-message">{feedbackMessage}</p>}

      <form onSubmit={handleSubmit} className="resume-form">
        <div className="form-section">
          <h3>Personal Details</h3>
          <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={(e) => handleChange(e)} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={(e) => handleChange(e)} required />
          <input type="tel" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={(e) => handleChange(e)} required />
          <input type="text" name="linkedin" placeholder="LinkedIn URL" value={formData.linkedin} onChange={(e) => handleChange(e)} required />
          <input type="text" name="github" placeholder="GitHub URL" value={formData.github} onChange={(e) => handleChange(e)} required />
        </div>
        <div className="form-section">
          <h3>Resume Summary</h3>
          <textarea name="summary" placeholder="A brief summary about your professional background" value={formData.summary} onChange={(e) => handleChange(e)} rows="4" required></textarea>
        </div>
        <div className="form-section">
          <h3>Skills</h3>
          <input type="text" name="skills" placeholder="Comma-separated skills, e.g, JavaScript, React, Teamwork" value={formData.skills} onChange={(e) => handleChange(e)} required/>
        </div>
        <div className="form-section">
          <h3>Work Experience (Optional)</h3>
          {formData.experience.map((exp, index) => (
            <div key={index} className="form-subsection">
              <input type="text" name="jobTitle" placeholder="Job Title" value={exp.jobTitle} onChange={(e) => handleChange(e, 'experience', index)} />
              <input type="text" name="company" placeholder="Company" value={exp.company} onChange={(e) => handleChange(e, 'experience', index)} />
               <div className="date-inputs">
                <input type="text" name="startDate" placeholder="Start Date" value={exp.startDate} onChange={(e) => handleChange(e, 'experience', index)} />
                <input type="text" name="endDate" placeholder="End Date" value={exp.endDate} onChange={(e) => handleChange(e, 'experience', index)} />
              </div>
              <textarea name="description" placeholder="Responsibilities and achievements (one per line)" value={exp.description} onChange={(e) => handleChange(e, 'experience', index)} rows="4"></textarea>
            </div>
          ))}
          <button type="button" onClick={() => addSection('experience')} className="add-section-btn">Add Experience</button>
        </div>
        <div className="form-section">
          <h3>Projects</h3>
          {formData.projects.map((proj, index) => (
            <div key={index} className="form-subsection">
              <input type="text" name="title" placeholder="Project Title" value={proj.title} onChange={(e) => handleChange(e, 'projects', index)} required />
              <input type="text" name="link" placeholder="Project Link (e.g, GitHub)" value={proj.link} onChange={(e) => handleChange(e, 'projects', index)} required />
              <textarea name="description" placeholder="Project description (one point per line)" value={proj.description} onChange={(e) => handleChange(e, 'projects', index)} rows="3" required></textarea>
            </div>
          ))}
          <button type="button" onClick={() => addSection('projects')} className="add-section-btn">Add Project</button>
        </div>
        <div className="form-section">
          <h3>Education</h3>
          {formData.education.map((edu, index) => (
            <div key={index} className="form-subsection">
              <input type="text" name="degree" placeholder="Degree" value={edu.degree} onChange={(e) => handleChange(e, 'education', index)} required />
              <input type="text" name="university" placeholder="University" value={edu.university} onChange={(e) => handleChange(e, 'education', index)} required />
              <input type="text" name="gradYear" placeholder="Date Range" value={edu.gradYear} onChange={(e) => handleChange(e, 'education', index)} required />
            </div>
          ))}
          <button type="button" onClick={() => addSection('education')} className="add-section-btn">Add Education</button>
        </div>
        <button type="submit" className="submit-resume-btn">Generate Resume</button>
      </form>
    </>
  );
};

export default ResumeForm;
