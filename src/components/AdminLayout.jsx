import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, ShoppingBag, Newspaper, LogOut, ChevronLeft } from 'lucide-react';
import './AdminLayout.css';

const AdminLayout = ({ children, title, backTo }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-layout">
      <header className="admin-nav">
        <div className="container admin-nav-container">
          <div className="admin-nav-left">
            {backTo && (
              <Link to={backTo} className="admin-back-btn">
                <ChevronLeft size={20} />
              </Link>
            )}
            <h2 className="admin-page-title">{title || 'Beheerderspaneel'}</h2>
          </div>
          
          <nav className="admin-menu-desktop">
            <NavLink to="/admin" end className="admin-menu-link">
              <LayoutDashboard size={18} />
              <span>Overzicht</span>
            </NavLink>
            <NavLink to="/admin/products" className="admin-menu-link">
              <ShoppingBag size={18} />
              <span>Producten</span>
            </NavLink>
            <NavLink to="/admin/news" className="admin-menu-link">
              <Newspaper size={18} />
              <span>Nieuws</span>
            </NavLink>
          </nav>

          <button onClick={handleLogout} className="admin-logout-btn" title="Uitloggen">
            <LogOut size={20} />
            <span className="desktop-only text-sm">Uitloggen</span>
          </button>
        </div>
      </header>
      
      <main className="admin-main">
        <div className="container">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
