import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import { Send, Image as ImageIcon, Check, AlertCircle, Trash2 } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import './AdminNews.css';

const AdminNews = () => {
  const navigate = useNavigate();
  const { addNewsItem, newsItems, deleteNewsItem } = useNews();

  const [formData, setFormData] = useState({
    image: '',
    description: '',
    category: 'Update'
  });

  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageSimulate = () => {
    if (!formData.image) {
      const randomId = Math.floor(Math.random() * 800) + 200;
      setFormData(prev => ({ 
        ...prev, 
        image: `https://images.unsplash.com/photo-${randomId}?auto=format&fit=crop&q=80&w=1200` 
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    // Simulate network delay
    setTimeout(() => {
      addNewsItem({
        image: formData.image || 'https://via.placeholder.com/1200x800?text=News+Update',
        description: formData.description,
        category: formData.category
      });
      
      setIsSending(false);
      setSendSuccess(true);
      
      // Reset form instead of navigating away immediately
      setTimeout(() => {
        setFormData({ image: '', description: '', category: 'Update' });
        setSendSuccess(false);
      }, 2000);
    }, 1200);
  };

  const handleConfirmDelete = (id) => {
    if (window.confirm('Weet je zeker dat je dit nieuwsbericht wilt verwijderen?')) {
      deleteNewsItem(id);
    }
  };

  return (
    <AdminLayout title="Nieuws Beheer" backTo="/admin">
      <div className="admin-grid animate-fade-in">
        <div className="admin-section">
          <div className="admin-info-banner">
            <AlertCircle size={20} />
            <p>Nieuwsberichten worden automatisch na <strong>5 dagen</strong> van de website verwijderd.</p>
          </div>

          <form onSubmit={handleSubmit} className="admin-form card">
            <h3 className="section-title">Voeg nieuw bericht toe</h3>
            <div className="input-group">
              <label htmlFor="category">Categorie</label>
              <select 
                id="category" 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-field"
              >
                <option value="Update">Update</option>
                <option value="Behandeling">Nieuwe behandeling</option>
                <option value="Product">Nieuw product</option>
                <option value="Evenement">Evenement</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="image">Afbeelding URL</label>
              <div className="input-with-button">
                <input 
                  type="text" 
                  id="image" 
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                  className="input-field"
                />
                <button 
                  type="button" 
                  onClick={handleImageSimulate}
                  className="btn btn-outline flex items-center gap-2"
                  style={{whiteSpace: 'nowrap'}}
                >
                  <ImageIcon size={18} />
                  Simuleer upload
                </button>
              </div>
            </div>

            {formData.image && (
              <div className="news-image-preview">
                <img src={formData.image} alt="Preview" />
                <button 
                  type="button" 
                  className="remove-preview" 
                  onClick={() => setFormData(prev => ({...prev, image: ''}))}
                >
                  &times;
                </button>
              </div>
            )}

            <div className="input-group">
              <label htmlFor="description">Bericht</label>
              <textarea 
                id="description" 
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="6"
                placeholder="Wat is het laatste nieuws? Deel het met je klanten..."
                required
                className="input-field"
              ></textarea>
            </div>

            <div className="form-actions" style={{marginTop: '1rem'}}>
              <button 
                type="submit" 
                className={`btn btn-primary flex items-center gap-2 ${isSending ? 'loading' : ''} ${sendSuccess ? 'success' : ''}`}
                disabled={isSending || sendSuccess}
                style={{width: '200px', justifyContent: 'center'}}
              >
                {sendSuccess ? (
                  <>
                    <Check size={20} />
                    Gepubliceerd!
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Publiceren
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="admin-section">
          <div className="admin-news-list card">
            <h3 className="section-title">Bestaande berichten beheren</h3>
            {newsItems.length === 0 ? (
              <p className="empty-state">Geen actieve nieuwsberichten gevonden.</p>
            ) : (
              <div className="news-management-list">
                {newsItems.map(item => (
                  <div key={item.id} className="news-management-item">
                    <div className="news-item-thumb">
                      <img src={item.image} alt="News Thumb" />
                    </div>
                    <div className="news-item-info">
                      <span className="news-tag">{item.category}</span>
                      <p className="news-snippet">{item.description}</p>
                    </div>
                    <button 
                      className="delete-btn" 
                      onClick={() => handleConfirmDelete(item.id)}
                      title="Verwijderen"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNews;
