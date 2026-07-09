import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, ChevronDown, User, Bot, AlertCircle } from 'lucide-react';
import { sendChatMessage } from '../services/api';

// Starter questions to guide the user
const STARTER_CHIPS = [
  "How do I prepare for an interview?",
  "What portfolio projects should I build?",
  "How do I level up my React skills?",
  "Tell me about DevOps & Cloud tracks."
];

// Helper to safely parse basic markdown elements to React components
function formatMarkdown(text) {
  if (!text) return "";
  const lines = text.split("\n");
  
  return lines.map((line, idx) => {
    let cleanLine = line;
    
    // Headings
    if (cleanLine.startsWith("### ")) {
      return (
        <h4 key={idx} style={{ 
          fontSize: '14.5px', 
          fontWeight: '800', 
          marginTop: '12px', 
          marginBottom: '6px', 
          fontFamily: 'var(--font-heading)',
          color: '#ffffff' 
        }}>
          {parseInline(cleanLine.substring(4))}
        </h4>
      );
    }
    if (cleanLine.startsWith("## ")) {
      return (
        <h3 key={idx} style={{ 
          fontSize: '16px', 
          fontWeight: '800', 
          marginTop: '14px', 
          marginBottom: '8px', 
          fontFamily: 'var(--font-heading)',
          color: '#ffffff' 
        }}>
          {parseInline(cleanLine.substring(3))}
        </h3>
      );
    }
    
    // Bullet lists
    if (cleanLine.startsWith("- ") || cleanLine.startsWith("* ")) {
      return (
        <li key={idx} style={{ 
          marginLeft: '14px', 
          marginBottom: '4px', 
          fontSize: '13px', 
          color: 'var(--text-secondary)',
          lineHeight: '1.45' 
        }}>
          {parseInline(cleanLine.substring(2))}
        </li>
      );
    }
    
    // Numbered lists
    const numMatch = cleanLine.match(/^(\d+)\.\s(.*)/);
    if (numMatch) {
      return (
        <div key={idx} style={{ 
          display: 'flex', 
          gap: '6px', 
          marginBottom: '6px', 
          fontSize: '13px', 
          color: 'var(--text-secondary)',
          lineHeight: '1.45' 
        }}>
          <span style={{ fontWeight: '700', color: 'var(--primary)' }}>{numMatch[1]}.</span>
          <span>{parseInline(numMatch[2])}</span>
        </div>
      );
    }

    if (cleanLine.trim() === "") {
      return <div key={idx} style={{ height: '6px' }} />;
    }

    return (
      <p key={idx} style={{ 
        fontSize: '13px', 
        lineHeight: '1.5', 
        marginBottom: '8px', 
        color: 'var(--text-secondary)' 
      }}>
        {parseInline(cleanLine)}
      </p>
    );
  });
}

