import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="notfound-page animate-fade-in">
      <div className="notfound-content">
        <h1 className="notfound-code">404</h1>
        <h2>Pagina niet gevonden</h2>
        <p>De pagina die u zoekt bestaat niet of is verplaatst.</p>
        <Link to="/" className="btn btn-primary">Terug naar home</Link>
      </div>
    </div>
  );
};

export default NotFound;
