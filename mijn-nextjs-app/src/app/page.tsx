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
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [displayText, setDisplayText] = useState("Type 'help' for commands");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleLines, setVisibleLines] = useState([false, false, false, false]);

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

  return (
    <>
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
          <source src="/afbeeldingen/luc.mp4" type="video/mp4" />
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

        <button className="menuButton" onClick={toggleMenu}>
          <Terminal size={40} color="black" />
        </button>
      </div>
      
      <div style={styles.newContainer}>
        <div style={styles.textContainer} className="text-container">
          {[
            "Welkom in mijn digitale wereld",
            "Full-stack Developer & UX Designer",
            "Gespecialiseerd in React & Next.js",
          ].map((text, index) => (
            <p
              key={index}
              className={`fade-in-text ${visibleLines[index] ? 'visible' : ''}`}
              style={{
                ...styles.text,
                transitionDelay: `${index * 0.15}s`
              }}
            >
              {text}
            </p>
          ))}
          
          <div style={styles.imageContainer}>
          </div>
        </div>
      </div>

      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <h2 style={styles.footerTitle}>Let's Chat!</h2>
          <p style={styles.footerText}>&copy; {new Date().getFullYear()} - Gemaakt met ❤️</p>
          <div style={styles.footerLinks}>
            <a href="https://github.com/yourusername" style={styles.footerLink}>GitHub</a>
            <a href="https://linkedin.com/in/yourusername" style={styles.footerLink}>LinkedIn</a>
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
    color: "#4CAF50",
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
    backgroundColor: "#4CAF50",
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
    alignItems: 'center'
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
    color: '#4CAF50',
    fontSize: '2rem',
    fontFamily: 'monospace',
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
    borderTop: '1px solid #4CAF50',
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
    color: '#4CAF50',
    fontFamily: "'Bruno Ace SC', cursive",
    fontSize: '4rem',
    margin: '0 0 1rem 0',
    textAlign: 'left',
    letterSpacing: '0.05em',
  },
  }
  


