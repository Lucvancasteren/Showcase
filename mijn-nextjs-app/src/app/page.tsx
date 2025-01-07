"use client";

import { useState, useEffect } from "react";
import { Terminal } from "lucide-react";
import "./styles.css";

interface Styles {
  container: React.CSSProperties;
  statusLights: React.CSSProperties;
  lightRed: React.CSSProperties;
  lightYellow: React.CSSProperties;
  lightGreen: React.CSSProperties;
  video: React.CSSProperties;
  alwaysVisibleText: React.CSSProperties;
  searchBar: React.CSSProperties;
  searchInput: React.CSSProperties;
  menuButton: React.CSSProperties;
  menu: React.CSSProperties;
  bodyContainer: React.CSSProperties;
  newContainer: React.CSSProperties;
  textContainer: React.CSSProperties;
  text: React.CSSProperties;
  imageContainer: React.CSSProperties;
  fullWidthImageWrapper: React.CSSProperties;
  projectImage: React.CSSProperties;
  footer: React.CSSProperties;
  footerContent: React.CSSProperties;
  footerText: React.CSSProperties;
  footerLinks: React.CSSProperties;
  footerLink: React.CSSProperties;
  footerTitle: React.CSSProperties;
  availableStatus: React.CSSProperties;
  statusDot: React.CSSProperties;
  availableText: React.CSSProperties;
  lineContainer: React.CSSProperties;
  line: React.CSSProperties;
  lineGap: React.CSSProperties;
  columnContainer: React.CSSProperties;
  columnTitle: React.CSSProperties;
  columnLinks: React.CSSProperties;
  columnLink: React.CSSProperties;
  ctaButton: React.CSSProperties;
  textWithImage: React.CSSProperties;
  inlineImage: React.CSSProperties;
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [displayText, setDisplayText] = useState("Type 'help' for commands");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleLines, setVisibleLines] = useState([false, false, false, false]);
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const textContainer = document.querySelector('.text-container');
      if (textContainer) {
        const containerTop = textContainer.getBoundingClientRect().top;
        const containerHeight = textContainer.getBoundingClientRect().height;
        const windowHeight = window.innerHeight;
        
        // Bereken wanneer elke regel zichtbaar moet worden
        const lineHeight = containerHeight / 4;
        const newVisibleLines = visibleLines.map((_, index) => {
          const linePosition = containerTop + (lineHeight * index);
          return linePosition < windowHeight + 100 && linePosition > -200;
        });
        
        setVisibleLines(newVisibleLines);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initiële staat
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.classList.contains('menu-item') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    // Loading dots animatie
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(dotsInterval);
  }, []);

  useEffect(() => {
    const duration = 3750;
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min((currentStep / steps) * 100, 100);
      setLoadingProgress(Math.floor(progress));

      if (currentStep >= steps) {
        clearInterval(timer);
        setIsLoading(false);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (searchInput.toLowerCase() === "help") {
        setDisplayText(
          "Available commands:\n- home\n- about\n- projects\n- contact\n- help"
        );
      } else {
        setDisplayText(`Command '${searchInput}' not found. Type 'help' for available commands.`);
      }
      setSearchInput("");
    }
  };

  if (isLoading) {
    return (
      <div style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        backgroundImage: `
          linear-gradient(rgba(38, 38, 38, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(38, 38, 38, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        backgroundPosition: 'center center',
      }}>
        <div style={{
          width: '90%',
          maxWidth: '800px',
          position: 'relative'
        }}>
          <div style={{
            width: '100%',
            height: '8px',
            backgroundColor: '#111111',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              height: '100%',
              width: `${loadingProgress}%`,
              backgroundColor: '#666666',
              transition: 'width 0.02s linear'
            }} />
          </div>
          
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#999999',
            fontFamily: "'Bruno Ace SC', cursive",
            backgroundColor: 'black',
            padding: '0 20px',
            fontSize: 'clamp(16px, 5vw, 24px)'
          }}>
            {loadingProgress}%
          </div>
        </div>
        
        <div style={{
          color: '#999999',
          fontFamily: "'Bruno Ace SC', cursive",
          fontSize: 'clamp(16px, 5vw, 24px)',
          marginTop: '20px',
          minWidth: '150px',
          textAlign: 'center'
        }}>
          LOADING{dots}
        </div>
      </div>
    );
  }

  return (
    <>
      <div 
        className="cursor-dot" 
        style={{ 
          transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px) scale(${isHovering ? 1.5 : 1})`
        }}
      />
      <div style={styles.container}>
        <div className="statusLights">
          <div style={styles.lightRed}></div>
          <div style={styles.lightYellow}></div>
          <div style={styles.lightGreen}></div>
        </div>

      <div className="alwaysVisibleText">
        {displayText}
      </div>

      <div className="searchBar">
        <input
          type="text"
          placeholder="Enter command..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={styles.searchInput}
        />
      </div>

        <video className="video-container" autoPlay muted loop playsInline>
          <source src="/afbeeldingen/luc3.mp4" type="video/mp4" />
        </video>

        {isMenuOpen && (
          <div className="fullscreen-menu">
            <ul className="menu-list">
              <li className="menu-item">home</li>
              <li className="menu-item">about</li>
              <li className="menu-item">projects</li>
              <li className="menu-item">contact</li>
            </ul>
          </div>
        )}

        <button style={{ 
          position: "absolute",
          top: "20px",
          right: "20px",
          backgroundColor: "#111111",
          border: "none",
          width: "60px",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          zIndex: 1000,
        }} onClick={toggleMenu}>
          <Terminal size={40} color="white" />
        </button>
      </div>
      
      <div style={styles.newContainer}>
        <div style={styles.textContainer} className="text-container">
          <p
            className={`fade-in-text gradient-text ${visibleLines[0] ? 'visible' : ''}`}
            style={{
              ...styles.text,
              transitionDelay: '0s',
              transform: visibleLines[0] ? 'translateX(0)' : 'translateX(-50px)',
              opacity: visibleLines[0] ? 1 : 0,
            }}
          >
            Luc van Casteren is a dutch,
          </p>
          
          <p
            className={`fade-in-text gradient-text ${visibleLines[1] ? 'visible' : ''}`}
            style={{
              ...styles.text,
              transitionDelay: '0.15s',
              transform: visibleLines[1] ? 'translateX(0)' : 'translateX(50px)',
              opacity: visibleLines[1] ? 1 : 0,
            }}
          >
            Full-stack Developer & UX Designer
          </p>
          
          <p
            className={`fade-in-text gradient-text ${visibleLines[2] ? 'visible' : ''}`}
            style={{
              ...styles.text,
              transitionDelay: '0.3s',
              transform: visibleLines[2] ? 'translateX(0)' : 'translateX(-50px)',
              opacity: visibleLines[2] ? 1 : 0,
            }}
          >
            Specialized in React & Next.js
          </p>
          
          <button 
            style={styles.ctaButton}
            className="cta-button"
            onClick={() => window.location.href = '/contact'}
          >
            Get in touch
          </button>
          
          <div style={styles.imageContainer}>
          </div>
        </div>
      </div>

      <footer style={styles.footer}>
        <div style={styles.footerContent} className="footer-content-mobile">
          <h2 style={styles.footerTitle} className="underline-animation footer-title-mobile">
            {"LET'S\nCHAT"}
          </h2>
          <div style={styles.availableStatus}>
            <div className="status-dot"></div>
            <span style={styles.availableText}>Available</span>
          </div>
          <div style={styles.lineContainer}>
            <div style={styles.columnContainer}>
              <div style={styles.line}></div>
              <h3 style={styles.columnTitle}>Social</h3>
              <div style={styles.columnLinks}>
                <a href="#" style={styles.columnLink}>Instagram</a>
                <a href="#" style={styles.columnLink}>LinkedIn</a>
              </div>
            </div>
            <div style={styles.lineGap}></div>
            <div style={styles.columnContainer}>
              <div style={styles.line}></div>
              <h3 style={styles.columnTitle}>Contact</h3>
              <div style={styles.columnLinks}>
                <a href="#" style={styles.columnLink}>Phone</a>
                <a href="#" style={styles.columnLink}>Email</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

const styles: Styles = {
  container: {
    position: "relative",
    height: "100vh",
    width: "100vw",
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  statusLights: {
    position: "absolute",
    top: "80px",
    left: "15rem",
    display: "flex",
    gap: "10px",
    zIndex: 50,
  },
  lightRed: {
    width: "15px",
    height: "15px",
    backgroundColor: "#FF5F57",
    borderRadius: "50%",
  },
  lightYellow: {
    width: "15px",
    height: "15px",
    backgroundColor: "#FFBD2E",
    borderRadius: "50%",
  },
  lightGreen: {
    width: "15px",
    height: "15px",
    backgroundColor: "#28C840",
    borderRadius: "50%",
  },
  video: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "180%",
    objectFit: "contain",
  },
  alwaysVisibleText: {
    position: "absolute",
    top: "100px",
    left: "15rem",
    color: "#4CAF50",
    fontSize: "18px",
    fontFamily: "monospace",
    zIndex: 21,
  },
  searchBar: {
    position: "absolute",
    top: "140px",
    left: "15rem",
    backgroundColor: "#000",
    border: "2px solid #4CAF50",
    padding: "5px 10px",
    zIndex: 20,
    width: "60%",
  },
  searchInput: {
    background: "#000",
    color: "#262626",
    border: "none",
    outline: "none",
    fontSize: "16px",
    fontFamily: "monospace",
    width: "100%",
  },
  menuButton: {
    position: "absolute",
    top: "20px",
    right: "20px",
    backgroundColor: "#111111",
    border: "none",
    width: "60px",
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    zIndex: 10,
  },
  menu: {
    position: "absolute",
    top: "100px",
    right: "20px",
    backgroundColor: "black",
    border: "2px solid #4CAF50",
    color: "#4CAF50",
    padding: "10px 20px",
    zIndex: 9,
    width: "300px",
  },
  bodyContainer: {
    position: "relative",
    width: "100%",
    marginTop: "100vh",
    zIndex: 20,
  },
  newContainer: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "black",
    position: "relative",
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `
      linear-gradient(rgba(38, 38, 38, 0.3) 1px, transparent 1px),
      linear-gradient(90deg, rgba(38, 38, 38, 0.3) 1px, transparent 1px)
    `,
    backgroundSize: '50px 50px',
    backgroundPosition: 'center center',
  },
  textContainer: {
    padding: '2rem',
    marginTop: '30rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    alignItems: 'center',
    width: '100%',
    maxWidth: '800px'
  },
  text: {
    color: '#292929',
    fontSize: '2rem',
    fontFamily: "'Bruno Ace SC', cursive",
    textAlign: 'center',
    width: '100%'
  },
  imageContainer: {
    width: '100vw',
    position: 'relative',
    left: '0',
    marginTop: '14rem',
    overflow: 'hidden',
  },
  fullWidthImageWrapper: {
    width: '100%',
    height: 'auto',
    display: 'flex',
  },
  projectImage: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
  footer: {
    width: '100%',
    backgroundColor: 'black',
    borderTop: '1px solid #262626',
    padding: '2rem 0',
    marginTop: 'auto',
    zIndex: 2,
  },
  footerContent: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1rem',
    position: 'relative',
    left: '15rem',
    paddingRight: '2rem',
  },
  footerText: {
    color: '#4CAF50',
    fontFamily: 'monospace',
    margin: 0,
  },
  footerLinks: {
    display: 'flex',
    gap: '2rem',
  },
  footerLink: {
    color: '#4CAF50',
    textDecoration: 'none',
    fontFamily: 'monospace',
    transition: 'opacity 0.2s',
    },
  footerTitle: {
    color: '#262626',
    fontFamily: "'Bruno Ace SC', cursive",
    fontSize: '7rem',
    margin: '0 0 1rem 0',
    textAlign: 'left',
    letterSpacing: '0.05em',
  },
  availableStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  statusDot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#28C840',
    borderRadius: '50%',
  },
  availableText: {
    color: '#262626',
    fontFamily: 'monospace',
    fontSize: '1rem',
  },
  lineContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: '2rem',
  },
  line: {
    height: '1px',
    backgroundColor: '#262626',
    width: '100%',
    marginBottom: '1rem',
  },
  lineGap: {
    width: '50px',
  },
  columnContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  columnTitle: {
    color: '#262626',
    fontFamily: 'monospace',
    fontSize: '1.2rem',
    margin: '0.2rem 0',
  },
  columnLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  columnLink: {
    color: '#262626',
    textDecoration: 'none',
    fontFamily: 'monospace',
    fontSize: '1rem',
    transition: 'opacity 0.2s',
    cursor: 'pointer',
  },
  ctaButton: {
    backgroundColor: 'transparent',
    border: '1px solid #666666',
    color: '#666666',
    padding: '1rem 2rem',
    fontSize: '1.2rem',
    fontFamily: "'Bruno Ace SC', cursive",
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '2rem',
    position: 'relative',
    overflow: 'hidden',
  },
  textWithImage: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.2rem',
    width: '100%',
    justifyContent: 'flex-start',
    paddingLeft: '10%'
  },
  inlineImage: {
    width: '75px',
    height: '75px',
    objectFit: 'cover',
    borderRadius: '50%'
  },
}
  


