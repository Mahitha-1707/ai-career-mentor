import React from 'react';
import { 
  Sparkles, 
  Briefcase, 
  CheckCircle, 
  Map, 
  Code2, 
  Award, 
  HelpCircle, 
  TrendingUp, 
  AlertTriangle,
  Flame,
  Star,
  Target
} from 'lucide-react';

// Sub-component: Radial Match Score Ring
function MatchScoreRing({ score }) {
  const radius = 26;
  const stroke = 3;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="rgba(255, 255, 255, 0.05)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="url(#gradientScore)"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="progress-ring-circle"
        />
        <defs>
          <linearGradient id="gradientScore" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--accent)" />
          </linearGradient>
        </defs>
      </svg>
      <span style={{ position: 'absolute', fontSize: '11px', fontWeight: '800', color: '#ffffff' }}>
        {score}%
      </span>
    </div>
  );
}

export default function ResultCard({ response, loading, loadingStatus }) {
  // 1. Loading state view
  if (loading) {
    return (
      <div className="glass animate-fade-in-up" style={{
        padding: '56px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: '500px',
        background: 'rgba(11, 16, 30, 0.3)',
      }}>
        <div style={{ position: 'relative', marginBottom: '28px' }}>
          <div className="animate-spin" style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            border: '3px solid rgba(167, 139, 250, 0.1)',
            borderTopColor: 'var(--primary)'
          }} />
          <Sparkles size={24} color="var(--accent)" style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            animation: 'pulse-light 1.5s infinite ease-in-out'
          }} />
        </div>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          marginBottom: '10px',
          fontFamily: 'var(--font-heading)',
          background: 'linear-gradient(to right, #ffffff, var(--text-secondary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Generating Mentorship Roadmap
        </h3>
        <p style={{
          fontSize: '14.5px',
          color: 'var(--text-secondary)',
          maxWidth: '380px',
          lineHeight: '1.6'
        }} className="pulse-skeleton">
          {loadingStatus || "Consulting mentor models..."}
        </p>
      </div>
    );
  }

  // 2. Empty state placeholders
  if (!response) {
    return (
      <div className="glass animate-fade-in-up" style={{
        padding: '48px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: '500px',
        background: 'rgba(11, 16, 30, 0.2)',
        borderStyle: 'dashed',
        borderWidth: '1.5px',
        borderColor: 'rgba(255, 255, 255, 0.08)',
      }}>
        <div style={{
          background: 'rgba(167, 139, 250, 0.04)',
          border: '1px solid rgba(167, 139, 250, 0.15)',
          borderRadius: '50%',
          width: '76px',
          height: '76px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
          boxShadow: '0 0 20px rgba(167, 139, 250, 0.05)',
        }}>
          <Sparkles size={32} color="var(--primary)" style={{ opacity: 0.6, animation: 'pulse-light 3s infinite ease-in-out' }} />
        </div>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          marginBottom: '10px',
          fontFamily: 'var(--font-heading)'
        }}>
          Awaiting Your Assessment
        </h3>
        <p style={{
          maxWidth: '360px',
          fontSize: '14px',
          color: 'var(--text-secondary)',
          lineHeight: '1.5'
        }}>
          Provide your current skillset and career objectives to produce a comprehensive match roadmap.
        </p>
      </div>
    );
  }

  const { 
    summary, 
    domain, 
    roles, 
    skillGap, 
    certifications, 
    projects, 
    interviewTips, 
    roadmap, 
    isMock 
  } = response;

  // Gap Level Style Helper
  const getGapBadgeStyles = (level) => {
    switch (level) {
      case 'High':
        return { background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171' };
      case 'Medium':
        return { background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#fbbf24' };
      case 'Low':
      default:
        return { background: 'rgba(34, 211, 238, 0.12)', border: '1px solid rgba(34, 211, 238, 0.3)', color: '#22d3ee' };
    }
  };

  return (
    <div className="glass animate-fade-in-up" style={{
      padding: '36px',
      display: 'flex',
      flexDirection: 'column',
      gap: '36px',
      background: 'rgba(11, 16, 30, 0.45)',
      boxShadow: 'var(--shadow-lg), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
      position: 'relative'
    }}>
      {/* Decorative colored glow bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, var(--accent) 0%, var(--primary) 100%)'
      }} />

      {/* Header Info */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div style={{
            background: 'linear-gradient(90deg, rgba(167, 139, 250, 0.15) 0%, rgba(34, 211, 238, 0.15) 100%)',
            border: '1px solid rgba(167, 139, 250, 0.3)',
            borderRadius: '20px',
            padding: '6px 14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <TrendingUp size={14} color="var(--primary)" />
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#c084fc', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {domain || 'Career Path'}
            </span>
          </div>

          {isMock && (
            <div style={{
              background: 'rgba(34, 211, 238, 0.08)',
              border: '1px solid rgba(34, 211, 238, 0.2)',
              borderRadius: '20px',
              padding: '4px 12px',
              fontSize: '11px',
              fontWeight: '600',
              color: 'var(--accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              Simulated Offline Insights
            </div>
          )}
        </div>

        <h2 style={{
          fontSize: '28px',
          fontWeight: '800',
          marginBottom: '16px',
          fontFamily: 'var(--font-heading)',
          background: 'linear-gradient(to right, #ffffff, var(--text-secondary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <Sparkles size={24} color="var(--accent)" />
          Mentor Insights
        </h2>

        <p style={{
          fontSize: '15px',
          color: 'var(--text-secondary)',
          lineHeight: '1.65',
          background: 'rgba(255, 255, 255, 0.015)',
          borderLeft: '4px solid var(--primary)',
          padding: '16px 20px',
          borderRadius: '0 var(--radius-md) var(--radius-md) 0'
        }}>
          {summary}
        </p>
      </div>

      {/* 1. Career Suggestions & Match Score */}
      <div>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '700',
          marginBottom: '18px',
          fontFamily: 'var(--font-heading)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: '#ffffff'
        }}>
          <Briefcase size={18} color="var(--accent)" />
          Recommended Roles & Fit Rankings
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {roles && roles.map((role, idx) => (
            <div 
              key={idx} 
              style={{
                background: 'rgba(15, 23, 42, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                transition: 'all var(--transition-normal)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(167, 139, 250, 0.35)';
                e.currentTarget.style.background = 'rgba(15, 23, 42, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.background = 'rgba(15, 23, 42, 0.4)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <span style={{ fontWeight: '700', fontSize: '17px', color: '#ffffff' }}>
                  {role.title}
                </span>
                <MatchScoreRing score={role.matchScore} />
              </div>
              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.55' }}>
                {role.reason}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Skill Gap Analysis */}
      {skillGap && skillGap.length > 0 && (
        <div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '700',
            marginBottom: '18px',
            fontFamily: 'var(--font-heading)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#ffffff'
          }}>
            <Target size={18} color="var(--primary)" />
            Skill Gap Analysis
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px' }}>
            {skillGap.map((gap, idx) => {
              const badgeStyle = getGapBadgeStyles(gap.gapLevel);
              return (
                <div 
                  key={idx}
                  style={{
                    background: 'rgba(15, 23, 42, 0.25)',
                    border: '1px solid rgba(255, 255, 255, 0.04)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AlertTriangle size={15} color={badgeStyle.color} />
                      <span style={{ fontWeight: '700', fontSize: '14.5px', color: '#ffffff' }}>
                        {gap.skill}
                      </span>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        Target: {gap.requiredFor}
                      </span>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: '700',
                        ...badgeStyle
                      }}>
                        {gap.gapLevel} Gap
                      </span>
                    </div>
                  </div>
                  
                  <div style={{
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.45',
                    background: 'rgba(255,255,255,0.01)',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    borderLeft: `2px solid ${badgeStyle.color}`
                  }}>
                    <strong style={{ color: '#ffffff', display: 'block', marginBottom: '2px', fontSize: '12px' }}>Actionable Steps:</strong>
                    {gap.actionableSteps}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Learning Roadmap Timeline */}
      <div>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '700',
          marginBottom: '22px',
          fontFamily: 'var(--font-heading)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: '#ffffff'
        }}>
          <Map size={18} color="var(--primary)" />
          Roadmap Timeline
        </h3>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          paddingLeft: '28px',
          gap: '30px'
        }}>
          <div style={{
            position: 'absolute',
            left: '6px',
            top: '8px',
            bottom: '8px',
            width: '2px',
            background: 'linear-gradient(to bottom, var(--primary) 0%, var(--secondary) 50%, var(--accent) 100%)',
            opacity: 0.25
          }} />

          {/* 30 Days */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              left: '-28px',
              top: '3px',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: 'var(--primary)',
              boxShadow: 'var(--shadow-glow)',
              border: '3px solid var(--bg-main)'
            }} />
            <h4 style={{ fontSize: '14.5px', fontWeight: '800', color: '#c084fc', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Flame size={13} />
              Days 1 - 30: Core Fundamentals
            </h4>
            <ul style={{ margin: 0, paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {roadmap && roadmap.thirtyDays.map((item, idx) => (
                <li key={idx} style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 60 Days */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              left: '-28px',
              top: '3px',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: 'var(--secondary)',
              border: '3px solid var(--bg-main)'
            }} />
            <h4 style={{ fontSize: '14.5px', fontWeight: '800', color: '#818cf8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Star size={13} />
              Days 31 - 60: Applications & Testing
            </h4>
            <ul style={{ margin: 0, paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {roadmap && roadmap.sixtyDays.map((item, idx) => (
                <li key={idx} style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 90 Days */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              left: '-28px',
              top: '3px',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: 'var(--accent)',
              boxShadow: 'var(--shadow-accent-glow)',
              border: '3px solid var(--bg-main)'
            }} />
            <h4 style={{ fontSize: '14.5px', fontWeight: '800', color: '#22d3ee', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Target size={13} />
              Days 61 - 90: Projects & Placement
            </h4>
            <ul style={{ margin: 0, paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {roadmap && roadmap.ninetyDays.map((item, idx) => (
                <li key={idx} style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 4. Portfolio Projects */}
      <div>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '700',
          marginBottom: '18px',
          fontFamily: 'var(--font-heading)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: '#ffffff'
        }}>
          <Code2 size={18} color="var(--accent)" />
          Recommended Projects
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
          {projects && projects.map((project, idx) => (
            <div 
              key={idx} 
              style={{
                background: 'rgba(15, 23, 42, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.04)',
                borderRadius: 'var(--radius-md)',
                padding: '18px 20px',
                borderLeft: '4px solid var(--accent)',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(15, 23, 42, 0.35)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(15, 23, 42, 0.2)'; }}
            >
              <h4 style={{ fontSize: '15.5px', fontWeight: '700', color: '#ffffff', marginBottom: '8px' }}>
                {project.title}
              </h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Recommended Certifications */}
      {certifications && certifications.length > 0 && (
        <div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '700',
            marginBottom: '18px',
            fontFamily: 'var(--font-heading)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#ffffff'
          }}>
            <Award size={18} color="var(--primary)" />
            Recommended Certifications
          </h3>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {certifications.map((cert, idx) => (
              <span 
                key={idx} 
                style={{
                  background: 'rgba(167, 139, 250, 0.08)',
                  border: '1px solid rgba(167, 139, 250, 0.2)',
                  color: '#c084fc',
                  padding: '6px 14px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: '600'
                }}
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 6. Interview Preparation */}
      <div>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '700',
          marginBottom: '18px',
          fontFamily: 'var(--font-heading)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: '#ffffff'
        }}>
          <HelpCircle size={18} color="var(--accent)" />
          Interview Strategy
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {interviewTips && interviewTips.map((tip, idx) => (
            <div 
              key={idx} 
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                background: 'rgba(255, 255, 255, 0.015)',
                border: '1px solid rgba(255, 255, 255, 0.03)',
                padding: '14px 16px',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <CheckCircle size={16} color="var(--accent)" style={{ marginTop: '3px', flexShrink: 0 }} />
              <span style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.45' }}>
                {tip}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