function parseInline(text) {
  const parts = [];
  let remaining = text;
  
  // Match bold (**text**) or inline code (`code`)
  const regex = /(\*\*.*?\*\*|`.*?`)/;
  
  while (remaining) {
    const match = remaining.match(regex);
    if (!match) {
      parts.push(remaining);
      break;
    }
    
    const index = match.index;
    if (index > 0) {
      parts.push(remaining.substring(0, index));
    }
    
    const matchText = match[0];
    if (matchText.startsWith("**") && matchText.endsWith("**")) {
      parts.push(
        <strong key={parts.length} style={{ color: '#ffffff', fontWeight: '700' }}>
          {matchText.substring(2, matchText.length - 2)}
        </strong>
      );
    } else if (matchText.startsWith("`") && matchText.endsWith("`")) {
      parts.push(
        <code key={parts.length} style={{ 
          background: 'rgba(255,255,255,0.08)', 
          padding: '2px 5px', 
          borderRadius: '4px', 
          fontFamily: 'monospace', 
          fontSize: '11.5px', 
          color: 'var(--accent)',
          border: '1px solid rgba(255,255,255,0.03)'
        }}>
          {matchText.substring(1, matchText.length - 1)}
        </code>
      );
    }
    
    remaining = remaining.substring(index + matchText.length);
  }
  
  return parts;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: "Hello! I am your AI Career Mentor. Ask me any follow-up questions about roadmaps, recommended projects, or technical interview strategies!"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend) => {
    const query = textToSend || input.trim();
    if (!query) return;

    // Add user message
    const userMsg = { role: 'user', text: query };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      // Map message history to format expected by backend
      const history = messages.map(m => ({
        role: m.role,
        text: m.text
      }));
      
      const responseText = await sendChatMessage(history, query);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (err) {
      console.error("Chat message error:", err);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "I experienced a connection issue, but here is some default advice: make sure to document your roadmap items and work through them daily!" 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000 }}>
      {/* Collapsed Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-glow), 0 8px 30px rgba(0, 0, 0, 0.4)',
            transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
            position: 'relative'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08) translateY(-2px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1) translateY(0)'; }}
          className="pulse-button"
        >
          <MessageSquare size={26} />
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#10b981',
            border: '2px solid var(--bg-main)'
          }} />
        </button>
      )}

      {/* Expanded Chat Dialog */}
      {isOpen && (
        <div 
          className="glass animate-fade-in-up" 
          style={{
            width: '380px',
            height: '530px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            background: 'rgba(11, 16, 30, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6), inset 0 1px 0 0 rgba(255,255,255,0.05)',
            borderRadius: 'var(--radius-lg)'
          }}
        >
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            background: 'linear-gradient(90deg, rgba(167, 139, 250, 0.1) 0%, rgba(34, 211, 238, 0.1) 100%)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(167, 139, 250, 0.12)',
                border: '1px solid rgba(167, 139, 250, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)'
              }}>
                <Sparkles size={16} />
              </div>
              <div>
                <h3 style={{ fontSize: '14.5px', fontWeight: '800', fontFamily: 'var(--font-heading)', color: '#ffffff' }}>
                  AI Career Mentor
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Online & Ready</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
            >
              <ChevronDown size={20} />
            </button>
          </div>

          {/* Messages Panel */}
          <div style={{
            flexGrow: 1,
            padding: '20px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {messages.map((msg, index) => {
              const isUser = msg.role === 'user';
              return (
                <div 
                  key={index}
                  style={{
                    display: 'flex',
                    alignSelf: isUser ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    gap: '8px',
                    flexDirection: isUser ? 'row-reverse' : 'row'
                  }}
                >
                  {/* Icon Avatar */}
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: isUser ? 'rgba(34, 211, 238, 0.1)' : 'rgba(167, 139, 250, 0.1)',
                    border: `1px solid ${isUser ? 'rgba(34, 211, 238, 0.2)' : 'rgba(167, 139, 250, 0.2)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isUser ? 'var(--accent)' : 'var(--primary)',
                    flexShrink: 0
                  }}>
                    {isUser ? <User size={13} /> : <Bot size={13} />}
                  </div>

                  {/* Text Bubble */}
                  <div style={{
                    background: isUser 
                      ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)' 
                      : 'rgba(30, 41, 59, 0.4)',
                    border: `1px solid ${isUser ? 'rgba(167, 139, 250, 0.25)' : 'rgba(255, 255, 255, 0.04)'}`,
                    borderRadius: isUser 
                      ? '16px 16px 4px 16px' 
                      : '16px 16px 16px 4px',
                    padding: '12px 14px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    {isUser ? (
                      <p style={{ fontSize: '13px', margin: 0, color: '#ffffff', lineHeight: '1.45' }}>{msg.text}</p>
                    ) : (
                      formatMarkdown(msg.text)
                    )}
                  </div>
                </div>
              );
            })}

            {/* Loading Indicator */}
            {loading && (
              <div style={{ display: 'flex', alignSelf: 'flex-start', gap: '8px', maxWidth: '85%' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'rgba(167, 139, 250, 0.1)',
                  border: '1px solid rgba(167, 139, 250, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  flexShrink: 0
                }}>
                  <Bot size={13} />
                </div>
                <div style={{
                  background: 'rgba(30, 41, 59, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                  borderRadius: '16px 16px 16px 4px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span className="dot-blink" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }} />
                  <span className="dot-blink" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', animationDelay: '0.2s' }} />
                  <span className="dot-blink" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', animationDelay: '0.4s' }} />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick-Prompt Starter Chips */}
          {messages.length === 1 && !loading && (
            <div style={{
              padding: '0 20px 10px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Suggested Topics:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {STARTER_CHIPS.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(chip)}
                    style={{
                      background: 'rgba(167, 139, 250, 0.05)',
                      border: '1px solid rgba(167, 139, 250, 0.15)',
                      borderRadius: '12px',
                      padding: '4px 10px',
                      fontSize: '11.5px',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(167, 139, 250, 0.15)';
                      e.currentTarget.style.borderColor = 'rgba(167, 139, 250, 0.35)';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(167, 139, 250, 0.05)';
                      e.currentTarget.style.borderColor = 'rgba(167, 139, 250, 0.15)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Panel */}
          <div style={{
            padding: '16px 20px',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            gap: '10px',
            alignItems: 'center'
          }}>
            <input
              type="text"
              placeholder="Ask your mentor..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              style={{
                flexGrow: 1,
                background: 'rgba(15, 23, 42, 0.4)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 14px',
                fontSize: '13px',
                color: '#ffffff',
                outline: 'none',
                transition: 'border-color var(--transition-fast)'
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                background: input.trim() && !loading 
                  ? 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)' 
                  : 'rgba(255, 255, 255, 0.03)',
                border: input.trim() && !loading 
                  ? 'none' 
                  : '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: input.trim() && !loading ? '#ffffff' : 'var(--text-muted)',
                cursor: input.trim() && !loading ? 'pointer' : 'default',
                transition: 'transform var(--transition-fast)'
              }}
              onMouseEnter={(e) => { if (input.trim() && !loading) e.currentTarget.style.transform = 'scale(1.05)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
