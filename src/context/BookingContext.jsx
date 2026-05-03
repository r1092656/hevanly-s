import React, { createContext, useState, useContext } from 'react';

const BookingContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [initialService, setInitialService] = useState(null);
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('hevanly_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  const openBooking = (service = null) => {
    setInitialService(service);
    setIsBookingOpen(true);
  };
  
  const closeBooking = () => {
    setIsBookingOpen(false);
    setTimeout(() => setInitialService(null), 300);
  };

  const addBooking = (bookingData) => {
    const newBooking = {
      ...bookingData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem('hevanly_bookings', JSON.stringify(updatedBookings));
    return newBooking;
  };

  return (
    <BookingContext.Provider value={{ 
      isBookingOpen, 
      openBooking, 
      closeBooking, 
      initialService,
      bookings,
      addBooking
    }}>
      {children}
    </BookingContext.Provider>
  );
};
