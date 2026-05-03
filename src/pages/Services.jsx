import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import './Services.css';

const Services = () => {
  const { openBooking } = useBooking();
  const [activeCategory, setActiveCategory] = useState('ALLE');

  const categories = ['ALLE', 'NATUURLIJK HAAR', 'HAIRSTYLING', 'HAARKLEURING', 'WEAVE & PRUIK', 'VLECHTEN', 'DREADLOCKS', 'WENKBRAUWEN & WIMPERS', 'MANICURE'];

  const services = [
    { id: 1, name: 'Detox Treatment', category: 'NATUURLIJK HAAR', price: '€90', desc: '120 min' },
    { id: 2, name: 'Vitamin Treatment', category: 'NATUURLIJK HAAR', price: '€80', desc: '90 min - Inclusief stoom' },
    { id: 3, name: 'Protein Treatment', category: 'NATUURLIJK HAAR', price: '€80', desc: '90 min - Inclusief stoom' },
    { id: 4, name: 'Oil Treatment', category: 'NATUURLIJK HAAR', price: '€75', desc: '90 min - Inclusief stoom' },
    { id: 5, name: 'Keratin Treatment', category: 'NATUURLIJK HAAR', price: '€150', desc: '180 min - Inclusief styling' },
    { id: 6, name: 'Trim Ends', category: 'HAIRSTYLING', price: '€25', desc: '30 min - Exclusief wassen' },
    { id: 7, name: 'Model Haircut', category: 'HAIRSTYLING', price: '€35', desc: '45 min - Exclusief wassen' },
    { id: 8, name: 'Wash, Cut & Blow Dry', category: 'HAIRSTYLING', price: '€55', desc: '90 min' },
    { id: 9, name: 'Wash, Blow Dry & Curling', category: 'HAIRSTYLING', price: '€65', desc: '90 min' },
    { id: 10, name: 'Relax, Cut & Styling (short hair)', category: 'HAIRSTYLING', price: '€90', desc: '120 min' },
    { id: 11, name: 'Relax, Cut & Styling (long hair)', category: 'HAIRSTYLING', price: '€110', desc: '180 min' },
    { id: 12, name: 'Wash & Blow Dry', category: 'HAIRSTYLING', price: '€25', desc: '60 min' },
    { id: 13, name: 'Root Touch-Up (less than 10 weeks)', category: 'HAARKLEURING', price: '€55', desc: '180 min' },
    { id: 14, name: 'Root Touch-Up', category: 'HAARKLEURING', price: '€70', desc: '180 min' },
    { id: 15, name: 'Highlights', category: 'HAARKLEURING', price: '€150', desc: '180 min - Incl. toner, knippen, fohnen en/of krullen' },
    { id: 16, name: 'Balayage', category: 'HAARKLEURING', price: '€130', desc: '180 min - Incl. toner, knippen, fohnen en/of krullen' },
    { id: 17, name: 'Flip Over Weave', category: 'WEAVE & PRUIK', price: '€95', desc: '180 min' },
    { id: 18, name: 'Weave with Closure', category: 'WEAVE & PRUIK', price: '€110', desc: '180 min' },
    { id: 19, name: 'Leave-Out Weave', category: 'WEAVE & PRUIK', price: '€110', desc: '180 min' },
    { id: 20, name: 'Track Refill per Row', category: 'WEAVE & PRUIK', price: '€25', desc: '180 min - Exclusief styling' },
    { id: 21, name: 'Weave Removal & Wash', category: 'WEAVE & PRUIK', price: '€30', desc: '60 min' },
    { id: 22, name: 'Wig Installation', category: 'WEAVE & PRUIK', price: '€75', desc: '60 min - Exclusief styling' },
    { id: 23, name: 'Half-Up Half-Down Ponytail', category: 'WEAVE & PRUIK', price: '€95', desc: '120 min' },
    { id: 24, name: 'Ponytail Hairstyles', category: 'WEAVE & PRUIK', price: '€60', desc: '90 min' },
    { id: 25, name: 'Braids with Extensions (medium length)', category: 'VLECHTEN', price: '€110', desc: '210 min - Braids, knotless, twists' },
    { id: 26, name: 'Braids with Extensions (long hair)', category: 'VLECHTEN', price: '€130', desc: '240 min - Braids, knotless, twists' },
    { id: 27, name: 'Natural Hair Braiding', category: 'VLECHTEN', price: '€65', desc: '90 min' },
    { id: 28, name: 'Cornrows with Extensions', category: 'VLECHTEN', price: 'vanaf €75', desc: '120 min' },
    { id: 29, name: 'Cornrows on Natural Hair', category: 'VLECHTEN', price: '€45', desc: '60 min' },
    { id: 30, name: 'Crochet Braids', category: 'VLECHTEN', price: '€75', desc: '150 min' },
    { id: 31, name: 'Dreadlock Maintenance (< 3 months)', category: 'DREADLOCKS', price: '€85', desc: '90 min' },
    { id: 32, name: 'Dreadlock Maintenance (> 3 months)', category: 'DREADLOCKS', price: '€110', desc: '120 min' },
    { id: 33, name: 'Dreadlock Deep Cleansing', category: 'DREADLOCKS', price: '€75', desc: '120 min' },
    { id: 34, name: 'Full Head Dreadlocks from Scratch', category: 'DREADLOCKS', price: 'vanaf €200', desc: '240 min' },
    { id: 35, name: 'Dreadlocks with Extensions', category: 'DREADLOCKS', price: 'vanaf €280', desc: '240 min - Exclusief extensions' },
    { id: 36, name: 'Eyebrow Shaping', category: 'WENKBRAUWEN & WIMPERS', price: '€15', desc: '30 min' },
    { id: 37, name: 'Eyebrow Shaping with Tint', category: 'WENKBRAUWEN & WIMPERS', price: '€40', desc: '60 min' },
    { id: 38, name: 'Cluster Lashes', category: 'WENKBRAUWEN & WIMPERS', price: '€35', desc: '30 min' },
    { id: 39, name: 'Manicure without Polish', category: 'MANICURE', price: '€25', desc: '60 min' },
    { id: 40, name: 'Manicure with Gel Polish', category: 'MANICURE', price: '€45', desc: '75 min' },
  ];

  const filteredServices = activeCategory === 'ALLE' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <div className="services-page animate-fade-in">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Onze Behandelingen</h1>
          <p className="page-subtitle">Deskundige behandelingen speciaal voor jou op maat gemaakt.</p>
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
          
          {/* We will add Booking integration later */}
        </div>
      </section>
    </div>
  );
};

export default Services;
