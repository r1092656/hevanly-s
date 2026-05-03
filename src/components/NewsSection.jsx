import React from 'react';
import { useNews } from '../context/NewsContext';
import { Sparkles, Calendar as CalendarIcon } from 'lucide-react';
import './NewsSection.css';

const NewsSection = () => {
  const { newsItems } = useNews();

  if (newsItems.length === 0) return null;

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('nl-BE', {
      day: 'numeric',
      month: 'long'
    });
  };

  return (
    <section className="section news-section">
      <div className="container">
        <div className="section-header text-center">
          <div className="section-badge">
            <Sparkles size={16} />
            <span>Wat is er nieuw</span>
          </div>
          <h2>Laatste Updates</h2>
          <p>Blijf op de hoogte van onze behandelingen en producten</p>
        </div>

        <div className="news-grid">
          {newsItems.map((item) => (
            <div key={item.id} className="news-card animate-fade-in">
              <div className="news-card-image">
                <img src={item.image} alt="Nieuws" />
                <span className="news-category">{item.category}</span>
              </div>
              <div className="news-card-content">
                <div className="news-date">
                  <CalendarIcon size={14} />
                  <span>{formatDate(item.createdAt)}</span>
                </div>
                <p className="news-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
