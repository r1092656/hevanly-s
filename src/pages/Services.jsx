import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import './Services.css';

const Services = () => {
  const { openBooking } = useBooking();
  const [activeCategory, setActiveCategory] = useState('ALLE');

  const categories = ['ALLE', 'NATUURLIJK HAAR', 'HAIRSTYLING', 'HAARKLEURING', 'WEAVE & PRUIK', 'VLECHTEN', 'DREADLOCKS', 'WENKBRAUWEN & WIMPERS', 'NAILS'];

  const services = [
    { id: 1, name: 'Detox Treatment', category: 'NATUURLIJK HAAR', price: 'vanaf €90', desc: '120 min' },
    { id: 2, name: 'Vitamin Treatment', category: 'NATUURLIJK HAAR', price: 'vanaf €80', desc: '90 min - Inclusief stoom' },
    { id: 3, name: 'Protein Treatment', category: 'NATUURLIJK HAAR', price: 'vanaf €80', desc: '90 min - Inclusief stoom' },
    { id: 4, name: 'Oil Treatment', category: 'NATUURLIJK HAAR', price: 'vanaf €75', desc: '90 min - Inclusief stoom' },
    { id: 5, name: 'Keratin Treatment', category: 'NATUURLIJK HAAR', price: 'vanaf €150', desc: '180 min - Inclusief styling' },
    { id: 6, name: 'Trim Ends', category: 'HAIRSTYLING', price: 'vanaf €25', desc: '30 min - Exclusief wassen' },
    { id: 7, name: 'Model Haircut', category: 'HAIRSTYLING', price: 'vanaf €35', desc: '45 min - Exclusief wassen' },
    { id: 8, name: 'Wash, Cut & Blow Dry', category: 'HAIRSTYLING', price: 'vanaf €55', desc: '90 min' },
    { id: 9, name: 'Wash, Blow Dry & Curling', category: 'HAIRSTYLING', price: 'vanaf €65', desc: '90 min' },
    { id: 10, name: 'Relax, Cut & Styling (short hair)', category: 'HAIRSTYLING', price: 'vanaf €90', desc: '120 min' },
    { id: 11, name: 'Relax, Cut & Styling (long hair)', category: 'HAIRSTYLING', price: 'vanaf €110', desc: '180 min' },
    { id: 12, name: 'Wash & Blow Dry', category: 'HAIRSTYLING', price: 'vanaf €25', desc: '60 min' },
    { id: 13, name: 'Root Touch-Up (less than 10 weeks)', category: 'HAARKLEURING', price: 'vanaf €55', desc: '180 min' },
    { id: 14, name: 'Root Touch-Up', category: 'HAARKLEURING', price: 'vanaf €70', desc: '180 min' },
    { id: 15, name: 'Highlights', category: 'HAARKLEURING', price: 'vanaf €150', desc: '180 min - Incl. toner, knippen, fohnen en/of krullen' },
    { id: 16, name: 'Balayage', category: 'HAARKLEURING', price: 'vanaf €130', desc: '180 min - Incl. toner, knippen, fohnen en/of krullen' },
    { id: 17, name: 'Flip Over Weave', category: 'WEAVE & PRUIK', price: 'vanaf €95', desc: '180 min' },
    { id: 18, name: 'Weave with Closure', category: 'WEAVE & PRUIK', price: 'vanaf €110', desc: '180 min' },
    { id: 19, name: 'Leave-Out Weave', category: 'WEAVE & PRUIK', price: 'vanaf €110', desc: '180 min' },
    { id: 20, name: 'Track Refill per Row', category: 'WEAVE & PRUIK', price: 'vanaf €25', desc: '180 min - Exclusief styling' },
    { id: 21, name: 'Weave Removal & Wash', category: 'WEAVE & PRUIK', price: 'vanaf €30', desc: '60 min' },
    { id: 22, name: 'Wig Installation', category: 'WEAVE & PRUIK', price: 'vanaf €75', desc: '60 min - Exclusief styling' },
    { id: 23, name: 'Half-Up Half-Down Ponytail', category: 'WEAVE & PRUIK', price: 'vanaf €95', desc: '120 min' },
    { id: 24, name: 'Ponytail Hairstyles', category: 'WEAVE & PRUIK', price: 'vanaf €60', desc: '90 min' },
    { id: 25, name: 'Braids with Extensions (medium length)', category: 'VLECHTEN', price: 'vanaf €110', desc: '210 min - Braids, knotless, twists' },
    { id: 26, name: 'Braids with Extensions (long hair)', category: 'VLECHTEN', price: 'vanaf €130', desc: '240 min - Braids, knotless, twists' },
    { id: 27, name: 'Natural Hair Braiding', category: 'VLECHTEN', price: 'vanaf €65', desc: '90 min' },
    { id: 28, name: 'Cornrows with Extensions', category: 'VLECHTEN', price: 'vanaf €75', desc: '120 min' },
    { id: 29, name: 'Cornrows on Natural Hair', category: 'VLECHTEN', price: 'vanaf €45', desc: '60 min' },
    { id: 30, name: 'Crochet Braids', category: 'VLECHTEN', price: 'vanaf €75', desc: '150 min' },
    { id: 31, name: 'Dreadlock Maintenance (< 3 months)', category: 'DREADLOCKS', price: 'vanaf €85', desc: '90 min' },
    { id: 32, name: 'Dreadlock Maintenance (> 3 months)', category: 'DREADLOCKS', price: 'vanaf €110', desc: '120 min' },
    { id: 33, name: 'Dreadlock Deep Cleansing', category: 'DREADLOCKS', price: 'vanaf €75', desc: '120 min' },
    { id: 34, name: 'Full Head Dreadlocks from Scratch', category: 'DREADLOCKS', price: 'vanaf €200', desc: '240 min' },
    { id: 35, name: 'Dreadlocks with Extensions', category: 'DREADLOCKS', price: 'vanaf €280', desc: '240 min - Exclusief extensions' },
    { id: 36, name: 'Eyebrow Shaping', category: 'WENKBRAUWEN & WIMPERS', price: 'vanaf €15', desc: '30 min' },
    { id: 37, name: 'Eyebrow Shaping with Tint', category: 'WENKBRAUWEN & WIMPERS', price: 'vanaf €40', desc: '60 min' },
    { id: 38, name: 'Cluster Lashes', category: 'WENKBRAUWEN & WIMPERS', price: 'vanaf €35', desc: '30 min' },
  ];

  const filteredServices = activeCategory === 'ALLE' || activeCategory === 'NAILS'
    ? services.filter(s => s.category !== 'MANICURE')
    : services.filter(s => s.category === activeCategory);

  return (
    <div className="services-page animate-fade-in">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Onze Behandelingen</h1>
          <p className="page-subtitle">Deskundige behandelingen speciaal voor jou op maat gemaakt.</p>
          <a
            href="https://wa.me/32465172790"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-cta"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Vragen over een behandeling? Chat via WhatsApp
          </a>
        </div>
      </div>

      <section className="section menu-section">
        <div className="container">
          <div className="category-tabs">
            {categories.map(cat => (
              <button 
                key={cat}
                className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Nails tab: toon alleen de Diana-card */}
          {activeCategory === 'NAILS' ? (
            <a
              href="https://beautynailsbydiana.be"
              target="_blank"
              rel="noopener noreferrer"
              className="services-diana-card"
            >
              <div className="services-diana-logo">
                <img src="/diana-logo.png" alt="Beauty Nails by Diana" />
              </div>
              <div className="services-diana-info">
                <span className="services-diana-badge">Samenwerking</span>
                <h3>Beauty Nails by Diana</h3>
                <p>
                  Voor nagelbehandelingen werken wij samen met Diana, uw gespecialiseerde nagelstyliste.
                  Zij is actief in <strong>Laakdal én Turnhout</strong> en staat klaar om u te verwennen.
                  Afspraken boek je rechtstreeks via haar website.
                </p>
                <div className="services-diana-photos">
                  <img src="/diana-1.png" alt="nail werk 1" />
                  <img src="/diana-2.png" alt="nail werk 2" />
                  <img src="/diana-3.png" alt="nail werk 3" />
                </div>
                <span className="services-diana-link">Boek een afspraak bij Diana &rarr;</span>
              </div>
            </a>
          ) : (
            <>
              <div className="services-list-grid">
                {filteredServices.map(service => (
                  <div key={service.id} className="service-menu-item">
                    <div className="service-top">
                      <h3>{service.name}</h3>
                      <div className="service-line"></div>
                      <span className="service-price">{service.price}</span>
                    </div>
                    <p className="service-desc">{service.desc}</p>
                    <div className="service-action">
                      <button className="book-link-btn" onClick={() => openBooking(service)}>Boek deze behandeling</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bij ALLE: Diana-kaart onderaan als teaser */}
              {activeCategory === 'ALLE' && (
                <a
                  href="https://beautynailsbydiana.be"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="services-diana-teaser"
                >
                  <img src="/diana-logo.png" alt="Beauty Nails by Diana" className="teaser-logo" />
                  <div>
                    <span className="services-diana-badge">Samenwerking — Nails</span>
                    <p>Voor nagelbehandelingen werken wij samen met <strong>Beauty Nails by Diana</strong> (Laakdal &amp; Turnhout).</p>
                  </div>
                  <span className="services-diana-link">Bezoek beautynailsbydiana.be &rarr;</span>
                </a>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Services;
