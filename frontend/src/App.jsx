import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CareerForm from './components/CareerForm';
import ResultCard from './components/ResultCard';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import { getCareerAdvice } from './services/api';
import './App.css';

const LOADING_STATUSES = [
  "Scanning educational credentials...",
  "Analyzing profile alignment against standard roles...",
  "Consulting Gemini Career Mentor Engine...",
  "Calculating match scores and parsing skill gaps...",
  "Synthesizing your custom 90-day learning roadmap..."
];

function App() {
  const [adviceResponse, setAdviceResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(0);

  useEffect(() => {
    let interval;
    if (loading) {
      setLoadingIndex(0);
      interval = setInterval(() => {
        setLoadingIndex((prev) => (prev < LOADING_STATUSES.length - 1 ? prev + 1 : prev));
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setAdviceResponse(null); // Clear previous results to show loading state
    
    try {
      const response = await getCareerAdvice(formData);
      setAdviceResponse(response);
    } catch (err) {
      console.error('Error fetching career advice:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      
      <main style={{ padding: '0 0 64px 0' }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '850px',
          margin: '56px auto 32px auto',
          padding: '0 24px'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(167, 139, 250, 0.08)',
            border: '1px solid rgba(167, 139, 250, 0.2)',
            borderRadius: '30px',
            padding: '6px 16px',
            marginBottom: '20px',
            fontSize: '12px',
            fontWeight: '600',
            color: 'var(--primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            ✨ Version 2.0: Enhanced AI Logic & Insights
          </div>
          
          <h1 style={{
            fontSize: '48px',
            fontWeight: '900',
            fontFamily: 'var(--font-heading)',
            background: 'linear-gradient(135deg, #ffffff 40%, var(--primary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.04em',
            marginBottom: '18px',
            lineHeight: '1.15'
          }}>
            Accelerate Your Professional Growth
          </h1>
          <p style={{
            fontSize: '18px',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
            maxWidth: '650px',
            margin: '0 auto'
          }}>
            Map credentials, capabilities, and goals against real-time industry roles to retrieve match rankings, target projects, and direct skill-gap tutorials.
          </p>
        </div>

        <div className="grid-container">
          <CareerForm onSubmit={handleFormSubmit} loading={loading} />
          
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <ResultCard 
              response={adviceResponse} 
              loading={loading}
              loadingStatus={LOADING_STATUSES[loadingIndex]}
            />
          </div>
        </div>
      </main>

      <Footer />
      <ChatBot />
    </>
  );
}

export default App;
