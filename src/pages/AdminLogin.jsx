import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock } from 'lucide-react';
import './AdminLogin.css';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(password)) {
      navigate(from, { replace: true });
    } else {
      setError('Onjuist wachtwoord. Probeer het opnieuw.');
      setPassword('');
    }
  };

  return (
    <div className="admin-login-page">
      <div className="container">
        <div className="login-card animate-fade-in">
          <div className="login-header">
            <div className="login-icon">
              <Lock size={32} />
            </div>
            <h1>Admin Inloggen</h1>
            <p>Voer het beheerderswachtwoord in om door te gaan.</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label htmlFor="password" title="Wachtwoord">Wachtwoord</label>
              <input 
                type="password" 
                id="password" 
                className={`input-field ${error ? 'error' : ''}`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Wachtwoord invoeren"
                required
                autoFocus
              />
              {error && <span className="error-message">{error}</span>}
            </div>
            
            <button type="submit" className="btn btn-primary login-btn">
              Toegang tot beheerderspaneel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
