import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentText, setCurrentText] = useState('');
  const fullText = "butteredbothsides.com";
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    if (textIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + fullText[textIndex]);
        setTextIndex(prev => prev + 1);
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [textIndex]);

  return (
    <div className="App">
      <div className="construction-container">
        <div className="background-animation">
          <div className="floating-shapes">
            {[...Array(20)].map((_, i) => (
              <div key={i} className={`shape shape-${i % 4}`} style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}></div>
            ))}
          </div>
        </div>
        
        <div className="content">
          <div className="logo-container">
            <div className="logo-icon">🥪</div>
          </div>
          
          <h1 className="domain-title">
            {currentText}
            <span className="cursor">|</span>
          </h1>
          
          <div className="status-container">
            <div className="status-badge">
              <div className="status-dot"></div>
              <span>Under Construction</span>
            </div>
          </div>
          
          <p className="description">
            Something delicious is cooking up! 🍳
          </p>
          
          <div className="contact-section">
            <p className="contact-text">Get in touch:</p>
            <a 
              href="mailto:hello@butteredbothsides.com" 
              className="email-link"
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              hello@butteredbothsides.com
            </a>
          </div>
          
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          
          <div className="fun-facts">
            <div className="fact">
              <span className="fact-icon">⚡</span>
              <span>Powered by React</span>
            </div>
            <div className="fact">
              <span className="fact-icon">🎨</span>
              <span>Beautiful Design</span>
            </div>
            <div className="fact">
              <span className="fact-icon">🚀</span>
              <span>Coming Soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
