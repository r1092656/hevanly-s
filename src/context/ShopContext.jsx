import React, { createContext, useState, useContext, useEffect } from 'react';


const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

// Version bump clears old placeholder products from localStorage
const SHOP_VERSION = 'v2';

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const savedVersion = localStorage.getItem('shop_version');
    if (savedVersion !== SHOP_VERSION) {
      localStorage.setItem('shop_version', SHOP_VERSION);
      localStorage.removeItem('products');
      return [];
    }
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [];
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
