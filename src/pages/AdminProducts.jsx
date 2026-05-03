import React from 'react';
import { useShop } from '../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';
import { Edit, Trash2, Plus, AlertCircle } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import './AdminProducts.css';

const AdminProducts = () => {
  const { products, deleteProduct, updateProduct } = useShop();
  const navigate = useNavigate();

  const handleStockToggle = (product) => {
    updateProduct(product.id, { 
      stock: product.stock > 0 ? 0 : 10 // Reset to 10 if was 0, or 0 if was > 0
    });
  };

  return (
    <AdminLayout title="Product beheer" backTo="/admin">
      <div className="admin-products animate-fade-in">
        <div className="admin-actions-bar">
          <Link to="/admin/products/add" className="btn btn-primary flex items-center gap-2">
            <Plus size={20} />
            Voeg nieuw product toe
          </Link>
          <div className="product-count">
            <strong>{products.length}</strong> producten in totaal
          </div>
        </div>

        <div className="admin-table-container">
          {products.length === 0 ? (
            <div className="empty-state">
              <AlertCircle size={48} />
              <p>Nog geen producten toegevoegd.</p>
              <Link to="/admin/products/add" className="btn btn-outline">Eerste product toevoegen</Link>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Afbeelding</th>
                  <th>Productnaam</th>
                  <th>Prijs</th>
                  <th>Voorraad</th>
                  <th>Status</th>
                  <th>Acties</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="table-img">
                        <img src={product.image} alt={product.name} />
                      </div>
                    </td>
                    <td className="font-medium">{product.name}</td>
                    <td>€{product.price.toFixed(2)}</td>
                    <td>
                      <div className="stock-input-wrapper">
                        <input 
                          type="number" 
                          value={product.stock}
                          onChange={(e) => updateProduct(product.id, { stock: parseInt(e.target.value) || 0 })}
                          className="stock-input"
                        />
                      </div>
                    </td>
                    <td>
                      <button 
                        className={`status-chip ${product.stock > 0 ? 'active' : 'inactive'}`}
                        onClick={() => handleStockToggle(product)}
                      >
                        {product.stock > 0 ? 'In voorraad' : 'Niet in voorraad'}
                      </button>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button 
                          className="action-btn edit" 
                          onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          className="action-btn delete" 
                          onClick={() => deleteProduct(product.id)}
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
