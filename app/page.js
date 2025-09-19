"use client";

import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Toutes');
  const [selectedType, setSelectedType] = useState('Tous');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    acceptTerms: false
  });

  // Données des propriétés avec types ajoutés
  const properties = [
    {
      id: 1,
      title: "Appartement Lumineux",
      location: "Paris 16ème",
      price: "750 000 €",
      image: "/img/appartement-paris.jpg",
      description: "Magnifique appartement de 85m² avec terrasse et vue sur la tour Eiffel.",
      type: "Appartement",
    },
    {
      id: 2,
      title: "Maison de Ville",
      location: "Lyon, Croix-Rousse",
      price: "520 000 €",
      image: "/img/maison-lyon.jpg",
      description: "Authentique maison de ville rénovée avec cour intérieure et garage.",
      type: "Maison",
    },
    {
      id: 3,
      title: "Villa Contemporaine",
      location: "Bordeaux",
      price: "1 250 000 €",
      image: "/img/villa-bordeaux.jpg",
      description: "Villa moderne avec piscine à débordement et vue sur les vignobles.",
      type: "Villa",
    },
    {
      id: 4,
      title: "Loft Industriel",
      location: "Marseille",
      price: "420 000 €",
      image: "/img/loft-marseille.jpg",
      description: "Ancienne usine réhabilitée en loft de caractère avec hauteur sous plafond exceptionnelle.",
      type: "Loft",
    },
    {
      id: 5,
      title: "Studio Moderne",
      location: "Paris 10ème",
      price: "320 000 €",
      image: "/img/studio-paris.jpg",
      description: "Studio entièrement rénové proche du Canal Saint-Martin.",
      type: "Studio",
    },
    {
      id: 6,
      title: "Penthouse Luxueux",
      location: "Lyon",
      price: "1 500 000 €",
      image: "/img/penthouse-lyon.jpg",
      description: "Penthouse exceptionnel avec terrasse panoramique et jacuzzi.",
      type: "Appartement",
    }
  ];

  // Villes et types uniques pour les filtres
  const cities = ['Toutes', ...new Set(properties.map(property => property.city))];
  const types = ['Tous', ...new Set(properties.map(property => property.type))];

  // Filtrer les propriétés selon les sélections
  const filteredProperties = properties.filter(property => {
    const cityMatch = selectedCity === 'Toutes' || property.city === selectedCity;
    const typeMatch = selectedType === 'Tous' || property.type === selectedType;
    return cityMatch && typeMatch;
  });

  const openPopup = (property) => {
    setSelectedProperty(property);
    setShowPopup(true);
    document.body.style.overflow = 'hidden'; // Empêche le défilement
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedProperty(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
      acceptTerms: false
    });
    document.body.style.overflow = 'unset'; // Réactive le défilement
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous pourriez envoyer les données du formulaire
    console.log('Données du formulaire:', formData);
    alert('Votre message a été envoyé avec succès !');
    closePopup();
  };

  return (
    <div>
      <Head>
        <title>Agence Immobilière LogeConnect | Trouvez votre maison de rêve </title>
        <meta name="description" content="Découvrez nos différentes offres exclusives" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.navContainer}>
          <div style={styles.logo}>Loge Connect</div>
          <nav style={styles.nav}>
            <a href="/" style={styles.navLink}>Accueil</a>
            <a href="#contact" style={styles.navLink}>A propos de nous</a>
            <button style={styles.sellButton}>Vendre ou Faire Louer</button>
          </nav>
        </div>
        
        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>Votre partenaire pour l'immobilier au Congo-Brazzaville</h1>
          <p style={styles.heroSubtitle}>Découvrez nos différentes offres exclusives</p>
          <button style={styles.ctaButton}>Explorer nos offres </button>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.sectionTitleContainer}>
          <h2 style={styles.sectionTitle}>Nos propriétés sélectionnées</h2>
          <p style={styles.sectionSubtitle}>Découvrez nos biens immobiliers exclusifs</p>
        </div>

        {/* Filtres */}
        <div style={styles.filtersContainer}>
          <div style={styles.filterGroup}>
            <label htmlFor="city-filter" style={styles.filterLabel}>Filtrer par ville:</label>
            <select 
              id="city-filter"
              value={selectedCity} 
              onChange={(e) => setSelectedCity(e.target.value)}
              style={styles.filterSelect}
            >
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          
          <div style={styles.filterGroup}>
            <label htmlFor="type-filter" style={styles.filterLabel}>Filtrer par type:</label>
            <select 
              id="type-filter"
              value={selectedType} 
              onChange={(e) => setSelectedType(e.target.value)}
              style={styles.filterSelect}
            >
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={styles.propertiesGrid}>
          {filteredProperties.map(property => (
            <div key={property.id} style={styles.propertyCard}>
              <div style={styles.cardImageContainer}>
                <div style={{...styles.cardImage, backgroundImage: `url(${property.image})`}}>
                  <div style={styles.cardPrice}>{property.price}</div>
                  <div style={styles.propertyTypeBadge}>{property.type}</div>
                </div>
              </div>
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{property.title}</h3>
                <p style={styles.cardLocation}>{property.location}</p>
                <p style={styles.cardDescription}>{property.description}</p>
                <button 
                  style={styles.learnMoreButton}
                  onClick={() => openPopup(property)}
                >
                  En savoir plus
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div style={styles.noResults}>
            <p>Aucune propriété ne correspond à vos critères de recherche.</p>
          </div>
        )}
      </main>

      {/* Popup de contact */}
      {showPopup && selectedProperty && (
        <div style={styles.popupOverlay} onClick={closePopup}>
          <div style={styles.popup} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeButton} onClick={closePopup}>×</button>
            <h2 style={styles.popupTitle}> Veuillez remplir la formulaire ci-dessous pour une consultation </h2>
            
            <form onSubmit={handleSubmit} style={styles.contactForm}>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label htmlFor="firstName" style={styles.formLabel}>Prénom *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    style={styles.formInput}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label htmlFor="lastName" style={styles.formLabel}>Nom *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    style={styles.formInput}
                  />
                </div>
              </div>
              
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label htmlFor="email" style={styles.formLabel}>Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={styles.formInput}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label htmlFor="phone" style={styles.formLabel}>Téléphone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={styles.formInput}
                  />
                </div>
              </div>
              
              <div style={styles.formGroup}>
                <label htmlFor="message" style={styles.formLabel}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  style={styles.formTextarea}
                ></textarea>
              </div>
              
              <div style={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  id="acceptTerms"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  required
                  style={styles.checkboxInput}
                />
                <label htmlFor="acceptTerms" style={styles.checkboxLabel}>
                  J'accepte le traitement de mes données personnelles
                </label>
              </div>
              
              <div style={styles.formActions}>
                <button type="submit" style={styles.submitButton}>Envoyer</button>
                <button type="button" onClick={closePopup} style={styles.cancelButton}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer style={styles.footer}>
        <p style={styles.footerText}>© 2023 Prestige Immobilier. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

const styles = {
  // Styles généraux
  body: {
    margin: 0,
    fontFamily: "'Montserrat', sans-serif",
    color: '#333',
    lineHeight: 1.6,
  },
  
  // Header
  header: {
    background: 'linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1700&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") center/cover no-repeat',
    color: 'white',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 5%',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      padding: '1rem',
    },
  },
  
  logo: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#fff',
  },
  
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    '@media (max-width: 768px)': {
      marginTop: '1rem',
      gap: '1rem',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
  },
  
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.3s ease',
    ':hover': {
      color: '#f8c100',
    },
  },
  
  sellButton: {
    backgroundColor: '#f8c100',
    color: '#333',
    border: 'none',
    padding: '0.8rem 1.5rem',
    borderRadius: '30px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#e6b400',
      transform: 'translateY(-2px)',
    },
  },
  
  hero: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '0 5%',
  },
  
  heroTitle: {
    fontSize: '3.5rem',
    marginBottom: '1rem',
    fontWeight: '700',
    '@media (max-width: 768px)': {
      fontSize: '2.5rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '2rem',
    },
  },
  
  heroSubtitle: {
    fontSize: '1.5rem',
    marginBottom: '2.5rem',
    maxWidth: '700px',
    '@media (max-width: 768px)': {
      fontSize: '1.2rem',
    },
  },
  
  ctaButton: {
    backgroundColor: '#f8c100',
    color: '#333',
    border: 'none',
    padding: '1rem 2.5rem',
    borderRadius: '30px',
    fontWeight: '600',
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#e6b400',
      transform: 'translateY(-2px)',
    },
  },
  
  // Main content
  main: {
    padding: '5rem 5%',
    '@media (max-width: 768px)': {
      padding: '3rem 1rem',
    },
  },
  
  sectionTitleContainer: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: '#222',
    '@media (max-width: 768px)': {
      fontSize: '2rem',
    },
  },
  
  sectionSubtitle: {
    fontSize: '1.2rem',
    color: '#666',
    maxWidth: '600px',
    margin: '0 auto',
  },
  
  // Filtres
  filtersContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginBottom: '3rem',
    flexWrap: 'wrap',
  },
  
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '200px',
    '@media (max-width: 480px)': {
      minWidth: '100%',
    },
  },
  
  filterLabel: {
    marginBottom: '0.5rem',
    fontWeight: '600',
    color: '#444',
  },
  
  filterSelect: {
    padding: '0.8rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '1rem',
  },
  
  propertiesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem',
    '@media (max-width: 480px)': {
      gridTemplateColumns: '1fr',
    },
  },
  
  // Property card
  propertyCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)',
    },
  },
  
  cardImageContainer: {
    position: 'relative',
    height: '250px',
    overflow: 'hidden',
  },
  
  cardImage: {
    height: '100%',
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'transform 0.5s ease',
    ':hover': {
      transform: 'scale(1.05)',
    },
  },
  
  cardPrice: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    backgroundColor: '#f8c100',
    color: '#333',
    padding: '0.5rem 1rem',
    borderRadius: '30px',
    fontWeight: '700',
    fontSize: '1.1rem',
  },
  
  propertyTypeBadge: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: '0.4rem 0.8rem',
    borderRadius: '20px',
    fontWeight: '500',
    fontSize: '0.9rem',
  },
  
  cardContent: {
    padding: '1.5rem',
  },
  
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#222',
  },
  
  cardLocation: {
    color: '#f8c100',
    fontWeight: '500',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
  },
  
  cardDescription: {
    color: '#666',
    marginBottom: '1.5rem',
    lineHeight: 1.5,
  },
  
  learnMoreButton: {
    backgroundColor: 'transparent',
    color: '#f8c100',
    border: '2px solid #f8c100',
    padding: '0.7rem 1.5rem',
    borderRadius: '30px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: '100%',
    ':hover': {
      backgroundColor: '#f8c100',
      color: 'white',
    },
  },
  
  // Aucun résultat
  noResults: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    marginTop: '2rem',
  },
  
  // Popup
  popupOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '1rem',
    overflowY: 'auto',
  },
  
  popup: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2rem',
    maxWidth: '600px',
    width: '100%',
    position: 'relative',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  
  closeButton: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '2rem',
    cursor: 'pointer',
    color: '#999',
    ':hover': {
      color: '#333',
    },
  },
  
  popupTitle: {
    fontSize: '1.8rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
    color: '#222',
    paddingRight: '2rem',
  },
  
  agentInfo: {
    backgroundColor: '#f9f9f9',
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
  },
  
  agentTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#222',
  },
  
  agentDetail: {
    marginBottom: '0.5rem',
    color: '#555',
  },
  
  // Formulaire de contact
  contactForm: {
    marginTop: '1.5rem',
  },
  
  formRow: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    '@media (max-width: 480px)': {
      flexDirection: 'column',
      gap: '0',
    },
  },
  
  formGroup: {
    flex: 1,
    marginBottom: '1rem',
  },
  
  formLabel: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '600',
    color: '#444',
  },
  
  formInput: {
    width: '100%',
    padding: '0.8rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  
  formTextarea: {
    width: '100%',
    padding: '0.8rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    resize: 'vertical',
    minHeight: '100px',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  
  checkboxContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '1.5rem',
  },
  
  checkboxInput: {
    marginRight: '0.5rem',
    marginTop: '0.2rem',
  },
  
  checkboxLabel: {
    fontSize: '0.9rem',
    color: '#555',
  },
  
  formActions: {
    display: 'flex',
    gap: '1rem',
    '@media (max-width: 480px)': {
      flexDirection: 'column',
    },
  },
  
  submitButton: {
    backgroundColor: '#f8c100',
    color: '#333',
    border: 'none',
    padding: '0.8rem 1.5rem',
    borderRadius: '30px',
    fontWeight: '600',
    cursor: 'pointer',
    flex: 1,
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#e6b400',
    },
  },
  
  cancelButton: {
    backgroundColor: 'transparent',
    color: '#666',
    border: '1px solid #ddd',
    padding: '0.8rem 1.5rem',
    borderRadius: '30px',
    fontWeight: '600',
    cursor: 'pointer',
    flex: 1,
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#f5f5f5',
    },
  },
  
  // Footer
  footer: {
    backgroundColor: '#222',
    color: 'white',
    textAlign: 'center',
    padding: '2rem',
  },
  
  footerText: {
    margin: 0,
    color: '#ccc',
  },
};