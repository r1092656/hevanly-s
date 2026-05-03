import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import './Reviews.css';

// Basic vulgarity filter mapping
const BLOCKED_WORDS = ['haat', 'lelijk', 'verschrikkelijk', 'vies', 'shit', 'kut', 'hoer'];

const INITIAL_REVIEWS = [
  { id: 1, author: 'Sarah M.', date: 'april 2026', stars: 5, content: 'Absoluut genoten van mijn ervaring! Het team is zo professioneel en mijn haar heeft er nog nooit beter uitgezien. De salon heeft een heerlijke ontspannende sfeer.' },
  { id: 2, author: 'Anoniem', date: 'maart 2026', stars: 4, content: 'Geweldige service en prachtig resultaat. De enige reden voor 4 sterren is dat ik 15 minuten moest wachten na mijn afspraaktijd, maar het resultaat was het waard!' },
  { id: 3, author: 'Jessica T.', date: 'februari 2026', stars: 5, content: 'De beste nagelstyliste van de stad. Eerlijk gezegd ben ik nog nooit zo blij geweest met mijn gel-extensions. Ik raad deze plek ten zeerste aan voor iedereen die op zoek is naar premium beautybehandelingen.' }
];

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  
  // Form state
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [error, setError] = useState('');

  // Load reviews on mount
  useEffect(() => {
    const savedReviews = localStorage.getItem('hevanlys_reviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    } else {
      setReviews(INITIAL_REVIEWS);
      localStorage.setItem('hevanlys_reviews', JSON.stringify(INITIAL_REVIEWS));
    }
  }, []);

  const containsBlockedWords = (text) => {
    const lowerText = text.toLowerCase();
    return BLOCKED_WORDS.some(word => lowerText.includes(word));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (rating === 0) {
      setError('Selecteer a.u.b. een aantal sterren.');
      return;
    }

    if (content.trim().length < 10) {
      setError('Schrijf a.u.b. ten minste een korte zin voor uw beoordeling.');
      return;
    }

    if (containsBlockedWords(content) || (!isAnonymous && containsBlockedWords(name))) {
      setError('Uw beoordeling bevat taalgebruik dat niet overeenkomt met onze richtlijnen. Pas dit aan en probeer het opnieuw.');
      return;
    }

    const newReview = {
      id: Date.now(),
      author: isAnonymous ? 'Anoniem' : (name.trim() || 'Anoniem'),
      date: new Date().toLocaleDateString('nl-BE', { month: 'long', year: 'numeric' }),
      stars: rating,
      content: content.trim()
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('hevanlys_reviews', JSON.stringify(updatedReviews));

    // Reset form
    setRating(0);
    setHoverRating(0);
    setName('');
    setContent('');
    setIsAnonymous(false);
    alert('Bedankt voor uw mooie beoordeling!');
  };

  return (
    <div className="reviews-page animate-fade-in">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Recensies</h1>
          <p className="page-subtitle">Lees wat onze prachtige klanten over ons te zeggen hebben.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          
          <div className="review-form-section">
            <div className="review-form-header">
              <h2>Laat een beoordeling achter</h2>
              <p>Wij waarderen uw feedback en horen graag over uw ervaring.</p>
            </div>

            <form className="review-form" onSubmit={handleSubmit}>
              {error && <div className="error-message">{error}</div>}
              
              <div className="star-rating-input">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`star-btn ${(hoverRating || rating) >= star ? 'active' : ''}`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    <Star size={32} fill={(hoverRating || rating) >= star ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>

              {!isAnonymous && (
                <div className="input-group">
                  <label className="input-label">Uw Naam</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="Voer uw naam in"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isAnonymous}
                  />
                </div>
              )}

              <div className="checkbox-group">
                <input 
                  type="checkbox" 
                  id="anonymous" 
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                />
                <label htmlFor="anonymous">Anoniem plaatsen</label>
              </div>

              <div className="input-group">
                <label className="input-label">Uw Ervaring</label>
                <textarea 
                  className="input-field" 
                  rows="5" 
                  placeholder="Vertel ons over uw bezoek..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Beoordeling indienen</button>
            </form>
          </div>

          <div className="reviews-grid">
            {reviews.map(review => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <span className="review-author">{review.author}</span>
                  <span className="review-date">{review.date}</span>
                </div>
                <div className="review-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < review.stars ? 'currentColor' : 'none'} 
                      color={i < review.stars ? 'var(--color-accent)' : 'var(--color-border)'} 
                    />
                  ))}
                </div>
                <p className="review-content">{review.content}</p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};

export default Reviews;
