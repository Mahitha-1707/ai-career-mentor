import React from 'react';
import { Compass, Sparkles, Globe } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="glass" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 32px',
      margin: '24px 24px 0 24px',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border-card)',
      background: 'rgba(15, 23, 42, 0.45)',
      backdropFilter: 'blur(16px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
          borderRadius: '10px',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-glow)',
        }}>
          <Compass size={22} color="#03050c" style={{ animation: 'pulse-light 2s infinite ease-in-out' }} />
        </div>
        <div>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '20px',
            fontWeight: '800',
            letterSpacing: '-0.03em',
            background: 'linear-gradient(to right, #ffffff, var(--text-secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            AI Career Mentor
            <Sparkles size={14} color="var(--accent)" />
          </span>
          <span style={{
            fontSize: '11px',
            color: 'var(--text-muted)',
            display: 'block',
            marginTop: '-2px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.08em'
          }}>
            Powered by Gemini 2.5 Flash
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all var(--transition-fast)',
            padding: '8px 16px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            background: 'rgba(255, 255, 255, 0.02)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.borderColor = 'var(--primary)';
            e.currentTarget.style.background = 'rgba(167, 139, 250, 0.05)';
            e.currentTarget.style.boxShadow = '0 0 15px rgba(167, 139, 250, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <Globe size={15} />
          GitHub
        </a>
      </div>
    </nav>
  );
}
