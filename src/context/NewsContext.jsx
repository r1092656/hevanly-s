import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const NewsContext = createContext();

export const useNews = () => useContext(NewsContext);

export const NewsProvider = ({ children }) => {
  const [newsItems, setNewsItems] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);

  const fetchNews = useCallback(async () => {
    try {
      const res = await fetch('/api/news/list');
      const data = await res.json();
      if (data.items) setNewsItems(data.items);
    } catch (err) {
      console.error('fetchNews error:', err);
    } finally {
      setNewsLoading(false);
    }
  }, []);

  useEffect(() => { fetchNews(); }, [fetchNews]);

  return (
    <NewsContext.Provider value={{ newsItems, newsLoading, fetchNews }}>
      {children}
    </NewsContext.Provider>
  );
};
