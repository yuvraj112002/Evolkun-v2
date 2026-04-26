'use client';

import { useState, useCallback, memo } from 'react';
import './careers.css';

// Toast Notification Component
const Toast = memo(({ message, onClose }) => (
  <div style={{
    position: 'fixed',
    top: '2rem',
    right: '2rem',
    background: '#10b981',
    color: 'white',
    padding: '1rem 1.5rem',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    zIndex: 3000,
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    maxWidth: '400px',
    animation: 'slideInRight 0.3s ease-out'
  }}>
    <span style={{ fontSize: '1.5rem' }}>✓</span>
    <div>
      <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Application Submitted!</div>
      <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>{message}</div>
    </div>
    <button 
      onClick={onClose}
      style={{
        background: 'transparent',
        border: 'none',
        color: 'white',
        fontSize: '1.5rem',
        cursor: 'pointer',
        padding: '0',
        marginLeft: '0.5rem',
        opacity: 0.8
      }}
    >
      ×
    </button>
    <style>{`
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `}</style>
  </div>
));

Toast.displayName = 'Toast';

// Memoized form component for better performance
const ApplicationForm = memo(({ 
  formData, 
  fileName, 
  isLoading,
  onInputChange, 
  onFileChange, 
  onSubmit 
}) => (
  <form onSubmit={onSubmit}>
    <div className="form-row">
      <div className="form-group">
        <label>First Name <span className="required">*</span></label>
        <input 
          type="text" 
          name="firstName" 
          value={formData.firstName}
          onChange={onInputChange}
          required 
          placeholder="Enter your first name"
          disabled={isLoading}
        />
      </div>
      <div className="form-group">
        <label>Last Name <span className="required">*</span></label>
        <input 
          type="text" 
          name="lastName" 
          value={formData.lastName}
          onChange={onInputChange}
          required 
          placeholder="Enter your last name"
          disabled={isLoading}
        />
      </div>
    </div>

    <div className="form-group">
      <label>Email Address <span className="required">*</span></label>
      <input 
        type="email" 
        name="email" 
        value={formData.email}
        onChange={onInputChange}
        required 
        placeholder="your.email@example.com"
        disabled={isLoading}
      />
    </div>

    <div className="form-row">
      <div className="form-group">
        <label>Years of Experience <span className="required">*</span></label>
        <select 
          name="experience" 
          value={formData.experience}
          onChange={onInputChange}
          required
          disabled={isLoading}
        >
          <option value="">Select experience</option>
          <option value="0-1">0-1 years</option>
          <option value="1-2">1-2 years</option>
          <option value="2-3">2-3 years</option>
          <option value="3-5">3-5 years</option>
          <option value="5+">5+ years</option>
        </select>
      </div>
      <div className="form-group">
        <label>Expected Salary (₹/month) <span className="required">*</span></label>
        <input 
          type="number" 
          name="salary" 
          value={formData.salary}
          onChange={onInputChange}
          required 
          placeholder="e.g., 25000" 
          min="0"
          disabled={isLoading}
        />
      </div>
    </div>

    <div className="form-group">
      <label>Upload CV/Resume <span className="required">*</span></label>
      <div className="file-upload">
        <input 
          type="file" 
          name="cv" 
          id="cvUpload" 
          accept=".pdf,.doc,.docx" 
          required 
          onChange={onFileChange}
          disabled={isLoading}
        />
        <div className="file-upload-label">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 8L12 3L7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Click to upload or drag and drop</span>
        </div>
        {fileName && <div className="file-name">Selected: {fileName}</div>}
      </div>
    </div>

    <button type="submit" className="btn-submit" disabled={isLoading}>
      {isLoading ? 'Submitting...' : 'Submit Application'}
    </button>
  </form>
));

ApplicationForm.displayName = 'ApplicationForm';

