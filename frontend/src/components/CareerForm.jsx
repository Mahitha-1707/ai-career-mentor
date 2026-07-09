import React, { useState } from 'react';
import { Sparkles, Plus, X, GraduationCap, Code, Compass, MessageSquare, User } from 'lucide-react';

export default function CareerForm({ onSubmit, loading }) {
  const [name, setName] = useState('');
  const [degree, setDegree] = useState('');
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [interests, setInterests] = useState([]);
  const [interestInput, setInterestInput] = useState('');
  const [experience, setExperience] = useState('');
  const [error, setError] = useState('');

  // Handle adding skill tags
  const addSkill = () => {
    const val = skillInput.trim();
    if (val && !skills.includes(val)) {
      setSkills([...skills, val]);
      setSkillInput('');
      setError('');
    }
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const removeSkill = (indexToRemove) => {
    setSkills(skills.filter((_, idx) => idx !== indexToRemove));
  };

  // Handle adding interest tags
  const addInterest = () => {
    const val = interestInput.trim();
    if (val && !interests.includes(val)) {
      setInterests([...interests, val]);
      setInterestInput('');
      setError('');
    }
  };

  const handleInterestKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addInterest();
    }
  };

  const removeInterest = (indexToRemove) => {
    setInterests(interests.filter((_, idx) => idx !== indexToRemove));
  };

  // Handle submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!degree.trim()) {
      setError('Please enter your degree or education field.');
      return;
    }
    if (skills.length === 0) {
      setError('Please add at least one skill.');
      return;
    }
    if (interests.length === 0) {
      setError('Please add at least one career interest.');
      return;
    }

    setError('');
    onSubmit({
      name: name.trim(),
      degree: degree.trim(),
      skills,
      interests,
      experience: experience.trim()
    });
  };

  return (
    <div className="glass glass-hover animate-fade-in-up" style={{
      padding: '36px',
      display: 'flex',
      flexDirection: 'column',
      gap: '28px',
      background: 'rgba(11, 16, 30, 0.45)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Visual decorative line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)'
      }} />

      <div>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '800',
          marginBottom: '8px',
          fontFamily: 'var(--font-heading)',
          background: 'linear-gradient(to right, #ffffff, var(--text-secondary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em'
        }}>
          Mentor Assessment
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
          Input your credentials, current capabilities, and professional objectives to map out targeted alignments.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
        
        {/* Name input */}
        <div>
          <label htmlFor="name-input" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: '600' }}>
            <User size={15} color="var(--primary)" />
            Full Name
          </label>
          <input
            id="name-input"
            type="text"
            placeholder="e.g. Sarah Jenkins"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(''); }}
            disabled={loading}
          />
        </div>

        {/* Degree input */}
        <div>
          <label htmlFor="degree-input" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: '600' }}>
            <GraduationCap size={15} color="var(--primary)" />
            Degree / Education Field
          </label>
          <input
            id="degree-input"
            type="text"
            placeholder="e.g. BS in Information Systems"
            value={degree}
            onChange={(e) => { setDegree(e.target.value); setError(''); }}
            disabled={loading}
          />
        </div>

        {/* Skills Tag Input */}
        <div>
          <label htmlFor="skills-input" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: '600' }}>
            <Code size={15} color="var(--primary)" />
            Skills (Press Enter or Click +)
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              id="skills-input"
              type="text"
              placeholder="e.g. React, Python, Figma, SQL"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              disabled={loading}
              style={{ flexGrow: 1 }}
            />
            <button
              type="button"
              onClick={addSkill}
              disabled={loading}
              style={{
                width: '46px',
                height: '46px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(167, 139, 250, 0.12)',
                border: '1px solid rgba(167, 139, 250, 0.25)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--primary)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--primary)';
                e.currentTarget.style.color = 'var(--bg-main)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(167, 139, 250, 0.12)';
                e.currentTarget.style.color = 'var(--primary)';
              }}
            >
              <Plus size={18} />
            </button>
          </div>
          
          {/* Skill Badges */}
          {skills.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
              {skills.map((skill, index) => (
                <span
                  key={index}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(167, 139, 250, 0.12)',
                    border: '1px solid rgba(167, 139, 250, 0.25)',
                    color: '#c084fc',
                    fontSize: '13px',
                    fontWeight: '500',
                    padding: '4px 12px',
                    borderRadius: '20px',
                  }}
                >
                  {skill}
                  <X
                    size={13}
                    style={{ cursor: 'pointer', opacity: 0.7 }}
                    onClick={() => removeSkill(index)}
                  />
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Interests Tag Input */}
        <div>
          <label htmlFor="interests-input" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: '600' }}>
            <Compass size={15} color="var(--primary)" />
            Career Interests / Target Goals
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              id="interests-input"
              type="text"
              placeholder="e.g. Remote, AI, UI Design, Backend"
              value={interestInput}
              onChange={(e) => setInterestInput(e.target.value)}
              onKeyDown={handleInterestKeyDown}
              disabled={loading}
              style={{ flexGrow: 1 }}
            />
            <button
              type="button"
              onClick={addInterest}
              disabled={loading}
              style={{
                width: '46px',
                height: '46px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(34, 211, 238, 0.12)',
                border: '1px solid rgba(34, 211, 238, 0.25)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--accent)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent)';
                e.currentTarget.style.color = 'var(--bg-main)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(34, 211, 238, 0.12)';
                e.currentTarget.style.color = 'var(--accent)';
              }}
            >
              <Plus size={18} />
            </button>
          </div>

          {/* Interest Badges */}
          {interests.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
              {interests.map((interest, index) => (
                <span
                  key={index}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(34, 211, 238, 0.12)',
                    border: '1px solid rgba(34, 211, 238, 0.25)',
                    color: '#22d3ee',
                    fontSize: '13px',
                    fontWeight: '500',
                    padding: '4px 12px',
                    borderRadius: '20px',
                  }}
                >
                  {interest}
                  <X
                    size={13}
                    style={{ cursor: 'pointer', opacity: 0.7 }}
                    onClick={() => removeInterest(index)}
                  />
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Experience details */}
        <div>
          <label htmlFor="experience-input" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: '600' }}>
            <MessageSquare size={15} color="var(--primary)" />
            Experience Details (Optional)
          </label>
          <textarea
            id="experience-input"
            rows="3"
            placeholder="e.g. Interned for 6 months writing Javascript widgets, or completed a bootcamp project in Flask."
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            disabled={loading}
            style={{ resize: 'vertical' }}
          />
        </div>

        {/* Error message */}
        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 16px',
            color: '#f87171',
            fontSize: '14px',
            fontWeight: '500',
            textAlign: 'left',
            animation: 'fadeInUp 0.2s ease-out'
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: '12px',
            padding: '14px 24px',
            background: 'linear-gradient(135deg, var(--secondary) 0%, var(--primary) 50%, var(--accent) 100%)',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            color: '#03050c',
            fontWeight: '700',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all var(--transition-normal)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: 'var(--shadow-glow)',
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 0 35px rgba(167, 139, 250, 0.4)';
              e.currentTarget.style.color = '#ffffff';
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
              e.currentTarget.style.color = '#03050c';
            }
          }}
        >
          {loading ? (
            <>
              <svg className="animate-spin" style={{ width: '20px', height: '20px', color: '#ffffff' }} fill="none" viewBox="0 0 24 24">
                <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Assessing profile...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Analyze Profile
            </>
          )}
        </button>

      </form>
    </div>
  );
}
