"use client";
import { motion, AnimatePresence} from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
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

          <Link href="/terrain" passHref>
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
              Propriétés & Séjours 
            </motion.button>
          </Link>

          <Link href="/about" passHref>
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
              À propos de nous
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

              <Link href="/properties" passHref>
                <motion.button
                  style={styles.mobileNavButton}
                  whileHover={{ 
                    background: "linear-gradient(135deg, #f8c100, #ffd54f)",
                    color: "#000"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Offres disponibles
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

      {/* Hero Carousel */}
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ 
          clickable: true,
          el: '.custom-pagination',
          bulletClass: 'custom-bullet',
          bulletActiveClass: 'custom-bullet-active'
        }}
        effect="fade"
        speed={1000}
        loop
        className="heroSwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                ...styles.slide,
                backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0,0,0,0.2)), url(${slide.image})`,
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={styles.heroContent}
              >
                <motion.h1 
                  style={styles.heroTitle}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  {slide.title}
                </motion.h1>
                <motion.p 
                  style={styles.heroSubtitle}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  {slide.subtitle}
                </motion.p>
                <Link href={slide.link} passHref>
                  <motion.button
                    style={styles.ctaButton}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 25px rgba(248, 193, 0, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {slide.buttonText}
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Pagination personnalisée */}
      <div className="custom-pagination" style={styles.pagination}></div>
      
      {/* Indicateur de défilement */}
      <motion.div 
        style={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={styles.scrollArrow}
        >
          ↓
        </motion.div>
      </motion.div>
    </header>
  );
}

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1600494448868-9fbd1ac2d9f5?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Terrains disponibles",
    subtitle: "Investissez dans l'avenir avec nos offres exclusives",
    buttonText: "Voir les terrains disponibles",
    link: "/properties?type=terrain",
  },
  {
    image:
      "https://images.unsplash.com/photo-1649972904914-5d5aaf3d1793?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Ajoutez votre propriété",
    subtitle: "Publiez votre maison, appartement ou terrain facilement",
    buttonText: "Ajouter une propriété",
    link: "/add-property",
  },
  {
    image:
      "https://images.unsplash.com/photo-1740042270024-dbf3400af7fb?q=80&w=1132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "À propos de nous",
    subtitle: "Découvrez l'histoire et la mission de Loge Connect",
    buttonText: "À propos de nous",
    link: "/about",
  },
  {
    image:
      "https://images.unsplash.com/photo-1665686304355-0b09b1e3b03c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Rejoignez notre communauté",
    subtitle: "Suivez-nous sur les réseaux sociaux et restez informés",
    buttonText: "Suivez-nous",
    link: "#social",
  },
];

const styles = {
  header: {
    position: "relative",
    height: "100vh",
    width: "100%",
    overflow: "hidden",
    color: "white",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  navContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 5%",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
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
  slide: {
    height: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: "10%",
  },
  heroContent: {
    textAlign: "left",
    maxWidth: "650px",
  },
  heroTitle: {
    fontSize: "3.5rem",
    fontWeight: "800",
    marginBottom: "1.5rem",
    lineHeight: "1.1",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
  },
  heroSubtitle: {
    fontSize: "1.3rem",
    marginBottom: "2.5rem",
    fontWeight: "400",
    opacity: 0.9,
    lineHeight: "1.6",
  },
  ctaButton: {
    background: "linear-gradient(135deg, #f8c100, #ffd54f)",
    color: "#000",
    border: "none",
    padding: "1rem 2rem",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "1rem",
    boxShadow: "0 4px 15px rgba(248, 193, 0, 0.3)",
  },
  pagination: {
    position: "absolute",
    bottom: "30px",
    left: "10%",
    display: "flex",
    gap: "12px",
    zIndex: 10,
  },
  scrollIndicator: {
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    color: "white",
    fontSize: "2rem",
    zIndex: 10,
  },
  scrollArrow: {
    cursor: "pointer",
  }
};

// Styles CSS globaux
const customStyles = `
  .custom-bullet {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .custom-bullet-active {
    background: #f8c100;
    transform: scale(1.3);
  }
  
  .heroSwiper .swiper-pagination {
    display: flex;
    justify-content: flex-start;
    padding-left: 10%;
    bottom: 80px;
  }
  
  .heroSwiper .swiper-pagination-bullet {
    margin-right: 12px;
  }
  
  /* Styles responsives */
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