export default function CareersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    experience: '',
    salary: '',
    cv: null
  });

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
    
    // Reset immediately
    setIsLoading(false);
    setFileName('');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      experience: '',
      salary: '',
      cv: null
    });
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setFormData(prev => ({
        ...prev,
        cv: file
      }));
    }
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });

      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        body: submitData
      });

      const result = await response.json();

      if (response.ok) {
        // Close modal immediately
        closeModal();
        
        // Show toast notification
        setShowToast(true);
        
        // Auto-hide toast after 5 seconds
        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      } else {
        console.error('Application submission failed:', result.message);
        alert('Failed to submit application. Please try again.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('An error occurred. Please try again.');
      setIsLoading(false);
    }
  }, [formData, closeModal]);

  return (
    <div className="careers-page">
      {/* Toast Notification */}
      {showToast && (
        <Toast 
          message="Thank you for your interest. We'll review your application and get back to you soon."
          onClose={() => setShowToast(false)}
        />
      )}

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            🚀 We're expanding our creative team
          </div>
          <h1>Join Our Growing Team</h1>
          <p>
            We're looking for passionate, creative individuals who want to make an impact. 
            Join us in building innovative digital solutions that transform businesses worldwide.
          </p>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="jobs-section">
        <div className="section-header">
          <h2>Open Positions</h2>
          <p>Explore exciting opportunities to grow your career with Evolkun</p>
        </div>

        <div className="jobs-grid">
          <div className="job-card">
            <div className="job-header">
              <div className="job-title-section">
                <h3>Social Media Executive</h3>
                <span className="job-department">Creative Team</span>
              </div>
              <span className="job-badge">We're Hiring</span>
            </div>

            <div className="job-meta">
              <div className="meta-item">
                <span className="meta-icon">📍</span>
                <span>Remote / Hybrid</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">💼</span>
                <span>Full-time</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">⏰</span>
                <span>Immediate Joining</span>
              </div>
            </div>

            <div className="job-description">
              <p>
                Evolkun – The Digital Studio is seeking a creative and dynamic Social Media Executive 
                to join our team. If you can create engaging videos, edit reels, and think creatively, 
                we want to hear from you! This role is perfect for someone who thrives in a fast-paced 
                digital environment and has a passion for social media storytelling.
              </p>
            </div>

            <div className="job-requirements">
              <h4>Key Responsibilities & Requirements</h4>
              <ul className="requirements-list">
                <li>Create compelling video content and edit reels for various social media platforms</li>
                <li>Develop creative concepts and execute innovative social media campaigns</li>
                <li>Basic video editing skills with proficiency in editing tools</li>
                <li>Strong understanding of social media trends and platform algorithms</li>
                <li>Excellent communication skills and ability to work collaboratively</li>
                <li>Creative mindset with attention to detail and storytelling abilities</li>
              </ul>
            </div>


            <button className="btn-apply" onClick={openModal}>
              Apply Now
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className="jobs-grid">
            <div className="job-card">
              <div className="job-header">
                <div className="job-title-section">
                  <h3>Java Developer</h3>
                  <span className="job-department">Engineering Team</span>
                </div>
                <span className="job-badge">We're Hiring</span>
              </div>

              <div className="job-meta">
                <div className="meta-item">
                  <span className="meta-icon">📍</span>
                  <span>Onsite</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">💼</span>
                  <span>Full-time</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">⏰</span>
                  <span>Immediate Joining</span>
                </div>
              </div>

              <div className="job-description">
                <p>
                  Evolkun – The Digital Studio is looking for a skilled and motivated Java Developer 
                  to join our engineering team. The ideal candidate will be responsible for designing, 
                  developing, and maintaining scalable Java-based applications. This role suits someone 
                  who enjoys solving complex problems and working in a collaborative, fast-paced environment.
                </p>
              </div>

              <div className="job-requirements">
                <h4>Key Responsibilities & Requirements</h4>
                <ul className="requirements-list">
                  <li>Design, develop, and maintain robust Java applications</li>
                  <li>Work with frameworks such as Spring or Spring Boot</li>
                  <li>Develop and integrate RESTful APIs</li>
                  <li>Strong understanding of OOP concepts, data structures, and algorithms</li>
                  <li>Experience with databases (MySQL, PostgreSQL, or MongoDB)</li>
                  <li>Ability to debug, optimize, and write clean, maintainable code</li>
                  <li>Good communication skills and ability to work in a team-oriented environment</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Application Modal */}
      {isModalOpen && (
        <div 
          className={`modal-overlay ${isModalOpen ? 'active' : ''}`}
          onClick={(e) => {
            if (e.target.classList.contains('modal-overlay')) {
              closeModal();
            }
          }}
        >
          <div className="modal">
            <div className="modal-header">
              <h2>Apply for Position</h2>
              <p>Social Media Executive - Creative Team</p>
              <button className="close-modal" onClick={closeModal}>
                &times;
              </button>
            </div>
            
            <div className="modal-body">
              <ApplicationForm
                formData={formData}
                fileName={fileName}
                isLoading={isLoading}
                onInputChange={handleInputChange}
                onFileChange={handleFileChange}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}