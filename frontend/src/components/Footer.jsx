import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      textAlign: 'center',
      padding: '40px 24px',
      marginTop: 'auto',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '14px',
      background: 'rgba(3, 5, 12, 0.65)',
      backdropFilter: 'blur(10px)'
    }}>
      <p style={{
        fontSize: '14px',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-sans)',
        fontWeight: '500'
      }}>
        &copy; {new Date().getFullYear()} AI Career Mentor v2. All rights reserved. Empowering professional journeys using generative intelligence.
      </p>
      <div style={{
        display: 'flex',
        gap: '24px',
        fontSize: '13px'
      }}>
        {['Privacy Policy', 'Terms of Service', 'Support'].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
            style={{
              color: 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'color var(--transition-fast)',
              fontWeight: '600'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            {link}
          </a>
        ))}
      </div>
    </footer>
  );
}
