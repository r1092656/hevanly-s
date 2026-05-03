import React, { useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import './Products.css';

const Products = () => {
  const { products } = useShop();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="products-page">
      <section className="products-hero">
        <div className="container">
          <h1 className="animate-fade-in">Schoonheidsessentials</h1>
          <p className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Geselecteerde producten voor uw dagelijkse zelfzorgritueel. 
            Premium kwaliteit, met liefde samengesteld.
          </p>
        </div>
      </section>

      <section className="products-grid-section section">
        <div className="container">
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
