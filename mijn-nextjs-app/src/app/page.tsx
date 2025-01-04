"use client";

import { useState, CSSProperties } from "react";
import { useState, useEffect } from "react";
import { Terminal } from "lucide-react";
import "./styles.css";

@@ -8,6 +8,16 @@ export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [displayText, setDisplayText] = useState("[bject Object]undefined");
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
@@ -52,6 +62,8 @@ export default function Home() {
        <source src="/afbeeldingen/luc.mp4" type="video/mp4" />
      </video>



      {isMenuOpen && (
        <div className="fullscreen-menu">
          <ul className="menu-list">
@@ -146,7 +158,7 @@ const styles = {
    width: "100%",
  },
  menuButton: {
    position: "fixed",
    position: "absolute",
    top: "20px",
    right: "20px",
    backgroundColor: "#4CAF50",
@@ -157,7 +169,7 @@ const styles = {
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    zIndex: 1000,
    zIndex: 10,
  },
  menu: {
    position: "absolute",
@@ -170,5 +182,11 @@ const styles = {
    zIndex: 9,
    width: "300px",
  },
  bodyContainer: {
    position: "relative",
    width: "100%",
    marginTop: "100vh",
    zIndex: 20,
  },
};

