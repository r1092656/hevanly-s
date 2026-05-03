import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Newspaper, ArrowRight } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <AdminLayout title="Admin Dashboard">
      <div className="admin-dashboard animate-fade-in">
        <div className="welcome-section">
          <h1>Welkom terug, Lakisha! 👋</h1>
          <p>Wat zou je vandaag willen doen?</p>
        </div>

        <div className="dashboard-grid">
          <Link to="/admin/products" className="dashboard-card group">
            <div className="card-icon">
              <ShoppingBag size={40} />
            </div>
            <div className="card-content">
              <h3>Product beheer</h3>
              <p>Beheer prijzen, voorraad en voeg nieuwe producten toe aan de winkel.</p>
              <div className="card-footer">
                <span>Open beheer</span>
                <ArrowRight size={18} />
              </div>
            </div>
          </Link>

          <Link to="/admin/news" className="dashboard-card group alternate">
            <div className="card-icon">
              <Newspaper size={40} />
            </div>
            <div className="card-content">
              <h3>News toevoegen</h3>
              <p>Deel updates, foto's van behandelingen of nieuwe productaankondigingen.</p>
              <div className="card-footer">
                <span>Voeg nieuws toe</span>
                <ArrowRight size={18} />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
