import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/events');
  };

  return (
    <div className="landing-container">
      {/* Dark Background */}
      <div className="dark-background">
      </div>

      {/* Content Overlay */}
      <div className="content-overlay">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Event Management
                <span className="gradient-text"> Made Simple</span>
              </h1>
              <p className="hero-description">
                Organize, manage, and track your events effortlessly. 
                Create memorable experiences with our intuitive event management platform.
              </p>
              <div className="hero-buttons">
                <button className="cta-button primary" onClick={handleGetStarted}>
                  Get Started
                  <span className="button-icon">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
