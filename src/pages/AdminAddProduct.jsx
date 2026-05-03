import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Save, X, Upload, Check } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import './AdminAddProduct.css';

const AdminAddProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct } = useShop();

  const isEdit = !!id;
  const existingProduct = isEdit ? products.find(p => p.id === parseInt(id)) : null;

  const [formData, setFormData] = useState({
    name: '',
    category: 'Huidverzorging',
    description: '',
    price: '',
    stock: '',
    image: '',
    status: 'In voorraad'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isEdit && existingProduct) {
      setFormData({
        name: existingProduct.name,
        category: existingProduct.category || 'Huidverzorging',
        description: existingProduct.description,
        price: existingProduct.price.toString(),
        stock: existingProduct.stock.toString(),
        image: existingProduct.image,
        status: existingProduct.stock > 0 ? 'In voorraad' : 'Niet in voorraad'
      });
    }
  }, [isEdit, existingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageSimulate = () => {
    // For demo purposes, we'll just set a placeholder or a random Unsplash URL if empty
    if (!formData.image) {
      const randomId = Math.floor(Math.random() * 1000);
      setFormData(prev => ({ 
        ...prev, 
        image: `https://images.unsplash.com/photo-${randomId}?auto=format&fit=crop&q=80&w=800` 
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);

    const productData = {
      name: formData.name,
      category: formData.category,
      description: formData.description,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      image: formData.image || 'https://via.placeholder.com/400x400?text=Product+Image'
    };

    // Simulate save delay
    setTimeout(() => {
      if (isEdit) {
        updateProduct(parseInt(id), productData);
      } else {
        addProduct(productData);
      }
      
      setIsSaving(false);
      setSaveSuccess(true);
      
      setTimeout(() => {
        navigate('/admin/products');
      }, 1500);
    }, 1000);
  };

  return (
    <AdminLayout 
      title={isEdit ? 'Product bewerken' : 'Nieuw product toevoegen'} 
      backTo="/admin/products"
    >
      <div className="admin-form-container animate-fade-in">
        <form onSubmit={handleSubmit} className="admin-form card">
          <div className="form-grid">
            <div className="form-left">
              <div className="input-group">
                <label htmlFor="name">Productnaam</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="bijv. Lavender Sleep Mask"
                  required
                  className="input-field"
                />
              </div>

              <div className="grid grid-2">
                <div className="input-group">
                  <label htmlFor="category">Categorie</label>
                  <select 
                    id="category" 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="Huidverzorging">Huidverzorging</option>
                    <option value="Lichaamsverzorging">Lichaamsverzorging</option>
                    <option value="Accessoires">Accessoires</option>
                    <option value="Diensten">Diensten</option>
                  </select>
                </div>
                <div className="input-group">
                  <label htmlFor="price">Prijs (€)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    id="price" 
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="25.00"
                    required
                    className="input-field"
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="description">Beschrijving</label>
                <textarea 
                  id="description" 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Korte beschrijving van het product..."
                  required
                  className="input-field"
                ></textarea>
              </div>

              <div className="grid grid-2">
                <div className="input-group">
                  <label htmlFor="stock">Beschikbare voorraad</label>
                  <input 
                    type="number" 
                    id="stock" 
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="10"
                    required
                    className="input-field"
                  />
                </div>
                <div className="input-group">
                  <label>Status</label>
                  <div className="status-display">
                    <span className={`status-chip ${parseInt(formData.stock) > 0 ? 'active' : 'inactive'}`}>
                      {parseInt(formData.stock) > 0 ? 'In voorraad' : 'Niet in voorraad'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-right">
              <div className="image-upload-section">
                <label>Productafbeelding</label>
                <div className="image-preview-container">
                  {formData.image ? (
                    <img src={formData.image} alt="Preview" className="image-preview" />
                  ) : (
                    <div className="image-placeholder">
                      <Upload size={40} />
                      <p>Sleep afbeelding hier of klik om te uploaden</p>
                    </div>
                  )}
                </div>
                <div className="image-input-manual">
                  <input 
                    type="text" 
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Afbeelding URL (optioneel)"
                    className="input-field text-xs"
                  />
                  <button 
                    type="button" 
                    onClick={handleImageSimulate}
                    className="btn btn-outline btn-sm mt-2"
                  >
                    Simuleer upload
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-outline flex items-center gap-2"
              onClick={() => navigate('/admin/products')}
            >
              <X size={20} />
              Annuleren
            </button>
            <button 
              type="submit" 
              className={`btn btn-primary flex items-center gap-2 ${isSaving ? 'loading' : ''} ${saveSuccess ? 'success' : ''}`}
              disabled={isSaving || saveSuccess}
            >
              {saveSuccess ? (
                <>
                  <Check size={20} />
                  Opgeslagen!
                </>
              ) : (
                <>
                  <Save size={20} />
                  {isEdit ? 'Wijzigingen opslaan' : 'Product opslaan'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminAddProduct;
