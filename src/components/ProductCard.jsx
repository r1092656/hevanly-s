import React from 'react';
import { useShop } from '../context/ShopContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useShop();
  const { name, price, stock, image, description } = product;

  const isOutOfStock = stock <= 0;

  return (
    <div className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`}>
      <div className="product-image-container">
        <img src={image} alt={name} className="product-image" />
        {isOutOfStock && <div className="stock-badge">Uitverkocht</div>}
      </div>
      
      <div className="product-info">
        <div className="product-header">
          <h3 className="product-name">{name}</h3>
          <span className="product-price">€{price.toFixed(2)}</span>
        </div>
        
        <p className="product-description">{description}</p>
        
        <div className="product-footer">
          <div className="product-stock-status">
            {isOutOfStock ? (
              <span className="stock-out">Niet op voorraad</span>
            ) : (
              <span className="stock-in">{stock} op voorraad</span>
            )}
          </div>
          
          <button 
            className={`btn btn-primary add-to-cart-btn ${isOutOfStock ? 'disabled' : ''}`}
            onClick={() => !isOutOfStock && addToCart(product.id)}
            disabled={isOutOfStock}
          >
            {isOutOfStock ? 'Uitverkocht' : 'In winkelwagen'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
