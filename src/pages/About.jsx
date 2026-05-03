import React from 'react';
import './About.css';
import { Award, Heart, Clock } from 'lucide-react';

const About = () => {
  return (
    <div className="about-page animate-fade-in">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Ons Verhaal</h1>
          <p className="page-subtitle">Een reis vol passie, uitmuntendheid en ware schoonheid.</p>
        </div>
      </div>

      <section className="section about-content">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <h2>Ervaar de kunst van schoonheid</h2>
              <p>Het verhaal van Hevanly´s Beautybar begon na 7 jaar ervaring in de kappersbranche. Ik realiseerde me dat mijn unieke aanpak en passie voor schoonheid iets bijzonders was dat ik met anderen moest delen. Mijn toewijding is om mijn klanten een unieke en persoonlijke ervaring te bieden, waarbij kwaliteit en aandacht voor detail centraal staan.</p>
              <p>Ons werk spreekt voor zich, en is je kans waard om te genieten en je te laten behandelen door Hevanly´s Beautybar. Ontdek de salon waar kwaliteit voorop staat.</p>
              <p>Wat Hevanly's Beautybar uniek maakt, is onze toewijding aan het creëren van een unieke ervaring. Wij geloven dat schoonheid meer is dan alleen een mooi uiterlijk. Het is het gevoel dat u krijgt wanneer u echt even tijd neemt voor uzelf. Bij ons staat kwaliteit voorop, zodat u kunt genieten van een behandeling die perfect is afgestemd op uw wensen.</p>
            </div>
            <div className="about-image-container">
              <div className="about-frame">
                {/* Decorative frame that looks luxurious */}
                <div className="about-image" style={{ backgroundImage: "url('/about-profile.png')" }}>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section values-section">
        <div className="container text-center">
          <h2 style={{ marginBottom: '3rem' }}>Waarom wij?</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon"><Award size={32} /></div>
              <h3>Vakmanschap</h3>
              <p>Onze technici zijn hoogopgeleid en leren voortdurend over de nieuwste trends en technieken.</p>
            </div>
            <div className="value-card">
              <div className="value-icon"><Heart size={32} /></div>
              <h3>Premium Producten</h3>
              <p>Wij gebruiken alleen de fijnste, dierproefvrije en huidvriendelijke producten voor onze behandelingen.</p>
            </div>
            <div className="value-card">
              <div className="value-icon"><Clock size={32} /></div>
              <h3>Uw Rust & Tijd</h3>
              <p>Elke afspraak is ontworpen om u precies de tijd en ruimte te geven die u nodig heeft om te ontspannen.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
