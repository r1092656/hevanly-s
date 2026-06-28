import React, { createContext, useState, useContext, useEffect } from 'react';

// Product images
import faceOilImg from '../assets/products/face_oil.png';
import silkPillowcaseImg from '../assets/products/silk_pillowcase.png';
import sleepMaskImg from '../assets/products/sleep_mask.png';
import quartzRollerImg from '../assets/products/quartz_roller.png';
import bodyScrubImg from '../assets/products/body_scrub.png';
import handCreamImg from '../assets/products/hand_cream.png';
import vitaminCImg from '../assets/products/vitamin_c_serum.png';
import bathrobeImg from '../assets/products/bath_robe.png';
import candleImg from '../assets/products/scented_candle.png';
import footCreamImg from '../assets/products/foot_cream.png';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Nourishing Face Oil',
    price: 24.99,
    stock: 8,
    image: faceOilImg,
    description: 'A luxurious blend of botanical oils to hydrate and rejuvenate your skin overnight.'
  },
  {
    id: 2,
    name: 'Silk Pillowcase',
    price: 35.00,
    stock: 15,
    image: silkPillowcaseImg,
    description: '100% Mulberry silk to protect your hair and skin while you dream.'
  },
  {
    id: 3,
    name: 'Lavender Sleep Mask',
    price: 12.50,
    stock: 20,
    image: sleepMaskImg,
    description: 'Soft silk mask with calming lavender scent for deep, restorative sleep.'
  },
  {
    id: 4,
    name: 'Rose Quartz Facial Roller',
    price: 18.00,
    stock: 10,
    image: quartzRollerImg,
    description: 'Promotes lymphatic drainage and depuffs for a natural, healthy glow.'
  },
  {
    id: 5,
    name: 'Organic Body Scrub',
    price: 22.00,
    stock: 12,
    image: bodyScrubImg,
    description: 'Gently exfoliates with natural sea salts and soothing essential oils.'
  },
  {
    id: 6,
    name: 'Shea Butter Hand Cream',
    price: 14.50,
    stock: 25,
    image: handCreamImg,
    description: 'Intensive moisture for dry hands, enriched with organic shea butter.'
  },
  {
    id: 7,
    name: 'Vitamin C Serum',
    price: 28.00,
    stock: 5,
    image: vitaminCImg,
    description: 'Brightening serum that targets dark spots and uneven skin tone.'
  },
  {
    id: 8,
    name: 'Bamboo Bath Robe',
    price: 45.00,
    stock: 10,
    image: bathrobeImg,
    description: 'Ultra-zacht, duurzaam bamboe badstof voor een luxueuze ervaring thuis.'
  },
  {
    id: 9,
    name: 'Scented Candle (Vanilla & Oud)',
    price: 19.99,
    stock: 18,
    image: candleImg,
    description: 'Hand-poured soy candle with a warm, sophisticated fragrance profile.'
  },
  {
    id: 10,
    name: 'Peppermint Foot Cream',
    price: 16.00,
    stock: 15,
    image: footCreamImg,
    description: 'Cooling peppermint oil and urea to soften and refresh tired feet.'
  }
];

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : INITIAL_PRODUCTS;
  });
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync products to localStorage
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product || product.stock <= 0) return;

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem) {
        if (existingItem.quantity < product.stock) {
          return prevCart.map(item => 
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return prevCart;
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    openCart();
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const product = products.find(p => p.id === productId);
    if (newQuantity > product.stock) return;

    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const processPurchase = (customerData) => {
    setProducts(prevProducts => 
      prevProducts.map(product => {
        const cartItem = cart.find(item => item.id === product.id);
        if (cartItem) {
          return { ...product, stock: product.stock - cartItem.quantity };
        }
        return product;
      })
    );
    clearCart();
    console.log('Purchase processed for:', customerData);
  };

  // CRUD Operations for Admin
  const addProduct = (newProduct) => {
    const nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    setProducts(prev => [...prev, { ...newProduct, id: nextId }]);
  };

  const updateProduct = (productId, updatedProduct) => {
    setProducts(prev => 
      prev.map(p => p.id === productId ? { ...p, ...updatedProduct } : p)
    );
  };

  const deleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
      removeFromCart(productId);
    }
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <ShopContext.Provider value={{ 
      products, 
      cart, 
      isCartOpen, 
      openCart, 
      closeCart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      processPurchase,
      addProduct,
      updateProduct,
      deleteProduct,
      cartTotal,
      cartCount
    }}>
      {children}
    </ShopContext.Provider>
  );
};
