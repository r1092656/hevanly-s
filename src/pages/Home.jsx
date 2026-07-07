import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
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
          <span className="hero-subtitle">Premium Beauty Bar</span>
          <h1 className="hero-title">Ontdek je ware elegantie</h1>
          <p className="hero-text">
            Ervaar luxe behandelingen die zijn afgestemd om je natuurlijke schoonheid te accentueren in een serene, professionele sfeer.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary">
              Bekijk producten
            </Link>
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

      {/* Samenwerking Nagels */}
      <section className="section collab-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Onze samenwerking</h2>
            <p>Voor nagels werken wij samen met een gespecialiseerde nagelstyliste</p>
          </div>

          <a
            href="https://beautynailsbydiana.be"
            target="_blank"
            rel="noopener noreferrer"
            className="collab-row-card"
          >
            {/* Links: logo */}
            <div className="collab-logo-side">
              <img src="/diana-logo.png" alt="Beauty Nails by Diana logo" className="collab-logo-img" />
            </div>

            {/* Rechts: tekst + 3 fotos */}
            <div className="collab-info-side">
              <span className="collab-badge">Samenwerking</span>
              <h3>Beauty Nails by Diana</h3>
              <p>
                Voor alle nagelbehandelingen werken wij samen met Diana, uw gespecialiseerde nagelstyliste.
                Diana is actief in <strong>Laakdal én Turnhout</strong> en staat klaar om u te verwennen met prachtige nagels.
                Afspraken kunnen rechtstreeks bij haar geboekt worden via haar website.
              </p>
              <div className="collab-photos">
                <img src="/diana-1.png" alt="Beauty Nails by Diana — werk 1" />
                <img src="/diana-2.png" alt="Beauty Nails by Diana — werk 2" />
                <img src="/diana-3.png" alt="Beauty Nails by Diana — werk 3" />
              </div>
              <span className="collab-link-arrow">Boek een afspraak bij Diana &rarr;</span>
            </div>
          </a>
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
          <button className="btn btn-primary" style={{marginTop: '2rem'}} onClick={() => openBooking()}>Boek nu</button>
        </div>
      </section>

    </div>
  );
};

export default Home;
