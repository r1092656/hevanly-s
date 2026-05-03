import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './CartDrawer.css';

const CartDrawer = () => {
  const { 
    cart, 
    isCartOpen, 
    closeCart, 
    removeFromCart, 
    updateQuantity, 
    cartTotal 
  } = useShop();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <div className="cart-overlay" onClick={closeCart}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <div className="cart-title">
            <ShoppingBag size={24} />
            <h2>Uw winkelwagen</h2>
            <span className="cart-badge">{cart.reduce((a, b) => a + b.quantity, 0)}</span>
          </div>
          <button className="close-cart" onClick={closeCart}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-content">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={64} strokeWidth={1} />
              <p>Uw winkelwagen is leeg</p>
              <button className="btn btn-outline" onClick={closeCart}>
                Begin met winkelen
              </button>
            </div>
          ) : (
            <ul className="cart-items">
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <p className="cart-item-price">€{item.price.toFixed(2)}</p>
                    <div className="cart-item-actions">
                      <div className="quantity-controls">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="quantity-btn"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="quantity-value">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="quantity-btn"
                          disabled={item.quantity >= item.stock}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        className="remove-item"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <div className="summary-line">
                <span>Subtotaal</span>
                <span>€{cartTotal.toFixed(2)}</span>
              </div>
              <div className="summary-line total">
                <span>Totaal</span>
                <span>€{cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <button className="btn btn-primary checkout-btn" onClick={handleCheckout}>
              Afrekenen
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
