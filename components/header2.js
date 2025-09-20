"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header2() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header style={styles.header}>
      {/* Navbar avec effet de fond au scroll */}
      <motion.div 
        style={{
          ...styles.navContainer,
          background: isScrolled ? "rgba(0, 0, 0, 0.43)" : "transparent",
          backdropFilter: isScrolled ? "blur(10px)" : "none",
          boxShadow: isScrolled ? "0 4px 20px rgba(0, 0, 0, 0.1)" : "none"
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Logo avec animation au hover */}
        <motion.div 
          style={styles.logoWrapper}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link href="/" style={styles.logoLink}>
            <motion.div 
              style={styles.logoCircle}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <img src="/favicon.png" alt="Logo" style={styles.logoImage} />
            </motion.div>
          </Link>
        </motion.div>

        {/* Menu mobile */}
        <motion.button 
          style={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.95 }}
        >
          <span style={isMobileMenuOpen ? styles.mobileMenuIconOpen : styles.mobileMenuIcon}></span>
          <span style={isMobileMenuOpen ? styles.mobileMenuIconOpen : styles.mobileMenuIcon}></span>
          <span style={isMobileMenuOpen ? styles.mobileMenuIconOpen : styles.mobileMenuIcon}></span>
        </motion.button>

        {/* Navigation avec animations - Version Desktop */}
        <nav style={styles.nav}>
          <Link href="/" passHref>
            <motion.button
              style={styles.navButton}
              whileHover={{ 
                scale: 1.05,
                background: "linear-gradient(135deg, #f8c100, #ffd54f)",
                color: "#000"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Accueil
            </motion.button>
          </Link>

          <Link href="/sell" passHref>
            <motion.button
              style={styles.ctaNavButton}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(248, 193, 0, 0.6)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Vendre ou Faire Louer
            </motion.button>
          </Link>
        </nav>

        {/* Menu mobile - Version mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav 
              style={styles.mobileNav}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link href="/" passHref>
                <motion.button
                  style={styles.mobileNavButton}
                  whileHover={{ 
                    background: "linear-gradient(135deg, #f8c100, #ffd54f)",
                    color: "#000"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Accueil
                </motion.button>
              </Link>

              <Link href="/terrain" passHref>
                <motion.button
                  style={styles.mobileNavButton}
                  whileHover={{ 
                    background: "linear-gradient(135deg, #f8c100, #ffd54f)",
                    color: "#000"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Propriétés & Séjours
                </motion.button>
              </Link>

              <Link href="/about" passHref>
                <motion.button
                  style={styles.mobileNavButton}
                  whileHover={{ 
                    background: "linear-gradient(135deg, #f8c100, #ffd54f)",
                    color: "#000"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  À propos de nous
                </motion.button>
              </Link>

              <Link href="/sell" passHref>
                <motion.button
                  style={styles.mobileCtaButton}
                  whileHover={{ 
                    boxShadow: "0 10px 25px rgba(248, 193, 0, 0.6)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Vendre ou Faire Louer
                </motion.button>
              </Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}

const styles = {
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    zIndex: 1000,
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  navContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 5%",
    transition: "all 0.3s ease",
    
  },
  logoWrapper: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    zIndex: 1001,
  },
  logoLink: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
    logoCircle: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  logoImage: {
    width: "150px",
    height: "auto",
    objectFit: "contain",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },
  navButton: {
    background: "transparent",
    color: "white",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    padding: "0.7rem 1.2rem",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "all 0.3s ease",
  },
  ctaNavButton: {
    background: "linear-gradient(135deg, #f8c100, #ffd54f)",
    color: "#000",
    border: "none",
    padding: "0.8rem 1.5rem",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(248, 193, 0, 0.3)",
  },
  mobileMenuButton: {
    display: "none",
    flexDirection: "column",
    justifyContent: "space-around",
    width: "2rem",
    height: "2rem",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 0,
    zIndex: 1001,
  },
  mobileMenuIcon: {
    width: "2rem",
    height: "0.25rem",
    background: "white",
    borderRadius: "10px",
    transition: "all 0.3s linear",
    position: "relative",
    transformOrigin: "1px",
  },
  mobileMenuIconOpen: {
    width: "2rem",
    height: "0.25rem",
    background: "white",
    borderRadius: "10px",
    transition: "all 0.3s linear",
    position: "relative",
    transformOrigin: "1px",
  },
  mobileNav: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    background: "rgba(0, 0, 0, 0.95)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "2rem",
    zIndex: 1000,
  },
  mobileNavButton: {
    background: "transparent",
    color: "white",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    padding: "1rem 2rem",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "1.1rem",
    width: "80%",
    maxWidth: "300px",
  },
  mobileCtaButton: {
    background: "linear-gradient(135deg, #f8c100, #ffd54f)",
    color: "#000",
    border: "none",
    padding: "1rem 2rem",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "1.1rem",
    width: "80%",
    maxWidth: "300px",
    boxShadow: "0 4px 15px rgba(248, 193, 0, 0.3)",
  },
};

// Styles CSS globaux pour le menu hamburger
const customStyles = `
  @media (max-width: 968px) {
    .nav {
      display: none !important;
    }
    
    .mobile-menu-button {
      display: flex !important;
    }
  }
  
  @media (min-width: 969px) {
    .mobile-nav {
      display: none !important;
    }
  }
  
  /* Animation du menu hamburger */
  .mobile-menu-button span:nth-child(1) {
    transform: rotate(0);
  }
  
  .mobile-menu-button span:nth-child(2) {
    opacity: 1;
  }
  
  .mobile-menu-button span:nth-child(3) {
    transform: rotate(0);
  }
  
  .mobile-menu-button[aria-expanded="true"] span:nth-child(1) {
    transform: rotate(45deg);
  }
  
  .mobile-menu-button[aria-expanded="true"] span:nth-child(2) {
    opacity: 0;
  }
  
  .mobile-menu-button[aria-expanded="true"] span:nth-child(3) {
    transform: rotate(-45deg);
  }
`;

// Injection des styles CSS
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = customStyles;
  document.head.appendChild(styleSheet);
}