import React, { createContext, useState, useContext, useEffect } from 'react';

const NewsContext = createContext();

export const useNews = () => useContext(NewsContext);

export const NewsProvider = ({ children }) => {
  const [newsItems, setNewsItems] = useState(() => {
    const savedNews = localStorage.getItem('newsItems');
    return savedNews ? JSON.parse(savedNews) : [];
  });

  // Auto-expiration logic: Remove items older than 5 days
  useEffect(() => {
    const expireItems = () => {
      const fiveDaysInMs = 5 * 24 * 60 * 60 * 1000;
      const now = Date.now();
      
      setNewsItems(prevItems => {
        const filteredItems = prevItems.filter(item => (now - item.createdAt) < fiveDaysInMs);
        if (filteredItems.length !== prevItems.length) {
          localStorage.setItem('newsItems', JSON.stringify(filteredItems));
          return filteredItems;
        }
        return prevItems;
      });
    };

    // Run on mount and then every hour
    expireItems();
    const interval = setInterval(expireItems, 3600000);
    return () => clearInterval(interval);
  }, []);

  // Sync newsItems to localStorage
  useEffect(() => {
    localStorage.setItem('newsItems', JSON.stringify(newsItems));
  }, [newsItems]);

  const addNewsItem = (newItem) => {
    const itemWithMeta = {
      ...newItem,
      id: Date.now(),
      createdAt: Date.now()
    };
    setNewsItems(prev => [itemWithMeta, ...prev]);
  };

  const deleteNewsItem = (id) => {
    setNewsItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <NewsContext.Provider value={{ newsItems, addNewsItem, deleteNewsItem }}>
      {children}
    </NewsContext.Provider>
  );
};
