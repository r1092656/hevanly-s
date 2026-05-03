import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import NewsSection from '../components/NewsSection';
import './Home.css';

const Home = () => {
  const { openBooking } = useBooking();

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background" style={{backgroundImage: "url('/hero.png')"}}></div>
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <span className="hero-subtitle">Premium Schoonheid & Spa</span>
          <h1 className="hero-title">Ontdek je ware elegantie</h1>
          <p className="hero-text">
            Ervaar luxe behandelingen die zijn afgestemd om je natuurlijke schoonheid te accentueren in een serene, professionele sfeer.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary flex items-center justify-center gap-2" onClick={openBooking}>
              <Calendar size={20} />
              Afspraak maken
            </button>
            <Link to="/services" className="btn btn-outline footer-btn">
              Bekijk behandelingen
            </Link>
          </div>
        </div>
      </section>

      {/* Dynamic News Section */}
      <NewsSection />

      {/* Intro Section */}
      <section className="section intro-section">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-text">
              <h2>Welkom bij Hevanly's Beautybar</h2>
              <p>Gelegen in het hart van Turnhout bieden wij een exclusieve selectie hoogwaardige schoonheidsbehandelingen aan. Het is onze passie om je er buitengewoon uit te laten zien en voelen.</p>
              <Link to="/about" className="link-arrow">Lees ons verhaal &rarr;</Link>
            </div>
            <div className="intro-stats">
              <div className="stat-card">
                <h3>10+</h3>
                <p>Jaar ervaring</p>
              </div>
              <div className="stat-card">
                <h3>Premium</h3>
                <p>Producten gebruikt</p>
              </div>
              <div className="stat-card">
                <h3>100%</h3>
                <p>Klanttevredenheid</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section services-preview">
        <div className="container">
          <div className="section-header text-center">
            <h2>Onze kenmerkende diensten</h2>
            <p>Verhoog je schoonheid met onze gespecialiseerde behandelingen</p>
          </div>
          
          <div className="services-grid">
            {/* Service 1 */}
            <div className="service-card">
              <div className="service-card-image-wrapper">
                <div className="service-image" style={{backgroundImage: "url('/nails.png')"}}></div>
              </div>
              <div className="service-card-content">
                <h3>Luxury Nails</h3>
                <p>Expert manicures en pedicures met premium beige en zachte kleurafwerkingen.</p>
                <Link to="/services" className="link-arrow">Bekijk details &rarr;</Link>
              </div>
            </div>
            
            {/* Service 2 */}
            <div className="service-card">
              <div className="service-card-image-wrapper">
                <div className="service-image" style={{backgroundImage: "url('/lashes.png')"}}></div>
              </div>
              <div className="service-card-content">
                <h3>Lash Extensions</h3>
                <p>Perfecte, natuurlijk ogende extensions voor een moeiteloos elegante look.</p>
                <Link to="/services" className="link-arrow">Bekijk details &rarr;</Link>
              </div>
            </div>

            {/* Service 3 */}
            <div className="service-card">
              <div className="service-card-image-wrapper">
                <div className="service-image" style={{backgroundImage: "url('/skincare.png')"}}></div>
              </div>
              <div className="service-card-content">
                <h3>Facial Treatments</h3>
                <p>Verjongende spabehandelingen met de beste producten voor een stralende huid.</p>
                <Link to="/services" className="link-arrow">Bekijk details &rarr;</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials">
        <div className="container">
          <div className="testimonials-header">
             <Sparkles className="icon-accent" size={32} />
             <h2>Cliënt Ervaringen</h2>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
               <p className="testimonial-text">"Absoluut de beste schoonheidssalon in Turnhout. De ambiance is geweldig en ik vertrek altijd als een nieuw mens."</p>
               <h5>- Sophie V.</h5>
            </div>
            <div className="testimonial-card">
               <p className="testimonial-text">"Professioneel, schoon en luxueus. Hun oog voor detail bij mijn nagels was ongeëvenaard."</p>
               <h5>- Emma D.</h5>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section cta-section">
        <div className="container cta-container text-center">
          <h2>Klaar om jezelf te verwennen?</h2>
          <p>Boek vandaag nog je afspraak en ervaar het verschil van Hevanly's.</p>
          <button className="btn btn-primary" style={{marginTop: '2rem'}} onClick={openBooking}>Boek nu</button>
        </div>
      </section>

    </div>
  );
};

export default Home;
