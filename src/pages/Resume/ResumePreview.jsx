import React from 'react';
import {
    Mail, Phone, Linkedin, Github, User, Star, Wrench, BookOpen,
    Briefcase as BriefcaseIcon
} from 'lucide-react';
import './ResumeBuilder.css';

const ResumePreview = ({ data }) => {
    const descriptionToList = (desc) => desc ? desc.split('\n').filter(line => line.trim() !== '') : [];
    const hasWorkExperience = data.experience && data.experience.some(exp => exp.jobTitle && exp.jobTitle.trim() !== '');

    return (
        <div id="resume-to-download">
            <div className="resume-preview-container">
                <div className="resume-main-content">
                    <header className="resume-header">
                        <h1>{data.fullName}</h1>
                    </header>
                    <section className="resume-section resume-summary">
                        <h2 className="resume-section-title"><User size={18} /> Resume Summary</h2>
                        <p>{data.summary}</p>
                    </section>
                    {hasWorkExperience && (
                        <section className="resume-section">
                            <h2 className="resume-section-title"><BriefcaseIcon size={18} /> Work Experience</h2>
                            {data.experience.map((exp, i) => (
                                exp.jobTitle && (
                                    <div key={i} className="job">
                                        <p className="job-title">{exp.jobTitle}</p>
                                        <p className="company">{exp.company}</p>
                                        <p className="job-date">{exp.startDate} - {exp.endDate}</p>
                                        <ul className="job-description">{descriptionToList(exp.description).map((item, j) => <li key={j}>{item}</li>)}</ul>
                                    </div>
                                )
                            ))}
                        </section>
                    )}
                    <section className="resume-section">
                        <h2 className="resume-section-title"><Wrench size={18} /> Projects</h2>
                        {data.projects.map((proj, i) => (
                            <div key={i} className="project">
                                <p className="project-title">{proj.title}</p>
                                <a
                                    href={proj.link && !proj.link.trim().toLowerCase().startsWith('javascript:') ? proj.link : '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-link"
                                >
                                    {proj.link}
                                </a>
                                <ul className="project-description">{descriptionToList(proj.description).map((item, j) => <li key={j}>{item}</li>)}</ul>
                            </div>
                        ))}
                    </section>
                </div>
                <aside className="resume-sidebar">
                    <section className="resume-section">
                        <h2 className="resume-section-title">Contact</h2>
                        <div className="contact-item"><Mail size={14} /><span>{data.email}</span></div>
                        <div className="contact-item"><Phone size={14} /><span>{data.phoneNumber}</span></div>
                        <div className="contact-item"><Linkedin size={14} /><span>{data.linkedin}</span></div>
                        <div className="contact-item"><Github size={14} /><span>{data.github}</span></div>
                    </section>
                    <section className="resume-section">
                        <h2 className="resume-section-title"><BookOpen size={18} /> Education</h2>
                        {data.education.map((edu, i) => (
                            <div key={i} className="school">
                                <p className="degree">{edu.degree}</p>
                                <p className="university">{edu.university}</p>
                                <p className="grad-year">{edu.gradYear}</p>
                            </div>
                        ))}
                    </section>
                    <section className="resume-section">
                        <h2 className="resume-section-title"><Star size={18} /> Skills</h2>
                        <div className="skill-chips">{data.skills.split(',').map((skill, i) => <span key={i} className="skill-chip">{skill.trim()}</span>)}</div>
                    </section>
                </aside>
            </div>
        </div>
    );
};

export default ResumePreview;
